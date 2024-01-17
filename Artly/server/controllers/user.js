import db from "../connectdb.js";
import jwt from 'jsonwebtoken';

export const getCurrentUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Logged In!"); 

    jwt.verify(token, 'secretkey', (err, userInfo) =>{
        if (err) return res.status(403).json("token is not valid");
    })    

    const userId = req.params.userId;
    const q = "SELECT * FROM artly_users WHERE artly_users.id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        if (err) {console.log(err)}

        const {password, ...info} = data;
  
        // console.log({data})
        return res.json({"userPost": info});
    })
}


export const getProfileUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Logged In!"); 

    jwt.verify(token, 'secretkey', (err, userInfo) =>{
        if (err) return res.status(403).json("token is not valid");
    })    

    const userId = req.params.userId;
    const q = "SELECT * FROM artly_users WHERE artly_users.id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        if (err) {console.log(err)}

        const {password, ...info} = data;
        console.log(info)
        // console.log({data})
        return res.json({"userPost": info});
    })
}




// export const getAllUserPost = (req, res) => {
//     const token = req.cookies.accessToken;

//     if (!token) return res.status(401).json("Not Logged In!");

//     jwt.verify(token, 'secretkey', (err, userInfo) =>{
//         if (err) return res.status(403).json("token is not valid");
//     })    

//     const userId = req.params.userId;
    

//     const q = "SELECT artly_users.name, artly_users.id, artly_users.username, artly_users.email, artly_users.profile_pic,  artly_posts.* FROM artly_users INNER JOIN artly_posts ON artly_users.id = artly_posts.postid AND artly_users.id = artly_posts.userid WHERE artly_users.id = ? ORDER BY artly_posts.created_at DESC";

//     db.query(q, [userId], (err, data) => {
//         if (err) return res.status(500).json(err)

//         const {password, ...info} = data;
//         // console.log({data})

//        return res.json({"userPost": data});
//       });
// }




export const getUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, 'secretkey', (err, userInfo) =>{
        if (err) return res.status(403).json("token is not valid");
    })    

    const userId = req.params.userId;
    const search = req.query.search;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    console.log(parseInt(req.query.offset))


    
    if (!search || search.trim() === "") {  
    const q = "SELECT artly_users.name, artly_users.id, artly_users.username, artly_users.email, artly_users.profile_pic,  artly_posts.* FROM artly_users INNER JOIN artly_posts ON artly_users.id = artly_posts.postid AND artly_users.id = artly_posts.userid WHERE artly_users.id = ? ORDER BY artly_posts.created_at DESC LIMIT 9 OFFSET ?";
    
    db.query(q, [userId, offset], (err, data) => {
        if (err) return res.status(500).json(err)

        const {password, ...info} = data;
        // console.log({data})
        const noMore = data.length === 0 
        if (data.length != 0) {
            console.log("naay sulod")
        }
        const hasMore = data.length === 9;
       return res.json({"userPost": data, hasMore,offset: offset + 9});
      });
        
    } else {
        const q = "SELECT artly_users.name, artly_users.id, artly_users.username, artly_users.email, artly_users.profile_pic,  artly_posts.* FROM artly_users INNER JOIN artly_posts ON artly_users.id = artly_posts.postid AND artly_users.id = artly_posts.userid WHERE artly_users.id = ? AND artly_posts.prompt LIKE CONCAT('%', ?,'%') ORDER BY artly_posts.created_at DESC LIMIT 9 OFFSET ?";



        db.query(q, [userId, search, offset], (err, data) => {
            if (err) return res.status(500).json(err)
            if (err) {console.log(err)}
    
                
            const {password, ...info} = data;
            // console.log({data})
            const noMore = data.length === 0 
            console.log(noMore)
            const hasMore = data.length === 9;
         
        return res.json({"userPost": data, hasMore,offset: offset + 9});
        })
   
    }

}







export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Login");

    jwt.verify(token, "secretkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token is not Valid");

        const q = "UPDATE artly_users SET `name` = ? , `profile_pic` = ?  WHERE id=?";
        
        db.query(q, 
            [
            req.body.name,
            req.body.profile_pic,
            userInfo.id,
            ]
            ,(err, data) => {
                if (err) res.status(500).json(err)
                if (data.affectedRows > 0)  return res.json("Updated Succesfully") 
            
                return res.status(403).json("You can only Upload your Post")
            } ) 

        
    })
}