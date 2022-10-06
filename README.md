# 🦕 generate-types

Deno module to generate a TypeScript types module file from JSON data (or a
parsed JSON string).

## Usage

```typescript
import { generateTypes } from "./mod.ts";

async function main() {
  const testObject = {
    name: "fred",
    age: 21,
    fred: {
      name: "fred",
      age: 21,
    },
    testarr1: [
      {
        testarrobj1: "testarrobj1",
      },
    ],
    testarr2: ["fred", "bob"],
  };
  const result = await generateTypes(testObject);
  console.log(result);
}

main();
```

outputs...

```
declare module namespace {

  export interface RootObject {
    name: string
    age: number
    Fred: object
    testarr1: object[]
    testarr2: string[]
  }

  export interface Fred {
    name: string
    age: number
  }

}
```

## Test

```bash
# unit tests
deno test
```
