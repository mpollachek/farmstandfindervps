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
import axios from "axios";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState, useEffect, useRef } from "react";
//import { validateCreateListingForm } from "../utils/validateCreateListingForm";
import MultipleFileUpload from "../utils/MultipleFileUpload";
import Axios from "axios";
import HoursOpen from "../components/HoursOpen";
import { createListingSchema } from "./validations";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { selectAllFarmstands } from "../farmstands/farmstandFilter";
import { backendUrl } from "../config";



const CreateListingFormNoAddress = ({ lat, long, toggle2, setFarmstands, refreshLat, refreshLong, boundsDistance, sidebarProducts, sidebarSeasons, setFarmIds }) => {  

  const [files, setFiles] = useState([]);

  const [image, setImage] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const [runGetProducts, setRunGetProducts] = useState(true);

  const [useHrsSwitch, setUseHrsSwitch] = useState(false)

  const [hrsOpen, setHrsOpen] = useState({
    hours: {
      open: {
        sun: {hour: "", min: "", ampm: "" },        
        mon: {hour: "", min: "", ampm: "" },
        tue: {hour: "", min: "", ampm: "" },        
        wed: {hour: "", min: "", ampm: "" },
        thur: {hour: "", min: "", ampm: "" },        
        fri: {hour: "", min: "", ampm: "" },
        sat: {hour: "", min: "", ampm: "" },        
      },
      close: {
        sun: {hour: "", min: "", ampm: "" },        
        mon: {hour: "", min: "", ampm: "" },
        tue: {hour: "", min: "", ampm: "" },        
        wed: {hour: "", min: "", ampm: "" },
        thur: {hour: "", min: "", ampm: "" },        
        fri: {hour: "", min: "", ampm: "" },
        sat: {hour: "", min: "", ampm: "" },
        },
      }
    })

    //collapse states
    const [typesIsOpen, setTypesIsOpen] = useState(false);
    const [seasonsIsOpen, setSeasonsIsOpen] = useState(false);
    const [descriptionIsOpen, setDescriptionIsOpen] = useState(false);
    const [hoursIsOpen, setHoursIsOpen] = useState(false);
    const [productsIsOpen, setProductsIsOpen] = useState(false);
    const toggleTypes = () => setTypesIsOpen(!typesIsOpen);
    const toggleSeasons = () => setSeasonsIsOpen(!seasonsIsOpen);
    const toggleDescription = () => setDescriptionIsOpen(!descriptionIsOpen);
    const toggleHours = () => setHoursIsOpen(!hoursIsOpen);
    const toggleProducts = () => setProductsIsOpen(!productsIsOpen);

  console.log("lat: " + lat);
  console.log("long: " + long);

  const getAllProducts = async () => {
    if (runGetProducts) {
    let allPostedProducts = await axios.get(`${backendUrl}/api/farms/getallproducts`, {
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

  // For Dropzone:
  // const fd = new FormData
  // const [imageSrc, setImageSrc] = useState(undefined);
  // const updateFiles = async (e) => {
  //   console.log("incoming files", e);
  //   console.log("e0: " + e)
  //   setFiles(e);
  //   e.forEach((item, index) => {
  //     console.log("item: " + item)
  //     fd.append(`item[${index}]`, item);
  //   })
  //   console.log("fd: " + JSON.stringify(fd))
  // };
  // const onDelete = (id) => {
  //   setFiles(files.filter((x) => x.id !== id));
  // };
  // const handleSee = (imageSource) => {
  //   setImageSrc(imageSource);
  // };
  // const handleClean = (files) => {
  //   console.log("list cleaned", files);
  // };

  const initialValues = {
    farmstandName: "",
    farmstandType: [],
    seasons: "yearRound",
    image: image,
    description: "",
    products: [""],
    latitude: lat.toString(),
    longitude: long.toString(),
  };

  // const handleSubmitFile = async (e) => {
  //   //const file = e.target.files[0]
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const { response } = await Axios.post(
  //       `${backendUrl}/api/farms`,
  //       formData,
  //       config
  //     );
  //     setImage(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (values) => {
    console.log("files: " + JSON.stringify(files));
    console.log("form values:", values);
    console.log("in JSON format:", JSON.stringify(values));
    console.log("farmstandType: ", values.farmstandType)
    const allProductsArray = values.products.concat(values.productsCheckbox)
    const uniqueProductsArray = [];
    for (const i of allProductsArray) {
      console.log("i", i)
      if (i) {
      if (uniqueProductsArray.includes(i)) {
        continue;
      } else {
        uniqueProductsArray.push(i)
      }
    }}
    console.log("uniqueProductsArray: ", uniqueProductsArray)
    // const productsString = allProductsArray.toString();
    // const productsArray = productsString.split(',')
    // console.log("productsString: ", productsString)
    // console.log("productsArray: ", productsArray)
    //const file = values.target.files[0]
    console.log("image", image)
    const formData = new FormData();
    for (const i of image) {
      formData.append("image", i);
    }
    formData.append("farmstandName", values.farmstandName);
    formData.append("farmstandType", JSON.stringify(values.farmstandType));
    formData.append("seasons", values.seasons);
    formData.append("description", values.description);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("products", JSON.stringify(uniqueProductsArray));
    formData.append("hours", JSON.stringify(hrsOpen));
    formData.append("useHours", useHrsSwitch)
    for (const i of formData.entries()){
    console.log("formdata.entries", i[0] + ': ' + i[1])
    }
    // console.log("formData1", formData)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await Axios.post(
        `${backendUrl}/api/farms`,
        formData,
        config
      ).then((response) => {
        toggle2()
        getFarmstands()
        console.log("post: ", values);
        console.log("formdata: ", formData)
        console.log("hrsOpen", hrsOpen)
        console.log("response: " + JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getFarmstands = async () => {
      const allFarms = await selectAllFarmstands(
        refreshLat,
        refreshLong,
        boundsDistance,
        sidebarProducts,
        sidebarSeasons
      );
      setFarmstands(allFarms);
      //console.log("allFarms: ", allFarms );
      //console.log("object.values allfarms[0].id: ", Object.values(allFarms)[0]._id)
      let farmIdList = [];
      allFarms.forEach((f) => {
        // console.log('f: ', f)
        farmIdList.push(f._id);
        // console.log('farmIdList', farmIdList)
      });
      setFarmIds(farmIdList);
      // console.log("farmIds: ", farmIds)
      if (!allFarms) {
        setFarmstands([]);
        setFarmIds([]);
      }
    }


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={createListingSchema}
      //validate={validateCreateListingForm}
    >
      <Form
      //encType="multipart/form-data"
      >

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
        {/* <h5 style={{fontWeight: 'bold'}}>
        Farmstand Type/Services (check all that apply)
        </h5> */}
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
        {/* <h5 style={{fontWeight: 'bold'}}>
        Seasons Open (seasonal during harvest time or year round)
        </h5> */}
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


        {/* <FormGroup row>
          <Col md="6">
            <Label htmlFor="latitude">Latitude</Label>
            <br />
            <Field
              className="form-control"
              name="latitude"
              placeholder="latitude"
              value={lat}
              disabled={true}
            />
            <ErrorMessage name="latitude">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
          <Col md="6">
            <Label htmlFor="longitude">Longitude</Label>
            <br />
            <Field
              className="form-control"
              name="longitude"
              placeholder="longitude"
              value={long}
              disabled={true}
            />
            <ErrorMessage name="longitude">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup> */}

        <Row className="my-3">
        <div className="text-center">
        <Button color="primary" onClick={toggleDescription} style={{ marginBottom: '1rem', width: '75%' }}>
        Description{"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </Button>
      </div>
      <Collapse isOpen={descriptionIsOpen}>
        <FormGroup row>
          {/* <Label htmlFor="description">
            <h5 style={{fontWeight: 'bold'}}>
              Description
            </h5>  
          </Label> */}
          <Col>
            <Field
              className="form-control"
              name="description"
              as="textarea"
              rows="6"
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
          <HoursOpen setHrsOpen={setHrsOpen} hrsOpen={hrsOpen} useHrsSwitch={useHrsSwitch} setUseHrsSwitch={setUseHrsSwitch} />
        </FormGroup>
      </Collapse>
      </Row>

      <Row className="my-3">
        <div className="text-center">
        <Button color="primary" onClick={toggleProducts} style={{ marginBottom: '1rem', width: '75%' }}>
        Products For Sale{"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </Button>
      </div>
      <Collapse isOpen={productsIsOpen}>
        <FormGroup row className="form-control">
          {/* <label htmlFor="products">
            <h5 style={{fontWeight: 'bold'}}>
            Products For Sale
            </h5>  
          </label> */}
          <Col>
          {allProducts.map((item, index) => {
              return(
              <Label check md={4} sm={6}>
              <Field type='checkbox' name="productsCheckbox" value={item} key={index} />
              {" "} {item} {" "}
            </Label>
              )})            
            }
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
        </Collapse>
      </Row>

        <FormGroup row>
      
          {/* <Dropzone
      style={{ minWidth: "200px" }}
      //view={"list"}
      //onChange={(e) => setImage(e.target.files[0])}
      onChange={updateFiles}
      minHeight="195px"
      onClean={handleClean}
      value={files}
      maxFiles={5}
      //header={false}
      // footer={false}
      maxFileSize={2998000}
      //label="Drag'n drop files here or click to browse"
      //label="Suleta tus archivos aquí"
      accept=".png,image/*"
      // uploadingMessage={"Uploading..."}
      //url="https://my-awsome-server/upload-my-file"
      //of course this url doens´t work, is only to make upload button visible
      //uploadOnDrop
      //clickable={false}
      //fakeUploading
      //localization={"FR-fr"}
      disableScroll
    >
      {files.map((file) => (
        <FileItem
          {...file}
          key={file.id}
          onDelete={onDelete}
          onSee={handleSee}
          //localization={"ES-es"}
          resultOnTooltip
          preview
          info
          hd
        />
      ))}
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e) => handleSee(undefined)}
      />
    </Dropzone> */}

          <label htmlFor="image" >
            <h5 style={{fontWeight: 'bold'}}>
            <InsertPhotoIcon color="success" /> {` `}
              Upload Farmstand Images
            </h5>
          </label>
          <Col>
            <Input
              type="file"
              multiple="multiple"
              name="image"
              id="exampleFile"
              value={undefined}
              onChange={(e) => setImage(e.target.files)}
            />
            <FormText color="muted">
              Select 1 or multiple images. jpg, jpeg, gif and png images under 3mb
            </FormText>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col className="text-center">
            <Button type="submit" color="primary" className="mx-3">
              Post Farmstand
            </Button>
            <Button onClick={() => toggle2()} color="danger" className="mx-3">
              Cancel
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Formik>
  );
};

export default CreateListingFormNoAddress;
