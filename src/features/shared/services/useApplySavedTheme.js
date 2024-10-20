import { useEffect } from "react";

const useApplySavedTheme = () => {
  
  const savedTheme = localStorage.getItem('theme');
  useEffect(()=> {
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      applyTheme(theme);
    }

  }, [savedTheme])
};



const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
};

export default useApplySavedTheme;