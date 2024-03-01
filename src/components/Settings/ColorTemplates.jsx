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
    root.style.setProperty("--primary-100", "#0085ff");
    root.style.setProperty("--primary-200", "#69b4ff");
    root.style.setProperty("--primary-300", "#e0ffff");

    root.style.setProperty("--bg-100", "#1E1E1E");
    root.style.setProperty("--bg-200", "#2d2d2d");

    root.style.setProperty("--bg-300", "#454545");
    root.style.setProperty("--text-100", "#FFFFFF");
    root.style.setProperty("--text-200", "#9e9e9e");
    root.style.setProperty("--accent-100", "#006fff");
    root.style.setProperty("--accent-200", "#e1ffff");

  };

  const green = () => {
    setTemplateLogo("./images/frontend/green-sharif.png");
    root.style.setProperty("--primary-100", "#7FB3D5");
    root.style.setProperty("--primary-200", "#6296b7");
    root.style.setProperty("--primary-300", "#195775");
    root.style.setProperty("--bg-100", "#F5F5DC");
    root.style.setProperty("--bg-200", "#ebebd2");
    root.style.setProperty("--bg-300", "#c2c2aa");
    root.style.setProperty("--text-100", "#333333");
    root.style.setProperty("--text-200", "#5c5c5c");
    root.style.setProperty("--accent-100", "#F7CAC9");
    root.style.setProperty("--accent-200", "#926b6a");

  };

  const red = () => {
    setTemplateLogo("./images/frontend/red-sharif.png");
    root.style.setProperty("--primary-100", "#596E79");
    root.style.setProperty("--primary-200", "#788e98");
    root.style.setProperty("--primary-300", "#F0F5F9");
    root.style.setProperty("--bg-100", "#F0ECE3");
    root.style.setProperty("--bg-200", "#DFD3C3");
    root.style.setProperty("--bg-300", "#C7B198");
    root.style.setProperty("--text-100", "#1E2022");
    root.style.setProperty("--text-200", "#52616B");
    root.style.setProperty("--accent-100", "#788189");
    root.style.setProperty("--accent-200", "#e1e4e6");
  };

  const yellow = () => {
    setTemplateLogo("./images/frontend/yellow-sharif.png");
    root.style.setProperty("--primary-100", "#00A896");
    root.style.setProperty("--primary-200", "#008b7a");
    root.style.setProperty("--primary-300", "#09554c");
    root.style.setProperty("--bg-100", "#F2EFE9");
    root.style.setProperty("--bg-200", "#e8e5df");
    root.style.setProperty("--bg-300", "#bfbdb7");
    root.style.setProperty("--text-100", "#333333");
    root.style.setProperty("--text-200", "#5c5c5c");
    root.style.setProperty("--accent-100", "#FF6B6B");
    root.style.setProperty("--accent-200", "#8f001a");

  };

  const purple = () => {
    setTemplateLogo("./images/frontend/colorful.png");
    root.style.setProperty("--primary-100", "#6c35de");
    root.style.setProperty("--primary-200", "#a364ff");
    root.style.setProperty("--primary-300", "#ffc7ff");
    root.style.setProperty("--bg-100", "#241b35");
    root.style.setProperty("--bg-200", "#342a45");
    root.style.setProperty("--bg-300", "#4d425f");
    root.style.setProperty("--text-100", "#ffffff");
    root.style.setProperty("--text-200", "#e0e0e0");
    root.style.setProperty("--accent-100", "#6e28a0");
    root.style.setProperty("--accent-200", "#373737");

  };

  const blue = () => {
    setTemplateLogo("./images/frontend/blue-sharif.png");
    root.style.setProperty("--primary-100", "#B0C5D1");
    root.style.setProperty("--primary-200", "#93a8b3");
    root.style.setProperty("--primary-300", "#536771");
    root.style.setProperty("--bg-100", "#E6F2EA");
    root.style.setProperty("--bg-200", "#dce8e0");
    root.style.setProperty("--bg-300", "#b4bfb8");
    root.style.setProperty("--text-100", "#4D4D4D");
    root.style.setProperty("--text-200", "#797979");
    root.style.setProperty("--accent-100", "#D1B0C5");
    root.style.setProperty("--accent-200", "#715467");

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

        </div>
      </SmallModal>
    </>
  );
}

export default ColorTemplates;
