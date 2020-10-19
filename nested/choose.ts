import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function choose(value: boolean): ChooseExpression {
    return new ChooseExpression(value);
} 

class ChooseExpression extends NestedExpression {
    constructor(private value: boolean) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {

    }
    
    public then(strings: TemplateStringsArray, ...expressions: any[]) {

    }

    public when(value: boolean): ChooseExpression {
        
        return this;
    }

    public otherwise(strings: TemplateStringsArray, ...expressions: any[]) {

    }
}