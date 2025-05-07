
/*
input-action
responsabilidad: recoger un texto. Mantener el botón
    deshabilitado mientras no haya nada escrito.
    Limpiar el contenido del input cuando el botón se pulse.

custom properties
    - XXX

eventos
    - input-action-submit: al pulsar el botón

propiedades/atributos
    - button-label
    - placeholder
  - type
*/

const template = document.createElement("template");
template.innerHTML = `
  <div class="input-action">
    <input />
    <button disabled></button>
  </div>
`

class InputAction extends HTMLElement {

    constructor() {
        super();

        this.buttonLabel = this.getAttribute("button-label") ?? "Add";
        this.placeholder = this.getAttribute("placeholder") ?? "Escribe algo que tengas pendiente de hacer";
        this.type = this.getAttribute("type") ?? "text";

        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        const templateCopy = template.content.cloneNode(true);

        const input = templateCopy.querySelector("input")
        const button = templateCopy.querySelector("button");

        input.setAttribute("placeholder", this.placeholder)
        input.setAttribute("type", this.type)
        button.textContent = this.buttonLabel;

        button.addEventListener("click", () => {
            const inputValue = input.value;

            const event = new CustomEvent("input-action-submit", {
                detail: inputValue
            })

            this.dispatchEvent(event)
            input.value = ""
            button.setAttribute("disabled", "")
        })

        input.addEventListener("input", (event) => {
            const currentValue = event.target.value;
            if (currentValue) {
                button.removeAttribute("disabled")
            } else {
                button.setAttribute("disabled", "")
            }
            // si el input tiene valor, habilitar el botón.
            // si el input está vacío, deshabilitar el botón
        })

        this.shadowRoot.appendChild(templateCopy)
    }
}

window.customElements.define("input-action", InputAction)