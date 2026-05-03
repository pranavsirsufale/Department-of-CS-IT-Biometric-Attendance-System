from datetime import timedelta, datetime
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
<<<<<<< HEAD
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
=======
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
>>>>>>> 86c5c22 (add backend and frontend logic)
from .models import (University, Discipline, Department, AcademicLevel, Program, Year, Semester, Subject, StaffType, DeliveryMode, ClassType, 
                    Teacher, Student, Biometric, Timetable, Session, Attendance)
from .serializers import (UniversitySerializer, DisciplineSerializer, DepartmentSerializer, AcademicLevelSerializer, ProgramSerializer, 
                          YearSerializer, SemesterSerializer, StaffTypeSerializer, SubjectSerializer, DeliveryModeSerializer, ClassTypeSerializer, 
<<<<<<< HEAD
                          TeacherCreateSerializer, StudentSerializer, BiometricSerializer, MyTokenObtainPairSerializer, TimetableSerializer,
                          SessionSerializer, AttendanceSerializer)

class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
=======
                          TeacherCreateSerializer, StudentSerializer, BiometricSerializer)
>>>>>>> 86c5c22 (add backend and frontend logic)

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
    def get_queryset(self):
        queryset = Year.objects.all()
        programId = self.request.query_params.get("program")
        if programId:
            queryset = queryset.filter(program_id=programId)
        return queryset

class SemesterViewSet(ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    def get_queryset(self):
        queryset = Semester.objects.all()
        yearId = self.request.query_params.get("year")
        if yearId:
            queryset = queryset.filter(year_id=yearId)
        return queryset

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
<<<<<<< HEAD
    permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Student.objects.all()
        semesterId = self.request.query_params.get("semester")
        semesterIds = self.request.query_params.getlist("semesters")
        if semesterId:
            queryset = queryset.filter(semester_id=semesterId)
        if semesterIds:
            queryset = queryset.filter(semester__id__in=semesterIds).distinct()
        return queryset

# class BiometricViewSet(ModelViewSet):
#     queryset = Biometric.objects.all()
#     serializer_class = BiometricSerializer

class BiometricViewSet(ModelViewSet):
    queryset = Biometric.objects.all()
    serializer_class = BiometricSerializer

    def create(self, request, *args, **kwargs):
        print("Incoming Biometric Data:", request.data)   # 🔥 ADD THIS

        student_id = request.data.get("student")

        try:
            biometric = Biometric.objects.get(student_id=student_id)
            print("Updating existing biometric")   # 🔥

            serializer = self.get_serializer(biometric, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        except Biometric.DoesNotExist:
            print("Creating new biometric")   # 🔥

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class TimetableViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer

    def get_queryset(self):
            queryset = Timetable.objects.all()
            teacherId = self.request.query_params.get('teacher')
            if teacherId:
                queryset = queryset.filter(teacher_id=teacherId)
            return queryset

    def perform_create(self, serializer):
        timetable = serializer.save()
        startDate = timetable._startDate
        endDate = timetable._endDate
        weeklyMap = {'MON': 0, 'TUE': 1, 'WED': 2, 'THU': 3, 'FRI': 4, 'SAT': 5, 'SUN': 6}
        targetWeekday = weeklyMap[timetable.weekday]
        currentDate = startDate
        sessionsToCreate = []
        while currentDate <= endDate:
            if currentDate.weekday() == targetWeekday:
                sessionStart = datetime.combine(currentDate, timetable.startTime)
                sessionsToCreate.append(Session(timetable=timetable, startDateTime=sessionStart))
            currentDate += timedelta(days=1)
        if sessionsToCreate:
            Session.objects.bulk_create(sessionsToCreate)

class SessionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_queryset(self):
        queryset = Session.objects.all()
        timetableId = self.request.query_params.get("timetable")
        date = self.request.query_params.get("date")
        if timetableId:
            queryset = queryset.filter(timetable_id=timetableId)
        if date:
            queryset = queryset.filter(startDateTime__date=date)
        return queryset

class AttendanceViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = Attendance.objects.all()
        sessionId = self.request.query_params.get("session")
        if sessionId:
            queryset = queryset.filter(session_id=sessionId)
        return queryset

    @action(detail=False, methods=["POST"], url_path="bulk-create")
    def bulk_create(self, request):
        records = request.data.get("records", [])
        if not records:
            return Response({"error": "No records provided"}, status=status.HTTP_400_BAD_REQUEST)
        sessionId = records[0].get("session")
        Attendance.objects.filter(session_id=sessionId).delete()
        serializer = self.get_serializer(data=records, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Attendance recorded Successfully."}, status=status.HTTP_201_CREATED)
=======
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class BiometricViewSet(ModelViewSet):
    queryset = Biometric.objects.all()
    serializer_class = BiometricSerializer
>>>>>>> 86c5c22 (add backend and frontend logic)
