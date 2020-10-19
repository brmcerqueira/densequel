import { SqlBuilder } from "./sqlBuilder.ts";

export function sqlTemplate(sqlBuilder: SqlBuilder, strings: TemplateStringsArray, ...expressions: any[]) {
    strings.forEach((text, i) => {
        if (text != "") {
            sqlBuilder.put(text);
        }
        
        const expression = expressions[i];
        
        if (expression) {
            sqlBuilder.arg(expression);
        }
    });
}