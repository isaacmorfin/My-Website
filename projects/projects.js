// Trigger .visible when section enters viewport
    const sections = document.querySelectorAll('.project-section');
    const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              entry.target.classList.add('visible');
                // Optionally, you can add a delay for the animation
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, 100);
            }
            else {
              entry.target.classList.remove('visible');
            }
          });
        }, { threshold: 0.2 });

        sections.forEach(section => observer.observe(section));

// Reset food menu API results when not visible
    const foodMenuSection = document.getElementById('food-menu-section');
    const resultsDiv = document.getElementById('results');
    const areaSelect = document.getElementById('area-select');
        if (foodMenuSection && resultsDiv) {
          const foodMenuObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) {
                // Section is not visible, clear the results
                resultsDiv.innerHTML = "";
                areaSelect.value = ""; // Reset the select dropdown
                areaSelect.classList.remove('selected');
              }
            });
          }, { threshold: 0 });
          foodMenuObserver.observe(foodMenuSection);
        }