/* =========================================================
   INVITACIÓN DE BODA - SANTOS & GLADYS
========================================================= */


/* =========================================================
   1. ELEMENTOS PRINCIPALES
========================================================= */

const pantallas = [...document.querySelectorAll('.pantalla')];

const barra = document.getElementById('barra');
const indicador = document.getElementById('indicador');

const audio = document.getElementById('audio');
const musica = document.getElementById('musica');

const sobre = document.getElementById('sobre');

let paso = 0;
let bloqueo = false;


/* =========================================================
   2. CAMBIAR ENTRE PANTALLAS
========================================================= */

function mostrar(n) {

    if (
        bloqueo ||
        n < 0 ||
        n >= pantallas.length ||
        n === paso
    ) {
        return;
    }

    bloqueo = true;

    const viejo = pantallas[paso];

    const direccion =
        n > paso
            ? 'saliendo-izq'
            : 'saliendo-der';


    /* Salir de la pantalla actual */

    viejo.classList.add(direccion);
    viejo.classList.remove('activa');

    paso = n;


    /* Mostrar nueva pantalla */

    setTimeout(() => {

        pantallas[paso].classList.add('activa');

        viejo.classList.remove(direccion);


        /* Barra de progreso */

        barra.style.width =
            (paso / (pantallas.length - 1) * 100) + '%';


        /* Número de pantalla */

        indicador.textContent =
            String(paso + 1).padStart(2, '0')
            + ' / ' +
            String(pantallas.length).padStart(2, '0');


        bloqueo = false;

    }, 380);
}


/* =========================================================
   3. BOTONES SIGUIENTE
========================================================= */

document
    .querySelectorAll('.siguiente')
    .forEach(boton => {

        boton.addEventListener('click', () => {

            mostrar(paso + 1);

        });

    });


/* =========================================================
   4. BOTONES ANTERIOR
========================================================= */

document
    .querySelectorAll('.anterior')
    .forEach(boton => {

        boton.addEventListener('click', () => {

            mostrar(paso - 1);

        });

    });


/* =========================================================
   5. MÚSICA AUTOMÁTICA
========================================================= */

audio.volume = 0.7;


/* Actualizar botón de música */

function musicaEncendida() {

    musica.classList.add('on');

    musica.innerHTML = '<span>♫</span>';
}


function musicaApagada() {

    musica.classList.remove('on');

    musica.innerHTML = '<span>♪</span>';
}


/* Intentar reproducir apenas entre a la página */

function reproducirMusica() {

    if (!audio.paused) {

        musicaEncendida();

        return;
    }

    audio.play()
        .then(() => {

            musicaEncendida();

        })
        .catch(() => {

            /*
            Algunos navegadores bloquean
            la música automática hasta
            que el visitante toque la página.
            */

        });

}


window.addEventListener('load', () => {

    reproducirMusica();

});


/* =========================================================
   6. PRIMER TOQUE = ACTIVAR MÚSICA
========================================================= */

function activarMusicaPrimerToque() {

    reproducirMusica();

    document.removeEventListener(
        'click',
        activarMusicaPrimerToque
    );

    document.removeEventListener(
        'touchstart',
        activarMusicaPrimerToque
    );

}


document.addEventListener(
    'click',
    activarMusicaPrimerToque
);


document.addEventListener(
    'touchstart',
    activarMusicaPrimerToque,
    { passive: true }
);


/* =========================================================
   7. ABRIR SOBRE
========================================================= */

sobre.addEventListener('click', () => {

    if (sobre.classList.contains('abierto')) {
        return;
    }


    /* Abrir sobre */

    sobre.classList.add('abierto');


    /* Asegurar que la música esté sonando */

    reproducirMusica();


    /* Pasar a la siguiente pantalla */

    setTimeout(() => {

        mostrar(1);

    }, 1650);

});


/* =========================================================
   8. BOTÓN ENCENDER / APAGAR MÚSICA
========================================================= */

musica.addEventListener('click', (e) => {

    /*
    Evita conflictos con el evento
    general del primer clic.
    */

    e.stopPropagation();


    if (audio.paused) {

        audio.play()
            .then(() => {

                musicaEncendida();

            })
            .catch(() => {});

    } else {

        audio.pause();

        musicaApagada();

    }

});


/* =========================================================
   9. REINICIAR INVITACIÓN
========================================================= */

const reiniciar = document.getElementById('reiniciar');

if (reiniciar) {

    reiniciar.addEventListener('click', () => {

        sobre.classList.remove('abierto');

        mostrar(0);

    });

}


/* =========================================================
   10. CUENTA REGRESIVA
   21 DE NOVIEMBRE DE 2026 - 14:00
========================================================= */

const boda =
    new Date('2026-11-21T14:00:00').getTime();


function actualizarContador() {

    const diferencia =
        Math.max(0, boda - Date.now());


    const dias =
        Math.floor(
            diferencia / 86400000
        );


    const horas =
        Math.floor(
            (diferencia % 86400000) / 3600000
        );


    const minutos =
        Math.floor(
            (diferencia % 3600000) / 60000
        );


    const segundos =
        Math.floor(
            (diferencia % 60000) / 1000
        );


    document.getElementById('dias').textContent =
        String(dias).padStart(2, '0');


    document.getElementById('horas').textContent =
        String(horas).padStart(2, '0');


    document.getElementById('minutos').textContent =
        String(minutos).padStart(2, '0');


    document.getElementById('segundos').textContent =
        String(segundos).padStart(2, '0');

}


actualizarContador();

setInterval(
    actualizarContador,
    1000
);


/* =========================================================
   11. PÉTALOS ANIMADOS
========================================================= */

function crearPetalo() {

    if (document.hidden) {
        return;
    }


    const petalo =
        document.createElement('i');


    petalo.className = 'petalo';


    /* Posición */

    petalo.style.left =
        Math.random() * 100 + 'vw';


    /* Velocidad */

    petalo.style.animationDuration =
        (7 + Math.random() * 7) + 's';


    /* Transparencia */

    petalo.style.opacity =
        0.2 + Math.random() * 0.55;


    /* Tamaño */

    petalo.style.transform =
        'scale(' +
        (0.65 + Math.random() * 0.8) +
        ')';


    document
        .getElementById('petalos')
        .appendChild(petalo);


    /* Eliminar pétalo */

    setTimeout(() => {

        petalo.remove();

    }, 14500);

}


setInterval(
    crearPetalo,
    650
);


/* =========================================================
   12. NAVEGACIÓN CON TECLADO
========================================================= */

document.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowRight') {

        mostrar(paso + 1);

    }


    if (e.key === 'ArrowLeft') {

        mostrar(paso - 1);

    }

});


/* =========================================================
   13. DESLIZAR CON EL DEDO EN CELULAR
========================================================= */

let inicioX = 0;


document.addEventListener(
    'touchstart',
    (e) => {

        inicioX =
            e.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    'touchend',
    (e) => {

        const finalX =
            e.changedTouches[0].screenX;


        const diferencia =
            finalX - inicioX;


        if (Math.abs(diferencia) > 80) {

            if (diferencia < 0) {

                mostrar(paso + 1);

            } else {

                mostrar(paso - 1);

            }

        }

    },
    { passive: true }
);