import React, {useContext} from 'react';
import { UserContext } from '../components/context/UserContext';
import DoctorDashboard from 'views/DoctorDashboard';
import PatientDashboard from 'views/PatientDashboard';

export default function DashboardRouter() {
    const [user, setUser, clearUser] = useContext(UserContext);

    return (
        <React.Fragment>
        {user.type === "doctor" ? <DoctorDashboard></DoctorDashboard> : <PatientDashboard></PatientDashboard>}
        </React.Fragment>
    )
    
}