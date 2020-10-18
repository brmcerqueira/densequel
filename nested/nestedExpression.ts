import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";

export interface IFinalizable {
    end(): void
}

export class NestedExpression<T extends NestedBuilder> { 
    constructor(private create: (sqlBuilder: SqlBuilder) => T, private setup: (n: T) => void) {}

    public build(sqlBuilder: SqlBuilder) {
        const nestedBuilder = this.create(sqlBuilder);
        this.setup(nestedBuilder);
        if (this.isFinalizable(nestedBuilder)) {
            nestedBuilder.end();
        }       
    }

    private isFinalizable(nestedBuilder: NestedBuilder | IFinalizable): nestedBuilder is IFinalizable {
        return (nestedBuilder as IFinalizable).end !== undefined;
    }
}