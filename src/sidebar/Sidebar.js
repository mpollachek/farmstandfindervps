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


/* NOTE TO SELF: NEXT STEP IS ENSURING FILTER STATE IS PASSED TO SERVER AND NOT SELECTING ANY PRODUCTS MEANS ALL PRODUCTS.  ALSO CLEAR INPUT FIELD WHEN ADDING PRODUCT. NEED TO CHECK IF STATE STAYS WHEN CLOSING AND REOPENING SIDEBAR. */


// const Sidebar = ({
//   sidebarProducts,
//   setSidebarProducts,
//   sidebarSeasons,
//   setSidebarSeasons,
//   sidebarSearch,
//   setSidebarSearch,
// }) => {

//   let products = sidebarProducts;
//   let seasons = sidebarSeasons;
//   let search = sidebarSearch;

const Sidebar = ({
  setSidebarProducts,
  setSidebarSeasons,
  setSidebarSearch,
  sidebarSeasons,
  sidebarProducts,
  setRunGet,
  runGet,
  toggleOffcanvas
}) => {

  const [tempArray, setTempArray] = useState(sidebarProducts)
  const [yearRoundSeasonsState, setYearRoundSeasonsState] = useState(true)
  const [harvestSeasonsState, setHarvestSeasonsState] = useState(false)
  const [productsInput, setProductsInput] = useState('')

  const initialValues = {
    search: "",
    tempArray: sidebarProducts,
  };

  console.log("initialValues: ", initialValues);
  console.log("initialValues sidebarProducts: ", sidebarProducts);
  console.log("initialValues sidebarProducts: ", typeof(sidebarProducts));

  const handleSubmit = () => {
    if (!yearRoundSeasonsState) {
      setSidebarSeasons('harvest')
    } else { setSidebarSeasons('yearRound') }
    setSidebarProducts(tempArray)
    console.log("for submit, sidebarSeasons: ", sidebarSeasons);
    console.log("for submit, sidebarProducts: ", sidebarProducts);
    console.log("for submit, sidebarProducts: ", typeof(sidebarProducts));
    console.log("for submit, tempArray: ", tempArray);
    console.log("for submit, tempArray: ", typeof(tempArray));
    setRunGet(true);
    console.log("runget: ", runGet);
    toggleOffcanvas();
  }

  useEffect(() => {
    if (sidebarSeasons === 'harvest'){
    setHarvestSeasonsState(true)
    setYearRoundSeasonsState(false)
}}, [])

  return (
    /* 
          mileage slider 
          products list (add to list)
          seasons open (checkboxes)
         */

    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form>
        
          <Col className="text-center">
            <strong>Seasons Open</strong> <br/>
            </Col>
          <FormGroup tag="fieldset">
          <FormGroup row check >
            <Col>
            <Input 
            name="seasonsRadio"
            type="radio" 
            id="harvestRadio"
            checked={harvestSeasonsState}
            onChange={() => 
              {setHarvestSeasonsState(true)
              setYearRoundSeasonsState(false)}
            }
            /> 
            <Label check>Harvest (late spring, summer, early Fall)
            </Label>
            </Col>
          </FormGroup>
          <FormGroup row check default>
            <Col>
            <Input 
            name="seasonsRadio"
            type="radio" 
            id="yearRoundRadio" 
            checked={yearRoundSeasonsState}
            onChange={() => 
              {setYearRoundSeasonsState(true)
              setHarvestSeasonsState(false)}
            }
            />  
            <Label check>Year Round
            </Label>
          </Col>
        </FormGroup>
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
                            console.log("values: ", values );
                            if (values.newProduct) {
                            tempArray.push(values.newProduct);
                            setTempArray([...tempArray])
                            setSidebarProducts(tempArray)
                            console.log("tempArray: ", tempArray);
                            console.log("values: ", values );
                            form.setFieldValue("newProduct", '')
                          }}}
                        >
                          {" "}
                          Add Product{" "}
                        </button>

                    {tempArray.map((product, index) => {
                      return(
                      <div key={index} value={product} > 
                      {console.log("return tempArray product: ", product)}

                        <List type="unstyled"> 
                        {/* {`${products[index]}`}      */}
                        <p>{product} {" "}
                        {index >= 0 && (
                          <button type="button" onClick={() => 
                          {console.log("remove item: ", tempArray[index])
                            //remove(index);
                            tempArray.splice(index, 1)
                            setTempArray([...tempArray])
                            console.log("tempArray before setSidebarProducts: ", tempArray);
                            console.log("index to remove: ", index)
                            setSidebarProducts(tempArray)
                          }}>
                            {" "}
                            <strong>X</strong>{" "}
                          </button>
                        )}
                        </p> 
                        </List>
                        
                      </div>
                  )})}

                  </div>
                );
              }}
            </FieldArray>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md={{ size: 10, offset: 2 }}>
            <RSButton type="submit" color="primary">
              Search with Filters
            </RSButton>
          </Col>
        </FormGroup>

      </Form>
    </Formik>
  );
};

export default Sidebar;