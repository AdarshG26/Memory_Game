//---------------------------------------------------Array of cards--------------------------------------------------------------------

let cardsArray = [
    {
        "name": "CSS",
        "img": "https://images.unsplash.com/photo-1697178089590-80a8dafa6b16?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "HTML",
        "img": "https://images.unsplash.com/photo-1633605610025-d2e5f98d0581?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "jQuery",
        "img": "https://images.unsplash.com/photo-1720721957371-8d2149521d7d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "JS",
        "img": "https://images.unsplash.com/photo-1695031716231-364f5f499e82?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "name": "Node",
        "img": "https://images.unsplash.com/photo-1692011705961-bed172a69216?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        "name": "React",
        "img": "https://images.unsplash.com/photo-1677637279719-b6698ac1765f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

//-------------------------------------------------Duplicating each card-------------------------------------------------------------------

const gameCards = cardsArray.concat(cardsArray);


//---------------------------------------------------shuffling all cards--------------------------------------------------------------------

const myNumbers = (array) => {
    for(let i = array.length-1; i>0; i--){
        let j = Math.floor(Math.random() * (i+1));
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
const shuffleCards = myNumbers(gameCards)

//------------------------------------------------making and displaying cards------------------------------------------------------------------

const parentDiv = document.querySelector("#card-section");

for(let i=0; i<shuffleCards.length; i++){
    const childDiv = document.createElement("div");
    childDiv.classList.add("card");
    childDiv.dataset.name = shuffleCards[i].name;
    //childDiv.style.backgroundImage = `url(${shuffleCards[i].img})`;

    const front_div = document.createElement('div');
    front_div.classList.add('front-card');

    const back_div = document.createElement('div');
    back_div.classList.add('back-card');

    back_div.style.backgroundImage = `url(${shuffleCards[i].img})`;

    parentDiv.appendChild(childDiv);

    childDiv.appendChild(front_div);
    childDiv.appendChild(back_div);
}

//--------------------------------------------highlighting selected card------------------------------------------------------------

let clickCount = 0;
let firstCard = ""
let secondCard = ""

const card_matches = ()=>{
    let cardSelected = document.querySelectorAll('.card-selected')
    cardSelected.forEach((curElement) =>{
        curElement.classList.add('card_match')
    })
}

const reset_game = ()=>{
    clickCount = 0
    firstCard = ""
    secondCard = ""

    let cardSelected = document.querySelectorAll('.card-selected')
    cardSelected.forEach((curElement) =>{
        curElement.classList.remove('card-selected')
    })
}

parentDiv.addEventListener('click', (e)=>{
    let currentCard = e.target
    clickCount++;
    if(currentCard.id === 'card-section'){
        return false  
    }
    if(clickCount <= 2){
        if(clickCount === 1){
            firstCard = currentCard.parentNode.dataset.name;
            currentCard.parentNode.classList.add('card-selected')
        }
        else{
            secondCard = currentCard.parentNode.dataset.name;
            currentCard.parentNode.classList.add('card-selected')
        }

        if(firstCard !== "" && secondCard !== ""){
            if(firstCard === secondCard){
                setTimeout( ()=>{
                    card_matches()
                    reset_game()
                } ,1000)
            }
            else{
                setTimeout( ()=>{
                    reset_game()
                } ,1000)
            }
        }
    }
})
