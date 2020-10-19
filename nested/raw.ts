import { SqlBuilder } from "../sqlBuilder.ts";
import { NestedExpression } from "./nestedExpression.ts";

export function raw(...contents: any): RawExpression {
    return new RawExpression(contents);
}

export class RawExpression extends NestedExpression { 
    constructor(private contents: any[]) {
        super();
    }

    public build(sqlBuilder: SqlBuilder) {
        this.contents.forEach((item, index) => {
            if (index > 0) {
                sqlBuilder.put(",");
            }

            if (typeof item == "string") {
                sqlBuilder.put(`'${item}'`);
            } else {
                sqlBuilder.put(item.toString());
            }           
        });
    }
}