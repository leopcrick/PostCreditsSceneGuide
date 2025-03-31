const apiKey = "xxx";
const searchInput = document.getElementById("isearch");
const suggestionsList = document.getElementById("suggestions");

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query.length < 2) { 
        suggestionsList.innerHTML = ""; // Se tiver menos de 2 caracteres, limpa sugestões
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        mostrarSugestoes(data.results);
    } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
    }
});

function mostrarSugestoes(movies) {
    suggestionsList.innerHTML = ""; // Limpa sugestões anteriores

    movies.slice(0, 5).forEach((movie) => { // Mostra no máximo 5 sugestões
        const listItem = document.createElement("li");
        listItem.classList.add("suggestion-item");
        listItem.textContent = `${movie.title} (${movie.release_date?.split("-")[0] || "N/A"})`;

        listItem.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id}`; // Leva para a página do filme
        });

        suggestionsList.appendChild(listItem);
    });
}