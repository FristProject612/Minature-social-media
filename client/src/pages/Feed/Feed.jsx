import { useEffect, useState } from "react";
import { getFeeds } from "../../api/post";
import '../../assets/global.css'
import ShowPost from "./showPost";
import { Navigate } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState(null);

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

  return(
    <div className="" >
      <div className="row" style={{marginLeft : '15rem',maxHeight: '100vh'}}>
        <div className="col" style={{overflow: 'scroll',maxHeight: '100vh'}}>
          {
          (!posts)
            ? <p>Loading...</p>
            : posts.map((post) =>  <ShowPost post={post} key={post.postId} /> )
          }
        </div>
        <h1 className="col">dkfdkfjd</h1>
      </div>
    </div>
  )
}
