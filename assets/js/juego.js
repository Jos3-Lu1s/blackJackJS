// C = TREBOL S = SWORD D = DIAMONDS H = HEARTS

//Funcion anonima auto invocada
const moduloBlackJack = (() => {
    'use strict'

    /**
     * DOM referencias
     */
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevoJuego = document.querySelector("#btnNuevo"),
        puntajes = document.querySelectorAll("span"),
        divCartasJugador = document.querySelectorAll(".divCartas");

    let deck = [];
    const figuras = ["C", "S", "D", "H"], especial = ["A", "J", "K", "Q"];
    // let puntajeJugador = 0, puntajeComputadora = 0;
    let puntajeJugadores = [];

    /**
     * Comenzar juego
     */
    const inicializarJuego = (nJugadores = 1) => {
        deck = deckBuild();
        puntajeJugadores = [];
        for (let i = 0; i <= nJugadores; i++) {
            puntajeJugadores.push(0);
        }
        puntajes.forEach(puntaje => puntaje.innerText = 0);
        divCartasJugador.forEach(cartas => cartas.innerHTML = "");
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        console.log({ puntajeJugadores });
    }

    /**
     * deckBuild: crea el deck de cartas en orden aleatorio
     */
    const deckBuild = () => {
        deck = [];
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
        return _.shuffle(deck);
    }

    /**
     * getCard: Obtener una carta del deck
     */
    const getCard = () => deck.length === 0 ? console.error("No hay mas cartas en el deck") : deck.pop();


    /**
     * valueCard: Obtiene el puntaje de las cartas
     */
    const valueCard = (card) => isNaN(card.substring(0, card.length - 1)) == false ? card.substring(0, card.length - 1) * 1 : card.substring(0, card.length - 1) === "A" ? 11 : 10;

    const crearCartaImg = (Nombrecarta, turno) => {
        const cartaImg = document.createElement("img");
        cartaImg.src = `assets/cartas/${Nombrecarta}.png`;
        cartaImg.classList.add("carta");
        cartaImg.alt = "carta";
        divCartasJugador[turno].append(cartaImg);
    }

    /**
     * turnoJugador: 0 = primer jugador y el ultimo = pc
     */
    const acumularPuntos = (turnoJugador, carta) => {
        puntajeJugadores[turnoJugador] = puntajeJugadores[turnoJugador] + valueCard(carta);
        puntajes[turnoJugador].innerText = puntajeJugadores[turnoJugador];
        return puntajeJugadores[turnoJugador];
    }

    const determinarGanador = (puntajeJugador, puntajeComputadora) => {
        if (puntajeComputadora === puntajeJugador) {
            console.log("NADIE GANA");
        } else if (puntajeJugador > 21) {
            console.log("Computadora gana");
        } else if (puntajeComputadora > 21) {
            console.log("JugadorGana");
        } else if (puntajeComputadora === 21 && puntajeJugador != 21) {
            console.log("Computadora gana");
        }
    }

    /**
     * Turno de la computadora
     */
    const turnoComputadora = (puntosJugador) => {
        let puntajeComputadora = 0;
        do {
            const carta = getCard();
            // puntajeComputadora = puntajeComputadora + valueCard(carta);
            // puntajes[1].innerText = puntajeComputadora;
            puntajeComputadora = acumularPuntos(puntajeJugadores.length - 1, carta);
            crearCartaImg(carta, puntajeJugadores.length - 1);

        } while (puntajeComputadora < puntosJugador && puntosJugador <= 21);

        determinarGanador(puntosJugador, puntajeJugadores[puntajeJugadores.length - 1]);
    }

    /**
     * EVENTOS
     */
    btnPedir.addEventListener("click", () => {
        const carta = getCard();
        const puntajeJugador = acumularPuntos(0, carta);
        // puntajeJugador = puntajeJugador + valueCard(carta);
        // puntajes[0].innerText = puntajeJugador;
        crearCartaImg(carta, 0);

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
        turnoComputadora(puntajeJugadores[0]);
        // determinarGanador(puntajeJugadores[0], puntajeJugadores[puntajeJugadores.length - 1]);
        btnDetener.disabled = true
    });

    btnNuevoJuego.addEventListener("click", () => {
        if (deck.length != 52) {
            inicializarJuego();
        }
    });
    return {
        nuevoJuego : inicializarJuego
    };
})();
