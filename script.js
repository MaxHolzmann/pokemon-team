/* 
TODO:
https://pokeapi.co/api/v2/pokemon/ditto
// for loop for gen random
cardContainer.children[i].children[0].textContent = data.forms[0].name

//404 error catch

//more information on the card, typing, abilities, etc?? 

//catch pokemon with - in name  specficially such as the komomo line

//card click for info! have info existing on card element, but have it hidden. then take off hide class?? and hide pokemon side?? idk
*/ 

const generateButton = document.querySelector("#generate");
const cardContainer = document.querySelector(".card-container");

const genCheckboxOne = document.querySelector("#gen1")
const genCheckboxTwo = document.querySelector("#gen2")
const genCheckboxThree = document.querySelector("#gen3")
const genCheckboxFour = document.querySelector("#gen4")
const genCheckboxFive = document.querySelector("#gen5")
const genCheckboxSix = document.querySelector("#gen6")
const genCheckboxSeven = document.querySelector("#gen7")
const genCheckboxEight = document.querySelector("#gen8")

const checkboxes = [genCheckboxOne, genCheckboxTwo, genCheckboxThree, genCheckboxFour, genCheckboxFive, genCheckboxSix, genCheckboxSeven, genCheckboxEight];

const randomNum = (maximum) => {
    return Math.floor(Math.random() * maximum);
}

generateButton.addEventListener("click", () => {
    cardContainer.style.display = "flex";
    for(let i = 0; i < 6; i++) {
        let pokeNum = randomNum(905);
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNum)
        .then((response) => response.json())
        .then((data) => editPokemon(data, i));             
    }
})

const editPokemon = (data, i) => {
    cardContainer.children[i].children[0].textContent = firstLetterCapital(data.forms[0].name);
    cardContainer.children[i].children[1].setAttribute("src", data.sprites.other.home.front_default);
    if(data.sprites.other.home.front_default === null) {
        cardContainer.children[i].children[1].setAttribute("src", data.sprites.other["official-artwork"].front_default)
}
    localStorage.setItem(i, JSON.stringify(data));

}

const firstLetterCapital = (str) => {
   let string = str[0].toUpperCase() + str.slice(1, str.length); 
   if(string.includes("-")) {
    console.log('- found!')
    string = string.replaceAll("-", " ");
    const words = string.split(" ");
    for(let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
   } else {
    return string;
   }
}

const checkGens = () => {

}

cardContainer.addEventListener("click", (e) => {
    if(!e.target.classList.contains('card-container')) {
        if(e.target.childElementCount === 0) {
            if(e.target.parentElement.classList.contains('card-flip')) {
                e.target.parentElement.classList.remove('card-flip');
                
            } else {
            e.target.parentElement.classList.add('card-flip');
            e.target.parentElement.children[0].textContent = 'hey';
            e.target.parentElement.children[1].setAttribute('src', "")
        }
        } else {
            e.target.classList.add('card-flip');
            e.target.parentElement.children[0].textContent = 'hey';
            e.target.parentElement.children[1].setAttribute('src', "")
        }
    } else {
        console.log('container')
    }
})