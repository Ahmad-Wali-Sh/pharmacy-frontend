import React from "react";
import Modal from "react-modal";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import LoadingDNA from "../../PageComponents/LoadingDNA";

export default function SelectMedician({
  kind,
  country,
  pharmGroub,
  selectAutoCompleteData,
}) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [selectedMedician, setSelectedMedician] = React.useState("");

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;

  const [medician, setMedician] = React.useState([]);

  const customStyles = {
    content: {
      backgroundColor: "rgb(60,60,60)",
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

  const formatResult = (item) => {
    return (
      <div className="medician-format">
        <div className="medician-image">
          <img
            className="medician-image"
            src={item.image ? item.image.slice(38) : "./images/nophoto.jpg"}
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={kind.map((kind) =>
              item.kind == kind.id && kind.image == "./images/"
                ? kind.image.slice(38)
                : "./images/nophoto.jpg"
            )}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./images/nophoto.jpg";
            }}
            alt=""
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={country.map((country) =>
              item.country == country.id && country.image
                ? country.image.slice(38)
                : "./images/nophoto.jpg"
            )}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./images/nophoto.jpg";
            }}
            alt=""
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={pharmGroub.map((pharm) =>
              item.pharm_groub == pharm.id && pharm.image
                ? pharm.image.slice(38)
                : ""
            )}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./images/nophoto.jpg";
            }}
            alt=""
          />
        </div>
        <div className="medician-text-field">
          <div>
            <h4>
              {item.brand_name +
                " " +
                (item.ml ? item.ml : " ") +
                " " +
                (item.country
                  ? country.map(
                      (country) => country.id == item.country && country.name
                    )
                  : " ") +
                (item.kind
                  ? kind.map((kind) => kind.id == item.kind && kind.name)
                  : " ") +
                " " +
                (item.pharm_group
                  ? pharmGroub.map(
                      (pharm) =>
                        pharm.id == item.pharm_group && pharm.name_english
                    )
                  : "")}
            </h4>
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
        <div className="select-medician-button" onClick={registerModalOpener}>
          انتخاب دارو
        </div>
        <div className="selected-medician-show">
          {selectedMedician ? (
            selectedMedician.brand_name +
            " " +
            (selectedMedician.ml ? selectedMedician.ml : " ") +
            " " +
            (selectedMedician.country
              ? country.map(
                  (country) =>
                    country.id == selectedMedician.country && country.name
                )
              : " ") +
            (selectedMedician.kind
              ? kind.map(
                  (kind) => kind.id == selectedMedician.kind && kind.name
                )
              : " ") +
            " " +
            (selectedMedician.pharm_group
              ? pharmGroub.map(
                  (pharm) =>
                    pharm.id == selectedMedician.pharm_group &&
                    pharm.name_english
                )
              : "")
          ) : (
            <LoadingDNA />
          )}
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
                      setMedician(res.data);
                    });
                }}
                onSelect={(item) => {
                  selectAutoCompleteData(item);
                  registerModalCloser();
                  setSelectedMedician(item);
                }}
                maxResults={3}
                formatResult={formatResult}
                autoFocus={true}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
