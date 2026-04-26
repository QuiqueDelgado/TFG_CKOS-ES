let auth = "Basic " + btoa("test@test.com:1234");
let carrito = [];

// ===================== INIT =====================

window.onload = () => {
    cargarCarrito();
    pintarMiniCarrito();
    cargarProductos();
    cargarProductoDetalle(); // 🔥 detalle desde backend
};

// ===================== PRODUCTOS (CATÁLOGO MOCK) =====================

const productosData = [
    { id: 1, nombre: "Case Alpha 60%", precio: 120, categoria: { nombre: "Cases" } },
    { id: 2, nombre: "Case Beta 65%", precio: 135, categoria: { nombre: "Cases" } },
    { id: 3, nombre: "Case Gamma 75%", precio: 150, categoria: { nombre: "Cases" } },
    { id: 4, nombre: "Case Delta TKL", precio: 180, categoria: { nombre: "Cases" } },
    { id: 5, nombre: "Case Epsilon Full", precio: 200, categoria: { nombre: "Cases" } },
    { id: 6, nombre: "Case Orion RGB", precio: 160, categoria: { nombre: "Cases" } },
    { id: 7, nombre: "Case Nova Pro", precio: 175, categoria: { nombre: "Cases" } },
    { id: 8, nombre: "Case Titan Metal", precio: 220, categoria: { nombre: "Cases" } },
    { id: 9, nombre: "Case Phantom Black", precio: 190, categoria: { nombre: "Cases" } },
    { id: 10, nombre: "Case Aurora White", precio: 165, categoria: { nombre: "Cases" } },

    { id: 11, nombre: "Switch Red Linear", precio: 0.50, categoria: { nombre: "Switches" } },
    { id: 12, nombre: "Switch Blue Clicky", precio: 0.60, categoria: { nombre: "Switches" } },
    { id: 13, nombre: "Switch Brown Tactile", precio: 0.55, categoria: { nombre: "Switches" } },
    { id: 14, nombre: "Switch Silent Red", precio: 0.65, categoria: { nombre: "Switches" } },
    { id: 15, nombre: "Switch Speed Silver", precio: 0.70, categoria: { nombre: "Switches" } },
    { id: 16, nombre: "Switch Black Linear", precio: 0.50, categoria: { nombre: "Switches" } },
    { id: 17, nombre: "Switch Green Clicky", precio: 0.65, categoria: { nombre: "Switches" } },
    { id: 18, nombre: "Switch Yellow Linear", precio: 0.55, categoria: { nombre: "Switches" } },
    { id: 19, nombre: "Switch Purple Tactile", precio: 0.60, categoria: { nombre: "Switches" } },
    { id: 20, nombre: "Switch Orange Silent", precio: 0.75, categoria: { nombre: "Switches" } }
];

// ===================== CARGAR CATÁLOGO =====================

function cargarProductos() {
    const cases = productosData.filter(p => p.categoria.nombre === "Cases");
    const switches = productosData.filter(p => p.categoria.nombre === "Switches");

    pintarCarousel(cases, "cases");
    pintarCarousel(switches, "switches");
}

// ===================== PINTAR CARRUSEL =====================

function pintarCarousel(productos, contenedorId) {
    const cont = document.getElementById(contenedorId);
    if (!cont) return;

    cont.innerHTML = "";

    productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto";
        div.setAttribute("data-id", p.id);

        div.onclick = () => verProducto(p.id);

        div.innerHTML = `
            <div class="img-placeholder"></div>
            <h4>${p.nombre}</h4>
            <p>${p.precio}€</p>
            <button type="button" onclick="addCarrito(event, ${p.id})">Añadir</button>
        `;

        cont.appendChild(div);
    });
}

// ===================== SCROLL =====================

function scrollCarousel(id, direction) {
    const container = document.getElementById(id);
    if (!container) return;

    container.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}

// ===================== CARRITO =====================

function addCarrito(event, id) {
    event.stopPropagation();

    const producto = document.querySelector(`[data-id="${id}"]`);
    if (!producto) return;

    const nombre = producto.querySelector("h4").innerText;
    const precio = parseFloat(producto.querySelector("p").innerText);

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    pintarMiniCarrito();
}

function pintarMiniCarrito() {
    const cont = document.getElementById("miniCarrito");
    if (!cont) return;

    cont.innerHTML = "";

    let total = 0;

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-carrito";

        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        div.innerHTML = `
            <span>${item.nombre}</span>
            <div class="controles">
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </div>
            <button onclick="eliminarProducto(${item.id})">🗑</button>
            <span>${subtotal.toFixed(2)}€</span>
        `;

        cont.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: ${total.toFixed(2)}€</strong>`;
    cont.appendChild(totalDiv);
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    pintarMiniCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    pintarMiniCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    carrito = data ? JSON.parse(data) : [];
}

// ===================== NAVEGACIÓN =====================

function verProducto(id) {
    window.location.href = "producto.html?id=" + id;
}

// ===================== DETALLE PRODUCTO (BACKEND) =====================

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function cargarProductoDetalle() {
    const id = getIdFromUrl();
    if (!id) return;

    fetch(`http://localhost:8080/productos/${id}`, {
        headers: { "Authorization": auth }
    })
    .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
    })
    .then(p => pintarProducto(p))
    .catch(err => console.error(err));
}

function pintarProducto(p) {
    const nombre = document.getElementById("nombre");
    if (!nombre) return;

    nombre.innerText = p.nombre;
    document.getElementById("precio").innerText = p.precio + "€";
    document.getElementById("descripcion").innerText = p.descripcion || "Sin descripción";

    const ul = document.getElementById("caracteristicas");
    ul.innerHTML = "";

    [
        `Categoría: ${p.categoria?.nombre || "N/A"}`,
        `Stock: ${p.stock ?? "N/A"}`
    ].forEach(c => {
        const li = document.createElement("li");
        li.innerText = c;
        ul.appendChild(li);
    });
}