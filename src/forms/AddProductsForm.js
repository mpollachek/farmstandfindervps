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
  FormText,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState, useEffect } from "react";
import Axios from "axios";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import { backendUrl } from "../config";

/* Create duplicate NewFarmstand.js and CreateListingForm.js files and remove ability to use address.  Free geocoding has been inaccurate and finding locations on map is easier */

const AddProductsForm = ({farmstandId, setFarmstand}) => {  

  const [modalOpen, setModalOpen] = useState(false);

  const initialValues = {
    products: [""],
  };
  console.log("farmstandId add products form: ", farmstandId)

  const getFarmstand = async () => {
    const farm = await selectFarmstandById(farmstandId);
    setFarmstand(farm);
}

  const handleSubmit = async (values) => {
    try {
      await Axios.put(
        `${backendUrl}/api/farms/${farmstandId}/addproducts`,
        values
      ).then((response) => {
        console.log("post: ", values);
        console.log("response: " + JSON.stringify(response));
        setModalOpen(false)
        getFarmstand()
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <Button
      onClick={() => setModalOpen(true)}      
      className="mt-1 mb-3"
      color="primary"
    >
      <FoodBankIcon /> Add Products
    </Button>
    <Modal isOpen={modalOpen}>
      <ModalHeader toggle={() => setModalOpen(false)}>
        Add Products or Services
      </ModalHeader>
      <ModalBody>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form
      >

        <FormGroup row className="form-control">
          <label htmlFor="products">
            <h5 style={{fontWeight: 'bold'}}>
            Products For Sale
            </h5>  
          </label>
          <Col>
            <FieldArray name="products" type="file">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { products } = values;
                return (
                  <div>
                    {products.map((product, index) => (
                      <div key={index}>
                        <Field name={`products[${index}]`} />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            {" "}
                            Remove Product{" "}
                          </button>
                        )}
                        {products.length - 1 === index && (
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            Add Product{" "}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md={{ size: 10, offset: 2 }}>
            <Button type="submit" color="primary" className='me-4'>
              Add Products/Services Offered
            </Button>
            <Button onClick={() => setModalOpen(false)} color="primary">
              Cancel
            </Button>  
          </Col>
        </FormGroup>
      </Form>
    </Formik>
    </ModalBody>
      </Modal>
    </>
  );
};

export default AddProductsForm;
