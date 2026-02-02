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
    rollNumber = models.CharField(max_length=100, unique=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return self.name



# class Attendance(models.Model):
#     student = models.ForeignKey(Student, on_delete=models.CASCADE)
#     date = models.DateField()
#     status = models.BinaryField()

#     def __str__(self):
#         return f"{self.student.name} - {self.date} - {self.status}"