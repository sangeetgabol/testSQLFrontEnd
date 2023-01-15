import { useEffect, useState } from "react";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@mui/material/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import DownloadDatabase from "../Database/Download";
import UploadDatabase from "../Database/Upload";
import { listDatabases } from "../SavedDatabase/API";
import Schema from "../Schema";
const styles = (theme) => ({
  drawerDocked: {
    height: "100%",
  },
  drawerPaper: {
    width: "16rem",
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  gutterTop: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
  },
  drawerBottomActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "8px",
  },
  // Necessary for content to be below app bar.
  toolbar: theme.mixins.toolbar,
});

function Sidebar({
  classes,
  open,
  showSchemaHandler,
  uploadDatabaseHandler,
  currentDatabase,
  toggleSidebarHandler,
}) {
  const handleToggleSidebar = () => toggleSidebarHandler(false);
  const [list, setList] = useState([]);
  
  const schema = (
    <Schema
      currentDatabase={currentDatabase}
      showSchemaHandler={showSchemaHandler}
      toggleSidebarHandler={toggleSidebarHandler}
    />
  );

  const schemaActions = (
    <div className={classes.drawerBottomActions}>
      <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandler} />
      <DownloadDatabase currentDatabase={currentDatabase} />
    </div>
  );

  useEffect(() => {
    listDatabases().then((list) => setList(list));
  }, []);
  console.log(list);
  return (
    <div className={classes.container}>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={open}
          onClose={handleToggleSidebar}
          classes={{
            docked: classes.drawerDocked,
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, 
          }}
        >
          <div className={classes.gutterTop}>{schema}</div>
          {schemaActions}
        </Drawer>
      </Hidden>
      <Hidden implementation="css" smDown>
        <Drawer
          classes={{
            docked: classes.drawerDocked,
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <div className={classes.gutterTop}>{schema}</div>

          {schemaActions}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default withStyles(styles)(Sidebar);
