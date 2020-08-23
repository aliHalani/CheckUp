import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom'
import { UserContext } from '../components/context/UserContext';
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Button from "components/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import CardFooter from "../components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import MUIDataTable from "mui-datatables";
import AppointmentToolbar from "../components/AppointmentToolbar.js"
import CreateAppointment from "../components/CreateAppointment.js";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        padding: "36px 36px"
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    infoContainer: {
        '& grid': {
            marginTop: "10px"
        }
    },
    filled: {
        color: 'green',
        fontWeight: 600
    },
    ready: {
        color: 'orange',
        fontWeight: 600
    },
    in_progress: {
        color: 'red',
        fontWeight: 600
    },
    prescriptionInfo: {
        boxShadow: "inset 0 1px 2px rgba(0,0,0,.13), 0 -1px 1px #FFF, 0 1px 0 #FFF",
        paddingLeft: "36px !important"
    }
};

const useStyles = makeStyles(styles);

export default function PatientDashboard() {
    const classes = useStyles();
    const [user, setUser, clearUser] = useContext(UserContext);
    const [createAppointmentOpen, setCreateAppointmentOpen] = useState(false);
    const patientID = useLocation().state;
    let [patient, setPatient] = useState({});
    let [prescriptions, setPrescriptions] = useState([])
    let [appointments, setAppointments] = useState([])
    let [selectedAppointment, setSelectedAppointment] = useState({})
    let [clinics, setClinics] = useState([]);
    let [pharmacies, setPharmacies] = useState([]);

    const prescriptionColumns = [
        {
            name: "id",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "appointment_id",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "pharmacy_id",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "name",
            label: "Name"
        },
        {
            name: "prescribed_on",
            label: "Prescribed On"
        },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: value => (
                    <span className={value === "Filled" ? classes.filled :
                        value === "Ready for Pickup" ? classes.ready :
                            classes.in_progress}>
                        {value}
                    </span>
                )
            }
        },
        {
            name: "fill_date",
            label: "Fill Date"
        }];

    const prescriptionDataTableOptions = {
        filterType: 'none',
        selectableRows: false,
        expandableRows: true,
        expandableRowsHeader: false,
        isRowExpandable: () => true,
        renderExpandableRow: (rowData, rowMeta) => {
            console.log(rowData);
            console.log(pharmacies);
            const colSpan = rowData.length + 1;
            const pharmacy = pharmacies.filter((pharmacy) => pharmacy.id === rowData[0])[0];
            console.log(pharmacy);
            return (
                <TableRow>
                    <TableCell colSpan={colSpan} className={classes.prescriptionInfo}>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={4}>
                                <Typography variant="inherit">
                                    Pharmacy Name
                                    </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {pharmacy.name}
                                </Typography>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4}>
                                <Typography variant="inherit">
                                    Pharmacy Address
                                    </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {pharmacy.street_address}
                                </Typography>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4}>
                                <Typography variant="inherit">
                                    Pharmacy Phone Number
                                    </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {pharmacy.phone_number}
                                </Typography>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                        </GridContainer>
                        <Button color="primary" 
                                onClick={() => {
                                    setSelectedAppointment(appointments.filter((appointment) => appointment.id === rowData[1])[0])
                                }}
                                style={{marginRight: "20px"}}>View Related Appointment</Button>                        
                        {rowData[5].props.children === "Ready for Pickup" && <Button color="primary">Order with HiRide</Button>}
                    </TableCell>
                </TableRow>
            );
        }
    };

    const appointmentColumns = [
        {
            name: "id",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "doctor_name",
            label: "Doctor"
        },
        {
            name: "clinic_name",
            label: "Clinic"
        },
        {
            name: "time",
            label: "Date"
        },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: value => (
                    <span className={value === "Complete" ? classes.filled :
                        value === "In Progress" ? classes.in_progress :
                            classes.ready}>
                        {value}
                    </span>
                )
            }
        }];

    const appointmentDataTableOptions = {
        filterType: 'none',
        selectableRows: false,
        onRowClick: appointmentClick,
        customToolbar: () => {
            if (user.type === "doctor") {
                return <AppointmentToolbar open={createAppointmentOpen} setOpen={setCreateAppointmentOpen} />
            } else {
                return null;
            }
        }
    };

    function updateAppointments() {
        fetch(`http://localhost:5000/appointmentsForPatient/${patientID}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setAppointments(data.appointments)
            })
            .catch((res) => {
                console.log("ERROR - retrieving appointments")
            })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/patient/${patientID}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setPatient(data)
            })
            .catch((res) => {
                console.log("ERROR - retrieving patient")
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/prescriptionsForPatient/${patientID}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setPrescriptions(data.prescriptions)
            })
            .catch((res) => {
                console.log("ERROR - retrieving prescriptions")
            })
    }, [])

    useEffect(() => {
        updateAppointments();
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/clinics`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setClinics(data.clinics)
            })
            .catch((res) => {
                console.log("ERROR - retrieving clinics")
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/pharmacies`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setPharmacies(data.pharmacies)
            })
            .catch((res) => {
                console.log("ERROR - retrieving pharmacies")
            })
    }, [])

    function appointmentClick(appointment) {
        fetch(`http://localhost:5000/appointment/${appointment[0]}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setSelectedAppointment(data)
                console.log(data)
            })
            .catch((res) => {
                console.log("ERROR - retrieving appointment")
            })
    }

    function addAppointment(appointment) {
        appointment.doctor_id = user.id;
        appointment.patient_id = patientID;
        appointment.day = new Date(appointment.day)
        appointment.day.setHours(appointment.time.getHours(), appointment.time.getMinutes(), appointment.time.getSeconds());
        appointment.time = appointment.day
        appointment.time = appointment.time.toJSON().slice(0, 10).replace(/-/g, '-') + " " + appointment.time.toJSON().slice(11, 17) + "00";
        fetch('http://localhost:5000/appointments', {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment)
        })
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                updateAppointments();
            })
            .catch((res) => {
                console.log("error adding appointment")
            })
    }

    return (
        <div className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{patient.first_name} {patient.last_name}</h4>
                            <p className={classes.cardCategoryWhite}>Patient Information</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        Name
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.first_name} {patient.last_name}
                                    </Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        Gender
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.gender}
                                    </Typography>
                                </GridItem>
                            </GridContainer>
                            <GridContainer addstyle={{ marginTop: "10px" }}>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        E-mail
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.email}
                                    </Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.phone_number}
                                    </Typography>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <MUIDataTable
                        title={"Prescription History"}
                        data={prescriptions}
                        columns={prescriptionColumns}
                        options={prescriptionDataTableOptions} />
                </GridItem>
            </GridContainer>

            <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MUIDataTable
                        title={"Appointment History"}
                        data={appointments}
                        columns={appointmentColumns}
                        options={appointmentDataTableOptions} />
                </GridItem>
            </GridContainer>

            {selectedAppointment.doctor_name &&
                <React.Fragment>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Paper>
                                <Toolbar>
                                    <Typography variant="h6">
                                        Appointment Details
                            </Typography>
                                </Toolbar>
                                <CardBody nomargintop={true}>
                                    <GridContainer>

                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Doctor
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.doctor_name}
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Status
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">

                                                <span className={selectedAppointment.status === "Complete" ? classes.filled :
                                                    selectedAppointment.status === "In Progress" ? classes.in_progress :
                                                        classes.ready}>
                                                    {selectedAppointment.status}
                                                </span>
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={3}>
                                            <Typography variant="inherit">
                                                Date
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.time}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Clinic Name
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.clinic_name}
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Clinic Address
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.clinic_street_address}
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Clinic Phone Number
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.clinic_phone_number}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer />
                                    <GridContainer>
                                        <GridItem xs={12}>
                                            <Typography variant="inherit">
                                                Booking Notes
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.description}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer />
                                    <GridContainer>
                                        <GridItem xs={12}>
                                            <Typography variant="inherit">
                                                Appointment Notes
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.notes}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Paper>
                        </GridItem>
                    </GridContainer>
                </React.Fragment>
            }
            <CreateAppointment clinics={clinics} open={createAppointmentOpen} setOpen={setCreateAppointmentOpen} addAppointment={addAppointment} />
        </div>
    )
}