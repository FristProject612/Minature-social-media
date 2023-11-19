import { useEffect, useState } from "react";
import { getFeeds } from "../../api/post";
import '../../assets/global.css'
import ShowPost from "./showPost";
import { Navigate } from "react-router-dom";
import Comment from "./Comment";

export default function Feed() {
  const [posts, setPosts] = useState(null);
  const [commentPost , setCommentPost] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const feeds = await getFeeds(); 
      if(!feeds){
        console.log("feeds: ", feeds);
        return <Navigate to="/login" />;
      }
      setPosts(feeds);
    }
    fetchData();
  }, [])

  const showComment = (postId) => {
    setCommentPost(postId);
  }

  return(
    <div className="container-fluid" >
      <div className="row py-4" style={{marginLeft: "15em"}}>
        <div className="col" style={{overflow: "auto", maxHeight: "100vh"}}>
          {
          (!posts)
            ? <p>Loading...</p>
            : posts.map((post) =>  <ShowPost post={post} key={post.postId} showComment={showComment}/> )
          }
        </div>
        <div className="col" style={{overflow: "auto", maxHeight: "100vh"}}>
          <Comment postId={commentPost}/>
        </div>
      </div>
    </div>
  )
}
