from api import db

class Assignment(db.Model):
    __tablename__ = 'assignment'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    grade = db.Column(db.String())
    student = db.Column(db.Integer())
    attachment = db.Column(db.String())
    comments = db.Column(db.String())
    date = db.Column(db.Date())

    def __init__(self, student, date, title, grade, attachment, comments):
        self.student = student
        self.date = date
        self.title = title
        self.grade = grade
        self.attachment = attachment
        self.comments = comments


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    userType = db.Column(db.String())
    email = db.Column(db.String())
    password = db.Column(db.String())
    firstName = db.Column(db.String())
    lastName = db.Column(db.String())

    def __init__(self, userType, email, password, firstName, lastName):
        self.userType = userType
        self.email = email
        self.password = password
        self.firstName = firstName
        self.lastName = lastName



class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    size = db.Column(db.String())
    average = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, name, size, average, description):
        self.name = name
        self.size = size
        self.average = average
        self.description = description
