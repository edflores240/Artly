import db from "../connectdb.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';


export const register = (req, res) => {

    const q = "SELECT * FROM artly_users WHERE username = ? OR email = ?"

    db.query(q, [req.body.username, req.body.email], (err, data) => {
      // console.log(data[0].username === req.body.username ? "Parehas": "dili parehas")
      console.log(data)
        if (err) return res.status(500).json(err)
        if (data.length && (data[0].username === req.body.username)) {
          console.log("Same Username")
            return res.status(409).json("User Already Exists!");
          }
          if (data.length && (data[0].email === req.body.email)) {
            console.log("same Email")
            return res.status(409).json("User Already Exists!");
          }
          

        const salt =  bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(req.body.password, salt)
        const q = "INSERT INTO artly_users ( `username`, `email`,`password` , `name`) VALUE (?)"

        const values = [
            req.body.username,
            req.body.email,
            passwordHashed,
            req.body.name
          ];
          

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            
            return res.status(200).json("User has been Created.");
        })

        // const loginQ = "SELECT * FROM artly_users WHERE (artly_users.email = ?)";
  
        // db.query(loginQ, [req.body.email], (err, data) => {
        //   if (err) return res.status(500).json(err);

        //   const { password, ...others } = data[0];
        //   console.log("na abot dar")

        //   const token = jwt.sign({ id: data[0].id }, "secretkey");
  
        //   res.cookie("accessToken", token, {
        //     httpOnly: true,
        //   }).status(200).json(others);
        // });
    })

   
}


export const login = (req, res) => {
    const q = "SELECT * FROM artly_users WHERE (artly_users.username = ? OR artly_users.email = ?)";
  
    db.query(q, [req.body.username, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not Found");
  
      const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
      if (!checkPassword)
        return res.status(400).json("Wrong Password or Username");
      if (!req.body.password) return res.status(400).json("Password is required");
  
      const token = jwt.sign({ id: data[0].id }, "secretkey");
  
      const { password, ...others } = data[0];
      console.log("na abot dar")
  
      res.cookie("accessToken", token, {
        httpOnly: true,
      }).status(200).json(others);
    });
  };
  

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
    secure: true,
    sameSite: "none"
    }).status(200).json("Logged out Successfully")

}