// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init();

  function handleSearch(e) {
    e.preventDefault(); // prevent page reload
    const query = document.querySelector(".search-input").value;
    alert("You searched for: " + query);
  }

  const appGrid = document.querySelector(".appGrid-icon");
  const gridItems = document.querySelectorAll(".grid-items");

  appGrid.addEventListener("click", () => {
    appGrid.classList.toggle("active");
    gridItems.classList.toggle("active");
  });

  // Email JS Integration
  // Email CDK
  // emailjs.init("wS-fzIwk9WM1oYtQD");
  // const btn = document.getElementById("button");

  // document
  //   .getElementById("email-form")
  //   .addEventListener("submit", function (event) {
  //     event.preventDefault();

  //     btn.value = "Sending...";

  //     const serviceID = "default_service";
  //     const templateID = "template_7hg0wsa";

  //     emailjs.sendForm(serviceID, templateID, this).then(
  //       () => {
  //         btn.value = "Send Message";
  //         alert("Message Sent!");
  //         this.reset(); // Clears all form fields
  //       },
  //       (err) => {
  //         btn.value = "Send Message";
  //         alert(JSON.stringify(err));
  //       }
  //     );
  //   });

  // Email JS Integration
  // Email CDK

  emailjs.init("wS-fzIwk9WM1oYtQD");

  const btn = document.getElementById("button");
  const form = document.getElementById("email-form");
  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const numberInput = document.getElementById("number"); // ✅ new field

  // Custom popup elements
  const alertBox = document.getElementById("custom-alert");
  const alertMsg = document.getElementById("alert-message");
  const alertOverlay = document.getElementById("alert-overlay");
  const alertClose = document.getElementById("alert-close");

  function showAlert(message, color = "green") {
    alertMsg.textContent = message;
    alertMsg.style.color = color;
    alertBox.classList.add("active");
    alertOverlay.classList.add("active");
    setTimeout(() => hideAlert(), 3000);
  }

  function hideAlert() {
    alertBox.classList.remove("active");
    alertOverlay.classList.remove("active");
  }

  alertClose.addEventListener("click", hideAlert);

  function createErrorMsg(input, message) {
    const error = document.createElement("small");
    error.style.color = "red";
    error.style.display = "none";
    error.textContent = message;
    input.parentNode.appendChild(error);
    return error;
  }

  const emailError = createErrorMsg(
    emailInput,
    "Please enter a valid email address"
  );
  const nameError = createErrorMsg(nameInput, "Name cannot be empty");
  const messageError = createErrorMsg(messageInput, "Message cannot be empty");
  const numberError = createErrorMsg(
    numberInput,
    "Please enter a valid contact number"
  ); // ✅ new error

  function validateFields(showErrors = false) {
    let valid = true;

    const emailValue = emailInput.value.trim();
    const nameValue = nameInput.value.trim();
    const messageValue = messageInput.value.trim();
    const numberValue = numberInput.value.trim();

    // Name validation
    if (nameValue === "") {
      if (showErrors) nameError.style.display = "block";
      valid = false;
    } else {
      nameError.style.display = "none";
    }

    // Email validation
    if (!emailValue.includes("@") || !emailValue.endsWith(".com")) {
      if (showErrors) emailError.style.display = "block";
      valid = false;
    } else {
      emailError.style.display = "none";
    }

    // ✅ Number validation
    const numberPattern = /^[0-9]{10}$/; // Only 10 digits allowed
    if (!numberPattern.test(numberValue)) {
      if (showErrors) numberError.style.display = "block";
      valid = false;
    } else {
      numberError.style.display = "none";
    }

    // Message validation
    if (messageValue === "") {
      if (showErrors) messageError.style.display = "block";
      valid = false;
    } else {
      messageError.style.display = "none";
    }

    return valid;
  }

  // Hide errors as user fixes them
  [nameInput, emailInput, messageInput, numberInput].forEach((input) => {
    input.addEventListener("input", () => validateFields(false));
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateFields(true);
    if (!isValid) return;

    const nameValue = nameInput.value.trim();
    const formattedName = nameValue
      .split(" ")
      .filter((w) => w.length > 0)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
    nameInput.value = formattedName;

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_7hg0wsa";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Message";
        showAlert("✅ Message Sent Successfully!", "green");
        this.reset();
      },
      (err) => {
        btn.value = "Send Message";
        showAlert("❌ Failed to send message. Please try again.", "red");
        console.error("EmailJS Error:", err);
      }
    );
  });

  // Refresh AOS to remove animation delays
  AOS.refresh();

  // Smooth Scroling page

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
