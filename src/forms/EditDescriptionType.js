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
import DescriptionIcon from '@mui/icons-material/Description';
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow } from "@fortawesome/free-solid-svg-icons"; // dairy
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"; // produce
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons"; // meat
import { faEgg } from "@fortawesome/free-solid-svg-icons"; // eggs
import { faTents } from "@fortawesome/free-solid-svg-icons"; // farmers market
import { faChildren } from "@fortawesome/free-solid-svg-icons"; // Play Area
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons"; // therapy
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; // garden center

/* Create duplicate NewFarmstand.js and CreateListingForm.js files and remove ability to use address.  Free geocoding has been inaccurate and finding locations on map is easier */

const EditDescriptionType = ({farmstandId, prevName, prevDescription, prevFarmstandType, prevSeasons, setFarmstand}) => {  

  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState(prevDescription)
  const [farmstandType, setFarmstandType] = useState(prevFarmstandType)
  const [farmstandName, setFarmstandName] = useState(prevName)
  const [seasons, setSeasons] = useState(prevSeasons[0])

  console.log("prevSeasons: ", prevSeasons)

  const initialValues = {
    description: description,
    farmstandType: farmstandType,
    farmstandName: farmstandName,
    seasons: seasons
  };
  console.log("farmstandId edit products form: ", farmstandId)

  const getFarmstand = async () => {
    const farm = await selectFarmstandById(farmstandId);
    setFarmstand(farm);
}

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    console.log("post: ", values);
    try {
      await Axios.put(
        `http://localhost:8080/api/farms/${farmstandId}/editDescription`,
        {
        description: description,
        farmstandName: farmstandName,
        values,
        },
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
      className="my-3"
      color="primary"
    >
      <DescriptionIcon /> Edit Name/Description
    </Button>
    <Modal isOpen={modalOpen} size='lg'>
      <ModalHeader toggle={() => setModalOpen(false)}>
        Edit Description and Type of Location
      </ModalHeader>
      <ModalBody>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form>
      <FormGroup row>
          <Col md="6">
            <Label htmlFor="farmstandName" >
              <h5 style={{fontWeight: 'bold'}}>
              Farmstand Name
              </h5>
            </Label>
            
            <br />
            <Field
              className="form-control"
              name="farmstandName"
              placeholder="farmstand Name"
              value={farmstandName}
              onChange={(e) => setFarmstandName(e.target.value)}
            />
            <ErrorMessage name="farmstandName">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>

        <FormGroup row check >
        <h5 style={{fontWeight: 'bold'}}>
        Farmstand Type/Services (check all that apply)
        </h5>
          <Col > 
            <Label check md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='produce' />
              {" "} Produce {" "}
              <span style={{fontSize: '1.5em', color: 'red'}} >
              <FontAwesomeIcon icon={faPepperHot} />
              </span>
            </Label>          
            <Label check md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='meat' />
              {" "} Meat {" "}
              <span style={{fontSize: '1.5em', color: 'brown'}} >
              <FontAwesomeIcon icon={faDrumstickBite} />
              </span>
            </Label>          
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='dairy' />
              {" "} Dairy {" "}
              <span style={{fontSize: '1.5em', color: 'black'}} >
              <FontAwesomeIcon icon={faCow} />
              </span>
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='eggs' />
              {" "} Eggs {" "}
              <span style={{fontSize: '1.5em', color: '#66a1ed'}} >
              <FontAwesomeIcon icon={faEgg} />
              </span>
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='farmersMarket' />{" "} Farmers Market {" "}
              <span style={{fontSize: '1.5em', color: '#853e00'}} >
              <FontAwesomeIcon icon={faTents} />
              </span>
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='gardenCenter' />{" "} Garden Center {" "}
              <span style={{fontSize: '1.5em', color: '#098200'}} >
              <FontAwesomeIcon icon={faSeedling} />
              </span>
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='playArea' />{" "} Play Area {" "}
              <span style={{fontSize: '1.5em', color: '#20b2bd'}} >
              <FontAwesomeIcon icon={faChildren} />
              </span>
            </Label>
            <Label check md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='therapy' />{" "} Therapy {" "}
              <span style={{fontSize: '1.5em', color: '#800915'}} >
              <FontAwesomeIcon icon={faUserDoctor} />
              </span>
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row check >
        <h5 style={{fontWeight: 'bold'}}>
        Seasons Open (seasonal during harvest time or year round)
        </h5>
          <Col > 
            <Label check md={3} sm={6} xs={12}>
              <Field type='radio' name="seasons" value='yearRound' />
              {" "} Year Round
            </Label>
            <Label check md={3} sm={6} xs={12}>
              <Field type='radio' name="seasons" value='harvest' />
              {" "} harvest
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="description">
            <h5 style={{fontWeight: 'bold'}}>
              Description
            </h5>  
          </Label>
          <Col>
            <Field
              className="form-control"
              name="description"
              as="textarea"
              rows="6"
              value={description}
              onChange={(e) => { 
                setDescription(e.target.value)
                console.log("e.target: ", e.target.value)
                console.log("description: ", description)
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col  className='text-center'>
            <Button type="submit" color="primary">
              Submit Changes
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

export default EditDescriptionType;
