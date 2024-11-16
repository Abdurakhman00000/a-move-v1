import React from 'react'
import scss from "./Footer.module.scss"
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className={scss.Footer}>
        <div className="container">
            <div className={scss.content}>
                <div className={scss.block1}>
                  <h3>Terms Of Use</h3>
                  <h3>Privacy-Policy</h3>
                  <h3>About</h3>
                  <h3>Blog</h3>
                  <h3>FAQ</h3>
                </div>
                <div className={scss.block2}>
                  <p>EcoMovie - a unique website providing fascinating information about movies and TV shows. Here you can discover all the <br /> necessary details about your favorite films, actors, directors, ratings, and much more. EcoMovie boasts a stylish and intuitive <br /> interface that makes your search for cinematic masterpieces as convenient and enjoyable as possible.</p>
                </div>
                <div className={scss.block3}>
                  <div className={scss.box1}>
                    <FaDiscord/>
                  </div>
                  <div className={scss.box1}>
                    <FaInstagram/>
                  </div>
                  <div className={scss.box1}>
                    <FaVk/>
                  </div>
                  <div className={scss.box1}>
                    <FaLinkedin/>
                  </div>
                  <div className={scss.box1}>
                    <FaGithub/>
                  </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer