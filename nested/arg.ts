import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function raw(...parameters: any[]): NestedExpression {
    return new ArgExpression(true, parameters);
}

export function arg(...parameters: any[]): NestedExpression {
    return new ArgExpression(false, parameters);
}

class ArgExpression extends NestedExpression { 
    constructor(private isRaw: boolean, private parameters: any[]) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        this.parameters.forEach((item, index) => {
            if (index > 0) {
                sqlBuilder.put(",");
            }

            if (this.isRaw) {
                sqlBuilder.raw(item);
            } else {
                sqlBuilder.arg(item);
            }                     
        });
    }
}