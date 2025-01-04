// C = TREBOL
// S = SWORD
// D = DIAMONDS
// H = HEARTS

let deck = [];
const figuras = ["C", "S", "D", "H"];
const especial = ["A", "J", "K", "Q"];

/**
 * deckBuild: crea el deck de cartas en orden aleatorio
 */
const deckBuild = () => {
    for (let i = 2; i <= 10; i++) {
        for (let f of figuras) {
            deck.push(i + f);
        }
    }
    for (let f of figuras) {
        for (let e of especial) {
            deck.push(e + f);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

deckBuild();

console.log(deck);

/**
 * getCard: Obtener una carta del deck
 */
const getCard = () => deck.length === 0 ? console.error("No hay mas cartas en el deck") : deck.pop();

// console.log(getCard());

// console.log(deck);

/**
 * valueCard: Obtiene el puntaje de las cartas
 */
const valueCard = (card) => isNaN(card.substring(0, card.length - 1)) == false ? card.substring(0, card.length - 1) * 1 : card.substring(0, card.length - 1) === "A" ? 11 : 10;

// console.log(valueCard("jD"));

console.log(valueCard(getCard()));

console.log(deck);

