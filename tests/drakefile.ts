import { env, run, sh, task } from "https://deno.land/x/drake/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

env("--default-task", "test-postgres");

task("alias", [], async function() {
    await sh("echo 'alias drake=\"deno run -A drakefile.ts\"' >> ~/.bash_aliases");
});

task("test-postgres", [], async function() {    
    await sh("docker-compose -f docker-compose-postgres.yml up -d");
    await delay(10000);
    await sh("deno test -c ../tsconfig.json --unstable --allow-all", {
        env: {
            TEST_CONNECTION_STRING: "Host=test-database-postgres;Database=sakila;Username=postgres;Password=test"
        }
    });
    await sh("docker-compose -f docker-compose-postgres.yml down --remove-orphans");
});

run();