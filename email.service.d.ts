import { SESv2Client as SES } from '@aws-sdk/client-sesv2';
import { ReactElement } from 'react';
import { EmailOptions } from './email.options';
import { EmailMessage } from './message';
import { Many } from './utils';
export declare class EmailService {
    private readonly ses;
    private readonly options;
    private readonly logger;
    constructor(ses: SES, options: EmailOptions);
    send<P extends {}>(to: Many<string>, template: (props: P) => ReactElement, props: P): Promise<void>;
    render<P extends {}>(to: Many<string>, template: (props: P) => ReactElement, props: P): Promise<EmailMessage>;
    sendMessage(msg: EmailMessage): Promise<void>;
    private renderHtml;
    private renderText;
    private openEmail;
}
