import { NestedExpression } from "./nested/nestedExpression.ts";

export class SqlBuilder {
    private _args: { [key: string]: any } = {};
    private index = 1;
    private content = "";

    public put(value: string) {
        if (this.content != "") {
            this.content += " ";
        }
        this.content += value.trim();
    }
    
    public raw(expression: any) {
        if (expression instanceof NestedExpression) {
            expression.build(this);
        }
        else if (typeof expression == "string") {
            this.put(`'${expression}'`);
        } 
        else {
            this.put(expression.toString());
        } 
    }

    public arg(expression: any) {
        if (expression instanceof NestedExpression) {
            expression.build(this);
        }
        else {
            const key = `@arg${this.index++}`;
            this._args[key] = expression;
            this.put(key);
        }
    }

    public get args(): { [key: string]: any } {
        return this._args;
    }

    public toString(): string {
        return this.content;
    }
}  