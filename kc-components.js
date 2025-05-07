
const template = document.createElement("template");
template.innerHTML = `
    <div class="kc-component">
    
    </div>
`

class KcComponent extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        const templateCopy = template.content.cloneNode(true)

        this.shadowRoot.appendChild(templateCopy)
    }
}

window.customElements.define("kc-component", KcComponent)