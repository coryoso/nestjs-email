import { Message, MessageHeaders } from 'emailjs';
export declare class EmailMessage extends Message {
    readonly templateName: string;
    readonly to: readonly string[];
    readonly html: string;
    constructor({ templateName, html, ...headers }: Partial<MessageHeaders> & {
        templateName: string;
        html: string;
    });
}
