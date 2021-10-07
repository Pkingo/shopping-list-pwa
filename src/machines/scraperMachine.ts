import { FormEvent } from "react";
import { createMachine, assign } from "xstate";
import { getValdemarsroRecipe } from "../db/recipe";
import { addShoppingItems } from "../db/shopping";

type Context = {
  items: string[];
  error: string;
  collectionId: string;
};

type Events =
  | { type: "OPEN" }
  | FormEvent<HTMLFormElement>
  | { type: "SELECT" }
  | { type: "CLOSE" };

const initialContext: Context = {
  items: [],
  error: "",
  collectionId: "",
};

export const scraperMachine = createMachine<Context, Events>(
  {
    id: "scarper-machine",
    context: initialContext,
    initial: "closed",
    states: {
      closed: {
        on: {
          OPEN: {
            target: "opened",
            actions: "onOpen",
          },
        },
      },
      opened: {
        on: {
          CLOSE: {
            target: "closed",
            actions: "clear",
          },
        },
        initial: "url",
        states: {
          url: {
            on: {
              submit: "fetching",
            },
          },
          fetching: {
            invoke: {
              src: "fetchRecipes",
              onDone: {
                actions: assign((_context, event) => ({
                  items: event.data,
                })),
                target: "checkList",
              },
              onError: {
                target: "url",
                actions: assign((_context, event) => ({
                  error: "Ugyldigt URL",
                })),
              },
            },
          },
          checkList: {
            on: {
              submit: "addingItems",
            },
          },
          addingItems: {
            invoke: {
              src: "addShoppingItems",
              onDone: {
                target: "#scarper-machine.closed",
                actions: "clear",
              },
              onError: "checkList",
            },
          },
        },
      },
    },
  },
  {
    actions: {
      clear: assign({
        items: [],
        error: "",
      } as Partial<Context>),
    },
    services: {
      fetchRecipes: (_context, event) => () => {
        if (event.type !== "submit") {
          throw Error("Invalid event");
        }
        const url = event.currentTarget["valdemarsro-url"].value;
        if (!url) {
          throw Error("No URL");
        }
        return getValdemarsroRecipe(url);
      },
      addShoppingItems: (context, event) => () => {
        if (event.type !== "submit") {
          return;
        }
        const items = [];
        for (let i = 0; i < event.currentTarget.elements.length; i++) {
          const currentEl = event.currentTarget.elements[i] as HTMLInputElement;
          if (currentEl.checked) {
            items.push(currentEl.value);
          }
        }
        return addShoppingItems(items, context.collectionId);
      },
    },
  }
);
