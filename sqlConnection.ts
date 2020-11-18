export interface SqlResult<T> {
    rows?: T[],
    affected?: number
}

export interface SqlConnection {
    open(): Promise<void>
    close(): Promise<void>
    sql<T>(strings: TemplateStringsArray, ...expressions: any[]): Promise<SqlResult<T>>
}