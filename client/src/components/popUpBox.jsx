import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateImage } from '../api/profile.js';
import { getUser, storeUser } from '../storageUtils.js';
import { useNavigate } from 'react-router-dom';


const PopupBox = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleImage = (e) => {
    console.log("image: ",e.target.files[0]);
    setImageFile(e.target.files[0]);
  }

  const handleShow = () => setShow(true);

  const  handleSubmit = async () => {
    if(!imageFile) return;
    const data = await updateImage(imageFile);
    console.log("data", data);
    console.log("userdata: ", getUser());
    storeUser({...getUser(), image_exists: 1, image_path: data.image_path});
    handleClose();
    navigate(0);
  }

  return (
    <>
      <Button style={{zIndex: 1}} variant="btn btn-outline-dark" onClick={handleShow}>
        Edit avtar
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Popup Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form>
            <Form.Group controlId="avtar">
              <Form.Label>Upload Avatar</Form.Label>
              <Form.Control type="file" onChange={handleImage} placeholder="Choose an image" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupBox;
