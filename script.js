document.addEventListener("DOMContentLoaded", () => {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



  function addTask(task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = task;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const btn = document.createElement("button");
      btn.textContent = "X";
      btn.onclick = () => deleteTask(index);

      checkbox.onchange = () => {
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
      };

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  // BUTTON CLICK
  document.getElementById("addBtn").addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (value !== "") {
      addTask(value);
      input.value = "";
    }
  });

  // ENTER KEY (JETZT RICHTIG)
  document.getElementById("taskInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const value = event.target.value.trim();
      if (value !== "") {
        addTask(value);
        event.target.value = "";
      }
    }
  });

  renderTasks();

});