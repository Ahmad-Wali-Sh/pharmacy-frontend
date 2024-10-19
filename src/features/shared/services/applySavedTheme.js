const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      applyTheme(theme);
    }
};

const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
};

export default applySavedTheme;