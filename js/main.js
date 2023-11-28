let navList = document.querySelectorAll(".nav-link")

let list = document
let resipeList = []
async function getData(type = 'pizza'){
   let myReq =   await fetch(`https://forkify-api.herokuapp.com/api/search?q=${type}`)
   let data = await myReq.json()
   resipeList = data.recipes
   displayData()
}
getData()

function displayData(){
    temp = ""
    resipeList.forEach((element)=>{
        temp+=` <div class="col-lg-3 text-center border g-3">
        <div   data-bs-toggle="modal" data-bs-target="#exampleModal" recipeId=${element.recipe_id} class="item">
            <img src="${element.image_url == null ?  "images/istockphoto-1190533489-612x612.jpg" : element.image_url}" class="w-100" id="images" alt="">
            <h5>${element.title}</h5>
            <p>${element.recipe_id}</p>
        </div>
    </div>`
    
    // let recipesId = document.getElementById("images")
    // if (recipesId == null){
    //     recipesId.setAttribute("src", "../images (1).png")
    // }else{
    //     recipesId.getAttribute("src", `${element.image_url}`)
    // }
    
    })
    document.getElementById("myData").innerHTML = temp
getItems()

}

navList.forEach((el)=>{
    el.addEventListener("click", function(e){
        let typeCategory = e.target.getAttribute("typeRecipe")
        console.log(typeCategory);
        getData(typeCategory)
    })
    })

// //////////////////////////////////////////////////////////////////////

function getItems(){
    
    let item = document.querySelectorAll(".item")

    item.forEach((el)=>{
        el.addEventListener("click", function(){
        let id = this.getAttribute("recipeId")
        console.log(id);
        getDetails(id)

    })
    })
    // console.log(item);
 
}



///////////////////////////////////////////////////////////

 async  function getDetails(id){
let myReq = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
let data = await myReq.json()
// console.log(data.recipe.ingredients);
displayDetails(data)
}

 function displayDetails(data){
    let temp = ""
    data.recipe.ingredients.forEach((el)=>{
        temp+= `<li>${el}</li>`
    
    })
    
    document.getElementById("ingredients").innerHTML = data.recipe.title
    document.getElementById("myImg").setAttribute("src", data.recipe.image_url)
    
    document.getElementById("ingredients").innerHTML = temp
    let urlTemp =`<a target="_blank"  href="${data.recipe.publisher_url}">${data.recipe.publisher}</a>`
    document.getElementById("url").innerHTML= urlTemp
}