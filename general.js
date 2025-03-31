//ABRIR E FECHAR DO MENU ----------------------------------------------------
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


//EXPANSÃO DA BARRA DE PESQUISA AO PESQUISAR --------------------------------
const searchInput = document.getElementById('isearch')
const header = document.querySelector('.header')
searchInput.addEventListener('focus', () => {
    header.classList.add('search-expanded')
})
searchInput.addEventListener('blur', () => {
    header.classList.remove('search-expanded')
})