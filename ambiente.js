//ABRIR E FECHAR DO MENU ---------------------------------------------
let menu_icon = document.getElementById("menu_icon")
menu_icon.addEventListener("click", (evt)=>{
    changeMenuView()
})
let overlay = document.getElementById("overlay")
overlay.addEventListener("click", () => {
    changeMenuView()
})
function changeMenuView(){
    let menuSymbol = document.getElementById("menuSymbol")
    let closeSymbol = document.getElementById("closeSymbol")
    let menu = document.getElementById("menu")
    menu.classList.toggle("show-menu")
    overlay.classList.toggle("active")
    if (menu.classList.contains("show-menu")) {
        menuSymbol.style.display="none"
        closeSymbol.style.display="block"
    } else {
        menuSymbol.style.display="block"
        closeSymbol.style.display="none"
    }
}


//ABRIR E FECHAR DESCRIÇÃO -------------------------------------------
let antispoiler = document.getElementById("antispoiler")
antispoiler.addEventListener("click", (evt)=>{
    let description = document.getElementById("div_description")
    description.classList.toggle("show-description")
    if (description.classList.contains("show-description")) {
        antispoiler.innerHTML = "Hide Descriptions"
        description.style.display = "block"
    } else {
        antispoiler.innerHTML = "Show Descriptions"
        description.style.display = "none"
    }
})


//FAZER INDENTAÇÃO NO PARÁGRAFO DE DESCRIÇÃO -------------------------
const descriptionElement = document.getElementById('description');
const originalText = descriptionElement.textContent;
const cleanedText = originalText.replace(/^ +/gm, ''); 
descriptionElement.textContent = cleanedText;


//LIKE E DISLIKE -----------------------------------------------------
let thumbs_up = document.querySelectorAll(".thumb_up")
thumbs_up.forEach(thumb_up =>{
    thumb_up.addEventListener("click", (evt)=>{
        thumb_up.classList.toggle("liked")
        removeLike(evt)
        if(evt.currentTarget.closest('.interactions').querySelector('.disliked')){
            const hasDislike = evt.currentTarget.closest('.interactions').querySelector('.disliked')
            hasDislike.classList.toggle("disliked")
            removeDislike(evt)
        }
    })
})
let thumbs_down = document.querySelectorAll(".thumb_down")
thumbs_down.forEach(thumb_down =>{
    thumb_down.addEventListener("click", (evt)=>{
        thumb_down.classList.toggle("disliked")
        removeDislike(evt)
        if(evt.currentTarget.closest('.interactions').querySelector('.liked')){
            const hasDislike = evt.currentTarget.closest('.interactions').querySelector('.liked')
            hasDislike.classList.toggle("liked")
            removeLike(evt)
        }
    })
})
function removeDislike(evt){
    const dislikesCount = evt.currentTarget.closest('.interactions').querySelector('.dislikesCount')
    const currentDislikes = parseInt(dislikesCount.textContent)
    dislikesCount.textContent = evt.currentTarget.classList.contains('disliked') ? currentDislikes + 1 : currentDislikes - 1
}
function removeLike(evt){
    const likesCount = evt.currentTarget.closest('.interactions').querySelector('.likesCount')
    const currentLikes = parseInt(likesCount.textContent)
    likesCount.textContent = evt.currentTarget.classList.contains('liked') ? currentLikes + 1 : currentLikes - 1
}