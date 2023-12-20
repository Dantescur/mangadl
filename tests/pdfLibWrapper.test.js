import pdfLibWrapper from "../src/utils/pdfLibWrapper.js";

test("pdfLibWrapper.create should create a PDF document", async () => {
  const document = await pdfLibWrapper.create();
  expect(document).toBeDefined();
});

test("pdfLibWrapper.embedImage should embed an image into the PDF document", async () => {
  const imageBytes = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVR42mP8/w+dWAE/9k=",
    "base64",
  );
  const document = await pdfLibWrapper.create();
  const image = await pdfLibWrapper.embedImage(document, imageBytes);
  expect(image).toBeDefined();
});

test("pdfLibWrapper.addPage should add a page to the PDF document", async () => {
  const document = await pdfLibWrapper.create();
  const page = await pdfLibWrapper.addPage(document, 600, 800);
  expect(page).toBeDefined();
});
