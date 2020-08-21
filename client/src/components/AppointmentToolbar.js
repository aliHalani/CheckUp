import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

export default function AppointmentToolbar(props) {
  const {open, setOpen} = props;

  return (
    <React.Fragment>
      <Tooltip title={"Add Appointment"}>
        <IconButton onClick={() => props.setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );

}