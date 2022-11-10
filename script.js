/* 
TODO:
https://pokeapi.co/api/v2/pokemon/ditto
// for loop for gen random
cardContainer.children[i].children[0].textContent = data.forms[0].name

//404 error catch
*/ 

const generateButton = document.querySelector("#generate");
const cardContainer = document.querySelector(".card-container");

const randomNum = () => {
    return Math.floor(Math.random() * 905);
}

generateButton.addEventListener("click", () => {
    for(let i = 0; i < 6; i++) {
        let pokeNum = randomNum();
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNum)
        .then((response) => response.json())
        .then((data) => editPokemon(data, i));             
    }
})

const editPokemon = (data, i) => {
    cardContainer.children[i].children[0].textContent = firstLetterCapital(data.forms[0].name);
    cardContainer.children[i].children[1].setAttribute("src", data.sprites.other.home.front_default)
    if(data.sprites.other.home.front_default === null) {
        cardContainer.children[i].children[1].setAttribute("src", data.sprites.other["official-artwork"].front_default)
}
}

const firstLetterCapital = (str) => {
    return str[0].toUpperCase() + str.slice(1, str.length); 
}