import { useState } from "react";
import PropTypes from 'prop-types';
import { updateAbout } from "../../api/profile";

export default function About({ about }){ 
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(about || "Empty about");
  const [aboutFeild, setAboutFeild] = useState(about || "");

  function handleEdit(){
    setIsEditing(true);
  }

  function handleCancelClick(){
    setIsEditing(false);
  }

  const handleSave = async () => {
    if(aboutFeild.length === 0) return;

    if(aboutFeild === aboutText) return setIsEditing(false);
    
    setAboutText(aboutFeild);
    setIsEditing(false);
    await updateAbout(aboutFeild)
    console.log("saved: ", aboutText);
  }

  return(
    <>
    {
      (isEditing) ? (
        <div>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
          value={aboutFeild} onChange={(e) => setAboutFeild(e.target.value)}></textarea>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary" onClick={handleCancelClick}>Cancel</button>
            <button type="button" className="btn btn-primary ms-2" onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="p-3 mb-3" style={{backgroundColor: "#f8f9fa"}}>{aboutText}</p>
          <button type="button" className="btn btn-primary ms-2" onClick={handleEdit}>Edit</button>
        </div>
      ) 
    }  
    </>
  );
} 

About.propTypes = {
  about: PropTypes.string
}
