import { SqlProvider } from "../sqlProvider.ts";

export class Provider implements SqlProvider {
    public parseString(expression: string): string {
        return `'${expression}'`;
    }

    public parseArg(index: number): string {
        return `@arg${index}`;
    }
}