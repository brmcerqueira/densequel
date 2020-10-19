import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedBuilder } from "./nestedBuilder.ts";

export abstract class NestedExpression { 
    public abstract build(sqlBuilder: SqlBuilder): void;
}

export class NestedBuilderExpression<T extends NestedBuilder> extends NestedExpression { 
    constructor(private create: (sqlBuilder: SqlBuilder) => T, private setup: (n: T) => void) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        this.setup(this.create(sqlBuilder));      
    }
}