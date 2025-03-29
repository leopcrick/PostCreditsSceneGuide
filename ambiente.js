//ABRIR E FECHAR DO MENU
let icon = document.getElementById("menu-icon")
let overlay = document.getElementById("overlay");
icon.addEventListener("click", (evt)=>{
    let menu = document.getElementById("menu")
    menu.classList.toggle("show-menu")
    overlay.classList.toggle("active")
    if (menu.classList.contains("show-menu")) {
        icon.innerHTML = "&#10006;" // Ícone de fechar (X)
    } else {
        icon.innerHTML = "&#9776;" // Ícone de menu (≡)
    }
})
// FECHA O MENU AO CLICAR NO OVERLAY
overlay.addEventListener("click", () => {
    let menu = document.getElementById("menu")
    menu.classList.remove("show-menu")
    overlay.classList.remove("active")
    icon.innerHTML = "&#9776;" // Volta ao ícone de menu
})


//ABRIR E FECHAR DESCRIÇÃO
let antispoiler = document.getElementById("antispoiler")
antispoiler.addEventListener("click", (evt)=>{
    let description = document.getElementById("description")
    description.classList.toggle("show-description")
    if (description.classList.contains("show-description")) {
        antispoiler.innerHTML = "Hide Description"
        description.style.display = "block"
        antispoiler.style.margin = "20px auto"
    } else {
        antispoiler.innerHTML = "Show Description"
        description.style.display = "none"
        antispoiler.style.margin = "50px auto"
    }
})