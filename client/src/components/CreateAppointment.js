import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(6),
    },
    postContent: {
        marginTop: "15px"
    }
}));

export default function DraggableDialog(props) {
    const { open, setOpen } = props;
    const initialAppointment = {
        clinic_id: 1,
        notes: "",
        description: "",
        day: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
        time: new Date(),
        status: "Upcoming"
    };

    const [appointmentDetails, setAppointment] = React.useState(initialAppointment);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleAppointment = () => {
        props.setOpen(false);
        props.addAppointment(appointmentDetails);
        //, day: new Date(appointmentDetails.date).toDateString() 
        setAppointment(initialAppointment);
    };

    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Create Appointment
        </DialogTitle>
                <DialogContent>
                    <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
                    <Select
                        labelId="clinic-select"
                        id="clinic-select-widget"
                        value={appointmentDetails.clinic_id}
                        onChange={(e) => setAppointment({
                            ...appointmentDetails,
                            clinic_id: e.target.value
                        })}
                    >
                        {props.clinics.map(clinic => {
                            return (<MenuItem value={clinic.id} key={clinic.id}>{clinic.name}</MenuItem>)
                        })}
                    </Select>

                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        placeholder="Enter description here..."
                        multiline
                        rows="4"
                        fullWidth
                        variant="outlined"
                        className={classes.postContent}
                        value={appointmentDetails.description}
                        onChange={(e) => setAppointment({
                            ...appointmentDetails,
                            description: e.target.value
                        })}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Notes"
                        placeholder="Enter notes here..."
                        multiline
                        rows="4"
                        fullWidth
                        variant="outlined"
                        className={classes.postContent}
                        value={appointmentDetails.notes}
                        onChange={(e) => setAppointment({
                            ...appointmentDetails,
                            notes: e.target.value
                        })}
                    />
                    <TextField style={{ marginTop: "15px" }}
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={appointmentDetails.day}
                        onChange={(e) => setAppointment({
                            ...appointmentDetails,
                            day: e.target.value
                        })}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={appointmentDetails.time}
                        onChange={(e) => setAppointment({
                            ...appointmentDetails,
                            time: e
                        })}
                    />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAppointment} color="primary">
                        Post
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}