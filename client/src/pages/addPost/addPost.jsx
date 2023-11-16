
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addPost } from '../../api/post';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !content) return alert("Please fill in all text fields");

    const post = {
      image: image,
      title: title,
      content: content
    }

    const data = await addPost(post);
    navigate('/feed');
    console.log("data: ", data);
  };

  return (
    <div className="container-fluid" style={{paddingLeft: "15em", marginTop: "4em"}}>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ marginTop: '1rem', marginBottom: '5rem', objectFit: 'cover', width: '60%'}}
          />
        )}
      </Form.Group>

      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default AddPost;
