function sqlTemplate(argsBuilder: SqlBuilder, strings: TemplateStringsArray, ...expressions: any[]) {
    strings.forEach((text, i) => {
        if (text != "") {
            argsBuilder.put(text);
        }
        
        const expression = expressions[i];
        
        if (expression) {
            if (expression instanceof NestedExpression) {
                expression.build(argsBuilder);
            }
            else if (expression instanceof RawExpression) {
                argsBuilder.put(expression.toString());
            }
            else {
                argsBuilder.arg(expression);
            }
        }
    });
}

export function sql(strings: TemplateStringsArray, ...expressions: any[]): string {
    const sqlBuilder = new SqlBuilder();
    sqlTemplate(sqlBuilder, strings, ...expressions);
    return sqlBuilder.toString();
}

export function raw(content: any): RawExpression {
    return new RawExpression(content);
}

export function where(setup: (w: WhereBuilder) => void): NestedExpression<WhereBuilder> {
    return new NestedExpression(argsBuilder => new WhereBuilder(argsBuilder), setup);
}

class SqlBuilder {
    private _args: { [key: string]: any } = {};
    private index = 1;
    private content = "";

    public put(value: string) {
        if (this.content != "") {
            this.content += " ";
        }
        this.content += value.trim();
    }

    public arg(expression: any) {
        const key = `@arg${this.index++}`;
        this._args[key] = expression;
        this.put(key);
    }

    public get args(): { [key: string]: any } {
        return this._args;
    }

    public toString(): string {
        return this.content;
    }
}   

class RawExpression {
    constructor(protected content: any) {}

    public toString(): string {
        return this.content.toString();
    }
}

class NestedExpression<T extends NestedBuilder> { 
    constructor(private create: (sqlBuilder: SqlBuilder) => T, private setup: (n: T) => void) {}

    public build(argsBuilder: SqlBuilder) {
        this.setup(this.create(argsBuilder));
    }
}

class NestedBuilder {
    
    private isEmpty = true;
    
    constructor(protected argsBuilder: SqlBuilder, private init: string) {}

    protected put(text: string) {
        if (this.isEmpty) {
            this.isEmpty = false;
            this.argsBuilder.put(this.init);
        }
        else {
            this.argsBuilder.put(text);
        }
    }
}

class WhereBuilder extends NestedBuilder {
    constructor(argsBuilder: SqlBuilder) {
        super(argsBuilder, "WHERE");
    }

    public and(strings: TemplateStringsArray, ...expressions: any[]) {
        this.put("AND");
        sqlTemplate(this.argsBuilder, strings, ...expressions);
    }

    public or(strings: TemplateStringsArray, ...expressions: any[]) {
        this.put("OR");
        sqlTemplate(this.argsBuilder, strings, ...expressions);
    }
}