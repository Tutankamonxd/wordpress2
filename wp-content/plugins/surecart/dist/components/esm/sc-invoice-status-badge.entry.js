import { r as registerInstance, h } from './index-745b6bec.js';

const scInvoiceStatusBadgeCss = ":host{display:inline-block}";
const ScInvoiceStatusBadgeStyle0 = scInvoiceStatusBadgeCss;

const ScInvoiceStatusBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.status = undefined;
        this.size = 'medium';
        this.pill = false;
        this.clearable = false;
    }
    getType() {
        switch (this.status) {
            case 'paid':
                return 'success';
            case 'open':
                return 'info';
            case 'draft':
                return 'default';
        }
    }
    getText() {
        switch (this.status) {
            case 'paid':
                return wp.i18n.__('Paid', 'surecart');
            case 'open':
                return wp.i18n.__('Open', 'surecart');
            case 'draft':
                return wp.i18n.__('Draft', 'surecart');
            default:
                return this.status;
        }
    }
    render() {
        return (h("sc-tag", { key: '910dcfd2e4fc4853c0d847a6fb18e9eca7d080c1', type: this.getType(), pill: this.pill }, this.getText()));
    }
};
ScInvoiceStatusBadge.style = ScInvoiceStatusBadgeStyle0;

export { ScInvoiceStatusBadge as sc_invoice_status_badge };

//# sourceMappingURL=sc-invoice-status-badge.entry.js.map