import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";

const Details = ({ photo, getLabelBGColor }) => {
  const o = useSelector((state) => state.orders.selectedOrder);

  const pdfRef = useRef(); // for pdf

  if (!o) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">No order selected</div>
      </div>
    );
  }
  const slug = o.company.replace(/\s+/g, "_"); // pdf name

  const pdfDownloadFormat = {
    margin: 0.5,
    filename: `${slug}_${o.id}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = pdfDownloadFormat;
    html2pdf().set(opt).from(element).save();
  };
  // console.log(fileName);

  const handlePrintPDF = () => {
    const e = pdfRef.current;
    const option = pdfDownloadFormat;

    html2pdf()
      .set(option)
      .from(e)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const newUrl = pdf.output("bloburl");
        window.open(newUrl, "_blank");
      });
  };

  return (
    <div className="container" ref={pdfRef}>
      {/* Top Row */}
      <div className="row border rounded-3 mt-4 align-items-center ">
        <div className="col-lg-6 pt-3 text-start">
          <h6>
            {o.id}
            <span
              className={`bg-${getLabelBGColor(
                o.status
              )} text-white px-2 rounded-3 ms-2`}
            >
              {o.status}
            </span>
          </h6>
          <p className="mb-0">
            {o.company}
            <a href={`tel:${o.contact.phone}`} className="ms-3 text-primary">
              Contact Person
            </a>
          </p>
        </div>
        <div className="col-lg-6 text-end">
          <button className="btn btn-sm border me-3" onClick={handlePrintPDF}>
            Print
          </button>
          <button className="btn btn-sm border" onClick={handleDownloadPDF}>
            Save as PDF
          </button>
        </div>
      </div>

      {/* Info Row */}
      <div className="row border rounded-3 mt-4 align-items-center ">
        <div className="col-lg-8 pt-3 text-start">
          <div className="row">
            <div className="col-lg-6">
              <b>Placed By</b>
              <p>{o.contact.name}</p>

              <b>Order Date</b>
              <p>{o.contact.email}</p>
            </div>
            <div className="col-lg-6">
              <b>Requester Email ID</b>
              <p>{o.history.oDate}</p>
              <b>Expected Date</b>
              <p>Mar 26, 2024</p> {/* Consider replacing with real date */}
            </div>
          </div>
        </div>

        {/* Photo & Contact */}
        <div className="col-lg-4 text-start">
          <div className="d-flex align-items-center py-3">
            <img
              src={photo}
              alt="Contact"
              height={40}
              className="border rounded-circle me-3"
            />
            <div>
              <p className="mb-0">{o.contact.name}</p>
              <span className="text-success">Primary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
