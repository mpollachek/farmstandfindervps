import { 
  Button, 
  Label, 
  Col, 
  FormGroup, 
  Input, 
  Row, 
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState, useEffect } from "react";
//import { validateCreateListingForm } from "../utils/validateCreateListingForm";
import MultipleFileUpload from "../utils/MultipleFileUpload";

const CreateListingForm = ({addressState = false, latLongState= true, lat = "", long = "", addressChecked=true, latlongChecked=false}) => {

  if (lat!=0 && long!=0){
    addressState=true;
    latLongState=false;
    addressChecked=false;
    latlongChecked=true;
  }  

  const initialAddressState = () => {
    if (addressState){
      return true;
    } else {return false}
  }

  const initialLatlongState = () => {
    if (latLongState){
      return true;
    } else {return false}
  }

  const [addressDisabled, setAddressDisabled] = useState(initialAddressState);

  const [latLongDisabled, setLatLongDisabled] = useState(initialLatlongState);

  console.log("lat: " + lat);
  console.log("long: " + long);
  console.log("addressState: " + addressState);
  console.log(" initial addressState: " + initialAddressState);
  console.log("addressDisabled: " + addressDisabled);
  console.log("latLongState: " + latLongState);
  console.log("initial latLongState: " + initialLatlongState);
  console.log("latlongdisabled: " + latLongDisabled);  

  const useAddress = (event) => {
    if (event.target.value = true) {
      setAddressDisabled(false);
      setLatLongDisabled(true);
      console.log("latlongdisabled: " + latLongDisabled)
      console.log("addressdisabled: " + addressDisabled)
    }
  }

  const useLatLong = (event) => {
    if (event.target.value = true) {
      setAddressDisabled(true);
      setLatLongDisabled(false);
      console.log("addressdisabled: " + addressDisabled)
      console.log("latlongdisabled: " + latLongDisabled)
    }
  }

  const initialValues = {
    farmstandName: "",
        image: "",
        description: "",
        products: [''],
        latitude: {lat},
        longitude: {long},
        road: "",
        town: "",
        state: "",
        country: "",
      
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log("form values:", values);
    console.log("in JSON format:", JSON.stringify(values));
    resetForm();
  };
  return (
    
    <Formik
      initialValues={initialValues}
        
      onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form>
        <FormGroup row tag="fieldset">
          <Col className="text-center">
          <FormGroup check inline>
        <Input
        onChange={useAddress}
          name="locationradio"
          type="radio"
          id="addressradio"
          defaultChecked={addressChecked}
        />
        {' '}
        <Label  htmlFor="locationradio" check>
          Use Address
        </Label>
      </FormGroup>
      <FormGroup check inline>
        <Input
        onChange={useLatLong}
          name="locationradio"
          type="radio"
          id="latlongradio"
          defaultChecked={latlongChecked}
        />
        {' '}
        <Label  htmlFor="locationradio" check>
          Use Latitude/Longitude
        </Label>
      </FormGroup>
          </Col>
        </FormGroup>


        <FormGroup row>
          <Col md="6">
          <Label htmlFor="farmstandName">Farmstand Name</Label>
          <br/>
            <Field
              className="form-control"
              name="farmstandName"
              placeholder="farmstand Name"
            />
            <ErrorMessage name="farmstandName">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
          <Col md="6">
          <Label htmlFor="road">road</Label>
          <br/>
            <Field
              className="form-control"
              name="road"
              placeholder="road number and name"
              disabled={addressDisabled}
            />
            <ErrorMessage name="road">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <FormGroup row>
        <Col md="4">
            <Label htmlFor="town" md="4">
              Town
            </Label>
            <Field
                className="form-control"
                name="town"
                placeholder="Town"
                disabled={addressDisabled}
              />
              <ErrorMessage name="town">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </Col>
          <Col md="4">
            <Label htmlFor="state" md="4">
              State
            </Label>
            <Field
                className="form-control"
                name="state"
                placeholder="State"
                disabled={addressDisabled}
              />
              <ErrorMessage name="state">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </Col>            
            <Col md="4">
            <Label htmlFor="country" md="4">
              Country
            </Label>
            <Field
                className="form-control"
                name="country"
                placeholder="Country"
                disabled={addressDisabled}
              />
              <ErrorMessage name="country">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </Col>
          </FormGroup>

          <FormGroup row>
          <Col md="6">
          <Label htmlFor="latitude">Latitude</Label>
          <br/>
            <Field
              className="form-control"
              name="latitude"
              placeholder="latitude"
              value={lat}
              disabled={latLongDisabled}
            />
            <ErrorMessage name="latitude">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
          <Col md="6">
          <Label htmlFor="longitude">Longitude</Label>
          <br/>
            <Field
              className="form-control"
              name="longitude"
              placeholder="longitude"
              value={long}
              disabled={latLongDisabled}
            />
            <ErrorMessage name="longitude">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>



        <FormGroup row>
          <Label htmlFor="description">Description</Label>
          <Col>
            <Field
              className="form-control"
              name="description"
              as="textarea"
              rows="6"
            />
          </Col>
        </FormGroup>

        <FormGroup row className='form-control'>
          <label htmlFor="products">Products For Sale</label>
          <Col>
          <FieldArray name='products'>
            {fieldArrayProps => {
                const { push, remove, form } = fieldArrayProps
                const { values } = form
                const { products } = values
                return (
                  <div>
                  {products.map((product, index) => (
                    <div key={index}>
                      <Field name={`products[${index}]`}  />
                      {index > 0 && (
                      <button type='button' 
                      onClick={() => remove(index)}>{' '} Remove Product{' '}</button>
                      )}
                      {products.length - 1 === index && (
                      <button type='button' 
                      onClick={() => push('')}>{' '}Add Product{' '}</button>
                      )}
                    </div>
                  ))}
                  </div>
                )
              }
            }

          </FieldArray>
          </Col>
        </FormGroup>
        <FormGroup row>
          <label htmlFor="images">Upload Farmstand Images</label>
          <Col>
            <MultipleFileUpload />
          </Col>
        </FormGroup>
        
        
        <FormGroup row>
          <Col md={{ size: 10, offset: 2 }}>
            <Button type="submit" color="primary">
              Post Farmstand
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Formik>
  );
};

export default CreateListingForm;
