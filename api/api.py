from flask import Flask, request, jsonify, make_response, abort
import json
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table
import configparser
from flask_cors import CORS

conxn_string = ('mysql+mysqlconnector://{user}:{pswd}@{host}:{port}/{db}'.format(
	user="root", pswd="pass", host="db", port="3306", db="checkup"))

engine = create_engine(conxn_string, convert_unicode=True)
metadata = MetaData(bind=engine)

# Tables
# ...
appointment = Table('appointment', metadata, autoload=True)

app = Flask(__name__)
# enables CORS
CORS(app)

app.config['DEBUG'] = True

# Error handlers
@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


def query_db(query, data):
	with engine.connect() as con:
		res = con.excecute(q)
	return res


@app.route('/authenticate', methods=['POST'])
def authenticate():
	email = request.json['email']
	password = request.json['password']
	type = "doctor"

	q = "select * from doctor where email = '{}' and password = '{}'".format(email, password)
	user = engine.execute(q).first()

	if user is None:
		q = "select * from patient where email = '{}' and password = '{}'".format(email, password)
		user = engine.execute(q).first()
		type = "patient"

		if user is None:
			abort(401)

	user = dict(user)
	user["type"] = type
	return jsonify(user)

@app.route('/patient/<int:id>', methods=['GET'])
def get_patient(id):
	q = "select * from patient where id = {}".format(id)
	user = engine.execute(q).first()

	if user is None:
		abort(401)

	user = dict(user)
	user["type"] = "patient"
	return jsonify(user)


@app.route('/patients/<int:id>', methods=['GET'])
def get_patients(id):
	q = 'select patient.* from patient inner join doctor on patient.doctor_id = doctor.id \
	where patient.doctor_id = {}'

	q = q.format(id)

	patients = {'patients': [dict(s) for s in engine.execute(q)]}
	
	return jsonify(patients)

@app.route('/prescriptionsForDoctor/<int:id>', methods=['GET'])
def get_prescriptions_for_doctor(id):
	q = 'select prescription.*, \
		 CONCAT(patient.first_name, \' \', patient.last_name) as prescribed_to, \
		 appointment.time as prescribed_on \
			  from prescription inner join doctor on prescription.doctor_id = doctor.id \
			  inner join patient on prescription.patient_id = patient.id  \
			  inner join appointment on prescription.appointment_id = appointment.id \
	where prescription.doctor_id = {} '

	q = q.format(id)

	prescriptions = {'prescriptions': [dict(s) for s in engine.execute(q)]}
	
	return jsonify(prescriptions)

@app.route('/prescriptionsForPatient/<int:id>', methods=['GET'])
def get_prescriptions_for_patient(id):
	q = 'select prescription.*, \
		 appointment.time as prescribed_on \
			from prescription inner join appointment on prescription.appointment_id = appointment.id \
	where prescription.patient_id = {} '

	q = q.format(id)

	prescriptions = {'prescriptions': [dict(s) for s in engine.execute(q)]}
	
	return jsonify(prescriptions)

@app.route('/appointmentsForPatient/<int:id>', methods=['GET'])
def get_appointments_for_patient(id):
	q = 'select appointment.*, \
	 	CONCAT("Dr. ", doctor.first_name, \' \', doctor.last_name) as doctor_name, \
		clinic.name as clinic_name	 \
		 from appointment inner join doctor on appointment.doctor_id = doctor.id \
			inner join clinic on appointment.clinic_id = clinic.id	 \
	where appointment.patient_id = {} '

	q = q.format(id)

	appointments = {'appointments': [dict(s) for s in engine.execute(q)]}
	
	return jsonify(appointments)

@app.route('/appointment/<int:id>', methods=['GET'])
def get_appointment(id):
	q = 'select appointment.*, \
	 	CONCAT("Dr. ", doctor.first_name, \' \', doctor.last_name) as doctor_name, \
		clinic.name as clinic_name, clinic.street_address as clinic_street_address, \
		clinic.city as clinic_city, clinic.state as clinic_state, clinic.phone_number as clinic_phone_number \
		 from appointment inner join doctor on appointment.doctor_id = doctor.id \
			inner join clinic on appointment.clinic_id = clinic.id	 \
	where appointment.id = {} '

	q = q.format(id)

	appointment = (engine.execute(q).first())

	if appointment is None:
		abort(404)
	

	return jsonify(dict(appointment))


@app.route('/clinics', methods=['GET'])
def get_clinics():
	q = "select id, name from clinic"

	clinics = {'clinics': [dict(p) for p in engine.execute(q)]}
	return jsonify(clinics)

@app.route('/appointments', methods=['POST'])
def create_appointment():
	data = request.json
	print(data)

	conxn = engine.connect()
	r = conxn.execute(appointment.insert(), doctor_id=data['doctor_id'], patient_id=data['patient_id'],
									clinic_id=data['clinic_id'], description=data['description'],
									notes=data['notes'], time=data['time'], status=data['status'])

	created = r.last_inserted_params()
	created['id'] = r.inserted_primary_key[0]
	print(get_appointment(created['id']))
	return make_response(jsonify({
		'message': 'Success',
		'data': created}), 201)



@app.route('/records', methods=['POST'])
def create_record():
	data = request.json
	print(data)
	conxn = engine.connect()
	r = conxn.execute(assignments.insert(), course_id=data['course_id'], student_id=data['student_id'],
		title=data['title'], assignment_date=data['assignment_date'], grade=data['grade'],
		comments=data['comments'], attachment_path=data['attachment_path'])
	created = r.last_inserted_params()
	created['id'] = r.inserted_primary_key[0]

	return make_response(jsonify({
		'message': 'Success',
		'data': created}), 201)


app.run(host="0.0.0.0", port=5000)