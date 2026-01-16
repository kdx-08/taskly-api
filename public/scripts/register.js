if (localStorage.getItem("auth-status") === "true")
  window.location.replace(window.location.origin + "/pages/tasks.html");

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  handleRegister(e);
});

const handleRegister = async (e) => {
  e.preventDefault();

  const loginBtn = document.getElementById("submit");
  const successMsg = document.getElementById("success-msg");
  const errorMsg = document.getElementById("error-msg");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  successMsg.style.display = "none";
  errorMsg.style.display = "none";
  loginBtn.style.backgroundColor = "#444444";
  loginBtn.value = "Loading...";

  try {
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      successMsg.style.display = "block";
      successMsg.innerHTML = result.message;
      loginBtn.style.backgroundColor = "black";
      loginBtn.value = "Sign in";
      localStorage.setItem("auth-status", "true");
      window.location.replace(window.location.origin + "/pages/tasks.html");
    } else {
      errorMsg.style.display = "block";
      loginBtn.style.backgroundColor = "black";
      loginBtn.value = "Sign in";
    }
  } catch (error) {
    loginBtn.style.backgroundColor = "black";
    loginBtn.value = "Sign in";
    errorMsg.innerHTML = "Cannot connect to server. Please try later!";
    errorMsg.style.display = "block";
  }
};
