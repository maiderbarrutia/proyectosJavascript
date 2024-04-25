class Card {
    constructor(value, imageName) {
        this.value = value;
        this.isFlipped;
        this.imagePath = 'img/';
        this.imageUrl = this.imagePath + imageName;
    }
  
    flip() {
        this.isFlipped = true;
    }
    unFlip(){
        this.isFlipped = false;
    }
}
  
class MemoryGame {
    constructor(cards) {
        this.cards = cards;
        this.flippedCards = [];
        // this.paintCards(); //Comentar esto si queremos pintar las cartas desde el html
        this.shuffleCards();
        this.setupClickHandler();
    }

    //Pintar las cartas desde JavaScript en vez de html
    paintCards(){
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = ''; // Limpiar el contenido previo

        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.index = index; // Para guardar el índice de la carta en el dataset
            
            const imageElement = document.createElement('img');
            imageElement.src = card.isFlipped ? card.imageUrl : card.imagePath + 'defaultImage.png'; // Mostrar la imagen volteada o una imagen por defecto
            imageElement.alt = 'Card'; // Añadir un atributo alt por accesibilidad

            cardElement.appendChild(imageElement);
            gameBoard.appendChild(cardElement);
        });
    }
    
    //Mezclar cartas en un orden aleatorio
    shuffleCards() {
        // for (let i = this.cards.length - 1; i >= 0; i--) {
        //     const random = Math.floor(Math.random() * (i + 1));
        //     [this.cards[i], this.cards[random]] = [this.cards[random], this.cards[i]];
        // }
        this.cards.sort(() => Math.random() - 0.5);
        
    }

    //Al hacer click en una carta seleccionada hacemos que se de la vuelta
    setupClickHandler(){
        const gameCards = document.querySelectorAll("#game-board .card");

        gameCards.forEach(card => {
            card.addEventListener('click', event => {
                event.preventDefault();
                const index = parseInt(card.dataset.index);
                this.flipCard(index);
            })
        });
    }
  
    //Dar la vuelta a la carta: Pintamos la imagen y hacemos comprobación de coincidencia de cartas
    flipCard(index) {
        if (index >= 0 && index < this.cards.length) {
            const selectedCardData = this.cards[index];
            selectedCardData.flip(); //Damos la vuelta a la carta elegida
            this.paintImage(index); //Pintamos la carta elegida con la imagen que le pertenece
            this.flippedCards.push(selectedCardData); //Las cartas elegidas las almacenamos en un array previamente declarado
            this.checkMatch(); //Comprobamos si las cartas son iguales o no
        }
    }

    //Pintar la imagen correspondiente a la carta
    paintImage(index){
        const cardHTMLElement = document.querySelector(`#game-board .card[data-index="${index}"]`);
        const cardHTMLImage = cardHTMLElement.querySelector('img');
        const selectedCardData = this.cards[index];

        cardHTMLElement.classList.toggle('flipped', selectedCardData.isFlipped);
        cardHTMLImage.src = selectedCardData.isFlipped ? selectedCardData.imageUrl : selectedCardData.imagePath + 'defaultImage.png';
    }
  
    //Voltear la carta como estaba al inicio
    unFlipCards() {
        this.flippedCards.forEach(card => {
            card.unFlip();
            const index = this.cards.indexOf(card);
            this.paintImage(index);
        });
        this.flippedCards = [];
    } 
  
    //Comprobar  si hay una pareja o no en el tablero
    checkMatch() {
        if (this.flippedCards.length === 2) {
            const [firstCard, secondCard] = this.flippedCards;
            if (firstCard.value !== secondCard.value) {
                setTimeout(() => {
                    this.unFlipCards();
                }, 1000);
            } else {
                this.flippedCards = [];
                if (this.allCardsMatched()) {
                    setTimeout(() => {
                        this.addMessage();
                        this.addRestartButton();
                    }, 500);
                }
            }
        }
    }

    // Verificar si todas las cartas estan volteadas
    allCardsMatched() {
        return this.cards.every(card => card.isFlipped);
    }

    // Añadir mensaje de que ha ganado el juego
    addMessage(){
        const gameBoard = document.getElementById('game-board');
        const messageElement = document.createElement('div');
        messageElement.className = 'messageContainer';
        
        const pElement = document.createElement('p');
        pElement.innerHTML = "¡Has ganado!";

        messageElement.appendChild(pElement);
        gameBoard.appendChild(messageElement);
    }

    //Añadir boton para reiniciar el juego
    addRestartButton(){
        const container = document.querySelector('.container');
        const buttonElement = document.createElement('button');
        buttonElement.id = 'restartButton';
        buttonElement.className = 'restartButton';
        buttonElement.innerHTML = "Reiniciar juego";
        
        container.appendChild(buttonElement);
        this.restartGame();
    }

    // Quitar el mensaje y el boton de reiniciar el juego
    clearElements() {
        const messageElement = document.querySelector('.messageContainer');
        const restartButton = document.getElementById('restartButton');
        if (messageElement) {
            messageElement.remove();
        }
        if (restartButton) {
            restartButton.remove();
        }
    }

    //Reiniciar el juego
    restartGame(){
        const restartButton = document.getElementById('restartButton');
        
        restartButton.addEventListener('click', (e)=>{
            e.preventDefault();
            this.setupBoard(); // Reiniciar el juego   
        })
    }

    // Poner las cartas como al inicio del juego
    setupBoard(){
        this.cards.forEach((card, index) => {
            this.clearElements();
            card.unFlip()
            this.paintImage(index);
            this.shuffleCards();
        });
    }
}



const cards = [
    new Card(1, '1.png'),
    new Card(2, '2.png'),
    new Card(3, '3.png'),
    new Card(4, '4.png'),
    new Card(5, '5.png'),
    new Card(6, '6.png'),
    new Card(1, '1.png'),
    new Card(2, '2.png'),
    new Card(3, '3.png'),
    new Card(4, '4.png'),
    new Card(5, '5.png'),
    new Card(6, '6.png'),
];
  
const game = new MemoryGame(cards);