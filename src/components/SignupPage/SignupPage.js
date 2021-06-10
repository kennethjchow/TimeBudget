import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./SignupPage.css";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import Auth from "@aws-amplify/auth";
import { onError } from "../../libs/errorLib";

export default function SignupPage() {
   const [fields, handleFieldChange] = useFormFields({
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
   });

   const history = useHistory();
   const [newUser, setNewUser] = useState(null);
   const { userHasAuthenticated } = useAppContext();
   const [isLoading, setIsLoading] = useState(false);

   function validateForm() {
      return (
         fields.email.length > 0 &&
         fields.password.length > 0 &&
         fields.password === fields.confirmPassword
      );
   }

   async function handleSubmit(event) {
      event.preventDefault();

      setIsLoading(true);

      try {
         const newUser = await Auth.signUp({
            username: fields.email,
            password: fields.password,
         });
         setIsLoading(false);
         setNewUser(newUser);
      } catch (e) {
         onError(e);
         setIsLoading(false);
      }
   }

   async function handleConfirmationSubmit(event) {
      event.preventDefault();

      setIsLoading(true);

      try {
         await Auth.confirmSignUp(fields.email, fields.confirmationCode);
         await Auth.signIn(fields.email, fields.password);

         userHasAuthenticated(true);
         history.push("/");
      } catch (e) {
         onError(e);
         setIsLoading(false);
      }
   }

   function validateConfirmationForm() {
      return fields.confirmationCode.length > 0;
   }

   function renderConfirmationForm() {
      return (
         <Form onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" size="lg">
               <Form.Label>Confirmation Code</Form.Label>
               <Form.Control
                  autoFocus
                  type="tel"
                  onChange={handleFieldChange}
                  value={fields.confirmationCode}
               />
               <Form.Text muted>
                  Please check your email for the code.
               </Form.Text>
            </Form.Group>
            <Button
               block
               size="lg"
               type="submit"
               variant="success"
               disabled={!validateConfirmationForm()}
            >
               Verify
            </Button>
         </Form>
      );
   }

   function renderForm() {
      return (
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" size="lg">
               <Form.Label>Email</Form.Label>
               <Form.Control
                  autoFocus
                  type="email"
                  onChange={handleFieldChange}
                  value={fields.email}
               />
            </Form.Group>
            <Form.Group controlId="password" size="lg">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  value={fields.password}
                  onChange={handleFieldChange}
               />
            </Form.Group>
            <Form.Group controlId="confirmPassword" size="lg">
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  type="password"
                  onChange={handleFieldChange}
                  value={fields.confirmPassword}
               />
            </Form.Group>
            <Button
               block
               size="lg"
               type="submit"
               variant="success"
               disabled={!validateForm()}
            >
               Signup
            </Button>
            <div className="register-container">
               Already have an account? &nbsp;<Link to="/login">Login</Link>
            </div>
         </Form>
      );
   }

   return (
      <div className="Signup">
         {newUser === null ? renderForm() : renderConfirmationForm()}
      </div>
   );
}
