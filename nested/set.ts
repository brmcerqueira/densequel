import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function set(setup: (s: SetBuilder) => void): NestedExpression<SetBuilder> {
    return new NestedExpression(sqlBuilder => new SetBuilder(sqlBuilder), setup);
} 

class SetBuilder extends NestedBuilder {
    constructor(sqlBuilder: SqlBuilder) {
        super(sqlBuilder, "SET");
    }

    public do(strings: TemplateStringsArray, ...expressions: any[]) {
        this.adjustInit(",");
        this.putTemplate(strings, ...expressions);
    }
}