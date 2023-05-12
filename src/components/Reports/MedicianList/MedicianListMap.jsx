import React from "react";
import { useForm } from "react-hook-form";

function MedicianListMap({ num, country, medician, kind, pharmGroup }) {
  const [file, setFile] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="medician-list-map">
      <h3>{num + 1}</h3>
      <input type="text" defaultValue={medician.brand_name} />
      <input type="text" defaultValue={medician.ml} />
      <input type="text" defaultValue={medician.location} />
      <input type="text" defaultValue={medician.kind} />
      <input type="text" defaultValue={medician.pharm_group} />

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <img
        src={imagePreview ? imagePreview : ""}
        alt="No Photo"
        className="medician-image-preview"
      />

      <div className="medician-map-buttons">
        <div>
          <i className="fa-solid fa-trash"></i>
        </div>
        <div>
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default MedicianListMap;
