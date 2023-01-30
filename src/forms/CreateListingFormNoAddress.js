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
//import { validateCreateListingForm } from "../utils/validateCreateListingForm";
import MultipleFileUpload from "../utils/MultipleFileUpload";
import Axios from "axios";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

/* Create duplicate NewFarmstand.js and CreateListingForm.js files and remove ability to use address.  Free geocoding has been inaccurate and finding locations on map is easier */

const CreateListingFormNoAddress = ({lat, long}) => {  

  const [files, setFiles] = useState([]);

  const [image, setImage] = useState([]);

  console.log("lat: " + lat);
  console.log("long: " + long);

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
    seasons: "",
    image: image,
    description: "",
    products: [""],
    latitude: lat.toString(),
    longitude: long.toString(),
  };

  const handleSubmitFile = async (e) => {
    //const file = e.target.files[0]
    const formData = new FormData();
    formData.append("image", image);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { response } = await Axios.post(
        "http://localhost:8080/api/farms",
        formData,
        config
      );
      setImage(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    console.log("files: " + JSON.stringify(files));
    console.log("form values:", values);
    console.log("in JSON format:", JSON.stringify(values));
    console.log("farmstandType: ", values.farmstandType)
    const productsString = values.products.toString();
    const productsArray = productsString.split(',')
    console.log("productsString: ", productsString)
    console.log("productsArray: ", productsArray)
    //const file = values.target.files[0]
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
    formData.append("products", JSON.stringify(values.products));

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await Axios.post(
        `http://localhost:8080/api/farms`,
        formData,
        config
      ).then((response) => {
        console.log("post: ", values);
        console.log("response: " + JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("images: " + JSON.stringify(image));
  }, [image]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
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

        <FormGroup row check >
        <h5 style={{fontWeight: 'bold'}}>
        Farmstand Type/Services (check all that apply)
        </h5>
          <Col > 
            <Label check md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='produce' />Produce
            </Label>          
            <Label check md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='meat' />Meat
            </Label>          
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='dairy' />Dairy
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='eggs' />Eggs
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='farmersMarket' />Farmers Market
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='gardenCenter' />Garden Center
            </Label>
            <Label check  md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='playArea' />Play Area
            </Label>
            <Label check md={3} sm={6} xs={12}>
              <Field type='checkbox' name="farmstandType" value='therapy' />Therapy
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row check >
        <h5 style={{fontWeight: 'bold'}}>
        Seasons Open (seasonal during harvest time or year round)
        </h5>
          <Col > 
            <Label check md={3} sm={6} xs={12}>
              <Field type='radio' name="seasons" value='yearRound' />Year Round
            </Label>
            <Label check md={3} sm={6} xs={12}>
              <Field type='radio' name="seasons" value='harvest' />harvest
            </Label>
          </Col>
        </FormGroup>


        <FormGroup row>
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
            />
          </Col>
        </FormGroup>

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
              Select 1 or multiple images
            </FormText>
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

export default CreateListingFormNoAddress;
