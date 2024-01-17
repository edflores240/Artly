
import { useState } from "react";
import "./upload.scss"
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const UploadImage = ({image, setOpenModal, name})=> {

const queryClient = useQueryClient()

const [profImage, setProfImage] = useState(image)
const [profName, setProfName] = useState(name)
const [theresImage, setTheresImage] = useState(false)




const mutation = useMutation(
 (values) => {
  console.log(values)
   makeRequest.put("/users", values);
   alert("success post")

},
{
  onSuccess: () => {
  // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] })

  }
    
  },
)


const uploadImage = async (file) => {
  try {
    const imageData = new FormData()
    imageData.append("file", file);
    const res = await makeRequest.post("/uploadImage", imageData)
    return res.data.filename // assuming the server returns the URL of the uploaded image in the response data
  } catch (error) {
    console.log(error)
    return null
  }
} 


const handleUpload = async (e) => {
  e.preventDefault();
  const profilePicUrl = profImage ?  await uploadImage(profImage) : image;
  // console.log(profilePicUrl)
  mutation.mutate({name: profName, profile_pic: profilePicUrl});
}


const test = (e) => {
  setTheresImage(true)
  setProfImage(e.target.files[0])
  
}

// console.log(profImage)
 
  return (
    <div className="upload-modal" >

      <div className="modal-container" >
        
        
        <input type="file" name="file" 
        accept="image/*"
        style={{
  
          backgroundImage: theresImage === false ? `url(../../uploads/${profImage})`:`url(${ URL.createObjectURL(profImage)})`,
          backgroundSize:"cover",
          }}    
          
          onChange={e=>test(e)}
          />
        <input type="text" name="Name" id="Name" value={profName}  onChange={e=>setProfName(e.target.value)} placeholder="Name"/>
        <input type="submit" value="Update" onClick={(e)=>handleUpload(e)}/>
      </div>
      </div>
  )


}

export default UploadImage;