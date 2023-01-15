import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { login } from "./API";
import Register from "./Register";

function Guest({ loginHandler }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {

    try {
      const user = await login(username, password);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      return loginHandler(user);
    } catch (response) {
      setError(error);
    }
  };

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassowrd = (event) => setPassword(event.target.value);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpenRegister = () => {
    setOpen(false);
    setOpenRegister(true);
  };

  const handleCloseRegister = () => setOpenRegister(false);
  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>

        <p style={{ margin: 0, padding: 0, textAlign: "center" }}>
          Do Not Have Any Account?{" "}
          <Button color="success" onClick={handleOpenRegister}>
            Register
          </Button>
        </p>

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
            id="username"
            label="Username"
            onChange={handleChangeUsername}
            margin="dense"
            autoFocus
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Register handleClose={handleCloseRegister} open={openRegister} />
    </React.Fragment>
  );
}

export default Guest;
