'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scBreadcrumbCss = ":host{display:inline-flex}.breadcrumb-item{display:inline-flex;align-items:center;font-family:var(--sc-font-sans);font-size:var(--sc-font-size-small);font-weight:var(--sc-font-weight-semibold);color:var(--sc-breadcrumb-color, var(--sc-color-gray-600));line-height:var(--sc-line-height-normal);white-space:nowrap}.breadcrumb-item__label{display:inline-block;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:none;color:inherit;background:none;border:none;border-radius:var(--sc-border-radius-medium);padding:0;margin:0;cursor:pointer;transition:color var(--sc-transition-fast) ease}:host(:not(:last-of-type)) .breadcrumb-item__label{color:var(--sc-breadcrumb-item-label-color, var(--sc-color-gray-900))}:host(:not(:last-of-type)) .breadcrumb-item__label:hover{color:var(--sc-breadcrumb-item-label-hover-color, var(--sc-color-primary-500))}:host(:not(:last-of-type)) .breadcrumb-item__label:active{color:var(--sc-breadcrumb-item-label-active-color, var(--sc-color-gray-900))}.breadcrumb-item__label:focus{box-shadow:var(--sc-focus-ring)}.breadcrumb-item__prefix,.breadcrumb-item__suffix{display:none;flex:0 0 auto;display:flex;align-items:center}.breadcrumb-item--has-prefix .breadcrumb-item__prefix{display:inline-flex;margin-right:var(--sc-spacing-x-small)}.breadcrumb-item--has-suffix .breadcrumb-item__suffix{display:inline-flex;margin-left:var(--sc-spacing-x-small)}:host(:last-of-type) .breadcrumb-item__separator{display:none}.breadcrumb-item__separator{display:inline-flex;align-items:center;margin:0 var(--sc-spacing-x-small);user-select:none}";
const ScBreadcrumbStyle0 = scBreadcrumbCss;

const ScBreadcrumb = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.href = undefined;
        this.target = undefined;
        this.rel = 'noreferrer noopener';
        this.hasPrefix = undefined;
        this.hasSuffix = undefined;
    }
    handleSlotChange() {
        this.hasPrefix = !!this.el.querySelector('[slot="prefix"]');
        this.hasSuffix = !!this.el.querySelector('[slot="suffix"]');
    }
    render() {
        const Tag = this.href ? 'a' : 'div';
        return (index.h("div", { key: '7239d5e6a902f999dfb652e442d94b7761778de3', part: "base", class: {
                'breadcrumb-item': true,
                'breadcrumb-item--has-prefix': this.hasPrefix,
                'breadcrumb-item--has-suffix': this.hasSuffix,
            } }, index.h("span", { key: 'dec24458b4ddc285dffd36ac66042b1683d878eb', part: "prefix", class: "breadcrumb-item__prefix" }, index.h("slot", { key: 'b4802136ba888e2559a1838ea26cf8c48584ff94', name: "prefix" })), index.h(Tag, { key: '5574a2ee9ba0e492b0f9105fe3537e90e9dbd165', part: "label", class: "breadcrumb-item__label breadcrumb-item__label--link", href: this.href, target: this.target, rel: this.rel }, index.h("slot", { key: '7220c9aae004fa90188a5a288bd7b28d0d303aec' })), index.h("span", { key: '1021eb8d314c57522d5c45fb2a600a2545fea5fd', part: "suffix", class: "breadcrumb-item__suffix" }, index.h("slot", { key: '64350c9f1e76cb08d976c12b084969425073d579', name: "suffix", onSlotchange: () => this.handleSlotChange() })), index.h("span", { key: 'ff25470a89cb1fd147103daab0c5f6aee1774c9d', part: "separator", class: "breadcrumb-item__separator", "aria-hidden": "true" }, index.h("slot", { key: '1a824c7acc8f65bfab60748912c2284db88cc8f9', name: "separator", onSlotchange: () => this.handleSlotChange() }, index.h("sc-icon", { key: '6589208510906a71ed27710462a4f6016838e112', name: "chevron-right" })))));
    }
    get el() { return index.getElement(this); }
};
ScBreadcrumb.style = ScBreadcrumbStyle0;

exports.sc_breadcrumb = ScBreadcrumb;

//# sourceMappingURL=sc-breadcrumb.cjs.entry.js.map