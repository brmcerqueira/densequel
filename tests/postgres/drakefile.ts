import { env, run, sh, task } from "https://deno.land/x/drake/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

env("--default-task", "test-all");

task("alias", [], async function() {
    await sh("echo 'alias drake=\"deno run -A drakefile.ts\"' >> ~/.bash_aliases");
});

task("docker-compose-up", [], async function() {
    await sh("docker-compose up -d");
});

task("docker-compose-down", [], async function() {
    await sh("docker-compose down --remove-orphans");
});

task("test", [], async function() {     
    await sh("deno test -c ../../tsconfig.json --unstable --allow-all", {
        env: {
            TEST_CONNECTION_STRING: "postgres://postgres:test@localhost:5432/sakila"
        }
    });
});

task("delay", [], async function() {     
    await delay(10000);
});

task("test-all", ["docker-compose-up", "delay", "test", "docker-compose-down"]);

run();