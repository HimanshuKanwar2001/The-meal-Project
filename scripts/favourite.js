const storedMealID=JSON.parse(localStorage.getItem('mealsID'));

const mealList=document.getElementById('meals');


console.log(storedMealID);




const searchAPI=(ids)=>{fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`).then((data)=>data.json()).then((data)=>{
  console.log(data);
  data.meals.map((meal)=>{
  console.log(meal);
  getDataFill(meal);
  
   const mealCard=document.querySelectorAll('.meal-card');
   console.log(mealCard);

   mealCard.forEach((card)=>{

    card.addEventListener("click",function(){
      console.log(card.id);
      let id=card.id;
      showMealsDetail(id);
     })
   })

  })});}
  // searchAPI(storedMealID[0]);

  storedMealID.forEach(id=>searchAPI(id));

  function showMealsDetail(id){

    localStorage.setItem("mealID",JSON.stringify(id));

    window.location.href='http://127.0.0.1:5500/mealDetail.html';
  }


  
function getDataFill(data){


  mealList.innerHTML +=`
          <div id=${data.idMeal} class="meal-card" >
              <img src=${data.strMealThumb} alt=${data.strMeal} >
              <h2 class="card-heading" >${data.strMeal}</h2>
              <div class="meal-detail">
               <p class="category"><strong>Category:</strong> ${data.strCategory}</p>
              <p><strong>Area:</strong> ${data.strArea}</p>
              <p><strong>Tags:</strong> ${data.strTags}</p>
             </div>
              
             <div class="links">
              <div class="yt-link">
                  <a href=${data.strYoutube} target="_blank" >Watch on YouTube</a>
                  
             </div>
             <div class="favourite-btn" >
              <button>Favourite</button>
              </div>
          </div>
          </div>
  
  `

}