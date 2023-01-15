import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import DialogContent from "@material-ui/core/DialogContent";

// import DeleteIcon from "@material-ui/icons/Delete";
// import UpdateIcon from "@material-ui/icons/Edit";

// import Tile from "./Tile";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import Treemap from "./Charts/Treemap";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { getGroup, updateGroup, removeUserFromGroup } from "../API";

import CloseIcon from "@mui/icons-material/Close";

import GroupUser from "../GroupUser";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import DialogContentText from "@material-ui/core/DialogContentText";

import "./manageGroup.css";

const style = {
  closeButton: { marginRight: 16 },
  flex: { flex: 1 },
};
let myArray;
let user = [];
export default function ManageGroup(props) {
  // state = {
  //   error: null,
  //   group: null,
  // };
  const [error, setError] = useState(null);
  const [group, setGroup] = useState(null);
  const [controlledTitle, setControlledTitle] = useState("");
  // componentDidMount() {
  //   const text = window.location.pathname;
  //   myArray = text.split("/");
  //   console.log(console.log(myArray));
  //   // const { title } = myArray[4];
  //   this.loadGroup(myArray);
  // }

  useEffect(() => {
    const text = window.location.pathname;
    myArray = text.split("/");
    console.log(console.log(myArray));
    // const { title } = myArray[4];
    loadGroup(myArray);
  }, []);
  // const handleUpdateGroup = async () => {
  //   const { id } = props.match.params;
  //   const { controlledTitle } = this.state;

  //   await updateGroup(id, controlledTitle);

  //   this.setState((prevState) => ({
  //     group: { ...prevState.group, title: controlledTitle },
  //   }));
  // };

  const handleRemoveUser = async (userId) => {
    await removeUserFromGroup(props.match.params.id, userId);

    setGroup((prevState) => ({
      group: {
        ...prevState.group,
        users: [...prevState.group.users.filter((user) => user._id !== userId)],
      },
    }));
  };

  const handleChange = (e) =>
    this.setState({ controlledTitle: e.target.value });

  const loadGroup = async (myArray) => {
    console.log("d", myArray);
    const id = myArray[3];
    // console.log(id);
    try {
      const group = await getGroup(id);
      console.log(group);
      user = group.users;
      setGroup(group);
      setControlledTitle(group.title);
      // this.setState({ group, controlledTitle: group.title });
    } catch (response) {
      // const error = await response.text();
      // setError(error);
      // this.setState({ error });
    }
  };

  // render() {
  // const { group, error } = this.state;
  const text = window.location.pathname;
  myArray = text.split("/");
  console.log(console.log(myArray));
  const title = myArray[4];
  const header = (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          component={Link}
          color="inherit"
          to="/"
          style={style.closeButton}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" color="inherit" style={style.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );

  if (!group) {
    return (
      <React.Fragment>
        {header}
        <DialogContent>
          <DialogContentText align="center">
            Loading group information...
          </DialogContentText>
        </DialogContent>
      </React.Fragment>
    );
  }

  const { users, questionMetrics, setMetrics } = group;

  if (error) {
    return (
      <React.Fragment>
        {header}
        <DialogContent>
          <DialogContentText color="error" align="center">
            {error}
          </DialogContentText>
        </DialogContent>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {header}

      <div style={{ margin: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="body1"
              color="textSecondary"
              component="h3"
              gutterBottom
            >
              Members
            </Typography>
            <Paper elevation={2} square>
              <List dense={users.length >= 5} disablePadding>
                {users?.map((user) => (
                  <GroupUser
                    key={user._id}
                    user={user}
                    dense={users.length >= 5}
                    removeHandler={handleRemoveUser}
                  />
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="h3"
                  gutterBottom
                >
                  Group members progress
                </Typography>
                <BarChart data={user} />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="h3"
                  gutterBottom
                >
                  Comparison of question set ratio and their corresponding
                  completed ratio
                </Typography>
                <PieChart data={setMetrics} />
              </Grid>
              <Grid item xs={12} sm={6} xl={9}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="h3"
                  gutterBottom
                >
                  Comparison of question completion
                </Typography>
                <Treemap data={questionMetrics} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
