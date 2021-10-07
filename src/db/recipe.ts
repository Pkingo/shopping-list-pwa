export const getValdemarsroRecipe = (url: string) => {
  return fetch("/.netlify/functions/scraper", {
    body: JSON.stringify({ url }),
    method: "POST",
  }).then((resp) => resp.json() as Promise<string[]>);
};
