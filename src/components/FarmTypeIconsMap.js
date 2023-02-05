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

const FarmTypeIconsMap = ({farmType}) => {

  console.log("farmType in icons component: ", farmType)

  return(
    <Row className='text-center' style={{display: 'inline'}}>

    {farmType.includes('produce') ? (
    <span style={{fontSize: '1.5em', color: 'red'}} >
      {" "}<FontAwesomeIcon icon={faPepperHot} />
    </span> ) : null }

    {farmType.includes('meat') ? (
    <span style={{fontSize: '1.5em', color: 'brown'}} >
    {" "}<FontAwesomeIcon icon={faDrumstickBite} />
    </span> ) : null }

    {farmType.includes('dairy') ? (
    <span style={{fontSize: '1.5em', color: 'black'}} >
    {" "}<FontAwesomeIcon icon={faCow} />
    </span> ) : null }

    {farmType.includes('eggs') ? (
    <span style={{fontSize: '1.5em', color: '#66a1ed'}} >
    {" "}<FontAwesomeIcon icon={faEgg} />
    </span> ) : null }

    {farmType.includes('farmersMarket') ? (
    <span style={{fontSize: '1.5em', color: '#853e00'}} >
    {" "}<FontAwesomeIcon icon={faTents} />
    </span> ) : null }

    {farmType.includes('gardenCenter') ? (
    <span style={{fontSize: '1.5em', color: '#098200'}} >
    {" "}<FontAwesomeIcon icon={faSeedling} />
    </span> ) : null }

    {farmType.includes('playArea') ? (
    <span style={{fontSize: '1.5em', color: '#20b2bd'}} >
    {" "}<FontAwesomeIcon icon={faChildren} />
    </span> ) : null }

    {farmType.includes('therapy') ? (
    <span style={{fontSize: '1.5em', color: '#800915'}} >
    {" "}<FontAwesomeIcon icon={faUserDoctor} />
    </span> ) : null }    
    </Row>
  )
}

export default FarmTypeIconsMap