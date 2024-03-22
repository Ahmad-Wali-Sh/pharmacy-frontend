export const ModalSmallStyles = {
  content: {
    backgroundColor: "var(--bg-200)",
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
export const ModalBiggerSmallStyles = {
  content: {
    backgroundColor: "var(--bg-200)",
    border: "none",
    borderRadius: "1rem",
    overflow: "hidden",
    padding: "0px",
    width: "50%",
    left: "25%",
  },
  overlay: {
    backgroundColor: "rgba(60,60,60,0.5)",
    textAlign: "center",
  },
};

export const ModalBigStyles = {
  content: {
    backgroundColor: "var(--bg-200)",
    border: "none",
    width: '99%',
    left: '0.5%',
    height: '99%',
    top: '0.5%', 
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
    backgroundColor: "var(--bg-200)",
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
    backgroundColor: "var(--bg-100)",
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
  backgroundColor: "var(--bg-200)",
  color: "var(--text-100)",
  border: "none",
  hoverBackgroundColor: "var(--bg-300)",
  zIndex: "2",
  overflow: "scroll",
};

export const MedicineSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "var(--bg-100)",
    color: "var(--text-100)",
    border: "none",
    borderRadius: "1rem",
    boxShadow: state.isFocused && "-4px -4px 4px var(--primary-100)",
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? "var(--bg-300)" : "var(--bg-100)",
  }),
  container: (styles) => ({
    ...styles,
    backgroundColor: "var(--bg-100)",
  }),
  input: (styles) => ({
    ...styles,
    color: "var(--text-100)",
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    display: "none",
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "var(--bg-100)",
    maxHeight: "70vh",
  }),
};

export const SelectInputStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "var(--bg-100)",
    color: "var(--text-100)",
    minHeight: "1.3rem",
    height: "1.5rem",
    border: "none",
    borderRadius: "1rem",
    boxShadow: state.isFocused && "-4px -4px 4px var(--primary-200);",
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
    backgroundColor: "var(--bg-200)",
  }),
  menuList: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--bg-300)" : "",
    textAlign: "right",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ?  "var(--bg-300)" : "var(--bg-100)",
    color: "var(--text-100)",
  }),
  input: (base, state) => ({
    ...base,
    height: "1rem",
    direction: "rtl",
    color: "var(--text-100)",
    fontSize: "0.9rem",
    marginTop: "-0.3rem",
  }),
  singleValue: (base, state) => ({
    ...base,
    direction: "rtl",
    textAlign: "right",
    color: "var(--text-100)",
  }),
  multiValue: (base, state) => ({
    ...base,
    backgroundColor: "var(--bg-100)",
    color: "var(--text-100)",
    minHeight: "0.6rem",
    height: "1.2rem",
    position: "relative",
    top: "-0.2rem",
  }),
};
