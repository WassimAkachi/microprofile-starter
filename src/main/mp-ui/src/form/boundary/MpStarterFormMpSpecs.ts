import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";
import {readMpSpecs, readMpStarterFormState} from "../control/MpStarterFormStateReader.ts";
import {changeMpSpecs} from "../control/MpStarterFormDispatcher.ts";
import {
    readMpSpecDescription,
    readMpStarterBackendConfiguration,
    readMpStarterBackendState
} from "../../mpConfiguration/control/MpStarterBackendStateReader.ts";
import {gestSpec} from "../control/MpStarterReaders.ts";


class MpStarterFormMpSpecs extends BoundaryElement {

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
        return this._mpSpecsView();
    }

    private updateState(e: UIEvent) {
        const {name, value, checked} = e.target as HTMLInputElement;
        let specs = [...readMpSpecs(this.state.project)]

        console.debug({name, value, checked})
        if (checked) {
            specs.push(value)
        } else {
            specs = specs.filter(s => s !== value)
        }

        const mpSpecs = this._getSpecs();
        console.debug({mpSpecs})
        if (mpSpecs == undefined) {
            return;
        }

        specs = specs.filter(s => mpSpecs.includes(s))
        changeMpSpecs(specs)
    }

    private _mpSpecsView() {
        const specs = this._getSpecs();
        console.debug({specs})
        if (specs == undefined) {
            return;
        }

        const preSelected = readMpSpecs(this.state.project)
        const specView = specs.map(v => {
                if (preSelected.includes(v)) {
                    return html`
                        <div class="field">
                            <div class="control">
                                <label class="checkbox">
                                    <input type="checkbox" name="mpSpecs" value="${v}" checked
                                           @change="${(e: UIEvent) => this.updateState(e)}">
                                    ${this.getSpecView(v)}
                                </label>
                            </div>
                        </div>
                    `;
                } else {
                    return html`
                        <div class="field">
                            <div class="control">
                                <label class="checkbox">
                                    <input type="checkbox" name="mpSpecs" value="${v}"
                                           @change="${(e: UIEvent) => this.updateState(e)}">
                                    ${this.getSpecView(v)}
                                </label>
                            </div>
                        </div>
                    `;
                }
            }
        );

        return html`
            <hr>${specView}`;
    }

    private _getSpecs = () => {
        const mpVersion = gestSpec(this.state.project, this.state.mpConfig)
        if (mpVersion == undefined) {
            return;
        }
        return mpVersion.specs;
    };

    private getSpecView(specId: string) {
        const description = readMpSpecDescription(specId, this.state.mpConfig);
        if (description == undefined) {
            return html`${specId}`;
        }

        const spec_and_description = description.split('-', 2);
        if (spec_and_description.length > 1) {
            return html`
                <span class="has-text-dark is-family-monospace">${spec_and_description[0]} - </span>
                <span class="has-text-weight-light has-text-grey">${spec_and_description[1]}</span>
            `;
        } else {
            return html`
                <span>${readMpSpecDescription(specId, this.state.mpConfig)}</span>
            `;
        }
    }
}

customElements.define('mps-form-specs', MpStarterFormMpSpecs);
