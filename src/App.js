import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Main from "./components/Main/Main";
import SignupPage from "./components/SignupPage/SignupPage";
import React, { useState, useEffect } from "react";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Button from "react-bootstrap/Button";

function App() {
   const [isAuthenticated, userHasAuthenticated] = useState(false);
   const [isAuthenticating, setIsAuthenticating] = useState(true);
   useEffect(() => {
      onLoad();
   }, []);

   async function onLoad() {
      try {
         await Auth.currentSession();
         userHasAuthenticated(true);
      } catch (e) {
         if (e !== "No current user") {
            alert(e);
         }
      }

      setIsAuthenticating(false);
   }

   async function handleLogout() {
      await Auth.signOut();

      userHasAuthenticated(false);
   }
   return (
      !isAuthenticating && (
         <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Router>
               <div className="App">
                  <Switch>
                     <UnauthenticatedRoute
                        path="/login"
                        component={LoginPage}
                     />
                     <UnauthenticatedRoute
                        path="/signup"
                        component={SignupPage}
                     />
                     <AuthenticatedRoute component={Main} />
                  </Switch>
                  <Button onClick={handleLogout}>Logout</Button>
               </div>
               
            </Router>
            
         </AppContext.Provider>
      )
   );
}

export default App;
