import { r as registerInstance, h } from './index-745b6bec.js';

const scDividerCss = ":host{display:block;min-height:1px}.divider{position:relative;padding:var(--spacing) 0}.line__container{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center}.line{width:100%;border-top:1px solid var(--sc-divider-border-top-color, var(--sc-color-gray-200))}.text__container{position:relative;display:flex;justify-content:center;font-size:var(--sc-font-size-small)}.text{padding:0 var(--sc-spacing-small);background:var(--sc-divider-text-background-color, var(--sc-color-white));color:var(--sc-color-gray-500)}";
const ScDividerStyle0 = scDividerCss;

const ScDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { key: '2ab89144691ffaa5bfefe88f20f767dd5771dba3', class: "divider", part: "base" }, h("div", { key: '613d477bbaee33138b2a416a952fe084b974154f', class: "line__container", "aria-hidden": "true", part: "line-container" }, h("div", { key: 'b5820140b0a8d240b1db1050bea112ebe13fb2dd', class: "line", part: "line" })), h("div", { key: 'ca0cac97fdce3c81067029b7eb25ee63ee2a64aa', class: "text__container", part: "text-container" }, h("span", { key: 'dc0d1d2c51deacf90904f59c386666639effb212', class: "text", part: "text" }, h("slot", { key: 'cdbf227cfbbef4714833c2676dc52e6420a63475' })))));
    }
};
ScDivider.style = ScDividerStyle0;

export { ScDivider as sc_divider };

//# sourceMappingURL=sc-divider.entry.js.map