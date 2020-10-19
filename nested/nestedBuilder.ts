import { SqlBuilder } from "../sqlBuilder.ts";
import { sqlTemplate } from "../sqlTemplate.ts";

export class NestedBuilder {
    
    protected isEmpty = true;
    
    constructor(protected sqlBuilder: SqlBuilder, private init: string) {}

    protected adjustInit(text: string) {
        if (this.isEmpty) {
            this.isEmpty = false;
            this.sqlBuilder.put(this.init);
        }
        else {
            this.sqlBuilder.put(text);
        }
    }

    protected putTemplate(strings: TemplateStringsArray, ...expressions: any[]) {
        sqlTemplate(this.sqlBuilder, strings, ...expressions);
    }
}