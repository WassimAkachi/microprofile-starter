import BoundaryElement from "../../BoundaryElement";
import {html} from "lit";

class MpStarterFormGroupId extends BoundaryElement {

  constructor() {
    super();
  }

  protected extractState(reduxState: any): any {
    return reduxState;
  }

  protected get view(): any {
    return html`
        <div class="field">
            <label class="label">Group Id</label>
            <div class="control">
                <input class="input" type="text" placeholder="com.example">
            </div>
        </div>
    `;
  }
}

customElements.define('mps-form-group-id', MpStarterFormGroupId);
