/* ================================
FILTROS POR MARCA
================================ */

const botones = document.querySelectorAll(".filtro-btn");
const cards = document.querySelectorAll(".card");

function filtrarMarca(marca){

botones.forEach(btn=>btn.classList.remove("active"));

const botonActivo = document.querySelector(`[data-marca="${marca}"]`);

if(botonActivo){
botonActivo.classList.add("active");
}

cards.forEach(card=>{

if(marca==="todos"){

card.style.display="block";

}else{

card.style.display =
card.getAttribute("data-marca")===marca
? "block"
: "none";

}

});

actualizarContadorProductos();

}

botones.forEach(boton => {

boton.addEventListener("click",()=>{

const marca = boton.getAttribute("data-marca");

filtrarMarca(marca);

});

});


/* ================================
FILTRO DESDE URL
productos.html#nike
================================ */

const marcaURL = window.location.hash.replace("#","");

if(marcaURL){

filtrarMarca(marcaURL);

}


/* ================================
BUSCADOR
================================ */

const buscador = document.getElementById("buscador");

if(buscador){

buscador.addEventListener("keyup",()=>{

const texto = buscador.value.toLowerCase();

cards.forEach(card=>{

const nombre = card.querySelector("h2").textContent.toLowerCase();

if(nombre.includes(texto)){

card.style.display="block";

}else{

card.style.display="none";

}

});

actualizarContadorProductos();

});

}


/* ================================
ORDENAR PRODUCTOS
================================ */

const ordenar = document.getElementById("ordenar");

if(ordenar){

ordenar.addEventListener("change",()=>{

const tipo = ordenar.value;

const contenedor = document.querySelector(".contenedor");

const productos = Array.from(cards);

productos.sort((a,b)=>{

const precioA = parseInt(a.querySelector(".precio").dataset.precio);
const precioB = parseInt(b.querySelector(".precio").dataset.precio);

if(tipo==="precio-asc"){
return precioA-precioB;
}

if(tipo==="precio-desc"){
return precioB-precioA;
}

return 0;

});

productos.forEach(p=>contenedor.appendChild(p));

});

}


/* ================================
CONTADOR PRODUCTOS VISIBLES
================================ */

function actualizarContadorProductos(){

const visibles = [...cards].filter(card=>card.style.display!=="none");

const contador = document.getElementById("contador-productos");

if(contador){

contador.textContent = "Mostrando "+visibles.length+" productos";

}

}

actualizarContadorProductos();


/* ================================
CARRITO
================================ */

const botonesCarrito = document.querySelectorAll(".btn-carrito");

botonesCarrito.forEach(btn=>{

btn.addEventListener("click",()=>{

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const nombre = btn.dataset.nombre;
const precio = parseInt(btn.dataset.precio);
const img = btn.dataset.img;

/* buscar si el producto ya existe */

let existente = carrito.find(p => p.nombre === nombre);

if(existente){

existente.cantidad++;

}else{

carrito.push({
nombre:nombre,
precio:precio,
img:img,
cantidad:1
});

}

localStorage.setItem("carrito",JSON.stringify(carrito));

actualizarContador();

/* animacion visual */

btn.innerHTML="✔ Agregado";

setTimeout(()=>{
btn.innerHTML="Agregar al carrito";
},1500);

});

});


/* ================================
CONTADOR CARRITO REAL
================================ */

function actualizarContador(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total = 0;

carrito.forEach(p=>{
total += p.cantidad;
});

const contador = document.getElementById("contador-carrito");

if(contador){

contador.textContent = total;

}

}

actualizarContador();


/* ================================
ANIMACIONES DE APARICION
================================ */

const elementos = document.querySelectorAll(".animar");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

});

elementos.forEach(el=>observer.observe(el));