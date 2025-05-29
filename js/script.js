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

/**
 * Revisa que un valor sea un número positivo y real. Si no lo es, avisa.
 * @param {any} elNumero - El valor a examinar.
 * @param {string} elNombreDelCampo - El nombre del campo para los avisos.
 * @returns {boolean} `true` si es un número positivo válido, `false` de lo contrario.
 */
function esUnNumeroPositivoValido(elNumero, elNombreDelCampo) {
    const numeroPuro = Number(elNumero);
    if (isNaN(numeroPuro) || numeroPuro <= 0) {
        alert(`¡Ups! El campo "${elNombreDelCampo}" debe ser un número mayor a cero. Como la vida misma, ¡siempre hacia adelante!`);
        return false;
    }
    return true;
}

/**
 * Verifica que el estado de salud sea uno de los permitidos ('Sano', 'Enfermo', 'En tratamiento').
 * @param {string} elEstado - El estado de salud a validar.
 * @returns {boolean} `true` si el estado es aceptable, `false` en caso contrario.
 */
function esUnEstadoDeSaludValido(elEstado) {
    const condicionesAceptables = ['Sano', 'Enfermo', 'En tratamiento'];
    if (!condicionesAceptables.includes(elEstado)) {
        alert(`¡Error en el diagnóstico! El estado de salud debe ser "Sano", "Enfermo" o "En tratamiento". ¡No hay más opciones!`);
        return false;
    }
    return true;
}
