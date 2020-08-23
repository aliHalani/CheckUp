import React, { useContext, useState, useEffect } from 'react';

import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Icon from "@material-ui/core/Icon";
import Danger from "../components/Typography/Danger.js";
import MUIDataTable from "mui-datatables";
import ChartistGraph from "react-chartist";
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../components/context/UserContext';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

import {
  dailySalesChart,
  dailyPrescriptionChart
} from "variables/charts.js";

import styles from "assets/jss/styles/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DoctorDashboard() {
  let history = useHistory();

  const classes = useStyles();
  const [user, setUser, clearUser] = useContext(UserContext);
  const [patients, setPatients] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const idToFetch = useLocation().state;

  const patientColumns = [{name: "id",
                     options: {display: false, viewColumns: false, filter: false}},
                    {name: "name",
                    label: "Name"},
                   {name: "gender",
                    label: "Gender"},
                   {name: "email",
                    label: "E-mail"},
                   {name: "phone_number",
                    label: "Phone Number"}];
                    

const prescriptionColumns = [{name: "name",
                    label: "Name"},
                    {name: "prescribed_to",
                     label: "Prescribed To"},
                    {name: "prescribed_on",
                     label: "Prescribed On"},
                    {name: "status",
                     label: "Status",
                     options : {customBodyRender: value => (
                       <span className={value === "Filled" ? classes.filled : 
                                        value === "Ready for Pickup" ? classes.ready : 
                                            classes.in_progress}>
                                              {value}
                       </span>
                     )}},
                    {name: "fill_date",
                     label: "Fill Date"}];
              
                  
  const patientDataTableOptions = {
    filterType: 'none',
    selectableRows: false,
    onRowClick: handlePatientClick
  };

  const prescriptionDataTableOptions = {
    filterType: 'none',
    selectableRows: false
  };

  function handlePatientClick(patient) {
    history.push(`/patientInfo`, patient[0]);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/patients/${user.id}`)
        .then(res => {
          if (!res.ok) {throw res}
          return(res.json())})
        .then((data) => {
          data.patients.forEach(obj => {
            obj["name"] = obj["first_name"] + " " + obj["last_name"];
          });

          setPatients(data.patients)
          console.log(data.patients)
        })
        .catch((res) => {
          console.log("ERROR - retrieving patients")
        })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:5000/prescriptionsForDoctor/${user.id}`)
        .then(res => {
          if (!res.ok) {throw res}
          return(res.json())})
        .then((data) => {
          setPrescriptions(data.prescriptions)
          console.log(data.prescriptions)
        })
        .catch((res) => {
          console.log("ERROR - retrieving prescriptions")
        })
  }, [])

    return (
      <div className={classes.root}>
      <GridContainer>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Appointments</p>
              <h3 className={classes.cardTitle}>61</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 7 Days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Prescriptions</p>
              <h3 className={classes.cardTitle}>
                31
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 7 Days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Appointments</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 52%
                </span>{" "}
                increase in today's appointments.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={dailyPrescriptionChart.data}
                type="Line"
                options={dailyPrescriptionChart.options}
                listener={dailyPrescriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Prescriptions</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 29%
                </span>{" "}
                increase in today's prescriptions.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
        <GridContainer>

        <GridItem xs={12} sm={6} md={6}>
        <MUIDataTable
          title={"Patient List"}
          data={patients}
          columns={patientColumns}
          options={patientDataTableOptions}/>
          </GridItem>

        <GridItem xs={12} sm={6} md={6}>
        <MUIDataTable
          title={"Prescription List"}
          data={prescriptions}
          columns={prescriptionColumns}
          options={prescriptionDataTableOptions}/>
          </GridItem>

          </GridContainer>
      </div>
    )

}
