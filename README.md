# 🏥 El Rincón del Amiguito – Sistema de Gestión Veterinaria 🐾

<p align="center">
  <img src="https://media1.tenor.com/m/dd6OGwgkkJoAAAAC/pepe.gif" width="300"/>
</p>

---

## 📝 Descripción del Proyecto

'El Rincón del Amiguito' es una aplicación web móvil que simula el flujo completo del usuario, desde el login hasta el historial de vuelos, pasando por el check-in, reserva, menú y pase de abordar, desarrollado como parte de un reto de desarrollo front-end, replicando el diseño proporcionado por un equipo UI/UX de una aerolínea ficticia. Este proyecto, sin embargo, ha sido adaptado para ser un sistema de gestión de veterinaria enfocado en simular un flujo de trabajo asíncrono para el registro, consulta, actualización y eliminación de información de dueños y mascotas, demostrando la implementación de funcionalidades CRUD utilizando Callbacks y `setTimeout` para emular operaciones que tomarían tiempo en un entorno real.

---

##  🚀 Asincronía en "El Rincón del Amiguito": ¿Cómo lo Logramos?
👋

El tema de la asincronía en nuestro proyecto de la veterinaria es clave. Es como cuando estás haciendo mil cosas a la vez en la vida real. Imagina que le pides a alguien que te prepare un café ☕ mientras tú estás liado con los emails 📧. No te quedas ahí mirando cómo hacen el café, ¿verdad? Sigues con lo tuyo, y cuando el café está listo, ¡te avisan! 🔔

Pues en el código, hicimos exactamente eso para que el programa no se quede "congelado" esperando algo que tarda (como una consulta a una base de datos real o una validación externa que lleva su tiempo). Para lograrlo, usamos tres trucos de JavaScript:

1. "Te aviso cuando acabe" (Callbacks) 📞
¿Dónde lo ves? Principalmente en el registro de dueños (registrarDueño) y el registro de mascotas (registrarMascota).
¿Cómo funciona? Es como decirle al sistema: "Oye, voy a registrar esta información. Cuando termines y tengas el resultado (o si algo salió mal), ¡avísame usando esta función que te dejo aquí!". Esa función que pasamos es el "callback".
El truco del retraso: Para simular que esto lleva tiempo, usamos un setTimeout. Así, el código no se detiene; el callback simplemente se ejecuta cuando el tiempo se cumple, ¡sin bloquear el show principal!
2. "Te prometo que te daré una respuesta" (Promesas) 🤝
¿Dónde lo aplicamos? Lo encontrarás cuando buscas una mascota por nombre (buscarMascotaPorNombre) o cuando vas a eliminar una mascota (eliminarMascota).
¿Cómo funciona? Aquí somos un poco más "formales". La función misma te da una "promesa" de que va a hacer algo y que, en algún punto, te entregará un resultado: lo que esperabas (si todo va bien, usamos resolve()) o un error (si algo falla, usamos reject(new Error())).
Esperar la promesa: En el menú principal, al usar await con estas funciones, le decimos al programa: "Aguanta un momento, ¡esta promesa se tiene que cumplir antes de seguir!". Así, el código fluye de una manera más lineal, como si leyeras una historia.
3. "Espera, que ya llego" (Async/Await) ⏳
¿Dónde brilla? Lo verás en la actualización del estado de salud de una mascota (actualizarEstadoMascota), al ver las mascotas de un dueño (verMascotasPorDueño), y también en el bucle principal del menú (iniciarGestionVeterinaria).
¿Cómo funciona? Este es el patrón más moderno y, para muchos, el más fácil de entender.
Con la palabra async al inicio de una función, le decimos: "¡Atención! Aquí dentro hay operaciones que van a tomar su tiempo".
Y con await, dentro de esa función async, le indicamos: "¡Pausa aquí! Espera pacientemente a que esta operación (que es una Promesa) termine antes de pasar a la siguiente línea de código".
La magia: Aunque por debajo sigue siendo asíncrono, para nosotros, al leer el código, ¡parece que se ejecuta paso a paso, de forma totalmente secuencial! Esto hace que el flujo sea súper legible y manejable.
En resumen, setTimeout fue nuestra herramienta para simular que las cosas no son instantáneas. Y luego, Callbacks, Promesas y Async/Await fueron los distintos métodos que usamos para gestionar y coordinar todas esas operaciones que se ejecutan en segundo plano, ¡sin que el usuario note ningún parón! Cada uno tiene su propio estilo, pero todos buscan lo mismo: una experiencia fluida y sin tropiezos para quien usa la app. ✨

## 📚 Aprendizajes Obtenidos

Durante la creación de esta aplicación, aprendí a:

- Utilizar **HTML semántico** para una estructura clara y accesible.
- Aplicar **CSS puro y avanzado**, aprovechando animaciones, efectos y variables CSS.
- Centralizar estilos en un solo archivo optimizando mantenimiento y rendimiento.
- Diseñar interfaces **responsive**, adaptables a cualquier dispositivo móvil.
- Simular una navegación funcional entre vistas sin necesidad de JavaScript.
- Integrar tipografías personalizadas y recursos visuales propios.
- Implementar operaciones **CRUD (Crear, Leer, Actualizar, Eliminar)** de forma modular.
- Manejar la **asincronía en JavaScript** utilizando **callbacks** y `setTimeout` para simular retrasos en operaciones (similar a peticiones a una API).
- Aplicar **validaciones de entrada de datos** robustas para garantizar la integridad de la información.
- Estructurar el código de manera lógica con funciones auxiliares para reutilización y claridad.
- Reforzar el uso de estructuras de datos básicas como arreglos para gestionar colecciones de objetos (dueños y mascotas).
- Simular un entorno interactivo con el usuario a través de `prompt` y `alert`.

---

## 💡 Requisitos del Proyecto


## 🎯 Tecnologías y Restricciones
- ✅ Utilizar únicamente **HTML y CSS** (sin frameworks ni JavaScript)
- ✅ Usar un solo archivo de estilos `style.css` centralizado
- ✅ **Estructura HTML semántica** y bien organizada
- ✅ **Sin uso de librerías externas**, desarrollo nativo

## 🌐 Navegación y Vistas
- ✅ Implementar **9 vistas funcionales** conectadas mediante navegación
- ✅ **Navegación fluida** entre todas las secciones
- ✅ **Enlaces internos** para simulación de SPA (Single Page Application)
- ✅ **Experiencia de usuario** continua y coherente

## 📱 Diseño Responsivo
- ✅ Aplicar **diseño responsivo** con flexbox y/o CSS Grid
- ✅ **Diseño mobile-first** moderno y profesional
- ✅ **100% adaptable** a dispositivos móviles, tablets y desktop
- ✅ **Breakpoints optimizados** para diferentes resoluciones


## 💾 Gestión de Datos (Funcionalidades CRUD)
- ✅ **Registro de dueños** (operaciones de creación)
- ✅ **Gestión completa de mascotas** (Crear, Leer, Actualizar, Eliminar)
- ✅ **Validaciones de datos** para asegurar calidad de información
- ✅ **Interfaz de menú interactiva** con el usuario

## ⚡ Simulación de Funcionalidades Avanzadas
- ✅ **Operaciones asíncronas** simuladas con `setTimeout`
- ✅ Implementación de **callbacks** para manejo de respuestas
- ✅ **Menús interactivos** mediante `prompt` y `alert`
- ✅ **Consola del navegador** como salida de información

---

## 🔧 Tecnologías Utilizadas

- HTML5
- CSS3 (puro)
- Git y GitHub para control de versiones y despliegue

---

## 🗂️ Estructura del Proyecto

```
MAQUETACION_DASVP_AIR/
│
├── 📄 JS  # Archivo JS principal
├── 📄 INDEX.HTML  # Archivo HTML principal
└── 📄 README.md  # Documentación del proyecto

```
---

## 👨‍💻 Autor del Proyecto

| Nombre               | Info                                     |
|----------------------|------------------------------------------|
| 🧑 Daniel Santiago   | Estudiante de Campuslands |
| 🎓 Formación         | Desarrollo  |
| 💻 Enfoque           | HTML, CSS, diseño UI responsivo |
| 📍 Ubicación         | Piedecuesta, Santander - Colombia  |

---

## 🧩 FUNCIONALIDADES DESTACADAS

# Características del Proyecto

## Gestión de Datos
- ✅ Gestión de datos de **Dueños** (Crear)
- ✅ Gestión de datos de **Mascotas** (Crear, Leer, Actualizar, Eliminar)
- ✅ Simulación de operaciones **asíncronas** con `setTimeout` y **callbacks**
- ✅ **Validación de datos** de entrada

## Interfaz de Usuario
- ✅ Menú de interacción con el usuario mediante `prompt` y `alert`
- ✅ Consola del navegador como salida principal de información
- ✅ **Diseño mobile-first moderno y profesional**
- ✅ **100% responsive en dispositivos móviles**

## Características Visuales
- ✅ **Transiciones y efectos visuales suaves con CSS**
- ✅ **Navegación fluida entre las 9 vistas enlazadas**
- ✅ **Tipografías personalizadas integradas localmente**
- ✅ **Interfaz de usuario intuitiva y accesible**

## Arquitectura y Código
- ✅ **Estructura HTML semántica y ordenada**
- ✅ **Paleta de colores coherente con variables CSS**
- ✅ **Sin uso de JavaScript, solo HTML y CSS puro**
- ✅ **Código optimizado y desplegado en GitHub Pages**

---

## 💬 Conclusión

Este proyecto fue un gran reto y una valiosa oportunidad para aplicar todos los conocimientos adquiridos sobre diseño web responsive, estructura semántica en HTML y el poder de CSS puro.  Cada vista fue cuidadosamente construida para simular una experiencia real de usuario en una aerolínea, demostrando que se puede lograr una aplicación visualmente atractiva y funcional sin necesidad de JavaScript o frameworks externos.  Adicionalmente, se ha implementado una lógica de negocio robusta y la gestión de la asincronía con callbacks en JavaScript puro, demostrando que se puede construir un sistema CRUD completo utilizando las herramientas básicas del lenguaje.

---

---

## 📞 Contacto y Redes

### 📱 Contacto Directo
- 📧 Email: [vinascodaniel9@gmail.com](mailto:vinascodaniel9@gmail.com)
- 📱 Teléfono: 315 6990555

### 🌐 Redes Sociales
- 🐙 [GitHub](https://github.com/DanielSantiagoV)
- 🎵 [Spotify - Mi Playlist de Programación](https://open.spotify.com/playlist/6a3d9qWLg1cOyMRWoqwr16)

---

### 🎵 Ambiente de Trabajo
- 🎧 [Mi Playlist de Programación](https://open.spotify.com/playlist/6a3d9qWLg1cOyMRWoqwr16)

---

## 💭 Filosofía Personal

> "El código no es solo lo que hago. Es lo que soy. Cada línea de código es una oportunidad para crear algo extraordinario y dejar una huella en el mundo digital." - Daniel Santiago

---
## ✨ Características Destacadas 

### 🎯 **Arquitectura Frontend Avanzada**
✅ 🚫 **Desarrollo nativo puro** - Sin frameworks, solo HTML y JS de alta calidad  
✅ 📁 **Arquitectura modular** con código limpio y mantenible  

### 📱 **Experiencia de Usuario Excepcional**
✅ 🧭 **Navegación SPA simulada** entre 9 vistas interconectadas fluidamente  
 

### 💾 **Funcionalidades Backend Simuladas**
✅ 🔧 **Operaciones CRUD completas** para gestión de dueños y mascotas  
✅ ⏱️ **Simulación de asincronía** con callbacks y setTimeout (similar a APIs)  
✅ ✅ **Validación robusta de datos** para integridad de información  
✅ 🎮 **Interfaz interactiva** con menús de usuario mediante prompt/alert  

### 🚀 **Despliegue y Calidad Profesional**
✅ 🌐 **Publicado en GitHub Pages** con despliegue automatizado  
✅ 📊 **Código optimizado** siguiendo mejores prácticas de la industria  
✅ 📚 **Documentación técnica** completa para mantenimiento futuro  
✅ 🏆 **Estándares profesionales** aplicados en cada línea de código  

---
> **🎯 Proyecto Integral:** Combina diseño frontend moderno, funcionalidades backend simuladas y metodologías profesionales de desarrollo, demostrando competencias técnicas avanzadas en un entorno de producción real.

<p align="center">
  Desarrollado con ❤️ por Daniel Santiago Vinasco<br>
  🔥 <b><a href="https://github.com/DanielSantiagoV">Visita mi GitHub</a></b> 🚀
</p>