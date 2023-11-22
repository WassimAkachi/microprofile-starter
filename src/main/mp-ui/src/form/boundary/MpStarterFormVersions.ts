import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";
import {readMpStarterFormState, readProject} from "../control/MpStarterFormStateReader.ts";
import {changeJavaVersion, changeMpVersion, changeReset} from "../control/MpStarterFormDispatcher.ts";
import {
    readMpStarterBackendConfiguration,
    readMpStarterBackendState
} from "../../mpConfiguration/control/MpStarterBackendStateReader.ts";


class MpStarterFormVersions extends BoundaryElement {

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    protected extractState(reduxState: any): any {
        return {
            project: readProject(readMpStarterFormState(reduxState)),
            mpConfig: readMpStarterBackendConfiguration(readMpStarterBackendState(reduxState))
        };
    }

    protected get view(): any {
        return html`
            <form class="form"
                  @submit="${(e: UIEvent) => this.submitForm(e)}"
                  @cancel="${(e: UIEvent) => this.cancelForm(e)}">
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label class="label">MicroProfile Version</label>
                            <div class="select is-primary">
                                <select name="mpVersion" @change="${(e: UIEvent) => this.updateState(e)}">
                                    <option>Select dropdown</option>
                                    ${this._mpVersionsView()}
                                </select>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Java Version</label>
                            <div class="select is-primary">
                                <select name="javaVersion" @change="${(e: UIEvent) => this.updateState(e)}">
                                    <option>Select dropdown</option>
                                    <option>With options</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    private _mpVersionsView() {
        console.debug(this.state);
        return Object.keys(this.state.mpConfig.supportMatrix.configs).map(v => html`
            <option value="${v}">${v}</option>`);
    }

    private updateState(e: UIEvent) {
        const {name, value} = e.target as HTMLInputElement;
        console.debug({name, value});
        if (name == 'mpVersion') {
            changeMpVersion(value);
        } else if (name == 'javaVersion') {
            changeJavaVersion(value);
        }
    }

    private submitForm(e: UIEvent) {
        e.stopPropagation();
        e.preventDefault();
    }

    private cancelForm(_e: UIEvent) {
        changeReset();
    }
}

customElements.define('mps-form-version', MpStarterFormVersions);
