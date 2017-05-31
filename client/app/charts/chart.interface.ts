export interface Chart {
    init(): void;
    setData(data:any, config ?: any): void;
    load(): void;
    ease(): void;
}
