import { SqlBuilder } from "../sqlBuilder.ts";
import { sqlTemplate } from "../sqlTemplate.ts";
import { NestedExpression } from "./nestedExpression.ts";

export type WhereBuilderSetup = (w: WhereBuilder) => void;

export function where(setup: WhereBuilderSetup): NestedExpression
export function where(init: string, setup: WhereBuilderSetup): NestedExpression
export function where(arg1: WhereBuilderSetup | string, arg2?: WhereBuilderSetup): NestedExpression {
    return new WhereExpression(arg2 || <WhereBuilderSetup> arg1, arg2 ? <string> arg1 : undefined);
}

class WhereExpression extends NestedExpression { 
    constructor(private setup: (n: WhereBuilder) => void, private initWith?: string) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        this.setup(new WhereBuilder(sqlBuilder, this.initWith));      
    }
}

class WhereBuilder {

    private isEmpty = true; 
    private init = "WHERE";

    constructor(private sqlBuilder: SqlBuilder, initWith?: string) {
        if (initWith) {
            this.init += ` ${initWith.trim()}`;
        }      
    }

    private putTemplate(operator: string, strings: TemplateStringsArray, ...expressions: any[]) {
        if (this.isEmpty) {
            this.isEmpty = false;
            this.sqlBuilder.put(this.init);
        }
        else {
            this.sqlBuilder.put(operator);
        }
        sqlTemplate(this.sqlBuilder, strings, ...expressions);
    }

    public and(strings: TemplateStringsArray, ...expressions: any[]) {
        this.putTemplate("AND", strings, ...expressions);
    }

    public or(strings: TemplateStringsArray, ...expressions: any[]) {
        this.putTemplate("OR", strings, ...expressions);
    }
}