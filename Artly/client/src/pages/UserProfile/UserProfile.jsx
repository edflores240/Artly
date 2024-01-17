import "./UserProfile.scss";
import CardSkeleton, { ProfileSkeleton } from "../../components/CardSkeleton/CardSkeleton"
import { useContext, useEffect, useState } from "react";
import JayImage from "../../assets/images/anything2.png";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { UserAuthContext, UserAuthProvider } from "../../context/authentication";
import { Image, Skeleton, Tooltip } from "antd";
import { motion } from "framer-motion";
import { FiChevronUp, FiDownload, FiChevronDown, FiEdit } from "react-icons/fi";
import CopyClip from "../../components/CopyClip/CopyClip";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import UploadImage from "./UploadImage";
import "../../components/PostFilter/PostFilter.scss"
import { Select } from "antd";




// export const data = [
//     {
//       id: 1234,
//       username: "Jay Flores",
//       profImage: `${JayImage}`,
//       genImage: `${JayImage}`,
//       prompt: "Gwapo kay si Jay ar",
//       generator: "Midjourney"
//     },
//     {
//       id: 21,
//       username: "Phoebe",
//       profImage: `${JayImage}`,
//       genImage: `${JayImage}`,
//       prompt: "Love you phoebe",
//       generator: "Midjourney"
//     },
//     {
//       id: 22,
//       username: "Phoebe",
//       profImage: `${JayImage}`,
//       genImage: `${JayImage}`,
//       prompt: "Love you phoebe",
//       generator: "Dalle"
//     },
  
//     {
//       id: 23,
//       username: "Phoebe",
//       profImage: `${JayImage}`,
//       genImage: `${JayImage}`,
//       prompt: "Love you phoebe",
//       generator: "Anything"
//     },
  
//     {
//       id: 24,
//       username: "Phoebe",
//       profImage: `${JayImage}`,
//       genImage: `${JayImage}`,
//       prompt: "Love you phoebe",
//       generator: "Openjourney"
//     },
//     {
//         id: 25,
//         username: "Phoebe",
//         profImage: `${JayImage}`,
//         genImage: `${JayImage}`,
//         prompt: "Love you phoebe",
//         generator: "Openjourney"
//       },
//       {
//         id: 26,
//         username: "Phoebe",
//         profImage: `${JayImage}`,
//         genImage: `${JayImage}`,
//         prompt: "Love you phoebe",
//         generator: "Openjourney"
//       },
//       {
//         id: 24,
//         username: "Phoebe",
//         profImage: `${JayImage}`,
//         genImage: `${JayImage}`,
//         prompt: "Love you phoebe",
//         generator: "Openjourney"
//       },
//       {
//         id: 24,
//         username: "Phoebe",
//         profImage: `${JayImage}`,
//         genImage: `${JayImage}`,
//         prompt: "Love you phoebe",
//         generator: "Openjourney"
//       },
//   ];






  const UserPostCards = (userPost) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const spring = {
      type: "spring",
      stiffness: 700,
      damping: 30,
    };
  
    return (
      <>
        {!loading && (
          <div className="user-post-card" id={userPost.id}>
            <CardSkeleton />
          </div>
        )}
        {loading && (
          <div className="user-post-card" id={userPost.id}>  
            <div className="user-post-image">
              <div className="generator">
                {`${userPost.generator}`}
              </div>
              <Image 
                height={400}
                width={350} 
                src={userPost.image} 
                alt="Generated Image" 
                style={{borderRadius:"0px"}}
                />
                
             
              <motion.div
                className="user-post-prompt-container"
                data-isopen={open}
                style={{ y: open ? 0 : 330 }}
                initial={{ y: 0 }}
                animate={{ y: open ? 0 : 330 }}
                transition={spring}
              >
                <div className="prompt-toggler">
                  {!open ? (
                    <FiChevronUp
                      className="prompt-toggle"
                      onClick={() => setOpen(true)}
                    />
                  ) : (
                    <FiChevronDown
                      className="prompt-toggle"
                      onClick={() => setOpen(false)}
                    />
                  )}
                </div>
                <p>
                  <span style={{ fontWeight: "bold" }}>Prompt: </span>
                  <br />
                  <span className="user-prompt">{userPost.prompt}</span>
                </p>
                <CopyClip prompt={userPost.prompt} className="clipboard" />
                <a className="download-icon" href={userPost.image} download={"Artly-"+Date.now+".png"}>
                <FiDownload className="download-button" />
              </a>
              </motion.div>
  
            </div>
          </div>
        )}
      </>
    );
  }

 const RenderUserPostCards = ({ data, title }) => {

  const userId = useLocation().pathname.split("/")[2];


  data && console.log("data: " + data.userPost[0].name)
    if (data.userPost[0].name.length > 0) {
      return (
        <>
        <Image.PreviewGroup
             preview={{
               onChange: (current, prev) =>
                 console.log(`current index: ${current}, prev index: ${prev}`),
             }}>
          {data.userPost.map((userPost) => (
              <UserPostCards key={userPost.id} {...userPost} />
              
            ))}
            {console.log(data)}
          </Image.PreviewGroup>
          <div
            className="user-post-card explore-more"
            style={{ background: `url(${JayImage})` }}
          >
            <p>Explore More...</p>
          </div>
        </>
      );
    }
 }




 
// USER PROFILE STARTS
function UserProfile(info) {
    const [opensearch, setOpensearch] = useState(false);
    
    const {currentUser} = useContext(UserAuthContext)
    const [openModal, setOpenModal] = useState()
    const [search, setSearch] = useState("")
    const [offset, setOffset] = useState(0)
    const [nextPage, setNextPage] = useState(true)
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState()

    

    // USER HTTP REQUEST STARTS HERE

    const userId = useLocation().pathname.split("/")[2];
    console.log("this is info: " + [info])


 




    // Fetching data to User
    const {isLoading, error, data} = useQuery(["user"], ()=> 
       makeRequest.get(`users/find/${userId}?search=${search}&offset=${offset}`)
        .then((res)=> {
          if (error) {console.log(error)}
          setLoading(false)
          return(res.data)
        },
        {staleTime: 3000}
        )
      );  


      

      useEffect(() => {
        setOffset(0);
        setPost([])
        setNextPage(true)

      }, [search]);

      useEffect(()=> {
        setPost([])
      },[]) 

    
      const handleLoadMore = () => {
        setOffset(offset + 9)
        console.log("OFFSET: " + offset)
        setLoading(true)
      };



      
    
      useEffect(()=> {
        data &&  post.length === 0 && data.length !== 0 ? setPost([data]) :
        data && post.length !== 0 && data.length !== 0  && data.userPost[data.userPost.length - 1] !==  post[post.length - 1].userPost[post[post.length - 1].userPost.length - 1].id 
        ? setPost (prevState => [...prevState, data]) : handleLoadMore()
      setIsError(error)
        
      }, [data && data.userPost && data.userPost.length != 0 && data.userPost[data.userPost.length -1 ].id])
    
      useEffect(() => {
        data && data.length !== 0  &&  post.length !== 0 && post[post.length - 1].hasMore === false && setNextPage(false) 
      }, [post])

 console.log(data)
 console.log(post)


let x = 1
 if (data){
  return (

   `${data.userPost.length != 0 && data.userPost[0].userid}` === userId ?
   
   <div className="user-profile" id="user-profile">
     
     
                
        <div className="post-container">

         <div className="post-filter" style={{marginTop:"100px"}}></div>
           

            <div className="post">
            <div className="user-post-container">
            <div className="post-wrapper">
            {isError ? <div>There's Something Wrong ! {isError.message}</div> :
            post && post.length !== 0  ? (
                <>
                  {post.map((pageData, i) => (
                  
                    <RenderUserPostCards
                      key={i}
                      data={pageData}
                      title="There's something wrong In loading the Image"
                    />
                  ))}
                </> 
              
              ):
              
              <div className="post-wrapper">
                  <div className="user-post-card">
                    <Skeleton.Image active={true} style={{width:"350px", height:"420px"}}/>
                  
                    </div>
                    <div className="user-post-card">
                    <Skeleton.Image active={true} style={{width:"350px", height:"420px"}}/>
                    </div>
                    <div className="user-post-card">
                    <Skeleton.Image active={true} style={{width:"350px", height:"420px"}}/>
                      
                    </div>
                </div>

              }</div>

                {nextPage ?
              
                  loading === false ?
                  <div className="reloader">
                      <button className="pagination" onClick={() => handleLoadMore()}>
                    
                      <FiRefreshCw/>
                    </button>
                  </div>:
                  <div className="post-wrapper">
                  <div className="user-post-card">
                    <Skeleton.Image active={true} style={{width:"350px", height:"420px"}}/>
                  
                    </div>
                    <div className="user-post-card">
                    <Skeleton.Image active={true} style={{width:"350px", height:"420px"}}/>
                    </div>
                    <div className="user-post-card">
                    <Skeleton.Image active={true} style={{width:"350px", height:"420px"}}/>
                      
                    </div>
                </div> : 
                <div className="reloader">
                    <h1>No more Feeds</h1>
                </div>
                
                  
                  }
      
         
  
            </div>
            </div>
        </div>


    </div> :
    <div className="profile-info" id="user-profile" style={{ width:"100%", background:"rgb(1 1 16)",}}>
    <ProfileSkeleton/>
  </div>
  )}
   
  return (
    <div className="profile-info" id="user-profile" style={{ width:"100%", background:"rgb(1 1 16)",}}>
      <ProfileSkeleton/>
    </div>
  )
}


export default UserProfile