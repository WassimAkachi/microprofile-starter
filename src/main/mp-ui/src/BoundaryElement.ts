import applicationStore from "./redux/control/ApplicationStore.ts";
import {html, LitElement} from "lit";

export default class BoundaryElement extends LitElement {
  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};
  private _state?: any = undefined
  private unsubscribe?: () => void = undefined

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = applicationStore.subscribe(() => this.triggerViewUpdate())
    this.beforeRender();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  private triggerViewUpdate() {
    this.beforeRender();
    this.reRender();
  }

  protected beforeRender() {
    const storeState = applicationStore.getState();
    this._state = this.extractState(storeState);
  }

  protected createRenderRoot() {
    return this.renderTarget;
  }

  render() {
    return this.view;
  }

  updated(_changedProperties: Map<string, any>) {
    this.afterUpdate();
  }

  protected reRender() {
    this.requestUpdate();
  }

  protected extractState(reduxState: any): any {
    return reduxState
  }

  protected get view(): any {
    return html`<H2>${this.constructor.name}</H2>`
  }

  protected get state(): any {
    return this._state
  }

  protected get renderTarget(): HTMLElement {
    return this;
  }

  protected afterUpdate() {
    //
  }
}