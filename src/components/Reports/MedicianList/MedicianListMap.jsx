import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import MedicianEntrance from "../../Medician/MedicianEntrance/MedicianEntrance";

function MedicianListMap({ num, country, medician, kind, pharmGroup }) {
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
    // MedicianForm.append("geniric_name", data.geniric_name);
    MedicianForm.append("no_pocket", data.no_pocket);
    MedicianForm.append("ml", data.ml);
    // MedicianForm.append("weight", data.no_pocket);
    MedicianForm.append("location", data.location);
    MedicianForm.append("existence", data.existence);
    // MedicianForm.append("company", data.company);
    // MedicianForm.append("minmum_existence", data.minmum_existence);
    // MedicianForm.append("maximum_existence", data.maximum_existence);
    // MedicianForm.append("must_advised", data.must_advised);
    // MedicianForm.append("dividing_rules", data.dividing_rules);
    // MedicianForm.append("price", data.price);
    // MedicianForm.append("generic_name", data.generic_name);
    // MedicianForm.append("cautions", data.cautions);
    // MedicianForm.append("usages", data.usages);
    // MedicianForm.append("description", data.description);
    // MedicianForm.append("barcode", data.barcode);
   { file && MedicianForm.append("image", file);}
    // MedicianForm.append("pharm_group", autoCompleteData.pharm_group.id);
    // MedicianForm.append("kind", autoCompleteData.kind.id);
    // MedicianForm.append("country", autoCompleteData.country.id);

    axios
        .patch(MEDICIAN_URL + medician[num].id + "/", MedicianForm)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
  }

  return (
    <div className="medician-list-map" onBlurCapture={handleSubmit(MedicianUpdate)}>
      <h5>{num + 1}</h5>
      <input type="text" defaultValue={medician[num].brand_name} {...register('brand_name')}/>
      <input type="text" defaultValue={medician[num].ml} {...register('ml')}/>
      <input type="text" defaultValue={medician[num].location} {...register('location')}/>
      <input type="text" defaultValue={medician[num].existence} {...register('existence')}/>
      <input type="text" defaultValue={medician[num].no_pocket} {...register('no_pocket')}/>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <img
        src={imagePreview ? imagePreview : medician[num].image ? medician[num].image.slice(38) : ""}
        alt="No Photo"
        className="medician-image-preview"
      />
      <div className="medician-map-buttons">
        <div>
          <MedicianEntrance button={3} medician={medician[num]}/>
        </div>
        <div>
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default MedicianListMap;
