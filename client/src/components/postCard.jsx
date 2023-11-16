import { Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AiFillLike } from 'react-icons/ai';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';

// Remove the import statement for React since it has already been imported in the file

export default function PostCard({ post }){
  return (
    <Card className='my-4'>
      {
        (post.image_exists)
          ?
          <Card.Img variant="top" src={`http://localhost:4000/${post.image_path}`} alt="post" />
          :
          <Card.Img variant="top" src="../../public/defaultpost.jpg" alt="post" />
      }
      <Card.Body>
        <Row>
          <Col xs={2}>
            <span style={{ marginRight: '15px' }}>{<AiFillLike  />} {post.likes}</span>
          </Col>
          <Col xs={5}>
            <span>{<BsFillChatSquareDotsFill /> } {post.comments}</span>
          </Col>
        </Row>
        <Card.Title>{post.post_title}</Card.Title>
        <Card.Text>{post.post_content}</Card.Text>
        <Card.Text>{new Date(post.post_time).toLocaleString()}</Card.Text>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};
