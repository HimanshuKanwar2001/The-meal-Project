//fetch meal by id
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
        const meal = data.meals[0];
      //   console.log(meal[`strIngredient1`]);
        addMealToDOM(meal);
      });
  }
  
  // got data from script.js mealID
  const mealID=localStorage.getItem("mealID");
  console.log(mealID);
  getMealById(mealID);
  

  //add favourites here
  const favMealInc=document.getElementById("fav-meal-increase");
  console.log(favMealInc);
  let favMealID=[];
  favMealInc.addEventListener("click",addToFavorite);
 
  function addToFavorite(){
        let val=true;
    for(let i=0;i<=20;i++){
        if(mealID==favMealID[i])
            val=false;
    }
    if(val){
        favMealID.push(mealID);
    }
    else{
        favMealID.pop(mealID);
        

    }
  }
  console.log(favMealID);
  
  
  //add meal to DOM
  
  function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
   
      // console.log(meal[`strIngredient${i}`]);   
      if (meal[`strIngredient${i}`]) {
          // console.log(meal[val]);
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
 
//   localStorage.clear();