class SelectExpression<T> {

}

interface IReadColumn {
    number: number
    string: string
}

class FakeReadColumn implements IReadColumn {
    public get number(): number {
        return 0; 
    }

    public get string(): string {
        return ""; 
    }
}

export function select<T>(build: (c: (s: string) => IReadColumn) => T): SelectExpression<T> {
    return new SelectExpression();
}