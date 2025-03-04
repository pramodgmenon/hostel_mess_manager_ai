/**
 * Custom JavaScript for the Hostel Mess Management System
 */

// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Enable tooltips everywhere
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Enable popovers everywhere
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]'),
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Add animation to cards
  const cards = document.querySelectorAll(".card-hover");
  if (cards) {
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.classList.add("shadow-lg");
      });
      card.addEventListener("mouseleave", function () {
        this.classList.remove("shadow-lg");
      });
    });
  }

  // Handle mobile menu toggle
  const menuToggle = document.getElementById("sidebarToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      document.body.classList.toggle("sidebar-toggled");
      document.querySelector(".sidebar").classList.toggle("toggled");
    });
  }

  // Close sidebar when window is less than 768px
  function checkWindowSize() {
    if (window.innerWidth < 768) {
      document.querySelector(".sidebar")?.classList.add("toggled");
    } else {
      document.querySelector(".sidebar")?.classList.remove("toggled");
    }
  }

  // Check window size on load
  checkWindowSize();

  // Check window size on resize
  window.addEventListener("resize", checkWindowSize);
});
