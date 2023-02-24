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

const HoursOpen = ({setHrsOpen, hrsOpen, useHrsSwitch, setUseHrsSwitch}) => {

  const [isOpenSun, setIsOpenSun] = useState(false);
  const [isOpenMon, setIsOpenMon] = useState(false);
  const [isOpenTues, setIsOpenTues] = useState(false);
  const [isOpenWed, setIsOpenWed] = useState(false);
  const [isOpenThur, setIsOpenThur] = useState(false);
  const [isOpenFri, setIsOpenFri] = useState(false);
  const [isOpenSat, setIsOpenSat] = useState(false);

  const [sunOpenHr, setSunOpenHr] = useState('hour')
  const [sunOpenMin, setSunOpenMin] = useState('minutes')
  const [sunOpenAmPm, setSunOpenAmPm] = useState('am')
  const [sunCloseHr, setSunCloseHr] = useState('hour')
  const [sunCloseMin, setSunCloseMin] = useState('minutes')
  const [sunCloseAmPm, setSunCloseAmPm] = useState('pm')
  
  const [monOpenHr, setMonOpenHr] = useState('hour')
  const [monOpenMin, setMonOpenMin] = useState('minutes')
  const [monOpenAmPm, setMonOpenAmPm] = useState('am')
  const [monCloseHr, setMonCloseHr] = useState('hour')
  const [monCloseMin, setMonCloseMin] = useState('minutes')
  const [monCloseAmPm, setMonCloseAmPm] = useState('pm')

  const [tuesOpenHr, setTuesOpenHr] = useState('hour')
  const [tuesOpenMin, setTuesOpenMin] = useState('minutes')
  const [tuesOpenAmPm, setTuesOpenAmPm] = useState('am')
  const [tuesCloseHr, setTuesCloseHr] = useState('hour')
  const [tuesCloseMin, setTuesCloseMin] = useState('minutes')
  const [tuesCloseAmPm, setTuesCloseAmPm] = useState('pm')

  const [wedOpenHr, setWedOpenHr] = useState('hour')
  const [wedOpenMin, setWedOpenMin] = useState('minutes')
  const [wedOpenAmPm, setWedOpenAmPm] = useState('am')
  const [wedCloseHr, setWedCloseHr] = useState('hour')
  const [wedCloseMin, setWedCloseMin] = useState('minutes')
  const [wedCloseAmPm, setWedCloseAmPm] = useState('pm')

  const [thurOpenHr, setThurOpenHr] = useState('hour')
  const [thurOpenMin, setThurOpenMin] = useState('minutes')
  const [thurOpenAmPm, setThurOpenAmPm] = useState('am')
  const [thurCloseHr, setThurCloseHr] = useState('hour')
  const [thurCloseMin, setThurCloseMin] = useState('minutes')
  const [thurCloseAmPm, setThurCloseAmPm] = useState('pm')

  const [friOpenHr, setFriOpenHr] = useState('hour')
  const [friOpenMin, setFriOpenMin] = useState('minutes')
  const [friOpenAmPm, setFriOpenAmPm] = useState('am')
  const [friCloseHr, setFriCloseHr] = useState('hour')
  const [friCloseMin, setFriCloseMin] = useState('minutes')
  const [friCloseAmPm, setFriCloseAmPm] = useState('pm')

  const [satOpenHr, setSatOpenHr] = useState('hour')
  const [satOpenMin, setSatOpenMin] = useState('minutes')
  const [satOpenAmPm, setSatOpenAmPm] = useState('am')
  const [satCloseHr, setSatCloseHr] = useState('hour')
  const [satCloseMin, setSatCloseMin] = useState('minutes')
  const [satCloseAmPm, setSatCloseAmPm] = useState('pm')

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

  const initialValues = {
    notsure: "notsure"
  }

  const handleSubmit = (values) => {
    setHrsOpen(values)
  }

  useEffect(() => {
    setHrsOpen({
      hours: {
        open: {
          sun: {isOpen: {isOpenSun}, hour: {sunOpenHr}, min: {sunOpenMin}, ampm: {sunOpenAmPm} },        
          mon: {isOpen: {isOpenMon}, hour: {monOpenHr}, min: {monOpenMin}, ampm: {monOpenAmPm} },
          tue: {isOpen: {isOpenTues}, hour: {tuesOpenHr}, min: {tuesOpenMin}, ampm: {tuesOpenAmPm} },        
          wed: {isOpen: {isOpenWed}, hour: {wedOpenHr}, min: {wedOpenMin}, ampm: {wedOpenAmPm} },
          thur: {isOpen: {isOpenThur}, hour: {thurOpenHr}, min: {thurOpenMin}, ampm: {thurOpenAmPm} },        
          fri: {isOpen: {isOpenFri}, hour: {friOpenHr}, min: {friOpenMin}, ampm: {friOpenAmPm} },
          sat: {isOpen: {isOpenSat}, hour: {satOpenHr}, min: {satOpenMin}, ampm: {satOpenAmPm} },        
        },
        close: {
          sun: {hour: {sunCloseHr}, min: {sunCloseMin}, ampm: {sunCloseAmPm} },        
          mon: {hour: {monCloseHr}, min: {monCloseMin}, ampm: {monCloseAmPm} },
          tue: {hour: {tuesCloseHr}, min: {tuesCloseMin}, ampm: {tuesCloseAmPm} },        
          wed: {hour: {wedCloseHr}, min: {wedCloseMin}, ampm: {wedCloseAmPm} },
          thur: {hour: {thurCloseHr}, min: {thurCloseMin}, ampm: {thurCloseAmPm} },        
          fri: {hour: {friCloseHr}, min: {friCloseMin}, ampm: {friCloseAmPm} },
          sat: {hour: {satCloseHr}, min: {satCloseMin}, ampm: {satCloseAmPm} },
          },
        }
      })
      console.log("hrs open", hrsOpen)
  }, [sunOpenHr, sunOpenMin, sunOpenAmPm, sunCloseHr, sunCloseMin, sunCloseAmPm, monOpenHr, monOpenMin, monOpenAmPm, monCloseHr, monCloseMin, monCloseAmPm, tuesOpenHr, tuesOpenMin, tuesOpenAmPm, tuesCloseHr, tuesCloseMin, tuesCloseAmPm, wedOpenHr, wedOpenMin, wedOpenAmPm, wedCloseHr, wedCloseMin, wedCloseAmPm, thurOpenHr, thurOpenMin, thurOpenAmPm, thurCloseHr, thurCloseMin, thurCloseAmPm, friOpenHr, friOpenMin, friOpenAmPm, friCloseHr, friCloseMin, friCloseAmPm, satOpenHr, satOpenMin, satOpenAmPm, satCloseHr, satCloseMin, satCloseAmPm,])

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
          {/* <Col xs={{size: 5, offset: 2}} > */}
          <Col xs={5}>
            <h6>Opening Time</h6>
          </Col>
          <Col xs={5}>
            <h6>Closing Time</h6>
          </Col>
        </Row>

        <FormGroup row inline >
            <Row >
              <Col xs={2} >
            <Label style={{whiteSpace: 'nowrap'}}> 
            <Field type='checkbox' name="isOpen" value={isOpenSun} 
            onClick={() => setIsOpenSun(!isOpenSun)} />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Sunday {" "} </h6> 
            </Label>  
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={sunHourDropOpen} toggle={toggleSunHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{sunOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSunOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setSunOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunMinDropOpen} toggle={toggleSunMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunOpenMin} </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSunOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setSunOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setSunOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setSunOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunAmPmDropOpen} toggle={toggleSunAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunOpenAmPm} </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSunOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setSunOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={sunHourDropClose} toggle={toggleSunHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{sunCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSunCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setSunCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunMinDropClose} toggle={toggleSunMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSunCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setSunCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setSunCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setSunCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={sunAmPmDropClose} toggle={toggleSunAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{sunCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSunCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setSunCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

          <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label style={{whiteSpace: 'nowrap'}}>              
              <Field type='checkbox' name="isOpen" value='monday' />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Monday {" "} </h6> 
            </Label>   
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={monHourDropOpen} toggle={toggleMonHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{monOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setMonOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setMonOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monMinDropOpen} toggle={toggleMonMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setMonOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setMonOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setMonOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setMonOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monAmPmDropOpen} toggle={toggleMonAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setMonOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setMonOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={monHourDropClose} toggle={toggleMonHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{monCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setMonCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setMonCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monMinDropClose} toggle={toggleMonMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setMonCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setMonCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setMonCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setMonCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={monAmPmDropClose} toggle={toggleMonAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{monCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setMonCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setMonCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
            </FormGroup>

            <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label style={{whiteSpace: 'nowrap'}}>  
              <Field type='checkbox' name="isOpen" value='tuesday' />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Tuesday {" "} </h6> 
            </Label>   
            </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={tueHourDropOpen} toggle={toggleTueHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{tuesOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTuesOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueMinDropOpen} toggle={toggleTueMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTuesOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueAmPmDropOpen} toggle={toggleTueAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTuesOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setTuesOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={tueHourDropClose} toggle={toggleTueHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{tuesCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTuesCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueMinDropClose} toggle={toggleTueMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTuesCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={tueAmPmDropClose} toggle={toggleTueAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{tuesCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTuesCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setTuesCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label style={{whiteSpace: 'nowrap'}} > 
              <Field type='checkbox' name="isOpen" value='wednesday' />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Wednesday {" "} </h6> 
            </Label>  
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={wedHourDropOpen} toggle={toggleWedHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{wedOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setWedOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setWedOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedMinDropOpen} toggle={toggleWedMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setWedOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setWedOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setWedOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setWedOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedAmPmDropOpen} toggle={toggleWedAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setWedOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setWedOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={wedHourDropClose} toggle={toggleWedHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{wedCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setWedCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setWedCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedMinDropClose} toggle={toggleWedMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setWedCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setWedCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setWedCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setWedCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={wedAmPmDropClose} toggle={toggleWedAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{wedCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setWedCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setWedCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
            <Label style={{whiteSpace: 'nowrap'}}> 
            <Field type='checkbox' name="isOpen" value='thursday' />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Thursday {" "} </h6> 
            </Label>  
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={thurHourDropOpen} toggle={toggleThurHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{thurOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setThurOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setThurOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurMinDropOpen} toggle={toggleThurMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setThurOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setThurOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setThurOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setThurOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurAmPmDropOpen} toggle={toggleThurAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setThurOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setThurOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={thurHourDropClose} toggle={toggleThurHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{thurCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setThurCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setThurCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurMinDropClose} toggle={toggleThurMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setThurCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setThurCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setThurCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setThurCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={thurAmPmDropClose} toggle={toggleThurAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{thurCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setThurCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setThurCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
            <Label style={{whiteSpace: 'nowrap'}}> 
            <Field type='checkbox' name="isOpen" value='friday' />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Friday {" "} </h6> 
            </Label>   
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={friHourDropOpen} toggle={toggleFriHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{friOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFriOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setFriOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friMinDropOpen} toggle={toggleFriMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFriOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setFriOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setFriOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setFriOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friAmPmDropOpen} toggle={toggleFriAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFriOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setFriOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={friHourDropClose} toggle={toggleFriHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{friCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFriCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setFriCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friMinDropClose} toggle={toggleFriMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFriCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setFriCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setFriCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setFriCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={friAmPmDropClose} toggle={toggleFriAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{friCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFriCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setFriCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>

    <FormGroup row inline >
            <Row >
              <Col xs={2} >
              <Label style={{whiteSpace: 'nowrap'}}>  
              <Field type='checkbox' name="isOpen" value='saturday' />
              <h6 style={{fontWeight: 'bold', display: 'inline-block'}} className='ms-2' >{" "} Saturday {" "} </h6> 
            </Label>  
            </Col>
            <Col xs={5} className='text-center' >
            <Dropdown isOpen={satHourDropOpen} toggle={toggleSatHourOpen} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{satOpenHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSatOpenHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setSatOpenHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satMinDropOpen} toggle={toggleSatMinuteOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satOpenMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSatOpenMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setSatOpenMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setSatOpenMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setSatOpenMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satAmPmDropOpen} toggle={toggleSatAmPmOpen} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satOpenAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSatOpenAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setSatOpenAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      <Col xs={5} className='text-center' >
            <Dropdown isOpen={satHourDropClose} toggle={toggleSatHourClose} style={{display: 'inline-block'}} >
        <DropdownToggle caret color='primary'>{satCloseHr}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSatCloseHr('1')}>1</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('2')}>2</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('3')}>3</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('4')}>4</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('5')}>5</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('6')}>6</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('7')}>7</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('8')}>8</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('9')}>9</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('10')}>10</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('11')}>11</DropdownItem>
          <DropdownItem onClick={() => setSatCloseHr('12')}>12</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satMinDropClose} toggle={toggleSatMinuteClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satCloseMin}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSatCloseMin('00')}>00</DropdownItem>
          <DropdownItem onClick={() => setSatCloseMin('15')}>15</DropdownItem>
          <DropdownItem onClick={() => setSatCloseMin('30')}>30</DropdownItem>
          <DropdownItem onClick={() => setSatCloseMin('45')}>45</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={satAmPmDropClose} toggle={toggleSatAmPmClose} style={{display: 'inline-block'}}>
        <DropdownToggle caret color='primary'>{satCloseAmPm}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSatCloseAmPm('am')}>am</DropdownItem>
          <DropdownItem onClick={() => setSatCloseAmPm('pm')}>pm</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
      </Row>
    </FormGroup>



            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Formik>
  )
}

export default HoursOpen;