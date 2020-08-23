USE checkup;

CREATE TABLE doctor (
  id     INT unsigned NOT NULL AUTO_INCREMENT,
  email       VARCHAR(150) NOT NULL,
  password    VARCHAR(150) NOT NULL,
  first_name  VARCHAR(150) NOT NULL,
  last_name   VARCHAR(150) ,
  phone_number VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE patient (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  doctor_id INT unsigned,
  gender ENUM('Male', 'Female'),
  email       VARCHAR(150),
  password    VARCHAR(150),
  first_name  VARCHAR(150) NOT NULL,
  last_name   VARCHAR(150) NOT NULL,
  phone_number VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE clinic (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150),
  street_address VARCHAR(150),
  city VARCHAR(150),
  state VARCHAR(150),
  phone_number VARCHAR(150),
  PRIMARY KEY (id)
);

CREATE TABLE pharmacy (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150),
  street_address VARCHAR(150),
  city VARCHAR(150),
  state VARCHAR(150),
  phone_number VARCHAR(150),
  PRIMARY KEY (id)
);

CREATE TABLE appointment (
  id     INT unsigned NOT NULL AUTO_INCREMENT,
  doctor_id    INT unsigned NOT NULL,
  patient_id INT unsigned NOT NULL,
  clinic_id INT unsigned NOT NULL,
  description TEXT,
  notes TEXT,
  time DATETIME not null,
  status ENUM('Complete', 'Upcoming', 'In Progress'),
  PRIMARY KEY   (id),
  FOREIGN KEY   (doctor_id) REFERENCES doctor(id),
  FOREIGN KEY   (patient_id) REFERENCES patient(id),
  FOREIGN KEY   (clinic_id) REFERENCES clinic(id)
);

CREATE TABLE prescription (
  id          INT unsigned NOT NULL AUTO_INCREMENT,
  doctor_id   INT unsigned NOT NULL,
  patient_id  INT unsigned NOT NULL,
  appointment_id INT unsigned NOT NULL,
  pharmacy_id INT unsigned,
  name VARCHAR(150),
  description text,
  status ENUM("Filled", "Processing", "Ready for Pickup"),
  fill_date DATETIME,
  refill_date DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(id),
  FOREIGN KEY (patient_id) REFERENCES patient(id),
  FOREIGN KEY (appointment_id) REFERENCES appointment(id),
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(id)
);