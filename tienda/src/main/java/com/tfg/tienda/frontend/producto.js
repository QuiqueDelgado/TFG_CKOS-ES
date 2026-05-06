/**
 * producto.js — Lógica exclusiva de la página de detalle (producto.html)
 *
 * Se carga DESPUÉS de app.js, por lo que BASE_URL y window.addCarritoDirecto
 * ya están disponibles cuando este script se ejecuta.
 *
 * Responsabilidades:
 *   - Leer el parámetro ?id= de la URL y pedir el producto a la API
 *   - Pintar imagen, descripción y características (con fallback por categoría
 *     cuando el backend no devuelve descripción propia)
 *   - Gestionar la selección de variante (fuerza de actuación) para switches
 *   - Controlar el selector de cantidad (+/−) y el botón "Añadir al carrito"
 *
 * Nota: pintarProducto aquí shadow la función homónima de app.js porque
 * necesita lógica adicional (fallbacks, opciones de variante). app.js usa
 * su propia versión más simple en el carrusel de la home.
 */

function cargarProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    fetch(`${BASE_URL}/productos/${id}`)
        .then(res => res.json())
        .then(p => {
            console.log("Producto cargado:", p);
            pintarProducto(p);
        })
        .catch(err => console.error("Error:", err));
}

function pintarProducto(p) {

    // NOMBRE
    document.getElementById("nombre").innerText = p.nombre;

    // IMAGEN
    const imgDiv = document.querySelector(".imagen");
    imgDiv.innerHTML = `<img src="${BASE_URL + p.imagen}" alt="${p.nombre}" />`;

    // 🔴 NORMALIZAMOS CATEGORÍA
    const categoria = p.categoria?.nombre?.toLowerCase();

    console.log("categoria:", categoria);

    // ===== DESCRIPCIÓN =====
    const descripcion = document.getElementById("descripcion");

    if (p.descripcion) {
        descripcion.innerText = p.descripcion;
    } 
    else if (categoria === "cases") {
        descripcion.innerText = "Case de aluminio CNC diseñado para ofrecer máxima rigidez estructural y una experiencia premium en teclados custom.";
    } 
    else if (categoria === "switches") {
        descripcion.innerText = "Switch mecánico de alto rendimiento, con diferentes fuerzas de actuación para adaptarse a tu estilo de escritura.";
    } 
    else if (categoria === "keycaps") {
        descripcion.innerText = "Set de keycaps de alta calidad, fabricados en PBT y diseñados para máxima durabilidad y estética.";
    } 
    else if (categoria === "pcb") {
        descripcion.innerText = "PCB de alto rendimiento con soporte hot-swap y compatibilidad con múltiples layouts.";
    } 
    else if (categoria === "plate") {
        descripcion.innerText = "Plate de montaje que proporciona estabilidad y modifica el sonido y sensación del teclado.";
    } 
    else if (categoria === "stabilizers") {
        descripcion.innerText = "Stabilizers de precisión diseñados para eliminar ruidos y mejorar la estabilidad de teclas largas.";
    } 
    else if (categoria === "accesories") {
        descripcion.innerText = "Accesorios esenciales para mejorar el rendimiento y mantenimiento de tu teclado custom.";
    } 
    else if (categoria === "tool") {
        descripcion.innerText = "Herramientas especializadas para montaje, mantenimiento y personalización de teclados.";
    } 
    else {
        descripcion.innerText = "Producto premium.";
    }

    // ===== CARACTERÍSTICAS =====
    const ul = document.getElementById("caracteristicas");

    if (categoria === "cases") {
        ul.innerHTML = `
            <li>Aluminio CNC</li>
            <li>Alta rigidez estructural</li>
            <li>Diseño premium</li>
        `;
    } 
    else if (categoria === "switches") {
        ul.innerHTML = `
            <li>Lineal / táctil / clicky</li>
            <li>Durabilidad 50M+ pulsaciones</li>
            <li>Respuesta precisa</li>
        `;
    } 
    else if (categoria === "keycaps") {
        ul.innerHTML = `
            <li>PBT de alta calidad</li>
            <li>Perfil ergonómico</li>
            <li>Resistente al desgaste</li>
        `;
    } 
    else if (categoria === "pcb") {
        ul.innerHTML = `
            <li>Hot-swap</li>
            <li>Compatibilidad múltiple</li>
            <li>Alta calidad de señal</li>
        `;
    } 
    else if (categoria === "plate") {
        ul.innerHTML = `
            <li>Material optimizado</li>
            <li>Mejora la acústica</li>
            <li>Alta durabilidad</li>
        `;
    } 
    else if (categoria === "stabilizers") {
        ul.innerHTML = `
            <li>Movimiento suave</li>
            <li>Reducción de ruido</li>
            <li>Alta precisión</li>
        `;
    } 
    else if (categoria === "accesories") {
        ul.innerHTML = `
            <li>Compatibilidad universal</li>
            <li>Alta utilidad</li>
            <li>Fácil instalación</li>
        `;
    } 
    else if (categoria === "tool") {
        ul.innerHTML = `
            <li>Herramientas de precisión</li>
            <li>Diseño ergonómico</li>
            <li>Alta durabilidad</li>
        `;
    } 
    else {
        ul.innerHTML = `<li>Producto premium</li>`;
    }

    // Las opciones de fuerza de actuación solo tienen sentido para switches
    const opciones = document.querySelector(".opciones");

    if (categoria !== "switches") {
        opciones.style.display = "none";
    }

    setupCompra(p);
}

/**
 * Conecta los controles de cantidad y el botón de compra con el producto.
 * Para switches, valida que se haya seleccionado una variante de fuerza antes
 * de añadir; si no, marca el selector con borde rojo y aborta.
 */
function setupCompra(p) {

    const categoria = p.categoria?.nombre?.toLowerCase();
    const qtyInput = document.getElementById("qty");

    document.getElementById("mas").onclick = () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    };

    document.getElementById("menos").onclick = () => {
        if (qtyInput.value > 1) qtyInput.value--;
    };

    const btn = document.getElementById("btnAdd");

    btn.onclick = null; // evitar que pintarProducto acumule listeners al recargar

    btn.onclick = () => {

        const cantidad = Math.max(1, parseInt(qtyInput.value) || 1);

        let variante = null;

        if (categoria === "switches") {
            const selected = document.querySelector('input[name="force"]:checked');

            if (!selected) {
                document.querySelector(".opciones").style.border = "1px solid red";
                return;
            }

            variante = selected.value;
        }

        addCarritoDirecto(p, cantidad, variante);

        // feedback
        btn.innerText = "Añadido ✔";
        btn.style.background = "#2ecc71";
        btn.style.transition = "0.2s";
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = "Añadir al carrito";
            btn.style.background = "black";
            btn.disabled = false;
        }, 1200);
    };
}

window.onload = () => {
    cargarProducto();
};