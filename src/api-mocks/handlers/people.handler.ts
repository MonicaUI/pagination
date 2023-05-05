import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";

const BASE_URL = `https://pagination-eta.vercel.app/mock-api/${API_RESOURCE.PEOPLE}`;
console.log(BASE_URL, API_RESOURCE.PEOPLE)
export const getPeople =
  rest.get(BASE_URL + `/pagination?page=1&limit=10&sort=asc&search=ball`, (_req: any, _res, ctx) => {
    console.log(_req)
    const searchParams = new URLSearchParams(_req.url.search.split('?')[1]); // split URL and get search params
    const page = Number(searchParams.get('page')) - 1 >= 1 ? (Number(searchParams.get('page')) - 1) * Number(searchParams.get('limit')) : 0 // get the 'page' value
    const limit = Number(searchParams.get('limit')); // get the 'limit' value
    const sort = searchParams.get('sort')
    const searchTerm = searchParams.get('search')

    if (searchParams.get('search') !== '') {
      return delayedResponse(ctx.status(200), ctx.json(PEOPLE?.filter((person) =>
        person.name.toLowerCase().includes(searchTerm!.toLowerCase())
      )))
    }
    if (sort === "ascending") {
      return delayedResponse(ctx.status(200), ctx.json(PEOPLE.sort(function (a: any, b: any) {
        if (a.name < b.name) {
          if (sort) {
            return -1;
          } else {
            return 1
          }
        }
        if (a.name > b.name) {
          if (sort) {
            return 1;
          } else {
            return -1
          }
        }
        return 0;
      }).slice(page, page + limit)))
    } else {
      return delayedResponse(ctx.status(200), ctx.json(PEOPLE.sort(function (a: any, b: any) {
        if (a.name < b.name) {
          if (!sort) {
            return -1;
          } else {
            return 1
          }
        }
        if (a.name > b.name) {
          if (!sort) {
            return 1;
          } else {
            return -1
          }
        }
        return 0;
      }).slice(page, page + limit)))
    }
  }
  )

export const handlers = [getPeople];
