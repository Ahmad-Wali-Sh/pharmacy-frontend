import React from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EntrancThroughEntry ({ through, keyValue, num, SearchSubmit, allMedician }) {


    const ENTRANCE_THROUGH_URL = import.meta.env.VITE_ENTRANCE_THROUGH;
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const MedicianUpdate = (data) => {
      const MedicianUpdateForm = new FormData();
      MedicianUpdateForm.append("number_in_factor", data.number_in_factor);
      MedicianUpdateForm.append(
        "each_price_factor",
        data.each_price_factor
      );
      MedicianUpdateForm.append("each_quantity", data.each_quantity);
      MedicianUpdateForm.append("discount_money", data.discount_money);
      MedicianUpdateForm.append("discount_percent", data.discount_percent);
      MedicianUpdateForm.append("expire_date", data.expire_date);
      MedicianUpdateForm.append("interest_money", data.interest_money);
      MedicianUpdateForm.append("interest_percent", data.interest_percent);
      MedicianUpdateForm.append("bonus", data.bonus);
      MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);
  
      axios
        .patch(
          ENTRANCE_THROUGH_URL + keyValue + "/",
          MedicianUpdateForm
        )
        .then(() => toast.success("Data Updated Successfuly."))
        .catch(() => toast.error("Check Your Input And Try Again!"));
    };
  
    const MedicianDelete = (data) => {
      console.log(data);
      axios
        .delete(ENTRANCE_THROUGH_URL + keyValue + "/")
        .then(() => {
          toast.success("Deleted Successfuly!")
          handleSubmit(SearchSubmit)
      })
        .catch((e) => {
          toast.error("Can't Delete For Some Reason...");
          console.log(e);
        });
    };
  
    return (
      <form >
        <div className="entrance-medician-map" onBlurCapture={handleSubmit(MedicianUpdate)}>
          <label>{num + 1}</label>
          <h4>
            {allMedician.map((item) =>
              item.id == through.medician ? item.brand_name : " "
            )}
          </h4>
          <input type="text" defaultValue={through.number_in_factor} {...register('number_in_factor')}/>
          <input style={{ display: "none" }} type="text" value={through.id} {...register('entrance_through_id')}/>
          <input type="text" defaultValue={through.each_price_factor} {...register('each_price_factor')}/>
          <input type="text" defaultValue={through.each_quantity} {...register('each_quantity')}/>
          <input type="text" defaultValue={through.discount_money} {...register('discount_money')}/>
          <input type="text" defaultValue={through.discount_percent} {...register('discount_percent')}/>
          <input type="date" defaultValue={through.expire_date} {...register('expire_date')}/>
          <input type="text" defaultValue={through.interest_money} {...register('interest_money')}/>
          <input type="text" defaultValue={through.interest_percent} {...register('interest_percent')}/>
          <input type="text" defaultValue={through.bonus} {...register('bonus')}/>
          <input type="text" defaultValue={through.quantity_bonus} {...register('quantity_bonus')}/>
          <div className="medician-map-buttons">
            <div onClick={handleSubmit(MedicianDelete)}>
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </form>
    );
  }
  

export default EntrancThroughEntry