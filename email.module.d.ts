import { DynamicModule, Type } from '@nestjs/common';
import { EmailModuleOptions } from './email.options';
import { MaybeAsync } from './utils';
export interface EmailOptionsFactory {
    createEmailOptions: () => MaybeAsync<EmailModuleOptions>;
}
export interface EmailModuleAsyncOptions extends Pick<DynamicModule, 'imports' | 'global'> {
    useExisting?: Type<EmailOptionsFactory>;
    useClass?: Type<EmailOptionsFactory>;
    useFactory?: (...args: any[]) => MaybeAsync<EmailModuleOptions>;
    inject?: any[];
}
export declare class EmailModule {
    static forRoot(options: EmailModuleOptions & Pick<DynamicModule, 'global'>): DynamicModule;
    static forRootAsync(options: EmailModuleAsyncOptions): DynamicModule;
}
