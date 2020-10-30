import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { bind, bulk, bulkMap, dynamic, tuple, where, Connection } from "../../postgres/mod.ts";

const connectionString = <string> Deno.env.get("TEST_CONNECTION_STRING");

Deno.test("select", async () => {  
    const connection = new Connection(connectionString);
    await connection.open();
    const firstName = "B";
    const limit = 10;
    const result: any[] = <any[]> await connection.sql`SELECT 
    first_name ${bind("firstName")}, 
    last_name ${bind("lastName")}
    FROM customer ${where($ => {
        if (firstName) {
            $.and`upper(first_name) LIKE upper(${`${firstName}%`})`;
        }
    })} LIMIT ${limit}`;
    assert(result.length > 0);
    await connection.close();
});

Deno.test("update dynamic", async () => {  
    const connection = new Connection(connectionString);
    await connection.open(); 

    const length = 20;
    const whereLength = 10;
    
    const result = await connection.sql`UPDATE film SET ${dynamic(",", $ => {
        if (length) {
            $`length = length + ${length}`;
        }
    })}${where($ => {
        if (whereLength) {
            $.and`length >= ${whereLength}`;
        }      
    })}`;

    assert(result > 0);
    await connection.close();
});

Deno.test("bulk insert", async () => { 
    const connection = new Connection(connectionString);
    await connection.open(); 
    const result = await connection.sql`INSERT INTO category (name) VALUES ${bulk(
        tuple("bulk insert 1"),
        tuple("bulk insert 2"),
        tuple("bulk insert 3")
    )}`
    assertEquals(result, 3);
    await connection.close();
});

Deno.test("bulkMap insert", async () => {
    const array: { name: string }[] = [
        { name: "bulkMap insert 1" },
        { name: "bulkMap insert 2" },
        { name: "bulkMap insert 3" }
    ];
    const connection = new Connection(connectionString);
    await connection.open(); 
    const result = await connection.sql`INSERT INTO category (name) VALUES 
    ${bulkMap(array, item => tuple(item.name))}`;
    assertEquals(result, 3);
    await connection.close();
});