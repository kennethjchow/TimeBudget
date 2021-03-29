import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   drawer: {
      [theme.breakpoints.up("sm")]: {
         width: drawerWidth,
         flexShrink: 0,
      },
   },
   // necessary for content to be below app bar
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: drawerWidth,
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
}));

function SideNavbar(props) {
   const classes = useStyles();

   const drawer = (
      <div>
         <div className={classes.toolbar} />
         <Divider />
         <List>
            <ListItem href="/" button key='Budget'>
               <ListItemText primary='Budget' />
            </ListItem>
            <ListItem href="calendar" button key='Calendar'>
               <ListItemText primary='Calendar' />
            </ListItem>
         </List>
         <Divider />
      </div>
   );

   return (
      <div>
         <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
               classes={{
                  paper: classes.drawerPaper,
               }}
               variant="permanent"
               open
            >
               {drawer}
            </Drawer>
         </nav>
      </div>
   );
}

SideNavbar.propTypes = {
   /**
    * Injected by the documentation to work in an iframe.
    * You won't need it on your project.
    */
   window: PropTypes.func,
};

export default SideNavbar;
