import { useState } from 'react';
import {
  Button as RSButton,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from 'reactstrap'

const TestPage = () => {

  const [offcanvas, setOffcanvas] = useState(false);
  const toggleOffcanvas = () => setOffcanvas(!offcanvas);

  return(
<div>
  <RSButton
    color="primary"
    onClick={toggleOffcanvas}
  >
    Open
  </RSButton>
  <Offcanvas  isOpen={offcanvas} toggle={toggleOffcanvas}>
    <OffcanvasHeader toggle={toggleOffcanvas}>
      Offcanvas
    </OffcanvasHeader>
    <OffcanvasBody>
      <strong>
        This is the Offcanvas body.
      </strong>
    </OffcanvasBody>
  </Offcanvas>
</div>
  )
}

export default TestPage;