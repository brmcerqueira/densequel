import { assert, assertEquals, assertStrictEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";

type Test = {
    id: number,
    text: string
};

Deno.test("select", () => {  
    select<Test>(c => {
        return {
            id: c("").number,
            text: c("").string,
        };
    });
});