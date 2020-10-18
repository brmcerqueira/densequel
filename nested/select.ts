import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";
import { IFinalizable, NestedExpression } from "./nestedExpression.ts";

export function select(setup: (s: SelectBuilder) => void): NestedExpression<SelectBuilder> {
    return new NestedExpression(sqlBuilder => new SelectBuilder(sqlBuilder), setup);
}

class SelectBuilder extends NestedBuilder implements IFinalizable {
    constructor(sqlBuilder: SqlBuilder) {
        super(sqlBuilder, "SELECT");
    }

    public get(strings: TemplateStringsArray, ...expressions: any[]) {
        this.adjustInit(",");
        this.putTemplate(strings, ...expressions);
    }

    public end() {
        if (this.isEmpty) {
            this.sqlBuilder.put("*");
        }
    }
}