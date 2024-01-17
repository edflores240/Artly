import "./Navbar.scss";
import logo from "../../assets/images/ArtlyLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/authentication";
import { useContext, useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdPerson, MdLogout, MdClose, MdErrorOutline } from "react-icons/md";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import GeneratorCard from "../ImageGeneratorCard/GeneratorCard";
import { motion } from "framer-motion";
import { Button, Modal, Space } from 'antd';

function Dropdown(theFunction) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [showcard, setShowcard] = useState(false)
  

  const items = [
    {
    name: "Openjourney",
    cName: 'dropdown-link',
    titleCard:"Openjourney",
    ApiHttp: "https://api-inference.huggingface.co/models/prompthero/openjourney"

  },
  {
    name: "Anything",
    cName: 'dropdown-link',
    titleCard:"Anything v4",
    ApiHttp: "https://api-inference.huggingface.co/models/andite/anything-v4.0"

  },
  {
    name: "Dall-e",
    cName: 'dropdown-link',
    titleCard:"Dall-e",
    ApiHttp: "https://api-inference.huggingface.co/models/prompthero/openjourney-v4"
    

  },
  {
    name: "Midjourney",
    cName: 'dropdown-link',
    titleCard:"Midjourney",
    ApiHttp: "https://api-inference.huggingface.co/models/prompthero/openjourney"


  },

]

  return (
    <>
     {items.map((item, index) => {
          return (
            <>
            <motion.div
            
            className="generator-holder"
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              background: "rgba(255,255,255,0)",
              zIndex: "100000",
              top: "0",
              left: "0",
            }}
            initial={{ scale: 0 }}
            animate={{ scale:!showcard? 0: 1}}
            transition={ {
                type: "spring",
                stiffness: 700,
                damping: 30,
              }} 
          >
            <div className="generator-deactive" 
            onClick={() => setShowcard(false)}
            style={{
              width: "100%",
              height: "100vh",
              position: "absolute",
              zIndex: "0",
              top: "0",
              left: "0",
            }} ></div>
            <MdClose style={{color:"white", fontSize:"1.3rem", fontWeight:"500", position:"absolute", zIndex:"200",top:"50px", right:"100px", cursor:"pointer" }} onClick={() => setShowcard(false)}/>
            {/* Generator Card */}
            <GeneratorCard generatorName={item.titleCard} ApiHttp={item.ApiHttp}/>
            
            </motion.div> 
          </>
          );
        })}
  
    
      <ul

        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {items.map((item, index) => {
          return (
            <>
            
          <a onClick={theFunction()}> 
            <li key={index}
                className={item.cName}
                onClick={() => setClick(false)}>
                  {item.name}
            </li>
          </a>
          </>
          );
        })}
      </ul>
    </>
  );
}



// NAA DARI AND LOGOUT FUNCTIONS MODAL ALERT FOR
function ProfileDropdown () {
  const [click, setClick] = useState(false);
 
  const {currentUser} = useContext(UserAuthContext)
  const navigate = useNavigate()

  const {isLoading, error, data} = useQuery(["CurrentUser"], ()=> 
  makeRequest.get("users/currentUser/" + currentUser.id).then((res)=> {
    if (error) {console.log(error)} return(res.data)
  })
);



//  MODAL ALERT NI 
const { confirm } = Modal;
const showConfirm = () => {
  confirm({
    title: 'Session Expired',
    icon:<MdErrorOutline/> ,
    
    content: 'Your Session has Expired Please Login',
    onOk() {
      localStorage.removeItem("user");
      navigate("/account")
    },

    onCancel(){
      localStorage.removeItem("user");
      window.location.reload();
    }

  });
};


   if (error) {
    if (error.response && error.response.status === 401){
      showConfirm()
     
    }
      
    }



    const handleClick = () => setClick(!click)



  
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8800/server/auth/logout");
      localStorage.removeItem("user");
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    data && <>
      <div onClick={handleClick} className={click ? 'prof-dropdown clicked' : 'prof-dropdown'}>
      
      <div className="username" ><Link to={`/profile/${currentUser.id}`} >
        <MdPerson/>Account </Link>
        </div>

        <div className='log-out' onClick={() =>handleLogout()}>
            <MdLogout/>  Logout
        </div>
      </div>
    </>
  );
  
}






function Navbar() {
  // Context  variables
  const { currentUser } = useContext(UserAuthContext);

  //useStates 
  const [haveAccount, setHaveAccount] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true)
  const [dropdown, setDropdown] = useState(false)
  const [profDrop, setPofDrop] = useState(false)
  const [example, setExample] = useState(false)
 const [showcard, setShowcard] = useState(false)

 const [showOpenjrny, setOpenJrny] = useState(false)
 const [showAnything, setAnything] = useState(false)
 const [showDalle, setDalle] = useState(false)
 const [showMidjrny, setMidjrny] = useState(false)



  


// DROPDOWN ITEMS NI
  const items = [
    {
    name: "Openjourney",
    cName: 'dropdown-link',
    titleCard:"Openjourney",
    ApiHttp: "https://api-inference.huggingface.co/models/prompthero/openjourney",
    show: ()=> setOpenJrny(true),
    close: ()=> setOpenJrny(false),
    opener : showOpenjrny
  },
  {
    name: "Anything",
    cName: 'dropdown-link',
    titleCard:"Anything v4",
    ApiHttp: "https://api-inference.huggingface.co/models/andite/anything-v4.0",
    show: ()=> setAnything(true),
    close: ()=> setAnything(false),
    opener: showAnything
  },
  {
    name: "Dall-e",
    cName: 'dropdown-link',
    titleCard:"Dall-e",
    ApiHttp: "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
    show: ()=> setDalle(true),
    close: ()=> setDalle(false),
    opener: showDalle

  },
  {
    name: "Midjourney",
    cName: 'dropdown-link',
    titleCard:"Midjourney",
    ApiHttp: "https://api-inference.huggingface.co/models/prompthero/openjourney",
    show: ()=> setMidjrny(true),
    close: ()=> setMidjrny(false),
    opener: showMidjrny

  },

]


  // FOR QUERY THEN HTTP REQUEST NI
  const {isLoading, error, data} = useQuery(["currentUser"], ()=> 
  makeRequest.get("users/currentUser/" + currentUser.id).then((res)=> {
    return res.data;
  })
);


function Dropdown() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
 
  return (
    <>
    
      <ul

        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {items.map((item, index) => {
          return (
            <>
            
          <a onClick={item.show}> 
            <li key={index}
                className={item.cName}
                onClick={() => setClick(false)}>
                  {item.name}
            </li>
          </a>
          </>
          );
        })}
      </ul>
    </>
  );
}





  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
    setPrevScrollpos(currentScrollPos);
    setVisible(visible);
 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollpos, visible, handleScroll]);




  useEffect(() => {
    if (currentUser) {
      setHaveAccount(true);
     
    } else {
      setHaveAccount(false);
    }
  }, [currentUser]);

  return (
    <>
     {items.map((item, index) => {
          return (
            <>
            <motion.div
            
            className="generator-holder"
            style={{
              width: "100%",
              height: "100vh",
              position: "fixed",
              background: "rgba(255,255,255,0)",
              zIndex: "300",
              top: "0",
              left: "0",
            }}
            initial={{ scale: 0 }}
            animate={{ scale:!item.opener ? 0: 1}}
            transition={ {
                type: "spring",
                stiffness: 700,
                damping: 30,
              }} 
          >
            <div className="generator-deactive" 
            onClick={item.close}
            style={{
              width: "100%",
              height: "100vh",
              position: "absolute",
              zIndex: "0",
              top: "0",
              left: "0",
            }} ></div>
            <MdClose style={{color:"white", fontSize:"1.3rem", fontWeight:"500", position:"absolute", zIndex:"200",top:"50px", right:"100px", cursor:"pointer" }} onClick={item.close}/>
            {/* Generator Card */}
            <GeneratorCard generatorName={item.titleCard} ApiHttp={item.ApiHttp}/>
            
            </motion.div> 
          </>
          );
        })}
    <div className={`Navbar-section ${visible ? "" : "hidden"}`}>
      <div className="navbar-logo">
        <Link to="/home">
          <img src={logo} alt="Artly" />
        </Link>
        <Link to="/home">
          <h2 className="Artly">ARTLY</h2>
        </Link>
      </div>
      <div className="navbar-navlinks">
      <a href="#Footer">
        <div className="navbar-about">About</div>
      </a>
      <Link to="/community">
        <div className="navbar-about">Community Posts</div>
      </Link>
        <div className="navbar-style" onClick={()=> {setDropdown(!dropdown)}}>Generation Style {!dropdown? <MdArrowDownward/> : <MdArrowUpward/>}</div>
        <div className={!dropdown? "dropdown": "dropdown active"}>
        <Dropdown />
        </div>
        
      </div>
      <div className="navbar-account">
        {console.log(data)}{console.log(" :data")}
        {data && data.userPost != 0 && haveAccount && ( data ?
          <>
            <h4>{data.userPost[0].name}</h4>
            <div className="user-profile-pic" onClick={()=> {setPofDrop(!profDrop) }}>
            
            {data.userPost[0].profile_pic == null ? (
              <h1>{data.userPost[0].name[0]}</h1>
            ) : (
                <div
                  className="profile-img"
                  style={{
                    backgroundImage: `url(../../uploads/${data.userPost[0].profile_pic})`,
                  }}></div>
       
            )}
          </div> 
        </>: ""
 
        )}
        {!haveAccount && <> <Link to="/account" ><input type="button" name="create-account" value="Create Account" /></Link>
          <Link  to="/account"><input type="button" name="login" value="Login" /></Link> </>}
       
      </div>
     
      { haveAccount &&<div className={`profile-dropdown${!profDrop? "" : " drop"}`}> <ProfileDropdown/></div>}
   </div></>
  );
}


export default Navbar;


