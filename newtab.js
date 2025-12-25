const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo" + (todo.done ? " completed" : "");

    li.innerHTML = `
      <label class="checkbox">
        <input type="checkbox" ${todo.done ? "checked" : ""}>
        <span class="checkmark"></span>
      </label>
      <span class="text">${todo.text}</span>
    `;

    li.querySelector("input").addEventListener("change", () => {
      todo.done = !todo.done;
      save();
      render();
    });

    li.querySelector(".text").addEventListener("click", () => {
      todos.splice(index, 1);
      save();
      render();
    });

    list.appendChild(li);
  });
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    todos.push({ text: input.value.trim(), done: false });
    input.value = "";
    save();
    render();
  }
});

render();
