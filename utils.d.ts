export type MaybeAsync<T> = T | Promise<T>;
export type Many<T> = T | readonly T[];
export declare const many: <T>(item: Many<T>) => readonly T[];
export declare const sleep: (ms: number) => Promise<unknown>;
