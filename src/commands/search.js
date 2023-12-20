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

      const manngaList = [];
      $(".text-truncate").each((index, element) => {
        manngaList.push($(element).text());
      });

      const choices = manngaList.map((title, index) => ({
        name: title,
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
          const selectedMangaTitle = manngaList[selectedIndex];
          console.log(`You selected ${selectedMangaTitle}`);
        });
    });
}
