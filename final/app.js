


let ID_USUARIO = 1;

class Usuario {
    constructor(nombre, apellido, email, contrasenya) {
        this.id = ID_USUARIO++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenya = contrasenya;
    }

    /**
     * Metodo que verifica si los datos pasados por parametros son iguales al elemento con el que se lo compara
     * @param {*} email valor a comprar
     * @param {*} pass  valor a comparar
     * @returns el objeto si los valores coinciden
     */
    registrado(email, pass) {
        // if (this.email == email && this.contrasenya == pass) {
        //     return this;
        // }
        return this.email == email && this.contrasenya == pass ? this : false;
    }
}

/**
 * Array con usuarios registrados
 */
const usuariosRegistrados = [
    new Usuario("Administrador", "admin", "admin@admin.com", "admin"),
    new Usuario("Pablo Sebastian", "Campos", "pablo.c1791@gmail.com", "1234"),
];

const getDatos = async () => {
    const resp = await fetch("./api.json");
    return await resp.json();

    // console.log(dato)
}

const tienda = await getDatos();

// const iniciar = async () => {
//     try {
//         const resp = await fetch("./api.json");
//         const tienda = await resp.json();
//         console.log(tienda)

tienda.reverse();

/**
 * Funcion que valida si la imagen cargada es valida
 * @param {*} imagen a validar
 * @returns imagen validada
 */
function validarImagen(imagen) {
    // if (imagen.length == 0) {
    //     return "./img/card.webp"
    // }
    return imagen.length == 0 && "./img/card.webp";
}

/********************************************ULTIMAS PUBLICACIONES */
let ultimasPublicaciones = document.getElementById("ultimasPublicaciones");

/**
 * Funcion que crea un modelo de card ypara el vehiculo y carga los datos del objetos pasado
 * @param {*} vehiculo objeto que contiene los datos para completar datos de la card
 * @returns una modelo de card en sting
 */
function modelarCardUltimas(vehiculo) {
    return `<div class="">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${vehiculo.img}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title m-0">${vehiculo.marca} - ${vehiculo.modelo}</h5>
                <p class="card-text">
                    ${vehiculo.comentario};
                </p>
                <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                </p>
            </div>
        </div>
    </div>
</div>`;
}


/**
* Funcion que inserta el elemento card depues del ultimo hijo de su contenedor
* @param {*} vehiculo elemento a insertar
*/
function renderizarCardUltimas(vehiculo) {
    let card = document.createElement(`div`);
    card.classList.add(`card`, `col-12`, `col-lg-5`, `mb-3`, `card`);
    // card.classList.add(`row`,`g-0`);
    card.innerHTML = modelarCardUltimas(vehiculo);
    ultimasPublicaciones.appendChild(card);
}

/**
 * For que recorre el array tienda para cargar todos lo elementos del al iniciar app
 */
function cargarHtmlUltimas(array) {
    ultimasPublicaciones.innerHTML = "";
    array.slice(0, 4).forEach(element => {
        renderizarCardUltimas(element);
    });
}

cargarHtmlUltimas(tienda);
/*********************************************************************************** */

/**
 * Funcion que crea un modelo de card ypara el vehiculo y carga los datos del objetos pasado
 * @param {*} vehiculo objeto que contiene los datos para completar datos de la card
 * @returns una modelo de card en sting
 */
function modelarCard(vehiculo) {
    return `<div class="card">
                    <img src="${vehiculo.img}" alt="" class="img-fluid" />
                    <div class="card-header text-center px-0 w-100">
                        <h5 class="card-title m-0">${vehiculo.marca} - ${vehiculo.modelo}</h5>
                    </div>
                    <div class="card-body py-0">
                        <ul class="list-group list-group-flush list-group-horizontal row">
                            <li class="list-group-item col-6">${vehiculo.tipo}</li>
                            <li class="list-group-item col-6 text-end">${vehiculo.anio}</li>
                        </ul>
                        <ul class="list-group list-group-flush list-group-horizontal row">
                            <li class="list-group-item col-6">${vehiculo.kilometros} km</li>
                            <li class="list-group-item col-6 text-end">${vehiculo.carnet}</li>
                        </ul>
                    </div>
                    <div class="card-footer text-end">${vehiculo.precio}</div>
                    <button type="button" id=detalle-${vehiculo.id} class="btn btn-dark btn-detalle" data-bs-toggle="modal" data-bs-target="#staticBackdropDetalle${vehiculo.id}">Detalle
                    </button>
            </div>`;
}

/**
 * 
 */
function crearModalDetalle(encontrado) {
    const div = document.createElement(`div`);
    div.innerHTML = `<div class="modal fade" 
    id="staticBackdropDetalle${encontrado.id}" 
    data-bs-backdrop="static" 
    data-bs-keyboard="false" 
    tabindex="-1"
    aria-labelledby="staticBackdropLabel" 
    aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" class="btn-close closeDetalle" data-bs-dismiss="modal" aria-label="Close" id="cerrarDetalle${encontrado.id}"></button>
            </div>
            <div class="modal-body" id="modalDetalle-body">
            <main class="container">
            <header class="row d-flex">
                <div class="col-7">
                    <h1>${encontrado.marca}</h1>
                    <h3>${encontrado.modelo}</h3>
                </div>
                <div class="col-5 text-end">
                    <span>€${encontrado.precio}</span>
                    <button class="btn btn-success">Comprar</button>
                </div>
            </header>
            <div class="">
                <img class="d-block w-100 mb-4" alt="..." src=${encontrado.img}>
            </div>
            <div class="row d-flex">
                <div class="col-12 col-md-7">
                    <h3>Comentarios del anunciante</h3>
                    <p>${encontrado.comentario}</p>
                </div>
                <div class="col-12 col-md-5">
                    <ul class="list-detalleProd">
                        <li id="estiloDetalle">${encontrado.tipo}</li>
                        <span>Estilo</span>
                        <li class="">${encontrado.anio}</li>
                        <span>Año</span>
                        <li class="">${encontrado.cilindrada}</li>
                        <span>Cilindrada</span>
                        <li class="">${encontrado.carnet}</li>
                        <span>Carnet</span>
                        <li class="">${encontrado.kilometros}</li>
                        <span>Kilometos recorridos</span>
                    </ul>
                </div>
            </div>

            <div class="row d-flex mb-3">
                <h3>Calcla tu finaciacion</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, expedita?</p>
                <form action="" class="col-12 col-md-6">
                    <div class="input-group mb-2">
                        <input type="number" class="form-control" value="1000" min="1000" step="100"
                            aria-label="Dollar amount (with dot and two decimal places)">
                        <span class="input-group-text">.00</span>
                        <span class="input-group-text">€</span>
                    </div>
                    <select class="form-select mb-2" aria-label="Default select example">
                        <option value="1">12</option>
                        <option value="2">24</option>
                        <option value="3">36</option>
                        <option value="4">48</option>
                        <option selected value="5">60</option>
                    </select>
                </form>
                <div class="col-12 col-md-6">
                    Comenza a pagar tu moto en 60 cuotas de 1000€
                </div>
            </div>
        </main>
            </div>
        </div>
    </div>
</div>`
    document.getElementById(`modales`).append(div);
}

let contenedorCards = document.getElementById("contenedor-cards");

/**
* Funcion que inserta el elemento card depues del ultimo hijo de su contenedor
* @param {*} vehiculo elemento a insertar
*/
function renderizarCard(vehiculo) {
    let card = document.createElement(`div`);
    card.classList.add(`col-12`, `col-md-6`, `col-lg-4`, `p-4`);
    card.innerHTML = modelarCard(vehiculo);
    contenedorCards.appendChild(card);
    crearModalDetalle(vehiculo);
}

/**
 * Funcion que inserta el elemento card anted del primer hijo de su contenedor
 * @param {*} vehiculo elemento a insertar
 */
function renderizarCardAlInicio(vehiculo) {
    let card = document.createElement(`div`);
    card.classList.add(`col-12`, `col-md-6`, `col-lg-4`);
    card.innerHTML = modelarCard(vehiculo);
    contenedorCards.insertAdjacentElement("afterbegin", card);
    crearModalDetalle(vehiculo);
}

/**
 * For que recorre el array tienda para cargar todos lo elementos del al iniciar app
 */
function cargarHtml(array) {
    contenedorCards.innerHTML = "";
    array.forEach(element => {
        renderizarCard(element);
    });
}

cargarHtml(tienda);


const listaMarcas = ["YAMAHA", "HONDA", "KAWASAKY", "BMW", "DUCATI", "TRIUMF"];
const listaTipoMoto = ["NAKED", "TRAIL", "ENDURO", "PISTA", "TOURING", "CUSTOM"];
const listAnios = [];
const ANIO_MIN = 1980, ANIO_MAXIMO = new Date().getFullYear();
for (let i = ANIO_MIN; i <= ANIO_MAXIMO; i++) {
    listAnios.push(i);
}


/********************************** CARGA DE DATOS INICIAL HTML *******************************/

/**
 * Funcion que carga las opciones de los select
 * @param {*} array listado con las opciones a cargar
 * @param {*} nodoPadre contenedor de las opciones
 */
function cargaSelect(array, nodoPadre) {
    array.forEach(element => {
        let option = document.createElement("option");
        option.value = option.textContent = element;
        nodoPadre.appendChild(option);
    });
}


const selectMarca = document.getElementById("selectFiltroMarca");
cargaSelect(listaMarcas, selectMarca);

const selectAnioDesde = document.getElementById("anio-desde");
cargaSelect(listAnios, selectAnioDesde);

const selectAnioHasta = document.getElementById("anio-hasta");
cargaSelect(listAnios, selectAnioHasta);
selectAnioHasta.lastElementChild.setAttribute(`selected`, "");

let anioDesdeSeleccionado;
selectAnioDesde.addEventListener(`change`, e => {
    anioDesdeSeleccionado = e.target.value;
    selectAnioHasta.innerHTML = "";
    cargaSelect(listAnios.filter(x => x > anioDesdeSeleccionado), selectAnioHasta);
    selectAnioHasta.lastElementChild.setAttribute(`selected`, "");
})


const inputPrecioDesde = document.getElementById('inputPrecioDesde');
const labelPrecioDesde = document.getElementById('labelPrecioDesde')
inputPrecioDesde.addEventListener('input', () => {
    labelPrecioDesde.textContent = inputPrecioDesde.value;
})
const inputPrecioHasta = document.getElementById('inputPrecioHasta');
const labelPrecioHasta = document.getElementById('labelPrecioHasta')
inputPrecioHasta.addEventListener('input', () => {
    labelPrecioHasta.textContent = inputPrecioHasta.value;
})

/********************************** ACCIONES PARA FILTROS *******************************/

const objetoSeleccionesFiltro = {
    marca: "",
    modelo: "",
    anioMin: "",
    anioMax: "",
    precioMin: "",
    precioMax: ""
}

/**
 * funcion que compara el objetoSeleccionesFiltro con el objto pasado por marca
 * @param {*} producto objeto a comparar 
 * @returns si clave marca contiene algo (true):
 * retorna true si la comparacion es igual o false si no es igual.
 * si clave marca No contiene nada, esta vacia (false):
 * retorna el objeto pasada por parametro nuevamanete.
 */
function filtrarMarca(producto) {
    const { marca } = objetoSeleccionesFiltro; // destructurin de objeto
    return marca ? marca == producto.marca : producto;
}

selectMarca.addEventListener('change', e => {
    objetoSeleccionesFiltro.marca = e.target.value;
    filtrar();
})

/**
 * funcion que compara el objetoSeleccionesFiltro con otro objeto por año minimo
 * @param {*} producto objeto a comparar 
 * @returns si el objetoSeleccionesFiltro en su clave anioMin contiene algo:
 * retorna true si anioMin es menor o igual al anio del producto pasado por param, de lo contrario false.
 * si el objetoSeleccionesFiltro en su clave anioMin No contiene algo:
 * retorna el objeto pasado por parametro nuevamente.
 */
function filtrarAnioMin(producto) {
    const { anioMin } = objetoSeleccionesFiltro;
    if (anioMin) {
        return anioMin <= producto.anio;
    } else {
        return producto;
    }
}

selectAnioDesde.addEventListener(`change`, e => {
    objetoSeleccionesFiltro.anioMin = parseInt(e.target.value);
    filtrar();
})

/**
 * funcion que compara el objetoSeleccionesFiltro con otro objeto por año maximo
 * @param {*} producto objeto a comparar 
 * @returns si el objetoSeleccionesFiltro en su clave anioMax contiene algo:
 * retorna true si anioMax es mayor o igual al anio del producto pasado por param, de lo contrario false.
 * si el objetoSeleccionesFiltro en su clave anioMax No contiene algo:
 * retorna el objeto pasado por parametro nuevamente.
 */
function filtrarAnioMax(producto) {
    const { anioMax } = objetoSeleccionesFiltro;
    if (anioMax) {
        return anioMax >= producto.anio;
    } else {
        return producto;
    }
}

selectAnioHasta.addEventListener(`change`, e => {
    objetoSeleccionesFiltro.anioMax = parseInt(e.target.value);
    filtrar();
})

/**
 * funcion que compara el objetoSeleccionesFiltro con otro objeto por precio minimo
 * @param {*} producto objeto a comparar 
 * @returns si el objetoSeleccionesFiltro en su clave precioMin contiene algo:
 * retorna true si precioMin es mayor o igual al precio del producto pasado por param, de lo contrario false.
 * si el objetoSeleccionesFiltro en su clave precioMin No contiene algo:
 * retorna el objeto pasado por parametro nuevamente.
 */
function filtrarPrecioMin(producto) {
    const { precioMin } = objetoSeleccionesFiltro;
    if (precioMin) {
        return precioMin <= producto.precio;
    } else {
        return producto;
    }
}

inputPrecioDesde.addEventListener("change", e => {
    // e.preventDefault();
    objetoSeleccionesFiltro.precioMin = e.target.value;
    filtrar();
})


/**
 * funcion que compara el objetoSeleccionesFiltro con otro objeto por precio maximo
 * @param {*} producto objeto a comparar 
 * @returns si el objetoSeleccionesFiltro en su clave precioMax contiene algo:
 * retorna true si precioMax es mayor o igual al precio del producto pasado por param, de lo contrario false.
 * si el objetoSeleccionesFiltro en su clave precioMax No contiene algo:
 * retorna el objeto pasado por parametro nuevamente.
 */
function filtrarPrecioMax(producto) {
    const { precioMax } = objetoSeleccionesFiltro;
    if (precioMax) {
        return precioMax >= producto.precio;
    } else {
        return producto;
    }
}

inputPrecioHasta.addEventListener("change", e => {
    // e.preventDefault();
    objetoSeleccionesFiltro.precioMax = e.target.value;
    filtrar();
})

let listaFiltrads = [];
/**
 * Funcion que realiza carga en el html de acuerdo a los filtros parametros de filtros cargados por el usuario.
 */
function filtrar() {
    listaFiltrads = tienda.filter(filtrarMarca).filter(filtrarAnioMin).filter(filtrarAnioMax).filter(filtrarPrecioMin).filter(filtrarPrecioMax)
    cargarHtml(listaFiltrads);
}

const formFiltro = document.getElementById(`borrarFiltro`);
formFiltro.addEventListener(`click`, (e) => {
    e.preventDefault();
    document.getElementById(`form-filtro`).reset();
    cargarHtml(tienda);
});


/********************************** ACCIONES INICIAR SESION *******************************/
let sesionIniciada = false;
const recordarSesion = document.getElementById(`checkSesion`);
const btnEntrar = document.getElementById(`botonEntrar`);
const btnRegistrarse = document.getElementById(`botonRegistrarse`);
const btnPublicar = document.getElementById(`botonPublicar`);
const btnCerrarSesion = document.getElementById(`cerrarSesion`);
const formularioSesion = document.getElementById(`formSesion`);
const cuenta = document.getElementById(`botonMiCuenta`);

console.log(btnCerrarSesion.parentElement);


/**
 * Funcion que oculta o mustra botones del nav dependiendo del estado de la sesion, iniciada o no iniciada
 */
function gestionarBotonesCuenta() {
    if (sesionIniciada) {
        btnEntrar.parentElement.classList.remove("mostrar");
        btnEntrar.parentElement.classList.add("ocultar");

        btnRegistrarse.classList.remove("mostrar");
        btnRegistrarse.classList.add("ocultar");

        btnPublicar.parentElement.classList.remove("ocultar");
        btnPublicar.parentElement.classList.add("mostrar");

        btnCerrarSesion.parentElement.classList.remove("ocultar");
        btnCerrarSesion.parentElement.classList.add("mostrar");

    } else {
        btnEntrar.parentElement.classList.remove("ocultar");
        btnEntrar.parentElement.classList.add("mostrar");

        btnRegistrarse.parentElement.classList.remove("ocultar");
        btnRegistrarse.parentElement.classList.add("mostrar");

        btnPublicar.parentElement.classList.remove("mostrar");
        btnPublicar.parentElement.classList.add("ocultar");

        btnCerrarSesion.parentElement.classList.remove("mostrar");
        btnCerrarSesion.parentElement.classList.add("ocultar");
    }
}

btnCerrarSesion.addEventListener(`click`, (e) => {
    e.preventDefault()
    console.log("cerrando sesion")
    sesionIniciada = false;
    cuenta.textContent = `Mi cuenta`;
    gestionarBotonesCuenta();
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Adios!`,
        showConfirmButton: false,
        timer: 2100,
    })
});

function cargaDatosStorageSesion(keyUser, keyPss, form) {
    const usuario = localStorage.getItem(keyUser) || false;
    const pass = sessionStorage.getItem(keyPss) || false;

    if (usuario) {
        form.email.value = usuario;
        form.password.value = pass;
        form.recordar.setAttribute(`checked`, ``);
    } else {
        form.recordar.removeAttribute(`checked`);
    }
}

cuenta.addEventListener('click', e => {
    e.preventDefault();
    cargaDatosStorageSesion("usuario", "pass", document.forms[`formSesion`]);
})


formularioSesion.addEventListener("submit", e => {
    e.preventDefault();
    let formulario = document.forms[`formSesion`];
    let user, pass;
    user = formulario.email.value;
    pass = formulario.password.value;

    let existe = usuariosRegistrados.find(usuario => usuario.registrado(user, pass));

    let spanError = document.getElementById(`credencialesIncorrectas`);
    if (existe != undefined) {

        if (formulario.recordar.checked) {
            localStorage.setItem("usuario", user);
            sessionStorage.setItem("pass", pass);
        } else {
            localStorage.removeItem("usuario");
            sessionStorage.removeItem("pass");
        }
        spanError.textContent = ``;
        cuenta.textContent = `${existe.nombre} ${existe.apellido}`
        sesionIniciada = true;
        formularioSesion.reset();
        gestionarBotonesCuenta();
        document.getElementById(`cerrarVentanaSesion`).click();
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido!\n${existe.nombre}`,
            showConfirmButton: false,
            timer: 1700,
        })
    } else {
        spanError.textContent = `Usuario o contraseña incorrecto.`
        spanError.style.color = "red";
        sesionIniciada = false;
    }
});


/********************************** ACCIONES PARA PUBLICAR *******************************/

const selectMarcaPublicar = document.getElementById("inputSelectMarca");
const selectTipoPublicar = document.getElementById("inputSelectEstilo");
const selectAnioPublicar = document.getElementById("inputSelectAnio");

cargaSelect(listaMarcas, selectMarcaPublicar);
cargaSelect(listaTipoMoto, selectTipoPublicar);
cargaSelect(listAnios, selectAnioPublicar);


const formularioPublicar = document.getElementById(`formPublicar`);
let nuevoVehiculo;
let formulario = document.forms[`formPublicar`];
formularioPublicar.addEventListener(`change`, e => {
    e.preventDefault();
    nuevoVehiculo = new Vehiculo(
        formulario.marca.value,
        formulario.modelo.value,
        formulario.tipo.value,
        formulario.cilindrada.value,
        formulario.anio.value,
        formulario.kilometros.value,
        formulario.carnet.value,
        formulario.descripcion.value,
        formulario.precio.value,
    );
    const nuevoProdJSON = JSON.stringify(nuevoVehiculo);
    localStorage.setItem("publicacionPendiente", nuevoProdJSON);
})

btnPublicar.addEventListener('click', e => {
    e.preventDefault();
    let productoStorage = JSON.parse(localStorage.getItem("publicacionPendiente"));
    if (productoStorage) {
        Swal.fire({
            title: 'Tienes una publicacion incompleta!',
            text: `Desesas continuar?`,
            showDenyButton: true,
            allowOutsideClick: false,
            confirmButtonText: 'Continuar',
            denyButtonText: `Eliminar`,
        }).then((result) => {
            console.log(result)
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                formulario.marca.value = productoStorage.marca;
                formulario.modelo.value = productoStorage.modelo;
                formulario.tipo.value = productoStorage.tipo;
                formulario.cilindrada.value = productoStorage.cilindrada;
                formulario.anio.value = productoStorage.anio;
                formulario.kilometros.value = productoStorage.kilometros;
                formulario.carnet.value = productoStorage.carnet;
                formulario.descripcion.value = productoStorage.comentario;
                formulario.precio.value = productoStorage.precio;
            } else if (result.isDenied) {
                localStorage.removeItem("publicacionPendiente");
                formulario.reset();
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Carga pendiente eliminada!`,
                    showConfirmButton: false,
                    timer: 1700,
                })
            }
        })
    }
})

formularioPublicar.addEventListener(`submit`, e => {
    e.preventDefault();
    nuevoVehiculo = new Vehiculo(
        formulario.marca.value,
        formulario.modelo.value,
        formulario.tipo.value,
        formulario.cilindrada.value,
        formulario.anio.value,
        formulario.kilometros.value,
        formulario.carnet.value,
        formulario.descripcion.value,
        formulario.precio.value,
    );
    tienda.unshift(nuevoVehiculo);
    renderizarCardAlInicio(nuevoVehiculo);
    cargarHtmlUltimas(tienda);
    formularioPublicar.reset();
    document.getElementById("publicarVehiculo").click();
    localStorage.removeItem("publicacionPendiente");
});

/********************************** ACCIONES VER DETALLE *******************************/
const botones = document.getElementsByClassName('closeDetalle');

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", e => {
        e.preventDefault();
        document.getElementById(`publicarVehiculo`).click();
    })
};

const btnMicrofonoActivo = document.getElementById("activado");
const btnMicrofonoNoActivo = document.getElementById("desactivado");
const span = document.getElementById(`spanEscuchando`);

btnMicrofonoNoActivo.addEventListener(`click`, (e) => {
    e.preventDefault();
    escuchar(true);

})

function escuchar(estado) {
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    if (estado) {
        recognition.start();
        recognition.onstart = function () {
            span.textContent = "Escuchando...";
            btnMicrofonoActivo.classList.remove(`d-none`);
            btnMicrofonoActivo.style.color = `red`;
            btnMicrofonoNoActivo.classList.add(`d-none`);
        }

        recognition.onspeechend = function () {
            btnMicrofonoActivo.classList.add(`d-none`);
            btnMicrofonoNoActivo.classList.remove(`d-none`);
            span.textContent = "Dictado por voz";
            recognition.stop();
        }
        recognition.onresult = function (e) {
            console.log(e.result)
            formulario.descripcion = e.result;
        }
    }
}
//     } catch (error) {
//         console.log(error);
//     }
// }

// iniciar()


let ID_VEHICULO = 12;

class Vehiculo {
    constructor(marca, modelo, tipo, cilindrada, anio, kilometros, carnet, comentario, precio, img = "./img/card.webp") {
        this.id = ID_VEHICULO++;
        this.marca = marca;
        this.modelo = modelo;
        this.tipo = tipo;
        this.cilindrada = cilindrada;
        this.anio = anio;
        this.kilometros = kilometros;
        this.carnet = carnet;
        this.comentario = comentario;
        this.precio = precio;
        this.img = img;
    };
}


// /**
//  * array de elementos tipo vehiculo
//  */
// let tienda = [
//     new Vehiculo("YAMAHA", "MT 125", "Naked", 125, 2015, 3500, "A", "comentarios del vendedor", 5000, "./img/motos/mt125-blue.jpg"),
//     new Vehiculo("YAMAHA", "MT 7", "Naked", 700, 2016, 18000, "A", "comentarios del vendedor", 5300, "./img/motos/mt7-storm.jpg"),
//     new Vehiculo("YAMAHA", "MT 9", "Naked", 900, 2019, 7500, "A", "comentarios del vendedor", 13000, "./img/motos/mt9-blue.jpg"),
//     new Vehiculo("YAMAHA", "MT 10", "Naked", 1000, 2022, 12500, "A", "comentarios del vendedor", 1500, "./img/motos/mt-10.jpg"),
//     new Vehiculo("HONDA", "Africa twing", "Trail", 1000, 2017, 9000, "A", "comentarios del vendedor", 30000, "./img/motos/africaTwin.jpg"),
//     new Vehiculo("HONDA", "Africa twing", "Trail", 200, 2018, 4500, "A", "comentarios del vendedor", 9500, "./img/motos/africaTwin200.jpg"),
//     new Vehiculo("HONDA", "CB500F", "Naked", 500, 2016, 7300, "A", "comentarios del vendedor", 4300, "./img/motos/CB500F.jpg"),
//     new Vehiculo("HONDA", "CB500R", "Naked", 500, 2019, 7500, "A", "comentarios del vendedor", 19000, "./img/motos/CB500R.jpg"),
//     new Vehiculo("HONDA", "CB500X", "Trail", 500, 2020, 5600, "A", "comentarios del vendedor", 11500, "./img/motos/CB500X.jpg"),
//     new Vehiculo("KAWASAKY", "Versys 650", "Trail", 600, 2021, 7000, "A", "comentarios del vendedor", 15500, "./img/motos/versys650.png"),
//     new Vehiculo("KAWASAKY", "Ninja 1000", "Racing", 1000, 2007, 6900, "A", "comentarios del vendedor", 26500, "./img/motos/ninja1000.jpg"),
//     new Vehiculo("BMW", "R 1250 GS", "TraiL", 1250, 2014, 5600, "A", "comentarios del vendedor", 5500, "./img/motos/BMW-R-1250-GS.jpg"),
// ];


