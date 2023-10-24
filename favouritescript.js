const single_mealEl = document.getElementById("single-meal");
const mealEl = document.getElementById("meals");
let favouriteMealID = [];
console.log("hello");
let favMealID = JSON.parse(localStorage.getItem("Favourite"));
console.log(favMealID);
let mealarr = [];
//fetching data by id
let request = favMealID.map((req) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req}`)
    .then((res) => res.json())
    .then((data) => {
      let meal = data.meals[0];
      mealarr.push(meal);
      mealEl.innerHTML = mealarr
        .map(
          (meal) => `
                    <div class="meal">
                    <button class="fav-btn" >-</button>
                    
                    <img src="${meal.strMealThumb}"  alt="${meal.strMeal}">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    
                    <h3 class="meal-name">${meal.strMeal}</h3>
                    </div>
                    </a>
                    </div>

                    `
        )
        .join("");
        //button to remove mealID from the local storage
      const favbtn = document.querySelectorAll(".fav-btn");
      favbtn.forEach((btn) => {
        btn.addEventListener("click", function addToFavourite(event) {
          let val = this.parentElement.children;
          let idInfo = val[2].getAttribute("data-mealID");
          let value = favMealID.indexOf(idInfo);
          favMealID.splice(value, 1);
          let favouriteID = JSON.stringify(favMealID);
          localStorage.setItem("Favourite", favouriteID);
          location.reload();
        });
      });
      const divMealInfo = document.querySelectorAll(".meal-info");
      //open it in a new tab
      divMealInfo.forEach((mealInfo) => {
        mealInfo.addEventListener("click", function (event) {
          window.open("fav.html", "_blank");
        });
      });
    });
});

////////////////////////////////////// to add mealID in the local storage
mealEl.addEventListener("click", (e) => {
  const mealInfo = e["target"].getAttribute("data-mealid");
  console.log(e["target"].parentElement.getAttribute("data-mealid"));
  if (mealInfo) {
    localStorage.setItem("mealID", mealInfo);
  }
});
