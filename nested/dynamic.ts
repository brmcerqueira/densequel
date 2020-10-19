import { SqlBuilder } from "../sqlBuilder.ts";
import { sqlTemplate } from "../sqlTemplate.ts";
import { NestedExpression } from "./nestedExpression.ts";

export type DynamicSetup = (put: (strings: TemplateStringsArray, ...expressions: any[]) => void) => void;

export function dynamic(setup: DynamicSetup): NestedExpression
export function dynamic(concat: string, setup: DynamicSetup): NestedExpression
export function dynamic(arg1: DynamicSetup | string, arg2?: DynamicSetup): NestedExpression {
    return new DynamicExpression(arg2 || <DynamicSetup> arg1, arg2 ? <string> arg1 : undefined);
} 

class DynamicExpression extends NestedExpression {

    private isEmpty = true; 

    constructor(private setup: DynamicSetup, private concat?: string) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        this.setup((strings, expressions) => {
            if (this.isEmpty) {
                this.isEmpty = false;
            }
            else if (this.concat) {
                sqlBuilder.put(this.concat);
            }
            sqlTemplate(sqlBuilder, strings, expressions);
        });
    }
}