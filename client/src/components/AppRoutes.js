import React from 'react';
import DoctorDashboard from '../views/DoctorDashboard'
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import Patient from '../views/Patient'
import DashboardRouter from './DashboardRouter';


export default function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/teacher/course/" component={DoctorDashboard} />
                <Route exact path="/patientInfo" component={Patient}/>
                <Route exact path="/dashboard" component={DashboardRouter}/>
            </Switch>
        </Router>
    )
}