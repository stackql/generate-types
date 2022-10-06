import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { generateTypes } from "./mod.ts";

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

const expected = `declare module namespace {

  export interface IRootObject {
    name: string
    age: number
    IFred: object
    testarr1: object[]
    testarr2: string[]
  }

  export interface IFred {
    name: string
    age: number
  }

}`;

Deno.test("generateTypes", async () => {
  const result = await generateTypes(testObject);
  assertEquals(result, expected);
});
