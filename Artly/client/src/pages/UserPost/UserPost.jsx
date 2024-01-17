import "./UserPost.scss";
import { useState } from "react";
import JayImage from "../../assets/images/midjourney.png";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiChevronUp,
  FiChevronDown,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import CopyClip from "../../components/CopyClip/CopyClip";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { MdFamilyRestroom, MdFormatLineSpacing } from "react-icons/md";

/**
 *
 * @param {props passed by the "data"} param0
 * @returns Component Post Card
 */
//This is a Component for the user post card

const UserPostCard = ({
  id,
  image,
  name,
  postid,
  profile_pic,
  prompt,
  userid,
  generator

}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <>
      {!loading && (
        <div className="user-post-card" id={id}>
          <CardSkeleton />
        </div>
      )}
      {loading && (
        <div className="user-post-card" id={id}>
          <div className="user-post-info">

            <Link to={`/profile/${userid}`}>
              {profile_pic == null ? (
                <h1
                  style={{
                    background: "black",
                    borderRadius: "50%",
                    textAlign: "center",
                    width: "40px",
                    height: "40px",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  {name[0]}
                </h1>
              ) : (
                <img src={`../../../uploads/${profile_pic}`} alt={name} />
              )}
            </Link>
            <Link to={`/profile/${userid}`}>
              <p>{name}</p>
            </Link>
          </div>
           
          
     
          <div className="user-post-image">
          <h2 className="generator">{generator}</h2>

            <Image
              height={330}
              width={300}
              src={image}
              alt="Generated Image"
              style={{ borderRadius: "0px" }}
            />

            <motion.div
              className="user-post-prompt-container"
              data-isopen={open}
              style={{ y: open ? 0 : 290 }}
              initial={{ y: 0 }}
              animate={{ y: open ? 0 : 290 }}
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
                <span className="user-prompt">{prompt}</span>
              </p>
              <CopyClip prompt={prompt} className="clipboard" />
              <a className="download-icon" href={image} download="gwapo.png">
                <FiDownload className="download-button" />
              </a>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

//for rendering data by mapping through all the data gikan sa "data[ ]"
export const RenderUserPostCard = ({ data, title, loading }) => {
  console.log(data)
  try {
    if (data.length > 0) {
      return (
        <>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            {data.map((post) => (
              <UserPostCard key={post.id} {...post} loading={loading} />
              
            ))}{" "}
          </Image.PreviewGroup>
         
        </>
      );
    }

    return (
      <>
        <div className="user-post-card" >
        <CardSkeleton />
        
        </div>
        <div className="user-post-card" >
          <CardSkeleton />
        </div>
        <div className="user-post-card" >
          <CardSkeleton />
        </div> 
        
      </>
    );
  } catch (error) {

    return (
      console.log(error)
    );
  }

  
};

function UserPost(data, loading) {
  const [search, setsearch] = useState(true);

  console.log(data);
  return (
    <div className="user-post">
      <div className="user-post-header">
        <h1>Community Post</h1>
      </div>
      <div className="user-post-container">
        {search && (
          <RenderUserPostCard
            data={data.post}
      
            title="Something Went Wrong!"
          />
        )}
         <Link to="/community">
          <div
            className="user-post-card explore-more"
            style={{ background: `url(${JayImage})` }}
          >
            <p>Explore More...</p>
          </div>
          </Link>
      </div>
    </div>
  );
}

export default UserPost;
