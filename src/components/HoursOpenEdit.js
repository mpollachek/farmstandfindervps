import { useState, useEffect } from 'react';
import {
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from "formik";

const HoursOpenEdit = ({setHrsOpen, hrsOpen, useHrsSwitch, setUseHrsSwitch}) => {

  const { open, close } = hrsOpen;

  console.log("hrsOpen", hrsOpen)
  console.log("hrsOpen.open", hrsOpen.open)
  console.log("useHrsSwitch", useHrsSwitch)
  console.log("open", open)
  //console.log("open.mon.hour", open.mon.hour)

  const [isOpenSun, setIsOpenSun] = useState(open.sun.isOpen);
  const [isOpenMon, setIsOpenMon] = useState(open.mon.isOpen);
  const [isOpenTues, setIsOpenTues] = useState(open.tue.isOpen);
  const [isOpenWed, setIsOpenWed] = useState(open.wed.isOpen);
  const [isOpenThur, setIsOpenThur] = useState(open.thur.isOpen);
  const [isOpenFri, setIsOpenFri] = useState(open.fri.isOpen);
  const [isOpenSat, setIsOpenSat] = useState(open.sat.isOpen);

  const [sunOpenHr, setSunOpenHr] = useState(open.sun.hour)
  const [sunOpenMin, setSunOpenMin] = useState(open.sun.min)
  const [sunOpenAmPm, setSunOpenAmPm] = useState(open.sun.ampm)
  const [sunCloseHr, setSunCloseHr] = useState(close.sun.hour)
  const [sunCloseMin, setSunCloseMin] = useState(close.sun.min)
  const [sunCloseAmPm, setSunCloseAmPm] = useState(close.sun.ampm)

  const [monOpenHr, setMonOpenHr] = useState(open.mon.hour)
  const [monOpenMin, setMonOpenMin] = useState(open.mon.min)
  const [monOpenAmPm, setMonOpenAmPm] = useState(open.mon.ampm)
  const [monCloseHr, setMonCloseHr] = useState(close.mon.hour)
  const [monCloseMin, setMonCloseMin] = useState(close.mon.min)
  const [monCloseAmPm, setMonCloseAmPm] = useState(close.mon.ampm)
  
  const [tuesOpenHr, setTuesOpenHr] = useState(open.tue.hour)
  const [tuesOpenMin, setTuesOpenMin] = useState(open.tue.min)
  const [tuesOpenAmPm, setTuesOpenAmPm] = useState(open.tue.ampm)
  const [tuesCloseHr, setTuesCloseHr] = useState(close.tue.hour)
  const [tuesCloseMin, setTuesCloseMin] = useState(close.tue.min)
  const [tuesCloseAmPm, setTuesCloseAmPm] = useState(close.tue.ampm)

  const [wedOpenHr, setWedOpenHr] = useState(open.wed.hour)
  const [wedOpenMin, setWedOpenMin] = useState(open.wed.min)
  const [wedOpenAmPm, setWedOpenAmPm] = useState(open.wed.ampm)
  const [wedCloseHr, setWedCloseHr] = useState(close.wed.hour)
  const [wedCloseMin, setWedCloseMin] = useState(close.wed.min)
  const [wedCloseAmPm, setWedCloseAmPm] = useState(close.wed.ampm)

  const [thurOpenHr, setThurOpenHr] = useState(open.thur.hour)
  const [thurOpenMin, setThurOpenMin] = useState(open.thur.min)
  const [thurOpenAmPm, setThurOpenAmPm] = useState(open.thur.ampm)
  const [thurCloseHr, setThurCloseHr] = useState(close.thur.hour)
  const [thurCloseMin, setThurCloseMin] = useState(close.thur.min)
  const [thurCloseAmPm, setThurCloseAmPm] = useState(close.thur.ampm)

  const [friOpenHr, setFriOpenHr] = useState(open.fri.hour)
  const [friOpenMin, setFriOpenMin] = useState(open.fri.min)
  const [friOpenAmPm, setFriOpenAmPm] = useState(open.fri.ampm)
  const [friCloseHr, setFriCloseHr] = useState(close.fri.hour)
  const [friCloseMin, setFriCloseMin] = useState(close.fri.min)
  const [friCloseAmPm, setFriCloseAmPm] = useState(close.fri.ampm)

  const [satOpenHr, setSatOpenHr] = useState(open.sat.hour)
  const [satOpenMin, setSatOpenMin] = useState(open.sat.min)
  const [satOpenAmPm, setSatOpenAmPm] = useState(open.sat.ampm)
  const [satCloseHr, setSatCloseHr] = useState(close.sat.hour)
  const [satCloseMin, setSatCloseMin] = useState(close.sat.min)
  const [satCloseAmPm, setSatCloseAmPm] = useState(close.sat.ampm)


  const [sunHourDropOpen, setSunHourDropOpen] = useState(false);
  const toggleSunHourOpen = () => setSunHourDropOpen((prevState) => !prevState);
  const [sunMinDropOpen, setSunMinDropOpen] = useState(false);
  const toggleSunMinuteOpen = () => setSunMinDropOpen((prevState) => !prevState);
  const [sunAmPmDropOpen, setSunAmPmDropOpen] = useState(false);
  const toggleSunAmPmOpen = () => setSunAmPmDropOpen((prevState) => !prevState);

  const [sunHourDropClose, setSunHourDropClose] = useState(false);
  const toggleSunHourClose = () => setSunHourDropClose((prevState) => !prevState);
  const [sunMinDropClose, setSunMinDropClose] = useState(false);
  const toggleSunMinuteClose = () => setSunMinDropClose((prevState) => !prevState);
  const [sunAmPmDropClose, setSunAmPmDropClose] = useState(false);
  const toggleSunAmPmClose = () => setSunAmPmDropClose((prevState) => !prevState);

  const [monHourDropOpen, setMonHourDropOpen] = useState(false);
  const toggleMonHourOpen = () => setMonHourDropOpen((prevState) => !prevState);
  const [monMinDropOpen, setMonMinDropOpen] = useState(false);
  const toggleMonMinuteOpen = () => setMonMinDropOpen((prevState) => !prevState);
  const [monAmPmDropOpen, setMonAmPmDropOpen] = useState(false);
  const toggleMonAmPmOpen = () => setMonAmPmDropOpen((prevState) => !prevState);

  const [monHourDropClose, setMonHourDropClose] = useState(false);
  const toggleMonHourClose = () => setMonHourDropClose((prevState) => !prevState);
  const [monMinDropClose, setMonMinDropClose] = useState(false);
  const toggleMonMinuteClose = () => setMonMinDropClose((prevState) => !prevState);
  const [monAmPmDropClose, setMonAmPmDropClose] = useState(false);
  const toggleMonAmPmClose = () => setMonAmPmDropClose((prevState) => !prevState);

  const [tueHourDropOpen, setTueHourDropOpen] = useState(false);
  const toggleTueHourOpen = () => setTueHourDropOpen((prevState) => !prevState);
  const [tueMinDropOpen, setTueMinDropOpen] = useState(false);
  const toggleTueMinuteOpen = () => setTueMinDropOpen((prevState) => !prevState);
  const [tueAmPmDropOpen, setTueAmPmDropOpen] = useState(false);
  const toggleTueAmPmOpen = () => setTueAmPmDropOpen((prevState) => !prevState);

  const [tueHourDropClose, setTueHourDropClose] = useState(false);
  const toggleTueHourClose = () => setTueHourDropClose((prevState) => !prevState);
  const [tueMinDropClose, setTueMinDropClose] = useState(false);
  const toggleTueMinuteClose = () => setTueMinDropClose((prevState) => !prevState);
  const [tueAmPmDropClose, setTueAmPmDropClose] = useState(false);
  const toggleTueAmPmClose = () => setTueAmPmDropClose((prevState) => !prevState);

  const [wedHourDropOpen, setWedHourDropOpen] = useState(false);
  const toggleWedHourOpen = () => setWedHourDropOpen((prevState) => !prevState);
  const [wedMinDropOpen, setWedMinDropOpen] = useState(false);
  const toggleWedMinuteOpen = () => setWedMinDropOpen((prevState) => !prevState);
  const [wedAmPmDropOpen, setWedAmPmDropOpen] = useState(false);
  const toggleWedAmPmOpen = () => setWedAmPmDropOpen((prevState) => !prevState);

  const [wedHourDropClose, setWedHourDropClose] = useState(false);
  const toggleWedHourClose = () => setWedHourDropClose((prevState) => !prevState);
  const [wedMinDropClose, setWedMinDropClose] = useState(false);
  const toggleWedMinuteClose = () => setWedMinDropClose((prevState) => !prevState);
  const [wedAmPmDropClose, setWedAmPmDropClose] = useState(false);
  const toggleWedAmPmClose = () => setWedAmPmDropClose((prevState) => !prevState);

  const [thurHourDropOpen, setThurHourDropOpen] = useState(false);
  const toggleThurHourOpen = () => setThurHourDropOpen((prevState) => !prevState);
  const [thurMinDropOpen, setThurMinDropOpen] = useState(false);
  const toggleThurMinuteOpen = () => setThurMinDropOpen((prevState) => !prevState);
  const [thurAmPmDropOpen, setThurAmPmDropOpen] = useState(false);
  const toggleThurAmPmOpen = () => setThurAmPmDropOpen((prevState) => !prevState);

  const [thurHourDropClose, setThurHourDropClose] = useState(false);
  const toggleThurHourClose = () => setThurHourDropClose((prevState) => !prevState);
  const [thurMinDropClose, setThurMinDropClose] = useState(false);
  const toggleThurMinuteClose = () => setThurMinDropClose((prevState) => !prevState);
  const [thurAmPmDropClose, setThurAmPmDropClose] = useState(false);
  const toggleThurAmPmClose = () => setThurAmPmDropClose((prevState) => !prevState);

  const [friHourDropOpen, setFriHourDropOpen] = useState(false);
  const toggleFriHourOpen = () => setFriHourDropOpen((prevState) => !prevState);
  const [friMinDropOpen, setFriMinDropOpen] = useState(false);
  const toggleFriMinuteOpen = () => setFriMinDropOpen((prevState) => !prevState);
  const [friAmPmDropOpen, setFriAmPmDropOpen] = useState(false);
  const toggleFriAmPmOpen = () => setFriAmPmDropOpen((prevState) => !prevState);

  const [friHourDropClose, setFriHourDropClose] = useState(false);
  const toggleFriHourClose = () => setFriHourDropClose((prevState) => !prevState);
  const [friMinDropClose, setFriMinDropClose] = useState(false);
  const toggleFriMinuteClose = () => setFriMinDropClose((prevState) => !prevState);
  const [friAmPmDropClose, setFriAmPmDropClose] = useState(false);
  const toggleFriAmPmClose = () => setFriAmPmDropClose((prevState) => !prevState);

  const [satHourDropOpen, setSatHourDropOpen] = useState(false);
  const toggleSatHourOpen = () => setSatHourDropOpen((prevState) => !prevState);
  const [satMinDropOpen, setSatMinDropOpen] = useState(false);
  const toggleSatMinuteOpen = () => setSatMinDropOpen((prevState) => !prevState);
  const [satAmPmDropOpen, setSatAmPmDropOpen] = useState(false);
  const toggleSatAmPmOpen = () => setSatAmPmDropOpen((prevState) => !prevState);
  
  const [satHourDropClose, setSatHourDropClose] = useState(false);
  const toggleSatHourClose = () => setSatHourDropClose((prevState) => !prevState);
  const [satMinDropClose, setSatMinDropClose] = useState(false);
  const toggleSatMinuteClose = () => setSatMinDropClose((prevState) => !prevState);
  const [satAmPmDropClose, setSatAmPmDropClose] = useState(false);
  const toggleSatAmPmClose = () => setSatAmPmDropClose((prevState) => !prevState);

  const [allowHrsChange, setAllowHrsChange] = useState(false)

  const initialValues = {
    notsure: "notsure"
  }

  const handleSubmit = (values) => {
    setHrsOpen(values)
  }

  useEffect(() => {
    console.log("allowHrsChange", allowHrsChange)
    if (allowHrsChange) {
    setHrsOpen({
        open: {
          sun: {isOpen: isOpenSun, hour: sunOpenHr, min: sunOpenMin, ampm: sunOpenAmPm },        
          mon: {isOpen: isOpenMon, hour: monOpenHr, min: monOpenMin, ampm: monOpenAmPm },
          tue: {isOpen: isOpenTues, hour: tuesOpenHr, min: tuesOpenMin, ampm: tuesOpenAmPm },        
          wed: {isOpen: isOpenWed, hour: wedOpenHr, min: wedOpenMin, ampm: wedOpenAmPm },
          thur: {isOpen: isOpenThur, hour: thurOpenHr, min: thurOpenMin, ampm: thurOpenAmPm },        
          fri: {isOpen: isOpenFri, hour: friOpenHr, min: friOpenMin, ampm: friOpenAmPm },
          sat: {isOpen: isOpenSat, hour: satOpenHr, min: satOpenMin, ampm: satOpenAmPm },        
        },
        close: {
          sun: {hour: sunCloseHr, min: sunCloseMin, ampm: sunCloseAmPm },        
          mon: {hour: monCloseHr, min: monCloseMin, ampm: monCloseAmPm },
          tue: {hour: tuesCloseHr, min: tuesCloseMin, ampm: tuesCloseAmPm },        
          wed: {hour: wedCloseHr, min: wedCloseMin, ampm: wedCloseAmPm },
          thur: {hour: thurCloseHr, min: thurCloseMin, ampm: thurCloseAmPm },        
          fri: {hour: friCloseHr, min: friCloseMin, ampm: friCloseAmPm },
          sat: {hour: satCloseHr, min: satCloseMin, ampm: satCloseAmPm },
          },
      })
      console.log("hrs open", hrsOpen)
      setAllowHrsChange(false)
      }}, [sunOpenHr, sunOpenMin, sunOpenAmPm, sunCloseHr, sunCloseMin, sunCloseAmPm, monOpenHr, monOpenMin, monOpenAmPm, monCloseHr, monCloseMin, monCloseAmPm, tuesOpenHr, tuesOpenMin, tuesOpenAmPm, tuesCloseHr, tuesCloseMin, tuesCloseAmPm, wedOpenHr, wedOpenMin, wedOpenAmPm, wedCloseHr, wedCloseMin, wedCloseAmPm, thurOpenHr, thurOpenMin, thurOpenAmPm, thurCloseHr, thurCloseMin, thurCloseAmPm, friOpenHr, friOpenMin, friOpenAmPm, friCloseHr, friCloseMin, friCloseAmPm, satOpenHr, satOpenMin, satOpenAmPm, satCloseHr, satCloseMin, satCloseAmPm])

  console.log("monOpenHr", monOpenHr)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form className='my-3' >
        <Row className='mb-2'>
          <Col className='text-center'  >
            
        <FormGroup switch inline>
        <Input
          type="switch"
          checked={useHrsSwitch}
          onClick={() => {
            setUseHrsSwitch(!useHrsSwitch);
            setAllowHrsChange(true)
          }}
        />
        { useHrsSwitch ? 
        <Label check><strong>Display hours on listing page</strong></Label> 
        : <Label check color="muted" >Display hours on listing page</Label> }
      </FormGroup>
      </Col>
        </Row>
        <Row>
          <Col>

          <FormGroup>
        {/* <h5 style={{fontWeight: 'bold'}}>
        Hours of Operation (Optional)
        </h5> */}
        <Row className='text-center mb-3'>
          <Col xs={2}>
            <h6>check if open</h6>
          </Col>
          <Col xs={5}>
            <h6>Opening Time</h6>
          </Col>
          <Col xs={5}>
            <h6>Closing Time</h6>
          </Col>
        </Row>
        </FormGroup>

        <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openSunday' 
              onClick={() => {
                setIsOpenSun(!isOpenSun)
                setAllowHrsChange(true)
              }}
              />
              {isOpenSun ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Sunday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Sunday {" "} </h6> 
              }
            </Label>
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={sunHourDropOpen} toggle={toggleSunHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{sunOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSunOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunMinDropOpen} toggle={toggleSunMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunOpenMin} </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSunOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunAmPmDropOpen} toggle={toggleSunAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunOpenAmPm} </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSunOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setSunOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={sunHourDropClose} toggle={toggleSunHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{sunCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSunCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunMinDropClose} toggle={toggleSunMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSunCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunAmPmDropClose} toggle={toggleSunAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSunCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setSunCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

          <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openMonday' 
              onClick={() => {
                setIsOpenMon(!isOpenMon)
                setAllowHrsChange(true)
              }}
              />
              {isOpenMon ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Monday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Monday {" "} </h6> 
              }
            </Label>   
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={monHourDropOpen} toggle={toggleMonHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary' >{monOpenHr}</DropdownToggle>
        <DropdownMenu >
          <DropdownItem onClick={() => {setMonOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monMinDropOpen} toggle={toggleMonMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setMonOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monAmPmDropOpen} toggle={toggleMonAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setMonOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setMonOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={monHourDropClose} toggle={toggleMonHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{monCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setMonCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monMinDropClose} toggle={toggleMonMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setMonCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monAmPmDropClose} toggle={toggleMonAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setMonCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setMonCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
            </FormGroup>

            <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openTuesday' 
              onClick={() => {
                setIsOpenTues(!isOpenTues)
                setAllowHrsChange(true)
              }}
              />
              {isOpenTues ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Tuesday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Tuesday {" "} </h6> 
              }
            </Label> 
            </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={tueHourDropOpen} toggle={toggleTueHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{tuesOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setTuesOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueMinDropOpen} toggle={toggleTueMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setTuesOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueAmPmDropOpen} toggle={toggleTueAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setTuesOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setTuesOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={tueHourDropClose} toggle={toggleTueHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{tuesCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setTuesCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueMinDropClose} toggle={toggleTueMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setTuesCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueAmPmDropClose} toggle={toggleTueAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setTuesCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setTuesCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openWednesday' 
              onClick={() => {
                setIsOpenWed(!isOpenWed)
                setAllowHrsChange(true)
              }}
              />
              {isOpenWed ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Wednesday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Wednesday {" "} </h6> 
              }
            </Label>
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={wedHourDropOpen} toggle={toggleWedHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{wedOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setWedOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedMinDropOpen} toggle={toggleWedMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setWedOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedAmPmDropOpen} toggle={toggleWedAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setWedOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setWedOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={wedHourDropClose} toggle={toggleWedHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{wedCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setWedCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedMinDropClose} toggle={toggleWedMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setWedCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedAmPmDropClose} toggle={toggleWedAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setWedCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setWedCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openThursday' 
              onClick={() => {
                setIsOpenThur(!isOpenThur)
                setAllowHrsChange(true)
              }}
              />
              {isOpenThur ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Thursday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Thursday {" "} </h6> 
              }
            </Label>
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={thurHourDropOpen} toggle={toggleThurHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{thurOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setThurOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurMinDropOpen} toggle={toggleThurMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setThurOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurAmPmDropOpen} toggle={toggleThurAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setThurOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setThurOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={thurHourDropClose} toggle={toggleThurHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{thurCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setThurCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurMinDropClose} toggle={toggleThurMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setThurCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurAmPmDropClose} toggle={toggleThurAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setThurCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setThurCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openFriday' 
              onClick={() => {
                setIsOpenFri(!isOpenFri)
                setAllowHrsChange(true)
              }}
              />
              {isOpenFri ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Friday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Friday {" "} </h6> 
              }
            </Label>  
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={friHourDropOpen} toggle={toggleFriHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{friOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setFriOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friMinDropOpen} toggle={toggleFriMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setFriOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friAmPmDropOpen} toggle={toggleFriAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setFriOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setFriOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={friHourDropClose} toggle={toggleFriHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{friCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setFriCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friMinDropClose} toggle={toggleFriMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setFriCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friAmPmDropClose} toggle={toggleFriAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setFriCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setFriCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label check style={{whiteSpace: 'nowrap'}}>
              <Field type='checkbox' name="isOpen" value='openSaturday' 
              onClick={() => {
                setIsOpenSat(!isOpenSat)
                setAllowHrsChange(true)
              }}
              />
              {isOpenSat ? 
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Saturday {" "} </h6> :
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2 text-muted' >{" "} Saturday {" "} </h6> 
              }
            </Label>
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={satHourDropOpen} toggle={toggleSatHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{satOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSatOpenHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satMinDropOpen} toggle={toggleSatMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSatOpenMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satAmPmDropOpen} toggle={toggleSatAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSatOpenAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setSatOpenAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={satHourDropClose} toggle={toggleSatHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{satCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSatCloseHr('1'); setAllowHrsChange(true);}}>1</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('2'); setAllowHrsChange(true);}}>2</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('3'); setAllowHrsChange(true);}}>3</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('4'); setAllowHrsChange(true);}}>4</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('5'); setAllowHrsChange(true);}}>5</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('6'); setAllowHrsChange(true);}}>6</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('7'); setAllowHrsChange(true);}}>7</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('8'); setAllowHrsChange(true);}}>8</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('9'); setAllowHrsChange(true);}}>9</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('10'); setAllowHrsChange(true);}}>10</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('11'); setAllowHrsChange(true);}}>11</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseHr('12'); setAllowHrsChange(true);}}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satMinDropClose} toggle={toggleSatMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSatCloseMin('00'); setAllowHrsChange(true);}}>00</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseMin('15'); setAllowHrsChange(true);}}>15</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseMin('30'); setAllowHrsChange(true);}}>30</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseMin('45'); setAllowHrsChange(true);}}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satAmPmDropClose} toggle={toggleSatAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => {setSatCloseAmPm('am'); setAllowHrsChange(true);}}>am</DropdownItem>
          <DropdownItem onClick={() => {setSatCloseAmPm('pm'); setAllowHrsChange(true);}}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>



            
          </Col>
        </Row>
      </Form>
    </Formik>
  )
}

export default HoursOpenEdit;