import { useState } from "react";
import { getFeeds } from "../../api/post";
import Notification from "../../components/Notifications";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");

    const [notification, setNotification] = useState("");

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !content || !file){
            console.log("fill all");
            return showNotification("Fill all the entries.")
        }
        const post = {
            postTitle: title,
            postContent: content,
            postFile: file
        }
        const response = await getFeeds(post);
        console.log(response);
        navigate('/feed');
    }

    return(
        <div className="container mt-4 w-50">
            {(notification) && <Notification />}
            <form onSubmit={handleSubmit} className="form-group m-5">
                <h1>AddPost</h1>
                <input type="text" value={title} className = "form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
                <div className="mt-4 mb-4">
                <textarea type="text" value={content} className = "form-control" onChange={(e) => setContent(e.target.value)} placeholder="Content"/>
                </div>
                <input type="file" className = "form-control" onChange={(e) => setFile(e.target.value)}/>
                <button className="btn btn-warning form-control" type="submit">Submit</button>
            </form>
        </div>
    )
}