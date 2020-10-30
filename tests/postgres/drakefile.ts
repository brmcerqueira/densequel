import { env, run, sh, task } from "https://deno.land/x/drake/mod.ts";
import "../drakeTasks.ts";

env("--default-task", "test-all");

task("test", [], async function() {     
    await sh("deno test -c ../../tsconfig.json --unstable --allow-all ./test.ts", {
        env: {
            TEST_CONNECTION_STRING: "postgres://postgres:test@localhost:5432/sakila"
        }
    });
});

task("test-all", ["docker-compose-up", "delay", "test", "docker-compose-down"]);

run();