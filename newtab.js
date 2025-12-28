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
      <button class="delete-btn" title="Delete">✕</button>
    `;

    // Checkbox toggle
    li.querySelector("input").addEventListener("change", () => {
      todo.done = !todo.done;
      save();
      render();
    });

    // Delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
      todos.splice(index, 1);
      save();
      render();
    });

    list.appendChild(li);
  });
}

function addFaviconForEachSite() {
  console.log("Fav call")
  document.querySelectorAll('.container-fav a').forEach(a => a.classList.add('fav-site'));
  document.querySelectorAll('.container-fav a').forEach(a => {
  a.classList.add('fav-site');

  const hostname = new URL(a.href).hostname;

  a.style.setProperty(
    '--favicon',
    `url("https://www.google.com/s2/favicons?domain=${hostname}&sz=64")`
  );
});




  const links = document.querySelectorAll('.container-fav a');

  const hrefs = Array.from(links).map(a => a.href);

  console.log(hrefs);

}

// Add new todo
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    todos.push({ text: input.value.trim(), done: false });
    input.value = "";
    save();
    render();
  }
});

render();
addFaviconForEachSite();