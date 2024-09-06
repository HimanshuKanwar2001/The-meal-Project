// JavaScript File

const search = document.getElementById("search");
const submit = document.getElementById("submit");
const result = document.getElementById('result-heading');
let debounceTimeout;
const mealId = [];
const mealCache = {};

// Handle search input with debounce
submit.addEventListener("submit", debounce((e) => {
    e.preventDefault();
    const mealSearch = e.target.search.value ? e.target.search.value : "";
    result.innerHTML = "";
    searchAPI(mealSearch);
}, 300));

// Debounce function
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Search API function with caching
const searchAPI = async (mealSearch) => {
    if (mealCache[mealSearch]) {
        displayMeals(mealCache[mealSearch]);
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSearch}`);
        const data = await response.json();
        mealCache[mealSearch] = data.meals; // Cache the result
        displayMeals(data.meals);
    } catch (error) {
        console.error("Error fetching the meal data:", error);
    }
};

// Display meals function
const displayMeals = (meals) => {
    meals.forEach((meal) => {
        getDataFill(meal);
    });
    attachEventListeners();
};

// Create and append meal card elements
function getDataFill(meal) {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");
    mealCard.id = meal.idMeal;

    mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
        <h2 class="card-heading">${meal.strMeal}</h2>
        <div class="meal-detail">
            <p class="category"><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Tags:</strong> ${meal.strTags || 'N/A'}</p>
        </div>
        <div class="links">
            <div class="yt-link">
                <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
            </div>
            <div class="favourite-btn">
                <button id="${meal.idMeal}">Favourite</button>
            </div>
        </div>
    `;

    result.appendChild(mealCard);
}

// Attach event listeners to meal cards
function attachEventListeners() {
    const mealCards = document.querySelectorAll('.meal-card');
    mealCards.forEach((card) => {
        card.addEventListener("click", function () {
            const id = card.querySelector('.favourite-btn button').id;
            storeInArray(id);
            showMealsDetail(id);
        });
    });
}

// Store meal ID in local storage
function storeInArray(id) {
    if (!mealId.includes(id)) {
        mealId.push(id);
        localStorage.setItem("mealsID", JSON.stringify(mealId));
    }
}

// Navigate to meal detail page
function showMealsDetail(id) {
    localStorage.setItem("mealID", JSON.stringify(id));
    window.location.href = 'http://127.0.0.1:5500/mealDetail.html';
}

// Initial call to search API with empty query (if needed)
searchAPI("");
