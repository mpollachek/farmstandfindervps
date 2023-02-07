import { Row, Col } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow } from "@fortawesome/free-solid-svg-icons"; // dairy
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"; // produce
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons"; // meat
import { faEgg } from "@fortawesome/free-solid-svg-icons"; // eggs
import { faTents } from "@fortawesome/free-solid-svg-icons"; // farmers market
import { faChildren } from "@fortawesome/free-solid-svg-icons"; // Play Area
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons"; // therapy
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; // garden center

const FarmTypeIcons = ({farmType}) => {

  console.log("farmType in icons component: ", farmType)

  return(
    <Row className='text-center' style={{display: 'inline'}}>

    {farmType ? (
      <div>
    {farmType.includes('produce') ? (
    <span style={{fontSize: '1.5em', color: 'red'}} >
      Produce {" "}<FontAwesomeIcon icon={faPepperHot} /> {" "}
    </span> ) : null }    

    {farmType.includes('meat') ? (
    <span style={{fontSize: '1.5em', color: 'brown'}} >
    Meat {" "}<FontAwesomeIcon icon={faDrumstickBite} />{" "}
    </span> ) : null }

    {farmType.includes('dairy') ? (
    <span style={{fontSize: '1.5em', color: 'black'}} >
    Dairy {" "}<FontAwesomeIcon icon={faCow} />{" "}
    </span> ) : null }

    {farmType.includes('eggs') ? (
    <span style={{fontSize: '1.5em', color: '#66a1ed'}} >
    Eggs {" "}<FontAwesomeIcon icon={faEgg} />{" "}
    </span> ) : null }

    {farmType.includes('farmersMarket') ? (
    <span style={{fontSize: '1.5em', color: '#853e00'}} >
    Farmers Market {" "}<FontAwesomeIcon icon={faTents} />{" "}
    </span> ) : null }

    {farmType.includes('gardenCenter') ? (
    <span style={{fontSize: '1.5em', color: '#098200'}} >
    Garden Center {" "}<FontAwesomeIcon icon={faSeedling} />{" "}
    </span> ) : null }

    {farmType.includes('playArea') ? (
    <span style={{fontSize: '1.5em', color: '#20b2bd'}} >
    Play Area {" "}<FontAwesomeIcon icon={faChildren} />{" "}
    </span> ) : null }

    {farmType.includes('therapy') ? (
    <span style={{fontSize: '1.5em', color: '#800915'}} >
    Therapy {" "}<FontAwesomeIcon icon={faUserDoctor} />{" "}
    </span> ) : null }    
    </div>
    ) : null }
    </Row>
  )
}

export default FarmTypeIcons