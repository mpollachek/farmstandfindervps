import { Row, Col } from 'reactstrap';
import Comment from './Comment';
import { selectCommentsByFarmstandId } from './CommentsFilter';
import CommentForm from './CommentForm';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const CommentsList = ({ farmstandId }) => { 
const comments = selectCommentsByFarmstandId(farmstandId);
  
//   const isLoading = useSelector((state) => state.comments.isLoading);
//   const errMsg = useSelector((state) => state.comments.errMsg);
//   if (isLoading) {
//     return (
//       <Loading />
//     );
// }

// if (errMsg) {
//     return (
//             <Error errMsg={errMsg} />
//     );
// }

  if (comments && comments.length > 0) {
      return (
          <Col md='5' className='m-1'>
              <h4>Comments</h4>
              {comments.map((comment) => {
                  return <Comment key={comment.id} comment={comment} />;
              })}
              <CommentForm farmstandId={farmstandId}/>
          </Col>
      );
  }
  return (
      <Col md='5' className='m-1'>
          There are no comments for this farmstand yet.
      </Col>
  );
};

export default CommentsList;