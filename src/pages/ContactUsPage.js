import { useState, useContext } from "react";
import { FormGroup, Label, Button, Col, Row, Container } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import SubHeader from '../components/SubHeader';
import { UserContext } from "../App";
import axios from "axios";
import { backendUrl } from "../config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUsPage = () => {

  const { userId,  userName, userEmail } = useContext(UserContext);

  const contactEmailNotify = (responseMessage) => 
  toast.success(`${responseMessage}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const contactEmailFailureNotify = (responseMessage) => 
  toast.error(`${responseMessage}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const initialContactValues = {
    userName: userName,
    userEmail: userEmail,
    userId: userId,
    message: ''
  }

  const contactHandler = async (values) => {
    console.log('values', values)
    try {
      await axios.post(
      `${backendUrl}/api/users/contactus`,
      {
        values
      })
      .then((contact) => {
        console.log(contact)
        if (contact.status === 200) {
          contactEmailNotify(contact.data)
        } else {
          contactEmailFailureNotify(contact.data)
  }})
    } catch (error) {
      console.error(error);
  }}

  return(
    <Container>
      <SubHeader current="Contact Us" detail={false} />
      <ToastContainer />
      <Formik
        onSubmit={contactHandler}
        //validationSchema={contactSchema}
        initialValues={initialContactValues}
        >
          <Form>
            <FormGroup>
              <Row>
                <Col>
                  <Label htmlFor="userName" lg={4} sm={6} xs={12} >Name
                  <Field
                    className="form-control"
                    name="userName"
                    placeholder="johndoe"
                  />                  
                  <ErrorMessage name="userName">
                    {(msg) => <p className="text-danger">{msg}</p>}
                  </ErrorMessage>
                  </Label>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label htmlFor="userEmail" lg={4} sm={6} xs={12} >Email
                  <Field
                    className="form-control"
                    name="userEmail"
                    placeholder="johndoe@email.com"
                  />
                  <ErrorMessage name="userEmail">
                    {(msg) => <p className="text-danger">{msg}</p>}
                  </ErrorMessage>
                  </Label>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label htmlFor="message">Message</Label>
                  <Field
                    className="form-control"
                    name="message"
                    as="textarea"
                    rows="12"
                    placeholder="Tell us anything! We are open to ideas, suggestions and want to fix any bugs you may encounter."
                  />
                  <ErrorMessage name="message">
                    {(msg) => <p className="text-danger">{msg}</p>}
                  </ErrorMessage>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col className="text-center">
                  <Button type="submit" color="success" className="mx-3">
                    Send Message
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Formik>
    </Container>
  )
}

//formik form contact us and show support email on page
//if signed in auto add user name, email, id. have email sent to user and support email when submitting form.  
//if not signed in have user input name, email
//textarea for message

export default ContactUsPage