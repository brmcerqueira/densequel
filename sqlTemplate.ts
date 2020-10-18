import { NestedExpression } from "./nested/nestedExpression.ts";
import { RawExpression } from "./raw.ts";
import { SqlBuilder } from "./sqlBuilder.ts";

export function sqlTemplate(sqlBuilder: SqlBuilder, strings: TemplateStringsArray, ...expressions: any[]) {
    strings.forEach((text, i) => {
        if (text != "") {
            sqlBuilder.put(text);
        }
        
        const expression = expressions[i];
        
        if (expression) {
            if (expression instanceof NestedExpression) {
                expression.build(sqlBuilder);
            }
            else if (expression instanceof RawExpression) {
                sqlBuilder.put(expression.toString());
            }
            else {
                sqlBuilder.arg(expression);
            }
        }
    });
}