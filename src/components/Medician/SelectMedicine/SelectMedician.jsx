import React, { useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import MedicianEntrance from "../MedicianEntrance/MedicianEntrance";
import BigModal from "../../PageComponents/Modals/BigModal";
import { MedicineListFormat } from "./MedicineListFormat";

export default function SelectMedician({
  selectAutoCompleteData,
  trigger,
  tabFormulate,
  department,
  results,
  ExpiresMedicine,
  UpdateChangedMedicine,
}) {
  const SelectMedicineModalRef = useRef(null);

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

  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const ENTRANCE_TRHGOUH_EXPIRES_URL = import.meta.env
    .VITE_ENTRANCE_TRHGOUH_EXPIRES_URL;
  const MEDICIAN_WITH_URL = import.meta.env.VITE_MEDICIAN_WITH;

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
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
    department &&
      axios
        .get(MEDICIAN_URL + "?department=" + department.id)
        .then((res) => setBookmarkedMedicine(res.data.results))
        .catch((err) => console.log(err));
  }, []);

  function registerModalOpener() {
    {
      tabFormulate != undefined && tabFormulate();
    }
    setRegisterModalOpen(true);
    setMedician(medicianWith);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    setMedician([]);
    setScrolled(false);
    
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

  const [medicianWith, setMedicineWith] = React.useState([]);

  const UpdateSelectedMedicine = (item) => {
    setSelectedMedician(item);
  };

  const [scrolled, setScrolled] = React.useState(false);

  const keyDownHandle = (e) => {
    const element = document.querySelector(".sc-gLDzan");
    let scrollNow = element.scrollTop;
    if (e.key == "ArrowDown") {
      if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        if (scrolled) {
          element.scroll(0, 0);
          setScrolled(false);
        } else {
          setScrolled(true);
        }
      } else {
        element.scroll(
          scrollNow == 0 ? 1 : scrollNow == 2 ? 1 : scrollNow + 160,
          scrollNow == 0 ? 1 : scrollNow == 2 ? 1 : scrollNow + 160
        );
      }
    }
    if (e.key == "ArrowUp") {
      if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        console.log("bottom");
        element.scroll(scrollNow - 2, scrollNow - 2);
      } else {
        console.log("other");
        element.scroll(scrollNow - 160, scrollNow - 160);
      }
      if (scrollNow == 0 || scrollNow == 1) {
        console.log("Top");
        element.scroll(0, 2);
      }
      if (scrollNow == 2) {
        element.scroll(0, 20000);
      }
    }
  };

  return (
    <>
      <div className="select-medician">
        <div
          className="select-medician-button"
          onClick={() => SelectMedicineModalRef.current.Opener()}
          onKeyDown={keyDownHandle}
          tabIndex={0}
        >
          انتخاب دارو
        </div>
        <div className="selected-medician-show">
          <h4>{selectedMedician && selectedMedician.medicine_full}</h4>
        </div>
        {selectedMedician && (
          <div className="flex">
            <MedicianEntrance
              button={3}
              medician={selectedMedician}
              UpdateMedicine={UpdateSelectedMedicine}
              UpdateChangedMedicine={UpdateChangedMedicine}
            />
          </div>
        )}
        <BigModal title="انتخاب دارو" ref={SelectMedicineModalRef}>
          <div className="medician-select-input-box" onKeyDown={keyDownHandle}>
            <div>
              <span className={textHighlight?.company}>کمپنی</span> |{" "}
              <span className={textHighlight?.country}>کشور</span> |{" "}
              <span className={textHighlight?.kind}>نوع</span> |{" "}
              <span className={textHighlight?.generic}>ترکیب</span> |{" "}
              <span className={textHighlight?.ml}>میزان موثریت</span> |{" "}
              <span className={textHighlight?.barcode}>بارکد/نام برند</span>
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
              inputDebounce="0"
              showItemsOnFocus={true}
              onSearch={(string, result) => {
                setMedicineWith([]);
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
                  axios.get(MEDICIAN_URL + "?barcode=" + string).then((res) => {
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
                let result = [];
                axios
                  .get(MEDICIAN_WITH_URL + "?medicine=" + item.id)
                  .then((res2) => {
                    if (res2.data && res2.data[0]) {
                      axios
                        .get(MEDICIAN_URL + "?ids=" + res2.data[0].includes)
                        .then((res3) => {
                          res3.data.results.length > 0
                            ? setMedicineWith(res3.data.results)
                            : setMedicineWith(result);
                        });
                    } else {
                      medicianWith.map(
                        (medicineWith) =>
                          medicineWith.id != item.id &&
                          result.push(medicineWith)
                      );
                      setMedicineWith(result);
                    }
                  });
                // if (item.generic_name != "") {
                //   axios
                //     .get(
                //       ENTRANCE_TRHGOUH_EXPIRES_URL +
                //         "?search=" +
                //         item.generic_name +
                //         "&medician__ml=" +
                //         item.ml.match(/\d+/)[0]
                //     )
                //     .then((res) => {
                //       ExpiresMedicine(res.data);
                //     });
                // } else {
                //   ExpiresMedicine([]);
                // }
              }}
              maxResults={20}
              style={{ width: "20rem" }}
              formatResult={MedicineListFormat}
              autoFocus={true}
              className="search"
            />
          </div>
          <MedicianEntrance button={3} autocompleter={selectAutoCompleteData} />
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
        </BigModal>
      </div>
    </>
  );
}
