if (localStorage.getItem("auth-status") !== "true")
  window.location.replace(window.location.origin + "/pages/login.html");

const completeTask = async (id) => {
  const response = await fetch(`/api/v1/tasks/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify({
      status: "completed",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log("Error connecting to server. Please try again later!");
  } else {
    window.location.reload();
  }
};

const undoTask = async (id) => {
  const response = await fetch(`/api/v1/tasks/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify({
      status: "in progress",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log("Error connecting to server. Please try again later!");
  } else {
    window.location.reload();
  }
};

const deleteTask = async (id) => {
  const response = await fetch(`/api/v1/tasks/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify({
      status: "dropped",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log("Error connecting to server. Please try again later!");
  } else {
    window.location.reload();
  }
};

const fetchTasks = async () => {
  try {
    const response = await fetch("/api/v1/tasks", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    const ongoing = [];
    const completed = [];

    for (value of result) {
      if (value.status === "completed") completed.push(value);
      else if (value.status === "in progress") ongoing.push(value);
    }

    const taskBody = document.createElement("div");
    const tasksOngoing = document.createElement("div");
    const tasksCompleted = document.createElement("div");
    const topActions = document.createElement("div");

    const noneMsgOngoing = document.createElement("div");
    noneMsgOngoing.innerHTML = "You have no tasks here!";
    noneMsgOngoing.classList.add("none-msg");

    const noneMsgCompleted = document.createElement("div");
    noneMsgCompleted.innerHTML = "You have no tasks here!";
    noneMsgCompleted.classList.add("none-msg");

    taskBody.classList.add("tasks");
    tasksOngoing.classList.add("tasks-ongoing");
    tasksCompleted.classList.add("tasks-completed");
    topActions.classList.add("top-actions");

    topActions.innerHTML = `<h3>Ongoing</h3><div class="add-task"><a class="link" href="../pages/new-task.html">&plus; Add new task</a></div>`;
    tasksOngoing.innerHTML = `
    <div class="top-actions">
      <h3>Ongoing</h3>
      <div class="add-task"><a class="link" href="../pages/new-task.html">&plus; Add new task</a></div>
    </div>
    `;
    tasksOngoing.appendChild(noneMsgOngoing);

    for (item of ongoing) {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
      <div class="task-title">
      <p>${item.title}</p>
      <div class="options"><button onclick=completeTask("${item._id}")>&#9989;</button><button onclick=deleteTask("${item._id}")>&#10060;</button></div>
      </div>
      <div class="task-content">${item.description}</div>
      `;
      tasksOngoing.appendChild(taskItem);
    }

    tasksCompleted.innerHTML = `<h3>Completed</h3>`;
    tasksCompleted.appendChild(noneMsgCompleted);

    for (item of completed) {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
      <div class="task-title">
        <p>${item.title}</p>
        <div class="options"><button onclick=undoTask("${item._id}")>&#x1F504;</button><button onclick=deleteTask("${item._id}")>&#10060;</button></div>
      </div>
      <div class="task-content">${item.description}</div>
      `;
      tasksCompleted.appendChild(taskItem);
    }

    taskBody.appendChild(tasksOngoing);
    taskBody.append(tasksCompleted);
    document.body.appendChild(taskBody);
    if (ongoing.length === 0) noneMsgOngoing.style.display = "block";
    if (completed.length === 0) noneMsgCompleted.style.display = "block";
  } catch (error) {
    console.log(error);
    console.log("Error connecting to server. Please try again later!");
  }
};

fetchTasks();
