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

/**
 * Busca a un dueño por su número de cédula en nuestra lista.
 * @param {string} elIdentificadorDelDueño - La cédula a buscar.
 * @returns {object | undefined} El objeto dueño si se encuentra, o `undefined` si no.
 */
function encontrarDueñoPorCedula(elIdentificadorDelDueño) {
    for (let i = 0; i < losAmosDeLasMascotas.length; i++) {
        if (losAmosDeLasMascotas[i].numeroDeCedula === elIdentificadorDelDueño) {
            return losAmosDeLasMascotas[i];
        }
    }
    return undefined; // No se encontró.
}

/**
 * Busca a una mascota por su nombre en nuestra lista.
 * @param {string} elNombreAInvestigar - El nombre del animalito.
 * @returns {object | undefined} El objeto mascota si se encuentra, o `undefined` si no.
 */
function encontrarMascotaPorNombre(elNombreAInvestigar) {
    for (let i = 0; i < lasPequeñasCriaturas.length; i++) {
        if (lasPequeñasCriaturas[i].nombreDeLaMascota === elNombreAInvestigar) {
            return lasPequeñasCriaturas[i];
        }
    }
    return undefined; // No se encontró.
}

// --- Acciones de Nuestra Veterinaria (Funciones con Callbacks y setTimeout) ---

/**
 * Da de alta a un nuevo dueño, simulando un proceso de registro con su tiempo.
 * Usa setTimeout para el retraso y un callback para decirnos el resultado.
 * @param {function} elCallbackDeResultado - La función que se ejecutará al finalizar.
 */
function darDeAltaAUnDueño(elCallbackDeResultado) {
    console.log('⏳ Iniciando el ritual de bienvenida para un nuevo protector de mascotas...');
    setTimeout(function() { // Esto se ejecutará después del tiempo.
        const nombreDelDueño = prompt('¿Cuál es el nombre completo de este noble protector?');
        const cedulaDelDueño = prompt('Y su número de cédula, por favor (su identificación única):');
        const telefonoParaContactar = prompt('Un número de teléfono donde podamos contactarle si nuestros amiguitos lo necesitan:');
        const correoParaMensajes = prompt('Finalmente, su correo electrónico, para que no se pierdan las novedades:');

        // Primero, validamos que no haya campos vacíos.
        if (
            !esUnCampoValido(nombreDelDueño, 'Nombre del Dueño') ||
            !esUnCampoValido(cedulaDelDueño, 'Cédula') ||
            !esUnCampoValido(telefonoParaContactar, 'Teléfono') ||
            !esUnCampoValido(correoParaMensajes, 'Correo Electrónico')
        ) {
            elCallbackDeResultado(new Error('¡Atención! Faltan datos esenciales o están incorrectos. Es como intentar volar sin alas.'), null);
            return; // Salimos de la función si hay un error.
        }

        // Luego, revisamos que no haya un dueño con la misma cédula.
        if (encontrarDueñoPorCedula(cedulaDelDueño)) {
            elCallbackDeResultado(new Error(`¡Alarma! Ya tenemos un dueño registrado con la cédula "${cedulaDelDueño}". ¡No podemos duplicar identidades!`), null);
            return; // Salimos de la función.
        }

        // Si todo está bien, creamos el nuevo dueño.
        const esteNuevoDueño = {
            identificadorUnico: forjarIdentificadorUnico(),
            nombreCompleto: nombreDelDueño,
            numeroDeCedula: cedulaDelDueño,
            telefonoDeContacto: telefonoParaContactar,
            correoElectronico: correoParaMensajes
        };

        losAmosDeLasMascotas.push(esteNuevoDueño); // Lo añadimos a nuestra lista.
        console.log('🎉 ¡El protector de mascotas ha sido registrado con éxito! (La simulación de validación ha concluido).');
        elCallbackDeResultado(null, esteNuevoDueño); // No hay error (null), y enviamos el nuevo dueño.
    }, 1500); // Se toma 1.5 segundos para "validar" la información.
}

/**
 * Añade un nuevo animalito a nuestro censo, pero primero verificamos que su dueño exista.
 * Usa setTimeout para el retraso y un callback para decirnos el resultado.
 * @param {function} elCallbackDeResultado - La función a invocar al finalizar.
 */
function añadirUnNuevoAnimalito(elCallbackDeResultado) {
    console.log('⏳ Iniciando el registro de un nuevo ser peludo, emplumado o escamoso...');
    setTimeout(function() { // Esto se ejecutará después del tiempo.
        const nombreDelAmiguito = prompt('¿Cómo se llama este nuevo y adorable ser?');
        const tipoDeCriatura = prompt('¿Qué tipo de criatura es? (Perro, Gato, Ave, Reptil, Otro)');
        const añosDeVida = prompt('¿Cuántos años de aventura lleva?');
        const pesoEnKilos = prompt('¿Cuál es su peso en kilogramos? (¡No te olvides de su figura!)');
        const estadoDeSalud = prompt('¿Cuál es su estado de salud actual? (Sano, Enfermo, En tratamiento)');
        const cedulaDelDueñoAsociado = prompt('Por favor, la cédula del dueño de este animalito. ¡Necesitamos saber quién le cuida!');

        // Inspección inicial de los datos de la mascota.
        if (
            !esUnCampoValido(nombreDelAmiguito, 'Nombre del Animalito') ||
            !esUnCampoValido(tipoDeCriatura, 'Especie') ||
            !esUnCampoValido(estadoDeSalud, 'Estado de Salud') ||
            !esUnCampoValido(cedulaDelDueñoAsociado, 'Cédula del Dueño') ||
            !esUnNumeroPositivoValido(añosDeVida, 'Edad') ||
            !esUnNumeroPositivoValido(pesoEnKilos, 'Peso') ||
            !esUnEstadoDeSaludValido(estadoDeSalud)
        ) {
            elCallbackDeResultado(new Error('¡Datos del animalito incompletos o incorrectos! Es como un rompecabezas con piezas faltantes.'), null);
            return;
        }

        // Momento crucial: verificar que el dueño esté en nuestros registros.
        const elDueñoExistente = encontrarDueñoPorCedula(cedulaDelDueñoAsociado);
        if (!elDueñoExistente) {
            elCallbackDeResultado(new Error(`¡Alerta! No encontramos un dueño con la cédula "${cedulaDelDueñoAsociado}". ¡Un animalito necesita un protector registrado!`), null);
            return;
        }

        // Revisamos si ya hay una mascota con este nombre.
        if (encontrarMascotaPorNombre(nombreDelAmiguito)) {
            elCallbackDeResultado(new Error(`¡Ups! Ya tenemos un animalito con el nombre "${nombreDelAmiguito}". ¡Cada criatura merece un nombre único!`), null);
            return;
        }

        // Si todo va bien, creamos la nueva mascota.
        const nuevaCriatura = {
            identificadorUnico: forjarIdentificadorUnico(),
            nombreDeLaMascota: nombreDelAmiguito,
            tipoDeEspecie: tipoDeCriatura,
            añosDeVida: Number(añosDeVida),
            pesoEnKilos: Number(pesoEnKilos),
            estadoDeSaludActual: estadoDeSalud,
            identificadorDelDueño: elDueñoExistente.identificadorUnico // Asociamos al dueño encontrado
        };

        lasPequeñasCriaturas.push(nuevaCriatura); // La añadimos a nuestra lista.
        console.log('🐾 ¡El nuevo animalito ha sido registrado con éxito! (La verificación del dueño ha finalizado).');
        elCallbackDeResultado(null, nuevaCriatura); // No hay error (null), y enviamos la nueva mascota.
    }, 2000); // Se toma 2 segundos para "validar" la existencia del dueño.
}

/**
 * Muestra el listado completo de todos los animalitos en nuestra clínica.
 * Esta es una función sincrónica, no necesita esperar.
 */
function verTodosLosAnimalitos() {
    console.log('\n--- El Gran Listado de Todas las Pequeñas Criaturas ---');
    if (lasPequeñasCriaturas.length === 0) {
        console.log('¡Vaya! Nuestro censo de animalitos está un poco vacío. ¡Anímate a registrar a un nuevo amigo!');
        return;
    }
    // Recorremos la lista de mascotas y mostramos sus detalles.
    for (let i = 0; i < lasPequeñasCriaturas.length; i++) {
        const mascota = lasPequeñasCriaturas[i];
        let nombreDelProtector = 'Dueño Desconocido'; // Por si no encontramos al dueño.

        // Buscamos al dueño por su ID.
        for (let j = 0; j < losAmosDeLasMascotas.length; j++) {
            if (losAmosDeLasMascotas[j].identificadorUnico === mascota.identificadorDelDueño) {
                nombreDelProtector = losAmosDeLasMascotas[j].nombreCompleto;
                break; // Ya lo encontramos, no necesitamos seguir buscando.
            }
        }

        console.log(`
            ID Universal: ${mascota.identificadorUnico}
            Nombre: ${mascota.nombreDeLaMascota}
            Especie: ${mascota.tipoDeEspecie}
            Edad: ${mascota.añosDeVida} añitos
            Peso: ${mascota.pesoEnKilos} kg
            Estado de Salud: ${mascota.estadoDeSaludActual}
            Protector: ${nombreDelProtector} (ID del Protector: ${mascota.identificadorDelDueño})
            ------------------------------------------------
        `);
    }
    console.log('--- Fin del Gran Listado ---');
}

/**
 * Busca a un animalito por su nombre. Esta función también tomará un tiempo.
 * Usa setTimeout para el retraso y un callback para decirnos si lo encontró o no.
 * @param {function} elCallbackDeResultado - La función a invocar al finalizar.
 */
function buscarAnimalitoPorSuNombre(elCallbackDeResultado) {
    console.log('⏳ Un detective en busca de un nombre... Buscando al animalito...');
    setTimeout(function() { // Esto se ejecutará después del tiempo.
        const elNombreBuscado = prompt('¿Qué nombre tiene el animalito que buscas en nuestros registros?');
        if (!esUnCampoValido(elNombreBuscado, 'Nombre del Animalito para Buscar')) {
            elCallbackDeResultado(new Error('¡Para buscar, necesitas dar un nombre! No podemos adivinar.'), null);
            return;
        }

        const mascotaEncontrada = encontrarMascotaPorNombre(elNombreBuscado);
        if (mascotaEncontrada) {
            let nombreDelProtector = 'Dueño Desconocido';
            for (let i = 0; i < losAmosDeLasMascotas.length; i++) {
                if (losAmosDeLasMascotas[i].identificadorUnico === mascotaEncontrada.identificadorDelDueño) {
                    nombreDelProtector = losAmosDeLasMascotas[i].nombreCompleto;
                    break;
                }
            }
            console.log(`\n--- ¡Encontramos a "${mascotaEncontrada.nombreDeLaMascota}"! ---
                ID Universal: ${mascotaEncontrada.identificadorUnico}
                Nombre: ${mascotaEncontrada.nombreDeLaMascota}
                Especie: ${mascotaEncontrada.tipoDeEspecie}
                Edad: ${mascotaEncontrada.añosDeVida} añitos
                Peso: ${mascotaEncontrada.pesoEnKilos} kg
                Estado de Salud: ${mascotaEncontrada.estadoDeSaludActual}
                Protector: ${nombreDelProtector} (ID del Protector: ${mascotaEncontrada.identificadorDelDueño})
                -------------------------------------------------`);
            elCallbackDeResultado(null, mascotaEncontrada); // No hay error, enviamos la mascota.
        } else {
            console.log(`😕 ¡Qué pena! No hemos encontrado ninguna criatura con el nombre "${elNombreBuscado}" en nuestros anales.`);
            elCallbackDeResultado(null, null); // No es un error, simplemente no se encontró.
        }
    }, 1500); // Simulamos que la búsqueda se toma 1.5 segundos.
}

/**
 * Actualiza el estado de salud de una mascota. Tomará un tiempo, como si el veterinario meditara.
 * Usa setTimeout y un callback para el resultado.
 * @param {function} elCallbackDeResultado - La función a invocar al finalizar.
 */
function actualizarElCuidadoDeUnAnimalito(elCallbackDeResultado) {
    console.log('⏳ El veterinario está consultando sus libros... Preparando la actualización de salud...');
    setTimeout(function() { // Esto se ejecutará después del tiempo.
        console.log('El veterinario ha tomado una decisión. ¡Continuemos!');

        const nombreDelPaciente = prompt('¿Cuál es el nombre del animalito cuyo estado de salud vamos a ajustar?');
        if (!esUnCampoValido(nombreDelPaciente, 'Nombre del Paciente')) {
            elCallbackDeResultado(new Error('¡Necesitas un nombre para actualizar el estado! No podemos adivinar al paciente.'), null);
            return;
        }

        const elPaciente = encontrarMascotaPorNombre(nombreDelPaciente);
        if (!elPaciente) {
            alert(`¡Cielos! No encontramos a ninguna criatura con el nombre "${nombreDelPaciente}". ¿Estás seguro de que existe?`);
            elCallbackDeResultado(null, null); // No es un error, solo que no se encontró.
            return;
        }

        const elNuevoEstado = prompt(`El estado actual de "${elPaciente.nombreDeLaMascota}" es "${elPaciente.estadoDeSaludActual}". ¿Cuál es su nuevo estado? (Sano, Enfermo, En tratamiento)`);

        if (!esUnCampoValido(elNuevoEstado, 'Nuevo Estado de Salud') || !esUnEstadoDeSaludValido(elNuevoEstado)) {
            alert('¡El nuevo estado de salud no es válido! Por favor, revisa las opciones permitidas.');
            elCallbackDeResultado(new Error('Estado de salud inválido.'), null);
            return;
        }

        elPaciente.estadoDeSaludActual = elNuevoEstado; // ¡Actualización exitosa!
        console.log(`✅ ¡Magnífico! El estado de salud de "${elPaciente.nombreDeLaMascota}" ha sido actualizado a "${elNuevoEstado}". ¡Esperamos su pronta recuperación!`);
        elCallbackDeResultado(null, elPaciente); // No hay error, enviamos la mascota actualizada.
    }, 1000); // Simula la "meditación" del veterinario por 1 segundo.
}

/**
 * Elimina una mascota de nuestros registros, pero con una pausa para la confirmación.
 * Usa setTimeout y un callback para el resultado.
 * @param {function} elCallbackDeResultado - La función a invocar al finalizar.
 */
function decirAdiosAUnAnimalito(elCallbackDeResultado) {
    console.log('⏳ Preparando el emotivo momento de decir adiós a un registro...');
    setTimeout(function() { // Esto se ejecutará después del tiempo.
        const nombreDelDespedida = prompt('¿Cuál es el nombre del animalito que se despide de nuestros registros?');
        if (!esUnCampoValido(nombreDelDespedida, 'Nombre del Animalito para Eliminar')) {
            elCallbackDeResultado(new Error('¡Para despedir a un animalito, necesitamos su nombre!'), null);
            return;
        }

        let indiceParaEliminar = -1; // Buscamos la posición de la mascota.
        for (let i = 0; i < lasPequeñasCriaturas.length; i++) {
            if (lasPequeñasCriaturas[i].nombreDeLaMascota === nombreDelDespedida) {
                indiceParaEliminar = i;
                break;
            }
        }

        if (indiceParaEliminar === -1) {
            alert(`¡Mascota no encontrada! Parece que "${nombreDelDespedida}" ya se ha ido o nunca estuvo aquí.`);
            elCallbackDeResultado(null, false); // No es un error, solo que no se encontró.
            return;
        }

        // Una pausa para la confirmación, ¡las decisiones importantes se piensan!
        const seConfirmaLaAccion = confirm(`¿Estás completamente seguro de borrar a "${nombreDelDespedida}" de nuestros registros? Esta acción es como borrar un recuerdo, ¡no tiene vuelta atrás!`);
        if (seConfirmaLaAccion) {
            lasPequeñasCriaturas.splice(indiceParaEliminar, 1); // Lo eliminamos.
            console.log(`🗑️ ¡Adiós! "${nombreDelDespedida}" ha sido retirado de nuestros anales. ¡Que descanse en la memoria digital!`);
            elCallbackDeResultado(null, true); // No hay error, y confirmamos la eliminación.
        } else {
            console.log(`"Phew", "${nombreDelDespedida}" se queda con nosotros. ¡La decisión ha sido revocada!`);
            elCallbackDeResultado(null, false); // No hay error, y confirmamos que no se eliminó.
        }
    }, 2000); // Damos 2 segundos para que el usuario reflexione antes de confirmar.
}

/**
 * Muestra todos los animalitos que pertenecen a un dueño específico, como si abriéramos su álbum familiar.
 * Usa setTimeout y un callback para el resultado.
 * @param {function} elCallbackDeResultado - La función a invocar al finalizar.
 */
function verLosAnimalitosDeUnDueño(elCallbackDeResultado) {
    console.log('⏳ Abriendo el álbum familiar de mascotas de un protector... Esto puede tardar un momento...');
    setTimeout(function() { // Esto se ejecutará después del tiempo.
        console.log('¡Álbum cargado! Listos para mostrar las fotos.');

        const cedulaDelDueñoParaBuscar = prompt('Para abrir el álbum, ¿cuál es la cédula del protector?');
        if (!esUnCampoValido(cedulaDelDueñoParaBuscar, 'Cédula del Dueño')) {
            elCallbackDeResultado(new Error('¡Necesitas una cédula para ver el álbum!'), null);
            return;
        }

        const elProtectorObjetivo = encontrarDueñoPorCedula(cedulaDelDueñoParaBuscar);
        if (!elProtectorObjetivo) {
            alert(`¡Oh no! No encontramos a ningún protector con la cédula "${cedulaDelDueñoParaBuscar}". ¿Estás seguro de que lo tenemos registrado?`);
            elCallbackDeResultado(null, null); // No es error, no se encontró el dueño.
            return;
        }

        const lasCriaturasDelProtector = [];
        for (let i = 0; i < lasPequeñasCriaturas.length; i++) {
            if (lasPequeñasCriaturas[i].identificadorDelDueño === elProtectorObjetivo.identificadorUnico) {
                lasCriaturasDelProtector.push(lasPequeñasCriaturas[i]);
            }
        }

        console.log(`\n--- El Elenco de Animalitos de ${elProtectorObjetivo.nombreCompleto} (Cédula: ${elProtectorObjetivo.numeroDeCedula}) ---`);
        if (lasCriaturasDelProtector.length === 0) {
            console.log(`Parece que ${elProtectorObjetivo.nombreCompleto} es un protector muy nuevo, ¡aún no tiene animalitos registrados con nosotros!`);
            elCallbackDeResultado(null, []); // No hay error, pero la lista está vacía.
            return;
        }

        for (let i = 0; i < lasCriaturasDelProtector.length; i++) {
            const mascota = lasCriaturasDelProtector[i];
            console.log(`
                ID Universal: ${mascota.identificadorUnico}
                Nombre: ${mascota.nombreDeLaMascota}
                Especie: ${mascota.tipoDeEspecie}
                Edad: ${mascota.añosDeVida} añitos
                Peso: ${mascota.pesoEnKilos} kg
                Estado de Salud: ${mascota.estadoDeSaludActual}
                ------------------------------------------------
            `);
        }
        console.log('--- Fin del Álbum del Protector ---');
        elCallbackDeResultado(null, lasCriaturasDelProtector); // No hay error, enviamos la lista de mascotas.
    }, 2000); // Simula la carga de información por 2 segundos.
}

// --- El Gran Director de Orquesta: Menú Principal y sus Decisiones ---

/**
 * Inicia la gran gestión de nuestra veterinaria, el corazón del sistema.
 * Es un bucle que se repite hasta que el usuario decida salir.
 */
function iniciarGestionVeterinaria() {
    let elShowDebeContinuar = true; // Nuestra bandera para seguir o parar el programa.

    // Usamos una función interna para mostrar el menú y pedir la opción,
    // así podemos llamarla de nuevo después de cada operación asíncrona.
    function mostrarMenuYPedirOpcion() {
        if (!elShowDebeContinuar) {
            return; // Si ya decidimos salir, no mostramos el menú.
        }

        const laOpcionSeleccionada = prompt(`
            🏥 BIENVENIDOS A 'EL RINCÓN DEL AMIGUITO' 🐾
            
            ¡Tu destino para el cuidado de mascotas!
            
            Por favor, elige tu próxima acción ingresando el número correspondiente:
            
            1. 🏡 Dar De Alta A Un Protector (Dueño)
            2. 🐾 Añadir Un Nuevo Pequeño Amiguito (Mascota)
            3. 📖 Ver El Gran Censo de Todos Los Amiguitos
            4. 🔍 Buscar Un Amiguito Por Su Nombre
            5. ❤️‍🩹 Actualizar El Cuidado De Un Amiguito
            6. 👋 Decir Adiós A Un Amiguito (Eliminar)
            7. 👨‍👩‍👧‍👦 Ver Los Amiguitos de Un Protector
            8. 🚪 Cerrar Las Puertas del Programa
            
            ------------------------------------------
            ✨ Resumen Actual:
            Amiguitos Registrados: ${lasPequeñasCriaturas.length} | Protectores Registrados: ${losAmosDeLasMascotas.length}
        `);

        switch (laOpcionSeleccionada) {
            case '1': // Dar de alta a un dueño (asíncrono con callback)
                darDeAltaAUnDueño(function(unError, elDueñoRecienCreado) {
                    if (unError) {
                        alert(`¡Problema al registrar al protector!: ${unError.message}`);
                        console.error(`ERROR (Dar de Alta Dueño):`, unError);
                    } else {
                        alert(`¡Bienvenido! El protector "${elDueñoRecienCreado.nombreCompleto}" ha sido añadido a la familia.`);
                        console.log('✨ Nuevo Protector Registrado:', elDueñoRecienCreado);
                    }
                    // Después de la operación asíncrona, volvemos a mostrar el menú.
                    mostrarMenuYPedirOpcion();
                });
                break;

            case '2': // Añadir una nueva mascota (asíncrono con callback)
                añadirUnNuevoAnimalito(function(unError, laNuevaMascota) {
                    if (unError) {
                        alert(`¡Problema al añadir al amiguito!: ${unError.message}`);
                        console.error(`ERROR (Añadir Animalito):`, unError);
                    } else {
                        alert(`¡Hurra! El amiguito "${laNuevaMascota.nombreDeLaMascota}" ya es parte de nuestra clínica.`);
                        console.log('🐾 Nueva Criatura Añadida:', laNuevaMascota);
                    }
                    // Después de la operación asíncrona, volvemos a mostrar el menú.
                    mostrarMenuYPedirOpcion();
                });
                break;

            case '3': // Listar todas las mascotas (sincrónico)
                verTodosLosAnimalitos();
                // Como es sincrónico, podemos mostrar el menú de inmediato.
                mostrarMenuYPedirOpcion();
                break;

            case '4': // Buscar mascota por nombre (asíncrono con callback)
                buscarAnimalitoPorSuNombre(function(unError, mascotaHallada) {
                    if (unError) {
                        alert(`¡Problema al buscar al amiguito!: ${unError.message}`);
                        console.error(`ERROR (Buscar Animalito):`, unError);
                    } else if (mascotaHallada) {
                        // El mensaje de éxito ya se muestra dentro de la función buscarAnimalitoPorSuNombre
                    } else {
                        // El mensaje de no encontrado ya se muestra dentro de la función buscarAnimalitoPorSuNombre
                    }
                    mostrarMenuYPedirOpcion();
                });
                break;

            case '5': // Actualizar estado de salud de mascota (asíncrono con callback)
                actualizarElCuidadoDeUnAnimalito(function(unError, mascotaActualizada) {
                    if (unError) {
                        alert(`¡Problema al actualizar al amiguito!: ${unError.message}`);
                        console.error(`ERROR (Actualizar Animalito):`, unError);
                    } else if (mascotaActualizada) {
                         // El mensaje de éxito ya se muestra dentro de la función actualizarElCuidadoDeUnAnimalito
                    } else {
                         // El mensaje de no encontrado ya se muestra dentro de la función actualizarElCuidadoDeUnAnimalito
                    }
                    mostrarMenuYPedirOpcion();
                });
                break;

            case '6': // Eliminar mascota por nombre (asíncrono con callback y confirmación)
                decirAdiosAUnAnimalito(function(unError, seElimino) {
                    if (unError) {
                        alert(`¡Problema al despedir al amiguito!: ${unError.message}`);
                        console.error(`ERROR (Eliminar Animalito):`, unError);
                    } else if (seElimino === true) {
                        // El mensaje de éxito ya se muestra dentro de la función decirAdiosAUnAnimalito
                    } else {
                        // El mensaje de no encontrado o cancelado ya se muestra dentro de la función decirAdiosAUnAnimalito
                    }
                    mostrarMenuYPedirOpcion();
                });
                break;

            case '7': // Ver mascotas de un dueño (asíncrono con callback)
                verLosAnimalitosDeUnDueño(function(unError, listaDeMascotas) {
                    if (unError) {
                        alert(`¡Problema al ver los amiguitos del protector!: ${unError.message}`);
                        console.error(`ERROR (Ver Mascotas de Dueño):`, unError);
                    } else {
                        // Los mensajes de éxito o lista vacía ya se muestran dentro de la función verLosAnimalitosDeUnDueño
                    }
                    mostrarMenuYPedirOpcion();
                });
                break;

            case '8': // Salir del programa
                alert('¡Gracias por confiar en "El Rincón del Amiguito"! ¡Esperamos verte pronto!');
                console.log('🚪 El programa ha cerrado sus puertas. ¡Hasta la próxima!');
                elShowDebeContinuar = false; // Detenemos el bucle al establecer esta bandera en falso.
                break;

            default: // Opción no reconocida
                alert('¡Vaya! Esa opción no está en nuestro menú. Por favor, elige un número del 1 al 8.');
                // Como fue un error, volvemos a mostrar el menú.
                mostrarMenuYPedirOpcion();
                break;
        }
    }

    // ¡El gran lanzamiento! Iniciamos mostrando el menú por primera vez.
    mostrarMenuYPedirOpcion();
}

// Llama a la función principal cuando la página esté completamente cargada.
window.onload = iniciarGestionVeterinaria;