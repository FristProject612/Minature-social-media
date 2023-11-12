import { useState, useEffect } from "react"
import { getUser } from "../../storageUtils";


export default function Profile() {

    const [profileDetails, setProfileDetails] = useState(null);

    useEffect(() => {
        const profileUser = getUser();
        console.log("userData", profileUser);
        setProfileDetails(profileUser);
    }, [])
    return(
        <div className="container mt-4 w-50">
            {
                (!profileDetails)
                    ? <p>Please Wait...</p>
                    : <div className="form-group">
                        <legend>Username</legend><h2 className="my-3"><input type = "text" className="form-control" value = {profileDetails.username} disabled/></h2>
                        <div className="d-flex align-items-center bg-gradient-primary">
                        <legend className="mr-4"style={{width:"fit-content"}}>Firstname:</legend><h3 className="my-3"><input type = "text" className="form-control" style={{width:"200px"}}  value = {profileDetails.first_name} disabled/></h3>
                        <legend className="ml-5 mr-4" style={{width:"fit-content"}}>Lastname:</legend><h3><input type = "text" className="form-control" style={{width:"200px"}}  value = {profileDetails.last_name} disabled/></h3>
                        </div>
                        <div className="d-flex align-items-center">
                        <span className="mr-4"style={{fontSize:"1.5rem"}}>DOB:</span><h3 className="my-3"><input type = "text" className="form-control"  value = {profileDetails.dob} disabled/></h3>
                        </div>
                        <div className="d-flex align-items-center">
                        <span className="mr-4"style={{fontSize:"1.5rem"}}>Email_Id:</span><h3 className="my-3"><input type = "text" className="form-control" value = {profileDetails.email} disabled/></h3>
                        </div>
                        
                        
                    </div>
            }
        </div>
    )
}