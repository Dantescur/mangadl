import { PDFDocument } from "pdf-lib";

const pdfLibWrapper = {
  async create() {
    try {
      return await PDFDocument.create();
    } catch (error) {
      throw new Error(`PDF-lib error during document creation: ${error.message}`);
    }
  },
  async embedImage(document, imageBytes) {
    try {
      return await document.embedPng(imageBytes);
    } catch (error) {
      throw new Error(`PDF-lib error during image embeding: ${error.message}`);
    }
  },
  async addPage(document, width, height) {
    try {
      return document.addPage([width, height]);
    } catch (error) {
      throw new Error(`PDF-lib error during page addition: ${error.message}`);
    }
  }
}

export default pdfLibWrapper;
