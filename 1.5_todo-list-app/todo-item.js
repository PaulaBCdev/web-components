
/*
todo-item
responsabilidad: pintar un texto a modo de tarea pendiente.
    Borrarlo si se pulsa el botón de borrar.
    Modificar la apariencia cuando esté completada

custom properties
    - XXX

eventos
    - action-item-remove
    - action-item-status-update
	
propiedades
    - text
    - isChecked
    - buttonLabel
*/

const template = document.createElement("template");
template.innerHTML = `

<style>
input:checked + span {
  text-decoration: line-through;
}
</style>

  <div class="todo-item">
    <input type="checkbox" />
    <span></span>
    <button></button>
  </div>
`

class TodoItem extends HTMLElement {

    constructor() {
        super();

        this.text = this.getAttribute("text") ?? "Algo que hacer";
        this.isChecked = this.hasAttribute("is-checked");
        this.buttonLabel = this.getAttribute("button-label") ?? "Eliminar";

        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        const templateCopy = template.content.cloneNode(true);

        const checkbox = templateCopy.querySelector("input");
        const removeButton = templateCopy.querySelector("button");

        templateCopy.querySelector("span").textContent = this.text;
        checkbox.checked = this.isChecked;
        removeButton.textContent = this.buttonLabel;

        removeButton.addEventListener("click", () => {
            const event = new CustomEvent("action-item-remove");
            this.dispatchEvent(event)

            this.remove();
        })

        checkbox.addEventListener("change", () => {
            const event = new CustomEvent("action-item-status-update", {
                detail: {
                    isChecked: checkbox.checked
                }
            })

            this.dispatchEvent(event)
        })

        this.shadowRoot.appendChild(templateCopy)
    }

    static get observedAttributes() {
        return ["text"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "text") {
            this.shadowRoot.querySelector("span").textContent = newValue
        }
    }
}

window.customElements.define("todo-item", TodoItem)
