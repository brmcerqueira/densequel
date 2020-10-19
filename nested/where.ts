import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";
import { NestedBuilderExpression } from "./nestedExpression.ts";

export function where(setup: (w: WhereBuilder) => void): NestedBuilderExpression<WhereBuilder> {
    return new NestedBuilderExpression(sqlBuilder => new WhereBuilder(sqlBuilder), setup);
}

class WhereBuilder extends NestedBuilder {
    constructor(sqlBuilder: SqlBuilder) {
        super(sqlBuilder, "WHERE");
    }

    public and(strings: TemplateStringsArray, ...expressions: any[]) {
        this.adjustInit("AND");
        this.putTemplate(strings, ...expressions);
    }

    public or(strings: TemplateStringsArray, ...expressions: any[]) {
        this.adjustInit("OR");
        this.putTemplate(strings, ...expressions);
    }
}