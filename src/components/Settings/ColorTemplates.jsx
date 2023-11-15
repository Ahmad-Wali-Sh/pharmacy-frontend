import React, { useRef } from "react";
import SmallModal from "../PageComponents/Modals/SmallModal";
import { useTemplateLogo } from "../States/States";
import './color-template.css'

function ColorTemplates() {
  const TemplateColorsRef = useRef(null);
  const { templateLogo, setTemplateLogo } = useTemplateLogo();

  let root = document.querySelector(":root");

  const cyan = () => {
    setTemplateLogo("./images/frontend/cyan-sharif.png");
    root.style.setProperty("--color-one", "#009aa3");
    root.style.setProperty("--color-two", "#006c72");
    root.style.setProperty("--color-eight", "#006c72");
    root.style.setProperty("--color-eleven", "#006c72");
    root.style.setProperty("--color-twelve", "#006c72");
    root.style.setProperty("--color-four", "rgb(170, 170, 170)");
  };

  const green = () => {
    setTemplateLogo("./images/frontend/green-sharif.png");
    root.style.setProperty("--color-one", "#1db853");
    root.style.setProperty("--color-two", "#137b37");
    root.style.setProperty("--color-eight", "#1db853");
    root.style.setProperty("--color-eleven", "#1db853");
    root.style.setProperty("--color-twelve", "#1db853");
    root.style.setProperty("--color-four", "rgb(80, 80, 80)");
  };

  const red = () => {
    setTemplateLogo("./images/frontend/red-sharif.png");
    root.style.setProperty("--color-one", "#5f0609");
    root.style.setProperty("--color-two", "#be0d12");
    root.style.setProperty("--color-eight", "#5f0609");
    root.style.setProperty("--color-eleven", "#5f0609");
    root.style.setProperty("--color-twelve", "#5f0609");
    root.style.setProperty("--color-four", "rgb(110, 110, 110)");
  };

  const yellow = () => {
    setTemplateLogo("./images/frontend/yellow-sharif.png");
    root.style.setProperty("--color-one", "#989802");
    root.style.setProperty("--color-two", "#d1d102");
    root.style.setProperty("--color-eight", "#989802");
    root.style.setProperty("--color-eleven", "#989802");
    root.style.setProperty("--color-twelve", "#989802");
    root.style.setProperty("--color-four", "rgb(80, 80, 80)");
  };

  const purple = () => {
    setTemplateLogo("./images/frontend/colorful.png");
    root.style.setProperty("--color-one", "#533855");
    root.style.setProperty("--color-two", "#6b4a99");
    root.style.setProperty("--color-eight", "rgb(77, 37, 81)");
    root.style.setProperty("--color-eleven", "rgb(74, 43, 80)");
    root.style.setProperty("--color-twelve", "rgb(111, 63, 119)");
    root.style.setProperty("--color-four", "rgb(110, 110, 110)");
  };

  const blue = () => {
    setTemplateLogo("./images/frontend/blue-sharif.png");
    root.style.setProperty("--color-one", "#063a92");
    root.style.setProperty("--color-two", "#0754b6");
    root.style.setProperty("--color-eight", "#063a88");
    root.style.setProperty("--color-eleven", "#063a88");
    root.style.setProperty("--color-twelve", "#063a88");
    root.style.setProperty("--color-four", "rgb(110, 110, 110)");
  };

  const dark = () => {
    root.style.setProperty("--color-thirth", "rgb(93, 93, 93)");
    root.style.setProperty("--color-nine", "rgb(87, 84, 84)");
    root.style.setProperty("--color-sex", "rgb(61, 61, 61)");
    root.style.setProperty("--color-three", "rgb(34, 34, 34)");
    root.style.setProperty("--color-ten", "white");
  };

  const light = () => {
    root.style.setProperty("--color-thirth", "rgb(189, 189, 189)");
    root.style.setProperty("--color-nine", "rgb(109, 109, 109)");
    root.style.setProperty("--color-sex", "rgb(134, 130, 130)");
    root.style.setProperty("--color-three", "rgb(187, 187, 187)");
    root.style.setProperty("--color-ten", "rgb(0, 0, 0)");
  };

  return (
    <>
      <div className="icons" onClick={() => TemplateColorsRef.current.Opener()}>
        <i class="fa-solid fa-droplet"></i>
      </div>
      <SmallModal ref={TemplateColorsRef} title="تغییر رنگ">
        <div className="color-pallete-container">
          <div className="color-pallete-item" onClick={() => purple()}>
            <div className="color-pallete-purple"></div>
          </div>
          <div className="color-pallete-item" onClick={() => cyan()}>
            <div className="color-pallete-cyan"></div>
          </div>
          <div className="color-pallete-item" onClick={() => green()}>
            <div className="color-pallete-green"></div>
          </div>
          <div className="color-pallete-item" onClick={() => red()}>
            <div className="color-pallete-red"></div>
          </div>
          <div className="color-pallete-item" onClick={() => blue()}>
            <div className="color-pallete-blue"></div>
          </div>
          <div className="color-pallete-item" onClick={() => yellow()}>
            <div className="color-pallete-yellow"></div>
          </div>
          <div className="dark-light-container">
            <div className="color-dark" onClick={() => dark()}></div>
            <div className="color-light" onClick={() => light()}></div>
          </div>
        </div>
      </SmallModal>
    </>
  );
}

export default ColorTemplates;
