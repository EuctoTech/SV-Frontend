import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../MangerUser/UsersStyles.css";

export default function ImageModal({ modalStatus, handleModal }) {
  const getFileExtension = (url) => {
    const match = url.match(/\.\w+$/); // Matches the last ".something"
    return match ? match[0] : null; // Returns the matched extension or null
  };

  // Example
  const url = modalStatus.image;
  const fileExtension = getFileExtension(url);

  // Download functionality
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = modalStatus.image;
    link.download = modalStatus.studentName; // Set the default name for the file
    link.click();
  };
  const renderFilePreview = (file) => {
    if (file.type === "image") {
      return (
        <img
          src={file.image}
          alt="No Photo.."
          style={{ maxWidth: "25%", height: "auto" }}
        />
      );
    }
    //  else if (file.type === "application") {
    //   return (
    //     <iframe
    //       src={file.image}
    //       style={{ width: "100%", height: "500px" }}
    //       title="Document"
    //     ></iframe>
    //   );
    // }
    else if (file.image.match("http")) {
      return (
        <div>
          <img
            src={file.image}
            alt="No Photo.."
            style={{ maxWidth: "50%", height: "auto" }}
          />
          <p
            className="new-tab-style"
            onClick={() => window.open(file.image, "_blank")}
          >
            <span>&#9755;</span> Open new tab
          </p>
        </div>
      );
    } else {
      <p className="text-center">No Documents</p>;
    }
  };

  return (
    <div>
      <Modal
        show={modalStatus.modalOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header className="border-0">
          <div className="w-100 text-center">
            <Modal.Title id="contained-modal-title-vcenter">
              {modalStatus.title}
            </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body>
          {modalStatus?.image ? (
            <div>
              <div className="text-center">
                {modalStatus.image ? (
                  renderFilePreview(modalStatus)
                ) : (
                  <p>No file selected</p>
                )}
              </div>
              {/* {fileExtension && (
                <div className="text-center py-3">
                  <Button onClick={downloadImage}>Download File</Button>
                </div>
              )} */}
            </div>
          ) : (
            <p className="text-center">No Documents</p>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            onClick={() =>
              handleModal({
                image: "",
                type: "",
                modalOpen: false,
                title: "",
                studentName: "",
              })
            }
            variant="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
