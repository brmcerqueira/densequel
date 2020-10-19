import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";

export interface IFinalizable {
    end(): void
}

export abstract class NestedExpression { 
    public abstract build(sqlBuilder: SqlBuilder): void;
}

export class NestedBuilderExpression<T extends NestedBuilder> extends NestedExpression { 
    constructor(private create: (sqlBuilder: SqlBuilder) => T, private setup: (n: T) => void) {
        super();
    }

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