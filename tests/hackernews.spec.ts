import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { StagehandConfig } from "../stagehand.config.js";

const NewsSchema = z.object({
  topStory: z.object({
    title: z.string(),
    points: z.number().describe("Puntos o votos de la historia"),
    author: z.string(),
    commentsCount: z.number().describe("Número de comentarios, 0 si no hay"),
  }).describe("La noticia principal (número 1) de Hacker News"),
});

async function main() {
  const stagehand = new Stagehand(StagehandConfig);
  await stagehand.init();
  const page = stagehand.context.activePage();
  if(!page) throw new Error("No page");

  await page.goto("https://news.ycombinator.com/");

  console.log("Leyendo Hacker News...");
  
  const data = await stagehand.extract(
    "Extrae la información de la noticia #1 del ranking.",
    NewsSchema
  );

  console.log("Top Story:", data.topStory);
  await stagehand.close();
}

main();
