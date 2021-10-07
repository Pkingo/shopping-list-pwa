import { Handler } from "@netlify/functions";
import cheerio, { Cheerio } from "cheerio";
import type { Element } from "domhandler";
import fetch from "node-fetch";

const toArray = (rawList: Cheerio<Element>) => {
  const list = [];
  rawList.map((i, el) => {
    list.push(el.children[0]["data"]);
  });
  return list;
};

const scrapeValdemarsro = async (url: string) => {
  return await fetch(url)
    .then((resp) => resp.text())
    .then((body) => cheerio.load(body)("li", ".ingredientlist"))
    .then(toArray);
};

export const handler: Handler = async (event, context) => {
  try {
    const url = JSON.parse(event.body || "{}").url || "";

    if (!url) {
      return { statusCode: 400, body: "Please supply a URL" };
    }
    if (!url.includes("valdemarsro.dk")) {
      return {
        statusCode: 400,
        body: "URL bust be from domain 'https://valdemarsro.dk/'",
      };
    }
    const ingredients = (await scrapeValdemarsro(url)) || [];
    return {
      statusCode: 200,
      body: JSON.stringify(ingredients),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
