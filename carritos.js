// ========== FUNCIONES GLOBALES DEL CARRITO ==========

// Obtener carrito del localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorGlobal();
    return true;
}

// Actualizar contador en todas las páginas
function actualizarContadorGlobal() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
    
    document.querySelectorAll("#contador, #contador-carrito").forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

// Mostrar notificación flotante
function mostrarNotificacion(mensaje, tipo = "success") {
    // Eliminar notificaciones existentes
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = mensaje;
    
    const color = tipo === "success" ? "#00c853" : tipo === "error" ? "#ff5252" : "#ff9800";
    
    notif.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 14px 28px;
        border-radius: 50px;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        cursor: pointer;
    `;
    
    // Agregar animación si no existe
    if (!document.querySelector("#notif-styles")) {
        const style = document.createElement("style");
        style.id = "notif-styles";
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notif);
    
    // Auto cerrar después de 3 segundos
    setTimeout(() => {
        if (notif) {
            notif.style.animation = "slideOut 0.3s ease";
            setTimeout(() => notif.remove(), 300);
        }
    }, 3000);
    
    // Cerrar al hacer click
    notif.onclick = () => {
        notif.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notif.remove(), 300);
    };
}

// Agregar producto al carrito (FUNCIÓN PRINCIPAL CORREGIDA)
function agregarAlCarrito(producto, talla = "US 8") {
    if (!producto || !producto.nombre || !producto.precio) {
        console.error("Producto inválido:", producto);
        mostrarNotificacion("❌ Error al agregar producto", "error");
        return false;
    }
    
    let carrito = obtenerCarrito();
    
    const existe = carrito.find(p => p.nombre === producto.nombre && p.talla === talla);
    
    if (existe) {
        existe.cantidad = (existe.cantidad || 1) + 1;
        mostrarNotificacion(`📦 +1 ${producto.nombre} (${talla})`, "success");
    } else {
        carrito.push({
            id: Date.now(),
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.img || "img/default.jpg",
            talla: talla,
            cantidad: 1
        });
        mostrarNotificacion(`✅ ${producto.nombre} (${talla}) agregado al carrito`, "success");
    }
    
    guardarCarrito(carrito);
    return true;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    let carrito = obtenerCarrito();
    if (carrito[index]) {
        const producto = carrito[index];
        carrito.splice(index, 1);
        guardarCarrito(carrito);
        mostrarNotificacion(`❌ ${producto.nombre} eliminado`, "error");
        return true;
    }
    return false;
}

// Actualizar cantidad
function actualizarCantidad(index, nuevaCantidad) {
    let carrito = obtenerCarrito();
    if (carrito[index] && nuevaCantidad >= 1) {
        carrito[index].cantidad = nuevaCantidad;
        guardarCarrito(carrito);
        return true;
    }
    return false;
}

// Vaciar carrito completo
function vaciarCarrito() {
    if (confirm("¿Estás seguro de vaciar tu carrito?")) {
        guardarCarrito([]);
        mostrarNotificacion("🗑️ Carrito vaciado", "info");
        return true;
    }
    return false;
}

// Calcular total del carrito
function calcularTotal(carrito) {
    return carrito.reduce((sum, item) => sum + (item.precio * (item.cantidad || 1)), 0);
}

// Formatear precio
function formatearPrecio(precio) {
    return "$" + precio.toLocaleString('es-MX');
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorGlobal();
});

// Hacer funciones globales disponibles
window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;
window.actualizarContadorGlobal = actualizarContadorGlobal;
window.mostrarNotificacion = mostrarNotificacion;
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCantidad = actualizarCantidad;
window.vaciarCarrito = vaciarCarrito;
window.calcularTotal = calcularTotal;
window.formatearPrecio = formatearPrecio;
window.scrollToTop = scrollToTop;