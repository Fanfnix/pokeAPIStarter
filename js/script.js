const data = await fetch("./data/data.json") .then(response => response.json()) .catch(error => alert("Ereur : " + error));
let main = document.querySelector("main");

for (let i = 0; i < Object.keys(data).length; i++) {
    addPokemon(data[i]);
}

function addPokemon(pokemon) {
    let pokemonName = pokemon.name;
    let pokemonImg = pokemon.image;
    let pokemonType = pokemon.apiTypes[0].name;
    let pokemonStats = pokemon.stats;
    main.innerHTML += `
    <article>
        <figure>
            <picture>
                <img src="${pokemonImg}" alt="Image ${pokemonName}" />
            </picture>
            <figcaption>
                <span class="types">${pokemonType}</span>
                <h2>${pokemonName}</h2>
                <ol>
                    <li>Points de vie : ${pokemonStats.HP}</li>
                    <li>Attaque : ${pokemonStats.attack}</li>
                    <li>Défense : ${pokemonStats.defense}</li>
                    <li>Attaque spécial : ${pokemonStats.special_attack}</li>
                    <li>Vitesse : ${pokemonStats.speed}</li>
                </ol>
            </figcaption>
        </figure>
    </article>
    `
}