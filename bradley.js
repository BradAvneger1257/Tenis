const botones = document.querySelectorAll(".filtro-btn");
const cards = document.querySelectorAll(".card");

botones.forEach(boton => {
    boton.addEventListener("click", () => {

        // Quitar active de todos
        botones.forEach(btn => btn.classList.remove("active"));

        // Activar botón actual
        boton.classList.add("active");

        const marca = boton.getAttribute("data-marca");

        cards.forEach(card => {
            if (marca === "todos") {
                card.style.display = "block";
            } else {
                card.style.display =
                    card.getAttribute("data-marca") === marca
                        ? "block"
                        : "none";
            }
        });
    });
});