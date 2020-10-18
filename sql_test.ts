import { assert, assertEquals, assertStrictEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { raw, sql } from "./sql.ts";

Deno.test("select", () => {  
    let firstName = 22;
    let lastName = "Tendulkar";
      
    console.log(sql`select * from User where 
    firstName = ${firstName} and lastName =
    ${raw(lastName)}`);
});