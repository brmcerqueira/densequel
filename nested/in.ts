import { RawExpression } from "../raw.ts";
import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function $in(...parameters: any): NestedExpression {
    return new InExpression(parameters);
} 

class InExpression extends NestedExpression {
    constructor(private parameters: any[]) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        sqlBuilder.put("IN(");
        this.parameters.forEach((item, i) => {
            if (i > 0) {
                sqlBuilder.put(",");
            }
            
            if (item instanceof RawExpression) {
                sqlBuilder.put(item.toString());
            }
            else {
                sqlBuilder.arg(item);
            }
        });
        sqlBuilder.put(")");
    }
}