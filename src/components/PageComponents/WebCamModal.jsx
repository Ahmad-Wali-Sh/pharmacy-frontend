import React from "react";
import Modal from "react-modal";
import Webcam from "react-webcam";

function WebCamModal({ medician, setFile }) {
  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const [WebCamModalOpen, setWebCamModalOpen] = React.useState(false);

  const WebCamOpener = () => {
    setWebCamModalOpen(true);
  };
  const WebCamCloser = () => {
    setWebCamModalOpen(false);
  };

 

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER
};

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);





  return (
    <>
    <button
        onClick={(e) => {
          e.preventDefault();
          WebCamOpener();
        }}
        className="webcam-opener"
      >
        <i class="fa-solid fa-camera"></i>
      </button>
      {WebCamModalOpen && <Modal
        style={ModalStyles}
        isOpen={WebCamModalOpen}
        onRequestClose={WebCamCloser}
      >
        <div className="webcam">
          <Webcam
            screenshotFormat="image/jpeg"
            audio={false}
                    videoConstraints={{
          ...videoConstraints,
          facingMode
        }}
            className="webcam-camera"
          >
            {({ getScreenshot }) => (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    let imageDateUrl = getScreenshot();
                    fetch(imageDateUrl)
                      .then((response) => response.blob())
                      .then((blob) => {
                        const file = new File(
                          [blob],
                            medician
                              ? medician + ".jpeg"
                              : "no_name.jpeg",
                          { type: blob.type }
                        );
                        setFile(file)
                        WebCamCloser();
                      });
                  }}
                  className="screenshot-button"
                >
                  Capture
                </button>
                <button onClick={handleClick}>Switch camera</button>
              </>
            )}
          </Webcam>
        </div>
      </Modal>}
      
    </>
  );
}
export default WebCamModal;
