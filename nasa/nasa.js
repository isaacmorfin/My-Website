// Wait until the HTML page is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Get references to the date picker inputs
  const startInput = document.getElementById('startDate');
  const endInput = document.getElementById('endDate');

  // Set up the date pickers (from dateRange.js)
  setupDateInputs(startInput, endInput);

  // Get references to the buttons and gallery
  const getApodButton = document.getElementById('getApod');
  const getNasaImageButton = document.getElementById('getNasaImage');
  const gallery = document.getElementById('gallery');

  // Helper function to clear the gallery
  function clearGallery() {
    gallery.innerHTML = '';
    // Remove old date row if present
    const oldDateRow = document.getElementById('date-row');
    if (oldDateRow) oldDateRow.remove();
  }

  // Helper function to format date as MM/DD/YYYY
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }

  // Helper function to capitalize the first letter of each sentence
  function formatDescription(text) {
    if (!text) return '';
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    return sentences.map(sentence => {
      const trimmed = sentence.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    }).join(' ');
  }

  // Show APOD images for the selected date range
  getApodButton.addEventListener('click', () => {
    clearGallery();
    // Show a space-themed loading message
    gallery.innerHTML = `<div style="text-align:center; font-size:1.2em; color:#00ffe7; margin:30px 0;">
      🛰️ Preparing to beam down cosmic images... Please wait as we scan the universe! 🌌
    </div>`;
    const startDate = startInput.value;
    const endDate = endInput.value;

    // Use your provided API key here
    const apiKey = 'hw7C2sqxPwzMPJwNnhNbZaaWlAF3J1tUYB4J6OPN';

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`)
      .then(response => response.json())
      .then(data => {
        clearGallery();
        const images = Array.isArray(data) ? data : [data];

        // Create a row of dates below the buttons with a rocket emoji
        const dateRow = document.createElement('div');
        dateRow.id = 'date-row';
        dateRow.style.display = 'flex';
        dateRow.style.justifyContent = 'center';
        dateRow.style.gap = '16px';
        dateRow.style.margin = '20px 0 10px 0';

        images.forEach(item => {
          const dateBox = document.createElement('div');
          dateBox.textContent = `🚀 Date: ${formatDate(item.date)}`;
          dateBox.style.background = '#1a2236';
          dateBox.style.color = '#fff';
          dateBox.style.padding = '6px 16px';
          dateBox.style.borderRadius = '8px';
          dateBox.style.letterSpacing = '1px';
          dateRow.appendChild(dateBox);
        });

        gallery.parentNode.insertBefore(dateRow, gallery);

        // Show all images in the gallery
        images.forEach(item => {
          const card = document.createElement('div');
          card.className = 'gallery-item spacy-card';

          // Emoji above the image
          const emoji = document.createElement('div');
          emoji.textContent = '🪐';
          emoji.style.fontSize = '2rem';
          emoji.style.textAlign = 'center';
          card.appendChild(emoji);

          // Show image or video
          if (item.media_type === 'image') {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.title;
            card.appendChild(img);
          } else if (item.media_type === 'video') {
            const video = document.createElement('iframe');
            video.src = item.url;
            video.width = "100%";
            video.height = "200";
            video.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            video.allowFullscreen = true;
            card.appendChild(video);
          }

          // Title (no bold, no uppercase)
          const title = document.createElement('div');
          title.textContent = `✨ ${item.title}`;
          title.style.fontWeight = 'normal';
          title.style.fontSize = '20px';
          title.style.margin = '10px 0 0 0';
          title.style.textAlign = 'center';
          card.appendChild(title);

          // Date below the title (no bold, no uppercase)
          const date = document.createElement('div');
          date.textContent = `Date: ${formatDate(item.date)}`;
          date.style.fontSize = '15px';
          date.style.color = '#00ffe7';
          date.style.margin = '6px 0 0 0';
          date.style.textAlign = 'center';
          card.appendChild(date);

          // Description as a simple paragraph
          const desc = document.createElement('p');
          desc.textContent = formatDescription(item.explanation);
          desc.style.marginTop = '12px';
          desc.style.background = '#232946';
          desc.style.color = '#fff';
          desc.style.padding = '10px';
          desc.style.borderRadius = '6px';
          desc.style.textAlign = 'justify';
          card.appendChild(desc);

          gallery.appendChild(card);
        });
      })
      .catch(() => {
        gallery.innerHTML = '<p>🛸 Error loading images. Please try again later.</p>';
      });
  });

  // Show NASA Images API results (images and videos) in the gallery
  getNasaImageButton.addEventListener('click', () => {
    clearGallery();
    // Show a space-themed loading message
    gallery.innerHTML = `<div style="text-align:center; font-size:1.2em; color:#00ffe7; margin:30px 0;">
      🛰️ Scanning the cosmos for NASA images... Hold tight, space explorer! 🌠
    </div>`;
    fetch('https://images-api.nasa.gov/search?q=galaxy')
      .then(response => response.json())
      .then(data => {
        clearGallery();
        const items = data.collection.items.slice(0, 8);
        if (items.length > 0) {
          items.forEach(item => {
            const dataInfo = item.data[0];
            const titleText = dataInfo.title;
            const descText = dataInfo.description || '';
            const dateCreated = dataInfo.date_created ? formatDate(dataInfo.date_created) : '';
            const location = dataInfo.location || '';
            const photographer = dataInfo.photographer || '';

            const card = document.createElement('div');
            card.className = 'gallery-item spacy-card';

            // Emoji above the image/video
            const emoji = document.createElement('div');
            emoji.textContent = '☄️';
            emoji.style.fontSize = '2rem';
            emoji.style.textAlign = 'center';
            card.appendChild(emoji);

            // Show image or video
            if (item.links && item.links[0].render === 'image') {
              const img = document.createElement('img');
              img.src = item.links[0].href;
              img.alt = titleText;
              card.appendChild(img);
            } else if (item.links && item.links[0].render === 'video') {
              const video = document.createElement('video');
              video.src = item.links[0].href;
              video.controls = true;
              video.style.width = '100%';
              card.appendChild(video);
            }

            // Title (no bold, no uppercase)
            const title = document.createElement('div');
            title.textContent = `👽 ${titleText}`;
            title.style.fontWeight = 'normal';
            title.style.fontSize = '20px';
            title.style.margin = '10px 0 0 0';
            title.style.textAlign = 'center';
            card.appendChild(title);

            // Date below the title (no bold, no uppercase)
            if (dateCreated) {
              const dateDiv = document.createElement('div');
              dateDiv.textContent = `Date: ${dateCreated}`;
              dateDiv.style.fontSize = '15px';
              dateDiv.style.color = '#00ffe7';
              dateDiv.style.margin = '6px 0 0 0';
              dateDiv.style.textAlign = 'center';
              card.appendChild(dateDiv);
            }

            // Location (if available)
            if (location) {
              const locDiv = document.createElement('div');
              locDiv.textContent = `📍 Location: ${location}`;
              locDiv.style.fontSize = '14px';
              locDiv.style.color = '#b3b3b3';
              locDiv.style.margin = '4px 0 0 0';
              card.appendChild(locDiv);
            }

            // Photographer (if available)
            if (photographer) {
              const photDiv = document.createElement('div');
              photDiv.textContent = `📸 Photographer: ${photographer}`;
              photDiv.style.fontSize = '14px';
              photDiv.style.color = '#b3b3b3';
              photDiv.style.margin = '4px 0 0 0';
              card.appendChild(photDiv);
            }

            // Description as a simple paragraph
            const desc = document.createElement('p');
            desc.textContent = formatDescription(descText);
            desc.style.marginTop = '12px';
            desc.style.background = '#232946';
            desc.style.color = '#fff';
            desc.style.padding = '10px';
            desc.style.borderRadius = '6px';
            desc.style.textAlign = 'justify';
            card.appendChild(desc);

            gallery.appendChild(card);
          });
        } else {
          gallery.innerHTML = '<p>🛸 No images or videos found.</p>';
        }
      })
      .catch(() => {
        gallery.innerHTML = '<p>🛸 Error loading images. Please try again later.</p>';
      });
  });
});




// NOTE: You do not need to edit this file.

// NASA's APOD API only has images from June 16, 1995 onwards
const earliestDate = '1995-06-16';

// Get today's date in YYYY-MM-DD format (required by date inputs)
const today = new Date().toISOString().split('T')[0];

function setupDateInputs(startInput, endInput) {
  // Restrict date selection range from NASA's first image to today
  startInput.min = earliestDate;
  startInput.max = today;
  endInput.min = earliestDate;
  endInput.max = today;

  // Default: Show the most recent 9 days of space images
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 8); // minus 8 because it includes today
  startInput.value = lastWeek.toISOString().split('T')[0];
  endInput.value = today;

  // Automatically adjust end date to show exactly 9 days of images
  startInput.addEventListener('change', () => {
    const startDate = new Date(startInput.value);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 8);
    endInput.value = endDate > new Date(today) ? today : endDate.toISOString().split('T')[0];
  });
}