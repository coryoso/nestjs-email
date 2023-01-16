"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const client_sesv2_1 = require("@aws-sdk/client-sesv2");
const common_1 = require("@nestjs/common");
const email_options_1 = require("./email.options");
const email_service_1 = require("./email.service");
let EmailModule = EmailModule_1 = class EmailModule {
    static forRoot(options) {
        return {
            module: EmailModule_1,
            providers: [
                {
                    provide: email_options_1.EMAIL_MODULE_OPTIONS,
                    useValue: resolveOptions(options),
                },
                {
                    provide: email_options_1.SES_TOKEN,
                    useValue: sesFromOptions(options),
                },
            ],
            global: options.global,
        };
    }
    static forRootAsync(options) {
        return {
            module: EmailModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: email_options_1.EMAIL_MODULE_OPTIONS,
                    ...(options.useFactory
                        ? {
                            useFactory: async (...args) => resolveOptions(await options.useFactory(...args)),
                            inject: options.inject || [],
                        }
                        : {
                            useFactory: async (optionsFactory) => resolveOptions(await optionsFactory.createEmailOptions()),
                            inject: [options.useExisting || options.useClass],
                        }),
                },
                ...(options.useExisting || options.useFactory
                    ? []
                    : [{ provide: options.useClass, useClass: options.useClass }]),
                {
                    provide: email_options_1.SES_TOKEN,
                    useFactory: sesFromOptions,
                    inject: [email_options_1.EMAIL_MODULE_OPTIONS],
                },
            ],
            global: options.global,
        };
    }
};
EmailModule = EmailModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
exports.EmailModule = EmailModule;
const resolveOptions = (options) => ({
    open: false,
    send: false,
    wrappers: [],
    replyTo: [],
    ...options,
});
const sesFromOptions = (options) => options.ses instanceof client_sesv2_1.SESv2Client
    ? options.ses
    : new client_sesv2_1.SESv2Client({
        region: 'us-east-1',
        ...options.ses,
    });
//# sourceMappingURL=email.module.js.map