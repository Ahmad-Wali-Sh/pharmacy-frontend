import React, { useRef, forwardRef, useImperativeHandle, useMemo } from "react";
import MedicianEntrance from "../MedicianEntrance/MedicianEntrance";
import BigModal from "../../PageComponents/Modals/BigModal";
import { MedicineListFormat } from "./MedicineListFormat";
import BookmarkCards from "./BookmarkCards";
import { MedicineSelectStyle } from "../../../styles";
import { useQuery } from "react-query";
import { AsyncPaginate } from "react-select-async-paginate";
import MedicinesLists from "../../PageComponents/Lists/MedicineList/MedicinesLists";
import SellingLists from "../../PageComponents/Lists/SellLists/SellingLists";
import MedicineShowModal from "../../PageComponents/Modals/MedicineShow";
import { useMedicine } from "../../States/States";

export const SelectMedician = forwardRef(
  (
    {
      selectAutoCompleteData,
      department,
      UpdateChangedMedicine,
      handleCloseFocus,
      purchaseMedicine,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      Opener() {
        SelectMedicineModalRef.current.Opener();
        handleCloseFocus && handleCloseFocus();
      },
      Closer() {
        SelectMedicineModalRef.current.Closer();
      },
    }));
    const SelectMedicineModalRef = useRef(null);

    const { medicine, setMedicine} = useMedicine()
    const [textHighlight, setTextHighlight] = React.useState({
      barcode: "on",
      generic: "",
      ml: "",
      kind_english: "",
      kind_persian: "",
      country: "",
      company: "",
      all: "",
    });

    React.useEffect(() => {
      const listener = (e) => {
        if (e.ctrlKey === true) {
          switch (e.key) {
            case "m":
            case "M":
            case "ئ":
              SelectMedicineModalRef.current.Opener();
          }
        }
      };

      document.addEventListener("keydown", listener);

      return () => {
        document.removeEventListener("keydown", listener);
      };
    }, []);

    React.useEffect(() => {
      setMedicine(purchaseMedicine);
    }, [purchaseMedicine]);

    const { data: BookmarkedMedicine } = useQuery({
      queryKey: [`medician/?department=${department}`],
      enabled: department != undefined,
    });

    const loadMedicine = (search, loadedOptions) => {
      return {
        options:
          stringArray.join("").replace(/\s/g, "") != "" &&
          !MedicineLoading &&
          isBarcode(stringArray) ? [MedicianSearched?.results[0].medician] : MedicianSearched?.results,
        hasMore: false,
      };
    };

    const [stringArray, setStringArray] = React.useState([""]);
    React.useEffect(() => {
      stringArray.length == 1
        ? setTextHighlight({ barcode: "on" })
        : stringArray.length == 2
        ? setTextHighlight({ ml: "on" })
        : stringArray.length == 3
        ? setTextHighlight({ generic: "on" })
        : stringArray.length == 4
        ? setTextHighlight({ kind_persian: "on" })
        : stringArray.length == 5
        ? setTextHighlight({ kind_english: "on" })
        : stringArray.length == 6
        ? setTextHighlight({ country: "on" })
        : stringArray.length == 7
        ? setTextHighlight({ company: "on" })
        : stringArray.length == 8
        ? setTextHighlight({ all: "on" })
        : stringArray.length == 9
        ? setTextHighlight({ all: "" })
        : "";
    }, [stringArray]);

    const isBarcode = (stringArray) => {
      let string = stringArray.join("").replace(/\s/g, "").slice(0, 5);
      return !isNaN(string);
    };

    let medicineQuery = `medician/?${
      isBarcode(stringArray) ? "barcode__contains" : "brand_name"
    }=${stringArray[0] ? encodeURIComponent(stringArray[0]) : ""}&ml=${
      stringArray[1] ? encodeURIComponent(stringArray[1]) : ""
    }&search=${stringArray[2] ? encodeURIComponent(stringArray[2]) : ""}&kind__name_persian=${
      stringArray[3] ? encodeURIComponent(stringArray[3]) : ""
    }&kind__name_english=${
      stringArray[4] ? encodeURIComponent(stringArray[4]) : ""
    }&country__name=${
      stringArray[5] ? encodeURIComponent(stringArray[5]) : ""
    }&big_company__name=${stringArray[6] ? encodeURIComponent(stringArray[6]) : ""}&all=${
      stringArray[7] ? encodeURIComponent(stringArray[7]) : ""
    }`

    let medicineBarcodeQuery = `medicine-barcode/?barcode=${stringArray[0] ? encodeURIComponent(stringArray[0]) : ''}`

    const { data: MedicianSearched, isFetching: MedicineLoading } = useQuery({
      queryKey: [
        isBarcode(stringArray) ? medicineBarcodeQuery : medicineQuery
      ],
      enabled: stringArray.join("").replace(/\s/g, "") != "",
    });

    const handleMedicineSelect = (item) => {
      MedicineShowRef.current.Opener(item);
    };

    
    const ApproveMedicine = (item) => {
      selectAutoCompleteData(item);
      SelectMedicineModalRef.current.Closer();
      setMedicine(item);
      UpdateChangedMedicine && UpdateChangedMedicine(item)
      handleCloseFocus && handleCloseFocus();
      // Medicine With Including Functionality
      // Medicine Expires Including Functionality
    };

    const SellRef = useRef();

    const MedicineShowRef = useRef();

    return (
      <>
        <div className="select-medician">
          <div
            className="select-medician-button"
            onClick={() => {
              SelectMedicineModalRef.current.Opener();
              handleCloseFocus && handleCloseFocus();
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && SelectMedicineModalRef.current.Opener()
            }
            tabIndex={0}
          >
            انتخاب دارو
          </div>
          <div className="selected-medician-show">
            <h4>{medicine && medicine.medicine_full}</h4>
          </div>
          {medicine && (
            <div className="flex ">
              <div className="selected-with-button">
                <SellingLists
                  title="لست ها"
                  activeKey="purhase-list"
                  ref={SellRef}
                  selectedMedicine={medicine}
                  button="plus"
                />
              </div>
              <MedicinesLists
                title="لست ها"
                activeKey="medicines"
                medicine={medicine}
                setMedicine={setMedicine}
                selectAutoCompleteData={selectAutoCompleteData}
                button="none"
                name="ثبت دوا"
              />
            </div>
          )}
          <BigModal title="انتخاب دارو" ref={SelectMedicineModalRef}>
            <MedicineShowModal
              ref={MedicineShowRef}
              ApproveMedicine={ApproveMedicine}
            />
            <div className="medician-select-input-box">
              <div>
                <span className={textHighlight?.all}>همه</span> |{" "}
                <span className={textHighlight?.company}>کمپنی</span> |{" "}
                <span className={textHighlight?.country}>کشور</span> |{" "}
                <span className={textHighlight?.kind_english}>
                  نوع "انگلیسی"
                </span>{" "}
                |{" "}
                <span className={textHighlight?.kind_persian}>نوع "فارسی"</span>{" "}
                | <span className={textHighlight?.generic}>ترکیب</span> |{" "}
                <span className={textHighlight?.ml}>میزان موثریت</span> |{" "}
                <span className={textHighlight?.barcode}>بارکد/نام برند</span>
              </div>
              <AsyncPaginate
                loadOptions={!MedicineLoading && loadMedicine}
                getOptionLabel={(option) => option?.medicine_full}
                getOptionValue={(option) => option?.medicine_full}
                autoFocus
                defaultValue={MedicianSearched?.results?.[0]}
                filterOption={() => true}
                onInputChange={(string) => setStringArray(string.split("  "))}
                formatOptionLabel={MedicineListFormat}
                styles={MedicineSelectStyle}
                onChange={handleMedicineSelect}
                isLoading={MedicineLoading}
                loadOptionsOnMenuOpen={false}
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
);
