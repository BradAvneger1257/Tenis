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

}

botones.forEach(boton => {

boton.addEventListener("click",()=>{

const marca = boton.getAttribute("data-marca");

filtrarMarca(marca);

});

});


const marcaURL = window.location.hash.replace("#","");

if(marcaURL){

filtrarMarca(marcaURL);

}


/* CARRITO */

const botonesCarrito = document.querySelectorAll(".btn-carrito");

botonesCarrito.forEach(btn=>{

btn.addEventListener("click",()=>{

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const producto = {

nombre:btn.dataset.nombre,
precio:parseInt(btn.dataset.precio),
img:btn.dataset.img

};

carrito.push(producto);

localStorage.setItem("carrito",JSON.stringify(carrito));

actualizarContador();

alert("Producto agregado al carrito");

});

});


function actualizarContador(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contador = document.getElementById("contador-carrito");

if(contador){

contador.textContent = carrito.length;

}

}

actualizarContador();