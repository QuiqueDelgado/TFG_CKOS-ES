window.carrito = [];

const BASE_URL  = "http://localhost:8080";
const AUTH_URL  = BASE_URL + "/auth";

// ======== UTILS ========

function formatFecha(fechaStr) {
    if (!fechaStr) return "";
    return new Date(fechaStr).toLocaleDateString("es-ES", {
        day: "numeric", month: "long", year: "numeric"
    });
}

function feedbackBotonAnadido(btn) {
    btn.innerText = "Añadido ✔";
    btn.style.background = "#2ecc71";
    btn.disabled = true;
    setTimeout(() => {
        btn.innerText = "Añadir";
        btn.style.background = "";
        btn.disabled = false;
    }, 1200);
}

// ======== INIT ========

window.addEventListener("load", () => {
    cargarHeader();
    cargarFooter();
    cargarCarrito();
    pintarMiniCarrito();
    actualizarContador();
    if (document.getElementById("cases"))            cargarProductos();
    if (document.getElementById("detalleProducto"))  cargarProductoDetalle();
    if (document.getElementById("gridProductos"))    cargarProductosPorCategoria();
    if (document.getElementById("blogContainer"))    cargarBlog();
    if (document.getElementById("noticia"))          cargarNoticia();
});

// ======== PRODUCTOS ========

function cargarProductos() {
    fetch(BASE_URL + "/productos")
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar productos");
            return res.json();
        })
        .then(data => {
            pintarCarousel(data.filter(p => p.categoria?.nombre === "Cases"),    "cases");
            pintarCarousel(data.filter(p => p.categoria?.nombre === "Switches"), "switches");
        })
        .catch(err => console.error(err));
}

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
        div.onclick = () => verProducto(p.id);
        div.querySelector(".btn-add").onclick = (e) => {
            e.stopPropagation();
            addCarrito(e, p.id);
        };
    });
}

// ======== SCROLL ========

function scrollCarousel(id, direction) {
    const container = document.getElementById(id);
    if (!container) return;
    container.scrollBy({ left: direction * 300, behavior: "smooth" });
}

// ======== CARRITO ========

function addCarrito(event, id) {
    event.stopPropagation();
    const usuario = checkAuth();
    if (!usuario) { abrirModalAuth(); return; }

    const btn     = event.target;
    const producto = document.querySelector(`[data-id="${id}"]`);
    if (!producto) return;

    const nombre   = producto.querySelector("h4").innerText;
    const precio   = parseFloat(producto.querySelector("p").innerText);
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
    feedbackBotonAnadido(btn);
}

window.addCarritoDirecto = function(p, cantidad, variante) {
    const existente = window.carrito.find(item => item.id === p.id && item.variante === variante);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        window.carrito.push({ id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen, cantidad, variante });
    }
    guardarCarrito();
    pintarMiniCarrito();
    actualizarContador();
    abrirCarrito();
};

function abrirCarrito() {
    const panel = document.getElementById("miniCarrito");
    if (!panel) return;
    panel.classList.remove("oculto");
    setTimeout(() => panel.classList.add("oculto"), 3000);
}

function cerrarCarrito() {
    const panel   = document.getElementById("miniCarrito");
    const overlay = document.getElementById("overlayCarrito");
    if (!panel || !overlay) return;
    panel.classList.remove("abierto");
    overlay.classList.remove("activo");
}

function toggleCarrito() {
    const panel   = document.getElementById("miniCarrito");
    const overlay = document.getElementById("overlayCarrito");
    if (!panel || !overlay) return;
    panel.classList.toggle("abierto");
    overlay.classList.toggle("activo");
}

function pintarMiniCarrito() {
    const cont = document.getElementById("miniCarrito");
    if (!cont) return;
    cont.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const div = document.createElement("div");
        div.className = "item-carrito";
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
    totalDiv.className = "carrito-total";
    totalDiv.innerHTML = `<span>Total</span><span>${total.toFixed(2)}€</span>`;
    cont.appendChild(totalDiv);

    const btnCheckout = document.createElement("button");
    btnCheckout.className = "btn-checkout";
    btnCheckout.innerText = "Finalizar compra →";
    btnCheckout.onclick = () => window.location.href = "checkout.html";
    cont.appendChild(btnCheckout);
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
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

// ======== NAVEGACIÓN ========

function verProducto(id) {
    window.location.href = "producto.html?id=" + id;
}

// ======== DETALLE PRODUCTO ========

function getIdFromUrl() {
    return new URLSearchParams(window.location.search).get("id");
}

function cargarProductoDetalle() {
    const id = getIdFromUrl();
    if (!id) return;
    fetch(`${BASE_URL}/productos/${id}`)
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
    document.getElementById("precio").innerText       = p.precio + "€";
    document.getElementById("descripcion").innerText  = p.descripcion || "Sin descripción";
    document.getElementById("imagen").src             = BASE_URL + p.imagen;
    const ul = document.getElementById("caracteristicas");
    ul.innerHTML = "";
    [`Categoría: ${p.categoria?.nombre}`, `Stock: ${p.stock}`].forEach(c => {
        const li = document.createElement("li");
        li.innerText = c;
        ul.appendChild(li);
    });
}

// ======== CATEGORIAS ========

function getCategoriaFromUrl() {
    return new URLSearchParams(window.location.search).get("cat");
}

function cargarProductosPorCategoria() {
    const categoria = getCategoriaFromUrl();
    if (!categoria) return;
    document.getElementById("tituloCategoria").innerText = categoria;
    fetch(BASE_URL + "/productos")
        .then(res => res.json())
        .then(data => {
            pintarGrid(data.filter(p => p.categoria?.nombre?.toLowerCase() === categoria.toLowerCase()));
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
            <img src="${BASE_URL + p.imagen}" class="img-producto">
            <h4>${p.nombre}</h4>
            <p>${p.precio}€</p>
            <button class="btn-add">Añadir</button>
        `;
        cont.appendChild(div);
        div.onclick = () => window.location.href = `producto.html?id=${p.id}`;
        div.querySelector(".btn-add").onclick = (e) => { e.stopPropagation(); addCarrito(e, p.id); };
    });
}

// ======== HEADER / FOOTER ========

function cargarHeader() {
    fetch("header.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;
            const btn = document.querySelector(".carrito-icono");
            if (btn) btn.addEventListener("click", () => toggleCarrito());
            actualizarHeaderAuth(checkAuth());
        })
        .catch(err => console.error(err));
}

function cargarFooter() {
    fetch("footer.html")
        .then(res => res.text())
        .then(html => { document.getElementById("footer-container").innerHTML = html; })
        .catch(err => console.error("Error cargando footer:", err));
}

// ======== NOVEDADES ========

function cargarBlog() {
    const cont = document.getElementById("blogContainer");
    if (!cont) return;
    fetch(BASE_URL + "/noticias")
        .then(res => res.json())
        .then(data => pintarBlog(cont, data));
}

function pintarBlog(cont, data) {
    cont.innerHTML = "";
    data.forEach(post => {
        const texto = post.contenido ? post.contenido.substring(0, 120) : "Sin contenido";
        const div = document.createElement("div");
        div.className = "blog-card";
        div.style.cursor = "pointer";
        div.onclick = () => window.location.href = `noticia.html?id=${post.id}`;
        div.innerHTML = `
            <img src="${BASE_URL + post.imagen}" />
            <div class="blog-info">
                <p class="fecha">${formatFecha(post.fecha)}</p>
                <h3>${post.titulo}</h3>
                <p>${texto}...</p>
            </div>
        `;
        cont.appendChild(div);
    });
}

// ======== NOTICIA ========

function cargarNoticia() {
    const id = getIdFromUrl();
    if (!id) return;
    fetch(`${BASE_URL}/noticias/${id}`)
        .then(res => res.json())
        .then(post => pintarNoticia(post))
        .catch(err => console.error(err));
}

function pintarNoticia(post) {
    const cont = document.getElementById("noticia");
    if (!cont) return;
    cont.innerHTML = `
        <div class="noticia-card">
            <img src="${BASE_URL + post.imagen}" class="noticia-img" />
            <div class="noticia-info">
                <p class="fecha">${formatFecha(post.fecha)}</p>
                <h1>${post.titulo}</h1>
                <p class="contenido">${post.contenido}</p>
            </div>
        </div>
    `;
}

// ======== CONTADOR ========

function actualizarContador() {
    const span = document.getElementById("contadorCarrito");
    if (!span) return;
    span.innerText = window.carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// ======== AUTH ========

function checkAuth() {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
}

async function login(email, password) {
    const res = await fetch(AUTH_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("Credenciales incorrectas");
    return res.json();
}

async function register(email, password) {
    const res = await fetch(AUTH_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al registrarse");
    }
    return res.json();
}

async function logout() {
    await fetch(AUTH_URL + "/logout", { method: "POST", credentials: "include" });
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    window.location.reload();
}

// ======== MODAL AUTH ========

function abrirModalAuth(modo = "login") {
    const modal = document.getElementById("modalAuth");
    if (modal) { modal.classList.add("activo"); cambiarModoModal(modo); }
}

function cerrarModalAuth() {
    document.getElementById("modalAuth")?.classList.remove("activo");
}

function cambiarModoModal(modo) {
    const titulo    = document.getElementById("authTitulo");
    const btnSubmit = document.getElementById("authSubmit");
    const linkCambio = document.getElementById("authLink");
    if (modo === "login") {
        titulo.innerText    = "Iniciar sesión";
        btnSubmit.innerText = "Entrar";
        linkCambio.innerHTML = `¿No tienes cuenta? <a href="#" onclick="cambiarModoModal('register')">Regístrate</a>`;
        btnSubmit.onclick   = () => handleAuth(login);
    } else {
        titulo.innerText    = "Crear cuenta";
        btnSubmit.innerText = "Registrarse";
        linkCambio.innerHTML = `¿Ya tienes cuenta? <a href="#" onclick="cambiarModoModal('login')">Inicia sesión</a>`;
        btnSubmit.onclick   = () => handleAuth(register);
    }
}

async function handleAuth(fn) {
    const email    = document.getElementById("authEmail").value;
    const password = document.getElementById("authPassword").value;
    const error    = document.getElementById("authError");
    try {
        const user = await fn(email, password);
        localStorage.setItem("usuario", JSON.stringify(user));
        cerrarModalAuth();
        actualizarHeaderAuth(user);
    } catch (e) {
        error.innerText = e.message;
    }
}

// ======== CONTACTO ========

function enviarContacto(event) {
    event.preventDefault();
    const nombre  = document.getElementById("contactoNombre").value;
    const email   = document.getElementById("contactoEmail").value;
    const mensaje = document.getElementById("contactoMensaje").value;
    fetch(BASE_URL + "/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al enviar");
        document.getElementById("formContacto").reset();
    })
    .catch(() => alert("❌ Error al enviar el mensaje"));
}

// ======== NEWSLETTER ========

function suscribirNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById("newsletterEmail").value;
    fetch(BASE_URL + "/contacto/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error");
        mostrarConfirmacion("newsletter");
    })
    .catch(() => alert("❌ Error al suscribirse"));
}

function mostrarConfirmacion(tipo) {
    const id = tipo === "contacto" ? "confirmacionContacto" : "confirmacionNewsletter";
    const el = document.getElementById(id);
    if (el) { el.style.display = "block"; setTimeout(() => el.style.display = "none", 4000); }
}

// ======== HEADER AUTH ========

function actualizarHeaderAuth(user) {
    const wrapper = document.querySelector(".carrito-wrapper");
    if (!wrapper) return;
    document.getElementById("btnAuth")?.remove();
    document.getElementById("linkMisPedidos")?.remove();

    if (user) {
        const link = document.createElement("a");
        link.id = "linkMisPedidos";
        link.href = "mispedidos.html";
        link.innerText = "Mis pedidos";
        link.style.cssText = "font-size:13px;color:#444;text-decoration:none";
        wrapper.prepend(link);
    }

    const btn = document.createElement("button");
    btn.id = "btnAuth";
    btn.style.cssText = "background:none;border:1px solid #ddd;padding:5px 12px;border-radius:20px;font-size:12px;cursor:pointer";
    if (user) {
        btn.innerText = "Salir";
        btn.onclick = logout;
    } else {
        btn.innerText = "Entrar";
        btn.onclick = () => abrirModalAuth("login");
    }
    wrapper.prepend(btn);
}
