if (localStorage.getItem("auth-status") === "false")
  window.location.replace(window.location.origin + "/pages/login.html");

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
      window.location.replace(window.location.origin + "/pages/tasks.html");
    } else {
      console.log(result);
      errorMsg.style.display = "block";
    }
  } catch (error) {
    errorMsg.innerHTML = "Cannot connect to server! Please try again later";
    errorMsg.style.display = "block";
  }
};
