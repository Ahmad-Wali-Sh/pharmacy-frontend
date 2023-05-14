import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import MedicianEntrance from "../../Medician/MedicianEntrance/MedicianEntrance";

function MedicianListMap({ num, country, medician, kind, pharmGroup, AutoReSearch}) {
  const [file, setFile] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;

  const MedicianUpdate = (data) => {
    const MedicianForm = new FormData();
    MedicianForm.append("brand_name", data.brand_name);
    MedicianForm.append("no_pocket", data.no_pocket);
    MedicianForm.append("ml", data.ml);
    MedicianForm.append("location", data.location);
    MedicianForm.append("existence", data.existence);
    {
      file && MedicianForm.append("image", file);
    }

    axios
      .patch(MEDICIAN_URL + medician[num].id + "/", MedicianForm)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err));

    
  };

  return (
    <div className="medician-list-map">
      <h5>{num + 1}</h5>
      <input
        type="text"
        defaultValue={medician[num].brand_name}
        {...register("brand_name")}
        onBlurCapture={handleSubmit(MedicianUpdate)}
      />
      <input
        type="text"
        defaultValue={medician[num].ml}
        {...register("ml")}
        onBlurCapture={handleSubmit(MedicianUpdate)}
      />
      <input
        type="text"
        defaultValue={medician[num].location}
        {...register("location")}
        onBlurCapture={handleSubmit(MedicianUpdate)}
      />
      <input
        type="text"
        defaultValue={medician[num].existence}
        {...register("existence")}
        onBlurCapture={handleSubmit(MedicianUpdate)}
      />
      <input
        type="text"
        defaultValue={medician[num].no_pocket}
        {...register("no_pocket")}
        onBlurCapture={handleSubmit(MedicianUpdate)}
      />
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
          handleSubmit(MedicianUpdate)

          const ImageForm = new FormData()
          ImageForm.append('image', e.target.files[0])
          axios
              .patch(MEDICIAN_URL + medician[num].id + "/", ImageForm)
              .then(() => {})
        }}
      />
      <img
        src={
          imagePreview
            ? imagePreview
            : medician[num].image
            ? medician[num].image.slice(38)
            : ""
        }
        alt="No Photo"
        className="medician-image-preview"
      />
      <div className="medician-map-buttons">
        <div>
          <MedicianEntrance button={3} medician={medician[num]} />
        </div>
        <div>
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default MedicianListMap;
