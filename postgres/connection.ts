import { Client } from "https://deno.land/x/postgres/mod.ts";
import { ConnectionOptions } from "https://deno.land/x/postgres/connection_params.ts";
import { SqlConnection, SqlResult } from "../sqlConnection.ts";
import { sqlTemplate } from "../sqlTemplate.ts";
import { SqlBuilder } from "../sqlBuilder.ts";
import { SqlProvider } from "../sqlProvider.ts";

class Provider implements SqlProvider {
    public parseString(expression: string): string {
        return `'${expression}'`;
    }

    public parseArg(index: number): { key: string, value: string } {
        const value = `$${index}`;
        return {
            key: value,
            value: value
        };
    }
}

export class Connection implements SqlConnection {
    private client: Client;
    private provider: Provider;

    constructor(config?: ConnectionOptions | string) {
        this.client = new Client(config);
        this.provider = new Provider();          
    }

    public async sql<T>(strings: TemplateStringsArray, ...expressions: any[]): Promise<SqlResult<T>> {
        const sqlBuilder = new SqlBuilder(this.provider);
        sqlTemplate(sqlBuilder, strings, ...expressions);

        const args: any[] = [];

        for (const key in sqlBuilder.args) {
            args.push(sqlBuilder.args[key]);
        }

        const clientResult = await this.client.query(args.length > 0 ? {
            text: sqlBuilder.toString(),
            args: args
        } : sqlBuilder.toString());

        const result: SqlResult<T> = {};

        if (sqlBuilder.binds.length > 0) {
            result.rows = clientResult.rows.map(row => {
                const tuple: { [key: string]: any } = {};
    
                clientResult.rowDescription.columns.forEach((column, index) => {
                    tuple[sqlBuilder.binds[index] || column.name] = row[index];
                });
            
                return <T> tuple;
            });
        }
        else if (clientResult.rows.length > 0) {
            result.rows = <T[]> clientResult.rowsOfObjects();
        }
        else {
            result.affected = clientResult.rowCount || 0;
        }

        return result;
    }

    public async open() {
        await this.client.connect();
    }

    public async close() {
        await this.client.end();
    }
}