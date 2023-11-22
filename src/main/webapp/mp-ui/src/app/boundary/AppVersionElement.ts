import BoundaryElement from "../../BoundaryElement";
import {html} from "lit";
import {appVersion} from "../../configuration/entity/app-config";

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
