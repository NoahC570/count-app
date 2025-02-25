/**
 * Copyright 2025 NoahC570
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `count-app`
 * 
 * @demo index.html
 * @element count-app
 */
export class CountApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "count-app";
  }

  constructor() {
    super();
    this.count = 0;

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/count-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count = "10" ]) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter{
        font-size: var(--count-app-label-font-size, var(--ddd-font-size-xxl));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
      <div class="counter">${this.count}</div>
      <div class="buttons">
        <button @click = "${this.decrese}">-1</button>
        <button @click = "${this.increase}">+1</button>
    </div>    
    `;
  }

  increase() {
    this.count++;
  }
  decrese() {
    this.count--;
  }
  reset() {
    this.count = 0;
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CountApp.tag, CountApp);