const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

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
    // console.log(resultHeading);
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Result for ${term}</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There are No result for ${term}</h2>`;
        } else {
          mealEl.innerHTML = data.meals
            .map(
              (meal) => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>

                    `
            )
            .join("");
        }
      });
  }
}

// //fetch meal by id
// function getMealById(mealID) {
//   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//       const meal = data.meals[0];
//     //   console.log(meal[`strIngredient1`]);
//       addMealToDOM(meal);
//     });
// }

//Random Meal
function randomMeal(){
     mealEl.innerHTML="";
     resultHeading.innerHTML="";


     fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then((res)=>res.json()).then((data)=>{
        // console.log(data);
        const meal=data.meals[0];
        addMealToDOM(meal);
     })
}




// //add meal to DOM

// function addMealToDOM(meal) {
//   const ingredients = [];
//   for (let i = 1; i <= 20; i++) {
 
//     // console.log(meal[`strIngredient${i}`]);   
//     if (meal[`strIngredient${i}`]) {
//         // console.log(meal[val]);
//       ingredients.push(
//         `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
//       );
//     } else {
//       break;
//     }
//   }

//   single_mealEl.innerHTML = `
//     <div class="single-meal">
//     <h1>${meal.strMeal}</h1>
//     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
//     <div class="single-meal-info">
//         ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
//         ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
//     </div>
//     <div class="main">
//         <p>${meal.strInstructions}</p>
//         <h2>Ingredients</h2>
//         <ul>
//         ${ingredients.map((ing) => `<li> ${ing}</li>`).join("")}
//         </ul>
    
//     </div>

//     </div>
//     `;
// }

// event Listerners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click",randomMeal);

console.log(mealEl);
mealEl.addEventListener("click", (e) => {
  console.log(e["target"].getAttribute("data-mealID"));
  


  let list = e["target"].classList;
  const mealInfo = {
    if(list) {
      return e["target"].classList.contains("meal-info");
    },
  };
  // mealInfo.getAttribute("data-mealID")

  // const mealInfo=e.find((keys)=>{
  //     if(keys.classList){
  //         return item.classList.contains("meal-info");
  //     }
  //     else{
  //         return false
  //     }
  // });
  if (mealInfo) {
    const mealID = e["target"].getAttribute("data-mealID");
    localStorage.setItem("mealID",mealID);
    //trail
    // getMealById(mealID);
    window.location.href="fav.html"
  }
});
