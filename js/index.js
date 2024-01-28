let searchInputs = document.getElementById("searchInputs");
let showDate = document.getElementById("showDate");
let contactUS=document.getElementById("contactUS");

$(window).ready(function(){
    $(".sk-circle").fadeOut(200)
    $("#loader").remove()
    $("body").css({"overflow":"auto"})
})

$(".openBar").click(function(){
    $("#Menu").animate({width: "20%"},500)
    
})
$(".closebtn").click(function(){
    $("#Menu").animate({width:"0%"},500)
})
$(".Search").click(function(){
    $("#Menu").animate({width:"0%"},500)
})
$(".Categories").click(function(){
    $("#Menu").animate({width:"0%"},500)
})
$(".Area").click(function(){
    $("#Menu").animate({width:"0%"},500)
})
$(".Ingredients").click(function(){
    $("#Menu").animate({width:"0%"},500)
})
$(".Contact").click(function(){
    $("#Menu").animate({width:"0%"},500)
})




// start Search
function getSearchInputs() {
    searchInputs.innerHTML = `
    <div class="row py-4 text-white">
        <div class="col-md-6 ">
            <input onkeyup="getsearchMeal(value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="getsearchmealFirst(value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    showDate.innerHTML = ""
    contactUS.innerHTML =""
}

async function getsearchMeal(search) {
    
    let searchMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    searchMeal = await searchMeal.json()
console.log(searchMeal);
    displayMeals(searchMeal.meals)

}

async function getsearchmealFirst(search) {
    
    let searchmealFirst = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
    searchmealFirst = await searchmealFirst.json()
console.log(searchmealFirst);
    displayMeals(searchmealFirst.meals)

}
// end search

// start get meals
function displayMeals(alldateMeals) {
    let cartona = "";
    for (let i = 0; i < alldateMeals.length; i++) {
        cartona += `
    <div class="col-md-3 text-white">
        <div onclick="getDetails(${alldateMeals[i].idMeal})" > 
            <img class="w-100" src="${alldateMeals[i].strMealThumb}" alt="">
        </div>
        <div>
            <h4 class="text-center">${alldateMeals[i].strMeal}</h4>
        </div>
    </div>
        `
    }
    showDate.innerHTML = cartona
}

// end get meals

// start categories
async function getCategories() {
    
    let alldateCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    alldateCategories = await alldateCategories.json()
console.log(alldateCategories);
    displayCategories(alldateCategories.categories)
}

function displayCategories(allDate) {
    let cartona = "";

    for (let i = 0; i < allDate.length; i++) {
        cartona += `
        <div class="col-md-3 text-white">
                <div onclick="getmealsCategory('${allDate[i].strCategory}')" class=" text-layer rounded-2 cursor-pointer">
                    <img class="w-100" src="${allDate[i].strCategoryThumb}" alt="">
                    <div class="layer text-center text-black p-2">
                        <h3>${allDate[i].strCategory}</h3>
                        <p>${allDate[i].strCategoryDescription}</p>
                    </div>
                </div>  
        </div>
        `
    }
    showDate.innerHTML = cartona
    searchInputs.innerHTML=""
    contactUS.innerHTML =""
}

async function getmealsCategory(category) {
    let alldateMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    alldateMeals = await alldateMeals.json()

console.log(alldateMeals);
    displayMeals(alldateMeals.meals)
}
// end categories

// start area
async function getArea() {
    let alldateArea=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    alldateArea=await alldateArea.json()
    console.log(alldateArea.meals);
    displayArea(alldateArea.meals);
}


function displayArea(alldateArea) {
    let cartona = "";
    for (let i = 0; i < alldateArea.length; i++) {  
        cartona +=`
        <div onclick="getAreaMeals('${alldateArea[i].strArea}')" class="col-md-3 text-center text-white">
        <i class="fa-solid fa-house-laptop fs-1 "></i>
            <h1>${alldateArea[i].strArea}</h1>
        </div>
        `
    }
    showDate.innerHTML=cartona
    searchInputs.innerHTML=""
    contactUS.innerHTML =""
}

async function getAreaMeals(area) {
    let allareaMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    allareaMeals = await allareaMeals.json()
    console.log(allareaMeals);
    displayMeals(allareaMeals.meals)
    
}


// end area

// start Ingredients
async function getIngredients() {
    let allIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    allIngredients = await allIngredients.json()
    console.log(allIngredients.meals);
    displayIngredients(allIngredients.meals.slice(0, 20))
}



function displayIngredients(allIngredients) {
    let cartona = "";

    for (let i = 0; i < allIngredients.length; i++) {
        cartona += `
        <div class="col-md-3 text-white">
                <div onclick="getmealsingredients('${allIngredients[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fs-1"></i>
                        <h3>${allIngredients[i].strIngredient}</h3>
                        <p>${allIngredients[i].strDescription}</p>
                </div>
        </div>
        `
    }

    showDate.innerHTML = cartona
}

async function getmealsingredients(mealIngre) {
    let allingredientsMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngre}`)
    allingredientsMeals = await allingredientsMeals.json()
    console.log(allingredientsMeals);
    displayMeals(allingredientsMeals.meals.slice(0, 20))
}
// end Ingredients

// stat home
async function getdateHome() {
    let allIdateHome=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    allIdateHome=await allIdateHome.json()
    console.log(allIdateHome.meals);
    displaydateHome(allIdateHome.meals)
    
}
getdateHome()

function displaydateHome(allIdateHome) {
     let cartona =``
    for (let i = 0; i < allIdateHome.length; i++) {
        cartona +=`
        <div class="col-md-3 text-white">
        <div onclick="getDetails(${allIdateHome[i].idMeal})"  class="text-layer rounded-2 cursor-pointer">
            <img class="w-100" src="${allIdateHome[i].strMealThumb}" alt="">
        <div class="layer w-100 h-100 text-left text-black ">
            <h4>${allIdateHome[i].strMeal}</h4>
        </div>
        </div>
    </div>
        `
    }
    showDate.innerHTML = cartona
}
// end home

// start details 

async function getDetails(id) {
    console.log(id)
    let allDetails=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    allDetails=await allDetails.json()
    console.log(allDetails.meals);
    disPlayDetails(allDetails.meals)
}

function disPlayDetails(allDetails) {
    allDetails=allDetails[0]
    let cartona=""
        cartona=`
        <div class="col-md-4">
        <img class="w-100" src="${allDetails.strMealThumb}"  alt="">
        <h2 class="text-white" >${allDetails.strMeal}</h2>
        
    </div>
    <div class="col-md-8 ">
        <h2 class="text-white" >Instructions</h2>
        <p class="text-white">${allDetails.strInstructions}.</p>
        <h2 class="text-white">Area : <span>${allDetails.strArea}</span></h2>
        <h2 class="text-white">Category : <span>${allDetails.strCategory}</span></h2>
        <h2 class="text-white">Recipes  : <span class="text-info">${allDetails.strIngredient1}</span> <span class="text-info">${allDetails.strIngredient2}</span> <span class="text-info">${allDetails.strIngredient3}</span>
        <span class="text-info">${allDetails.strIngredient4}</span> <span class="text-info">${allDetails.strIngredient5}</span> <span class="text-info">${allDetails.strIngredient6}</span> </h2>
        <h2 class="text-white">Area : <span>${allDetails.strArea}</span></h2>
        <h2 class="text-white">Tags : <h2 class="text-danger" >${allDetails.strTags}</h2></h2>
        <a target="_blank" href="${allDetails.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${allDetails.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
        `
    showDate.innerHTML=cartona;
}


function getcontactUs() {
    contactUS.innerHTML = `
    <div class="row py-4 text-white">
    <div class="col-md-6 pb-4 ">
    <div>
        <input id="nameInput" class="form-control  bg-transparent text-white" type="text" placeholder="Enter Your Name">
    </div>
    <div id="nameAlert" class="alert d-none alert-danger w-100" >
        Special characters and numbers not allowed
    </div>
</div>
<div class="col-md-6 pb-4 ">
<div>
<input id="emailInput" class="form-control bg-transparent text-white" type="Email" placeholder="Enter Your Email">
</div>
<div id="emailAlert" class="alert d-none alert-danger w-100 ">
    Special characters and numbers not allowed
</div>
</div>
<div class="col-md-6 pb-4 ">
<div>
    <input id="phoneInput" class="form-control bg-transparent text-white" type="text" placeholder="Enter Your Phone">
</div>
<div id="phoneAlert" class="alert d-none alert-danger w-100 ">
    Special characters and numbers not allowed
</div>
</div>
<div class="col-md-6 pb-4 ">
<div>
    <input id="ageInput" class="form-control bg-transparent text-white" type="text" placeholder="Enter Your Age">
</div>
<div id="ageAlert" class="alert d-none alert-danger w-100 ">
    Special characters and numbers not allowed
</div>
</div>
<div class="col-md-6 pb-4 ">
<div>
    <input id="passwordInput" class="form-control bg-transparent text-white" type="password"  placeholder="Enter Your Password">
</div>
<div id="passwordAlert" class="alert d-none alert-danger w-100 ">
    Special characters and numbers not allowed
</div>
</div>
<div class="col-md-6 pb-4 ">
<div>
    <input id="repasswordInput" class="form-control bg-transparent text-white" type="password" placeholder="Repassword">
</div>
<div id="repasswordAlert" class="alert d-none alert-danger w-100 ">
    Special characters and numbers not allowed
</div>
</div>
        <button  class="  btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>`
    
    showDate.innerHTML = ""

    document.getElementById("nameInput").addEventListener("keyup", () => {
    let regex= /^[a-zA-Z\s'-]+$/
    if ((regex.test(document.getElementById("nameInput").value)===false)) {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    }else{
        document.getElementById("nameAlert").classList.replace("d-block","d-none")
    }

    })

    document.getElementById("emailInput").addEventListener("keyup", () => {
    let regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if ((regex.test(document.getElementById("emailInput").value)===false)) {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    }else{
            document.getElementById("emailAlert").classList.replace("d-block","d-none")
    }
    
    })

    document.getElementById("phoneInput").addEventListener("keyup", () => {
    let regex= /^\S[0-9]{0,10}$/
    if ((regex.test(document.getElementById("phoneInput").value)===false)) {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    }else{
            document.getElementById("phoneAlert").classList.replace("d-block","d-none")
    }
        
    })

    document.getElementById("ageInput").addEventListener("keyup", () => {
    let regex= /^\S[0-9]{0,3}$/
    if ((regex.test(document.getElementById("ageInput").value)===false)) {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    }else{
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
    }
            
    })

    document.getElementById("passwordInput").addEventListener("keyup", () => {
    let regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    if ((regex.test(document.getElementById("passwordInput").value)===false)) {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    }else{
            document.getElementById("passwordAlert").classList.replace("d-block","d-none")
    }
                
    })

    document.getElementById("repasswordInput").addEventListener("keyup", () => {
    let regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    if ((regex.test(document.getElementById("repasswordInput").value)===false)) {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    }else{
            document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
    }
                    
    })
}
