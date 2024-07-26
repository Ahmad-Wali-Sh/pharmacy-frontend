import React, { useEffect, useRef, useState } from "react";
import FilterModal from "../../PageComponents/Modals/FilterModal";
import InfoModal from "../../PageComponents/Modals/InfoModal";
import useServerIP from "../../services/ServerIP";
import { useQuery } from "react-query";
import { FormButton, InfoButton } from "../../PageComponents/Buttons/Buttons";
import { useForm } from "react-hook-form";
import ControlledSelect from "../../PageComponents/ControlledSelect";
import SellingLists from "../../PageComponents/Lists/SellLists/SellingLists";
import axios from "axios";
import Prescription from "../../Sell/Prescription/Prescription/Prescription";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";

function Prescriptions() {
  const FilterModalRef = useRef(null);
  const InfoModalRef = useRef(null);

  const { serverIP } = useServerIP();

  const { data: patients } = useQuery(["patient/"]);
  const [orderUsers, setUsers] = useState([]);

  useEffect(() => {
    serverIP && axios.get(serverIP + "auth/users/").then((res) => {
      setUsers(res?.data);
    });
  }, [serverIP]);
  const { data: doctors } = useQuery(["doctor/"]);
  const { register, watch, control } = useForm({
    defaultValues: {
      prescription_number: "",
      department: "",
      patinet: "",
      doctor: "",
      order_user: "",
      zakat: "",
      khairat: "",
      created_before: "",
      created_after: "",
    },
  });

  const [filter, setFilter] = useState({
    page: 1,
    department: "",
    prescription_number: "",
    patinet: "",
    doctor: "",
    order_user: "",
    zakat: "",
    khairat: "",
    created_before: "",
    created_after: "",
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      department: watch("department"),
    }));
    setFilter((prev) => ({
      ...prev,
      prescription_number: watch("prescription_number"),
    }));
    setFilter((prev) => ({
      ...prev,
      patinet: watch("patinet"),
    }));
    setFilter((prev) => ({
      ...prev,
      doctor: watch("doctor"),
    }));
    setFilter((prev) => ({
      ...prev,
      order_user: watch("order_user"),
    }));
    setFilter((prev) => ({
      ...prev,
      zakat: watch("zakat"),
    }));
    setFilter((prev) => ({
      ...prev,
      khairat: watch("khairat"),
    }));
    setFilter((prev) => ({
      ...prev,
      created_after: watch("created_after"),
    }));
    setFilter((prev) => ({
      ...prev,
      created_before: watch("created_before"),
    }));
  }, [
    watch("department"),
    watch("prescription_number"),
    watch("patinet"),
    watch("doctor"),
    watch("order_user"),
    watch("zakat"),
    watch("khairat"),
    watch("created_before"),
    watch("created_after"),
  ]);
  let query = `department=${filter.department}&created_before=${filter.created_before}&created_after=${filter.created_after}&prescription_number=${filter.prescription_number}&name=${filter.patinet}&doctor=${filter.doctor}&order_user=${filter.order_user}&zakat=${filter.zakat}&khairat=${filter.khairat}`

  const { data: prescriptions } = useQuery({
    queryKey: [
      `prescription-pg/?page=${filter?.page}&` + query
    ],
  });
  const { data: departments } = useQuery({
    queryKey: [`department/`],
  });


  const ModalFilterStyles = {
    content: {
      backgroundColor: "var(--bg-200)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      width: "65%",
      left: "20%",
      height: "36rem",
      top: "15%",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
      textAlign: "center",
    },
  };

  const ExcelExport = () => {
    toast.warning('فایل در حال ذخیره سازی است')
    axios({
      url: `${serverIP}api/prescription-excel/?` + query + "&format=xml",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      toast.success('تکمیل شد')
      fileDownload(response.data, `prescriptions.xml`);
    });
  };
  return (
    <>
      <FilterModal
        ref={FilterModalRef}
        ModalStyle={ModalFilterStyles}
        title={"فلترنگ حواله های خروجی"}
      >
        <>
          <div className="entrances-filter-modal-container ">
            <div>
              <label>نوعیت:</label>
              <select autoFocus {...register("department")}>
                <option value=""></option>
                {departments?.map((depart) => (
                  <option value={depart.id}>{depart.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>شماره:</label>
              <input type="text" {...register("prescription_number")} />
            </div>
            <div>
              <label>مریض:</label>
              <ControlledSelect
                control={control}
                name="patinet"
                options={patients}
                placeholder=""
                getOptionLabel={(option) => option.code_name}
                getOptionValue={(option) => option.code_name}
                uniqueKey={`patient-unique${filter?.patinet}`}
                defaultValue={
                  patients?.find((c) =>
                    c.id === filter?.patinet ? c.code_name : ""
                  ) || new Date()
                }
              />
            </div>
            <div>
              <label>داکتر:</label>
              <ControlledSelect
                control={control}
                name="doctor"
                options={doctors}
                placeholder=""
                getOptionLabel={(option) => option.code_name}
                getOptionValue={(option) => option.code_name}
                uniqueKey={`doctor-unique${filter?.doctor}`}
                defaultValue={
                  doctors?.find((c) =>
                    c.id === filter?.doctor ? c.code_name : ""
                  ) || new Date()
                }
              />
            </div>
            <div>
              <label>هدایت:</label>
              <ControlledSelect
                control={control}
                name="order_user"
                options={orderUsers}
                placeholder=""
                getOptionLabel={(option) => option?.first_name}
                getOptionValue={(option) => option?.first_name}
                uniqueKey={`order_user${filter?.order_user}${orderUsers}`}
                defaultValue={
                  orderUsers?.find((c) =>
                    c.id == filter?.order_user
                      ? c.first_name 
                      : ""
                  ) || new Date()
                }
              />
            </div>
            <div>
              <label>زکات:</label>
              <input type="text" {...register("zakat")} />
            </div>
            <div>
              <label>تخفیف:</label>
              <input type="text" {...register("khairat")} />
            </div>
            <div>
              <label>از_تاریخ:</label>
              <input type="date" {...register("created_after")} />
            </div>
            <div>
              <label>تا_تاریخ:</label>
              <input type="date" {...register("created_before")} />
            </div>
          </div>
          <div className="divider-info">
            <hr />
            <h4>خلاصه گزارش حواله های خروجی</h4>
            <hr />
          </div>
          <div className="info-filter-modal-container">
            <div>
              <label>تعداد:</label>
              <input type="text" disabled value={prescriptions?.count} />
            </div>
            <div>
              <label>مجموع قیمت:</label>
              <input type="text" disabled value={Number(prescriptions?.total_grand_total) + Number(prescriptions?.total_to_sell)} />
            </div>
            <div>
              <label>مجموع پرداختی:</label>
              <input type="text" disabled value={prescriptions?.total_grand_total} />
            </div>
            <div>
              <label>قابل پرداخت:</label>
              <input type="text" disabled value={prescriptions?.total_to_sell} />
            </div>
            <div>
              <label>مجموع زکات:</label>
              <input type="text" disabled value={prescriptions?.total_zakat} />
            </div>
            <div>
              <label>مجموع خیرات:</label>
              <input type="text" disabled value={prescriptions?.total_khairat} />
            </div>
            <div>
              <label>مجموع تخفیف:</label>
              <input type="text" disabled value={prescriptions?.total_discount_money} />
            </div>
            <div>
              <label>مجموع راند:</label>
              <input type="text" disabled value={prescriptions?.total_rounded_number} />
            </div>
            <div>
              <label>اضافه قیمت:</label>
              <input type="text" disabled value={prescriptions?.total_over_money} />
            </div>
          </div>
          <hr></hr>
          <br></br>
          <FormButton name='Excel' Func={() => {
              ExcelExport()
          }}/>
        </>
      </FilterModal>
      <div
        className="filter-button"
        onClick={() => {
          FilterModalRef.current.Opener();
          InfoModalRef.current.Opener();
        }}
      >
        <i className="fa-solid fa-filter"></i>
      </div>
      <div className="entrances-list-header">
        <h4>ردیف</h4>
        <h4>نوعیت</h4>
        <h4>شماره</h4>
        <h4>مریض</h4>
        <h4>داکتر</h4>
        <h4>هدایت</h4>
        <h4>زکات</h4>
        <h4>خیرات</h4>
        <h4>قیمت_نهایی</h4>
        <h4>بیشتر</h4>
      </div>
      <div className="entrances-list-container">
        {prescriptions?.results?.map((pres, num) => (
          <div className="entrances-list-item">
            <h4>{pres.id}</h4>
            <h4>{pres.department_name}</h4>
            <h4>{pres.prescription_number}</h4>
            <h4>{pres.patient_name}</h4>
            <h4>{pres.doctor_name}</h4>
            <h4>{pres.order_user_name}</h4>
            <h4>{pres.zakat}</h4>
            <h4>{pres.khairat}</h4>
            <h4>{pres.grand_total}</h4>
            <h4>{<Prescription button={1} SelectPrescription={pres} />}</h4>
          </div>
        ))}
      </div>
      <div className="pagination-group-center">
        {prescriptions?.previous && (
          <h4
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                page: parseInt(prev.page) - 1,
              }))
            }
          >
            {"<<"}
          </h4>
        )}
        {prescriptions?.next && (
          <h4
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                page: parseInt(prev.page) + 1,
              }))
            }
          >
            {">>"}
          </h4>
        )}
      </div>
    </>
  );
}

export default Prescriptions;
