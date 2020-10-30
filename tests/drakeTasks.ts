import { sh, task } from "https://deno.land/x/drake/mod.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

task("alias", [], async function() {
    await sh("echo 'alias drake=\"deno run -A drakefile.ts\"' >> ~/.bash_aliases");
});

task("docker-compose-up", [], async function() {
    await sh("docker-compose up -d");
});

task("docker-compose-down", [], async function() {
    await sh("docker-compose down --remove-orphans");
});

task("delay", [], async function() {     
    await delay(10000);
});