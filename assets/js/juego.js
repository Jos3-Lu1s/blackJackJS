// C = TREBOL S = SWORD D = DIAMONDS H = HEARTS

//Funcion anonima auto invocada
const moduloBlackJack = (() => {
    'use strict';

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

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const showMsj = (toast, icon, iconcolor, title, textcolor, bgcolor) => {
        toast.fire({
            icon: icon,
            iconColor: iconcolor,
            title: title,
            color: textcolor,
            background: bgcolor,
        })
    }

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
    const getCard = () => deck.length === 0 ? showMsj(Toast, "error", "white", "NO HAY MAS CARTAS EN EL DECK","white","#f27474") : deck.pop();


    /**
     * valueCard: Obtiene el puntaje de las cartas
     */
    const valueCard = (card) => isNaN(card.substring(0, card.length - 1)) == false ? card.substring(0, card.length - 1) * 1 : card.substring(0, card.length - 1) === "A" ? 11 : 10;

    const crearCartaImg = (Nombrecarta, turno) => {
        const cartaImg = document.createElement("img");
        cartaImg.src = `assets/cartas/${Nombrecarta}.png`;
        cartaImg.classList.add("carta", "p-0", "animate__animated", "animate__flipInY", "animate__faster");
        cartaImg.alt = "carta";
        divCartasJugador[turno].append(cartaImg);
        cartaImg.addEventListener("animationend", () => {
            cartaImg.classList.remove("animate__animated", "animate__flipInY", "animate__faster");
        });
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
            showMsj(Toast, "warning", "white", "NADIE GANA","white","#f8bb86");
        } else if (puntajeJugador > 21) {
            showMsj(Toast, "info", "white", "COMPUTADORA GANA","white","#3fc3ee");
        } else if (puntajeComputadora > 21) {
            showMsj(Toast, "success", "white", "JUGADOR GANA","white","#a5dc86");
        } else if (puntajeComputadora === 21 && puntajeJugador != 21) {
            showMsj(Toast, "info", "white", "COMPUTADORA GANA","white","#3fc3ee");
        } else if (puntajeComputadora > puntajeJugador && puntajeComputadora < 21) {
            showMsj(Toast, "info", "white", "COMPUTADORA GANA","white","#3fc3ee");
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
        nuevoJuego: inicializarJuego
    };
})();
