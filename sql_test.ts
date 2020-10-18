import { assert, assertEquals, assertStrictEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { raw, sql, where } from "./sql.ts";

Deno.test("select", () => {  
    let firstName = 22;
    let lastName = "Tendulkar";
      
    console.log(sql`select * from User ${where($ => {
        if (firstName > 10) {
            $.and`firstName = ${firstName}`;
        }
        if (lastName == "Tendulkar") {
            $.and`lastName = ${raw(lastName)}`;
        }
    })}`);
});