// Importar modulos requeridos
import inquirer from "inquirer";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import axiosWrapper from "../utils/axiosWrapper.js";

// Funcion para procesar html y obtenter detalles del manga
function parseHTML(html) {

  const $ = cheerio.load(html);
  const mangaList = [];
  // Hacemos loop por cada elemento con la clase '.element'
  $(".element").each((index, element) => {
    // Extraemos titulo, puntuacion, genero y url
    const title = $(element).find(".text-truncate").text();
    const score = $(element).find(".score").text().trim();
    const genre = $(element).find(".demography").text().trim();
    const url = $(element).find("a").attr("href");

    // Enviamos los detalles extraidos hacia mangaList
    mangaList.push({
      title: title,
      score: score,
      genre: genre,
      url: url,
    });
  });
  return mangaList;
}

// Funcion para registrar el comando 'search'
export default function registerSearchCommand(program) {
  program
    .command("search")
    .description("Search for manga")
    .option("-m, --manga <name>", "Manga name to search")
    .action(async (options) => {
      const mangaName = options.manga;

      // Obtener el contenido html dado un nombre de manga
      const htmlContent = await axiosWrapper.search(mangaName);

      // Procesamos el contenido html obtenido
      const mangaList = parseHTML(htmlContent);

      // Preparamos las opciones para el prompt de inquirer
      const choices = mangaList.map((manga, index) => ({
        name: `${manga.title} - Score: ${manga.score} - Genre: ${manga.genre}`,value: index,
      }));

      // Preguntamos al usuario que seleccione un manga de las choices
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
    
      // IMPORTANTE: Aqui lanzamos un headless browserusando puppeteer (recomiendo borrar executablePath ya que esta configurado especificamente para mi entorno de desarrollo) del metodo .launch
      const browser = await puppeteer.launch({headless: 'new', executablePath: '/usr/bin/chromium-browser', args:['--no-sandbox']});
      const page = await browser.newPage();
      console.log(selectedManga.url)

      // Navegamos a la url del manga seleccionado
      // TODO: resolver error timeout exceed 30000
      // eliminar el segundo param pasado a .goto oara reproducir, intentar varias veces hasta que salga
        await page.goto(selectedManga.url, {timeout:0});

      // Extraemos el html de la pagina que contiene todos los capitulos
      const chaptersHtml = await page.evaluate(() => {
        return document.querySelector('#chapters').innerHTML;
      });
      const cheerioChapters = cheerio.load(chaptersHtml, { xmlMode: false, decodeEntities: false});

      // Extraemos el numero y nombre if any de los capitulos
      const chaptersCount = cheerioChapters('.list-group-item h4').map((index, element) => cheerioChapters(element).text().trim()).get();


      // Aqui es necesario implementar:
      // mostrarle al usuario usando inquirer los capitulos y que al seleccionar uno mostrar su enlace en consola
        console.log(chaptersCount);
      console.log(chaptersCount.length)

      // Cerramos el navegador
      await browser.close()
      }
    )}

