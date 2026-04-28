const menuFilterButtons = document.querySelectorAll("[data-filter]");
const menuCards = document.querySelectorAll(".menu-card");
const recipeToggle = document.querySelector("[data-toggle-recipe]");
const recipeDetails = document.querySelector(".toggle-area");
const reservationForm = document.querySelector("#reservation-form");
const formMessage = document.querySelector("#form-message");
const menuLink = document.querySelector('a[href="jelovnik.html"]');
const recipesLink = document.querySelector('a[href="recepti.html"]');

const trackNavClick = (label) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "navigation_click", {
    event_category: "navigation",
    event_label: label,
  });
};

if (menuLink) {
  menuLink.addEventListener("click", () => trackNavClick("jelovnik"));
}

if (recipesLink) {
  recipesLink.addEventListener("click", () => trackNavClick("recepti"));
}

if (menuFilterButtons.length) {
  menuFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      menuFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      menuCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;
        card.style.display = shouldShow ? "flex" : "none";
      });
    });
  });
}

if (recipeToggle && recipeDetails) {
  recipeToggle.addEventListener("click", () => {
    const isOpen = recipeDetails.classList.toggle("show");
    recipeToggle.textContent = isOpen ? "Sakrij detalje" : "Prikazi detalje";
  });
}

if (formMessage) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "1") {
    formMessage.textContent = "Rezervacija je uspjesno poslana. Hvala!";
    formMessage.classList.add("success");
  }
}

if (reservationForm) {
  reservationForm.addEventListener("submit", (event) => {

    const name = reservationForm.querySelector("#name");
    const email = reservationForm.querySelector("#email");
    const guests = reservationForm.querySelector("#guests");
    const date = reservationForm.querySelector("#date");
    const time = reservationForm.querySelector("#time");
    const notes = reservationForm.querySelector("#notes");
    const message = reservationForm.querySelector("#form-message");

    const errors = {
      name: reservationForm.querySelector("#name-error"),
      email: reservationForm.querySelector("#email-error"),
      guests: reservationForm.querySelector("#guests-error"),
      date: reservationForm.querySelector("#date-error"),
      time: reservationForm.querySelector("#time-error"),
    };

    Object.values(errors).forEach((field) => {
      if (field) {
        field.textContent = "";
      }
    });

    let hasError = false;

    if (!name.value.trim()) {
      errors.name.textContent = "Upisi ime i prezime.";
      hasError = true;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
      errors.email.textContent = "Upisi ispravan email.";
      hasError = true;
    }

    if (Number(guests.value) < 1) {
      errors.guests.textContent = "Minimalno 1 gost.";
      hasError = true;
    }

    if (!date.value) {
      errors.date.textContent = "Odaberi datum.";
      hasError = true;
    }

    if (!time.value) {
      errors.time.textContent = "Odaberi vrijeme.";
      hasError = true;
    }

    if (hasError) {
      event.preventDefault();
      message.textContent = "";
      return;
    }

    message.textContent = "";
  });
}
