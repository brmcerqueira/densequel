import { env, run, sh, task } from "https://deno.land/x/drake/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

env("--default-task", "test-postgres-all");

task("alias", [], async function() {
    await sh("echo 'alias drake=\"deno run -A drakefile.ts\"' >> ~/.bash_aliases");
});

task("docker-compose-postgres-up", [], async function() {
    await sh("docker-compose -f docker-compose-postgres.yml up -d");
});

task("docker-compose-postgres-down", [], async function() {
    await sh("docker-compose -f docker-compose-postgres.yml down --remove-orphans");
});

task("test-postgres", [], async function() {     
    await sh("deno test -c ../tsconfig.json --unstable --allow-all", {
        env: {
            TEST_CONNECTION_STRING: "postgres://postgres:test@localhost:5432/sakila"
        }
    });
});

task("delay-10000", [], async function() {     
    await delay(10000);
});

task("test-postgres-all", ["docker-compose-postgres-up", "delay-10000", "test-postgres", "docker-compose-postgres-down"]);

run();