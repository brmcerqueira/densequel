export interface SqlConnection {
    open(): Promise<void>
    close(): Promise<void>
    sql<T>(strings: TemplateStringsArray, ...expressions: any[]): Promise<T[] | number>
}