
window.carrito = [];

// ===================== INIT =====================

window.addEventListener("load", () => {

    cargarHeader();
    cargarFooter();

    cargarCarrito();
    pintarMiniCarrito();
    actualizarContador();

    if (document.getElementById("cases")) {
    cargarProductos();
}

    if (document.getElementById("detalleProducto")) {
        cargarProductoDetalle();
    }

    if (document.getElementById("gridProductos")) {
        cargarProductosPorCategoria();
    }

    if (document.getElementById("blogContainer")) {
        cargarBlog();
    }

    if (document.getElementById("noticia")) {
        cargarNoticia();
    }

});

// ===================== PRODUCTOS =====================

function cargarProductos() {
    fetch("http://localhost:8080/productos")
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar productos");
            return res.json();
        })
        .then(data => {
            const cases = data.filter(p => p.categoria?.nombre === "Cases");
            const switches = data.filter(p => p.categoria?.nombre === "Switches");

            pintarCarousel(cases, "cases");
            pintarCarousel(switches, "switches");
        })
        .catch(err => console.error(err));
}

// ===================== PINTAR CARRUSEL =====================

const BASE_URL = "http://localhost:8080";

function pintarCarousel(productos, contenedorId) {
    const cont = document.getElementById(contenedorId);
    if (!cont) return;

    cont.innerHTML = "";

    productos.forEach(p => {

        const div = document.createElement("div");
        div.className = "producto";
        div.setAttribute("data-id", p.id);

        div.innerHTML = `
            <img src="${BASE_URL + p.imagen}" class="img-producto" />
            <h4>${p.nombre}</h4>
            <p>${p.precio}€</p>
            <button class="btn-add">Añadir</button>
        `;

        cont.appendChild(div);

        // 👉 click en producto
        div.onclick = () => verProducto(p.id);

        // 👉 botón carrito (FORMA CORRECTA)
        const btn = div.querySelector(".btn-add");

        btn.onclick = (e) => {
            console.log("CLICK CARRUSEL");
            e.stopPropagation();
            addCarrito(e, p.id);
        };
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

    const btn = event.target; // 👈 botón pulsado

    const producto = document.querySelector(`[data-id="${id}"]`);
    if (!producto) return;

    const nombre = producto.querySelector("h4").innerText;
    const precio = parseFloat(producto.querySelector("p").innerText);

    const existente = window.carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        window.carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    pintarMiniCarrito();
    actualizarContador();
    abrirCarrito();

    // ===== EFECTO VISUAL =====
    btn.innerText = "Añadido ✔";
    btn.style.background = "#2ecc71";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Añadir";
        btn.style.background = "";
        btn.disabled = false;
    }, 1200);
}

function abrirCarrito() {

    const panel = document.getElementById("miniCarrito");

    if (!panel) return; // 🔑 evita el error

    panel.classList.remove("oculto");

    setTimeout(() => {

        panel.classList.add("oculto");

    }, 3000);

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
            <span class="nombre">${item.nombre}</span>

            <div class="controles">
                <button onclick="cambiarCantidad(${item.id}, -1)">−</button>
                <span class="cantidad">${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </div>

        <span class="precio">${subtotal.toFixed(2)}€</span>

        <button class="eliminar" onclick="eliminarProducto(${item.id})">✕</button>
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
    actualizarContador();
}

function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    pintarMiniCarrito();
    actualizarContador();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    window.carrito = data ? JSON.parse(data) : [];
}

window.addCarritoDirecto = function(p, cantidad, variante) {

    const existente = window.carrito.find(item =>
        item.id === p.id && item.variante === variante
    );

    if (event && event.target) {
    const btn = event.target;

    btn.innerText = "Añadido ✔";
    btn.style.background = "#2ecc71";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Añadir al carrito";
        btn.style.background = "black";
        btn.disabled = false;
    }, 1200);
}

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        window.carrito.push({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            imagen: p.imagen,
            cantidad: cantidad,
            variante: variante
        });
    }
    function toggleCarrito() {

    const panel = document.getElementById("miniCarrito");

    if (!panel) {
        console.warn("miniCarrito no existe todavía");
        return;
    }

    panel.classList.toggle("oculto");
}

    guardarCarrito();
    pintarMiniCarrito();
    actualizarContador();
    abrirCarrito();
};

// ===================== NAVEGACIÓN =====================

function verProducto(id) {
    window.location.href = "producto.html?id=" + id;
}

// ===================== DETALLE PRODUCTO =====================

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function cargarProductoDetalle() {
    const id = getIdFromUrl();
    if (!id) return;

    fetch(`http://localhost:8080/productos/${id}`)
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

    document.getElementById("imagen").src = BASE_URL + p.imagen;

    const ul = document.getElementById("caracteristicas");
    ul.innerHTML = "";

    [
        `Categoría: ${p.categoria?.nombre}`,
        `Stock: ${p.stock}`
    ].forEach(c => {
        const li = document.createElement("li");
        li.innerText = c;
        ul.appendChild(li);
    });
}

function toggleCarrito() {

    const panel = document.getElementById("miniCarrito");

    panel.classList.toggle("oculto");

}

//==================== Categorias ==========================
function getCategoriaFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("cat");
}

function cargarProductosPorCategoria() {
    const categoria = getCategoriaFromUrl();
    if (!categoria) return;

    document.getElementById("tituloCategoria").innerText = categoria;

    fetch("http://localhost:8080/productos")
        .then(res => res.json())
        .then(data => {
            const filtrados = data.filter(
                p => p.categoria?.nombre?.toLowerCase() === categoria.toLowerCase()
            );

            pintarGrid(filtrados);
        });
}

function pintarGrid(productos) {
    const cont = document.getElementById("gridProductos");
    if (!cont) return;

    cont.innerHTML = "";

    productos.forEach(p => {

        const div = document.createElement("div");
        div.className = "producto-grid";

        div.setAttribute("data-id", p.id);

        div.innerHTML = `
            <img src="http://localhost:8080${p.imagen}" class="img-producto">
            <h4>${p.nombre}</h4>
            <p>${p.precio}€</p>
            <button class="btn-add">Añadir</button>
        `;

        cont.appendChild(div);

        div.onclick = () => {
            window.location.href = `producto.html?id=${p.id}`;
        };

        const btn = div.querySelector(".btn-add");

        btn.onclick = (e) => {
            e.stopPropagation();
            addCarrito(e, p.id);
        };
    });
}

// ================== HEADER ================
function cargarHeader() {
    fetch("header.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;
        })
        .catch(err => console.error("Error cargando header:", err));
}

// ================= FOOTER =================
function cargarFooter() {
    fetch("footer.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;
        })
        .catch(err => console.error("Error cargando footer:", err));
}

// ================= NOVEDADES =================
function cargarBlog() {
    const cont = document.getElementById("blogContainer");
    if (!cont) return;

    fetch("http://localhost:8080/noticias")
        .then(res => res.json())
        .then(data => pintarBlog(data));
}

function pintarBlog(data) {

    const cont = document.getElementById("blogContainer");
    cont.innerHTML = "";

    data.forEach(post => {

        const div = document.createElement("div");
        div.className = "blog-card";

        
        div.style.cursor = "pointer";
        div.onclick = () => {
            window.location.href = `noticia.html?id=${post.id}`;
        };

        const texto = post.contenido 
            ? post.contenido.substring(0, 120) 
            : "Sin contenido";

        const fecha = post.fecha 
            ? new Date(post.fecha).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            : "";

        div.innerHTML = `
            <img src="${BASE_URL + post.imagen}" />

            <div class="blog-info">
                <p class="fecha">${fecha}</p>
                <h3>${post.titulo}</h3>
                <p>${texto}...</p>
            </div>
        `;

        cont.appendChild(div);
    });
}

// ================= NOTICIA =================

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function cargarNoticia() {
    const id = getIdFromUrl();
    if (!id) return;

    fetch(`http://localhost:8080/noticias/${id}`)
        .then(res => res.json())
        .then(data => pintarNoticia(data))
        .catch(err => console.error(err));
}

function pintarNoticia(post) {

    const cont = document.getElementById("noticia");
    if (!cont) return;

    const fecha = post.fecha 
        ? new Date(post.fecha).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "";

    cont.innerHTML = `
        <div class="noticia-card">

            <img src="${BASE_URL + post.imagen}" class="noticia-img" />

            <div class="noticia-info">
                <p class="fecha">${fecha}</p>
                <h1>${post.titulo}</h1>
                <p class="contenido">${post.contenido}</p>
            </div>

        </div>
    `;
}

// ================= CONTADOR =================
function actualizarContador() {
    const span = document.getElementById("contadorCarrito");
    if (!span) return;
    const total = window.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    span.innerText = total;
}

