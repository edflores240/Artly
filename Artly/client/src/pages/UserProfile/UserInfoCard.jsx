import "./UserProfile.scss"
import React from 'react'

function UserInfoCard(userId) {

      
        const {isLoading, error, data} = useQuery(["userInfo"], ()=> 
       makeRequest.get(`users/ProfileUser/${userId}?search=${search}&offset=${offset}`)
        .then((res)=> {
          if (error) {console.log(error)}
          setLoading(false)
          return(res.data)
        },
        {staleTime: 3000}
        )
      );  

  return (
    <div className="profile-info">
    <div className="cover-photo" >
    {data.userPost[0].profile_pic ===  null ?
       
        <div className="cover-no-image" >
          <h1>{data.userPost[0].name}</h1>
        </div>
        :<>
         <img src={`../../../uploads/${data.userPost[0].profile_pic}`}
        alt="UserName" />   
        <div className="shadow-div"></div>
        </> 
       }
      </div>
        
    <div className="profile-info-photo">
      {data.userPost[0].profile_pic ===  null ?
        <div className="image" >
          <h1>{data.userPost[0].name[0]}</h1>
        </div>:
      <div className="image">
            <Image
              width={200}
              src={`../../../uploads/${data.userPost[0].profile_pic}`}
            />
          
        </div>}
       
       
        <div className="update-modal"  style={{
              
              position:"fixed",
              top:"0",
              left:"0",
              width:"100%",
              height:"100%",
              zIndex:"200",
             transition:".2s ease",
              scale : openModal ? "1": "0",
              // pointerEvents :openModal ? "all": "none",
              // opacity:openModal ? "1": "0",
            }}>
              <UploadImage image={data.userPost[0].profile_pic} openModal={setOpenModal} name={data.userPost[0].name} />
              <div className="close"
              style={{
                position:"fixed",
                width:"100%",
                height:"100%",
                zIndex:"200",
               background:"transparent"
        
              }}
              onClick={()=> {setOpenModal(false)}}
              ></div>
            </div>
         
            { userId === `${currentUser.id}` ? <Tooltip title="Edit Profile"><FiEdit onClick={() => setOpenModal(true)} className="update-button"/></Tooltip> : ""}
      
        <div className="info">
            <p className="profile-name">{data.userPost[0].name}</p>
            <p className="profile-username">@{data.userPost[0].username}</p>
        </div>  
        <div className="filter-search" >
        <FiSearch className="search-icon" onClick={() =>setOpensearch(false)}/>
        <input type="text" name="search" id="user-name" placeholder="Search" onChange={(e)=> setSearch(e.target.value)} />
    </div>
    </div>
</div>
  )
}

export default UserInfoCard