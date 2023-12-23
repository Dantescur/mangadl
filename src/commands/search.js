import inquirer from "inquirer";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import axiosWrapper from "../utils/axiosWrapper.js";


function parseHTML(html) {

  const $ = cheerio.load(html);
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
  return mangaList;
}

export default function registerSearchCommand(program) {
  program
    .command("search")
    .description("Search for manga")
    .option("-m, --manga <name>", "Manga name to search")
    .action(async (options) => {
      const mangaName = options.manga;

      const htmlContent = await axiosWrapper.search(mangaName);

      const mangaList = parseHTML(htmlContent);

      const choices = mangaList.map((manga, index) => ({
        name: `${manga.title} - Score: ${manga.score} - Genre: ${manga.genre}`,value: index,
      }));

      const answers = await inquirer
        .prompt([
          {
            type: "list",
            name: "selectedManga",
            message: "Select a manga",
            choices: choices,
          },
        ]);
        
      const selectedIndex = answers.selectedManga;
      const selectedManga = mangaList[selectedIndex];
     
      const browser = await puppeteer.launch({headless: 'new', executablePath: '/usr/bin/chromium-browser', args:['--no-sandbox']});
      const page = await browser.newPage();
      console.log(selectedManga.url)

        await page.goto(selectedManga.url, {timeout:0});

      const chaptersHtml = await page.evaluate(() => {
        return document.querySelector('#chapters').innerHTML;
      });
      const cheerioChapters = cheerio.load(chaptersHtml, { xmlMode: false, decodeEntities: false});
      const chaptersLink = cheerioChapters('.list-group-item h4').map((index, element) => cheerioChapters(element).text().trim()).get();

        console.log(chaptersLink);
      console.log(chaptersLink.length)

      await browser.close()
      }
    )}

