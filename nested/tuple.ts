import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function tuple(...parameters: any[]): TupleExpression {
    return new TupleExpression(parameters);
}

export class TupleExpression extends NestedExpression {
    constructor(private parameters: any[]) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        sqlBuilder.put("(");
        this.parameters.forEach((item, index) => {
            if (index > 0) {
                sqlBuilder.put(",");
            }
            
            sqlBuilder.raw(item);
        });
        sqlBuilder.put(")");
    }
}