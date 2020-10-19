import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";
import { TupleExpression } from "./tuple.ts";

export function bulk(...tuples: TupleExpression[]): NestedExpression {
    return new BulkExpression(tuples);
}

export function bulkMap<T>(array: T[], fn: (value: T, index: number, array: T[]) => TupleExpression): NestedExpression {
    return new BulkExpression(array.map(fn));
} 

class BulkExpression extends NestedExpression {
    constructor(private tuples: TupleExpression[]) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        this.tuples.forEach((item, index) => {
            if (index > 0) {
                sqlBuilder.put(",");
            }
            
            sqlBuilder.raw(item);
        });
    }
}