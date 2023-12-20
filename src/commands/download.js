import axiosWrapper from "../utils/axiosWrapper.js";
import pdfLibWrapper from "../utils/pdfLibWrapper.js";

export default function registerDownloadCommand(program) {
  program
    .command("download")
    .description("Download manga")
    .option("-m, --manga <name>", "Manga name to download")
    .option("-c, --chapter <number>", "Chapter number to download")
    .action(async (options) => {
      const mangaName = options.manga;
      const chapterNumber = options.chapter;
    });
}
