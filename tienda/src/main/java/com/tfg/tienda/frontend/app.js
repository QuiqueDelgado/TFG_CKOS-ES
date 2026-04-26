let auth = "Basic " + btoa("test@test.com:1234");

window.onload = () => cargarProductos();

// ===================== CARGA =====================

function cargarProductos() {
    fetch("http://localhost:8080/productos", {
        headers: { "Authorization": auth }
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
    })
    .then(data => {
        // 🔥 separar por categorías
        const cases = data.filter(p => 
            p.categoria && p.categoria.nombre === "Cases"
        );

        const switches = data.filter(p => 
            p.categoria && p.categoria.nombre === "Switches"
        );

        pintarCarousel(cases, "cases");
        pintarCarousel(switches, "switches");
    })
    .catch(err => console.error(err));
}

// ===================== PINTAR =====================

function pintarCarousel(productos, contenedorId) {
    const cont = document.getElementById(contenedorId);
    cont.innerHTML = "";

    productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto";

        div.innerHTML = `
            <div class="img-placeholder"></div>
            <h4>${p.nombre}</h4>
            <p>${p.precio}€</p>
            <button onclick="addCarrito(${p.id})">Añadir</button>
        `;

        cont.appendChild(div);
    });
}

// ===================== SCROLL =====================

function scrollCarousel(id, direction) {
    const container = document.getElementById(id);

    container.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}

// ===================== CARRITO =====================

function addCarrito(id) {
    console.log("Añadir producto:", id);
}

function cargarProductos() {
    const data = [
        // ===== CASES =====
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

        // ===== SWITCHES =====
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

    // separar por categoría
    const cases = data.filter(p => p.categoria.nombre === "Cases");
    const switches = data.filter(p => p.categoria.nombre === "Switches");

    pintarCarousel(cases, "cases");
    pintarCarousel(switches, "switches");
}