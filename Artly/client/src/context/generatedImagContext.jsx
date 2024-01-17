
// import axios from "axios";
// import { createContext, useContext, useState } from "react";
// import { GenInfoContext } from "../components/ImageGeneratorCard/GeneratorCard";

// export const ImageGenContext = createContext({});

// const API_TOKEN = "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";

// const ImageGeneratorProvider = ({ children }) => {
//   const { prompt, num_gen } = useContext(GenInfoContext);
//   const [loading, setLoading] = useState(false);
//   const [innerLoading, setInnerLoading] = useState(false);
//   const [output, setOutput] = useState([1]);
//   const [error, setError] = useState(false);
//   const [downloadName, setDownloadN] = useState("");
//   const [seedGen, setSeedGen] = useState();

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setInnerLoading(true);
//     setError(false);

//     if (!prompt) {
//       setLoading(false);
//       setInnerLoading(false);
//       setError(true);
//       return;
//     }

//     const requests = [];

//     for (let i = 1; i <= num_gen; i++) {
//       setSeedGen(Math.floor(Math.random() * 100000));
//       console.log(prompt + " seed: " + seedGen);
//       requests.push(
//         axios.post(
//           // "https://api-inference.huggingface.co/models/darkstorm2150/Protogen_x5.8_Official_Release",
//           "https://api-inference.huggingface.co/models/andite/anything-v4.0",
//           // "https://api-inference.huggingface.co/models/prompthero/openjourney",
//           //   "https://api-inference.huggingface.co/models/dallinmackay/Van-Gogh-diffusion",
//           // "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
//           {
//             method: "post",
//             inputs: prompt + " seed: " + seedGen + "",
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${API_TOKEN}`,
//             },
//             responseType: "blob",
//           }
//         )
//       );
//     }

//     try {
//       const responses = await Promise.all(requests);
//       const urls = responses.map((response) => URL.createObjectURL(response.data));
//       console.log(requests);
//       setDownloadN(prompt + " seed: " + seedGen + ".png");
//       setOutput(urls);
//       setLoading(false);
//       setInnerLoading(false);
//       setError(false);
//     } catch (error) {
//       console.log(error);
//       setDownloadN("");
//       setOutput([]);
//       setError(true);
//       setLoading(false);
//       setInnerLoading(false);
//     }
//   };



//   return (
//     <ImageGenContext.Provider value={{ error, output , loading, innerLoading, downloadName, seedGen }}>
//     {children}
//   </ImageGenContext.Provider>
//   )
// };


// export default ImageGeneratorProvider;


