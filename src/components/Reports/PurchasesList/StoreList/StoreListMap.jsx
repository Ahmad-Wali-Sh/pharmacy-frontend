import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function StoreListMap({ kind, num, Update }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");

  const KIND_URL = import.meta.env.VITE_STORE;

  const UpdateKindList = (data) => {
    console.log(file);
    const KindForm = new FormData();
    KindForm.append("name", data.name ? data.name : kind.name);
    KindForm.append("phone", data.phone ? data.phone : kind.phone);
    KindForm.append("address", data.address ? data.address : kind.address);
    KindForm.append(
      "description",
      data.description ? data.description : kind.description
    );
    KindForm.append(
      "responsible",
      data.responsible ? data.responsible : kind.responsible
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
    <div
      className="store-list-map"
      onBlurCapture={handleSubmit(UpdateKindList)}
    >
      <h4>{num + 1}</h4>
      <input type="text" defaultValue={kind.name} {...register("name")} />
      <input type="text" defaultValue={kind.phone} {...register("phone")} />
      <input type="text" defaultValue={kind.address} {...register("address")} />
      <input
        type="text"
        defaultValue={kind.responsible}
        {...register("responsible")}
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
        src={
          imagePreview
            ? imagePreview
            : kind.image && new URL(kind.image).pathname.slice(16)
        }
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

export default StoreListMap;
