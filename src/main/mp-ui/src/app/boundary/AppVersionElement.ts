import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";
import {appVersion} from "../../configuration/entity/app-config.ts";

class AppVersionElement extends BoundaryElement {

  constructor() {
    super();
  }

  protected extractState(_reduxState: any): any {
    return appVersion();
  }

  protected get view(): any {
    return html`
      <code>${this.state}</code>
    `;
  }
}

customElements.define('mps-app-version', AppVersionElement);
