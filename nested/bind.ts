import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function bind(name: string, useAs: boolean = false): NestedExpression {
    return new BindExpression(name, useAs);
}

class BindExpression extends NestedExpression {
    constructor(private name: string, private useAs: boolean) {
        super();
    }

    public build(sqlBuilder: SqlBuilder): void {
        sqlBuilder.bind(this.name);
        if (this.useAs) {
            sqlBuilder.put(`AS ${this.name}`);
        }
    }
}