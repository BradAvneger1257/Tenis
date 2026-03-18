/* ================================
ESTADO GLOBAL
================================ */

const state = {
marca: "todos",
texto: "",
precio: "todos",
orden: "default"
};

const cards = Array.from(document.querySelectorAll(".card"));
const contenedor = document.querySelector(".contenedor");


/* ================================
APLICAR FILTROS COMBINADOS
================================ */

function aplicarFiltros(){

let visibles = cards.filter(card => {

const marca = card.dataset.marca;
const nombre = card.querySelector("h2").textContent.toLowerCase();
const precio = parseInt(card.querySelector(".precio").dataset.precio);

/* FILTRO MARCA */

if(state.marca !== "todos" && marca !== state.marca){
return false;
}

/* BUSCADOR */

if(!nombre.includes(state.texto)){
return false;
}

/* FILTRO PRECIO */

if(state.precio !== "todos"){

if(state.precio === "0-2000" && precio >= 2000) return false;
if(state.precio === "2000-2500" && (precio < 2000 || precio > 2500)) return false;
if(state.precio === "2500-3000" && (precio < 2500 || precio > 3000)) return false;
if(state.precio === "3000+" && precio <= 3000) return false;

}

return true;

});

/* ORDENAMIENTO */

if(state.orden === "precio-asc"){
visibles.sort((a,b)=>getPrecio(a)-getPrecio(b));
}

if(state.orden === "precio-desc"){
visibles.sort((a,b)=>getPrecio(b)-getPrecio(a));
}

/* RENDER */

cards.forEach(card => card.style.display = "none");

visibles.forEach(card => {
card.style.display = "block";
contenedor.appendChild(card);
});

/* CONTADOR + MENSAJE */

actualizarContador(visibles.length);
mostrarSinResultados(visibles.length);

}


/* ================================
HELPERS
================================ */

function getPrecio(card){
return parseInt(card.querySelector(".precio").dataset.precio);
}

function actualizarContador(cantidad){
const contador = document.getElementById("contador-productos");
if(contador){
contador.textContent = "Mostrando " + cantidad + " productos";
}
}

function mostrarSinResultados(cantidad){
const msg = document.getElementById("sin-resultados");
if(!msg) return;

msg.style.display = cantidad === 0 ? "block" : "none";
}


/* ================================
EVENTOS
================================ */

/* MARCA */

document.querySelectorAll(".filtro-btn").forEach(btn=>{
btn.addEventListener("click",()=>{

document.querySelectorAll(".filtro-btn")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

state.marca = btn.dataset.marca;

aplicarFiltros();

});
});


/* BUSCADOR */

const buscador = document.getElementById("buscador");

if(buscador){
buscador.addEventListener("keyup",()=>{
state.texto = buscador.value.toLowerCase();
aplicarFiltros();
});
}


/* PRECIO */

const filtroPrecio = document.getElementById("filtro-precio");

if(filtroPrecio){
filtroPrecio.addEventListener("change",()=>{
state.precio = filtroPrecio.value;
aplicarFiltros();
});
}


/* ORDEN */

const ordenar = document.getElementById("ordenar");

if(ordenar){
ordenar.addEventListener("change",()=>{
state.orden = ordenar.value;
aplicarFiltros();
});
}


/* ================================
FILTRO DESDE URL
================================ */

const marcaURL = window.location.hash.replace("#","");

if(marcaURL){
state.marca = marcaURL;

const btn = document.querySelector(`[data-marca="${marcaURL}"]`);
if(btn){
btn.classList.add("active");
}

}


/* ================================
CARRITO (OPTIMIZADO)
================================ */

document.querySelectorAll(".btn-carrito").forEach(btn=>{

btn.addEventListener("click",()=>{

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const producto = {
nombre: btn.dataset.nombre,
precio: parseInt(btn.dataset.precio),
img: btn.dataset.img
};

let existente = carrito.find(p => p.nombre === producto.nombre);

if(existente){
existente.cantidad++;
}else{
producto.cantidad = 1;
carrito.push(producto);
}

localStorage.setItem("carrito", JSON.stringify(carrito));

actualizarCarritoUI(btn);
actualizarContadorCarrito();

});

});


function actualizarCarritoUI(btn){
btn.innerHTML = "✔ Agregado";
setTimeout(()=>{
btn.innerHTML = "Agregar al carrito";
},1500);
}

function actualizarContadorCarrito(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total = carrito.reduce((acc,p)=>acc+p.cantidad,0);

const contador = document.getElementById("contador-carrito");

if(contador){
contador.textContent = total;
}

}


/* ================================
INIT
================================ */

actualizarContadorCarrito();
aplicarFiltros();


/* ================================
ANIMACIONES
================================ */

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
}
});
});

document.querySelectorAll(".animar")
.forEach(el=>observer.observe(el));