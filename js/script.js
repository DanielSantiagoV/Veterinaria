// 🐶 Colecciones de Datos 🐱
const listaDueños = [];
const listaMascotas = [];

// 🛠️ Funciones Utilitarias 🛠️

/**
 * Genera un ID único para cada entidad.
 * @returns {string} Un ID único.
 */
const generarIdUnico = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

/**
 * Valida que un campo de texto no esté vacío.
 * @param {string} valor - El valor a validar.
 * @param {string} nombreCampo - Nombre descriptivo del campo.
 * @returns {boolean} `true` si es válido, `false` si está vacío.
 */
const validarCampoTexto = (valor, nombreCampo) => {
    if (typeof valor !== 'string' || valor.trim() === '') {
        alert(`❌ Error: El campo "${nombreCampo}" no puede estar vacío.`);
        return false;
    }
    return true;
};

/**
 * Valida que un valor sea un número positivo.
 * @param {any} valorNum - El valor a validar.
 * @param {string} nombreCampo - Nombre descriptivo del campo.
 * @returns {boolean} `true` si es un número positivo válido, `false` en caso contrario.
 */
const validarNumeroPositivo = (valorNum, nombreCampo) => {
    const numero = Number(valorNum);
    if (isNaN(numero) || numero <= 0) {
        alert(`⚠️ Error: El campo "${nombreCampo}" debe ser un número positivo.`);
        return false;
    }
    return true;
};

/**
 * Valida que el estado de salud sea uno de los permitidos.
 * @param {string} estado - El estado a validar.
 * @returns {boolean} `true` si es válido, `false` en caso contrario.
 */
const validarEstadoSalud = (estado) => {
    const estadosPermitidos = ['Sano', 'Enfermo', 'En tratamiento'];
    if (!estadosPermitidos.includes(estado)) {
        alert(`🚫 Error: El estado de salud debe ser "Sano", "Enfermo" o "En tratamiento".`);
        return false;
    }
    return true;
};

/**
 * Busca un dueño por su número de cédula.
 * @param {string} cedula - La cédula a buscar.
 * @returns {object | undefined} Objeto dueño si existe, `undefined` si no.
 */
const encontrarDueñoPorCedula = (cedula) => {
    return listaDueños.find(dueño => dueño.cedula === cedula);
};

/**
 * Busca una mascota por su nombre.
 * @param {string} nombre - El nombre de la mascota a buscar.
 * @returns {object | undefined} Objeto mascota si existe, `undefined` si no.
 */
const encontrarMascotaPorNombre = (nombre) => {
    return listaMascotas.find(mascota => mascota.nombre === nombre);
};

// ⏳ Funciones Asíncronas (Callbacks, Promesas, Async/Await) ⏳

/**
 * 📝 Registra un nuevo dueño (usando Callbacks).
 * Simula validación de datos con 1.5 segundos de retraso.
 * @param {function} callback - `(error, nuevoDueño)`
 */
const registrarDueño = (callback) => {
    console.log('⏳ Procesando: Registro de nuevo dueño...');
    setTimeout(() => {
        const nombre = prompt('📋 Nombre completo del dueño:');
        const cedula = prompt('🆔 Número de cédula:');
        const telefono = prompt('📞 Número de teléfono:');
        const email = prompt('📧 Correo electrónico:');

        if (
            !validarCampoTexto(nombre, 'Nombre del Dueño') ||
            !validarCampoTexto(cedula, 'Cédula') ||
            !validarCampoTexto(telefono, 'Teléfono') ||
            !validarCampoTexto(email, 'Correo Electrónico')
        ) {
            callback(new Error('❌ Datos de dueño incompletos o inválidos.'), null);
            return;
        }

        if (encontrarDueñoPorCedula(cedula)) {
            callback(new Error(`⚠️ Error: Ya existe un dueño con la cédula "${cedula}".`), null);
            return;
        }

        const nuevoDueño = {
            id: generarIdUnico(),
            nombreCompleto: nombre,
            cedula: cedula,
            telefono: telefono,
            email: email
        };

        listaDueños.push(nuevoDueño);
        console.log('✅ Registro de dueño completado.');
        callback(null, nuevoDueño);
    }, 1500); // Retraso de 1.5 segundos
};

/**
 * 🐾 Registra una nueva mascota (usando Callbacks).
 * Simula validación de existencia del dueño con 2 segundos de retraso.
 * @param {function} callback - `(error, nuevaMascota)`
 */
const registrarMascota = (callback) => {
    console.log('⏳ Procesando: Registro de nueva mascota...');
    setTimeout(() => {
        const nombreMascota = prompt('🐶 Nombre de la mascota:');
        const especie = prompt('🐱 Especie (Perro, Gato, Ave, Reptil, Otro):');
        const edad = prompt('🎂 Edad en años:');
        const peso = prompt('⚖️ Peso en kilogramos:');
        const estadoSalud = prompt('🩺 Estado de salud (Sano, Enfermo, En tratamiento):');
        const cedulaDueño = prompt('🆔 Cédula del dueño (debe existir):');

        if (
            !validarCampoTexto(nombreMascota, 'Nombre de la Mascota') ||
            !validarCampoTexto(especie, 'Especie') ||
            !validarCampoTexto(estadoSalud, 'Estado de Salud') ||
            !validarCampoTexto(cedulaDueño, 'Cédula del Dueño') ||
            !validarNumeroPositivo(edad, 'Edad') ||
            !validarNumeroPositivo(peso, 'Peso') ||
            !validarEstadoSalud(estadoSalud)
        ) {
            callback(new Error('❌ Datos de mascota incompletos o inválidos.'), null);
            return;
        }

        const dueñoExistente = encontrarDueñoPorCedula(cedulaDueño);
        if (!dueñoExistente) {
            callback(new Error(`⚠️ Error: Dueño con cédula "${cedulaDueño}" no encontrado.`), null);
            return;
        }

        if (encontrarMascotaPorNombre(nombreMascota)) {
            callback(new Error(`⚠️ Error: Ya existe una mascota con el nombre "${nombreMascota}".`), null);
            return;
        }

        const nuevaMascota = {
            id: generarIdUnico(),
            nombre: nombreMascota,
            especie: especie,
            edad: Number(edad),
            peso: Number(peso),
            estadoSalud: estadoSalud,
            idDueño: dueñoExistente.id
        };

        listaMascotas.push(nuevaMascota);
        console.log('✅ Registro de mascota completado.');
        callback(null, nuevaMascota);
    }, 2000); // Retraso de 2 segundos
};

/**
 * 🔍 Busca una mascota por su nombre (usando Promesas).
 * Simula tiempo de búsqueda de 1.5 segundos.
 * @returns {Promise<object | null>} Promesa que resuelve con la mascota encontrada o `null`.
 */
const buscarMascotaPorNombre = () => {
    return new Promise((resolve, reject) => {
        console.log('⏳ Buscando mascota...');
        setTimeout(() => {
            const nombreBusqueda = prompt('🔎 Nombre de la mascota a buscar:');
            if (!validarCampoTexto(nombreBusqueda, 'Nombre de la Mascota para Buscar')) {
                reject(new Error('❌ Debe ingresar un nombre para buscar.'));
                return;
            }

            const mascotaEncontrada = encontrarMascotaPorNombre(nombreBusqueda);
            if (mascotaEncontrada) {
                const dueño = listaDueños.find(d => d.id === mascotaEncontrada.idDueño);
                const nombreDueño = dueño ? dueño.nombreCompleto : 'Desconocido';
                console.log(`\n--- ✨ Mascota Encontrada ✨ ---
                    ID: ${mascotaEncontrada.id}
                    Nombre: ${mascotaEncontrada.nombre}
                    Especie: ${mascotaEncontrada.especie}
                    Edad: ${mascotaEncontrada.edad} años
                    Peso: ${mascotaEncontrada.peso} kg
                    Estado: ${mascotaEncontrada.estadoSalud}
                    Dueño: ${nombreDueño}
                    ------------------------------------`);
                resolve(mascotaEncontrada);
            } else {
                console.log(`😕 Mascota "${nombreBusqueda}" no encontrada.`);
                resolve(null); // Resolve con null si no se encuentra, no es un error de proceso.
            }
        }, 1500); // Retraso de 1.5 segundos
    });
};

/**
 * ❤️‍🩹 Actualiza el estado de salud de una mascota (usando async/await).
 * Simula espera del veterinario durante 1 segundo.
 */
const actualizarEstadoMascota = async () => {
    console.log('⏳ Procesando: Actualización de estado de salud...');
    // Simulamos la espera del veterinario con una promesa que envuelve setTimeout
    await new Promise(resolve => setTimeout(resolve, 1000)); // Retraso de 1 segundo

    console.log('🩺 Veterinario listo para la actualización.');

    const nombreMascota = prompt('📝 Nombre de la mascota a actualizar:');
    if (!validarCampoTexto(nombreMascota, 'Nombre de la Mascota')) {
        alert('❌ Debe ingresar el nombre de la mascota.');
        return;
    }

    const mascota = encontrarMascotaPorNombre(nombreMascota);
    if (!mascota) {
        alert(`⚠️ Mascota "${nombreMascota}" no encontrada.`);
        return;
    }

    const nuevoEstado = prompt(`Estado actual: "${mascota.estadoSalud}". Ingrese nuevo estado (Sano, Enfermo, En tratamiento):`);

    if (!validarCampoTexto(nuevoEstado, 'Nuevo Estado de Salud') || !validarEstadoSalud(nuevoEstado)) {
        alert('🚫 El nuevo estado de salud no es válido.');
        return;
    }

    mascota.estadoSalud = nuevoEstado;
    console.log(`✅ Estado de "${mascota.nombre}" actualizado a "${nuevoEstado}".`);
    alert(`✅ Estado de "${mascota.nombre}" actualizado a "${nuevoEstado}".`);
};

/**
 * 🗑️ Elimina una mascota del registro (usando Promesas + confirmación).
 * Confirmación tras 2 segundos.
 * @returns {Promise<boolean>} Promesa que resuelve a `true` si se eliminó, `false` si no.
 */
const eliminarMascota = () => {
    return new Promise((resolve, reject) => {
        console.log('⏳ Procesando: Eliminación de mascota...');
        setTimeout(() => {
            const nombreMascota = prompt('🚮 Nombre de la mascota a eliminar:');
            if (!validarCampoTexto(nombreMascota, 'Nombre de la Mascota para Eliminar')) {
                reject(new Error('❌ Debe ingresar el nombre de la mascota.'));
                return;
            }

            let indiceParaEliminar = listaMascotas.findIndex(m => m.nombre === nombreMascota);

            if (indiceParaEliminar === -1) {
                alert(`⚠️ Mascota "${nombreMascota}" no encontrada.`);
                resolve(false); // No se elimina, pero no es un error de proceso.
                return;
            }

            const confirmar = confirm(`¿Confirma eliminar a "${nombreMascota}"? Esta acción es irreversible. (Después de 2 segundos de confirmación)`);
            if (confirmar) {
                listaMascotas.splice(indiceParaEliminar, 1);
                console.log(`🗑️ Mascota "${nombreMascota}" eliminada.`);
                alert(`🗑️ Mascota "${nombreMascota}" eliminada.`);
                resolve(true);
            } else {
                console.log(`❌ Eliminación de "${nombreMascota}" cancelada.`);
                alert(`❌ Eliminación de "${nombreMascota}" cancelada.`);
                resolve(false);
            }
        }, 2000); // Retraso de 2 segundos
    });
};

/**
 * 👨‍👩‍👧‍👦 Muestra las mascotas asociadas a un dueño (usando async/await).
 * Simula carga de información con retardo de 2 segundos.
 */
const verMascotasPorDueño = async () => {
    console.log('⏳ Procesando: Búsqueda de mascotas por dueño...');
    // Simulamos la carga de información
    await new Promise(resolve => setTimeout(resolve, 2000)); // Retraso de 2 segundos

    const cedulaDueño = prompt('🆔 Cédula del dueño para listar sus mascotas:');
    if (!validarCampoTexto(cedulaDueño, 'Cédula del Dueño')) {
        alert('❌ Debe ingresar la cédula del dueño.');
        return;
    }

    const dueño = encontrarDueñoPorCedula(cedulaDueño);
    if (!dueño) {
        alert(`⚠️ Dueño con cédula "${cedulaDueño}" no encontrado.`);
        return;
    }

    const mascotasDelDueño = listaMascotas.filter(mascota => mascota.idDueño === dueño.id);

    console.log(`\n--- 🐾 Mascotas de ${dueño.nombreCompleto} (Cédula: ${dueño.cedula}) 🐾 ---`);
    if (mascotasDelDueño.length === 0) {
        console.log(`😕 No hay mascotas registradas para ${dueño.nombreCompleto}.`);
        alert(`😕 No hay mascotas registradas para ${dueño.nombreCompleto}.`);
        return;
    }

    mascotasDelDueño.forEach(mascota => {
        console.log(`
            ID: ${mascota.id}
            Nombre: ${mascota.nombre}
            Especie: ${mascota.especie}
            Edad: ${mascota.edad} años
            Peso: ${mascota.peso} kg
            Estado: ${mascota.estadoSalud}
            ------------------------------------
        `);
    });
    console.log('--- Fin del Listado por Dueño ---');
    alert(`✅ Listado de mascotas de ${dueño.nombreCompleto} mostrado en consola.`);
};


/**
 * 📖 Lista todas las mascotas registradas (sincrónico).
 */
const listarTodasLasMascotas = () => {
    console.log('\n--- 📖 Listado de Todas las Mascotas 📖 ---');
    if (listaMascotas.length === 0) {
        console.log('😕 No hay mascotas registradas.');
        return;
    }

    listaMascotas.forEach(mascota => {
        const dueño = listaDueños.find(d => d.id === mascota.idDueño);
        const nombreDueño = dueño ? dueño.nombreCompleto : 'Desconocido';
        console.log(`
            ID: ${mascota.id}
            Nombre: ${mascota.nombre}
            Especie: ${mascota.especie}
            Edad: ${mascota.edad} años
            Peso: ${mascota.peso} kg
            Estado: ${mascota.estadoSalud}
            Dueño: ${nombreDueño}
            ------------------------------------
        `);
    });
    console.log('--- Fin del Listado ---');
};


// 🚦 Función Principal del Menú 🚦

/**
 * Inicia la aplicación de gestión veterinaria, mostrando el menú principal.
 */
const iniciarGestionVeterinaria = async () => { // Marcamos como async para poder usar await
    let continuarEjecucion = true;

    while (continuarEjecucion) { // Usamos un bucle while para mantener el menú
        const opcionSeleccionada = prompt(`
            🏥 SISTEMA DE GESTIÓN VETERINARIA 'EL RINCÓN DEL AMIGUITO' 🐾

            Seleccione una opción:

            1. 🏡 Registrar Dueño
            2. 🐾 Registrar Mascota
            3. 📖 Listar Todas las Mascotas
            4. 🔍 Buscar Mascota por Nombre
            5. ❤️‍🩹 Actualizar Estado de Salud de Mascota
            6. 🗑️ Eliminar Mascota
            7. 👨‍👩‍👧‍👦 Ver Mascotas de un Dueño
            8. 🚪 Salir del Programa

            ------------------------------------
            Total Mascotas: ${listaMascotas.length} | Total Dueños: ${listaDueños.length}
        `);

        // Usamos un switch para gestionar las opciones
        switch (opcionSeleccionada) {
            case '1':
                registrarDueño((error, dueño) => {
                    if (error) {
                        alert(error.message);
                        console.error('🚫 ERROR en Registro de Dueño:', error);
                    } else {
                        alert(`✅ Dueño "${dueño.nombreCompleto}" registrado con éxito.`);
                        console.log('🏡 Dueño registrado:', dueño);
                    }
                });
                break;
            case '2':
                registrarMascota((error, mascota) => {
                    if (error) {
                        alert(error.message);
                        console.error('🚫 ERROR en Registro de Mascota:', error);
                    } else {
                        alert(`✅ Mascota "${mascota.nombre}" registrada con éxito.`);
                        console.log('🐾 Mascota registrada:', mascota);
                    }
                });
                break;
            case '3':
                listarTodasLasMascotas();
                break;
            case '4':
                try {
                    const mascotaEncontrada = await buscarMascotaPorNombre();
                    if (mascotaEncontrada) {
                        alert(`✅ Mascota "${mascotaEncontrada.nombre}" encontrada. Detalles en consola.`);
                    } else {
                        alert(`😕 Mascota no encontrada.`);
                    }
                } catch (error) {
                    alert(`❌ Error al buscar mascota: ${error.message}`);
                    console.error('🚫 ERROR en Búsqueda de Mascota:', error);
                }
                break;
            case '5':
                await actualizarEstadoMascota(); // Esta función ya maneja sus propios alerts/console.log
                break;
            case '6':
                try {
                    const eliminada = await eliminarMascota();
                    if (eliminada) {
                        // El alert y console.log ya están dentro de eliminarMascota
                    } else {
                         // El alert y console.log ya están dentro de eliminarMascota
                    }
                } catch (error) {
                    alert(`❌ Error al eliminar mascota: ${error.message}`);
                    console.error('🚫 ERROR en Eliminación de Mascota:', error);
                }
                break;
            case '7':
                await verMascotasPorDueño(); // Esta función ya maneja sus propios alerts/console.log
                break;
            case '8':
                alert('👋 Saliendo del programa. ¡Gracias por usar nuestro sistema!');
                console.log('🚪 Programa finalizado.');
                continuarEjecucion = false;
                break;
            default:
                alert('🚫 Opción no válida. Por favor, ingrese un número del 1 al 8.');
                break;
        }

        // Si la operación fue asíncrona (Promesa/async/await), el bucle esperará antes de mostrar el menú de nuevo.
        // Para Callbacks, la función `mostrarMenuYGestionarOpcion` que teníamos antes, ya no es necesaria aquí en el bucle `while`.
        // El bucle `while` se encargará de mostrar el menú de nuevo una vez que la función asíncrona (llamada con await) termine.
        // Para las que usan callbacks, el bucle simplemente avanzará, y el callback ejecutará su alert.
        // Si quieres que el menú aparezca SIEMPRE después de cada operación asíncrona, incluso las de callback, tendríamos que reintroducir la recursión de `mostrarMenuYGestionarOpcion` DENTRO de los callbacks.
        // Por la simplicidad de `async/await` en el bucle, las operaciones de callback no 'pausan' el bucle de la misma forma.
        // Si necesitas que el `prompt` del menú aparezca SOLO después de que TODOS los alerts de callbacks terminen, necesitaríamos usar Promesas para TODO.
        // Para este setup mixto (callbacks, promesas, async/await), el `while` funciona bien con `async/await`.
        // Los callbacks, por su naturaleza, se ejecutan en un momento futuro, y el bucle principal no los "espera".
        // Para este proyecto, el comportamiento actual es aceptable dado que prompt/alert pausan el hilo principal.
        if (continuarEjecucion && !['1', '2', '4', '5', '6', '7'].includes(opcionSeleccionada)) {
            // Asegurarse de que el menú se repita inmediatamente para opciones síncronas o si no hay un await.
            // Para las opciones con await, el bucle ya espera.
            // Para las opciones de callback (1 y 2), el alert final se mostrará, y luego el prompt del menú aparecerá.
        }
    }
};

// Inicia la aplicación cuando la página esté completamente cargada.
window.onload = iniciarGestionVeterinaria;