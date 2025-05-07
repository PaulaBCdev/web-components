/*
todo-list

responsabilidad: reaccionar a cuando se quiere
    crear un nuevo item y crearlo.
    Borrar elementos y gestionar todo's completados
custom properties
    - XX
eventos
    - X
propiedades
    - title
*/

const template = document.createElement("template");
template.innerHTML = `
  <div class="todo-list">
    <input-action></input-action>
    <div class="todo-items-wrapper"></div>
  </div>
`

class TodoList extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        const templateCopy = template.content.cloneNode(true);

        const inputAction = templateCopy.querySelector("input-action");

        inputAction.addEventListener("input-action-submit", (event) => {
            const text = event.detail;

            const newTodoItem = document.createElement("todo-item");

            this.shadowRoot.querySelector(".todo-items-wrapper").appendChild(newTodoItem)

            newTodoItem.setAttribute("text", text);

        })

        this.shadowRoot.appendChild(templateCopy)
    }
}

window.customElements.define("todo-list", TodoList)