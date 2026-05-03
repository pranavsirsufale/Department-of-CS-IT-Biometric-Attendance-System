from rest_framework.routers import DefaultRouter
from .views import (UniversityViewSet, DisciplineViewSet, DepartmentViewSet, AcademicLevelViewSet, ProgramViewSet, YearViewSet, 
                    SemesterViewSet, DeliveryModeViewSet, SubjectViewSet, StaffTypeViewSet, ClassTypeViewSet, TeacherViewSet, StudentViewSet,
<<<<<<< HEAD
                    BiometricViewSet, TimetableViewSet, SessionViewSet, AttendanceViewSet)
=======
                    BiometricViewSet)
>>>>>>> 86c5c22 (add backend and frontend logic)

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
<<<<<<< HEAD
router.register("timetable", TimetableViewSet)
router.register("session", SessionViewSet)
router.register("attendance", AttendanceViewSet)
=======

>>>>>>> 86c5c22 (add backend and frontend logic)

# TODO: make it more modular if possible. @rohan or @pranav. please try to make it more modular
urlpatterns = router.urls