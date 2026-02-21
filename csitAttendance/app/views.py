from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from .models import (University, Department, Program, Year, Semester, Subject, StaffType, ClassType, Teacher, Student, 
                     Timetable, Session, Attendance)
from .serializers import (UniversitySerializer, DepartmentSerializer, ProgramSerializer, YearSerializer, SemesterSerializer, StaffTypeSerializer, 
                          SubjectSerializer, ClassTypeSerializer, TeacherCreateSerializer)

class UniversityViewSet(ModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    # permission_classes = [IsAdminUser]

class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

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

class ClassTypeViewSet(ModelViewSet):
    queryset = ClassType.objects.all()
    serializer_class = ClassTypeSerializer

class StaffTypeViewSet(ModelViewSet):
    queryset = StaffType.objects.all()
    serializer_class = StaffTypeSerializer


