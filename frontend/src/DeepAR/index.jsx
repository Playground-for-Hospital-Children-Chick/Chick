// import { DeepAR } from "deepar";
import deeparWasm from "deepar/wasm/deepar.wasm";

import React, { useEffect, useRef } from "react";

function DeepARScreen() {
  const { DeepAR } = window;

  const canvasRef = useRef(null);

  useEffect(() => {
    const deepAR = new DeepAR({
      canvasWidth: 500,
      canvasHeight: 500,
      licenseKey:
        "17b3582869e511e992581d53ee247344cfe4ea5b2787852672d14e03a419c3a887dafb093b8aa3ea",
      canvas: canvasRef.current,
      deeparWasmPath: deeparWasm,
      numberOfFaces: 1,
      libPath: "/lib",
      segmentationInfoZip: "segmentation.zip",
      onInitialize: () => {
        deepAR.startVideo(true);
        deepAR.switchEffect(0, "slot", "/effects/flowers", () => {
          console.log("flower loaded");
        });
      },
    });

    deepAR.downloadFaceTrackingModel("/lib/models-68-extreme.bin");
  }, [DeepAR]);

  return (
    <>
      <canvas ref={canvasRef} />;
    </>
  );
}

export default DeepARScreen;
