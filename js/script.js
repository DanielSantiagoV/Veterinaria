// El Gran Libro de los Dueños: Aquí guardamos a todos los protectores de nuestras mascotas.
const losAmosDeLasMascotas = [];

// El Censo de las Pequeñas Criaturas: Nuestro registro vital de todos los animalitos.
const lasPequeñasCriaturas = [];

// --- Herramientas Esenciales (Utilidades Básicas) ---

/**
 * Forja un identificador único, como si fuera una huella digital para cada entrada.
 * Usamos la fecha y un número aleatorio para que sea casi imposible que se repita.
 * @returns {string} Un identificador único e irrepetible.
 */
function forjarIdentificadorUnico() {
    return 'huella_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}

/**
 * Confirma que un campo de texto no esté vacío. Si lo está, avisa al usuario.
 * @param {string} elDato - El valor que estamos revisando.
 * @param {string} elNombreDelCampo - El nombre del campo para mensajes amigables.
 * @returns {boolean} `true` si el dato es válido (no vacío), `false` en caso contrario.
 */
function esUnCampoValido(elDato, elNombreDelCampo) {
    if (typeof elDato !== 'string' || elDato.trim() === '') {
        alert(`¡Alerta! El campo "${elNombreDelCampo}" es como un platillo vacío. Necesita algo. ¡Por favor, rellénelo!`);
        return false;
    }
    return true;
}

