import express from "express";
import userRoutes from "./routes/user.js"
import postRoutes from "./routes/post.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser";

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix +".jpg")
    }
  })
 
  const upload = multer({ storage: storage })


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(cookieParser())

app.use("/server/uploadImage/", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file);
})

app.use("/server/auth/", authRoutes)
app.use("/server/users/", userRoutes)
app.use("/server/posts/", postRoutes)




app.listen(8800, () => {
    console.log("gwapo ko")

})

