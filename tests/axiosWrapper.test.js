import axiosWrapper from "../src/utils/axiosWrapper.js";

test('axiosWrapper.search should return search results', async () => {
  const searchResults = await axiosWrapper.search('Isekai');
  expect(searchResults).toBeDefined();
})

test('axiosWrapper.downloadByUrl should download content by URL', async () => {
  const downloadResult = await axiosWrapper.donwloadByUrl('https://visortmo.com/viewer/5eb48f3ac6c5/paginated');
  expect(downloadResult).toBeDefined();
})

