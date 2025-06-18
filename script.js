   // Example: Show an alert when the page loads
    window.onload = function() {
      alert("Welcome to my website!");
    };
    // Animate the hero name on page load
    window.onload = function() {
      const firstName = document.querySelector('.first-name');
      const lastName = document.querySelector('.last-name');
      firstName.style.transition = 'color 1s, transform 1s';
      lastName.style.transition = 'color 1s, transform 1s';
      firstName.style.color = '#fc5c7d';
      lastName.style.color = '#6a82fb';
      firstName.style.transform = 'scale(1.2) rotate(-3deg)';
      lastName.style.transform = 'scale(1.2) rotate(3deg)';
      setTimeout(() => {
        firstName.style.transform = '';
        lastName.style.transform = '';
      }, 1200);
    };

    // Smooth scroll to top when button is clicked
    document.getElementById('backToTop').onclick = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
        // Animate the hero name on page load
    window.onload = function() {
      const firstName = document.querySelector('.first-name');
      const lastName = document.querySelector('.last-name');
      firstName.style.transition = 'color 1s, transform 1s';
      lastName.style.transition = 'color 1s, transform 1s';
      firstName.style.color = '#fc5c7d';
      lastName.style.color = '#6a82fb';
      firstName.style.transform = 'scale(1.2) rotate(-3deg)';
      lastName.style.transform = 'scale(1.2) rotate(3deg)';
      setTimeout(() => {
        firstName.style.transform = '';
        lastName.style.transform = '';
      }, 1200);
    };

    // Smooth scroll to top when button is clicked
    document.getElementById('backToTop').onclick = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
Animation