const botones = document.querySelectorAll(".filtro-btn");
const cards = document.querySelectorAll(".card");

/* FILTRO DE MARCAS */

botones.forEach(boton => {
    boton.addEventListener("click", () => {

        botones.forEach(btn => btn.classList.remove("active"));
        boton.classList.add("active");

        const marca = boton.getAttribute("data-marca");

        cards.forEach(card => {

            if (marca === "todos") {
                card.style.display = "block";
            } 
            else {

                card.style.display =
                card.getAttribute("data-marca") === marca
                ? "block"
                : "none";

            }

        });
    });
});


/* CARRITO */

const botonesCarrito = document.querySelectorAll(".btn-carrito");

botonesCarrito.forEach(boton => {

    boton.addEventListener("click", () => {

        const producto = {

            nombre: boton.dataset.nombre,
            img: boton.dataset.img

        };

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert("Producto agregado al carrito");

    });

});