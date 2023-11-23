import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";
import {
    readBuildTool,
    readJavaVersion,
    readMpStarterFormState,
    readMpVersionId,
    readRuntimeVersion
} from "../control/MpStarterFormStateReader.ts";
import {changeBuildTool, changeJavaVersion} from "../control/MpStarterFormDispatcher.ts";
import {
    readMpStarterBackendConfiguration,
    readMpStarterBackendState,
    readServers
} from "../../mpConfiguration/control/MpStarterBackendStateReader.ts";
import {MpOptionsAvailableServer} from "../../mpConfiguration/entity/Entities.ts";


class MpStarterFormJavaVersionAndBuildTool extends BoundaryElement {

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
                            <label class="label">Java Version *</label>
                            <div class="select is-dark">
                                <select name="javaVersion" @change="${(e: UIEvent) => this.updateState(e)}" required>
                                    <option value="">Select Java Version</option>
                                    ${this._javaVersionsView()}
                                </select>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Build Tool *</label>
                            <div class="select is-dark">
                                <select name="buildTool" @change="${(e: UIEvent) => this.updateState(e)}" required>
                                    <option value="">Select Build Tool</option>
                                    ${this._buildToolView()}
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
        `;
    }

    private updateState(e: UIEvent) {
        const {name, value} = e.target as HTMLInputElement;
        console.debug({name, value});
        if (name == "javaVersion") {
            changeJavaVersion(value);
        } else if (name == 'buildTool') {
            changeBuildTool(value);
        }
    }

    private _javaVersionsView() {
        const mpRuntime = this._getRuntime();
        if (mpRuntime == undefined) {
            return undefined;
        }

        const preSelected = readJavaVersion(this.state.project)
        return mpRuntime.javaSEVersions.map(v => {
            if(v != preSelected) {
                return html`
                <option value="${v}">${v}</option>`;
            } else {
                return html`
                <option value="${v}" selected>${v}</option>`;
            }
        });
    }

    private _buildToolView() {
        const mpRuntime = this._getRuntime();
        if (mpRuntime == undefined) {
            return undefined;
        }

        const preSelected = readBuildTool(this.state.project)

        return mpRuntime.buildTools.map(v => {
            if(v != preSelected) {
                return html`
                <option value="${v}">${v}</option>`;
            } else {
                return html`
                <option value="${v}" selected>${v}</option>`;
            }
        });
    }

    private _getRuntime(): MpOptionsAvailableServer | undefined {
        const mpVersionId = readMpVersionId(this.state.project)
        console.debug({mpVersionId});
        if (mpVersionId == undefined) {
            return undefined;
        }

        const runtimeVersionId = readRuntimeVersion(this.state.project)
        console.debug({mpVersionId, runtimeVersionId});
        if (runtimeVersionId == undefined) {
            return undefined;
        }

        const servers = readServers(runtimeVersionId, this.state.mpConfig)
        console.debug({mpVersionId, runtimeVersionId, servers});
        if (servers == undefined) {
            return undefined;
        }

        const mpRuntime = servers.filter(s => s.mpVersion == mpVersionId).pop();
        if (mpRuntime == undefined) {
            return undefined;
        }

        return mpRuntime;
    }
}

customElements.define('mps-form-java-version-build-tool', MpStarterFormJavaVersionAndBuildTool);
