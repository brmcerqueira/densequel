import { SqlBuilder } from "../sqlBuilder.ts";

export abstract class NestedExpression { 
    public abstract build(sqlBuilder: SqlBuilder): void;
}