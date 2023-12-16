const loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  if (user.password.length < 1) {
    alert("Password is required");
  } else if (user.email.length < 1) {
    alert("email is required");
  } else {
    const { data } = await axios.post(
      "https://localhost:5000/api/auth/login",
      user
    );
    console.log(data.token);
    localStorage.setItem("token", data.token);
    if (data.login) {
      alert(data.msg);
      console.log(data.user);
      window.location.href = "index.html";
    } else {
      alert(data.msg);
    }
  }
});
