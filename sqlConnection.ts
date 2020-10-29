export interface SqlConnection {
    open(): Promise<void>
    close(): Promise<void>
    sql(strings: TemplateStringsArray, ...expressions: any[]): Promise<any[]>
}