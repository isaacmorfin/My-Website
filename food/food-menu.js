// Map some areas to food emojis for a fun, foody look
const areaEmojis = {
  American: "🍔",
  British: "🥧",
  Canadian: "🍁",
  Chinese: "🥡",
  Dutch: "🥞",
  Egyptian: "🍆",
  French: "🥖",
  Greek: "🥙",
  Indian: "🍛",
  Irish: "🥔",
  Italian: "🍝",
  Jamaican: "🍗",
  Japanese: "🍣",
  Kenyan: "🌽",
  Malaysian: "🍜",
  Mexican: "🌮",
  Moroccan: "🍲",
  Polish: "🥟",
  Portuguese: "🍤",
  Russian: "🥟",
  Spanish: "🥘",
  Thai: "🍲",
  Tunisian: "🍢",
  Turkish: "🥙",
  Vietnamese: "🍜",
  // Add more as you like!
};

// Populate the area dropdown when the page loads
window.addEventListener("DOMContentLoaded", function () {
  const areaSelect = document.getElementById("area-select");
  areaSelect.innerHTML = '<option value="">Select Area</option>';

  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((areaObj) => {
          const option = document.createElement("option");
          option.value = areaObj.strArea;
          // Add emoji if available, else use a default
          const emoji = areaEmojis[areaObj.strArea] || "🍽️";
          option.textContent = `${emoji} ${areaObj.strArea}`;
          areaSelect.appendChild(option);
        });
      }
    });

  // Show tomato icon only when "Select Area" is selected
  function updateTomatoIcon() {
    if (areaSelect.value === "") {
      areaSelect.classList.remove("selected");
    } else {
      areaSelect.classList.add("selected");
    }
  }

  // Run on load and on change
  updateTomatoIcon();
  areaSelect.addEventListener("change", updateTomatoIcon);
});

// When the user selects an area, fetch and display meals for that area
document.getElementById("area-select").addEventListener("change", function () {
  const area = this.value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  if (!area) return;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
      area
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          const mealDiv = document.createElement("div");
          mealDiv.className = "meal";

          const title = document.createElement("h3");
          title.textContent = meal.strMeal;

          const img = document.createElement("img");
          img.src = meal.strMealThumb;
          img.alt = meal.strMeal;

          mealDiv.appendChild(title);
          mealDiv.appendChild(img);
          resultsDiv.appendChild(mealDiv);

          // Add click event to show meal details in a modal
          mealDiv.addEventListener("click", async function () {
            // Remove any existing modal
            const oldModal = document.querySelector(".modal");
            if (oldModal) oldModal.remove();

            try {
              // Fetch meal details using async/await
              const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
                  meal.strMeal
                )}`
              );
              const data = await response.json();
              if (data.meals && data.meals.length > 0) {
                const mealDetails = data.meals[0];

                // Create modal elements
                const modal = document.createElement("div");
                modal.className = "modal";
                // Simple modal styles for beginners
                modal.style.position = "fixed";
                modal.style.top = "0";
                modal.style.left = "0";
                modal.style.width = "100vw";
                modal.style.height = "100vh";
                modal.style.backgroundColor = "rgba(0,0,0,0.5)";
                modal.style.display = "flex";
                modal.style.justifyContent = "center";
                modal.style.alignItems = "center";
                modal.style.zIndex = "1000";

                const modalContent = document.createElement("div");
                modalContent.style.backgroundColor = "#fff";
                modalContent.style.padding = "20px";
                modalContent.style.borderRadius = "8px";
                modalContent.style.maxWidth = "400px";
                modalContent.style.width = "90%";
                modalContent.style.position = "relative";
                // Allow scrolling if content is too tall
                modalContent.style.maxHeight = "80vh";
                modalContent.style.overflowY = "auto";

                // Close button for modal
                const closeBtn = document.createElement("button");
                closeBtn.textContent = "Close";
                closeBtn.style.position = "absolute";
                closeBtn.style.top = "10px";
                closeBtn.style.right = "10px";
                closeBtn.style.background = "#f44336";
                closeBtn.style.color = "#fff";
                closeBtn.style.border = "none";
                closeBtn.style.padding = "5px 10px";
                closeBtn.style.borderRadius = "4px";
                closeBtn.style.cursor = "pointer";

                // Grocery List button for modal
                const groceryBtn = document.createElement("button");
                groceryBtn.textContent = "Grocery List";
                groceryBtn.style.position = "absolute";
                groceryBtn.style.top = "10px";
                groceryBtn.style.right = "90px";
                groceryBtn.style.background = "#27ae60";
                groceryBtn.style.color = "#fff";
                groceryBtn.style.border = "none";
                groceryBtn.style.padding = "5px 10px";
                groceryBtn.style.borderRadius = "4px";
                groceryBtn.style.cursor = "pointer";
                groceryBtn.style.marginRight = "8px";

                // When the close button is clicked, remove the modal
                closeBtn.addEventListener("click", function () {
                  modal.remove();
                });

                // When the grocery list button is clicked, copy the ingredients to clipboard
                groceryBtn.addEventListener("click", function () {
                  // Gather ingredients
                  let groceryList = "";
                  for (let i = 1; i <= 20; i++) {
                    const ingredient = mealDetails[`strIngredient${i}`];
                    const measure = mealDetails[`strMeasure${i}`];
                    if (ingredient && ingredient.trim() !== "") {
                      groceryList += `- ${ingredient} (${measure})\n`;
                    }
                  }
                  // Copy to clipboard using the Clipboard API
                  navigator.clipboard.writeText(`Grocery List for ${mealDetails.strMeal}:\n\n${groceryList}`)
                    .then(() => {
                      alert("Grocery list copied to clipboard!");
                    })
                    .catch(() => {
                      alert("Could not copy grocery list.");
                    });
                });

                // Add meal details to modal content
                const title = document.createElement("h2");
                title.textContent = mealDetails.strMeal;
                // Center the title
                title.style.textAlign = "center";

                // Center the close button
                closeBtn.style.position = "absolute";
                closeBtn.style.margin = "";
                closeBtn.style.display = "";
                // Center the grocery button (same as close)
                groceryBtn.style.position = "absolute";
                groceryBtn.style.margin = "";
                groceryBtn.style.display = "";

                const img = document.createElement("img");
                img.src = mealDetails.strMealThumb;
                img.alt = mealDetails.strMeal;
                img.style.width = "100%";
                img.style.borderRadius = "4px";

                // Create a container to center the close button
                const buttonContainer = document.createElement("div");
                buttonContainer.style.display = "flex";
                buttonContainer.style.justifyContent = "center";
                buttonContainer.style.alignItems = "center";
                buttonContainer.appendChild(closeBtn);

                // Create a list of ingredients
                const ingredientsTitle = document.createElement("h3");
                ingredientsTitle.textContent = "Ingredients:";

                const ingredientsList = document.createElement("ul");
                // Loop through possible 20 ingredients
                for (let i = 1; i <= 20; i++) {
                  const ingredient = mealDetails[`strIngredient${i}`];
                  const measure = mealDetails[`strMeasure${i}`];
                  // Only add if ingredient is not empty
                  if (ingredient && ingredient.trim() !== "") {
                    const li = document.createElement("li");
                    li.textContent = `${ingredient} - ${measure}`;
                    ingredientsList.appendChild(li);
                  }
                }

                // Instructions
                const instructionsTitle = document.createElement("h3");
                instructionsTitle.textContent = "Instructions:";

                // Split instructions into steps using periods
                const instructionsSteps = mealDetails.strInstructions
                  .split(".")
                  .map((step) => step.trim())
                  .filter((step) => step.length > 0);

                // Create an ordered list for steps
                const instructionsList = document.createElement("ol");
                instructionsSteps.forEach((step) => {
                  const li = document.createElement("li");
                  li.textContent = step + ".";
                  instructionsList.appendChild(li);
                });

                // Add elements to modal content
                modalContent.appendChild(title); // Title centered by style above
                modalContent.appendChild(closeBtn); // Button at top right
                modalContent.appendChild(groceryBtn); // Button next to close
                modalContent.appendChild(img);
                modalContent.appendChild(ingredientsTitle);
                modalContent.appendChild(ingredientsList);
                modalContent.appendChild(instructionsTitle);
                modalContent.appendChild(instructionsList);

                // Add modal content to modal
                modal.appendChild(modalContent);

                // Add modal to the body
                document.body.appendChild(modal);
              } else {
                alert("No details found for this meal.");
              }
            } catch (error) {
              alert("Error fetching meal details.");
            }
          });
        });
      } else {
        resultsDiv.textContent = "No meals found for this area.";
      }
    });
});
