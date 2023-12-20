import axiosWrapper from "../src/utils/axiosWrapper.js";

test("axiosWrapper.search should return search results", async () => {
  const searchResults = await axiosWrapper.search("Isekai");
  expect(searchResults).toBeDefined();
});

test("axiosWrapper.downloadByUrl should download content by URL", async () => {
  const downloadResult = await axiosWrapper.downloadByUrl(
    "https://visortmo.com/library/manga/53635/isekai-ni-kyuseishu-to-shite-yoba-remashitaga-arasa-ni-wa-murinanode-hissori-book-cafe-kajimemashita",
  );
  expect(downloadResult).toBeDefined();
});
