import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";

class MpStarterForm extends BoundaryElement {

  constructor() {
    super();
  }

  protected extractState(reduxState: any): any {
    return reduxState;
  }

  protected get view(): any {
    return html`
        <div class="container">
          <div class="container has-text-centered">
            <p class="header-text-1 has-text-centered">MicroProfile Starter</p>
            <p class="header-text-2 has-text-centered">Generate MicroProfile Maven Project with Examples</p>
          </div>

          <div class="box">
                <mps-form-project-coordinates></mps-form-project-coordinates>
                <mps-form-version></mps-form-version>
            </div>
        </div>
    `;
  }
}

customElements.define('mps-form', MpStarterForm);
