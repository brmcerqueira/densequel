import { bind, where, Connection } from "../../mysql/mod.ts";

const connectionString = JSON.parse(<string> Deno.env.get("TEST_CONNECTION_STRING"));
console.log(connectionString);

Deno.test("select", async () => {  
    const connection = new Connection(connectionString);
    await connection.open();
    const firstName = "B";
    const limit = 10;
    const result = await connection.sql`SELECT 
    first_name ${bind("firstName")}, 
    last_name ${bind("lastName")}
    FROM customer ${where($ => {
        if (firstName) {
            $.and`upper(first_name) LIKE upper(${`${firstName}%`})`;
        }
    })}LIMIT ${limit}`;
    console.log(result);
    await connection.close();
});