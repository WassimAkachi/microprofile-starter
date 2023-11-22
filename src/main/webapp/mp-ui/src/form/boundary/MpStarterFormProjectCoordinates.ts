import BoundaryElement from "../../BoundaryElement";
import {html} from "lit";
import {readMpStarterFormState, readProject} from "../control/MpStarterFormStateReader.ts";
import {MpStarterProject} from "../entity/MpStarterFormState.ts";
import {changeArtifactId, changeGroupId} from "../control/MpStarterFormDispatcher.ts";

class MpStarterFormProjectCoordinates extends BoundaryElement {

    constructor() {
        super();
    }

    protected extractState(reduxState: any): any {
        return readProject(readMpStarterFormState(reduxState));
    }

    protected get view(): any {
        const {groupId, artifactId} = this.state as MpStarterProject;

        return html`
            ${this.getProjectCoordinates(groupId, artifactId)}
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Group Id</label>
                        <div class="control">
                            <input
                                    class="input"
                                    type="text"
                                    placeholder="com.example"
                                    name="groupId"
                                    value="${groupId}"
                                    @keyup="${(e: UIEvent) => this.updateState(e)}"
                            >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="">Artifact Id</label>
                        <div class="control">
                            <input
                                    class="input"
                                    type="text"
                                    placeholder="demo"
                                    name="artifactId"
                                    value="${artifactId}"
                                    @keyup="${(e: UIEvent) => this.updateState(e)}"
                            >
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private getProjectCoordinates(groupId?: string, artifactId?: string): any {
        if (groupId && groupId.length > 0 && artifactId && artifactId.length > 0) {
            return html`
                <div class="box">
                    <span>Project Coordinates</span>
                    <span class="is-family-monospace has-text-weight-bold">${groupId}:${artifactId}</span>
                </div>
            `;
        }
    }

    private updateState(e: UIEvent) {
        const {name, value} = e.target as HTMLInputElement
        console.debug({name, value})
        if (name == 'groupId') {
            changeGroupId(value)
        } else if (name == 'artifactId') {
            changeArtifactId(value)
        }
    }
}

customElements.define('mps-form-group-id', MpStarterFormProjectCoordinates);
