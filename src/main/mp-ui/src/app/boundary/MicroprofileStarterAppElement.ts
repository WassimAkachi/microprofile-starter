import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";

class MicroprofileStarterAppElement extends BoundaryElement {

    constructor() {
        super();
    }

    protected get view(): any {
        return html`
            <mps-form></mps-form>
        `;
    }

}

customElements.define('mps-app', MicroprofileStarterAppElement);
