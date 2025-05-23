import { r as registerInstance, h } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scCustomerEditCss = ":host{display:block;position:relative}.customer-edit{display:grid;gap:0.75em}";
const ScCustomerEditStyle0 = scCustomerEditCss;

const ScCustomerEdit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.customer = undefined;
        this.successUrl = undefined;
        this.loading = undefined;
        this.error = undefined;
    }
    async handleSubmit(e) {
        var _a;
        this.loading = true;
        try {
            const { email, first_name, last_name, phone, billing_matches_shipping, shipping_name, shipping_city, 'tax_identifier.number_type': tax_identifier_number_type, 'tax_identifier.number': tax_identifier_number, shipping_country, shipping_line_1, shipping_postal_code, shipping_state, billing_name, billing_city, billing_country, billing_line_1, billing_postal_code, billing_state, } = await e.target.getFormJson();
            this.customer.billing_address = {
                name: billing_name,
                city: billing_city,
                country: billing_country,
                line_1: billing_line_1,
                postal_code: billing_postal_code,
                state: billing_state,
            };
            this.customer.shipping_address = {
                name: shipping_name,
                city: shipping_city,
                country: shipping_country,
                line_1: shipping_line_1,
                postal_code: shipping_postal_code,
                state: shipping_state,
            };
            await apiFetch({
                path: addQueryArgs(`surecart/v1/customers/${(_a = this.customer) === null || _a === void 0 ? void 0 : _a.id}`, { expand: ['tax_identifier'] }),
                method: 'PATCH',
                data: {
                    email,
                    first_name,
                    last_name,
                    phone,
                    billing_matches_shipping: billing_matches_shipping === 'on',
                    shipping_address: this.customer.shipping_address,
                    billing_address: this.customer.billing_address,
                    ...(tax_identifier_number && tax_identifier_number_type
                        ? {
                            tax_identifier: {
                                number: tax_identifier_number,
                                number_type: tax_identifier_number_type,
                            },
                        }
                        : {}),
                },
            });
            if (this.successUrl) {
                window.location.assign(this.successUrl);
            }
            else {
                this.loading = false;
            }
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.loading = false;
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return (h("sc-dashboard-module", { key: '2515621930c5eb0125490beb27405939b618fbe3', class: "customer-edit", error: this.error }, h("span", { key: 'a770a2c3d22c27d0aac46fc10e78bc47cd3d76f5', slot: "heading" }, this.heading || wp.i18n.__('Update Billing Details', 'surecart'), ' ', !((_a = this === null || this === void 0 ? void 0 : this.customer) === null || _a === void 0 ? void 0 : _a.live_mode) && (h("sc-tag", { key: 'a6980e5798646731d1e5d12c91f7a97cf773a63a', type: "warning", size: "small" }, wp.i18n.__('Test', 'surecart')))), h("sc-card", { key: '9a72407271d4d6cf599d6b723a3cd78136cc79d1' }, h("sc-form", { key: '27f2085336f0d34b8e1e457b3c4cb774617d418e', onScFormSubmit: e => this.handleSubmit(e) }, h("sc-columns", { key: '4ddcc9b4971c04a936d4c4e57344395ec699c765', style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, h("sc-column", { key: 'b33b8a2c944eed291ba08bc3cb9eb4f4aeda8f80' }, h("sc-input", { key: '71eb4def4fccfeb66e18de32cb0b6ee2dd89f18b', label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.customer) === null || _b === void 0 ? void 0 : _b.first_name })), h("sc-column", { key: '9a809ed9ffe2a7b6eba52f091dbd082015f15ae3' }, h("sc-input", { key: '54a88a981ece697f9e45eb74359f6534337ee2e5', label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.customer) === null || _c === void 0 ? void 0 : _c.last_name }))), h("sc-column", { key: '4b67f9b749eb549c470a97e094f8ccc3edd3ccd0' }, h("sc-phone-input", { key: 'ca93dc2e20042408c162e0ce5af13959bc55b309', label: wp.i18n.__('Phone', 'surecart'), name: "phone", value: (_d = this.customer) === null || _d === void 0 ? void 0 : _d.phone })), h("sc-flex", { key: 'e5d06f43786d0d39fdca8b71c1ab4c44761cbc8d', style: { '--sc-flex-column-gap': 'var(--sc-spacing-medium)' }, flexDirection: "column" }, h("div", { key: '0b52c6989244a2c38f4ca4f40b581207ce2f0e72' }, h("sc-address", { key: '4a2329b6580f9906a1590471d339746394022681', label: wp.i18n.__('Shipping Address', 'surecart'), showName: true, address: {
                ...(_e = this.customer) === null || _e === void 0 ? void 0 : _e.shipping_address,
            }, required: false, names: {
                name: 'shipping_name',
                country: 'shipping_country',
                line_1: 'shipping_line_1',
                line_2: 'shipping_line_2',
                city: 'shipping_city',
                postal_code: 'shipping_postal_code',
                state: 'shipping_state',
            } })), h("div", { key: '7502cc108daa29f727b85effddc124c022785a47' }, h("sc-checkbox", { key: '1859f4c572985c2824b196911073ebead6869b6e', name: "billing_matches_shipping", checked: (_f = this.customer) === null || _f === void 0 ? void 0 : _f.billing_matches_shipping, onScChange: e => {
                this.customer = {
                    ...this.customer,
                    billing_matches_shipping: e.target.checked,
                };
            } }, wp.i18n.__('Billing address is same as shipping', 'surecart'))), h("div", { key: 'c196d24d06cade953ee0c7eedfd232ff7ca0c59e', style: { display: ((_g = this.customer) === null || _g === void 0 ? void 0 : _g.billing_matches_shipping) ? 'none' : 'block' } }, h("sc-address", { key: '27d7455cca61276f23cc49e33c89581e2e98f46c', label: wp.i18n.__('Billing Address', 'surecart'), showName: true, address: {
                ...(_h = this.customer) === null || _h === void 0 ? void 0 : _h.billing_address,
            }, names: {
                name: 'billing_name',
                country: 'billing_country',
                line_1: 'billing_line_1',
                line_2: 'billing_line_2',
                city: 'billing_city',
                postal_code: 'billing_postal_code',
                state: 'billing_state',
            }, required: true })), h("sc-tax-id-input", { key: '91295122d928f7053925acc197cdc46bf7f16485', show: true, number: (_k = (_j = this.customer) === null || _j === void 0 ? void 0 : _j.tax_identifier) === null || _k === void 0 ? void 0 : _k.number, type: (_m = (_l = this.customer) === null || _l === void 0 ? void 0 : _l.tax_identifier) === null || _m === void 0 ? void 0 : _m.number_type })), h("div", { key: '829dec7ece2797fcca40d4b73048a6979ed274f3' }, h("sc-button", { key: 'a0b8c4f0529823b877fe49167f6935143f3a2f0c', type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && h("sc-block-ui", { key: 'f366493d8d98d00497b8ca11017a7448c3db9680', spinner: true })));
    }
};
ScCustomerEdit.style = ScCustomerEditStyle0;

export { ScCustomerEdit as sc_customer_edit };

//# sourceMappingURL=sc-customer-edit.entry.js.map