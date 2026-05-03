from django.db import models
from django.contrib.auth.models import User


class University(models.Model):
    name = models.CharField(max_length=100, default="Dr. Babasaheb Ambedkar Marathwada University, Chh. Sambhajinagar")
    location = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name

class Discipline(models.Model):
    discipline = models.CharField(max_length=100)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    def __str__(self):
        return self.discipline

class Department(models.Model):
    name = models.CharField(max_length=100)
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class AcademicLevel(models.Model):
    academiclevel= models.CharField(max_length=50)
    def __str__(self):
        return self.academiclevel

class Program(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField(null=False)  # duration in Years
    academiclevel = models.ForeignKey(AcademicLevel, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Year(models.Model):
    year = models.IntegerField()
    batchStartYear = models.PositiveIntegerField(max_length=5)
    batchEndYear = models.PositiveIntegerField(max_length=5)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.year)

class Semester(models.Model):
    semester = models.IntegerField()
    startDate = models.DateField()
    endDate = models.DateField()
    year = models.ForeignKey(Year, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.semester)

class Subject(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class DeliveryMode(models.Model):
    mode = models.CharField(max_length=50) # 1 for theory , 2 for practicle , 3 for research
    def __str__(self):
        return self.type

class ClassType(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    code = models.CharField(max_length=20, unique=True)
    deliverymode = models.ForeignKey(DeliveryMode, on_delete=models.DO_NOTHING) # 1 for Theory, 2 for Practical

    def __str__(self):
        return self.type

class StaffType(models.Model):
    staffType = models.CharField(max_length=50)

    def __str__(self):
        return self.staffType

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    staffType = models.ForeignKey(StaffType, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    isAdmin = models.BooleanField(default=False) # 0 for Teacher, 1 for Admin

    def __str__(self):
        return self.name

class Student(models.Model):
    prn = models.CharField(max_length=100, unique=True, db_index=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    rollNumber = models.CharField(max_length=100)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Biometric(models.Model):
<<<<<<< HEAD
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
=======
    student = models.ForeignKey(Student, on_delete=models.CASCADE, unique=True, primary_key=True)
>>>>>>> 86c5c22 (add backend and frontend logic)
    biometric = models.TextField(null=True)

    def __str__(self):
        return self.biometric

class Timetable(models.Model):
    class WeekDay(models.TextChoices):
        MONDAY = "MON", "Monday"
        TUESDAY = "TUE", "Tuesday"
        WEDNESDAY = "WED", "Wednesday"
        THURSDAY = "THU", "Thursday"
        FRIDAY = "FRI", "Friday"
        SATURDAY = "SAT", "Saturday"
        SUNDAY = "SUN", "Sunday"
    weekday = models.CharField(max_length=3, choices=WeekDay.choices)
    startTime = models.TimeField()
    endTime = models.TimeField()
    classType = models.ForeignKey(ClassType, on_delete=models.CASCADE, db_index=True)
    isCombined = models.BooleanField(default=False, db_index=True)
    semesters = models.ManyToManyField(Semester, db_index=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, db_index=True)

    def __str__(self):
        return f"Timetable for Semester {self.semesters.all().first().semester}"

class Session(models.Model):
    timetable = models.ForeignKey(Timetable, on_delete=models.CASCADE, db_index=True)
    startDateTime = models.DateTimeField()

    def __str__(self):
        return f"Session for {self.timetable.classType.code} on {self.startDateTime.date()}"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, db_index=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, db_index=True)
    status = models.BooleanField(default=False, db_index=True)
    class Meta:
            unique_together = ('student', 'session')

    def __str__(self):
        return f"Attendance for {self.student.name} in Session on {self.session.timetable.dateTime}"
