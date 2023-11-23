import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";
import {readMpStarterFormState, readMpVersionId, readRuntimeVersion} from "../control/MpStarterFormStateReader.ts";
import {changeMpVersion, changeRuntimeVersion} from "../control/MpStarterFormDispatcher.ts";
import {
    readMpStarterBackendConfiguration,
    readMpStarterBackendState
} from "../../mpConfiguration/control/MpStarterBackendStateReader.ts";
import {gestSpec} from "../control/MpStarterReaders.ts";


class MpStarterFormMpVersionsAndServer extends BoundaryElement {

    constructor() {
        super();
    }

    protected extractState(reduxState: any): any {
        return {
            project: readMpStarterFormState(reduxState),
            mpConfig: readMpStarterBackendConfiguration(readMpStarterBackendState(reduxState))
        };
    }

    protected get view(): any {
        return html`
            <hr>
            <div class="field is-horizontal">
                <div class="field-body">

                    <div class="field">
                        <label class="label">MicroProfile Version *</label>
                        <div class="select is-dark">
                            <select name="mpVersion" @change="${(e: UIEvent) => this.updateState(e)}" required>
                                <option value="">Select MicroProfile</option>
                                ${this._mpVersionsView()}
                            </select>
                        </div>
                    </div>
                    
                    <div class="field">
                        <label class="label">MicroProfile Runtime *</label>
                        <div class="select is-dark">
                            <select name="runtimeVersion" @change="${(e: UIEvent) => this.updateState(e)}" required>
                                <option value="">Select Runtime</option>
                                ${this._mpRuntimesView()}
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }

    private _mpVersionsView() {
        console.debug(this.state);

        if (!this.state.mpConfig || !this.state.mpConfig.supportMatrix) {
            return undefined
        }

        const preSelected = readMpVersionId(this.state.project)
        return Object.keys(this.state.mpConfig.supportMatrix.configs).map(v => {
            if (v != preSelected) {
                return html`
                    <option value="${v}">${v}</option>`;
            } else {
                return html`
                    <option value="${v}" selected>${v}</option>`;
            }
        });


    }

    private updateState(e: UIEvent) {
        const {name, value} = e.target as HTMLInputElement;
        console.debug({name, value});
        if (name == "mpVersion") {
            changeMpVersion(value);
        } else if (name == 'runtimeVersion') {
            changeRuntimeVersion(value);
        }
    }

    private _mpRuntimesView() {
        const mpVersion = gestSpec(this.state.project, this.state.mpConfig)
        if (mpVersion == undefined) {
            return;
        }

        const preSelected = readRuntimeVersion(this.state.project)
        return mpVersion.supportedServers.map(v => {
            if (v != preSelected) {
                return html`
                    <option value="${v}">${v}</option>`;
            } else {
                return html`
                    <option value="${v}" selected>${v}</option>`;
            }
        });
    }
}

customElements.define('mps-form-mp-version-runtime', MpStarterFormMpVersionsAndServer);
