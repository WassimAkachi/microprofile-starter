import BoundaryElement from "../../BoundaryElement.ts";
import {html} from "lit";
import storageService from "../../storage/boundary/StorageService.ts";
import {getProjectQueryParameters} from "../control/MpStarterReaders.ts";
import mpStarterBackendConnector from "../../mpConfiguration/control/MpStarterBackendConnector.ts";
import {readMpStarterFormState} from "../control/MpStarterFormStateReader.ts";

class MpStarterForm extends BoundaryElement {

    constructor() {
        super();
    }

    protected extractState(reduxState: any): any {
        return readMpStarterFormState(reduxState);
    }

    protected get view(): any {
        return html`
            <div class="container">
                <div class="container has-text-centered">
                    <p class="header-text-1 has-text-centered">MicroProfile Starter</p>
                    <p class="header-text-2 has-text-centered">Generate MicroProfile Maven Project with Examples</p>
                </div>

                <div class="box">
                    <form class="form"
                          @submit="${(e: UIEvent) => this.submitForm(e)}"
                          @cancel="${(e: UIEvent) => this.cancelForm(e)}">
                        <mps-form-project-coordinates></mps-form-project-coordinates>
                        <mps-form-mp-version-runtime></mps-form-mp-version-runtime>
                        <mps-form-java-version-build-tool></mps-form-java-version-build-tool>
                        <mps-form-specs></mps-form-specs>
                        
                        <hr>
                        <div class="field is-grouped is-grouped-centered">
                            ${this.getButtonView()}
                        </div>
                        ${this.getDownloadUrlView()}
                    </form>
                </div>
            </div>
        `;
    }

    private submitForm(e: UIEvent) {
        e.stopPropagation();
        e.preventDefault();
        const {target} = e;
        const form: HTMLFormElement = target as HTMLFormElement;
        console.log("before: preventDefault")
        console.log("after: preventDefault")

        form.reportValidity();
        if (form.checkValidity()) {
            console.log("create post")
            console.debug(this.state)
            this.downloadProject()
        }
    }

    private cancelForm(_e: UIEvent) {
        this.resetForm();
    }

    getButtonView() {
        return html`
            <div class="control">
                <input type="submit" class="button is-medium is-primary is-outlined is-rounded" value="Download"/>
            </div>
            <div class="control">
                <input type="reset" class="button is-medium is-dark is-outlined is-rounded" value="Reset Form"
                       @click=${(_e: UIEvent) => this.resetForm()}/>
            </div>
        `;
    }


    private resetForm() {
        storageService.reset();
        // @ts-ignore
        location.reload(true);
    }

    private downloadProject() {
        const projectQueryParameters = getProjectQueryParameters(this.state);
        if (projectQueryParameters) {
            mpStarterBackendConnector.downloadProject(projectQueryParameters).then()
        }
    }

    private getDownloadUrlView() {
        const projectQueryParameters = getProjectQueryParameters(this.state);
        if (projectQueryParameters) {
            const downloadUrl = mpStarterBackendConnector.createDownloadUrl(projectQueryParameters)
            return html`
                <hr>
                <div class="container">
                    <figure>
                        <pre class="has-background-black has-text-primary"><code>${downloadUrl}</code></pre>
                        <figcaption>
                            Link to download the project via <code>curl</code> or <code>wget</code>
                        </figcaption>
                    </figure>
                </div>
            `;
        }
        return undefined;
    }
}

customElements.define('mps-form', MpStarterForm);
