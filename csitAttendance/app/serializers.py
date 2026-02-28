from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (University, Discipline, Department, AcademicLevel, Program, Year, Semester, Subject, DeliveryMode, ClassType, 
                    StaffType, Teacher, Student, Biometric, Timetable, Session, Attendance)

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = "__all__"

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = "__all__"

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"

class AcademicLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicLevel
        fields = "__all__"

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = "__all__"

class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = "__all__"

class SemesterSerializer(serializers.ModelSerializer):
    programName = serializers.ReadOnlyField(source='year.program.name')
    class Meta:
        model = Semester
        fields = ["id", "semester", "startDate", "endDate", "year", "programName"]
        depth = 2
    def to_internal_value(self, data):
        self.fields["year"] = serializers.PrimaryKeyRelatedField(queryset=Year.objects.all())
        return super().to_internal_value(data)

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

class DeliveryModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMode
        fields = "__all__"

class ClassTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassType
        fields = "__all__"

class StaffTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffType
        fields = "__all__"

class TeacherCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Teacher
        fields = ["user", "username", "password", "name", "staffType", "isAdmin", "email", "mobile", "department"]

    @transaction.atomic
    def create(self, validatedData):
        username = validatedData.pop("username")
        password = validatedData.pop("password")
        email = validatedData.get("email")
        user = User.objects.create_user(username=username, password=password, email=email)
        staff = Teacher.objects.create(user=user, **validatedData)
        return staff

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class BiometricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biometric
        fields = ["student", "biometric"]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # super().validate(attrs) handles the authentication and 
        # provides the 'access' and 'refresh' tokens.
        data = super().validate(attrs)
        
        try:
            teacher_profile = self.user.teacher 
            data['user'] = {
                'id': self.user.id,
                'username': self.user.username,
                'name': teacher_profile.name,
                'email': teacher_profile.email,
                'department_name': teacher_profile.department.name,
                'staffType_name': teacher_profile.staffType.staffType,
                'isAdmin': teacher_profile.isAdmin,
            }
        except Exception as e:
            data['user'] = {
                'id': self.user.id,
                'username': self.user.username,
                'error': "Teacher profile not found"
            }
            
        return data

class TimetableSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(write_only=True)
    endDate = serializers.DateField(write_only=True)
    program = serializers.ReadOnlyField(source='semester.year.program.name')
    class Meta:
        model = Timetable
        fields = ['id', 'weekday', 'startTime', 'endTime', 'classType', 'semester', 'teacher', 'startDate', 'endDate', 'program']
        depth = 2

    def create(self, validatedData):
        startDate = validatedData.pop('startDate')
        endDate = validatedData.pop('endDate')
        timetable = Timetable.objects.create(**validatedData)
        timetable._startDate = startDate
        timetable._endDate = endDate
        return timetable

    def to_internal_value(self, data):
        self.fields['classType'] = serializers.PrimaryKeyRelatedField(queryset=ClassType.objects.all())
        self.fields['semester'] = serializers.PrimaryKeyRelatedField(queryset=Semester.objects.all())
        self.fields['teacher'] = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
        return super().to_internal_value(data)
    
class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"

