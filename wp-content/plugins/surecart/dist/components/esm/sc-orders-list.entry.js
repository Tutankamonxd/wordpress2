import { r as registerInstance, h, a as getElement } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { o as onFirstVisible } from './lazy-deb42890.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scOrdersListCss = ":host{display:block}.orders-list{display:grid;gap:0.75em}.orders-list__status{display:flex;align-items:center;gap:var(--sc-spacing-x-small)}.orders-list__heading{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between}.orders-list__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.orders-list a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.order__row{color:var(--sc-color-gray-800);text-decoration:none;display:grid;align-items:center;justify-content:space-between;gap:0;grid-template-columns:1fr 1fr 1fr auto;margin:0;padding:var(--sc-spacing-small) var(--sc-spacing-large)}.order__row:not(:last-child){border-bottom:1px solid var(--sc-color-gray-200)}.order__row:hover{background:var(--sc-color-gray-50)}.order__date{font-weight:var(--sc-font-weight-semibold)}";
const ScOrdersListStyle0 = scOrdersListCss;

const ScOrdersList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.query = {
            page: 1,
            per_page: 10,
        };
        this.allLink = undefined;
        this.heading = undefined;
        this.isCustomer = undefined;
        this.orders = [];
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.pagination = {
            total: 0,
            total_pages: 0,
        };
    }
    /** Only fetch if visible */
    componentWillLoad() {
        onFirstVisible(this.el, () => {
            this.initialFetch();
        });
    }
    async initialFetch() {
        try {
            this.loading = true;
            await this.getOrders();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async fetchOrders() {
        try {
            this.busy = true;
            await this.getOrders();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all orders */
    async getOrders() {
        if (!this.isCustomer) {
            return;
        }
        const response = (await await apiFetch({
            path: addQueryArgs(`surecart/v1/orders/`, {
                expand: ['checkout', 'checkout.line_items', 'checkout.charge'],
                ...this.query,
            }),
            parse: false,
        }));
        this.pagination = {
            total: parseInt(response.headers.get('X-WP-Total')),
            total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
        };
        this.orders = (await response.json());
        return this.orders;
    }
    nextPage() {
        this.query.page = this.query.page + 1;
        this.fetchOrders();
    }
    prevPage() {
        this.query.page = this.query.page - 1;
        this.fetchOrders();
    }
    renderStatusBadge(order) {
        const { status, checkout } = order;
        const { charge } = checkout;
        if (charge && typeof charge === 'object') {
            if (charge === null || charge === void 0 ? void 0 : charge.fully_refunded) {
                return h("sc-tag", { type: "danger" }, wp.i18n.__('Refunded', 'surecart'));
            }
            if (charge === null || charge === void 0 ? void 0 : charge.refunded_amount) {
                return h("sc-tag", { type: "info" }, wp.i18n.__('Partially Refunded', 'surecart'));
            }
        }
        return h("sc-order-status-badge", { status: status });
    }
    renderLoading() {
        return (h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
    }
    renderEmpty() {
        return (h("div", null, h("sc-divider", { style: { '--spacing': '0' } }), h("slot", { name: "empty" }, h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__("You don't have any orders.", 'surecart')))));
    }
    renderList() {
        return this.orders.map(order => {
            var _a, _b;
            const { checkout, created_at_date, id } = order;
            if (!checkout)
                return null;
            const { line_items, amount_due_display_amount, charge } = checkout;
            return (h("sc-stacked-list-row", { href: addQueryArgs(window.location.href, {
                    action: 'show',
                    model: 'order',
                    id,
                }), style: { '--columns': '4' }, "mobile-size": 500 }, h("div", { class: "order__date" }, typeof charge !== 'string' && ((charge === null || charge === void 0 ? void 0 : charge.created_at_date) || created_at_date)), h("div", null, h("sc-text", { truncate: true, style: {
                    '--color': 'var(--sc-color-gray-500)',
                } }, wp.i18n.sprintf(wp.i18n._n('%s item', '%s items', ((_a = line_items === null || line_items === void 0 ? void 0 : line_items.pagination) === null || _a === void 0 ? void 0 : _a.count) || 0, 'surecart'), ((_b = line_items === null || line_items === void 0 ? void 0 : line_items.pagination) === null || _b === void 0 ? void 0 : _b.count) || 0))), h("div", { class: "orders-list__status" }, this.renderStatusBadge(order), h("sc-order-shipment-badge", { status: order === null || order === void 0 ? void 0 : order.shipment_status })), h("div", null, amount_due_display_amount)));
        });
    }
    renderContent() {
        var _a;
        if (this.loading) {
            return this.renderLoading();
        }
        if (((_a = this.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.renderEmpty();
        }
        return (h("sc-card", { "no-padding": true }, h("sc-stacked-list", null, this.renderList())));
    }
    render() {
        var _a, _b;
        return (h("sc-dashboard-module", { key: '20f002754bc6dc04c6e652564266e8571f97f432', class: "orders-list", error: this.error }, h("span", { key: '26f21ea8772d9fea90b07c7354d418142ac3e91d', slot: "heading" }, h("slot", { key: '9a5bd34de5e086f879f2fd092c9b7dfc8c16ed4d', name: "heading" }, this.heading || wp.i18n.__('Order History', 'surecart'))), !!this.allLink && !!((_a = this.orders) === null || _a === void 0 ? void 0 : _a.length) && (h("sc-button", { key: 'b665a87632a460b7918ff0b53c85a9574f977f59', type: "link", href: this.allLink, slot: "end", "aria-label": wp.i18n.sprintf(wp.i18n.__('View all %s', 'surecart'), this.heading || wp.i18n.__('Order History', 'surecart')) }, wp.i18n.__('View all', 'surecart'), h("sc-icon", { key: '7162cfeea756ff782aa953d354df81a32751ae0e', "aria-hidden": "true", name: "chevron-right", slot: "suffix" }))), this.renderContent(), !this.allLink && (h("sc-pagination", { key: '07d77d5f6da1c836993fa50380c8b9211bf7cf4c', page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_b = this === null || this === void 0 ? void 0 : this.orders) === null || _b === void 0 ? void 0 : _b.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() })), this.busy && h("sc-block-ui", { key: 'acb8a86b95c82b92d9ceb5fb2b6488aae3b45561' })));
    }
    get el() { return getElement(this); }
};
ScOrdersList.style = ScOrdersListStyle0;

export { ScOrdersList as sc_orders_list };

//# sourceMappingURL=sc-orders-list.entry.js.map