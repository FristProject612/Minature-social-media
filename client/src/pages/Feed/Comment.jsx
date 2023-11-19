
import  { useEffect, useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";
import PropTypes from 'prop-types';
import { getComments, uploadComment } from '../../api/comment.js';
import { getUser } from '../../storageUtils.js';

const Comment = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fetchData(){
      if(!postId) return;
    
      const data = await getComments(postId);
      setComments(data);
    }
    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    const data = await uploadComment({postId, commentContent: newComment});
    const commentId = data.commentId;

    const userData = getUser();
    const comment = {
      username: userData.username,
      comment_content: newComment,
      comment_time: new Date().toLocaleString(),
      commentId: commentId,
      avtar_exists: userData.image_exists,
      avtar_path: ((userData.image_exists)? userData.image_path : null)
    };

    comments.splice(0, 0, comment);
    setNewComment('');
  };

  return (
    <div>
      {
      (!comments)
        ? <p>No post selected</p>
        :
       (
        <div>
          <Form onSubmit={handleCommentSubmit} className="d-flex my-5">
            <Form.Group controlId="commentForm" className="flex-grow-1 me-2">
              <Form.Control
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button  type="submit"> <IoMdSend /></Button>
          </Form>
          {
            (comments.length === 0)
              ?
               <p>No comments Yet</p>
              : 
                (<ListGroup>
                  {comments.map((comment) => (
                      <div className="card my-3" key={comment.commentId}>
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            {
                              (comment.avtar_exists)
                                ? 
                                  (<img
                                  src={`http://localhost:4000/${comment.avtar_path}`}
                                  alt="User profile"
                                  className="rounded-circle me-2"
                                  style={{ width: '40px', height: '40px' }}
                                  />)
                                :
                                  (<img
                                    src="../../../public/defaultAvtar.png"
                                    alt="User profile"
                                    className="rounded-circle me-2"
                                    style={{ width: '40px', height: '40px' }}
                                    />)
                            }
                            <strong>{comment.username}</strong> 
                          </div>
                          <p className="card-text ml-5">{comment.comment_content}</p>
                          <p className="card-text text-muted text-end">{comment.comment_time}</p>
                        </div>
                      </div>  
                  ))}
                </ListGroup>)
          }
          
        </div>
      ) }
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.number,

};

export default Comment;
