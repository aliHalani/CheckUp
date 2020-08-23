import React, {useContext} from 'react';
import DoctorDashboard from '../views/DoctorDashboard'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './LoginPage'
import PatientDashboard from '../views/PatientDashboard'
import DashboardRouter from './DashboardRouter';
import {UserContext} from 'components/context/UserContext';


export default function AppRoutes() {
    let [user, setUser] = useContext(UserContext);

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/teacher/course/" component={DoctorDashboard} />
                <Route exact path="/patientInfo" component={PatientDashboard} />
                <Route exact path="/dashboard" component={DashboardRouter} />
                <Route render={() => {
                    return (
                        user.type === "doctor" || user.type === "patient" ?
                            <Redirect to="/dashboard" /> :
                            <Redirect to="/" />
                    )
                }} />
            </Switch>
        </Router>
    )
}