from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from .models import (University, Discipline, Department, AcademicLevel, Program, Year, Semester, Subject, StaffType, DeliveryMode, ClassType, 
                    Teacher, Student, Biometric, Timetable, Session, Attendance)
from .serializers import (UniversitySerializer, DisciplineSerializer, DepartmentSerializer, AcademicLevelSerializer, ProgramSerializer, 
                          YearSerializer, SemesterSerializer, StaffTypeSerializer, SubjectSerializer, DeliveryModeSerializer, ClassTypeSerializer, 
                          TeacherCreateSerializer, StudentSerializer, BiometricSerializer)

class UniversityViewSet(ModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    # permission_classes = [IsAdminUser]

class DisciplineViewSet(ModelViewSet):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer

class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

# class ProgramTypeViewSet(ModelViewSet):
#     queryset = ProgramType.objects.all()
#     serializer_class = ProgramTypeSerializer

class AcademicLevelViewSet(ModelViewSet):
    serializer_class = AcademicLevelSerializer
    queryset = AcademicLevel.objects.all()

class ProgramViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class YearViewSet(ModelViewSet):
    queryset = Year.objects.all()
    serializer_class = YearSerializer

class SemesterViewSet(ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

class SubjectViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class DeliveryModeViewSet(ModelViewSet):
    queryset = DeliveryMode.objects.all()
    serializer_class = DeliveryModeSerializer

class ClassTypeViewSet(ModelViewSet):
    queryset = ClassType.objects.all()
    serializer_class = ClassTypeSerializer

class StaffTypeViewSet(ModelViewSet):
    queryset = StaffType.objects.all()
    serializer_class = StaffTypeSerializer

class TeacherViewSet(ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherCreateSerializer

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class BiometricViewSet(ModelViewSet):
    queryset = Biometric.objects.all()
    serializer_class = BiometricSerializer
