import { assert, assertEquals, assertStrictEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { raw, sql, where } from "./sql.ts";

Deno.test("select", () => {  
    let firstName = 22;
    let lastName = "Tendulkar";
      
    console.log(sql`select * from User ${where(w => {
        if (firstName > 10) {
            w.and`firstName = ${firstName}`;
        }
        if (lastName == "Tendulkar") {
            w.and`lastName = ${raw(lastName)}`;
        }
    })}`);
});