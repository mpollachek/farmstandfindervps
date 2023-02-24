import { Col, Row } from "reactstrap";

const HoursDisplay = ({ hours }) => {
  const { open, close } = hours;

  return (
    <Row className="my-3">
      <Row className="justify-content-center text-center">
        <Col xs={{ size: 2 }}>
          <h6> Day</h6>
        </Col>
        <Col xs={{ size: 2 }}>
          <h6> Open </h6>
        </Col>
        <Col xs={{ size: 2 }}>
          <h6> Close </h6>
        </Col>
      </Row>

      {open.sun.isOpen &&
      (open.sun.hour !== "hour" ||
        open.sun.min !== "minutes" ||
        close.sun.hour !== "hour" ||
        close.sun.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Sunday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            {open.sun.hour}:{open.sun.min} {open.sun.ampm}
          </Col>
          <Col xs={{ size: 2 }}>
            {close.sun.hour}:{close.sun.min} {close.sun.ampm}
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Sunday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}

      {open.mon.isOpen &&
      (open.mon.hour !== "hour" ||
        open.mon.min !== "minutes" ||
        close.mon.hour !== "hour" ||
        close.mon.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Monday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {open.mon.hour}:{open.mon.min} {open.mon.ampm}{" "}
            </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {close.mon.hour}:{close.mon.min} {close.mon.ampm}{" "}
            </h6>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Tuesday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}

      {open.tue.isOpen &&
      (open.tue.hour !== "hour" ||
        open.tue.min !== "minutes" ||
        close.tue.hour !== "hour" ||
        close.tue.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Tuesday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {open.tue.hour}:{open.tue.min} {open.tue.ampm}{" "}
            </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {close.tue.hour}:{close.tue.min} {close.tue.ampm}{" "}
            </h6>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Tuesday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}

      {open.wed.isOpen &&
      (open.wed.hour !== "hour" ||
        open.wed.min !== "minutes" ||
        close.wed.hour !== "hour" ||
        close.wed.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Wednesday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {open.wed.hour}:{open.wed.min} {open.wed.ampm}{" "}
            </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {close.wed.hour}:{close.wed.min} {close.wed.ampm}{" "}
            </h6>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Wednesday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}

      {open.thur.isOpen &&
      (open.thur.hour !== "hour" ||
        open.thur.min !== "minutes" ||
        close.thur.hour !== "hour" ||
        close.thur.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Thursday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {open.thur.hour}:{open.thur.min} {open.thur.ampm}{" "}
            </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {close.thur.hour}:{close.thur.min} {close.thur.ampm}{" "}
            </h6>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Thursday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}

      {open.fri.isOpen &&
      (open.fri.hour !== "hour" ||
        open.fri.min !== "minutes" ||
        close.fri.hour !== "hour" ||
        close.fri.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Friday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {open.fri.hour}:{open.fri.min} {open.fri.ampm}{" "}
            </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {close.fri.hour}:{close.fri.min} {close.fri.ampm}{" "}
            </h6>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Friday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}

      {open.sat.isOpen &&
      (open.sat.hour !== "hour" ||
        open.sat.min !== "minutes" ||
        close.sat.hour !== "hour" ||
        close.sat.min !== "minutes") ? (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Saturday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {open.sat.hour}:{open.sat.min} {open.sat.ampm}{" "}
            </h6>
          </Col>
          <Col xs={{ size: 2 }}>
            <h6>
              {" "}
              {close.sat.hour}:{close.sat.min} {close.sat.ampm}{" "}
            </h6>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={{ size: 2 }}>
            <h6> Saturday: </h6>
          </Col>
          <Col xs={{ size: 2 }}>Closed</Col>
          <Col xs={{ size: 2 }}>Closed</Col>
        </Row>
      )}
    </Row>
  );
};

export default HoursDisplay;
