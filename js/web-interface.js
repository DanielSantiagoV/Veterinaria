// ===== WEB INTERFACE FUNCTIONALITY =====

// Global variables for web interface
let currentModal = null;

// ===== MODAL MANAGEMENT =====

/**
 * Shows a modal by ID
 * @param {string} modalId - The ID of the modal to show
 */
function mostrarModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.classList.add('show');
        currentModal = modalId;
        document.body.style.overflow = 'hidden';
        
        // Focus on first input if exists
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

/**
 * Closes a modal by ID
 * @param {string} modalId - The ID of the modal to close
 */
function cerrarModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.classList.remove('show');
        currentModal = null;
        document.body.style.overflow = '';
        
        // Clear form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        
        // Clear results
        const results = modal.querySelector('#resultado-busqueda, #lista-mascotas-container');
        if (results) {
            results.innerHTML = '';
        }
    }
}

/**
 * Closes current modal
 */
function cerrarModalActual() {
    if (currentModal) {
        cerrarModal(currentModal);
    }
}

// ===== FORM VALIDATION =====

/**
 * Validates a form field
 * @param {string} value - The value to validate
 * @param {string} fieldName - The name of the field
 * @param {string} type - The type of validation
 * @returns {boolean} - Whether the field is valid
 */
function validarCampo(value, fieldName, type = 'text') {
    if (type === 'text' || type === 'email' || type === 'tel') {
        if (!value || value.trim() === '') {
            mostrarAlerta(`El campo "${fieldName}" es obligatorio.`, 'error');
            return false;
        }
    }
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            mostrarAlerta(`El campo "${fieldName}" debe ser un email válido.`, 'error');
            return false;
        }
    }
    
    if (type === 'number') {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            mostrarAlerta(`El campo "${fieldName}" debe ser un número positivo.`, 'error');
            return false;
        }
    }
    
    return true;
}

// ===== ALERT SYSTEM =====

/**
 * Shows an alert message
 * @param {string} message - The message to show
 * @param {string} type - The type of alert (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds (default: 5000)
 */
function mostrarAlerta(message, type = 'info', duration = 5000) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-floating');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-floating`;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>${getAlertIcon(type)}</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: inherit;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, duration);
    }
}

/**
 * Gets the appropriate icon for alert type
 * @param {string} type - The alert type
 * @returns {string} - The icon emoji
 */
function getAlertIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// ===== WEB FORM HANDLERS =====

/**
 * Handles dueño registration from web form
 */
function registrarDueñoWeb() {
    const nombre = document.getElementById('nombre-dueno').value;
    const cedula = document.getElementById('cedula-dueno').value;
    const telefono = document.getElementById('telefono-dueno').value;
    const email = document.getElementById('email-dueno').value;
    
    // Validate fields
    if (!validarCampo(nombre, 'Nombre Completo') ||
        !validarCampo(cedula, 'Cédula') ||
        !validarCampo(telefono, 'Teléfono', 'tel') ||
        !validarCampo(email, 'Correo Electrónico', 'email')) {
        return;
    }
    
    // Check if dueño already exists
    if (encontrarDueñoPorCedula(cedula)) {
        mostrarAlerta(`Ya existe un dueño con la cédula "${cedula}".`, 'error');
        return;
    }
    
    // Create new dueño
    const nuevoDueño = {
        id: generarIdUnico(),
        nombreCompleto: nombre.trim(),
        cedula: cedula.trim(),
        telefono: telefono.trim(),
        email: email.trim()
    };
    
    // Add to list
    listaDueños.push(nuevoDueño);
    
    // Update counters
    actualizarContadores();
    
    // Show success message
    mostrarAlerta(`Dueño "${nombre}" registrado exitosamente.`, 'success');
    
    // Log to console
    agregarALaConsola(`✅ Dueño registrado: ${nombre} (${cedula})`, 'success');
    
    // Close modal
    cerrarModal('registro-dueno');
}

/**
 * Handles mascota registration from web form
 */
function registrarMascotaWeb() {
    const nombre = document.getElementById('nombre-mascota').value;
    const especie = document.getElementById('especie-mascota').value;
    const edad = document.getElementById('edad-mascota').value;
    const peso = document.getElementById('peso-mascota').value;
    const estadoSalud = document.getElementById('estado-mascota').value;
    const cedulaDueño = document.getElementById('cedula-dueno-mascota').value;
    
    // Validate fields
    if (!validarCampo(nombre, 'Nombre de la Mascota') ||
        !validarCampo(especie, 'Especie') ||
        !validarCampo(edad, 'Edad', 'number') ||
        !validarCampo(peso, 'Peso', 'number') ||
        !validarCampo(estadoSalud, 'Estado de Salud') ||
        !validarCampo(cedulaDueño, 'Cédula del Dueño')) {
        return;
    }
    
    // Check if dueño exists
    const dueñoExistente = encontrarDueñoPorCedula(cedulaDueño);
    if (!dueñoExistente) {
        mostrarAlerta(`Dueño con cédula "${cedulaDueño}" no encontrado.`, 'error');
        return;
    }
    
    // Check if mascota already exists
    if (encontrarMascotaPorNombre(nombre)) {
        mostrarAlerta(`Ya existe una mascota con el nombre "${nombre}".`, 'error');
        return;
    }
    
    // Create new mascota
    const nuevaMascota = {
        id: generarIdUnico(),
        nombre: nombre.trim(),
        especie: especie,
        edad: Number(edad),
        peso: Number(peso),
        estadoSalud: estadoSalud,
        idDueño: dueñoExistente.id
    };
    
    // Add to list
    listaMascotas.push(nuevaMascota);
    
    // Update counters
    actualizarContadores();
    
    // Show success message
    mostrarAlerta(`Mascota "${nombre}" registrada exitosamente.`, 'success');
    
    // Log to console
    agregarALaConsola(`✅ Mascota registrada: ${nombre} (${especie}) - Dueño: ${dueñoExistente.nombreCompleto}`, 'success');
    
    // Close modal
    cerrarModal('registro-mascota');
}

/**
 * Handles mascota search from web form
 */
function buscarMascotaWeb() {
    const nombre = document.getElementById('nombre-busqueda').value;
    const resultadoDiv = document.getElementById('resultado-busqueda');
    
    if (!validarCampo(nombre, 'Nombre de la Mascota')) {
        return;
    }
    
    const mascota = encontrarMascotaPorNombre(nombre);
    
    if (mascota) {
        const dueño = listaDueños.find(d => d.id === mascota.idDueño);
        const nombreDueño = dueño ? dueño.nombreCompleto : 'Desconocido';
        
        resultadoDiv.innerHTML = `
            <div class="alert alert-success">
                <h4>🐾 Mascota Encontrada</h4>
                <div style="margin-top: 1rem;">
                    <p><strong>ID:</strong> ${mascota.id}</p>
                    <p><strong>Nombre:</strong> ${mascota.nombre}</p>
                    <p><strong>Especie:</strong> ${mascota.especie}</p>
                    <p><strong>Edad:</strong> ${mascota.edad} años</p>
                    <p><strong>Peso:</strong> ${mascota.peso} kg</p>
                    <p><strong>Estado:</strong> <span class="badge badge-${getEstadoBadgeClass(mascota.estadoSalud)}">${mascota.estadoSalud}</span></p>
                    <p><strong>Dueño:</strong> ${nombreDueño}</p>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-outline" onclick="actualizarEstadoMascotaWeb('${mascota.id}')">
                        <span>🩺</span>
                        Actualizar Estado
                    </button>
                    <button class="btn btn-outline" onclick="eliminarMascotaWeb('${mascota.id}')" style="margin-left: 0.5rem;">
                        <span>🗑️</span>
                        Eliminar
                    </button>
                </div>
            </div>
        `;
        
        agregarALaConsola(`🔍 Mascota encontrada: ${mascota.nombre}`, 'info');
    } else {
        resultadoDiv.innerHTML = `
            <div class="alert alert-warning">
                <p>No se encontró ninguna mascota con el nombre "${nombre}".</p>
            </div>
        `;
        
        agregarALaConsola(`⚠️ Mascota no encontrada: ${nombre}`, 'warning');
    }
}

/**
 * Updates mascota status from web interface
 * @param {string} mascotaId - The ID of the mascota to update
 */
function actualizarEstadoMascotaWeb(mascotaId) {
    const mascota = listaMascotas.find(m => m.id === mascotaId);
    if (!mascota) {
        mostrarAlerta('Mascota no encontrada.', 'error');
        return;
    }
    
    const nuevoEstado = prompt(`Estado actual: ${mascota.estadoSalud}\nNuevo estado (Sano/Enfermo/En tratamiento):`);
    
    if (!nuevoEstado) return;
    
    if (!validarEstadoSalud(nuevoEstado)) {
        return;
    }
    
    const estadoAnterior = mascota.estadoSalud;
    mascota.estadoSalud = nuevoEstado;
    
    actualizarContadores();
    mostrarAlerta(`Estado de "${mascota.nombre}" actualizado de "${estadoAnterior}" a "${nuevoEstado}".`, 'success');
    agregarALaConsola(`🩺 Estado actualizado: ${mascota.nombre} (${estadoAnterior} → ${nuevoEstado})`, 'info');
    
    // Refresh search results
    buscarMascotaWeb();
}

/**
 * Deletes a mascota from web interface
 * @param {string} mascotaId - The ID of the mascota to delete
 */
function eliminarMascotaWeb(mascotaId) {
    const mascota = listaMascotas.find(m => m.id === mascotaId);
    if (!mascota) {
        mostrarAlerta('Mascota no encontrada.', 'error');
        return;
    }
    
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar a "${mascota.nombre}"?`);
    if (!confirmacion) return;
    
    const index = listaMascotas.findIndex(m => m.id === mascotaId);
    listaMascotas.splice(index, 1);
    
    actualizarContadores();
    mostrarAlerta(`Mascota "${mascota.nombre}" eliminada exitosamente.`, 'success');
    agregarALaConsola(`🗑️ Mascota eliminada: ${mascota.nombre}`, 'warning');
    
    // Refresh search results
    buscarMascotaWeb();
}

/**
 * Updates the list of mascotas in the modal
 */
function actualizarListaMascotas() {
    const container = document.getElementById('lista-mascotas-container');
    
    if (listaMascotas.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                <p>No hay mascotas registradas.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Edad</th>
                        <th>Peso</th>
                        <th>Estado</th>
                        <th>Dueño</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    listaMascotas.forEach(mascota => {
        const dueño = listaDueños.find(d => d.id === mascota.idDueño);
        const nombreDueño = dueño ? dueño.nombreCompleto : 'Desconocido';
        
        html += `
            <tr>
                <td>${mascota.nombre}</td>
                <td>${mascota.especie}</td>
                <td>${mascota.edad} años</td>
                <td>${mascota.peso} kg</td>
                <td><span class="badge badge-${getEstadoBadgeClass(mascota.estadoSalud)}">${mascota.estadoSalud}</span></td>
                <td>${nombreDueño}</td>
                <td>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;" onclick="actualizarEstadoMascotaWeb('${mascota.id}')">
                        <span>🩺</span>
                    </button>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.875rem; margin-left: 0.25rem;" onclick="eliminarMascotaWeb('${mascota.id}')">
                        <span>🗑️</span>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Gets the appropriate badge class for health status
 * @param {string} estado - The health status
 * @returns {string} - The badge class
 */
function getEstadoBadgeClass(estado) {
    const classes = {
        'Sano': 'success',
        'Enfermo': 'error',
        'En tratamiento': 'warning'
    };
    return classes[estado] || 'info';
}

/**
 * Updates the counters in the dashboard
 */
function actualizarContadores() {
    document.getElementById('contador-duenos').textContent = listaDueños.length;
    document.getElementById('contador-mascotas').textContent = listaMascotas.length;
    
    const enTratamiento = listaMascotas.filter(m => m.estadoSalud === 'En tratamiento').length;
    const sanas = listaMascotas.filter(m => m.estadoSalud === 'Sano').length;
    
    document.getElementById('contador-tratamiento').textContent = enTratamiento;
    document.getElementById('contador-sanas').textContent = sanas;
}

/**
 * Adds a message to the console output
 * @param {string} message - The message to add
 * @param {string} type - The type of message (success, error, warning, info)
 */
function agregarALaConsola(message, type = 'info') {
    const consoleOutput = document.getElementById('console-output');
    const timestamp = new Date().toLocaleTimeString();
    const className = type === 'info' ? '' : type;
    
    const newLine = document.createElement('div');
    newLine.className = className;
    newLine.textContent = `[${timestamp}] ${message}`;
    
    consoleOutput.appendChild(newLine);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

/**
 * Clears the console output
 */
function limpiarConsola() {
    const consoleOutput = document.getElementById('console-output');
    consoleOutput.innerHTML = 'Consola limpiada. Listo para nuevos comandos. 🧹';
}

/**
 * Initiates the console system
 */
function iniciarConsola() {
    agregarALaConsola('🚀 Iniciando sistema de gestión veterinaria...', 'info');
    agregarALaConsola('Sistema listo. Puedes usar los botones de arriba o abrir la consola del navegador (F12).', 'success');
    
    // Start the original console system
    if (typeof iniciarGestionVeterinaria === 'function') {
        setTimeout(() => {
            iniciarGestionVeterinaria();
        }, 1000);
    }
}

// ===== EVENT LISTENERS =====

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        cerrarModalActual();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModal) {
        cerrarModalActual();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize the interface when the page loads
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadores();
    agregarALaConsola('🏥 Bienvenido a la Clínica Veterinaria "El Rincón del Amiguito"', 'success');
    agregarALaConsola('Sistema web cargado correctamente. Usa los botones de arriba para gestionar datos.', 'info');
    
    // Add some sample data for demonstration
    if (listaDueños.length === 0 && listaMascotas.length === 0) {
        agregarALaConsola('💡 Tip: El sistema está vacío. Comienza registrando un dueño y luego una mascota.', 'info');
    }
}); 