import { useEffect, useState } from "react";
import { getUser } from "../../storageUtils"
import { getMyPosts } from "../../api/post";
import PostCard from "../../components/postCard";
import PopupBox from "../../components/popUpBox";
import About from "./about";


export default function MyProfile(){
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    async function fetchData() {
      const data = await getMyPosts(user.username);
      setPosts(data);
    }
    fetchData();
  }, []);

  const user = getUser();
  return(
    <div>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row bg-secondary" style = {{height:"200px"}}>
                  <div className="ms-4 mt-5 d-flex flex-column" style = {{width: "150px"}}>
                    {
                    (user.image_exists)
                      ?
                      (<img src= {`http://localhost:4000/${user.image_path}`}
                      alt="Generic placeholder image" className="img-fluid img-thumbnail mt-2 mb-2"
                      style = {{width: "150px", zIndex: 1}} />)
                      :
                      (<img src= "../../../public/defaultAvtar.png" />)
                    }
                    <PopupBox />
                  </div>
                  <div className="ms-3" style={{marginTop: "130px"}}>
                    <h5>{`${user.first_name} ${user.last_name}`}</h5>
                    <p>{user.username}</p>
                  </div>
                </div>
                <div className="p-4 text-black" style = {{backgroundColor: "#f8f9fa"}}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                        
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="pt-4">
                      <About about={user.about} /> 
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent posts</p>
                  </div>
                  <div className="g-2">
                    {
                      (!posts)
                        ? <p>Loading...</p>
                        : (posts.length === 0)
                          ? <p>No posts yet</p>
                          : posts.map(post => (<PostCard  key={post.postId} post={post} />))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}