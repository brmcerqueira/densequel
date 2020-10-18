import { SqlBuilder } from "./sqlBuilder.ts";
import { sqlTemplate } from "./sqlTemplate.ts";

export function sql(strings: TemplateStringsArray, ...expressions: any[]): string {
    const sqlBuilder = new SqlBuilder();
    sqlTemplate(sqlBuilder, strings, ...expressions);
    return sqlBuilder.toString();
}