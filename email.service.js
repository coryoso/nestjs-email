"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const client_sesv2_1 = require("@aws-sdk/client-sesv2");
const render_1 = require("@faire/mjml-react/utils/render");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const html_to_text_1 = require("html-to-text");
const textFormatters = require("html-to-text/lib/formatter");
const openUrl = require("open");
const react_1 = require("react");
const tempy_1 = require("tempy");
const email_options_1 = require("./email.options");
const message_1 = require("./message");
const attachment_1 = require("./templates/attachment");
const text_rendering_1 = require("./templates/text-rendering");
const title_1 = require("./templates/title");
const utils_1 = require("./utils");
let EmailService = EmailService_1 = class EmailService {
    constructor(ses, options) {
        this.ses = ses;
        this.options = options;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    async send(to, template, props) {
        const { send, open } = this.options;
        const msg = await this.render(to, template, props);
        if (send) {
            await this.sendMessage(msg);
            return;
        }
        this.logger.debug(`Would have sent ${msg.templateName} email if enabled to ${msg.to.join(', ')}`);
        if (open) {
            await this.openEmail(msg.html);
        }
    }
    async render(to, template, props) {
        const docEl = this.options.wrappers.reduceRight((prev, wrap) => wrap(prev), (0, react_1.createElement)(template, props));
        const { html, subject, attachments } = this.renderHtml(docEl);
        const text = this.renderText(docEl);
        const message = new message_1.EmailMessage({
            templateName: template.name,
            to: to,
            from: this.options.from,
            ...(!this.options.replyTo || this.options.replyTo.length === 0
                ? {}
                : {
                    'reply-to': (0, utils_1.many)(this.options.replyTo).join(', '),
                }),
            subject,
            text,
            html,
            attachment: [
                { data: html, alternative: true },
                ...attachments.map((file) => ({ ...file })),
            ],
        });
        this.logger.debug(`Rendered ${message.templateName} email for ${message.to.join(', ')}`);
        return message;
    }
    async sendMessage(msg) {
        const encoded = await msg.readAsync();
        const command = new client_sesv2_1.SendEmailCommand({
            Content: {
                Raw: {
                    Data: Buffer.from(encoded),
                },
            },
        });
        try {
            await this.ses.send(command);
            this.logger.debug(`Sent ${msg.templateName} email to ${msg.to.join(', ')}`);
        }
        catch (e) {
            this.logger.error('Failed to send email', e instanceof Error ? e.stack : e);
            throw e;
        }
    }
    renderHtml(templateEl) {
        const collector = new title_1.SubjectCollector();
        const attachments = new attachment_1.AttachmentCollector();
        const { html } = (0, render_1.render)(attachments.collect(collector.collect(templateEl)), {
            minify: false,
        });
        return {
            html,
            subject: collector.subject,
            attachments: attachments.attachments,
        };
    }
    renderText(templateEl) {
        const { html: htmlForText } = (0, render_1.render)((0, react_1.createElement)(text_rendering_1.RenderForText, null, templateEl), {
            minify: false,
        });
        const text = (0, html_to_text_1.convert)(htmlForText, {
            selectors: [
                { selector: 'img', format: 'skip' },
                { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
            ],
            formatters: {
                // mjml uses `role="presentation"` for non-table tables, skip those.
                // actual tables get rendered as normal.
                table: (el, walk, builder, options) => el.attribs.role === 'presentation'
                    ? walk(el.children, builder)
                    : textFormatters.dataTable(el, walk, builder, options),
            },
        });
        return text;
    }
    async openEmail(html) {
        const temp = (0, tempy_1.file)({ extension: 'html' });
        await fs_1.promises.writeFile(temp, html);
        await openUrl(`file://${temp}`);
        // try to wait for chrome to open before deleting temp file
        void (0, utils_1.sleep)(10000)
            .then(() => fs_1.promises.unlink(temp))
            .catch();
    }
};
EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_options_1.SES_TOKEN)),
    __param(1, (0, common_1.Inject)(email_options_1.EMAIL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [client_sesv2_1.SESv2Client, Object])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map