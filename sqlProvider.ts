export interface SqlProvider {
    parseString(expression: string): string
    parseArg(index: number): { key: string, value: string }
}