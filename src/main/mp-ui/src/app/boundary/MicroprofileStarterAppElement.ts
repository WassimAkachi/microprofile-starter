import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";

class MicroprofileStarterAppElement extends BoundaryElement {

    constructor() {
        super();
    }

    protected get view(): any {
        return html`
            <h1>Starter</h1>
            <mps-form></mps-form>
        `;
    }
}

customElements.define('mps-app', MicroprofileStarterAppElement);
