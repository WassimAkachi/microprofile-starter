import BoundaryElement from "../../BoundaryElement";
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
            <form class="form">
                <mps-form-group-id></mps-form-group-id>
            </form>
        </div>
    `;
  }
}

customElements.define('mps-form', MpStarterForm);
