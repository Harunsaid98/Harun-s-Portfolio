// Wait for the DOM to load before executing
document.addEventListener("DOMContentLoaded", () => {
  // === Dynamically Load Header and Footer ===
  
  // Load header.html into the #header-container
  fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
          document.getElementById("header-container").innerHTML = data;
          attachDarkModeListener(); // Attach dark mode functionality after loading header
      })
      .catch((error) => console.error("Error loading header:", error));

  // Load footer.html into the #footer-container
  fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
          document.getElementById("footer-container").innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));

  // === Dark Mode Toggle ===
  function attachDarkModeListener() {
      const darkModeToggle = document.getElementById("dark-mode-toggle");

      // Check localStorage for dark mode preference
      if (localStorage.getItem("dark-mode") === "enabled") {
          enableDarkMode(); // Enable dark mode if saved in localStorage
      }

      // Add click event to the toggle button
      darkModeToggle.addEventListener("click", () => {
          if (document.body.classList.contains("dark-theme")) {
              disableDarkMode(); // Disable dark mode
          } else {
              enableDarkMode(); // Enable dark mode
          }
      });
  }

  // Function to enable dark mode
  function enableDarkMode() {
      document.body.classList.add("dark-theme"); // Add the dark-theme class to the body
      localStorage.setItem("dark-mode", "enabled"); // Save preference in localStorage
  }

  // Function to disable dark mode
  function disableDarkMode() {
      document.body.classList.remove("dark-theme"); // Remove the dark-theme class from the body
      localStorage.setItem("dark-mode", "disabled"); // Save preference in localStorage
  }

  // === Back to Top Button ===
  // Create and add the "Back to Top" button dynamically
  const backToTopButton = document.createElement("button"); // Create a button element
  backToTopButton.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`; // Add Font Awesome icon
  backToTopButton.id = "back-to-top"; // Set the ID for styling
  document.body.appendChild(backToTopButton); // Append the button to the body

  // Show or hide the "Back to Top" button based on scroll position
  window.addEventListener("scroll", () => {
      if (window.scrollY > 200) { // If scrolled down 200px or more
          backToTopButton.style.display = "flex"; // Show the button
      } else {
          backToTopButton.style.display = "none"; // Hide the button
      }
  });

  // Smooth scroll to the top when the button is clicked
  backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll smoothly to the top
  });
});
