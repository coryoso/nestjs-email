import { ReactNode } from 'react';
export declare class SubjectCollector {
    private context?;
    collect(children: ReactNode): JSX.Element;
    get subject(): string;
}
/**
 * Wrap mjml title to also make the title the email's subject
 */
export declare const Title: ({ children }: {
    children: string;
}) => JSX.Element;
