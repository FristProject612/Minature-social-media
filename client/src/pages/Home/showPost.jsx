import PropTypes from 'prop-types';
import { likePost } from '../../api/post';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';

export default function ShowPost({post}) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async () => {
    const response = await likePost(post.postId);
    console.log(response);
    if(!response){
      navigate('/login');
      return;
    }
    setLikes(likes + 1);
  }

  return(
    <div className="card mb-4 p-0" key={post.postId}>
      {(post.image_exists)
      ? <img src={`http://localhost:4000/${post.image_path}`} className="card-img-top" alt="User Profile Picture" />
      : <img src='../../../public/defaultpost.jpg' className="card-img-top img-fluid" alt="User Profile Picture" />
      }
      <div className="card-body">
          <div className="d-flex align-items-center card-header">
            {
              (post.avtar_exists)
                ? <img src={`http://localhost:4000/${post.avtar_path}`} className="rounded-circle" style={{width: "40px", height: "40px"}} alt="User Profile Picture" />
                : <img src="../../../public/defaultAvtar.png" className="rounded-circle" style={{width: "40px", height: "40px"}} alt="User Profile Picture" />
            }
            <h6 style={{marginLeft: ".5rem"}}>{post.username}</h6>
          </div>
          <h5 className="card-title">{post.post_title}</h5>
          <p className="card-text">{post.post_content}</p>
      </div>
      <div className="card-body">
          <span style={{ marginRight: '15px' }}>{<AiFillLike  />} {likes}</span>
          <span>{<BsFillChatSquareDotsFill /> } {post.comments}</span>
      </div>
      <div className="card-body">
          <button type="button" onClick={handleLike} className="btn btn-primary">Like</button>
      </div>
    </div>
  )
}


ShowPost.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    avtar_exists: PropTypes.number.isRequired,
    avtar_path: PropTypes.string,
    username: PropTypes.string.isRequired,
    post_title: PropTypes.string.isRequired,
    post_content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    image_exists: PropTypes.number.isRequired,
    image_path: PropTypes.string
  })
}