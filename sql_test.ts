import { $in } from "./nested/in.ts";
import { raw } from "./nested/raw.ts";
import { where } from "./nested/where.ts";
import { sql } from "./sql.ts";

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
        $.and`age ${$in(raw(17, 18, 19), 20)}`;
    })}`);
});