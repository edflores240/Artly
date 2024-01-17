import { createContext, useContext, useEffect, useState } from "react";
import "./GeneratorCard.scss";
import sampleImge from "../../assets/images/midjourney.png";
import { Image, Select, Tooltip } from "antd";
import {
  MdScreenShare,
  MdOutlineFileDownload,
  MdOutlineFileDownloadDone,
  MdOutlineError,
} from "react-icons/md";

import {Skeleton, Space} from 'antd';
import { Link } from "react-router-dom";
import { motionValue } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import  { createCanvas, loadImage} from "canvas"
import { message, Button } from 'antd';



// RENDER IMAGE

// For Rendering the image to the main components pero gi map sya based sa data
const RenderImage = ({  loading, title, height, width, grid_style, data, seedGen, number_gen, ApiHttp, prompt }) => {
  const navigate = useNavigate()
  const [render, setRender] = useState(false)
  const [file, setFile] = useState(null)
  const [values, setValues] = useState()
  const [posted, setPosted] = useState(false);
  const [postErr, setPostErr] = useState(true)
  const [postMsg, setPostMsg] = useState("")

  // Create a client
const queryClient = new QueryClient()


const mutation = useMutation(
 async (values) => {
    try {
      await makeRequest.post("posts/addpost", values);
      setPostMsg("")
      setPosted(true)
      setPostErr(false)
    
    } catch (error) {
      setPostMsg(error.response.data)
      setPosted(true)
      setPostErr(true)
   
      console.log(error.response.data)
    }
    
},
{
  onSuccess: () => {
  // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })

  }
    
  },
)





// Loading Loading Part 

const [messageApi, contextHolder] = message.useMessage();
const [loadings, setLoadings] = useState([]);

const enterLoading = (index) => {
  setLoadings((prevLoadings) => {
    const newLoadings = [...prevLoadings];
    newLoadings[index] = true;
    return newLoadings;
  });
  
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

// submitting the Data 


const handleShare = (gen) => {

  setPostMsg(1000)
  enterLoading(2)
  setPosted(false)
  console.log("Posted: " + postErr)

  //Blob Converter to base 64 image url 
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  const Image = window.Image;

  const blobUrl = gen;
  fetch(blobUrl)
    .then(res => res.blob())
    .then(blob => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const image = canvas.toDataURL();
        mutation.mutate({ image, prompt, generator: title });
      };
      img.src = blobUrl;

    });

    messageApi
    .open({
      type: 'loading',
      content: 'Sharing To the Community.',
      duration: 20
    })
    .then(() => postErr == false ? message.success('Shared Successfully', 5.5) : message.error(`${postMsg}`, 5.5)) ;
  
}

  //   let imgUrl = "";
  //   if (gen) imgUrl = await uploadImage(gen);
  // mutation.mutate({imgUrl, prompt})
 

// const handleShare = async (gen) => {
//   try {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const Image = window.Image;
//     const img = new Image();
//     img.crossOrigin = 'anonymous';
//     img.onload = async () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//       const imageData = canvas.toDataURL('image/png');
//       const response = await fetch(imageData);
//       const blob = await response.blob();
//       const file = new File([blob], "image.png", { type: "image/png" });
//       const imgUrl = await uploadImage(file);
//       console.log(imgUrl)
//       // mutation.mutate({ imgUrl, prompt });
//     };
//     img.src = gen;
//   } catch (error) {
//     console.log(error)
//   }
// }






  useEffect(() => {
    if (data?.length > 0) {
      setRender(true);
       
    }


  }, [data])
  
  if (data?.length > 0) {

    
    return (
      <>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
          <div className="card-holders"  style={grid_style}>
          {contextHolder}
            {data.map((gen) => (
              <div className="image-card" key={Math.floor(Math.random()* 100000) }>
             
                {render && 
                <>
                 <Image
                    height={height}
                    width={width}
                      src={gen}
                      alt={`Seed: ${seedGen}`}
                      style={{objectFit:"cover"}}
                    />
                  <div className="icon-container">
                   
                    {/* */}
                    <Tooltip title="Share to the Community">
                    <Button
                      className="share"
                      style={{
                        background:"transparent",
                        width:"auto",
                        height:"max-content",
                        fontSize:"2rem",
                        lineHeight:"10px",
                        padding:"0px"
                      }}
                      type="primary"
                      icon={<MdScreenShare/> }
                      loading={loadings[2]}
                      onClick={()=> handleShare(gen)}
                    /></Tooltip>




                  <Tooltip title="Download">
                    <a href={gen} download={`${Date.now()}.jpg`}>
                      <MdOutlineFileDownload
                        className="download"
                        url={gen}
                        download="jay.png"
                      />
                    </a>
                  </Tooltip>
                  </div></>
              }
                
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      </>
    );
  }else {
    const Cards = () => {
      const skeletons = Array.from({ length: number_gen }, (_, i) => (
        <div className="image-card" key={Math.floor(Math.random()* 100000) }>
          <Skeleton.Image active={loading} style={{ width: "300px", height: "250px" }} />
        </div>
      ));
      return skeletons;
    };
    return (
      <div className="card-holders" style={grid_style}>
        <Cards />
      </div>
    );
  }
  
};

// RENDER IMAGE END

function GeneratorCard({ generatorName,  ApiHttp }) {
  const [height, setHeight] = useState(400)
  const [width, setWidth] = useState(400)
  const [grid_style, setGridstyle] = useState({gridTemplateColumns:"100%"})
  const [number_gen, setNumberGen] = useState(1)
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(false);
  const [downloadName, setDownloadN] = useState("");
  const [seedGen, setSeedGen] = useState();


 

const handleTextChange = (e) => {
  setPrompt(e.target.value)

}

const handleFormSubmit = async (event) => {
  
  alert(prompt)
  event.preventDefault();
  setLoading(true);
  setInnerLoading(true);
  setError(false);
  setOutput([])
 

  // if (!prompt) {
  //   setLoading(false);
  //   setInnerLoading(false);
  //   setError(true); console.log(`${ApiHttp}`)
  //   return;
  // }

  const requests= []
  const apiKey = ["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", "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", "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", "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" ];
  const API_TOKEN = apiKey[Math.floor(Math.random() * apiKey.length)]
  for (let i = 1; i <= number_gen; i++) {
    setSeedGen(Math.floor(Math.random() * 100));
    console.log(prompt + " seed:" + seedGen);
    requests.push(
      axios.post(
        ApiHttp,
        // "https://api-inference.huggingface.co/models/darkstorm2150/Protogen_x5.8_Official_Release",
        // "https://api-inference.huggingface.co/models/andite/anything-v4.0",
        // "https://api-inference.huggingface.co/models/prompthero/openjourney",
        //   "https://api-inference.huggingface.co/models/dallinmackay/Van-Gogh-diffusion",
        // "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          method: "post",
          inputs: prompt + " seed: " + seedGen + "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          responseType: "blob",
        }
      )
    );
  }

  try {
    const responses = await Promise.all(requests);
    const urls = responses.map((response) => URL.createObjectURL(response.data));
    console.log(requests);
    setDownloadN(prompt + " seed: " + seedGen + ".png");
    setOutput(urls);
    setLoading(true);
    setInnerLoading(false);
    setError(false);
  } catch (error) {
    console.log(error);
    setDownloadN("");
    setOutput([]);
    setError(true);
    setLoading(false);
    setInnerLoading(false);

  }
};

  

  
  const handleChange = (value) => {
    
    const input = value

    if (input === 1){
      console.log("parehas")
      setHeight(400)
      setWidth(400)
      setGridstyle({
        gridTemplateColumns: "1fr"})
      setNumberGen(1)
    }else if (input== 2){
      setHeight(250)
      setWidth(300)
      setGridstyle({
        gridTemplateColumns:"50% 50%", gridTemplateRows:"50% 50%"})
      setNumberGen(2)
      console.log(grid_style)
    }else if (input== 3){
      setHeight(250)
      setWidth(300)
      setGridstyle({
        gridTemplateColumns:"50% 50%", gridTemplateRows:"50% 50%"})
      setNumberGen(3)
      console.log(grid_style)
    }else {
      setHeight(250)
      setWidth(300)
      setGridstyle({
        gridTemplateColumns:"50% 50%", gridTemplateRows:"50% 50%"})
      setNumberGen(4)
      console.log(grid_style)
    }



}
  return (

    <div className="ImageGenerator" id="ImageGenerator">
      <div className="generator-container">
        <img  alt={generatorName} className="generatorbkg"/>
        <div className="generator-name">{generatorName}</div>
        <div className="image-prompt-container">
          <div className="generator-prompt">
            <div className="user-prompt">
              <form onSubmit={handleFormSubmit}>
              <textarea type="text" name="prompt" id="user-prompt" onChange={handleTextChange}></textarea>
              <div className="more-input">
                <p>Number Of Generate Image</p>
                <Select
                  defaultValue={1}
                  style={{width: "40%",}}
                  onChange={handleChange}
                  options={[
                    {
                      label: "Number of Image",
                      options: [
                        {
                          label: "1",
                          value: 1,
                        },
                        {
                          label: "2",
                          value: 2,
                        },
                        {
                          label: "3",
                          value: 3,
                        },
                        {
                          label: "4",
                          value: 4,
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <button type="submit" >Generate</button>
              </form>
            </div>
            {/* <div className="generator-style">
                <GenButton name="Openjourney" image={openjourney} />
                <GenButton name="Anything" image={anything} />
                <GenButton name="Dall-e" image={dalle} />
                <GenButton name="Midjourney" image={midjourney} />
            </div> */}
          </div>
          <div className="generated-images">
          
          {!error ? <RenderImage
            title={generatorName}
            height={height}
            width={width}
            grid_style={grid_style}
            data={output} // add this line
            seedGen={seedGen}
            number_gen={number_gen}
            loading = {loading}
            ApiHttp= {ApiHttp}
            prompt={prompt}
            
          />: 
          <div className="error-container" style={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",

          }}>
            <MdOutlineError className="err-icon" style={{fontSize:"5rem"}}/>
            <h3 style={{width:"400px", textAlign:"center"}}>There's Something Wrong In Generating the Image. 
                Please Try Again!
            </h3>


          </div>
          
          
          }

          </div>
        </div>
      </div>
    </div>
  );
  
}
export default GeneratorCard;
