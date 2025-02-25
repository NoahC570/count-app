/**
 * Copyright 2025 NoahC570
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**npm install @haxtheweb/multiple-choice --save
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
    this.min = 0;
    this.max = 99;

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/count-app.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number },
    };
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("count")) {
      if (this.count === 21) {
        this.makeItRain();
      }
      // do your testing of the value and make it rain by calling makeItRain
    }
  }

  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        :host([count="18"]) {
          color: var(--ddd-theme-default-athertonViolet);
        }
        :host([count="21"]) {
          color: var(--ddd-theme-default-keystoneYellow);
        }
        :host([count="0"]) {
          color: var(--ddd-theme-default-original87Pink);
        }
        :host([count="99"]) {
          color: var(--ddd-theme-default-original87Pink);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        .counter {
          font-size: var(--count-app-label-font-size, var(--ddd-font-size-xxl));
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti">
          <div class="counter">${this.count}</div>
        </confetti-container>
        <div class="buttons">
          <button
            @click="${this.decrease}"
            ?disabled="${this.min === this.count}"
          >
            -1
          </button>
          <button
            @clock="<button"
            @click="${this.increase}"
            ?disabled="${this.max === this.count}"
          >
            +1
          </button>
        </div>
      </div>
    `;
  }

  increase() {
    if (this.count < this.max) {
      this.count++;
    }
  }

  decrease() {
    if (this.count > this.min) {
      this.count--;
    }
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
