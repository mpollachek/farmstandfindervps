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
import axios, {Axios} from "axios";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { selectFarmstandById } from "../farmstands/farmstandFilter";

/* Create duplicate NewFarmstand.js and CreateListingForm.js files and remove ability to use address.  Free geocoding has been inaccurate and finding locations on map is easier */

const EditProductsForm = ({farmstandId, prevProducts, setFarmstand}) => {  

  const [modalOpen, setModalOpen] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [runGetProducts, setRunGetProducts] = useState(true);

  const getAllProducts = async () => {
    if (runGetProducts) {
    let allPostedProducts = await axios.get(`http://localhost:8080/api/farms/getallproducts`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("allPostedProducts: ", allPostedProducts)
    setAllProducts(allPostedProducts.data);
    setRunGetProducts(false);
  }}

  useEffect(() => {
    getAllProducts();
  }, [])

  const initialValues = {
    products: prevProducts,
    newProducts: [''],
  };
  console.log("farmstandId edit products form: ", farmstandId)

  const getFarmstand = async () => {
    const farm = await selectFarmstandById(farmstandId);
    setFarmstand(farm);
}

  const handleSubmit = async (values) => {
    let token = ""
  if (localStorage.getItem("token")) {
    token = await localStorage.getItem("token");
  } else if (localStorage.getItem("google")) {
    token = await localStorage.getItem("google");
  } else if (localStorage.getItem("facebook")) {
    token = await localStorage.getItem("facebook");
  }
  
    console.log("post: ", values);
    try {
      await axios.put(
        `http://localhost:8080/api/farms/${farmstandId}/editproducts`,
        values,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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
      <FoodBankIcon /> Edit Products
    </Button>
    <Modal isOpen={modalOpen}size='lg' >
      <ModalHeader toggle={() => setModalOpen(false)}>
        Edit Products or Services
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
          {allProducts.map((item, index) => {
              return(
              <Label check md={4} sm={6}>
              <Field type='checkbox' name="products" value={item} key={index} />
              {" "} {item} {" "}
            </Label>
              )})            
            }
            <FieldArray name="newProducts" type="file">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { newProducts } = values;
                return (
                  <div>
                    {newProducts.map((product, index) => (
                      <div key={index}>
                        <Field name={`newProducts[${index}]`} />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            {" "}
                            Remove Product{" "}
                          </button>
                        )}
                        {newProducts.length - 1 === index && (
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
              Edit Products/Services Offered
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

export default EditProductsForm;
