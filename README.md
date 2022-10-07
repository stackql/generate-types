# 🦕 generate-types

[![deno.land/x/dts](https://shield.deno.dev/x/dts)](https://deno.land/x/dts)
![workflow](https://github.com/stackql/generate-types/actions/workflows/deno.yml/badge.svg)

Deno module to generate a TypeScript types module file from JSON data (or a
parsed JSON string).

## Usage

```typescript
import { generateTypes } from "https://deno.land/x/dts/mod.ts";

async function main() {
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
    const result = await generateTypes(inputObject);
    console.log(result);
}

main();
```

outputs...

```
declare module namespace {

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

}
```

## Test

```bash
deno test
```
