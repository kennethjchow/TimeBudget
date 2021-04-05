import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./SignupPage.css";
import { Link } from "react-router-dom";

export default function SignupPage() {
   function renderConfirmationForm() {
      return (
         <Form>
            <Form.Group controlId="confirmationCode" size="lg">
               <Form.Label>Confirmation Code</Form.Label>
               <Form.Control autoFocus type="tel" />
               <Form.Text muted>
                  Please check your email for the code.
               </Form.Text>
            </Form.Group>
            <Button block size="lg" type="submit" variant="success">
               Verify
            </Button>
         </Form>
      );
   }

   function renderForm() {
      return (
         <Form>
            <Form.Group controlId="email" size="lg">
               <Form.Label>Email</Form.Label>
               <Form.Control autoFocus type="email" />
            </Form.Group>
            <Form.Group controlId="password" size="lg">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="confirmPassword" size="lg">
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control type="password" />
            </Form.Group>
            <Button block size="lg" type="submit" variant="success">
               Signup
            </Button>
            <div className="register-container">
               Already have an account? &nbsp;<Link to="/login">Login</Link>
            </div>
         </Form>
      );
   }

   return <div className="Signup">{renderForm()}</div>;
}
