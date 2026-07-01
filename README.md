# 🐷 Oink — Frontend

**Oink** es una aplicación web de finanzas personales y grupales, pensada para estudiantes, familias, parejas, grupos de amigos y pequeños emprendedores. Este repositorio contiene el frontend, construido en HTML/CSS/JavaScript vanilla, que consume la API del [backend de Oink](https://github.com/angelcabra2000-droid/Backend_Oink).

## 📌 Sobre el proyecto

Oink busca integrar en una misma plataforma lo que normalmente está repartido en varias apps: la gestión financiera individual (al estilo Mint o Fintonic) y la administración de gastos compartidos (al estilo Splitwise), bajo un enfoque de **registro rápido y de baja fricción**: registrar un movimiento requiere solo elegir si es ingreso o gasto e ingresar el monto, dejando el resto de campos (categoría detallada, descripción, fecha) como opcionales o de segundo nivel.

## ✅ Funcionalidades implementadas

- **Perfiles múltiples** dentro de una misma cuenta.
- **Registro de transacciones** (ingresos y gastos).
- **Gestión de deudas por cuotas**, con lógica personalizada de cálculo y seguimiento de *installments*.
- **Ahorros**: seguimiento de metas.
- **Formularios de edición en línea** (en vez de modales) para una experiencia más fluida.
- **Visualización financiera** con gráficos (Chart.js).

## 🧭 Visión del producto (roadmap)

El diseño del sistema contempla además las siguientes funcionalidades, pensadas para futuras iteraciones:

- **Modelo de registro dual**: registro rápido (tipo + monto) y registro detallado (categoría específica, descripción, fecha manual, presupuesto o meta asociada).
- **Gestión financiera grupal**: creación de grupos, gastos compartidos con división equitativa/proporcional/personalizada, y balance de deudas entre miembros (unirse a un grupo mediante código de invitación).
- **Presupuestos** por categoría y período, con notificaciones al acercarse al límite.
- **Recordatorios** para pagos recurrentes, vencimientos de deudas y metas de ahorro.
- **Dashboard analítico** con balance general, distribución de gastos por categoría, evolución mensual y filtros por período.

## 🏗️ Arquitectura y decisiones de diseño

- **Atomic Design**: componentes organizados en átomos, moléculas, organismos y páginas, para mantener consistencia visual y reutilización estructural.
- **SPA con router propio**: navegación entre vistas sin recargar la página.
- **CSS organizado por nivel de Atomic Design**, con selectores basados en clases (no en IDs).
- **Diseño responsivo**, con sidebar móvil mediante menú hamburguesa, para adaptarse a móviles, tablets y escritorio.

## 🛠️ Tecnologías y librerías

- **Base**: HTML, CSS, JavaScript vanilla
- **[TomSelect](https://tom-select.js.org/)**: selects mejorados
- **[Flatpickr](https://flatpickr.js.org/)**: selección de fechas
- **[Chart.js](https://www.chartjs.org/)**: visualización de datos financieros

> Las librerías externas se inicializan dentro de `loadPage()`, después de que el contenido se inyecta en el DOM (necesario por la arquitectura SPA).

## 👤 Usuarios objetivo

Estudiantes universitarios, familias, parejas, grupos de amigos y pequeños emprendedores que necesitan controlar sus finanzas de forma individual o colaborativa.

## 🚀 Cómo correr el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/angelcabra2000-droid/Fronted_Oink.git
   cd Fronted_Oink
   ```
2. Asegúrate de tener el [backend de Oink](https://github.com/angelcabra2000-droid/Backend_Oink) corriendo.
3. Abre `index.html` con un servidor local (por ejemplo, la extensión Live Server de VS Code) o el método que prefieras para servir archivos estáticos.

## 🔗 Proyecto relacionado

- Backend: [Backend_Oink](https://github.com/angelcabra2000-droid/Backend_Oink)
