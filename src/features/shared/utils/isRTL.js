const isRTL = (language) => {
    const rtlLanguages = ['fa', 'ar'];
    return rtlLanguages.includes(language);
};

export default isRTL