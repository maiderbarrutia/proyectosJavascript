
import { Card, MemoryGame } from "./src/js/main";

// Pruebas de la clase Card
describe('Card', () => {
    // Prueba del constructor
    describe('Constructor', () => {
        it('debería inicializar la carta correctamente', () => {
            const valor = 1;
            const nombreImagen = '1.png';
            const carta = new Card(valor, nombreImagen);
            // Verificar que los atributos se inicializan correctamente
            expect(carta.value).toBe(valor);
            expect(carta.isFlipped).toBeFalsy();
            expect(carta.imageUrl).toBe('./src/img/1.png');
        });
    });
  
    // Prueba del método flip
    describe('flip', () => {
        it('debería voltear la carta', () => {
            const carta = new Card(1, '1.png');
            carta.flip();
            expect(carta.isFlipped).toBeTruthy();
        });
    });
  
    // Prueba del método unFlip
    describe('unFlip', () => {
        it('debería desvoltear la carta', () => {
            const carta = new Card(1, '1.png');
            carta.flip(); // Voltear la carta primero
            carta.unFlip();
            expect(carta.isFlipped).toBeFalsy();
        });
    });
});

// Pruebas de la clase MemoryGame
describe('MemoryGame', () => {
    describe('Constructor', () => {
        it('debería inicializar el juego correctamente', () => {
          const cartas = [
            new Card(1, '1.png'),
            new Card(2, '2.png'),
          ];
          const juego = new MemoryGame(cartas);
          // Verificar que las cartas y el array de cartas volteadas se inicializan correctamente
          expect(juego.cards).toEqual(cartas);
          expect(juego.flippedCards).toEqual([]);
        });
    });

    // Prueba del método shuffleCards
    describe('shuffleCards', () => {
        it('debería mezclar el array de cartas', () => {
            const cartas = [
                new Card(1, '1.png'),
                new Card(2, '2.png'),
                new Card(3, '3.png'),
            ];
            const juego = new MemoryGame(cartas);
            const ordenOriginal = [...juego.cards];
            juego.shuffleCards();
            // Verificar que el orden del array haya cambiado después de mezclar
            expect(juego.cards).not.toEqual(ordenOriginal);
        });
    });

    // Prueba del método allCardsMatched
    describe('allCardsMatched', () => {
        it('debería devolver verdadero si todas las cartas están volteadas', () => {
            const cartas = [
            new Card(1, '1.png'),
            new Card(2, '2.png'),
            new Card(3, '3.png'),
            ];
            const juego = new MemoryGame(cartas);
            cartas.forEach(carta => carta.flip()); // Voltear todas las cartas
            // Verificar que el método devuelva verdadero cuando todas las cartas estén volteadas
            expect(juego.allCardsMatched()).toBeTruthy();
        });
    });
  
});