window.onload = () => {
  declareEvents();
};

const declareEvents = () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      // user_in.value = ' ';
      // document.getElementById("user_in").placeholder = "Email Adress";
      console.log(document.getElementById("user_in").placeholder);
      loginForm.classList.add("form-hidden");
      createAccountForm.classList.remove("form-hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    createAccountForm.classList.add("form-hidden");
    loginForm.classList.remove("form-hidden");
  });

  createAccountForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from being submitted
    // Get the values
    const name = document.querySelector("#id_name_up").value;
    const email = document.querySelector("#id_email_up").value;
    const password = document.querySelector("#id_password_up").value;
    const confirm = document.querySelector("#id_confirm_up").value;

    // Check if the password and confirm fields match
    if (password !== confirm) {
      document.querySelector(".form_message-error2").textContent =
        "Passwords do not match";
    } else {
      // Check if the user already exists in local storage
      if (localStorage.getItem(email)) {
        document.querySelector(".form_message-error2").textContent =
          "User already exists";
      } else {
        // Add the user to local storage
        localStorage.setItem(email, JSON.stringify({ "name" :name, "password":password, "email":email }));

        // Hide the create account form and show the login form
        createAccountForm.classList.add("form-hidden");
        loginForm.classList.remove("form-hidden");
      }
    }
  });

  // Add a submit event listener to the login form
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values
    const email = document.querySelector("#user_in").value;
    const password = document.querySelector("#pass_in").value;

    // Check if the user exists in local storage
    if (!localStorage.getItem(email)) {
      document.querySelector(".form_message-error").textContent =
        "User does not exist";
    } else {
      // Get the user's information from local storage
      const user = JSON.parse(localStorage.getItem(email));

      // Check if the password is correct
      if (password !== user.password) {
        document.querySelector(".form_message-error").textContent =
          "Incorrect password";
      } else {
        // Redirect the user to a new page
        localStorage.removeItem('player');
        localStorage.setItem('playerName', user.name);
        localStorage.setItem('playerEmail', user.email);
        
        window.location.href = "land/land.html";
      }
    }
  });

  
};


