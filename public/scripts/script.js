let theme = localStorage.getItem("theme");
let authStatus = localStorage.getItem("auth-status");

if (authStatus === null) {
  console.log("was null");
  authStatus = "false";
  localStorage.setItem("auth-status", "false");
}

const authLink = document.getElementById("auth-link");

const checkLogin = async () => {
  const response = await fetch("/api/v1/tasks", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    localStorage.setItem("auth-status", "false");
    authLink.innerHTML = "Login";
  } else {
    authLink.innerHTML = "Logout";
    authLink.addEventListener("click", (e) => {
      handleLogout(e);
    });
  }
};

checkLogin();

const handleLogout = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/v1/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    localStorage.setItem("auth-status", "false");
    window.location.replace(window.location.origin);
  } catch (error) {
    console.log("Error connecting to server. Please try again later!");
  }
};

if (theme === null) {
  theme = "light";
  localStorage.setItem("theme", theme);
}

const toggleTheme = () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
};
