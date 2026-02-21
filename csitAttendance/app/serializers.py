from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import (Department, University, Program, Year, Semester, Subject, ClassType, StaffType, Teacher, Student, 
                     Timetable, Session, Attendance)

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = "__all__"

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
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
    class Meta:
        model = Semester
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
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
    class Meta:
        model = Teacher
        fields = ["username", "password", "name", "staffType", "isAdmin", "email", "mobile", "department"]

    @transaction.atomic
    def create(self, validatedData):
        username = validatedData.pop("username")
        password = validatedData.pop("password")
        email = validatedData.get("email")
        user = User.objects.create_user(username=username, password=password, email=email) # create django user
        staff = Teacher.objects.create(user=user, **validatedData) # create staff
        return staff
