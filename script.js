const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");
let favouriteMealID = [];

// Search Meals
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = "";

  //get search Meal
  console.log(search.value);
  const term = search.value;

  //Check For Empty
  if (term.length == 0) {
    resultHeading.innerHTML = "<h3>Input Field Cannot Be Empty</h3>";
  } else {
    //fetching data using name of the meal
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search Result for ${term}</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There are No result for ${term}</h2>`;
        } else {
          console.log(data.meals, "data.meals here");
          mealEl.innerHTML = data.meals
            .map(
              (meal) =>
                `
                    <div class="meal">
                    <button class="fav-btn" >+</button>
                    
                    <img src="${meal.strMealThumb}"  alt="${meal.strMeal}">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    
                    <h3 class="meal-name">${meal.strMeal}</h3>
                    </div>
                    </a>
                    </div>

                    `
            )
            .join("");
        }
        //add to favourite
        const favbtn = document.querySelectorAll(".fav-btn");
        favbtn.forEach((btn) => {
          btn.addEventListener("click", function addToFavourite(event) {
            let val = this.parentElement.children;
            console.log(val, "value");
            let idInfo = val[2].getAttribute("data-mealID");
            console.log(idInfo);
            if (idInfo) {
              favouriteMealID.push(idInfo);
            }
          });
        });
        //onclick open it in new tab
        const divMealInfo = document.querySelectorAll(".meal-info");
        console.log(divMealInfo);
        divMealInfo.forEach((mealInfo) => {
          mealInfo.addEventListener("click", function (event) {
            console.log(event);
            window.open("fav.html", "_blank");
          });
        });
      });
  }
}

//Random Meal
function randomMeal() {
  mealEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map((ing) => `<li> ${ing}</li>`).join("")}
        </ul>

    </div>

    </div>
    `;
}

// event Listerners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", randomMeal);

mealEl.addEventListener("click", (e) => {
  const mealInfo = e["target"].getAttribute("data-mealID");
  if (mealInfo) localStorage.setItem("mealID", mealInfo);

  let favMealarr = favouriteMealID.filter(
    (item, index) => favouriteMealID.indexOf(item) === index
  );
  let favMealID = JSON.stringify(favMealarr);
  localStorage.setItem("Favourite", favMealID);
});
