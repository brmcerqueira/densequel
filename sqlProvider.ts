export interface SqlProvider {
    parseString(expression: string): string
    parseArg(index: number): string
}