export function raw(content: any): RawExpression {
    return new RawExpression(content);
}

export class RawExpression {
    constructor(protected content: any) {}

    public toString(): string {
        return typeof this.content == "string" ? `'${this.content}'` : this.content.toString();
    }
}