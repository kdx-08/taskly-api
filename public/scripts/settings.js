if (localStorage.getItem("auth-status") !== "true")
  window.location.replace(window.location.origin + "/pages/login.html");

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
