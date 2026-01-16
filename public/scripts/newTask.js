if (localStorage.getItem("auth-status") === "false")
  window.location.replace(window.location.origin + "/pages/login.html");
else {
  document.body.innerHTML = `<nav class="navbar">
      <div class="logo">Taskly</div>
      <a href="/index.html" class="link">Tasks</a>
      <a href="../pages/settings.html" class="link">Settings</a>
      <a href="../pages/login.html" onClick="handleAuth" id="auth-link" class="link">Login</a>
    </nav>
    <div>
      <h1 class="heading">New Task</h1>
      <form class="form" id="task-form">
        <input required minlength="3" class="input" type="text" name="title" id="title" placeholder="title" />
        <input required class="input" type="text" name="description" id="description" placeholder="description" />
        <select required class="input" name="status" id="status" placeholder="status">
          <option value="in progress" selected>In progress</option>
          <option value="completed">Completed</option>
        </select>
        <p id="error-msg">All are fields are required!</p>
        <p id="success-msg">New Task Added!</p>
        <input type="submit" class="input submit" value="Add task" id="submit" />
      </form>
    </div>`;
}

const newTaskForm = document.getElementById("task-form");

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleTaskForm();
});

const handleTaskForm = async (e) => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const successMsg = document.getElementById("success-msg");
  const errorMsg = document.getElementById("error-msg");
  try {
    const response = await fetch("/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        status,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      successMsg.innerHTML = result.message;
      successMsg.style.display = "block";
      window.location.replace(window.location.origin);
    } else {
      console.log(result);
      errorMsg.style.display = "block";
    }
  } catch (error) {
    errorMsg.innerHTML = "Cannot connect to server! Please try again later";
    errorMsg.style.display = "block";
  }
};
