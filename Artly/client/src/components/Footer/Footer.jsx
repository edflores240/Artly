import React from 'react'
import "./Footer.scss"
import logo from "../../assets/images/ArtlyLogo.png"
import footerBorder from "../../assets/images/footerBorder.png"
function Footer() {
  return (
    <div className="Footer" id="Footer">
        <div className="footer-border">
            <img src={footerBorder} alt=" " />
        </div>
        <div className="footer-container">
            <div className="footer-left">
                    <div className="projectIn">
                        <h1>App development Project</h1>
                    </div>
                    <div className="instuctor">
                        <h4>Instructor</h4>
                        <p>Edgar Jr Flores</p>
                    </div>
               
            </div>
            <div className="footer-center">
                <img src={logo} alt="Artly" />
             
            </div>
            <div className="footer-right">
                <div className="project-developer">
                    <h1>Developers</h1>
                    <div className="Front-End">
                        <h4>Front-End</h4>
                        <p>Edgar JR Flores</p>
                    </div>
                    <div className="back-end">
                        <h4>Back-End</h4>
                        <p>Princess Fegi</p>
                        <p>Jho Anna Marie Castro</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer

