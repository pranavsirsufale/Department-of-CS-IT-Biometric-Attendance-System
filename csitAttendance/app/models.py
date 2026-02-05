from django.db import models
from django.contrib.auth.models import User


class University(models.Model):
    name = models.CharField(max_length=100, default="Dr. Babasaheb Ambedkar Marathwada University, Chh. Sambhajinagar")
    location = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, null=False)
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Program(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField(null=False)  # duration in Years
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Year(models.Model):
    year = models.IntegerField()
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
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ClassType(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    code = models.CharField(max_length=20, unique=True)
    type = models.BinaryField() # 0 for Theory, 1 for Practical

    def __str__(self):
        return self.type

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    isAdmin = models.BinaryField() # 0 for Teacher, 1 for Admin

    def __str__(self):
        return self.name

class Student(models.Model):
    prn = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    rollNumber = models.CharField(max_length=100, unique=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

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
    dateTime = models.DateTimeField()
    classType = models.ForeignKey(ClassType, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    def __str__(self):
        return f"Timetable for Semester {self.semester.semester}"

class Session(models.Model):
    timetable = models.ForeignKey(Timetable, on_delete=models.CASCADE)

    def __str__(self):
        return f"Session for Semester {self.timetable.semester.semester} on {self.timetable.dateTime}"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    status = models.BinaryField() # 0 for Absent, 1 for Present

    def __str__(self):
        return f"Attendance for {self.student.name} in Session on {self.session.timetable.dateTime}"
