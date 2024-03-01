import React, { useEffect, useRef } from "react";
import SmallModal from "../PageComponents/Modals/SmallModal";
import { useTemplateLogo } from "../States/States";
import "./color-template.css";

function ColorTemplates() {
  const TemplateColorsRef = useRef(null);
  const { templateLogo, setTemplateLogo } = useTemplateLogo();

    // Function to get theme from localStorage and apply it
    const applySavedTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme);
      }
    };

    // Function to apply theme
    const applyTheme = (theme) => {
      const root = document.documentElement;
      Object.keys(theme).forEach((key) => {
        root.style.setProperty(key, theme[key]);
      });
    };

    // Function to save theme in localStorage
    const saveTheme = (theme) => {
      localStorage.setItem('theme', JSON.stringify(theme));
    };

  useEffect(() => {

    // Apply saved theme when component mounts
    applySavedTheme();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  let root = document.querySelector(":root");

  const cyan = () => {
    const theme = {
      "--primary-100": "#0085ff",
      "--primary-200": "#69b4ff",
      "--primary-300": "#e0ffff",
      "--bg-100": "#1E1E1E",
      "--bg-200": "#2d2d2d",
      "--bg-300": "#454545",
      "--text-100": "#FFFFFF",
      "--text-200": "#9e9e9e",
      "--accent-100": "#006fff",
      "--accent-200": "#e1ffff"
    };
    applyTheme(theme);
    saveTheme(theme);
  };

  const green = () => {
    const theme = {
      "--primary-100": "#7FB3D5",
      "--primary-200": "#6296b7",
      "--primary-300": "#195775",
      "--bg-100": "#F5F5DC",
      "--bg-200": "#ebebd2",
      "--bg-300": "#c2c2aa",
      "--text-100": "#333333",
      "--text-200": "#5c5c5c",
      "--accent-100": "#F7CAC9",
      "--accent-200": "#926b6a"
    };
    applyTheme(theme);
    saveTheme(theme);
  };

  const red = () => {
    const theme = {
      "--primary-100": "#596E79",
      "--primary-200": "#788e98",
      "--primary-300": "#F0F5F9",
      "--bg-100": "#F0ECE3",
      "--bg-200": "#DFD3C3",
      "--bg-300": "#C7B198",
      "--text-100": "#1E2022",
      "--text-200": "#52616B",
      "--accent-100": "#788189",
      "--accent-200": "#e1e4e6"
    };
    applyTheme(theme);
    saveTheme(theme);
  };

  const yellow = () => {
    const theme = {
      "--primary-100": "#00A896",
      "--primary-200": "#008b7a",
      "--primary-300": "#09554c",
      "--bg-100": "#F2EFE9",
      "--bg-200": "#e8e5df",
      "--bg-300": "#bfbdb7",
      "--text-100": "#333333",
      "--text-200": "#5c5c5c",
      "--accent-100": "#FF6B6B",
      "--accent-200": "#8f001a"
    };
    applyTheme(theme);
    saveTheme(theme);
  };

  const purple = () => {
    const theme = {
      "--primary-100": "#6c35de",
      "--primary-200": "#a364ff",
      "--primary-300": "#ffc7ff",
      "--bg-100": "#241b35",
      "--bg-200": "#342a45",
      "--bg-300": "#4d425f",
      "--text-100": "#ffffff",
      "--text-200": "#e0e0e0",
      "--accent-100": "#6e28a0",
      "--accent-200": "#373737"
    };
    applyTheme(theme);
    saveTheme(theme);
  };
  
  const blue = () => {
    const theme = {
      "--primary-100": "#B0C5D1",
      "--primary-200": "#93a8b3",
      "--primary-300": "#536771",
      "--bg-100": "#E6F2EA",
      "--bg-200": "#dce8e0",
      "--bg-300": "#b4bfb8",
      "--text-100": "#4D4D4D",
      "--text-200": "#797979",
      "--accent-100": "#D1B0C5",
      "--accent-200": "#715467"
    };
    applyTheme(theme);
    saveTheme(theme);
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
