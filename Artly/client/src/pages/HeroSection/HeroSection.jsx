
import "./HeroSection.scss"
import GeneratorList from "../GeneratorList/GeneratorList";
import UserPost from "../UserPost/UserPost";
import Posts from "../Post/Posts";

import React from 'react'

const HeroS = ()=> {
  return (
    <div className="Hero-Section">
    <div className="Hero-section-container">
        <div className="web-name">
            <h1>ARTLY</h1>
            <p>Words Come to Life</p>
        </div>
        <div className="web-generation">
            <p>Convert words to images in seconds with ARTLY’s free AI image generator. Input the text prompts and transfer your imagination into arts now.</p>
            <a href="#GeneratorList"><button name="toGenerate" >Generate Image</button></a>
        </div>
    </div>
</div>
  )
}

function HeroSection() {
  return (
    <>
      <HeroS/>
      <GeneratorList/>
      <Posts/>
    </>
  )
}

export default HeroSection