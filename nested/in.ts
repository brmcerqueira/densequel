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
        this.parameters.forEach((item, index) => {
            if (index > 0) {
                sqlBuilder.put(",");
            }
            
            sqlBuilder.arg(item);
        });
        sqlBuilder.put(")");
    }
}