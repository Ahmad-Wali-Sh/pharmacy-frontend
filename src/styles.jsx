export const ModalSmallStyles = {
  content: {
    backgroundColor: "rgb(30,30,30)",
    border: "none",
    borderRadius: "1rem",
    overflow: "hidden",
    padding: "0px",
    width: "35%",
    left: "30%",
  },
  overlay: {
    backgroundColor: "rgba(60,60,60,0.5)",
    textAlign: "center",
  },
};

export const ModalBigStyles = {
  content: {
    backgroundColor: "rgb(30,30,30)",
    border: "none",
    borderRadius: "1rem",
    overflow: "hidden",
    padding: "0px",
    margin: "0px",
  },
  overlay: {
    backgroundColor: "rgba(60,60,60,0.5)",
  },
};

export const AlertModalStyle = {
  content: {
    backgroundColor: "rgb(120,120,120)",
    border: "none",
    borderRadius: "1rem",
    overflow: "hidden",
    padding: "0px",
    margin: "0px",
    zIndex: "100",
    width: "30%",
    height: "30%",
    top: "30%",
    left: "35%",
  },
  overlay: {
    backgroundColor: "rgba(60,60,60,0.5)",
  },
};

export const AutoCompleteStyle = {
  height: "1.5rem",
  borderRadius: "1rem",
  fontSize: "14px",
  backgroundColor: "rgb(34, 34, 34)",
  color: "white",
  border: "none",
  hoverBackgroundColor: "grey",
  zIndex: "2",
  overflow: "scroll",
};

export const MedicineSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: 'rgb(30,30,30)',
    border: "1px solid black",
    color: "white",
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? 'rgb(80,80,80)': 'rgb(40,40,40)'
  }),
  container: (styles) => ({
    ...styles,
    backgroundColor: 'rgb(60,60,60)',
  }),
  input: (styles) => ({
    ...styles,
    color: 'white'
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    display: 'none'
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: 'rgb(60,60,60)',
    maxHeight: '70vh'
  })
}

