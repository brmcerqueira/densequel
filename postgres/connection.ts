import { Client } from "https://deno.land/x/postgres/mod.ts";
import { ConnectionOptions } from "https://deno.land/x/postgres/connection_params.ts";
import { SqlConnection } from "../sqlConnection.ts";
import { sqlTemplate } from "../sqlTemplate.ts";
import { SqlBuilder } from "../sqlBuilder.ts";
import { Provider } from "./provider.ts";

export class Connection implements SqlConnection {
    private client: Client;
    private provider: Provider;

    constructor(config: ConnectionOptions | string) {
        this.client = new Client(config);
        this.provider = new Provider();          
    }

    public async sql(strings: TemplateStringsArray, ...expressions: any[]): Promise<any[]> {
        const sqlBuilder = new SqlBuilder(this.provider);
        sqlTemplate(sqlBuilder, strings, ...expressions);
        const result = await this.client.query(sqlBuilder.toString());
        return result.rows;  
    }

    public async open() {
        await this.client.connect();
    }

    public async close() {
        await this.client.end();
    }
}