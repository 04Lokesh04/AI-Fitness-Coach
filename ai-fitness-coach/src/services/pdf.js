// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// export async function downloadPDF(id="plans-root") {
//   const el=document.getElementById(id);
//   const canvas = await html2canvas(el,{scale:2});
//   const img=canvas.toDataURL("image/png");
//   const pdf=new jsPDF("p","mm","a4");
//   const width=pdf.internal.pageSize.getWidth();
//   pdf.addImage(img,"PNG",0,0,width,0);
//   pdf.save("plan.pdf");
// }

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../pdf.css"; // ✅ import override

export async function downloadPDF(id="plans-root") {
  const el = document.getElementById(id);
  if (!el) return alert("PDF container not found!");

  // ✅ Add safe-class before capture
  el.classList.add("export-pdf");

  // ✅ Render
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  // ✅ Remove class after capture
  el.classList.remove("export-pdf");

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("FitnessPlan.pdf");
}























// export async function downloadPDF(containerId, filename){
//   const { default: html2canvas } = await import("html2canvas");
//   const { default: jsPDF } = await import("jspdf");
//   const el = document.getElementById(containerId);
//   const canvas = await html2canvas(el, { scale: 2 });
//   const img = canvas.toDataURL("image/png");
//   const pdf = new jsPDF("p","pt","a4");
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();
//   const imgProps = pdf.getImageProperties(img);
//   const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
//   const w = imgProps.width * ratio;
//   const h = imgProps.height * ratio;
//   pdf.addImage(img, "PNG", (pageWidth-w)/2, 20, w, h);
//   pdf.save(filename);
// }
