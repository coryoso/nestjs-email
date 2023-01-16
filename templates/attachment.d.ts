import { MessageAttachment } from 'emailjs/smtp/message';
import { ReactNode } from 'react';
interface AttachmentProps extends Pick<MessageAttachment, 'charset' | 'method'> {
    /** The file data */
    data: string;
    /** The file's content-type */
    type: string;
    /** The file's name */
    name: string;
}
export declare class AttachmentCollector {
    private context?;
    collect(children?: ReactNode): JSX.Element;
    get attachments(): AttachmentProps[];
}
export declare const Attachment: (props: AttachmentProps) => null;
export {};
