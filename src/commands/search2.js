import inquirer from "inquirer";
import axiosWrapper from "../utils/axiosWrapper.js";
import cheerioWrapper from "../utils/cheerioWrapper.js";

export default function registerSearchCommand(program) {
  program
    .command("search")
    .description("Search for manga")
    .option("-m, --manga <name>", "Manga name to search")
    .action(async (options) => {
      const mangaName = options.manga;
      const html = await axiosWrapper.search(mangaName);
      const $ = cheerioWrapper.load(html);

      const mangaList = [];
      $(".element").each((index, element) => {
        const title = $(element).find(".text-truncate").text();
        const score = $(element).find(".score").text().trim();
        const genre = $(element).find(".demography").text().trim();
        const url = $(element).find("a").attr("href");

        mangaList.push({
          title: title,
          score: score,
          genre: genre,
          url: url,
        });
      });

      const choices = mangaList.map((manga, index) => ({
        name: `${manga.title} - Score: ${manga.score} - Genre: ${manga.genre}`,
        value: index,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "selectedManga",
            message: "Select a manga",
            choices: choices,
          },
        ])
        .then((answers) => {
          const selectedIndex = answers.selectedManga;
          const selectedManga = mangaList[selectedIndex];
          console.log(
            `You selected ${selectedManga.title} with url ${selectedManga.url}`,
          );
        });
    });
}
