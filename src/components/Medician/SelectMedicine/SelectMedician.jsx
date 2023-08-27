import React, { useRef } from "react";
import MedicianEntrance from "../MedicianEntrance/MedicianEntrance";
import BigModal from "../../PageComponents/Modals/BigModal";
import { MedicineListFormat } from "./MedicineListFormat";
import BookmarkCards from "./BookmarkCards";
import { MedicineSelectStyle } from "../../../styles";
import { useQuery } from "react-query";
import AsyncSelect from "react-select/async";
import { createFilter } from 'react-select'

export default function SelectMedician({
  selectAutoCompleteData,
  department,
  UpdateChangedMedicine,
}) {
  const SelectMedicineModalRef = useRef(null);

  const [selectedMedician, setSelectedMedician] = React.useState("");
  const [textHighlight, setTextHighlight] = React.useState({
    barcode: "on",
    generic: "",
    ml: "",
    kind: "",
    country: "",
    company: "",
  });

  const { data: BookmarkedMedicine } = useQuery({
    queryKey: [`medician/?department=${department}`],
    enabled: department != undefined,
  });

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


  const UpdateSelectedMedicine = (item) => {
    setSelectedMedician(item);
  };



  const { data: MedicianSearched } = useQuery({
    queryKey: [
      `medician/?brand_name=${stringArray[0] ? stringArray[0] : ""}&ml=${
        stringArray[1] ? stringArray[1] : ""
      }&search=${stringArray[2] ? stringArray[2] : ""}&kind__name_english=${
        stringArray[3] ? stringArray[3] : ""
      }&country__name=${
        stringArray[4] ? stringArray[4] : ""
      }&big_company__name=${stringArray[5] ? stringArray[5] : ""}`,
    ],
    staleTime: 10,
    enabled: stringArray[0] != undefined
  });


  const handleMedicineSelect = (item) => {
    selectAutoCompleteData(item);
    SelectMedicineModalRef.current.Closer();
    setSelectedMedician(item);
    // Medicine With Including Functionality
    // Medicine Expires Including Functionality
  };

  const loadMedicine = (string, callback) => {
    setStringArray(string.split("  "));
    callback(MedicianSearched?.results);
  };

  return (
    <>
      <div className="select-medician">
        <div
          className="select-medician-button"
          onClick={() => {
            SelectMedicineModalRef.current.Opener()
          }}
          onKeyDown={(e) =>
            e.key === "Enter" && SelectMedicineModalRef.current.Opener()
          }
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
          <div className="medician-select-input-box" >
            <div>
              <span className={textHighlight?.company}>کمپنی</span> |{" "}
              <span className={textHighlight?.country}>کشور</span> |{" "}
              <span className={textHighlight?.kind}>نوع</span> |{" "}
              <span className={textHighlight?.generic}>ترکیب</span> |{" "}
              <span className={textHighlight?.ml}>میزان موثریت</span> |{" "}
              <span className={textHighlight?.barcode}>بارکد/نام برند</span>
            </div>
            <AsyncSelect
              loadOptions={loadMedicine}
              getOptionLabel={option => option?.medicine_full}
              getOptionValue={option => option?.medicine_full}
              autoFocus
              defaultValue={MedicianSearched?.results?.[0]}
              filterOption={createFilter({ ignoreAccents: false })}
              formatOptionLabel={MedicineListFormat}
              styles={MedicineSelectStyle}
              options={MedicianSearched?.results}
              onChange={handleMedicineSelect}
            />
            <div className="bookmarks-box">
              {BookmarkedMedicine?.results.map((medicine) => (
                <BookmarkCards
                  medicine={medicine}
                  Func={handleMedicineSelect}
                />
              ))}
            </div>
          </div>
        </BigModal>
      </div>
    </>
  );
}
