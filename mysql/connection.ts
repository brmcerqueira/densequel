import { Client, ClientConfig } from "https://deno.land/x/mysql/mod.ts";
import { SqlConnection } from "../sqlConnection.ts";
import { sqlTemplate } from "../sqlTemplate.ts";
import { SqlBuilder } from "../sqlBuilder.ts";
import { SqlProvider } from "../sqlProvider.ts";

class Provider implements SqlProvider {
    public parseString(expression: string): string {
        return `'${expression}'`;
    }

    public parseArg(index: number): string {
        return "?";
    }
}

export class Connection implements SqlConnection {
    private client: Client;
    private provider: Provider;

    constructor(private config: ClientConfig) {
        this.client = new Client();
        this.provider = new Provider();          
    }

    public async sql<T>(strings: TemplateStringsArray, ...expressions: any[]): Promise<T[]> {
        const sqlBuilder = new SqlBuilder(this.provider);
        sqlTemplate(sqlBuilder, strings, ...expressions);

        const args: any[] = [];

        for (const key in sqlBuilder.args) {
            args.push(sqlBuilder.args[key]);
        }

        const result = await this.client.execute(sqlBuilder.toString(), args);

        return <T[]> result.rows;
    }

    public async open() {
        await this.client.connect(this.config);
    }

    public async close() {
        await this.client.close();
    }
}