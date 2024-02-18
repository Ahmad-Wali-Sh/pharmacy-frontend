import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteDataFn, postDataFn, successFn } from "../services/API";
import { usePrescription } from "../States/States";
import SmallModal from "./Modals/SmallModal";
import WebCamModal from "./WebCamModal";
import useServerIP from "../services/ServerIP";


function MultiplePrescriptionImage() {
  const MultipleImageRef = useRef(null);
  const { prescription, setPrescription } = usePrescription()
  const { refetch: prescriptionRefetch } = useQuery(`prescription/${prescription?.id}/`, {
    onSuccess: (data) => setPrescription(data),
    enabled: false,
  });


  const [image, setImage] = useState("");

  const { serverIP} = useServerIP()

  const { mutate: newImage } = useMutation({
    mutationFn: () => {
      const ImageForm = new FormData();
      ImageForm.append("prescription", prescription?.id);
      ImageForm.append("image", image);
      postDataFn(ImageForm, "prescription-image/");
    },
    onSuccess: () => {
      successFn("", () => {
        setTimeout(() => {
          prescriptionRefetch();
        }, 1000)
        setImage("");
      });
    },
  });
  const { mutate: deleteImage } = useMutation({
    mutationFn: (data) => {
      deleteDataFn(`prescription-image/${data?.id}/`);
    },
    onSuccess: () => {
      successFn("", () => {
        setTimeout(() => {
          prescriptionRefetch();
        }, 200);
      });
    },
  });

  useEffect(() => {
    console.log(image);
    image && newImage();
  }, [image]);

  return (
    <>
      <div
        className={`multiple-image-button ${!prescription?.id && 'disabled-select'}`}
        onClick={() => prescription?.id && MultipleImageRef.current.Opener()}
      >
        <span>تصاویر {prescription?.prescription_image?.length ? '(' + prescription?.prescription_image?.length + ')': ''}</span>
      </div>
      <SmallModal title="تصاویر" ref={MultipleImageRef}>
        <div className="multiple-image-modal">
          <div className="multiple-image-webcam">
            <WebCamModal
              medician={prescription?.id}
              setFile={(data) => {
                setImage(data);
              }}
            />
          </div>
          <div className="multiple-image-browse">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="multiple-image-list">
            {prescription?.prescription_image?.map((image, num) => (
              <div
                style={{
                  display: "flex",
                  direction: "rtl",
                  alignItems: "center",
                  padding: "0.2rem",
                }}
                key={image?.id}
              >
                <a
                  className="multiple-image-item"
                  target="_blank"
                  href={`${serverIP}${image?.image}`}
                >
                  <h6>{num + 1}</h6>
                  <h6>{image?.image.slice(39)}</h6>
                  <img
                    className="multiple-image-image"
                    src={`${serverIP}${image?.image}`}
                  ></img>
                </a>
                <div
                  className="medician-map-buttons"
                  onClick={() => deleteImage(image)}
                >
                  <div>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="submiting-multiple"></div>
        </div>
      </SmallModal>
    </>
  );
}

export default MultiplePrescriptionImage;
