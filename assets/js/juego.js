// C = TREBOL
// S = SWORD
// D = DIAMONDS
// H = HEARTS

/**
 * DOM referencias
 */
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");
const puntajes = document.querySelectorAll("span");
const jugadorCartas = document.querySelector("#jugadorCartas");
const computadoraCartas = document.querySelector("#computadoraCartas");


let deck = [];
const figuras = ["C", "S", "D", "H"];
const especial = ["A", "J", "K", "Q"];

let puntajeJugador = 0,
    puntajeComputadora = 0;

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

/**
 * getCard: Obtener una carta del deck
 */
const getCard = () => deck.length === 0 ? console.error("No hay mas cartas en el deck") : deck.pop();


/**
 * valueCard: Obtiene el puntaje de las cartas
 */
const valueCard = (card) => isNaN(card.substring(0, card.length - 1)) == false ? card.substring(0, card.length - 1) * 1 : card.substring(0, card.length - 1) === "A" ? 11 : 10;

const crearCartaImg = (Nombrecarta, jugador) => {
    const cartaImg = document.createElement("img");
    cartaImg.src = `assets/cartas/${Nombrecarta}.png`;
    cartaImg.classList.add("carta");
    cartaImg.alt = "carta";
    jugador.append(cartaImg);
}

/**
 * Turno de la computadora
 */
const turnoComputadora = (puntosJugador) => {
    do {
        const carta = getCard();
        puntajeComputadora = puntajeComputadora + valueCard(carta);
        puntajes[1].innerText = puntajeComputadora;
        crearCartaImg(carta, computadoraCartas);

        if (puntajeJugador > 21) break

    } while (puntajeComputadora < puntosJugador && puntosJugador <= 21);

    if (puntajeComputadora === puntosJugador) {
        console.log("NADIE GANA");
    } else if (puntosJugador > 21) {
        console.log("Computadora gana");
    } else if (puntajeComputadora > 21) {
        console.log("JugadorGana");
    } else if (puntajeComputadora === 21 && puntosJugador != 21) {
        console.log("Computadora gana");
    }
}

/**
 * EVENTOS
 */
btnPedir.addEventListener("click", () => {
    const carta = getCard();
    puntajeJugador = puntajeJugador + valueCard(carta);
    puntajes[0].innerText = puntajeJugador;
    crearCartaImg(carta, jugadorCartas);

    if (puntajeJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntajeJugador);
    } else if (puntajeJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntajeJugador);
    }
});

btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    turnoComputadora(puntajeJugador);
    btnDetener.disabled = true
});

btnNuevoJuego.addEventListener("click", () => {
    if (deck.length != 52) {
        deck = [];
        deck = deckBuild();
        puntajeComputadora = 0;
        puntajes[1].innerText = 0;
        puntajeJugador = 0;
        puntajes[0].innerText = 0;
        jugadorCartas.innerHTML = '';
        computadoraCartas.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false
    }
});


