if (localStorage.getItem("auth-status") === "true") window.location.replace(window.location.origin);
else {
  document.body.innerHTML = `<nav class="navbar">
      <div class="logo">Taskly</div>
      <a href="/index.html" class="link">Tasks</a>
      <a href="../pages/settings.html" class="link">Settings</a>
      <a href="../pages/login.html" id="auth-link" class="link">Login</a>
    </nav>
    <div>
      <h1 class="heading">Sign in</h1>
      <form class="form" id="login-form">
        <input required minlength="3" class="input" type="text" name="username" id="username" placeholder="username" />
        <input
          required
          minlength="8"
          class="input"
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <p id="error-msg">Invalid credentials. Try again!</p>
        <p id="success-msg">Login successful!</p>
        <input id="submit" type="submit" class="input submit" value="Sign in" />
        <p>Don't have an account? <a href="../pages/register.html" class="register">Sign up</a></p>
      </form>
    </div>
    `;
}
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  handleLogin(e);
});

const handleLogin = async (e) => {
  e.preventDefault();

  const loginBtn = document.getElementById("submit");
  const successMsg = document.getElementById("success-msg");
  const errorMsg = document.getElementById("error-msg");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  successMsg.style.display = "none";
  errorMsg.style.display = "none";
  loginBtn.style.backgroundColor = "#444444";
  loginBtn.value = "Loading...";

  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
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
      window.location.replace(window.location.origin);
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
