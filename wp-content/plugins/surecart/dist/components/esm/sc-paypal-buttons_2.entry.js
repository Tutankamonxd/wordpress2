import { r as registerInstance, c as createEvent, h, a as getElement } from './index-745b6bec.js';
import { l as loadScript, g as getScriptLoadParams } from './functions-2a4a4ba3.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { g as fetchCheckout } from './index-885ece77.js';
import { c as createErrorNotice } from './mutations-ed6d0770.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './mutations-6f9b9a86.js';
import './index-06061d4e.js';
import './utils-cd1431df.js';
import './index-c5a96d53.js';
import './google-a86aa761.js';
import './currency-a0c9bff4.js';
import './store-627acec4.js';
import './price-7bb626d0.js';

const paypalButtonsCss = ":host{display:block}.paypal-buttons{position:relative;line-height:0;text-align:center}.paypal-buttons:not(.paypal-buttons--busy):after{content:\" \";border-bottom:1px solid var(--sc-input-border-color);width:100%;height:0;top:50%;left:0;right:0;position:absolute}";
const ScPaypalButtonsStyle0 = paypalButtonsCss;

const ScPaypalButtons = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scSetState = createEvent(this, "scSetState", 7);
        this.scPaid = createEvent(this, "scPaid", 7);
        this.clientId = undefined;
        this.busy = false;
        this.merchantId = undefined;
        this.merchantInitiated = undefined;
        this.mode = undefined;
        this.order = undefined;
        this.buttons = ['paypal', 'card'];
        this.label = 'paypal';
        this.color = 'gold';
        this.loaded = undefined;
    }
    handleOrderChange(val, prev) {
        if ((val === null || val === void 0 ? void 0 : val.updated_at) === (prev === null || prev === void 0 ? void 0 : prev.updated_at)) {
            return;
        }
        this.cardContainer.innerHTML = '';
        this.paypalContainer.innerHTML = '';
        this.loadScript();
    }
    /** Load the script */
    async loadScript() {
        var _a, _b;
        if (!this.clientId || !this.merchantId)
            return;
        try {
            const paypal = await loadScript(getScriptLoadParams({
                clientId: this.clientId,
                merchantId: this.merchantId,
                merchantInitiated: this.merchantInitiated,
                reusable: (_a = this.order) === null || _a === void 0 ? void 0 : _a.reusable_payment_method_required,
                currency: (_b = this.order) === null || _b === void 0 ? void 0 : _b.currency,
            }));
            this.renderButtons(paypal);
        }
        catch (err) {
            console.error('failed to load the PayPal JS SDK script', err);
        }
    }
    /** Load the script on component load. */
    componentDidLoad() {
        this.loadScript();
    }
    /** Render the buttons. */
    renderButtons(paypal) {
        const createFunc = this.order.reusable_payment_method_required ? 'createBillingAgreement' : 'createOrder';
        const config = {
            /**
             * Validate the form, client-side when the button is clicked.
             */
            onClick: async (_, actions) => {
                const form = this.el.closest('sc-checkout');
                const isValid = await form.validate();
                return isValid ? actions.resolve() : actions.reject();
            },
            onInit: () => {
                this.loaded = true;
            },
            onCancel: () => {
                this.scSetState.emit('REJECT');
            },
            /**
             * The transaction has been approved.
             * We can capture it.
             */
            onApprove: async () => {
                var _a, _b, _c, _d;
                try {
                    this.order = (await fetchCheckout({ id: (_a = this.order) === null || _a === void 0 ? void 0 : _a.id }));
                }
                catch (e) {
                    console.error(e);
                    createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('The payment did not process. Please try again.', 'surecart') });
                    this.scSetState.emit('REJECT');
                }
                try {
                    this.scSetState.emit('PAYING');
                    const intent = (await apiFetch({
                        method: 'PATCH',
                        path: `surecart/v1/payment_intents/${((_c = (_b = this.order) === null || _b === void 0 ? void 0 : _b.payment_intent) === null || _c === void 0 ? void 0 : _c.id) || ((_d = this.order) === null || _d === void 0 ? void 0 : _d.payment_intent)}/capture`,
                    }));
                    if (['succeeded', 'processing'].includes(intent === null || intent === void 0 ? void 0 : intent.status)) {
                        this.scSetState.emit('PAID');
                        this.scPaid.emit();
                    }
                    else {
                        createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('Payment processing failed. Kindly attempt the transaction once more.', 'surecart') });
                        this.scSetState.emit('REJECT');
                    }
                }
                catch (err) {
                    console.error(err);
                    createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('Payment processing failed. Kindly attempt the transaction once more.', 'surecart') });
                    this.scSetState.emit('REJECT');
                }
            },
            /**
             * Transaction errored.
             * @param err
             */
            onError: err => {
                console.error(err);
                createErrorNotice(err);
                this.scSetState.emit('REJECT');
            },
        };
        config[createFunc] = async () => {
            return new Promise(async (resolve, reject) => {
                var _a, _b;
                // get the checkout component.
                const checkout = this.el.closest('sc-checkout');
                // submit and get the finalized order
                const order = (await checkout.submit());
                // an error occurred. reject with the error.
                if (order instanceof Error) {
                    return reject(order);
                }
                // assume there was a validation issue here.
                // that is handled by our fetch function.
                if ((order === null || order === void 0 ? void 0 : order.status) !== 'finalized') {
                    return reject(new Error('Something went wrong. Please try again.'));
                }
                // resolve the payment intent id.
                if ((_a = order === null || order === void 0 ? void 0 : order.payment_intent) === null || _a === void 0 ? void 0 : _a.external_intent_id) {
                    return resolve((_b = order === null || order === void 0 ? void 0 : order.payment_intent) === null || _b === void 0 ? void 0 : _b.external_intent_id);
                }
                // we don't have the correct payment intent for some reason.
                createErrorNotice({ code: 'missing_payment_intent', message: wp.i18n.__('Something went wrong. Please contact us for payment.', 'surecart') });
                return reject();
            });
        };
        if (paypal.FUNDING.PAYPAL) {
            const paypalButton = paypal.Buttons({
                fundingSource: paypal.FUNDING.PAYPAL,
                style: {
                    label: this.label,
                    color: this.color,
                },
                ...config,
            });
            if (paypalButton.isEligible()) {
                paypalButton.render(this.paypalContainer);
            }
        }
        if (paypal.FUNDING.CARD) {
            const cardButton = paypal.Buttons({
                fundingSource: paypal.FUNDING.CARD,
                style: {
                    color: 'black',
                },
                ...config,
            });
            if (cardButton.isEligible()) {
                cardButton.render(this.cardContainer);
            }
        }
    }
    render() {
        return (h("div", { key: '0324c72193c2d953fa4c076742dc63c98c523485', part: `base ${this.busy || (!this.loaded && 'base--busy')}`, class: { 'paypal-buttons': true, 'paypal-buttons--busy': this.busy || !this.loaded } }, (!this.loaded || this.busy) && h("sc-skeleton", { key: '0e9e99e3c0f1ad1b3fa872e0be8f7cfa7b61920c', style: { 'height': '55px', '--border-radius': '4px', 'cursor': 'wait' } }), h("div", { key: '9dd2f933a0147bfcd8547faa2deef516ca317f65', class: "sc-paypal-button-container", hidden: !this.loaded || this.busy }, h("div", { key: '8fc149d59493ed84aa413d30a4b86cc0053e8169', part: "paypal-card-button", hidden: !this.buttons.includes('card'), class: "sc-paypal-card-button", ref: el => (this.cardContainer = el) }), h("div", { key: 'ea822d5e7c912f018287ef5692e664e018f507e7', part: "paypal-button", hidden: !this.buttons.includes('paypal'), class: "sc-paypal-button", ref: el => (this.paypalContainer = el) }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "order": ["handleOrderChange"]
    }; }
};
ScPaypalButtons.style = ScPaypalButtonsStyle0;

const scSecureNoticeCss = ":host{display:block;--sc-secure-notice-icon-color:var(--sc-color-gray-300);--sc-secure-notice-font-size:var(--sc-font-size-small);--sc-secure-notice-color:var(--sc-color-gray-500)}.notice{color:var(--sc-secure-notice-color);font-size:var(--sc-secure-notice-font-size);display:flex;align-items:center;gap:5px}.notice__text{flex:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.notice__icon{color:var(--sc-secure-notice-icon-color);margin-right:5px}";
const ScSecureNoticeStyle0 = scSecureNoticeCss;

const ScSecureNotice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { key: '6520d597eff8bb6447df14f4ea1ab1909474c9fa', class: "notice", part: "base" }, h("svg", { key: 'e09e9897ab5be23022e92de046cba5f6844444e0', class: "notice__icon", part: "icon", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 512 512", fill: "currentColor" }, h("path", { key: '3848b656c8d024cd82f437ec9c89abd50ff90c72', d: "M368,192H352V112a96,96,0,1,0-192,0v80H144a64.07,64.07,0,0,0-64,64V432a64.07,64.07,0,0,0,64,64H368a64.07,64.07,0,0,0,64-64V256A64.07,64.07,0,0,0,368,192Zm-48,0H192V112a64,64,0,1,1,128,0Z" })), h("span", { key: '51c04287ba2a0e98f3b843648677f547b1be1979', class: "notice__text", part: "text" }, h("slot", { key: '5f70e0f00fbaedcfb8d5b5ca0cd539997d495b1f', name: "prefix" }), h("slot", { key: 'db483eb1c32984166b864c91b38e9834eab0bfe8' }), h("slot", { key: '5a12519490d644c3283a6231f43d3e60de61e5c3', name: "suffix" }))));
    }
};
ScSecureNotice.style = ScSecureNoticeStyle0;

export { ScPaypalButtons as sc_paypal_buttons, ScSecureNotice as sc_secure_notice };

//# sourceMappingURL=sc-paypal-buttons_2.entry.js.map