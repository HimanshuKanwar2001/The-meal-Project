
const mealID=JSON.parse(localStorage.getItem('mealID'))
const mealInfo=document.getElementById("single-meal");
console.log(mealID);













const searchAPI=(ids)=>{
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`).then((data)=>data.json()).then((data)=>{
  console.log(data);
  data.meals.map((meal)=>{
  console.log(meal);
  getDataFill(meal);
  
  //  const mealCard=document.querySelectorAll('.meal-card');
  //  console.log(mealCard);

  //  mealCard.forEach((card)=>{

  //   card.addEventListener("click",function(){
  //     console.log(card.id);
  //     let id=card.id;
  //     showMealsDetail(id);
  //    })
  //  })

  })});}

  searchAPI(mealID);




  function getDataFill(data) {
    // Create a list of ingredients and their measures
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        ingredients += `<tr>
        <td><strong>${data[`strMeasure${i}`].trim()}:</strong></td><td>${data[`strIngredient${i}`]}</td>
        </tr> `;
      }
    }
  
    // Add meal information
    mealInfo.innerHTML += `
          <div id=${data.idMeal} class="meal-card">
              <img src=${data.strMealThumb} alt=${data.strMeal}>
              <h2 class="card-heading">${data.strMeal}</h2>
              
              <div class="meal-detail">
                  <p class="category"><strong>Category:</strong> ${data.strCategory}</p>
                  <p><strong>Area:</strong> ${data.strArea}</p>
                  <p><strong>Tags:</strong> ${data.strTags ? data.strTags : 'None'}</p>
              </div>
              
              <div class="meal-instructions">
                  <h3>Instructions:</h3>
                  <p>${data.strInstructions.replace(/\r\n/g, '<br>')}</p>
              </div>
  
              <div class="meal-ingredients">
                  <h3>Ingredients:</h3>
                  <table class="ingredients-table" >
                      ${ingredients}
                  </table>
              </div>
              
              <div class="links">
                  <div class="yt-link">
                      <a href=${data.strYoutube} target="_blank">Watch on YouTube</a>
                  </div>
                 
              </div>
          </div>
      `;
  }
  