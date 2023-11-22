import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteDataFn, postDataFn, successFn } from "../services/API";
import { useEntrance } from "../States/States";
import SmallModal from "./Modals/SmallModal";
import WebCamModal from "./WebCamModal";

function MultipleImage() {
  const MultipleImageRef = useRef(null);
  const { entrance, setEntrance } = useEntrance();
  const { refetch: entranceRefetch } = useQuery(`entrance/${entrance?.id}`, {
    onSuccess: (data) => setEntrance(data),
    enabled: false,
  });
  const [image, setImage] = useState("");

  const { mutate: newImage } = useMutation({
    mutationFn: () => {
      const ImageForm = new FormData();
      ImageForm.append("entrance", entrance?.id);
      ImageForm.append("image", image);
      postDataFn(ImageForm, "entrance-image/");
    },
    onSuccess: () => {
      successFn("", () => {
        setTimeout(() => {
          entranceRefetch();
        }, 200)
        setImage("");
      });
    },
  });
  const { mutate: deleteImage } = useMutation({
    mutationFn: (data) => {
      deleteDataFn(`entrance-image/${data?.id}`);
    },
    onSuccess: () => {
      successFn("", () => {
        setTimeout(() => {
          entranceRefetch();
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
        className="multiple-image-button"
        onClick={() => MultipleImageRef.current.Opener()}
      >
        مشخصات تصویر
      </div>
      <SmallModal title="مشخصات تصویر" ref={MultipleImageRef}>
        <div className="multiple-image-modal">
          <div className="multiple-image-webcam">
            <WebCamModal
              medician={entrance?.id}
              setFile={(data) => {
                setImage(data);
              }}
            />
          </div>
          <div className="multiple-image-browse">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="multiple-image-list">
            {entrance?.entrance_image?.map((image, num) => (
              <div
                style={{
                  display: "flex",
                  direction: "rtl",
                  alignItems: "center",
                  padding: "0.2rem",
                }}
              >
                <a
                  className="multiple-image-item"
                  target="_blank"
                  href={image?.image?.slice(16)}
                >
                  <h6>{num + 1}</h6>
                  <h6>{image?.image?.slice(39)}</h6>
                  <img
                    className="multiple-image-image"
                    src={image?.image?.slice(16)}
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

export default MultipleImage;
