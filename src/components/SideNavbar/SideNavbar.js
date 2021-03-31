import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useLocation, withRouter } from "react-router-dom";
import Routes from "../../utils/Routes";

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

   const activeRoute = (routeName) => {
      return props.location.pathname === routeName ? true : false;
   };

   const drawer = (
      <div>
         <div className={classes.toolbar} />
         <Divider />
         <List>
            <NavLink to={"/"} key="Budget">
               <ListItem selected={activeRoute("/")}>
                  <ListItemText primary="Budget" />
               </ListItem>
            </NavLink>
            <NavLink to={"/calendar"} key="Calendar">
               <ListItem
                  selected={activeRoute("/calendar")}
                  button
                  key="Calendar"
               >
                  <ListItemText primary="Calendar" />
               </ListItem>
            </NavLink>
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

export default withRouter(SideNavbar);
