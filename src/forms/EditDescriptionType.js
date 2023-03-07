import {
  Button,
  Label,
  Col,
  Collapse,
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
import HoursOpen from "../components/HoursOpen";
import HoursOpenEdit from "../components/HoursOpenEdit";
import DescriptionIcon from '@mui/icons-material/Description';
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import { createListingSchema } from "./validations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow } from "@fortawesome/free-solid-svg-icons"; // dairy
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"; // produce
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons"; // meat
import { faEgg } from "@fortawesome/free-solid-svg-icons"; // eggs
import { faTents } from "@fortawesome/free-solid-svg-icons"; // farmers market
import { faChildren } from "@fortawesome/free-solid-svg-icons"; // Play Area
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons"; // therapy
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; // garden center
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from "../config";

/* Create duplicate NewFarmstand.js and CreateListingForm.js files and remove ability to use address.  Free geocoding has been inaccurate and finding locations on map is easier */

const EditDescriptionType = ({farmstandId, prevName, prevDescription, prevFarmstandType, prevSeasons, setFarmstand, prevHours, prevUseHours}) => {  

  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState(prevDescription)
  const [farmstandType, setFarmstandType] = useState(prevFarmstandType)
  const [farmstandName, setFarmstandName] = useState(prevName)
  const [seasons, setSeasons] = useState(prevSeasons[0])
  const [useHrsSwitch, setUseHrsSwitch] = useState(prevUseHours)
  const [hrsOpen, setHrsOpen] = useState(prevHours)

  //collapse states
  const [typesIsOpen, setTypesIsOpen] = useState(false);
  const [seasonsIsOpen, setSeasonsIsOpen] = useState(false);
  const [descriptionIsOpen, setDescriptionIsOpen] = useState(false);
  const [hoursIsOpen, setHoursIsOpen] = useState(false);
  const toggleTypes = () => setTypesIsOpen(!typesIsOpen);
  const toggleSeasons = () => setSeasonsIsOpen(!seasonsIsOpen);
  const toggleDescription = () => setDescriptionIsOpen(!descriptionIsOpen);
  const toggleHours = () => setHoursIsOpen(!hoursIsOpen);

  console.log("prevSeasons: ", prevSeasons)
  console.log("previous hrs", prevHours)
  console.log("hrsOpen", hrsOpen)

  const initialValues = {
    description: description,
    farmstandType: farmstandType,
    farmstandName: farmstandName,
    seasons: seasons,
    useHours: useHrsSwitch,
    hours: hrsOpen,
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
      await Axios.put(
        `${backendUrl}/api/farms/${farmstandId}/editDescription`,
        {
        description: description,
        farmstandName: farmstandName,
        hours: hrsOpen,
        useHours: useHrsSwitch,
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
      validationSchema={createListingSchema}
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

        <Row className="my-3">
        <div className="text-center">
        <Button color="primary" onClick={toggleTypes} style={{ marginBottom: '1rem', width: '75%' }}>
        Farmstand Types (check all that apply){"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </Button>
      </div>
      <Collapse isOpen={typesIsOpen}>
        <FormGroup row check >
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
        </Collapse>
        </Row>

        <Row className="my-3">
        <div className="text-center">
        <Button color="primary" onClick={toggleSeasons} style={{ marginBottom: '1rem', width: '75%' }}>
        Seasons Open (seasonal during harvest time or year round){"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </Button>
      </div>
      <Collapse isOpen={seasonsIsOpen}>
        <FormGroup row check >
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
        </Collapse>
        </Row>

        <Row className="my-3">
        <div className="text-center">
        <Button color="primary" onClick={toggleDescription} style={{ marginBottom: '1rem', width: '75%' }}>
        Description{"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </Button>
      </div>
      <Collapse isOpen={descriptionIsOpen}>
        <FormGroup row>
          <Label htmlFor="description">
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
        </Collapse>
        </Row>

        <Row className="my-3">
        <div className="text-center">
        <Button color="primary" onClick={toggleHours} style={{ marginBottom: '1rem', width: '75%' }}>
        Hours of Operation (If Applicable){"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </Button>
      </div>
      <Collapse isOpen={hoursIsOpen}>
        <FormGroup row>
        <Label htmlFor="description">
          </Label>        
          <HoursOpenEdit setHrsOpen={setHrsOpen} hrsOpen={hrsOpen} useHrsSwitch={useHrsSwitch} setUseHrsSwitch={setUseHrsSwitch} />
        </FormGroup>
        </Collapse>
        </Row>

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
