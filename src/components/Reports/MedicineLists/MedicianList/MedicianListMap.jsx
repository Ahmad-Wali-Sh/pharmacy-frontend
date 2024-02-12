import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MedicianEntrance from "../../../Medician/MedicianEntrance/MedicianEntrance";
import WebCamModal from "../../../PageComponents/WebCamModal";

async function loadEnvVariables(key) {
  try {
      const response = await fetch('/env.json');
      const data = await response.json();
      return data[key] || null; // Return the value corresponding to the provided key, or null if not found
  } catch (error) {
      console.error('Error loading environment variables:', error);
      return null; // Return null if there's an error
  }
}

function MedicianListMap({ num, country, medician, kind, pharmGroup, AutoReSearch}) {
  const [file, setFile] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [API, setAUTH_URL] = useState('');
  useEffect(() => {
    loadEnvVariables('API')
      .then(apiValue => {
        setAUTH_URL(apiValue);
      })
      .catch(error => {
        console.error('Error loading VITE_API:', error);
      });
  }, []);

  const MEDICIAN_URL = API + '/api/medician/';

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
      <div className="webcam-box-2">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
          handleSubmit(MedicianUpdate)
          AutoReSearch()
          const ImageForm = new FormData()
          ImageForm.append('image', e.target.files[0])
          axios
              .patch(MEDICIAN_URL + medician[num].id + "/", ImageForm)
              .then((res) => {toast.success("Patched Succesufly.")})
        }}
      />
      <WebCamModal medician={medician[num]} setFile={(data) => {
        setFile(data)
        setImagePreview(URL.createObjectURL(data));
          handleSubmit(MedicianUpdate)
          const ImageForm = new FormData()
          ImageForm.append('image', data)
          axios
              .patch(MEDICIAN_URL + medician[num].id + "/", ImageForm)
              .then(() => {})
        }}/>
        </div>
      <img
        src={
          imagePreview
            ? imagePreview
            : medician[num].image
            ? new URL(medician[num].image).pathname.slice(16)
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
