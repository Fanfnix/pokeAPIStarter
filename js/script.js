let main = document.querySelector("main");
let select = document.querySelector("select");
let types = document.querySelector("#type");

/* === MAIN === */

loadData2("null");
types.addEventListener("change", function refresh() {
    let done = false;
    for (let child of types.children) {
        if (child.children.item(0).checked) {
            loadData2(`${child.children.item(0).id}`);
            done = true
        }
    }
    if (!done) loadData2("null")
});

/* === FUNCTION === */

async function loadData1(gen) {
    main.innerHTML = "";
    let url = `https://pokebuildapi.fr/api/v1/pokemon/generation/${gen}`;
    const data = await fetch(url) .then(response => response.json()) .catch(error => alert("Ereur : " + error));
    for (let i = 0; i < Object.keys(data).length; i++) addPokemon(data[i]);
}

async function loadData2(type) {
    main.innerHTML = "";
    const data = await fetch("./data/pokemon.json") .then(response => response.json()) .catch(error => alert("Ereur : " + error));
    const newData = getDataByType(data.pokemon, type);
    for (let i = 0; i < Object.keys(newData).length; i++) addPokemon(newData[i]);
}

function addPokemon(pokemon) {
    let pokemonName = pokemon.name;
    let pokemonImg = pokemon.image;
    let pokemonType = pokemon.types;
    let pokemonStats = pokemon.stats;

    let article = document.createElement("article");

    article.innerHTML = `
        <figure>
            <picture>
                <img src="${pokemonImg}" alt="Image ${pokemonName}" />
            </picture>
            <figcaption>
                <span class="types">${returnTypes(pokemonType)}</span>
                <h2>${pokemonName}</h2>
                <ol>
                    <li>Points de vie : ${pokemonStats[5].value}</li>
                    <li>Attaque : ${pokemonStats[4].value}</li>
                    <li>Défense : ${pokemonStats[3].value}</li>
                    <li>Attaque spécial : ${pokemonStats[2].value}</li>
                    <li>Vitesse : ${pokemonStats[0].value}</li>
                </ol>
            </figcaption>
        </figure>
    `
    modifyColorByType(pokemonType, article)
    main.appendChild(article);
}

function returnTypes(pokemonType) {
    let result = "";
    for (const element of pokemonType) {
        result += `${element}`;
        if (element != pokemonType[Object.keys(pokemonType).length-1]) result += " - ";
    }
    return result;
}

function getDataByType(data, type) {
    let newData = (type == "null") ? data : data.filter(pokemon => pokemon.types.includes(type));
    return newData
}

function getColorrByType(type) {
    switch (type) {
        case "grass":
            return "#78C850";
        case "fire":
            return "#F08030";
        case "water":
            return "#6890F0";
        case "bug":
            return "#A8B820";
        case "normal":
            return "#A8A878";
        case "poison":
            return "#A040A0";
        case "electric":
            return "#F8D030";
        case "ground":
            return "#E0C068";
        case "fairy":
            return "#EE99AC";
        case "fighting":
            return "#C03028";
        case "psychic":
            return "#F85888";
        case "rock":
            return "#B8A038";
        case "ghost":
            return "#705898";
        case "ice":
            return "#98D8D8";
        case "dragon":
            return "#7038F8";
        case "steel":
            return "#B8B8D0";
        case "flying":
            return "#A890F0";
        default:
            return "lightgray";
    }
}

function modifyColorByType(pokemonType, article) {
    let backgroundColors = (pokemonType.length == 2) ? [getColorrByType(pokemonType[0]), getColorrByType(pokemonType[1])] : [getColorrByType(pokemonType[0]), getColorrByType(pokemonType[0])]
    article.style.background = `linear-gradient(120deg, ${backgroundColors[0]}, ${backgroundColors[1]})`;
}