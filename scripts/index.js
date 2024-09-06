const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const result=document.getElementById('result-heading');


// const single_mealEl = document.getElementById("single-meal");
// let favouriteMealID = [];




submit.addEventListener("submit",(e)=>{
  e.preventDefault();
  // console.log(e.target.search.value);
  
  const mealSearch= e.target.search.value ? e.target.search.value : "";

  result.innerHTML="";

    
  
  searchAPI(mealSearch)  


  
})

const searchAPI=(mealSearch)=>{fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSearch}`).then((data)=>data.json()).then((data)=>{
  // console.log(data);
  data.meals.map((meal)=>{
  // console.log(meal);
   getDataFill(meal);
   const mealCard=document.querySelectorAll('.meal-card');
   console.log(mealCard);

   mealCard.forEach((card)=>{
    console.log(card.children[3].childNodes[3].childNodes[1]);
      card.addEventListener("click",function(){
      console.log(card.children[3].childNodes[3].childNodes[1].id);
      let id=card.children[3].childNodes[3].childNodes[1].id;
      storeInArray(id);
     })
   })

   mealCard.forEach((card)=>{

    card.addEventListener("click",function(){
      console.log(card.id);
      let id=card.children[3].childNodes[3].childNodes[1].id;
      showMealsDetail(id);
     })
   })



  })});}


   searchAPI("");

  const mealId=[];

   function storeInArray(id){
    
    if(!mealId.includes(id)){
      mealId.push(id);
    }
   console.log(mealId);



   localStorage.setItem("mealsID",JSON.stringify(mealId));
  
   
   }

   function showMealsDetail(id){

    localStorage.setItem("mealID",JSON.stringify(id));

    window.location.href='http://127.0.0.1:5500/mealDetail.html';
  }


  
   

function getDataFill(data){


    result.innerHTML +=`
            <div id=${data.idMeal}  class="meal-card" >
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
                <button id=${data.idMeal} >Favourite</button>
                </div>
            </div>
            </div>
    
    `

}



