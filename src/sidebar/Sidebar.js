import {
  Button as RSButton,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  List
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState, useEffect, useMemo } from "react";
import '../css/Sidebar.css';

const Sidebar = ({
  sidebarProducts,
  setSidebarProducts,
  sidebarSeasons,
  setSidebarSeasons,
  sidebarSearch,
  setSidebarSearch,
}) => {

  let products = sidebarProducts;
  let seasons = sidebarSeasons;
  let search = sidebarSearch;

  //const [tempArray, setTempArray] = useState(products);
  let tempArray = products.slice();
  const [tempProducts, setTempProducts] = useState([])

  const initialValues = {
    products: products,
    seasons: seasons,
    search: search,
    tempArray: tempArray
  };

  console.log("initialValues: ", initialValues);

  const MapProducts = () => {
    return(
      products.map((product, index) => (                      
        <div key={index}> 
        {console.log("return tempArray product: ", product)}
          <List type="unstyled"> 
          {/* {`${tempArray[index]}`} */}
          {product}
          {index > 0 && (
            <button type="button" onClick={() => tempArray.splice(index, 1)}>
              {" "}
              <strong>X</strong>{" "}
            </button>
          )}
          </List>          
        </div>
      ))    
  )};

            

  return (
    /* 
          mileage slider 
          products list (add to list)
          seasons open (checkboxes)
         */

    <Formik
      initialValues={initialValues}
      //onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form>
        
          <Col className="text-center">
            <strong>Seasons Open</strong> <br/>
            </Col>
          <FormGroup row check>
            <Col>
            <Input 
            name="harvestCheckbox"
            type="checkbox" 
            id="harvestCheckbox" 
            /> 
            <Label check>Harvest (late spring, summer, early Fall)
            </Label>
            </Col>
          </FormGroup>
          <FormGroup row check>
            <Col>
            <Input 
            name="yearRoundCheckbox"
            type="checkbox" 
            id="yearRoundCheckbox" 
            />  
            <Label check>Year Round
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row className="form-control">
          <label htmlFor="tempArray">Filter farmstand by products For Sale</label>
          <Col>
            <FieldArray name="tempArray" >
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                console.log("form: ", form);
                const { values } = form;
                const { tempArray } = values;
                return (
                  <div>
                    <Field 
                    name='newProduct'
                    placeholder='product for sale'
                    />

                    
                    <button
                          type="button"
                          onClick={ () => {
                            tempArray.push(values.newProduct);
                            setTempProducts([tempArray])
                            //tempProducts.push(values.newProduct);
                            //setTempProducts(...tempProducts, values.newProduct);
                            //setTempArray([...tempArray, values.newProduct]);
                            //setSidebarProducts([...products, values.newProduct])
                            console.log("all products: ", sidebarProducts);
                            console.log("tempArray: ", tempArray);
                            console.log("values: ", values.newProduct );
                            console.log("tempProducts: ", tempProducts );
                          }}
                        >
                          {" "}
                          Add Product{" "}
                        </button>

                      {/* below is running map function when typing in field input rather than onclick. onclick also should delete what is in field */}

                        {/* <MapProducts /> */}


                        {/* Sidebar is rerendering when state is changing.  try usestate in sidebar rather than passing into component from map.  rerender what is in sidebar, not the sidebar component in map */}

                    {tempArray.map((product, index) => (                      
                      <div key={index}> 
                      {console.log("return tempArray product: ", product)}
                      {console.log("temp Products in map fn: ", tempProducts)}
                      {console.log("All Products: ", products)}

                        <List type="unstyled"> 
                        {/* {`${products[index]}`}      */}
                        <p>{product} {" "}
                        {index >= 0 && (
                          <button type="button" onClick={() => 
                          {remove(index);
                          setTempProducts([tempArray])
                          }}>
                            {" "}
                            <strong>X</strong>{" "}
                          </button>
                        )}
                        </p> 
                        </List>
                        
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
            <RSButton type="submit" color="primary">
              Post Farmstand
            </RSButton>
          </Col>
        </FormGroup>

      </Form>
    </Formik>
  );
};

export default Sidebar;





{/* <FormGroup row className="form-control">
          <label htmlFor="products">Products For Sale</label>
          <Col>
            <FieldArray name="products" type="file">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                console.log("form: ", form);
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
                            <strong>X</strong>{" "}
                          </button>
                        )}
                        {products.length - 1 === index && (
                          <button
                            type="button"
                            onClick={() => {
                              push("");
                              console.log("product: ", product);
                              console.log("all products: ", products);
                            }}
                          >
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
        </FormGroup> */}