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
    zIndex: 10,
  },
  overlay: {
    backgroundColor: "rgba(60,60,60,0.5)",
  },
};

export const MedicineShowModalStyles = {
  content: {
    backgroundColor: "rgb(30,30,30)",
    border: "none",
    width: "85%",
    height: "30rem",
    top: "14%",
    left: "7%",
    borderRadius: "1rem",
    overflow: "hidden",
    padding: "0px",
    margin: "0px",
    zIndex: 10,
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
    backgroundColor: "var(--color-three)",
    color: "var(--color-ten)",
    border: "none",
    borderRadius: "1rem",
    boxShadow: state.isFocused && "-4px -4px 4px var(--color-two);",
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? "var(--color-nine)" : "var(--color-sex)",
  }),
  container: (styles) => ({
    ...styles,
    backgroundColor: "var(--color-three)",
  }),
  input: (styles) => ({
    ...styles,
    color: "var(--color-ten)",
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    display: "none",
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "var(--color-three)",
    maxHeight: "70vh",
  }),
};

export const SelectInputStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "var(--color-three)",
    color: "white",
    minHeight: "1.3rem",
    height: "1.5rem",
    border: "none",
    borderRadius: "1rem",
    boxShadow: state.isFocused && "-4px -4px 4px var(--color-two);",
    width: "100%",
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    minHeight: "1.3rem",
    height: "1.8rem",
    border: "none",
    width: "23%",
  }),
  container: (base, state) => ({
    ...base,
    width: "100%",
  }),
  indicatorsDropdown: (base) => ({
    ...base,
    border: "none",
  }),
  menu: (base, state) => ({
    ...base,
    backgroundColor: "var(--color-sex)",
  }),
  menuList: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--color-nine)" : "",
    textAlign: "right",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--color-nine)" : "var(--color-sex)",
    color: "var(--color-ten)",
  }),
  input: (base, state) => ({
    ...base,
    height: "1rem",
    direction: "rtl",
    color: "var(--color-ten)",
    fontSize: "0.9rem",
    marginTop: "-0.3rem",
  }),
  singleValue: (base, state) => ({
    ...base,
    direction: "rtl",
    textAlign: "right",
    color: "var(--color-ten)",
  }),
  multiValue: (base, state) => ({
    ...base,
    backgroundColor: "var(--color-nine)",
    color: "var(--color-ten)",
    minHeight: "0.6rem",
    height: "1.2rem",
    position: "relative",
    top: "-0.2rem",
  }),
};
