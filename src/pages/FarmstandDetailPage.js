import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import { selectOwnerCommentsByFarmstandId } from "../features/comments/commentsFns";
import FarmstandDetail from "../farmstands/FarmstandDetail";
import CommentsList from "../features/comments/CommentList";
import SubHeader from "../components/SubHeader";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { SingleFarmstandContext } from "../App";
import OwnerComment from "../features/comments/OwnerComment";
import HoursDisplay from "../components/HoursDisplay";

const FarmstandDetailPage = () => {

  const [runGetFarmstands, setRunGetFarmstands] = useState(false);
  const [runGetRating, setRunGetRating] = useState(false);
  const {farmstand, setFarmstand} = useContext(SingleFarmstandContext)
  //const [farmstand, setFarmstand] = useState({ products: [], images: [], comments: [], owner: [], farmstandType: [], location: {coordinates: []} });

  // const [runGetOwnerComments, setRunGetOwnerComments] = useState(false)
  // const [ownerComments, setOwnerComments] = useState([
  //   {
  //     ownerCommentId: "",
  //     text: "",
  //     author: "",
  //     date: "2000-08-04T20:11Z",
  //     updated: "",
  //   },
  // ]);

  const { farmstandId } = useParams();
  // console.log("farmstandId: ", farmstandId);

  const getFarmstand = async () => {
    // console.log("run getFarmstand");
    if (runGetFarmstands) {
      // console.log("run getFarmstand2");
      const farm = await selectFarmstandById(farmstandId);
      console.log("farm:", farm);
      setFarmstand(farm);
      setRunGetFarmstands(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      // console.log("setrunget true");
      setRunGetFarmstands(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getFarmstand();
  }, [runGetFarmstands]);

  /* Retrieve Owner Comments */
  // const getOwnerComments = async () => {
  //   if (runGetOwnerComments) {
  //     const ownerComments = await selectOwnerCommentsByFarmstandId(`${farmstandId}`);
  //     console.log("comments:", ownerComments);
  //     setOwnerComments(ownerComments);
  //     setRunGetOwnerComments(false);
  //   }
  // };

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     console.log("setRunGetOwnerComments true");
  //     setRunGetOwnerComments(true);
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   getOwnerComments();
  // }, [runGetOwnerComments]);
  /* End Retrieve Owner Comments */

  const ratingsSum = () => {
    if (runGetRating){
      console.log("farmstand: ", farmstand)
      if (farmstand && farmstand.comments.length > 0) {
        let sum = 0
        for (const i of farmstand.comments){
          sum += i.rating
    }
    return sum;
  }}}

  const avgRating = (ratingsSum()/farmstand.comments.length).toFixed(1)

  useEffect(() => {
    setRunGetRating(true)
  }, [farmstand])

  useEffect(() => {
    ratingsSum();
  }, [runGetRating])

  const firstOwnerComment = farmstand.ownercomments[0]
  console.log("ownercomments: ", farmstand.ownercomments)
  console.log("firstOwnerComment: ", firstOwnerComment)

  // const isLoading = useSelector((state) => state.farmstands.isLoading);
  // const errMsg = useSelector((state) => state.farmstands.errMsg);
  let content = null;

  // if (farmstand.isLoading) {
  //   content = <Loading />;
  // } else if (farmstand.errMsg) {
  //   content = <Error errMsg={errMsg} />;
  // } else {
  if (farmstand.farmstandName) {
    content = (
      <>
        <FarmstandDetail currentFarmstand={farmstand} />
        <CommentsList currentFarmstand={farmstand} />
      </>
    );
  }

  return (
    /* will change to content once is loading and error setup */
    <Container className="container-fluid" >
      <Row className="text-center" >
      <SubHeader current={farmstand.farmstandName} detail={true} avgRating={avgRating} farmType={farmstand.farmstandType} remove={false}  />
      {firstOwnerComment ? (   
      <div className="mt-1 pt-3" style={{backgroundColor: '#ebd28f'}} >
      <h5 >Most Recent Owner Update</h5>         
      <OwnerComment ownerComment={firstOwnerComment} farmstandOwner={farmstand.owner} />      
      </div>
      ) : null }
      { farmstand.useHours ? <HoursDisplay hours={farmstand.hours} /> : null }
      </Row>
      <Row>
        <Col md={{ size: 5 }} className="my-2">
          <FarmstandDetail currentFarmstand={farmstand} />
        </Col>
        <Col md={{ size: 6, offset: 1 }} className="my-2">
          <CommentsList currentFarmstand={farmstand} />
        </Col>
      </Row>
    </Container>
  );
};

export default FarmstandDetailPage;
