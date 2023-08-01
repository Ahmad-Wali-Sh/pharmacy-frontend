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
  tabFormulate,
  department,
  results,
  ExpiresMedicine,
}) {
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

  const AutoCompleteStyle = {
    height: "1.5rem",
    borderRadius: "1rem",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    hoverBackgroundColor: "grey",
    zIndex: "2",
    minHeight: "10rem",
  };
  const AutoCompleteStyle2 = {
    ...AutoCompleteStyle,
    zIndex: "1",
  };

  const formatResult = (item) => {
    const pharmImage = pharmGroub.filter((value) => {
      return value.id == item.pharm_group && value.image;
    });
    const kindImage = kind.filter((value) => {
      return value.id == item.kind && value.image;
    });
    const countryImage = country.filter((value) => {
      return value.id == item.country && value.image;
    });
    return (
      <div className="medician-format">
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              item.image
                ? new URL(item.image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              pharmImage[0] && pharmImage[0].image
                ? new URL(pharmImage[0].image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              kindImage[0] && kindImage[0].image
                ? new URL(kindImage[0].image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              countryImage[0] && countryImage[0].image
                ? new URL(countryImage[0].image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
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
            <div className="medician-text-field-numbers">
              <h4>مکان: {item.location}</h4>
              <h4>قیمت: {`${item.price}AF`}</h4>
              <h4>تعداد در پاکت: {item.no_pocket}</h4>
              <h4>تعداد در قطی: {item.no_box}</h4>
              <h4>موجودیت: {item.existence}</h4>
            </div>
          </div>
          <div className="medician-big-text-fields">
            <div className="medician-bix-text-field">
              {item.description && (
                <div className="paragraph-big-text">
                  توضیحات:
                  {item.description}
                </div>
              )}
              {item.cautions && (
                <div className="paragraph-big-text">
                  اخطار:
                  {item.cautions}
                </div>
              )}
              {item.usages && (
                <div className="paragraph-big-text">
                  استفاده:
                  {item.usages}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const ENTRANCE_TRHGOUH_EXPIRES_URL = import.meta.env.VITE_ENTRANCE_TRHGOUH_EXPIRES_URL

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [selectedMedician, setSelectedMedician] = React.useState("");
  const [bookmarkedMedicine, setBookmarkedMedicine] = React.useState([]);
  const [medician, setMedician] = React.useState([]);
  const [textHighlight, setTextHighlight] = React.useState({
    barcode: "on",
    generic: "",
    ml: "",
    kind: "",
    country: "",
    company: "",
  });

  React.useEffect(() => {
    setMedician(results);
  }, [results]);

  React.useEffect(() => {
    department &&
      axios
        .get(MEDICIAN_URL + "?department=" + department.id)
        .then((res) => setBookmarkedMedicine(res.data.results))
        .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (trigger != 0) {
      registerModalOpener();
    }
  }, [trigger]);

  function registerModalOpener() {
    {
      tabFormulate != undefined && tabFormulate();
    }
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    setMedician([]);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      registerModalOpener();
    }
  };

  const [stringArray, setStringArray] = React.useState([]);
  React.useEffect(() => {
    stringArray.length == 1
      ? setTextHighlight({ barcode: "on" })
      : stringArray.length == 2
      ? setTextHighlight({ ml: "on" })
      : stringArray.length == 3
      ? setTextHighlight({ generic: "on" })
      : stringArray.length == 4
      ? setTextHighlight({ kind: "on" })
      : stringArray.length == 5
      ? setTextHighlight({ country: "on" })
      : stringArray.length == 6
      ? setTextHighlight({ company: "on" })
      : stringArray.length == 7
      ? setTextHighlight({ company: "" })
      : "";
  }, [stringArray]);

  return (
    <>
      <div className="select-medician">
        <div
          className="select-medician-button"
          onClick={registerModalOpener}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          انتخاب دارو
        </div>
        <div className="selected-medician-show">
          <h4>
            {selectedMedician &&
              selectedMedician.brand_name +
                " " +
                selectedMedician.ml +
                " " +
                selectedMedician.weight}
            {kind.map(
              (kind) =>
                kind.id == selectedMedician.kind && " ." + kind.name_english
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
            <div
              className="medician-select-input-box"
              onKeyDown={(e) => {
                let scrollNow = document.querySelector(".sc-gLDzan").scrollTop;
                console.log(scrollNow);
                if (e.key == "ArrowDown") {
                  document
                    .querySelector(".sc-gLDzan")
                    .scroll(
                      scrollNow == 0 ? 1 : scrollNow + 160,
                      scrollNow == 0 ? 1 : scrollNow + 160
                    );
                }
                if (e.key == "ArrowUp") {
                  document
                    .querySelector(".sc-gLDzan")
                    .scroll(scrollNow - 160, scrollNow - 160);
                }
              }}
            >
              <div>
                <span
                  className={textHighlight.company && textHighlight.company}
                >
                  کمپنی
                </span>{" "}
                |{" "}
                <span
                  className={textHighlight.country && textHighlight.country}
                >
                  کشور
                </span>{" "}
                |{" "}
                <span className={textHighlight.kind && textHighlight.kind}>
                  نوع
                </span>{" "}
                |{" "}
                <span
                  className={textHighlight.generic && textHighlight.generic}
                >
                  ترکیب
                </span>{" "}
                | <span className={textHighlight.ml}>میزان موثریت</span> |{" "}
                <span
                  className={textHighlight.barcode && textHighlight.barcode}
                >
                  بارکد/نام برند
                </span>
              </div>
              <ReactSearchAutocomplete
                items={medician}
                showIcon={false}
                fuseOptions={{
                  threshold: 10,
                  keys: [
                    "brand_name",
                    "barcode",
                    "ml",
                    "generic_name",
                    "kind_name",
                    "country_name",
                  ],
                }}
                resultStringKeyName="brand_name"
                styling={AutoCompleteStyle2}
                showClear={false}
                inputDebounce="10"
                showItemsOnFocus={true}
                onSearch={(string, result) => {
                  let stringArray = string.split("  ");
                  setStringArray(stringArray);
                  if (string != "" && isNaN(string)) {
                    axios
                      .get(
                        MEDICIAN_URL +
                          "?brand_name=" +
                          stringArray[0] +
                          "&ml=" +
                          (stringArray[1] ? stringArray[1] : "") +
                          "&search=" +
                          (stringArray[2] ? stringArray[2] : "") +
                          "&kind__name_english=" +
                          (stringArray[3] ? stringArray[3] : "") +
                          "&country__name=" +
                          (stringArray[4] ? stringArray[4] : "") +
                          "&big_company__name=" +
                          (stringArray[5] ? stringArray[5] : "")
                      )
                      .then((res) => {
                        setMedician(res.data.results);
                        if (string == false) {
                          setMedician([]);
                        }
                      });
                  }
                  if (string != "" && !isNaN(string)) {
                    axios
                      .get(MEDICIAN_URL + "?barcode=" + string)
                      .then((res) => {
                        setMedician(res.data.results);
                      });
                  }
                  if (string == "") {
                    setMedician([]);
                  }
                }}
                onSelect={(item) => {
                  selectAutoCompleteData(item);
                  setMedician([]);
                  registerModalCloser();
                  setSelectedMedician(item);
                  console.log(item.generic_name);
                  if (item.generic_name != "") {
                    axios
                      .get(ENTRANCE_TRHGOUH_EXPIRES_URL + "?search=" + item.generic_name + "&medician__ml=" + item.ml.match(/\d+/)[0])
                      .then((res) => {
                        ExpiresMedicine(res.data);
                      })
                  }
                  else {
                    ExpiresMedicine([])
                  }
                }}
                maxResults={20}
                style={{ width: "20rem" }}
                formatResult={formatResult}
                autoFocus={true}
                className="search"
              />
              <MedicianEntrance button={2} />
              <div className="bookmarks-box">
                {bookmarkedMedicine.map((medicine) => (
                  <div
                    className="bookmark-card"
                    onClick={() => {
                      selectAutoCompleteData(medicine);

                      registerModalCloser();
                      setSelectedMedician(medicine);
                    }}
                  >
                    <img
                      className="bookmark-image"
                      src={
                        medicine.image
                          ? new URL(medicine.image).pathname.slice(16)
                          : "./images/nophoto.jpg"
                      }
                    />
                    <h4>{medicine.brand_name}</h4>
                    <h5>{medicine.generic_name}</h5>
                    <h4>{medicine.ml}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
