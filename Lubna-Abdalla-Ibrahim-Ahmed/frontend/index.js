const form = document.getElementById("registrationForm");
const successAlert = document.getElementById("successAlert");
const inputs = form.querySelectorAll("input, select");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let isValid = true;

  // Reset validation classes
  inputs.forEach(input => input.classList.remove("invalid", "valid"));

  // Standard HTML5 validation
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.classList.add("invalid");
      isValid = false;
    } else {
      input.classList.add("valid");
    }
  });

  // Custom validation for names
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const placeOfBirth = document.getElementById("placeOfBirth").value.trim();
  const dateOfBirth = new Date(document.getElementById("dateOfBirth").value);
  const regDate = new Date(document.getElementById("registrationDate").value);
  const joinDate = new Date(document.getElementById("joinDate").value);

  if (firstName.length < 3) {
    document.getElementById("firstName").classList.add("invalid");
    isValid = false;
  }
  if (lastName.length < 3) {
    document.getElementById("lastName").classList.add("invalid");
    isValid = false;
  }
  if (placeOfBirth.length < 3) {
    document.getElementById("placeOfBirth").classList.add("invalid");
    isValid = false;
  }

  // Date validations
  if (dateOfBirth >= regDate) {
    document.getElementById("dateOfBirth").classList.add("invalid");
    document.getElementById("registrationDate").classList.add("invalid");
    isValid = false;
    alert("Date of birth must be before registration date");
  }

  if (joinDate <= regDate) {
    document.getElementById("joinDate").classList.add("invalid");
    document.getElementById("registrationDate").classList.add("invalid");
    isValid = false;
    alert("Joining date must be after registration date");
  }

  // If valid, submit data
  if (isValid) {
    const data = {
      firstName,
      lastName,
      placeOfBirth,
      dateOfBirth,
      dateOfRegistration: regDate,
      dateOfJoiningCamp: joinDate
    };

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        successAlert.classList.remove("hidden");
        form.reset();
        inputs.forEach(input => input.classList.remove("valid"));
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  }
});

// Close alert
function closeAlert() {
  successAlert.classList.add("hidden");
}