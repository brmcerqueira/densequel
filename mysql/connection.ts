import { Client, ClientConfig } from "https://deno.land/x/mysql/mod.ts";
import { SqlConnection, SqlResult } from "../sqlConnection.ts";
import { sqlTemplate } from "../sqlTemplate.ts";
import { SqlBuilder } from "../sqlBuilder.ts";
import { SqlProvider } from "../sqlProvider.ts";

class Provider implements SqlProvider {
    public parseString(expression: string): string {
        return `'${expression}'`;
    }

    public parseArg(index: number): { key: string, value: string } {
        return {
            key: index.toString(),
            value: "?"
        };
    }
}

export class Connection implements SqlConnection {
    private client: Client;
    private provider: Provider;

    constructor(private config: ClientConfig) {
        this.client = new Client();
        this.provider = new Provider();          
    }

    public async sql<T>(strings: TemplateStringsArray, ...expressions: any[]): Promise<SqlResult<T>> {
        const sqlBuilder = new SqlBuilder(this.provider);
        sqlTemplate(sqlBuilder, strings, ...expressions);

        const args: any[] = [];

        for (const key in sqlBuilder.args) {
            args.push(sqlBuilder.args[key]);
        }

        const clientResult = await this.client.execute(sqlBuilder.toString(), args);

        const result: SqlResult<T> = {};

        if (clientResult.affectedRows) {
            result.affected = clientResult.affectedRows;
        }
        else if (sqlBuilder.binds.length > 0 && clientResult.rows) {
            result.rows = clientResult.rows.map(row => {
                const tuple: { [key: string]: any } = {};
    
                clientResult.fields?.forEach((field, index) => {
                    tuple[sqlBuilder.binds[index] || field.name] = row[field.name];
                });
            
                return <T> tuple;
            });
        }
        else {
            result.rows = clientResult.rows;
        }

        return result;
    }

    public async open() {
        await this.client.connect(this.config);
    }

    public async close() {
        await this.client.close();
    }
}