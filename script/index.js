let results = document.getElementById("results");
let api_key="211a1cda3fc144e2b7dba0354b74775b"
let query="pizza"

// show results
let fetchrecipe=()=>{
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=`+api_key)
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
    data.results.forEach(el => {
      showresults(el)
      
    });
  }).catch((err)=>{
    console.log(err)
  })
}
fetchrecipe();

let container=document.getElementById('results')
let showresults = (data) => {
  container.innerHTML += `<div class="card col-2 mx-2 text-center " style="width: 15rem;" >
  <img src="${data.image}" class="card-img-top my-3" alt="...">
  <div class="card-body">
    <div class="col-12">
    <h5 class="card-title" id="title">${data.title}</h5>
    </div>
    <div class="col-12 view_recipe">
    <button class="btn-danger showrecipe" type="button" data-bs-target="#staticBackdrop" data-bs-toggle="modal" id="${data.id}">View Recipe</button>
    </div>
  </div>  
</div>`;

$('.showrecipe').click(function(){
  showrecipe(this.id)
})
};

// search recipe
$(document).ready(function(){
  $('#submit').click(()=>{
    query=$('#query').val();
    console.log(query)
    $('#results').html("");
    fetchrecipe(query)
  })

})

// view recipe
let showrecipe=(id)=>{
  fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}&includeNutrition=true&includeI`)
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
    $('.modal-content').empty()
    recipemodal(data)
  }).catch(err=>console.log(err))

}

let recipemodal=(data)=>{
  let info=document.getElementById('information')
  info.innerHTML+=`<div class="modal-header">
  <h2 class="modal-title" id="modaltitle">${data.title}</h2>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
  <div class="row">
    <div class="col">
      <img src="${data.image}" alt="" width="100%" height="100%">
    </div>
    <div class="col-12">
      <div class="row " >
        <div class="col text-center">
        <img src="../images/3.png" class="likes">
        <p class="serve">${data.aggregateLikes}</p>
        </div>
        <div class="col text-center">
        <img src="../images/2.png" class="likes">
        <p class="serve">${data.readyInMinutes} min</p>
        </div>
        <div class="col text-center">
        <img src="../images/4.png" class="likes">
        <p class="serve">${data.servings}</p>
        </div>
      </div>
    </div>
    <div class="col-12">
      <h3 class="my-4 text-danger">Ingridents</h3>
      <ul class="list-group" id="ingrident-items">
      </ul>
    </div>
    <div class="col-12">
      <h3 class="my-4 text-danger">Nutrition</h3>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Carbohydrates: ${data.nutrition.caloricBreakdown.percentCarbs}%</li>
      <li class="list-group-item">Protien: ${data.nutrition.caloricBreakdown.percentProtein}%</li>
      <li class="list-group-item">Fat: ${data.nutrition.caloricBreakdown.percentFat}%</li>
      </ul></hr>
      </div>
      <div class="col-12">
        <h3 class="my-4 text-danger">steps</h3>
        <ul class="list-group" id="steps">

        </ul>

      </div>
    <div class="col-12">
      <h3 class="my-4 text-danger">Summary</h3>
      <p>${data.summary}</p>
    </div>
  </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>`
data.nutrition.ingredients.forEach((el)=>{
  $('#ingrident-items').append(`<li class="list-group-item"> ${el.amount} ${el.unit} ${el.name}</li>`)
})

data.analyzedInstructions[0].steps.forEach((el)=>{

  let li=document.createElement('li');
  li=el.step
  $('#steps').append(li)

})
}