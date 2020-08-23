USE checkup;

INSERT INTO doctor (id, email, password, first_name, last_name, phone_number) VALUES
  (1, "adamsmith@uhealthclinic.ca", "doctor", "Adam", "Smith", "416-234-6623");

INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (1, 1, "johnwhite@webmail.com", "Male", "patient", "John", "White", "905-744-8694");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (2, 1, "stevebrowne@webmail.com", "Male", "patient", "Steve", "Brown", "905-631-4356");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (3, 1, "simongreen@webmail.com", "Male", "patient", "Simon", "Green", "647-745-5692");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (4, 1, "jwilliams@webmail.com", "Male", "patient", "Jamal", "Williams", "647-743-1732");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (5, 1, "ar.cruz@webmail.com", "Male", "patient", "Armando", "Cruz", "647-842-2862");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (6, 1, "j.huntington@webmail.com", "Female", "patient", "Jane", "Huntington", "647-257-2680");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (7, 1, "MaryIve@webmail.com", "Female", "patient", "Mary", "Ive", "647-186-1858");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (8, 1, "ar.stine14@webmail.com", "Male", "patient", "Arthur", "Stine", "416-682-5892");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (9, 1, "jhudson@webmail.com", "Male", "patient", "Jack", "Hudson", "416-824-7361");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (10, 1, "tbarner@webmail.com", "Male", "patient", "Timothy", "Barner", "416-681-7235");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (11, 1, "pwarner@webmail.com", "Female", "patient", "Penelope", "Warner", "416-735-1264");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (12, 1, "axstevenson@webmail.com", "Male", "patient", "Alexander", "Stevenson", "289-723-7314");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (13, 1, "quadamson@webmail.com", "Female", "patient", "Queen", "Adamson", "289-632-7223");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (14, 1, "jgiles@webmail.com", "Male", "patient", "Julian", "Giles", "289-731-8732");
INSERT INTO patient (id, doctor_id, email, gender, password, first_name, last_name, phone_number) VALUES
  (15, null, "jtest@webmail.com", "Male", "patient", "test", "lasttest", "289-872-3623");


INSERT INTO clinic (id, name, street_address, city, state, phone_number) VALUES 
  (1, "Eastside Health Clinic", "1578 Belfront Avenue", "Mississauga", "ON", "905-267-1456");
INSERT INTO clinic (id, name, street_address, city, state, phone_number) VALUES 
  (2, "Westside Health Clinic", "623 McCowan Road", "Scarborough", "ON", "416-234-1256");
INSERT INTO clinic (id, name, street_address, city, state, phone_number) VALUES 
  (3, "Whiteland General Clinic", "4895 Generation Road", "Oakville", "ON", "905-261-1452");

  INSERT INTO pharmacy (id, name, street_address, city, state, phone_number) VALUES 
  (1, "Orangeville Common Pharmacy", "345 Main Street", "Toronto", "ON", "416-272-8264");
  INSERT INTO pharmacy (id, name, street_address, city, state, phone_number) VALUES 
  (2, "Northstar Pharmacy", "732 King Street N", "Toronto", "ON", "416-561-6210");
  

INSERT INTO appointment (id, doctor_id, patient_id, clinic_id, description, notes, time, status) VALUES
  (1, 1, 6, 1, "Trouble rotating shoulder - possible strain.", "After examination, shoulder looks strained. 
                                                                Prescribing anti-inflammatory to reduce swelling. Will see how patient is doing in a couple weeks, 
                                                                and if further examination is necessary.", 
  "2020-04-09 11:45:21", "Complete");

INSERT INTO appointment (id, doctor_id, patient_id, clinic_id, description, notes, time, status) VALUES
  (2, 1, 6, 1, "Patient came in about soreness in her right ankle after a soccer game.", "Ankle looks swollen, was perhaps rolled during soccer game. 
                                                                                          Prescribing medication to reduce swelling, and advising ice and rest. 
                                                                                          Should clear things up.", 
  "2020-08-15 14:21:54", "Complete");


INSERT INTO prescription (id, doctor_id, patient_id, appointment_id, pharmacy_id, name, description, status, fill_date, refill_date) VALUES
  (1, 1, 6, 1, 1, "Celebrex", "Prescribed as NSAID to help calm inflamation and relieve pain.", "Filled", "2020-04-12 15:34:13", null);

INSERT INTO prescription (id, doctor_id, patient_id, appointment_id, pharmacy_id, name, description, status, fill_date, refill_date) VALUES
  (2, 1, 6, 2, 2, "Relafen", "Prescribed to reduce swelling.", "Ready for Pickup", null, null);
