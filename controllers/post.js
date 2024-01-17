import db from "../connectdb.js"
import moment from "moment/moment.js"
import jwt from "jsonwebtoken"


export const getCommunityPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not Logged In!");
  }

  const search = req.query.search;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  let q, params;
  if (!search || search.trim() === "") {  
    console.log("!!!Search: "+offset)
    q = `
      SELECT p.*, u.name, u.profile_pic 
      FROM artly_posts AS p 
      JOIN artly_users AS u ON u.id = p.userid 
      ORDER BY p.created_at DESC 
      LIMIT 9 OFFSET ?
    `;
    params = [offset];
  } else {
    console.log("Search: " +search +offset)

    q = `
      SELECT p.*, u.name, u.profile_pic 
      FROM artly_posts AS p 
      JOIN artly_users AS u ON u.id = p.userid 
      WHERE LOWER(p.prompt) LIKE CONCAT('%', LOWER(?), '%') 
      OR LOWER(p.generator) LIKE CONCAT('%', LOWER(?), '%') 
      OR LOWER(u.name) LIKE CONCAT('%', LOWER(?), '%')
      ORDER BY p.created_at DESC 
      LIMIT 9 OFFSET ?
    `;
    params = [search, search, search, offset];
  }

  db.query(q, params, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    const noMore = data.length === 0 
    console.log(noMore)
    const hasMore = data.length === 9;
    const noResult = data.length === 0;
    return res.status(200).json({ data, hasMore, noResult, offset: offset + 9 });
  });
};


  


// export const getCommunityPost = (req,res) => {

//     const token = req.cookies.accessToken;

//     if (!token) return res.status(401).json("Not Logged In!");

//     const search = req.query.search;
//     console.log(search);
//     if (!search || search.trim() === "") {
//        const q = `SELECT p.*, u.name, profile_pic FROM artly_posts AS p JOIN artly_users AS u ON (u.id = p.userid) ORDER BY p.created_at DESC LIMIT 9`
    
//         db.query(q, (err,data) => {
//             if (err) return res.status(500).json(err)
    
//             return res.status(200).json(data)
//         })
//     } else {
//         const q = `SELECT p.*, u.name, profile_pic FROM artly_posts AS p JOIN artly_users AS u ON (u.id = p.userid) WHERE prompt LIKE CONCAT('%', ?, '%') AND p.id < ? ORDER BY p.created_at DESC LIMIT 9`;
//         db.query(q, [search, cursor], (err, data) => {
//           if (err) return res.status(500).json(err);
//           return res.status(200).json(data);
//         });
        
//     }
    

   
// }

    
  
export const getUserPost = (req,res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, 'secretkey', (err, userInfo) =>{
        if (err) return res.status(403).json("token is not valid");
    })    

    const q = `SELECT p.*, u.name, profile_pic FROM artly_posts AS p JOIN artly_users AS u ON (u.id = p.userid) WHERE u.id = ? ORDER BY p.created_at DESC`
    
    db.query(q, [req.body.id], (err,data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })

}


export const getPost = (req, res) => {
    
    const q =  `SELECT p.*, u.name, profile_pic FROM artly_posts AS p JOIN artly_users AS u ON (u.id = p.userid) ORDER BY p.created_at DESC LIMIT 5`
    
    // const value = [
    //     req.body.renderSize
    // ]
    db.query(q, (err, data)=> {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data)
    })

}



export const addPost = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, 'secretkey', (err, userInfo) =>{
        if (err) return res.status(403).json("token is not valid");

        const q = "INSERT into artly_posts (`prompt`, `image`, `created_at`, `userid`, `postid`, `generator`) VALUES (?)";

        const values =[
            req.body.prompt,
            req.body.image,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            userInfo.id,
            req.body.generator
        ]

        db.query(q, [values], (err, data)=> {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Post Created"),
            console.log("Post Successfully")
        })
    } )
}
    