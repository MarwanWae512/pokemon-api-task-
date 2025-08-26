apiLink = "https://pokeapi.co/api/v2/pokemon/ditto" //remove last one to add your chosen one

const searchBtn = document.getElementById("getPoke");
const searchInput = document.getElementById("pokeName");
const grid = document.querySelector(".grid");


async function getPokemon(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("try again");
    }
    const data = await response.json();
    displayPokemon(data);
  } catch (err) {
    grid.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

function displayPokemon(pokemon) {
  const img = pokemon.sprites.other["official-artwork"].front_default;
  const types = pokemon.types
    .map(t => `<span class="badge type-${t.type.name}">${t.type.name}</span>`)
    .join(" ");

  grid.innerHTML = `
    <article class="card" data-type="${pokemon.types.map(t => t.type.name).join(" ")}">
      <div class="num">#${pokemon.id.toString().padStart(3, "0")}</div>
      <img class="sprite" alt="${pokemon.name}" src="${img}" />
      <h2 class="name">${pokemon.name}</h2>
      <div class="types">${types}</div>
      <div class="meta">
        <span>Height: ${(pokemon.height / 10).toFixed(1)}m</span> ·
        <span>Weight: ${(pokemon.weight / 10).toFixed(1)}kg</span>
      </div>
    </article>
  `;
}

searchBtn.addEventListener("click", () => {
  const name = searchInput.value.trim();
  if (name) {
    getPokemon(name);
  } else {
    grid.innerHTML = `<p style="color:red;">Please enter a Pokémon name</p>`;
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
