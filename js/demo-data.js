// ===== DEMO DATA FOR VETERINARY CLINIC =====

/**
 * Loads demo data into the system for demonstration purposes
 */
function cargarDatosDemo() {
    // Clear existing data
    listaDueños.length = 0;
    listaMascotas.length = 0;
    
    // Demo dueños
    const dueñosDemo = [
        {
            id: generarIdUnico(),
            nombreCompleto: "María González",
            cedula: "12345678",
            telefono: "3001234567",
            email: "maria.gonzalez@email.com"
        },
        {
            id: generarIdUnico(),
            nombreCompleto: "Carlos Rodríguez",
            cedula: "87654321",
            telefono: "3109876543",
            email: "carlos.rodriguez@email.com"
        },
        {
            id: generarIdUnico(),
            nombreCompleto: "Ana Martínez",
            cedula: "11223344",
            telefono: "3155551234",
            email: "ana.martinez@email.com"
        },
        {
            id: generarIdUnico(),
            nombreCompleto: "Luis Pérez",
            cedula: "55667788",
            telefono: "3201112222",
            email: "luis.perez@email.com"
        }
    ];
    
    // Add dueños to list
    listaDueños.push(...dueñosDemo);
    
    // Demo mascotas
    const mascotasDemo = [
        {
            id: generarIdUnico(),
            nombre: "Luna",
            especie: "Perro",
            edad: 3,
            peso: 15.5,
            estadoSalud: "Sano",
            idDueño: dueñosDemo[0].id
        },
        {
            id: generarIdUnico(),
            nombre: "Mittens",
            especie: "Gato",
            edad: 2,
            peso: 4.2,
            estadoSalud: "Sano",
            idDueño: dueñosDemo[0].id
        },
        {
            id: generarIdUnico(),
            nombre: "Rocky",
            especie: "Perro",
            edad: 5,
            peso: 25.0,
            estadoSalud: "En tratamiento",
            idDueño: dueñosDemo[1].id
        },
        {
            id: generarIdUnico(),
            nombre: "Pico",
            especie: "Ave",
            edad: 1,
            peso: 0.3,
            estadoSalud: "Sano",
            idDueño: dueñosDemo[2].id
        },
        {
            id: generarIdUnico(),
            nombre: "Rex",
            especie: "Perro",
            edad: 7,
            peso: 30.0,
            estadoSalud: "Enfermo",
            idDueño: dueñosDemo[3].id
        },
        {
            id: generarIdUnico(),
            nombre: "Whiskers",
            especie: "Gato",
            edad: 4,
            peso: 5.1,
            estadoSalud: "Sano",
            idDueño: dueñosDemo[2].id
        }
    ];
    
    // Add mascotas to list
    listaMascotas.push(...mascotasDemo);
    
    // Update counters
    if (typeof actualizarContadores === 'function') {
        actualizarContadores();
    }
    
    // Add to console
    if (typeof agregarALaConsola === 'function') {
        agregarALaConsola('📊 Datos demo cargados exitosamente!', 'success');
        agregarALaConsola(`👥 ${dueñosDemo.length} dueños registrados`, 'info');
        agregarALaConsola(`🐾 ${mascotasDemo.length} mascotas registradas`, 'info');
        agregarALaConsola('💡 Ahora puedes explorar todas las funcionalidades del sistema', 'info');
    }
    
    // Show success message
    if (typeof mostrarAlerta === 'function') {
        mostrarAlerta('Datos demo cargados exitosamente. ¡Explora las funcionalidades!', 'success');
    }
    
    console.log('✅ Datos demo cargados:', {
        dueños: dueñosDemo.length,
        mascotas: mascotasDemo.length
    });
}

/**
 * Shows demo data information
 */
function mostrarInfoDemo() {
    const info = `
🏥 CLÍNICA VETERINARIA 'EL RINCÓN DEL AMIGUITO' - DATOS DEMO

👥 DUEÑOS REGISTRADOS:
1. María González (12345678) - 2 mascotas
2. Carlos Rodríguez (87654321) - 1 mascota
3. Ana Martínez (11223344) - 2 mascotas  
4. Luis Pérez (55667788) - 1 mascota

🐾 MASCOTAS REGISTRADAS:
1. Luna (Perro, 3 años, 15.5kg) - Sano - Dueño: María
2. Mittens (Gato, 2 años, 4.2kg) - Sano - Dueño: María
3. Rocky (Perro, 5 años, 25kg) - En tratamiento - Dueño: Carlos
4. Pico (Ave, 1 año, 0.3kg) - Sano - Dueño: Ana
5. Rex (Perro, 7 años, 30kg) - Enfermo - Dueño: Luis
6. Whiskers (Gato, 4 años, 5.1kg) - Sano - Dueño: Ana

💡 FUNCIONALIDADES DISPONIBLES:
• Buscar mascotas por nombre
• Ver mascotas por dueño
• Actualizar estados de salud
• Eliminar registros
• Estadísticas en tiempo real

🚀 ¡Prueba todas las funcionalidades del sistema!
    `;
    
    if (typeof agregarALaConsola === 'function') {
        agregarALaConsola(info, 'info');
    } else {
        console.log(info);
    }
}

/**
 * Adds demo data button to the interface
 */
function agregarBotonDemo() {
    // Check if button already exists
    if (document.getElementById('btn-demo')) {
        return;
    }
    
    // Create demo button
    const demoButton = document.createElement('button');
    demoButton.id = 'btn-demo';
    demoButton.className = 'btn btn-secondary';
    demoButton.innerHTML = '<span>🎯</span> Cargar Datos Demo';
    demoButton.onclick = cargarDatosDemo;
    
    // Add to hero section
    const heroSection = document.querySelector('.hero .btn-group');
    if (heroSection) {
        heroSection.appendChild(demoButton);
    }
    
    // Add info button
    const infoButton = document.createElement('button');
    infoButton.id = 'btn-info-demo';
    infoButton.className = 'btn btn-outline';
    infoButton.innerHTML = '<span>ℹ️</span> Ver Info Demo';
    infoButton.onclick = mostrarInfoDemo;
    
    if (heroSection) {
        heroSection.appendChild(infoButton);
    }
}

// Auto-add demo button when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', agregarBotonDemo);
} else {
    agregarBotonDemo();
}

// Export functions for global access
window.cargarDatosDemo = cargarDatosDemo;
window.mostrarInfoDemo = mostrarInfoDemo;
window.agregarBotonDemo = agregarBotonDemo; 