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
import { backendUrl } from "../config";

/* Create duplicate NewFarmstand.js and CreateListingForm.js files and remove ability to use address.  Free geocoding has been inaccurate and finding locations on map is easier */

const CreateListingForm = ({
  addressState = false,
  latLongState = true,
  lat = "",
  long = "",
  addressChecked = true,
  latlongChecked = false,
}) => {
  if (lat != 0 && long != 0) {
    addressState = true;
    latLongState = false;
    addressChecked = false;
    latlongChecked = true;
  }

  const initialAddressState = () => {
    if (addressState) {
      return true;
    } else {
      return false;
    }
  };

  const initialLatlongState = () => {
    if (latLongState) {
      return true;
    } else {
      return false;
    }
  };

  const [addressDisabled, setAddressDisabled] = useState(initialAddressState);

  const [latLongDisabled, setLatLongDisabled] = useState(initialLatlongState);

  const [files, setFiles] = useState([]);

  const [image, setImage] = useState([]);

  console.log("lat: " + lat);
  console.log("long: " + long);
  console.log("addressState: " + addressState);
  console.log(" initial addressState: " + initialAddressState);
  console.log("addressDisabled: " + addressDisabled);
  console.log("latLongState: " + latLongState);
  console.log("initial latLongState: " + initialLatlongState);
  console.log("latlongdisabled: " + latLongDisabled);

  const useAddress = (event) => {
    if ((event.target.value = true)) {
      setAddressDisabled(false);
      setLatLongDisabled(true);
      console.log("latlongdisabled: " + latLongDisabled);
      console.log("addressdisabled: " + addressDisabled);
    }
  };

  const useLatLong = (event) => {
    if ((event.target.value = true)) {
      setAddressDisabled(true);
      setLatLongDisabled(false);
      console.log("addressdisabled: " + addressDisabled);
      console.log("latlongdisabled: " + latLongDisabled);
    }
  };

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
    farmstandType: [""] ,
    image: image,
    description: "",
    products: [""],
    latitude: lat.toString(),
    longitude: long.toString(),
    road: "",
    town: "",
    state: "",
    country: "",
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
        `${backendUrl}/api/farms`,
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
    //const file = values.target.files[0]
    const formData = new FormData();
    for (const i of image) {
      formData.append("image", i);
    }
    formData.append("farmstandName", values.farmstandName);
    formData.append("farmstandType", values.farmstandType);
    formData.append("description", values.description);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("products", values.products);
    formData.append("road", values.road);
    formData.append("town", values.town);
    formData.append("state", values.state);
    formData.append("country", values.country);

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
        console.log("post: " + JSON.stringify(values));
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
        <FormGroup row tag="fieldset">
          <Col className="text-center">
            <FormGroup check inline>
              <Input
                onChange={useAddress}
                name="locationradio"
                type="radio"
                id="addressradio"
                defaultChecked={addressChecked}
              />{" "}
              <Label htmlFor="locationradio" check>
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
              />{" "}
              <Label htmlFor="locationradio" check>
                Use Latitude/Longitude
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="6">
            <Label htmlFor="farmstandName">Farmstand Name</Label>
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
          <Col md="6">
            <Label htmlFor="road">road</Label>
            <br />
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
            <br />
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
            <br />
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

        <FormGroup row className="form-control">
          <label htmlFor="products">Products For Sale</label>
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

          <label htmlFor="image">Upload Farmstand Images</label>
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
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
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

export default CreateListingForm;
