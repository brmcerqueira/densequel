import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";
import { NestedBuilderExpression } from "./nestedExpression.ts";

export type WhereBuilderSetup = (w: WhereBuilder) => void;

export function where(setup: WhereBuilderSetup): NestedBuilderExpression<WhereBuilder>
export function where(init: string, setup: WhereBuilderSetup): NestedBuilderExpression<WhereBuilder>
export function where(arg1: WhereBuilderSetup | string, arg2?: WhereBuilderSetup): NestedBuilderExpression<WhereBuilder> {
    return new NestedBuilderExpression(sqlBuilder => new WhereBuilder(sqlBuilder, arg2 ? <string> arg1 : undefined), arg2 || <WhereBuilderSetup> arg1);
}

class WhereBuilder extends NestedBuilder {
    constructor(sqlBuilder: SqlBuilder, initWith?: string) {
        let init = "WHERE";
        if (initWith) {
            init += ` ${initWith.trim()}`;
        }
        super(sqlBuilder, init);
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