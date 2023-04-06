import React from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import Cropper from "react-easy-crop";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import img from "../assests/crop.png";

function ImageCropper({ image, setCroppedArea, setImgData, onCrop }) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const onCropComplete = (roppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  return (
    <div>
      <Modal centered size="lg" isOpen={!!image}>
        <ModalHeader style={{ padding: "1rem 1rem 0 1rem" }}>
          <div class="d-flex justify-content-center align-items-center">
            <div
              class="bg-black-50 rounded-circle object-fit-content mr-2"
              style={{
                borderRadius: "50% !important",
                background: "#0002",
                display: "flex",
                width: "2.2rem",
                height: "2.2rem",
              }}
            >
              <img src={img} class="mr-1 w-50 m-auto" />
            </div>
            <div>Crop Image</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="position-relative" style={{ height: "50vh" }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={9 / 8}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid={false}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div class="d-flex justify-content-between w-100">
            <div class="d-flex align-items-center">
              <BsDashLg
                className="cr-pt"
                onClick={() => setZoom((perv) => (perv > 1 ? perv - 1 : perv))}
              />
              <RangeSlider
                value={zoom}
                onChange={(changeEvent) => setZoom(changeEvent.target.value)}
                min={1}
                max={6}
                step={1}
                tooltip="off"
                className="px-2"
              />
              <BsPlusLg
                className="cr-pt"
                onClick={() => setZoom((perv) => (perv < 6 ? perv + 1 : perv))}
              />
            </div>
            <div>
              <button
                type="button"
                class="discard btn btn-default btn_round cr-pt"
                data-toggle="modal"
                data-target="#discard_modal"
                onClick={() => setImgData(null)}
              >
                Cancel
              </button>
              <span onClick={onCrop} class={`btn btn-primary btn_round cr-pt pl-4 pr-4`}>
                Crop
              </span>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ImageCropper;
