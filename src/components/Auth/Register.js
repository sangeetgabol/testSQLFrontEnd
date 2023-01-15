import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Swal from "sweetalert2";
import { register } from "./API";

function Register({ handleClose, open }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (confpassword === password) {
      try {
        const user = await register(
          username,
          password,
          firstName,
          lastName,
          email
        );
        console.log(user);
        Swal.fire({
          text: "Register Successfully",
          icon: "success",
          showCloseButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
        handleClose();
      } catch (response) {
        const error = await response.text();
        setError(error);
      }
    } else {
      Swal.fire({
        text: "Password Does not Matched",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassowrd = (event) => setPassword(event.target.value);
  const handleChangeConfirmPassowrd = (event) =>
    setConfirmPassword(event.target.value);
  const handleChangeFirstName = (event) => setFirstName(event.target.value);
  const handleChangeLastName = (event) => setLastName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register</DialogTitle>

        {error && (
          <DialogContent>
            <DialogContentText color="error" align="center">
              {error}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogContent>
          <TextField
            type="text"
            id="firstName"
            label="FirstName"
            onChange={handleChangeFirstName}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            type="text"
            id="lastName"
            label="LastName"
            onChange={handleChangeLastName}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            type="text"
            id="email"
            label="Enail"
            onChange={handleChangeEmail}
            margin="dense"
            // autoFocus
            fullWidth
            required
          />
          <TextField
            type="text"
            id="username"
            label="Username"
            onChange={handleChangeUsername}
            margin="dense"
            // autoFocus
            fullWidth
            required
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            onChange={handleChangePassowrd}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            type="password"
            id="password"
            label="Confirm Password"
            onChange={handleChangeConfirmPassowrd}
            margin="dense"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Cancel
          </Button>
          <Button onClick={handleRegister} variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Register;
