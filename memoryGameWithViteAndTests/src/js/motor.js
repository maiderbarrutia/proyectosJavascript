export function sum(a, b) {
    return a + b;
}

// class Card {
//     constructor(value, imagePath) {
//       this.value = value;
//       this.isFlipped = false;
//       this.imagePath = imagePath;
//     }
  
//     flip() {
//       this.isFlipped = !this.isFlipped;
//     }
//     unFlip(){
//         this.isFlipped = false;
//     }
// }
  
// class MemoryGame {
//     constructor(cards) {
//       this.cards = cards;
//       this.flippedCards = [];
//       this.shuffleCards();
//       this.setupClickHandler();
//       this.paintCards();
//     }
  
//     shuffleCards() {
//         // Opción 1: Usar for
//         for (let i = this.cards.length - 1; i >= 0; i--) {
//             const random = Math.floor(Math.random() * (i + 1));
//             [this.cards[i], this.cards[random]] = [this.cards[random], this.cards[i]];
//         }
//         console.log(this.cards);
//     }

//     paintImage(index){
//         if (!this.cards[index].isFlipped) {
//             const cardElement = document.querySelector(`#game-board .card[data-index="${index}"]`);
//             cardElement.classList.add('flipped');

//             const cardImage = cardElement.querySelector('img'); // Seleccionar la imagen dentro de la carta
//             cardImage.src = `${this.cards[index].imagePath}`; // Cambiar la ruta de la imagen
//         }
//     }
//     unPaintImage(index){
//         const cardElement = document.querySelector(`#game-board .card[data-index="${index}"]`);
//         cardElement.classList.remove('flipped');

//         const cardImage = cardElement.querySelector('img'); // Seleccionar la imagen dentro de la carta
//         cardImage.src = '../src/img/defaultImage.png'; // Cambiar la ruta de la imagen
//     }
  
//     flipCard(index) {
//         if (index >= 0 && index < this.cards.length) { // Verificar si el índice está dentro del rango válido
//             this.cards[index].flip(); // Voltear la carta en el índice especificado
//             this.paintImage(index);

//             this.flippedCards = this.cards.filter(card => card.isFlipped);
//             this.checkMatch();
//         }
//     }
  
//     unFlipCards() {
//         this.flippedCards.forEach(card => {
//             card.unFlip();
//             this.paintImage(this.cards.indexOf(card));
//         });
//         this.flippedCards = [];
//     }
  
//     checkMatch() {
//         if (this.flippedCards.length === 2) {
//             const [firstCard, secondCard] = this.flippedCards;
//             if (firstCard.value === secondCard.value) {
//                 console.log('¡Coincidencia!');
//                 console.log(this.flippedCards)
//                 // Lógica para mantener las cartas volteadas
//                 this.flippedCards = [];
                
//             } else {
//                 console.log('No hay coincidencia');
//                 // Lógica para volver a voltear las cartas
//                 console.log(this.flippedCards)
//                 this.unPaintImage(this.cards.indexOf(firstCard))
//                 this.unPaintImage(this.cards.indexOf(secondCard))
//                 this.unFlipCards();
//                 console.log(this.flippedCards)
//                 // setTimeout(() => {
//                 //     this.unFlipCards();
//                 // }, 1000);
//             }
//         }
//     }

//     paintCards(){
//         const gameBoard = document.getElementById('game-board');
//         gameBoard.innerHTML = ''; // Limpiar el contenido previo

//         this.cards.forEach((card, index) => {
//             const cardElement = document.createElement('div');
//             cardElement.className = 'card';
//             cardElement.dataset.index = index; // Para guardar el índice de la carta en el dataset
            
//             const imageElement = document.createElement('img');
//             imageElement.src = card.isFlipped ? card.imagePath : '../src/img/defaultImage.png'; // Mostrar la imagen volteada o una imagen por defecto
//             imageElement.alt = 'Card'; // Añadir un atributo alt por accesibilidad

//             cardElement.appendChild(imageElement);
//             gameBoard.appendChild(cardElement);
//         });
//     }

//     setupClickHandler(){
//         const gameBoard = document.getElementById("game-board");
        
//         gameBoard.addEventListener('click', event => {
//             const clickedCard = event.target;
//             if (clickedCard.classList.contains('card')) {
//                 let index = 0; 
//                 for (let i = 0; i < gameBoard.children.length; i++) {
//                     if (gameBoard.children[i] === clickedCard) {
//                         index = i;
//                         break;
//                     }
//                 }
//                 this.flipCard(index);
//             }
//         });
//     }
// }

// // Ejemplo de uso
// const cards = [
//     new Card(1, '../src/img/1.png'),
//     new Card(2, '../src/img/2.png'),
//     new Card(3, '../src/img/3.png'),
//     new Card(1, '../src/img/1.png'),
//     new Card(2, '../src/img/2.png'),
//     new Card(3, '../src/img/3.png')
// ];
  
// const game = new MemoryGame(cards);

  