import * as cheerio from "cheerio";

export default {
  load(html) {
    return cheerio.load(html);
  },
};
