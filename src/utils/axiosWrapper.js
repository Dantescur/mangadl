import axios from "axios";

const axiosWrapper = {
  async search(mangaName, page = 1) {
    try {
      if (mangaName !== "") {
        const encodedMangaName = encodeURIComponent(mangaName);
        const response = await axios.get(
          `https://visortmo.com/library?_pg=${page}&title=${encodedMangaName}`,
        );
        return response.data;
      } else {
        throw new Error("Search query cannot be empty");
      }
    } catch (error) {
      throw new Error(`Axios error: ${error.message}`);
    }
  },
  async downloadByUrl(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Axios error during download: ${error.message}`);
    }
  },
};

export default axiosWrapper;
