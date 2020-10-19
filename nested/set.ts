import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";
import { NestedBuilderExpression } from "./nestedExpression.ts";

export function set(setup: (s: SetBuilder) => void): NestedBuilderExpression<SetBuilder> {
    return new NestedBuilderExpression(sqlBuilder => new SetBuilder(sqlBuilder), setup);
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