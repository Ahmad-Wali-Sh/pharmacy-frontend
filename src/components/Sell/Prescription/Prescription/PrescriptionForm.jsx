import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import {
  ButtonGroup,
  FormButton,
  SearchButton,
  SubmitButton,
} from "../../../PageComponents/Buttons/Buttons";
import { useMutation } from "react-query";
import {
  putDataFn,
  postDataFn,
  handleFormData,
  successFn,
  patchDataFn,
} from "../../../services/API";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import ControlledSelect from "../../../PageComponents/ControlledSelect";
import {
  useMedicineOpener,
  usePrescription,
  useUserPermissions,
} from "../../../States/States";
import SellingLists from "../../../PageComponents/Lists/SellLists/SellingLists";
import moment from "jalali-moment";
import MultiplePrescriptionImage from "../../../PageComponents/MultiplePrescriptionImage";
import axios from "axios";
import useServerIP from "../../../services/ServerIP";
import AlertModal from "../../../PageComponents/Modals/AlertModal";
import SmallModal from "../../../PageComponents/Modals/SmallModal";
import { ModalBiggerSmallStyles } from "../../../../styles";
import InputMask from "react-input-mask";

function PrescriptionForm({
  prescriptionThrough,
  update,
  prescriptionSelected,
  departmenter,
  startTrigger,
}) {
  const { userPremissions } = useUserPermissions();
  const user = useAuthUser();
  const { data: patient } = useQuery(["patient/"]);
  const { data: doctor } = useQuery(["doctor/"]);
  const { data: department } = useQuery(["department/"]);
  const [searchNumber, setSearchNumber] = React.useState("");
  const { prescription, setPrescription } = usePrescription();

  const { register, handleSubmit, reset, watch, setValue, control } = useForm();

  React.useEffect(() => {
    reset({
      discount_money: prescription.discount_money || 0,
      discount_percent: prescription.discount_percent || 0,
      over_money: prescription.over_money || 0,
      over_percent: prescription.over_percent || 0,
      zakat: prescription.zakat || 0,
      khairat: prescription.khairat || 0,
      department: prescription.department || 0,
      prescription_number: prescription.prescription_number || "",
      name: prescription.name ? prescription.name : "",
      doctor: prescription.doctor ? prescription.doctor : "",
    });
  }, [prescription]);
  const { serverIP } = useServerIP();

  const cleanupPrescription = () => {
    setPrescription([]);
    SetSearchBar();
  };

  React.useEffect(() => {
    const date = moment();
    const jalaliDate = date.format("jYYYY-jMM");
    const searchInput = document.getElementById("search-number");

    const handleKeyDowns = (e) => {
      if (e.shiftKey) {
        switch (e.key) {
          case "B":
          case "b":
          case "ذ":
            e.preventDefault();
            SetSearchBar();
            break;
          case "d":
          case "D":
          case "ی":
            e.preventDefault();
            newPrescription();
            break;
          case "q":
          case "Q":
          case "ض":
            e.preventDefault();
            cleanupPrescription();
            break;
          case "Delete":
            e.preventDefault();
            DeleterWithAlert();
            break;
          case "s":
          case "S":
          case "س":
            e.preventDefault();
            handleSubmit((data) =>
              handleFormData(data, updatePrescription, user)
            )();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, [serverIP]);

  const SetSearchBar = () => {
    const date = moment();
    const jalaliDate = date.format("jYYYY-jMM");
    const searchInput = document.getElementById("search-number");
    setSearchNumber(`${jalaliDate}-`);
    setTimeout(() => {
      searchInput.focus();
      searchInput.setSelectionRange(
        searchInput.value.length - 6,
        searchInput.value.length - 6
      );
    }, 0);
  };

  useEffect(() => {
    startTrigger && cleanupPrescription();
  }, [startTrigger]);

  const { medicineOpener, setMedicineOpener } = useMedicineOpener();

  const newPrescription = () => {
    const DepartmentForm = new FormData();
    DepartmentForm.append("name", "");
    DepartmentForm.append("doctor", "");
    DepartmentForm.append("department", departmenter.id);
    DepartmentForm.append("discount_money", departmenter.discount_money);
    DepartmentForm.append("discount_percent", departmenter.discount_percent);
    DepartmentForm.append("over_money", departmenter.over_price_money);
    DepartmentForm.append("over_percent", departmenter.over_price_percent);
    DepartmentForm.append("user", user().id);
    serverIP &&
      axios.post(`${serverIP}api/prescription/`, DepartmentForm).then((res) => {
        setPrescription(res.data);
        toast.success("موفقانه بود");
        setMedicineOpener(new Date());
      });
  };

  const { mutateAsync: updatePrescription } = useMutation({
    mutationFn: async (data) => {
      if (data.get("department") != prescription.department) {
        try {
          const res = await axios.get(
            `${serverIP}api/department/${data.get("department")}/`
          );
          data.set("discount_money", res.data.discount_money);
          data.set("discount_percent", res.data.discount_percent);
          data.set("over_money", res.data.over_price_money);
          data.set("over_percent", res.data.over_price_percent);
        } catch (error) {
          console.error("Error fetching department data:", error);
        }
      }
      await patchDataFn(data, `prescription/${prescription.id}/`);
    },
    onSuccess: (data) =>
      successFn("", () => {
        update();
      }),
  });

  const { mutateAsync: prescriptionThroughPost } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription-through/"),
    onSuccess: () => {
      successFn("", () => {});
    },
  });

  const { mutateAsync: duplicatePrescription } = useMutation({
    mutationFn: (data) => {
      data.delete("purchase_payment_date");
      data.delete("revenue");
      data.delete("order_user");
      return postDataFn(data, "prescription/");
    },
    onSuccess: (res) => {
      successFn("", () => {
        setPrescription(res);
        prescriptionThrough?.map((item) => {
          const PrescriptionThroughForm = new FormData();
          PrescriptionThroughForm.append("quantity", item.quantity);
          PrescriptionThroughForm.append("each_price", item.each_price);
          PrescriptionThroughForm.append("medician", item.medician);
          PrescriptionThroughForm.append("prescription", res.id);
          PrescriptionThroughForm.append("user", user().id);
          prescriptionThroughPost(PrescriptionThroughForm);
        });
      });
    },
  });

  const DeleterWithAlert = () => {
    AlertModalRef.current.Opener();
  };

  const { refetch: deletePrescription } = useQuery({
    queryKey: [`prescription-through/delete/?prescription=${prescription?.id}`],
    enabled: false,
    onSuccess: () => successFn("", () => {}),
  });

  const { refetch: prescriptionThroughSearch } = useQuery({
    queryKey: [`prescription-through/?prescription=${prescription?.id}`],
    enabled: false,
  });

  useEffect(() => {
    if (prescriptionSelected.prescription_number) {
      setPrescription(prescriptionSelected);
    }
  }, [prescriptionSelected]);

  const { refetch: prescriptionSearch } = useQuery({
    queryKey: ["prescription/?prescription_number=" + searchNumber],
    enabled: false,
    onSuccess: (data) => {
      setPrescription(data[0] ? data[0] : []);
      prescription.id && prescriptionThroughSearch();
    },
  });

  const ListRef = useRef(null);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const AlertModalRef = useRef(null);
  const HisotryModalRef = useRef(null);

  const historyStatus = (historyAction) => {
    if (historyAction == 0) {
      return "history-create";
    }
    if (historyAction == 1) {
      return "history-update";
    }
    if (historyAction == 2) {
      return "history-delete";
    } else return "";
  };
  const historyStatusNaming = (historyAction) => {
    if (historyAction == 0) {
      return "جدید";
    }
    if (historyAction == 1) {
      return "آپدیت";
    }
    if (historyAction == 2) {
      return "حذف";
    } else return "نامشخص";
  };

  function changesToArray(changes) {
    const changesArray = [];

    Object.entries(changes).forEach(([key, value]) => {
      let oldValue = value;
      let newValue = null;

      if (Array.isArray(value)) {
        [oldValue, newValue] = value;
      }

      changesArray.push({
        field: key,
        oldValue: oldValue === "None" ? null : oldValue,
        newValue: newValue === "None" ? null : newValue,
      });
    });
    return changesArray;
  }

  const ChangeToPersian = (fieldName) => {
    if (fieldName == "prescription_through") {
      return "دارو";
    }
    if (fieldName == "doctor") {
      return "داکتر";
    }
    if (fieldName == "name") {
      return "مریض";
    }
    if (fieldName == "discount_money") {
      return "تخفیف";
    }
    if (fieldName == "discount_percent") {
      return "%تخفیف";
    }
    if (fieldName == "over_money") {
      return "اضافه_قیمت";
    }
    if (fieldName == "over_percent") {
      return "اضافه_قیمت%";
    }
    if (fieldName == "zakat") {
      return "زکات";
    }
    if (fieldName == "khairat") {
      return "خیرات";
    }
    if (fieldName == "sold") {
      return "پرداخت";
    }
    if (fieldName == "purchased_value") {
      return "مبلغ_پرداخت";
    }
    if (fieldName == "revenue") {
      return "صندوق";
    }
    if (fieldName == "order_user") {
      return "هدایت";
    } else return "نامشخص";
  };

  const handleSearchChange = (e) => {
    const rawValue = e.target.value.replace(/_/g, ""); // Remove underscores
    setSearchNumber(rawValue);
  };
  return (
    <>
      <SmallModal
        title={"تاریخچه نسخه"}
        ref={HisotryModalRef}
        ModalStyle={ModalBiggerSmallStyles}
      >
        <div className="history-modal-container">
          <div className="history-header">
            <h5>No.</h5>
            <h5>زمان</h5>
            <h5>کاربر</h5>
            <h5>عملیات</h5>
            <h5>نوعیت</h5>
            <h5>تغییرات</h5>
          </div>
          <div className="history-map-container">
            {prescription?.history?.map((history, num) => (
              <div
                className={`history-change-item ${historyStatus(
                  history.action
                )}`}
              >
                <h5>{num + 1}</h5>
                <div>
                  <h6>{moment(history?.date).format("jYYYY-jMM-jDD")}</h6>
                  <h6 style={{ direction: "ltr" }}>
                    {moment(history?.date).format("hh:mm A")}
                  </h6>
                </div>
                <h5>{history.user_name}</h5>
                <h5>{historyStatusNaming(history.action)}</h5>
                <h5>
                  {changesToArray(history?.changes)?.map((change) => (
                    <div>{ChangeToPersian(change?.field)}</div>
                  ))}
                </h5>

                <h5
                  style={{
                    direction: "ltr",
                    textAlign: "left",
                    paddingLeft: "0.5rem",
                  }}
                >
                  {changesToArray(history?.changes)?.map((change) =>
                    change.field != "prescription_through" ? (
                      <div style={{ direction: "ltr" }}>
                        {(change.oldValue ? change.oldValue : "") +
                          " > " +
                          (change.newValue ? change.newValue : "Empty")}
                      </div>
                    ) : history.action == 2 ? (
                      <div style={{ direction: "ltr" }}>
                        {change.oldValue?.old?.medician_name}
                      </div>
                    ) : history.action == 0 ? (
                      <div style={{ direction: "ltr" }}>
                        <div>{change.oldValue?.new?.medician_name}</div>
                        <div>{"> " + change.oldValue?.new?.quantity}</div>
                      </div>
                    ) : (
                      <div style={{ direction: "ltr" }}>
                        {change.oldValue?.old?.medician_name !=
                          change.oldValue?.new?.medician_name && (
                          <>
                            <div>{change.oldValue?.old?.medician_name}</div>
                            <div>
                              {"> " + change.oldValue?.new?.medician_name}
                            </div>
                          </>
                        )}
                        {change.oldValue?.old?.quantity !=
                          change.oldValue?.new?.quantity && (
                          <>
                            <div>{change.oldValue?.new?.medician_name}</div>
                            <div className="flex">
                              <div>تعداد</div>
                              <div>
                                {change.oldValue?.old?.quantity}{" "}
                                {"> " + change.oldValue?.new?.quantity}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </SmallModal>
      <AlertModal
        errorText={"آیا موافق با حذف این نسخه هستید؟"}
        errorTitle={"حذف نسخه"}
        OkFunc={() => {
          deletePrescription();
        }}
        NoFunc={() => {
          AlertModalRef.current.Closer();
        }}
        ref={AlertModalRef}
      ></AlertModal>
      <div
        className="more-less-button"
        onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}
      >
        {showPrescriptionForm ? ">" : "<"}
      </div>
      {showPrescriptionForm ? (
        <form
          className="prescription-prescription"
          onSubmit={handleSubmit((data) =>
            handleFormData(
              data,
              prescription?.id ? updatePrescription : newPrescription,
              user
            )
          )}
        >
          <label>نوعیت:</label>
          <select {...register("department")} autoFocus>
            <option value={prescription?.department} selected>
              {prescription?.department_name}
            </option>
            {department?.map((depart) => (
              <option value={depart.id}>{depart.name}</option>
            ))}
          </select>
          <label>شماره:</label>
          <div className="flex_pres">
            <input
              required
              type="text"
              {...register("prescription_number")}
              value={prescription?.prescription_number}
              disabled
            />
            <button
              className="search-button-box shadow-drop-center"
              onClick={(e) => {
                e.preventDefault();
                HisotryModalRef.current.Opener();
              }}
            >
              <i class="fa-solid fa-history"></i>
            </button>
          </div>
          <label>جستجو:</label>
          <div className="flex">
            <form className="search-form">
              <InputMask
                mask="9999-99-999999"
                placeholder="0000-00-0000"
                value={searchNumber}
                onChange={(e) => handleSearchChange(e)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    id="search-number"
                    className="search-input"
                  />
                )}
              </InputMask>
              <SearchButton Func={() => prescriptionSearch()} />
            </form>
          </div>
          <label>نام مریض:</label>
          <ControlledSelect
            control={control}
            name="name"
            options={patient}
            placeholder=""
            getOptionLabel={(option) => option.code_name}
            getOptionValue={(option) => option.code_name}
            uniqueKey={`patient-unique${prescription?.id}`}
            defaultValue={
              patient?.find((c) =>
                c.id === prescription?.name ? c.code_name : ""
              ) || new Date()
            }
            NewComponent={
              <SellingLists
                title="لست ها"
                activeKey="patient"
                ref={ListRef}
                button="plus"
              />
            }
          />
          <label>نام داکتر:</label>
          <ControlledSelect
            control={control}
            name="doctor"
            options={doctor}
            placeholder=""
            getOptionLabel={(option) => option.code_name}
            getOptionValue={(option) => option.code_name}
            uniqueKey={`doctor-unique${prescription?.id}`}
            defaultValue={
              doctor?.find((c) =>
                c.id === prescription?.doctor ? c.code_name : ""
              ) || new Date()
            }
            NewComponent={
              <SellingLists
                title="لست ها"
                activeKey="doctor"
                ref={ListRef}
                button="plus"
              />
            }
          />
          <label>عکس:</label>
          <MultiplePrescriptionImage />
          <label>تخفیف:</label>
          <div className="flex">
            <input type="text" {...register("discount_money")} />
            <label>%:</label>
            <input type="text" {...register("discount_percent")} />
          </div>
          <label>اضافه_قیمت</label>
          <div className="flex">
            <input type="text" {...register("over_money")} />
            <label>%:</label>
            <input type="text" {...register("over_percent")} />
          </div>
          <div></div>
          <div></div>
          <label>زکات:</label>
          <input type="text" {...register("zakat")} />

          <label>خیرات:</label>
          <input type="text" {...register("khairat")} />
          <div></div>
          {(prescription?.id || departmenter?.id) && (
            <ButtonGroup>
              {prescription?.id && (
                <FormButton
                  Func={() => {
                    deletePrescription();
                  }}
                  name="حذف"
                  className="alert-button"
                />
              )}
              {prescription?.id && (
                <FormButton
                  Func={() => {
                    handleFormData(
                      {
                        ...prescription,
                        image: "",
                        doctor: "",
                        name: "",
                        sold: false,
                      },
                      duplicatePrescription,
                      user
                    );
                  }}
                  name="کپی"
                />
              )}
              {departmenter?.id && (
                <FormButton
                  Func={handleSubmit((data) =>
                    handleFormData(data, newPrescription, user)
                  )}
                  name="جدید"
                />
              )}
              {prescription?.id && (
                <SubmitButton name={prescription?.id ? "آپدیت" : "ذخیره"} />
              )}
            </ButtonGroup>
          )}
        </form>
      ) : (
        <form
          className="prescription-prescription"
          onSubmit={handleSubmit((data) =>
            handleFormData(
              data,
              prescription?.id ? updatePrescription : newPrescription,
              user
            )
          )}
        >
          <label>نوعیت:</label>
          <select {...register("department")} autoFocus>
            <option value={prescription?.department} selected>
              {prescription?.department_name}
            </option>
            {department?.map((depart) => (
              <option value={depart.id}>{depart.name}</option>
            ))}
          </select>
          <label>شماره:</label>
          <div className="flex_pres">
            <input
              required
              type="text"
              {...register("prescription_number")}
              value={prescription?.prescription_number}
              disabled
            />
            <button
              className="search-button-box shadow-drop-center"
              onClick={(e) => {
                e.preventDefault();
                HisotryModalRef.current.Opener();
              }}
            >
              <i class="fa-solid fa-history"></i>
            </button>
          </div>
          <label>جستجو:</label>
          <div className="flex">
            <form className="search-form">
              <InputMask
                mask="9999-99-999999"
                placeholder="0000-00-0000"
                value={searchNumber}
                onChange={(e) => handleSearchChange(e)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    id="search-number"
                    className="search-input"
                  />
                )}
              </InputMask>
              <SearchButton Func={() => prescriptionSearch()} />
            </form>
          </div>
        </form>
      )}
    </>
  );
}

export default PrescriptionForm;
