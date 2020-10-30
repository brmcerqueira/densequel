import { NestedExpression } from "./nested/nestedExpression.ts";
import { SqlProvider } from "./sqlProvider.ts";

export class SqlBuilder {
    private _binds: string[] = [];
    private _args: { [key: string]: any } = {};
    private index = 1;
    private content = "";
    
    constructor(private provider: SqlProvider) {
 
    }

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
            this.put(this.provider.parseString(expression));
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
            const result = this.provider.parseArg(this.index++);
            this._args[result.key] = expression;
            this.put(result.value);
        }
    }

    public bind(name: string) {
        this._binds.push(name);
    }

    public get binds(): string[] {
        return this._binds;
    }

    public get args(): { [key: string]: any } {
        return this._args;
    }

    public toString(): string {
        console.log(this.content);
        console.log(this._args);
        return this.content;
    }
}  