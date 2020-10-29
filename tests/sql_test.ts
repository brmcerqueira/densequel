import { arg, raw, bulk, bulkMap, dynamic, tuple, where, Connection } from "../postgres/mod.ts";

const connectionString = <string> Deno.env.get("TEST_CONNECTION_STRING");
console.log(connectionString);

Deno.test("select", async () => {  
    const connection = new Connection(connectionString);
    await connection.open();
    const result = await connection.sql`select * from customer`;
    console.log(result);
    await connection.close();
});

/*
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
        $.and`age in${tuple(arg(16, 17), 18, 19, 20)}`;
    })}`);
});

Deno.test("update dynamic", () => {  
    let firstName = 22;
    let lastName = "Tendulkar";
      
    console.log(sql`update User set ${dynamic(",", $ => {
        if (firstName > 10) {
            $`firstName = ${firstName}`;
        }
        if (lastName == "Tendulkar") {
            $`lastName = ${raw(lastName)}`;
        }
    })}${where($ => {
        $.and`age in${tuple(arg(16, 17), 18, 19, 20)}`;
    })}`);
});

Deno.test("bulk insert", () => {  
    console.log(sql`insert into User (firstName, lastName) values ${bulk(
        tuple("Name1", "LastName1"),
        tuple("Name2", "LastName2"),
        tuple("Name3", "LastName3")
    )}`);
});

Deno.test("bulkMap insert", () => {
    const array: { firstName: string, lastName: string }[] = [
        { firstName:"Name1", lastName:"LastName1" },
        { firstName:"Name2", lastName:"LastName2" },
        { firstName:"Name3", lastName: "LastName3" }
    ];
    
    console.log(sql`insert into User (firstName, lastName) values 
    ${bulkMap(array, item => tuple(item.firstName, item.lastName))}`);
});*/