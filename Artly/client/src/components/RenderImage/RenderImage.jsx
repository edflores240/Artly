import { Image, Select } from "antd";
import {
  MdScreenShare,
  MdOutlineFileDownload,
  MdOutlineFileDownloadDone,
} from "react-icons/md";
import { Carousel } from "antd";
import openjourney from "../../assets/images/openjourney.png";
import anything from "../../assets/images/anything2.png";
import dalle from "../../assets/images/dalle.png";
import midjourney from "../../assets/images/midjourney.png";
import GeneratorList from "../../pages/GeneratorList/GeneratorList";
import {Skeleton, Space} from 'antd';
import { Link } from "react-router-dom";
import { ImageGenContext } from "../../context/generatedImagContext";
import { motionValue } from "framer-motion";



const RenderImage = ({  title, height, width, grid_style,  }) => {
  
  const [render, setRender] = useState(false)
  const { prompt, num_gen } = useContext(GenInfoContext);
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [output, setOutput] = useState([1]);
  const [error, setError] = useState(false);
  const [downloadName, setDownloadN] = useState("");
  const [seedGen, setSeedGen] = useState();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setInnerLoading(true);
    setError(false);

    if (!prompt) {
      setLoading(false);
      setInnerLoading(false);
      setError(true);
      return;
    }

    const requests = [];

    for (let i = 1; i <= num_gen; i++) {
      setSeedGen(Math.floor(Math.random() * 100000));
      console.log(prompt + " seed: " + seedGen);
      requests.push(
        axios.post(
          // "https://api-inference.huggingface.co/models/darkstorm2150/Protogen_x5.8_Official_Release",
          "https://api-inference.huggingface.co/models/andite/anything-v4.0",
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
      setLoading(false);
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







  
  if (output?.length > 0) {
    return (
      <>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
          <div className="card-holders"  style={grid_style}>
            {output.map((gen) => (
              <div className="image-card" key={seedGen}>
                {render?<>
                 <Image
                    height={height}
                    width={width}
                      src={gen}
                      alt={`Seed: ${seedGen}`}
                      style={{objectFit:"cover"}}
                    />
                  <div className="icon-container">
                    <Link to="/Community"><MdScreenShare className="share" /></Link> 
                    <a href={gen} download={`${downloadName}.jpg`}>
                      <MdOutlineFileDownload
                        className="download"
                        url={gen}
                        download="jay.png"
                      />
                    </a>
                  </div></>: 
                  
               
                   <Skeleton.Image active={false}style={{width:"300px", height:"250px"}} />
              }
                
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      </>
    );
  } else {
    return <h1>{title}</h1>;
  }
};