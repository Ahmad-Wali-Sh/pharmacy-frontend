import React from "react";
import Modal from "react-modal";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import MedicianEntrance from "../../Medician/MedicianEntrance/MedicianEntrance";

export default function SelectMedician({
  kind,
  country,
  pharmGroub,
  selectAutoCompleteData,
  trigger, 
  tabFormulate
}) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [selectedMedician, setSelectedMedician] = React.useState("");

  function registerModalOpener() {
    tabFormulate()
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }
  
  
  React.useEffect(()=> {
    if (trigger != 0){
      registerModalOpener()
    }
    
  },[trigger])

  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;

  const [medician, setMedician] = React.useState([]);

  const customStyles = {
    content: {
      backgroundColor: "rgb(60,60,60)",
      border: "none",
      borderRadius: "1rem",
      padding: "0px",
      margin: "0px",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const formatResult = (item) => {


    const pharmImage = pharmGroub.filter((value)=> {
     return (value.id == item.pharm_group) && value.image
    })
    
    const kindImage = kind.filter((value)=> {
      return (value.id == item.kind) && value.image 
    })
    console.log(kindImage)
    const countryImage = country.filter((value)=> {
      return (value.id == item.country && value.image)
    })
    return (
      <div className="medician-format">
        <div className="medician-image">
          <img
            className="medician-image"
            src={item.image ? new URL(item.image).pathname.slice(16) : "./images/nophoto.jpg"}
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={pharmImage[0] && pharmImage[0].image ?  new URL(pharmImage[0].image).pathname.slice(16) : "./images/nophoto.jpg"}
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={kindImage[0] && kindImage[0].image ? new URL(kindImage[0].image).pathname.slice(16) : "./images/nophoto.jpg"}
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
          src={countryImage[0] && countryImage[0].image ?  new URL(countryImage[0].image).pathname.slice(16) : "./images/nophoto.jpg" }
          />
        </div>
        <div className="medician-text-field">
          <div>
            <div className="medician-select-information">
              <h4>{item.brand_name + " " + (item.ml ? item.ml : " ")}</h4>
              <h4>
                &nbsp;
                {country.map(
                  (country) => country.id == item.country && country.name
                )}
              </h4>
              <h4>
                &nbsp;
                {pharmGroub.map(
                  (pharm) => pharm.id == item.pharm_group && pharm.name_english
                )}
              </h4>
            </div>
            <h4>ترکیب: {item.generic_name.toString()}</h4>
          </div>
          <div className="medician-text-field-numbers">
            <h4>مکان: {item.location}</h4>
            <h4>قیمت: {`${item.price}AF`}</h4>
            <h4>تعداد در پاکت: {item.no_pocket}</h4>
            <h4>موجودیت: {item.existence}</h4>
          </div>
        </div>
      </div>
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
      registerModalOpener()
    }
  }

  const AutoCompleteStyle = {
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
  const AutoCompleteStyle2 = {
    ...AutoCompleteStyle,
    zIndex: "1",
  };
  return (
    <>
      <div className="select-medician">
        <div className="select-medician-button" onClick={registerModalOpener} onKeyDown={handleKeyDown} tabIndex={0}>
          انتخاب دارو
        </div>
        <div className="selected-medician-show">
          <h4>
            {selectedMedician &&
              (selectedMedician.brand_name + " " + selectedMedician.ml)}
          </h4>
          <h4>
            &nbsp;
            {country.map((country) =>
              country.id == selectedMedician.country ? country.name : ""
            )}
          </h4>
          <h4>
            &nbsp;
            {pharmGroub.map((pharm) =>
              pharm.id == selectedMedician.pharm_group ? pharm.name_english : ""
            )}
          </h4>
        </div>
        <Modal
          style={customStyles}
          isOpen={registerModalOpen}
          onRequestClose={registerModalCloser}
        >
          <div className="modal">
            <div className="modal-header">
              <h3>انتخاب دارو</h3>
              <div className="modal-close-btn" onClick={registerModalCloser}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="medician-select-input-box">
              <ReactSearchAutocomplete
                items={medician}
                showIcon={false}
                fuseOptions={{ keys: ["brand_name"] }}
                resultStringKeyName="brand_name"
                styling={AutoCompleteStyle2}
                showClear={false}
                inputDebounce="10"
                onSearch={(string, result) => {
                  axios
                    .get(
                      string != ""
                        ? MEDICIAN_URL + "?search=" + string
                        : MEDICIAN_URL + "?search=" + "''"
                    )
                    .then((res) => {
                      setMedician('')
                      setMedician(res.data);
                    });
                }}
                onSelect={(item) => {
                  selectAutoCompleteData(item);
                  
                  registerModalCloser();
                  setSelectedMedician(item);
                }}
                maxResults={20}
                formatResult={formatResult}
                autoFocus={true}
                className="search"
              />
              <MedicianEntrance button={2}/>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
