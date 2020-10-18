export function sql(strings: TemplateStringsArray, ...expressions: any[]): string {
    const args: { [key: string]: any } = {};
    let index = 1;
    let result = "";
    strings.forEach((text, i) => {
        result += text;

        const expression = expressions[i];

        if (expression) {
            if (expression instanceof RawExpression) {
                result += expression.value;
            }
            else {
                const key = `@arg${index++}`;
                result += key;
                args[key] = expression;
            }
        }
    });

    console.log(args);

    return result;
}

export function raw(value: any): RawExpression {
    return new RawExpression(value);
}

class RawExpression {
    constructor(public readonly value: any) {
        
    }
}