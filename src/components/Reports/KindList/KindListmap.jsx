import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function KindListmap({ kind, num, Update }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");

  const KIND_URL = import.meta.env.VITE_KIND;

  const UpdateKindList = (data) => {
    console.log(file);
    const KindForm = new FormData();
    KindForm.append(
      "name_english",
      data.name_english ? data.name_english : kind.name_english
    );
    KindForm.append(
      "name_persian",
      data.name_persian ? data.name_persian : kind.name_persian
    );
    {
      file && KindForm.append("image", file);
    }
    {
      data.description && KindForm.append("description", data.description);
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
        defaultValue={kind.name_english}
        {...register("name_english")}
      />
      <input
        type="text"
        defaultValue={kind.name_persian}
        {...register("name_persian")}
      />
      <input
        type="text"
        defaultValue={kind.description}
        {...register("description")}
      />
      <input
        type="file"
        {...register("image")}
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <img
        src={imagePreview ? imagePreview : kind.image && kind.image.slice(38)}
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

export default KindListmap;
