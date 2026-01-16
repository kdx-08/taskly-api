if (localStorage.getItem("auth-status") !== "true")
  window.location.replace(window.location.origin + "/pages/login.html");
else {
  document.body.innerHTML = `<nav class="navbar">
      <div class="logo">Taskly</div>
      <a href="/index.html" class="link">Tasks</a>
      <a href="../pages/settings.html" class="link">Settings</a>
      <a href="../pages/login.html" onClick="handleLogout" id="auth-link" class="link">Login</a>
    </nav>
    <h2>S<span class="title">etting</span>s</h2>
    <div class="settings">
      <div class="option">
        <div class="setting-name">Export data</div>
        <button class="setting-action export-data" onclick="exportData()">Export</button>
        <a href="" style="display: none" id="account-data-download" download="taskly_account.json"></a>
      </div>
      <div class="option">
        <div class="setting-name">Delete account</div>
        <button class="setting-action delete-account" onclick="deleteAccount()">Delete</button>
      </div>
    </div>`;
}

const exportData = async () => {
  const link = document.getElementById("account-data-download");
  try {
    const taskResponse = await fetch("/api/v1/tasks", {
      method: "GET",
      credentials: "include",
    });
    const accountResponse = await fetch("/api/v1/auth/profile");
    if (!taskResponse.ok || !accountResponse.ok) {
      alert("Cannot perform that action now. Please try again later!");
    } else {
      const result = await accountResponse.json();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
      link.setAttribute("href", dataStr);
      link.click();
    }
  } catch (error) {
    alert("Cannot connect to server now. Please try again later!");
  }
};

const deleteAccount = async () => {
  const choice = confirm("Delete your account permanently? This action is NOT reversible.");
  if (choice) {
    const accountResponse = await fetch("/api/v1/auth/delete", {
      method: "DELETE",
      credentials: "include",
    });
    if (!accountResponse.ok) {
      alert("Cannot perform that action now. Please try again later!");
    } else {
      window.location.replace(window.location.origin + "/pages/register.html");
    }
    try {
    } catch (error) {
      alert("Cannot connect to server now. Please try again later!");
    }
  }
};
