import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ fileUrl }) => {
  if (!fileUrl) {
    return <div>No PDF file selected</div>;
  }
  console.log("File URL: ", fileUrl);

  return (
    <div style={{ height: "750px" }}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={fileUrl} />
      </Worker>
    </div>
  );
};

export default PdfViewer;