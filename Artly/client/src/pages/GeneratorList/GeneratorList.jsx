import { useState } from "react";
import "./GeneratorList.scss";
import { motion } from "framer-motion";
import GeneratorCard from "../../components/ImageGeneratorCard/GeneratorCard";
import { MdClose } from "react-icons/md";
import openjourney from "../../assets/images/openjourney.png"
import anything from "../../assets/images/anything2.png"
import dalle from "../../assets/images/dalle.png"
import midjourney from "../../assets/images/midjourney.png"

const PromptCard = ({ prompt, titleCard, info, flexDirection, background, generatorbkg, id, ApiHttp}) => {
  const [showcard, setShowcard] = useState(false);

  return (
    <div className="prompt-cards" id={id} style={{ flexDirection: `${flexDirection}` }}>
      <motion.div
        className="generator-holder"
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          background: "rgba(255,255,255,0)",
          zIndex: "200",
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
        <GeneratorCard generatorName={titleCard} ApiHttp={ApiHttp}/>
        
        </motion.div>

      <div className="prompt">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Prompt:
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {prompt}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="card"
      >
        <img alt="AI Image" src={background} />
        <div className="info-card">
          <div className="title-card">{titleCard}</div>
          <div className="information">{info}</div>
          <div className="generateButton">
            <button name="generate" onClick={() => setShowcard(true)}>
              Generate Image
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function GeneratorList() {
  return (
    <div className="GeneratorList" id="GeneratorList">
      <div className="ListHeader">
        Generate Image through different styles and Using different Good Image
        generator API
      </div>
      <PromptCard
        prompt="“portrait of a gorgeous blond female in the style of stefan kostic, realistic, half body shot, sharp focus, 8 k high definition, insanely detailed, intricate, elegant, art by stanley lau and artgerm, extreme blur flames background”"
        titleCard="Openjourney"
        info="Open source Stable Diffusion fine tuned model on Midjourney."
        flexDirection="row"
        background={openjourney}
        generatorbkg={openjourney}
        id="Openjourney"
        ApiHttp = "https://api-inference.huggingface.co/models/prompthero/openjourney"
        
      />

      <PromptCard
        prompt="“masterpiece,best qualityjust 1girl,look at the front horizontally, happy, the whole body,Skin whitening,blue eyes,thin,Thigh length,slender waist, long hair,pink hair,white clother, outdoors,white hanfu,chi”"
        titleCard="Anything v4"
        info="Text to Image generator with a beautiful Anime style art"
        flexDirection="row-reverse"
        background={anything}
        generatorbkg={anything}
        id="Anything"
        ApiHttp ="https://api-inference.huggingface.co/models/andite/anything-v4.0"
        
      />

      <PromptCard
        prompt="“portrait of a gorgeous blond female in the style of stefan kostic, realistic, half body shot, sharp focus, 8 k high definition, insanely detailed, intricate, elegant, art by stanley lau and artgerm, extreme blur flames background”"
        titleCard="Dall-e"
        info="An API from Dall-e text to image generator."
        flexDirection="row"
        background={dalle}
        generatorbkg={dalle}
        id="Dalle"
        ApiHttp = "https://api-inference.huggingface.co/models/prompthero/openjourney-v4"
        
      />

      <PromptCard
        prompt="“portrait of a gorgeous blond female in the style of stefan kostic, realistic, half body shot, sharp focus, 8 k high definition, insanely detailed, intricate, elegant, art by stanley lau and artgerm, extreme blur flames background”"
        titleCard="Midjourney"
        info="open source Stable Diffusion fine tuned model on Midjourney."
        flexDirection="row-reverse"
        background={midjourney}
        generatorbkg={midjourney}
        id="Midjourney"
        ApiHttp = "https://api-inference.huggingface.co/models/dallinmackay/Van-Gogh-diffusion"


      />
    </div>
  );
}

export default GeneratorList;
