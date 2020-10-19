import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";
import { IFinalizable, NestedBuilderExpression } from "./nestedExpression.ts";

export type SelectBuilderSetup = (s: SelectBuilder) => void;

export function select(setup: SelectBuilderSetup): NestedBuilderExpression<SelectBuilder>
export function select(init: string, setup: SelectBuilderSetup): NestedBuilderExpression<SelectBuilder>
export function select(arg1: SelectBuilderSetup | string, arg2?: SelectBuilderSetup): NestedBuilderExpression<SelectBuilder> {
    return new NestedBuilderExpression(sqlBuilder => new SelectBuilder(sqlBuilder, arg2 ? <string> arg1 : undefined), arg2 || <SelectBuilderSetup> arg1);
}

class SelectBuilder extends NestedBuilder implements IFinalizable {
    constructor(sqlBuilder: SqlBuilder, initWith?: string) {
        let init = "SELECT";
        if (initWith) {
            init += ` ${initWith.trim()}`;
        }
        super(sqlBuilder, init);
    }

    public col(strings: TemplateStringsArray, ...expressions: any[]) {
        this.adjustInit(",");
        this.putTemplate(strings, ...expressions);
    }

    public end() {
        if (this.isEmpty) {
            this.sqlBuilder.put("*");
        }
    }
}