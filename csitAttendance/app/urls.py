from rest_framework.routers import DefaultRouter
from .views import (UniversityViewSet, DepartmentViewSet, ProgramViewSet, YearViewSet, SemesterViewSet, SubjectViewSet, StaffTypeViewSet, 
                    ClassTypeViewSet)

router = DefaultRouter()
router.register("university", UniversityViewSet)
router.register("department", DepartmentViewSet)
router.register("program", ProgramViewSet)
router.register("year", YearViewSet)
router.register("semester", SemesterViewSet)
router.register("subject", SubjectViewSet)
router.register("staff-type", StaffTypeViewSet)
router.register("class-type", ClassTypeViewSet)

# TODO: make it more modular if possible. @rohan or @pranav. please try to make it more modular
urlpatterns = router.urls