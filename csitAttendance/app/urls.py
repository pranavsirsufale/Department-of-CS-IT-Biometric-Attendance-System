from rest_framework.routers import DefaultRouter
from .views import (UniversityViewSet, DisciplineViewSet, DepartmentViewSet, AcademicLevelViewSet, ProgramViewSet, YearViewSet, 
                    SemesterViewSet, DeliveryModeViewSet, SubjectViewSet, StaffTypeViewSet, ClassTypeViewSet, TeacherViewSet, StudentViewSet,
                    BiometricViewSet, TimetableViewSet, SessionViewSet, AttendanceViewSet)

router = DefaultRouter()
router.register("university", UniversityViewSet)
router.register("discipline", DisciplineViewSet)
router.register("department", DepartmentViewSet)
router.register("academic-level", AcademicLevelViewSet)
router.register("program", ProgramViewSet)
router.register("year", YearViewSet)
router.register("semester", SemesterViewSet)
router.register("subject", SubjectViewSet)
router.register("delivery-mode", DeliveryModeViewSet)
router.register("class-type", ClassTypeViewSet)
router.register("staff-type", StaffTypeViewSet)
router.register("teacher", TeacherViewSet)
router.register("student", StudentViewSet)
router.register("biometric", BiometricViewSet)
router.register("timetable", TimetableViewSet)
router.register("session", SessionViewSet)
router.register("attendance", AttendanceViewSet)

# TODO: make it more modular if possible. @rohan or @pranav. please try to make it more modular
urlpatterns = router.urls