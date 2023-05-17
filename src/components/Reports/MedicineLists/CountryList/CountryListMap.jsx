import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function CountryListMap({ kind, num, Update }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");

  const KIND_URL = import.meta.env.VITE_COUNTRY;

  const UpdateKindList = (data) => {
    console.log(file);
    const KindForm = new FormData();
    KindForm.append(
      "name",
      data.name ? data.name : kind.name
    );
    {
      file && KindForm.append("image", file);
    }
    axios
      .patch(KIND_URL + kind.id + "/", KindForm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const DeleteKind = () => {
    axios
      .delete(KIND_URL + kind.id + "/")
      .then((res) => {
        console.log(res);
        Update();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="kind-list-map" onBlurCapture={handleSubmit(UpdateKindList)}>
      <h3>{num + 1}</h3>
      <input
        type="text"
        defaultValue={kind.name}
        {...register("name")}
      />
      <div></div>
      <input
        type="file"
        {...register("image")}
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <div></div>
      <img
        src={imagePreview ? imagePreview : kind.image && new URL(kind.image).pathname.slice(16)}
        className="kind-list-image"
        alt="No Photo"
      />
      <div className="medician-map-buttons">
        <div onClick={DeleteKind}>
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default CountryListMap;
