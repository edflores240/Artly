import {FiClipboard, FiCheck} from "react-icons/fi";
import {useState} from 'react';

const CopyClip = ({prompt}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(prompt)
      .then(() => setIsCopied(true))
      .catch((error) => console.error('Error copying text:', error));
  };

    return (
      <>{!isCopied? 
      <FiClipboard onClick={handleCopyClick} className="clipboard"/> 
      : <FiCheck onClick={()=> setIsCopied(false)} className="clipboard"/> }
      </>
    );


}

export default CopyClip;




