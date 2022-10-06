import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { generateTypes } from "./mod.ts";

const jsonString = `{
  "external_urls": {
      "spotify": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb"
  },
  "followers": {
      "href": null,
      "total": 7405000
  },
  "genres": [
      "alternative rock",
      "art rock",
      "melancholia",
      "oxford indie",
      "permanent wave",
      "rock"
  ],
  "href": "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
  "id": "4Z8W4fKeB5YxbusRsdQVPb",
  "name": "Radiohead",
  "popularity": 79,
  "type": "artist",
  "uri": "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb"
}`;

const inputObject = JSON.parse(jsonString);

const expected = `declare module namespace {

  export interface IRootObject {
    IExternal_urls: object
    IFollowers: object
    genres: string[]
    href: string
    id: string
    name: string
    popularity: number
    type: string
    uri: string
  }

  export interface IExternal_urls {
    spotify: string
  }

  export interface IFollowers {
    href: any
    total: number
  }

}`;

Deno.test("generateTypes", async () => {
  const result = await generateTypes(inputObject);
  assertEquals(result, expected);
});
