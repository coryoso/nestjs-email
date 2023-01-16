import { SESv2Client as SES, SESv2ClientConfig } from '@aws-sdk/client-sesv2';
import { ReactElement } from 'react';
import { Many } from './utils';
export declare const SES_TOKEN: unique symbol;
export declare const EMAIL_MODULE_OPTIONS: unique symbol;
export interface EmailModuleOptions {
    from: string;
    open?: boolean;
    send?: boolean;
    replyTo?: Many<string>;
    wrappers?: ReadonlyArray<(el: ReactElement) => ReactElement>;
    ses?: SES | SESv2ClientConfig;
}
export type EmailOptions = Required<Readonly<Omit<EmailModuleOptions, 'ses'>>>;
