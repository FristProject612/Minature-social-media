import { useEffect, useState } from "react";
import { getFeeds } from "../../api/post";
import '../../assets/global.css'
import ShowPost from "./showPost";

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const feeds = await getFeeds(); 
      console.log(feeds);
      setPosts(feeds);
    }
    fetchData();
  }, [])

  return(
    <div className="container mt-4 w-50">
      {
      (!posts)
        ? <p>Loading...</p>
        : posts.map((post) =>  <ShowPost post={post} key={post.postId} /> )
      }
    </div>
  )
}