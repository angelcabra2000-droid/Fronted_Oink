 Aplicación web de Manejo Finanzas
## 1. Objetivo general
Analizar soluciones existentes de gestión de finanzas personales y grupales, incluyendo referentes
reales y una propuesta generada mediante IA en Figma Make, con el fin de definir de manera
detallada los requerimientos funcionales y no funcionales de una aplicación web responsiva.
Asimismo, documentar formalmente el sistema utilizando artefactos de Ingeniería de Software y
modelarlo mediante diagramas UML que representen su comportamiento, estructura y
arquitectura.
## 2. Análisis de referentes
onik es una aplicación de gestión financiera personal que permite a los usuarios centralizar el
control de sus cuentas bancarias, tarjetas y productos financieros en una sola plataforma. Está
diseñada principalmente para la gestión individual. Permite:
- Registro automático de gastos
- Categorización
- Alertas financieras
- Reportes visuales
Puntos fuertes:
- Gráficos claros
- Automatización
Puntos débiles
- No está orientado a gestión grupal/familiar profunda
Mint es una plataforma web y móvil de administración financiera que permite crear presupuestos,
monitorear gastos y planificar objetivos financieros personales. Permite:
- Presupuestos
- Seguimiento de gastos
- Objetivos financieros
Puntos fuertes:
- Dashboard claro
- Visualización mensual
Puntos débiles:
- Enfocado principalmente en finanzas personales
Splitwise es una aplicación enfocada exclusivamente en la gestión de gastos compartidos entre
grupos.
Tipo: Gestión de gastos grupales.
Permite:
- Creación de grupos
- Registro de gastos compartidos
- División equitativa o personalizada
- Cálculo automático de balances
- Seguimiento de deudas entre miembros

Puntos fuertes:

- Cálculo automático de balances
- Sistema claro de deudas pendientes
- Interfaz simple y eficiente
Puntos débiles:
- No integra análisis financiero completo
## 3. Propuesta generada con IA
https://www.figma.com/make/z4tFAKHlOJc3zlERijGnEd/Aplicaci%C3%B3n-de-Finanzas-
Personales?fullscreen=1&t=xQtXhJTnpZRnDJPu- 1
Características observadas en la propuesta IA:
- Diseño basado en dashboard central
- Sección de resumen financiero
- Visualización de ingresos y gastos
- Gráficos estadísticos
- Registro de movimientos
- Distribución clara en tarjetas (cards)
- Interfaz minimalista
- Diseño orientado a experiencia de usuario (UX)
## 4. Definición del sistema propuesto:

El sistema propuesto consiste en una aplicación web orientada a la gestión integral de finanzas
personales y grupales, diseñada bajo un enfoque responsivo y estructurada siguiendo principios de
diseño atómico. Su finalidad principal es permitir a los usuarios tener control detallado sobre sus
ingresos, gastos, presupuestos y metas financieras, tanto de manera individual como colaborativa.
La aplicación busca integrar en una misma plataforma las funcionalidades comúnmente
distribuidas en herramientas separadas: por un lado, la gestión financiera individual (como en
aplicaciones tipo Mint o Fintonic), y por otro, la administración de gastos compartidos (como en
Splitwise). Esta integración pretende ofrecer una solución más completa y versátil, adaptable a
distintos contextos de uso, como familias, parejas, estudiantes o grupos de trabajo.
Desde una perspectiva funcional, el sistema no solo actuará como un registrador de transacciones,
sino también como una herramienta analítica que proporcione visualización de datos mediante
gráficos dinámicos, indicadores de rendimiento financiero y comparativas temporales. De esta
forma, el usuario no solo almacena información, sino que obtiene conocimiento útil para la toma
de decisiones económicas.
En términos técnicos, el sistema estará estructurado bajo una arquitectura cliente-servidor, donde
el frontend se encargará de la interacción con el usuario y el backend gestionará la lógica del
negocio y la persistencia de datos. Esta separación permitirá mantener una estructura escalable y
mantenible.
## 5. Enfoque Diferenciador del Sistema: Registro Rápido y de Baja Fricción
El sistema propuesto adopta un enfoque de interacción dual que equilibra simplicidad operativa y
profundidad funcional. La propuesta parte de una realidad práctica: el registro financiero cotidiano
debe ser rápido y sin fricción; sin embargo, el usuario también puede requerir, en determinados
momentos, un análisis más detallado y una configuración más precisa de su información.

Por esta razón, la aplicación no elimina funcionalidades avanzadas, sino que las reorganiza
jerárquicamente. Se prioriza un registro rápido para el uso diario, mientras que las opciones más
completas permanecen disponibles en un segundo nivel de interacción.

1) Registro Binario Simplificado

El sistema se estructurará sobre una decisión inicial básica: el usuario únicamente deberá
seleccionar si el movimiento corresponde a un ingreso o un gasto.
Una vez seleccionada esta opción, el sistema solicitará únicamente el monto. Los demás campos
serán opcionales o estarán simplificados al máximo.
En lugar de múltiples categorías detalladas, se propondrá un conjunto reducido y general de tipos
de gasto, por ejemplo: Alimentación, Transporte, Servicios, Entretenimiento, Otros
Esta simplificación evita que el usuario invierta tiempo excesivo clasificando con precisión extrema
cada movimiento. El objetivo no es una categorización financiera sofisticada, sino un control
práctico y constante.

2) Reducción de Campos Obligatorios

El sistema limitará los campos obligatorios a los estrictamente necesarios para mantener
coherencia contable: Tipo de movimiento (Ingreso / Gasto) y Monto. La fecha podrá registrarse
automáticamente con el día actual, aunque se permitirá modificarla si el usuario lo desea. La
descripción será opcional.
Este diseño minimiza la carga cognitiva y reduce la probabilidad de abandono del registro.


3) Interfaz de Acción Directa

El botón para registrar un movimiento estará siempre visible dentro del dashboard principal. No
será necesario navegar entre múltiples pantallas o módulos.
El registro se realizará mediante una ventana emergente ligera (modal), permitiendo completar el
proceso sin abandonar la vista principal. Esto evita interrupciones en el flujo de navegación.


4) Gestión de Deudas

El sistema incluirá un módulo específico para el registro y seguimiento de deudas. El usuario podrá
registrar:
- Deudas que otras personas tienen con él.
- Deudas que él tiene con terceros.
- Fechas límite de pago.
- Estado de la deuda (pendiente o pagada).
Este módulo estará integrado con el sistema general de movimientos, permitiendo que el pago de
una deuda se refleje automáticamente en el balance financiero.
La gestión de deudas refuerza el carácter práctico del sistema, ampliando su utilidad más allá del
simple registro de ingresos y gastos.

5) Sistema de Recordatorios

Como complemento funcional, el sistema incluirá recordatorios configurables por el usuario. Estos
podrán asociarse a:
- Pagos recurrentes.
- Vencimientos de deudas.
- Fechas límite de metas de ahorro.
- Renovaciones de servicios.
El objetivo no es generar notificaciones excesivas, sino servir como herramienta preventiva que
ayude al usuario a mantener control y previsión financiera.

6) Visualización del Comportamiento Financiero

A pesar de priorizar la simplicidad operativa, la aplicación mantendrá un módulo de análisis visual
que permita observar el comportamiento financiero en distintos períodos de tiempo.
- El dashboard mostrará:
- Balance general.
- Distribución de gastos por categoría.
- Evolución mensual de ingresos y egresos.
- Tendencias de ahorro.
Estos gráficos permitirán al usuario comprender patrones de comportamiento sin necesidad de
interpretar tablas complejas. La visualización se convierte así en una herramienta de apoyo para la
toma de decisiones económicas.

7) Coherencia del Modelo Propuesto

El modelo de interacción dual garantiza que el sistema sea accesible para el uso frecuente y
rápido, sin renunciar a funcionalidades más completas cuando el usuario lo requiera.

- Esta estructura aporta equilibrio entre:
- Simplicidad operativa.
- Profundidad funcional.
- Viabilidad técnica.
- Claridad estructural.
En términos de ingeniería de software, este enfoque permite mantener una arquitectura modular,
donde el registro rápido y el registro detallado pueden implementarse como variantes del mismo
componente base, reduciendo redundancia y facilitando el mantenimiento.

## 6. Requerimientos:

**Requerimientos funcionales:**
- **Gestión de Usuarios**
El sistema deberá permitir el registro de nuevos usuarios mediante el ingreso de datos básicos
como nombre, correo electrónico y contraseña. Una vez registrado, el usuario podrá autenticarse
en el sistema a través de un proceso de inicio de sesión seguro.
El sistema deberá gestionar sesiones activas y permitir el cierre de sesión voluntario. Asimismo, se
contemplará la posibilidad de editar la información básica del perfil y modificar la contraseña
cuando el usuario lo requiera.
Este módulo constituye la base estructural del sistema, ya que cada usuario tendrá acceso
exclusivo a su información financiera.

- **Registro Financiero bajo Modelo Dual**
El sistema deberá permitir el registro de movimientos financieros mediante dos modalidades
diferenciadas: registro rápido y registro detallado.
En la modalidad de registro rápido, el sistema deberá solicitar únicamente la información esencial
para almacenar una transacción. El usuario deberá seleccionar si el movimiento corresponde a un
ingreso o un gasto e ingresar el monto correspondiente. La fecha se asignará automáticamente
con el día actual, aunque el sistema deberá permitir su modificación si el usuario lo desea. La
categoría podrá seleccionarse de una lista simplificada y general.
En la modalidad de registro detallado, el sistema deberá permitir completar información adicional
asociada al movimiento financiero. Esta modalidad contemplará la posibilidad de especificar una
categoría más precisa, agregar una descripción extensa, modificar manualmente la fecha, asociar
la transacción a un presupuesto específico o vincularla a una meta de ahorro.
Ambas modalidades deberán registrar la información en la misma estructura de datos,
garantizando coherencia contable. La diferencia radicará exclusivamente en el nivel de detalle
ingresado.
El sistema deberá recalcular automáticamente el balance general del usuario después de cada
registro.

- **Gestión Financiera Grupal**
El sistema incluirá un módulo orientado a la administración de gastos compartidos. Los usuarios
podrán crear grupos financieros e invitar a otros miembros a participar. Dentro de cada grupo,
será posible registrar gastos compartidos asociados a eventos, compras o actividades comunes.
Una vez registrado un gasto grupal, el sistema deberá calcular automáticamente la división del
monto entre los integrantes. Esta división podrá realizarse de manera equitativa, proporcional o
personalizada, según lo definido por quien registre la transacción.
El sistema deberá mantener un balance actualizado de deudas y créditos entre los miembros del
grupo, mostrando claramente quién debe a quién y cuánto. Esta funcionalidad resulta esencial
para garantizar transparencia y claridad en la gestión colaborativa.

- **Gestión de Presupuestos**

El sistema deberá permitir al usuario definir presupuestos asociados a categorías específicas
durante un período determinado, generalmente mensual.
Una vez establecido el presupuesto, el sistema deberá monitorear los gastos registrados y calcular
el porcentaje de ejecución. Cuando el usuario se aproxime al límite establecido, el sistema deberá
generar una notificación preventiva.
El objetivo de esta funcionalidad será proporcionar control financiero sin interferir con el flujo de
registro diario.

- **Gestión de Metas de Ahorro**
- 
El sistema deberá permitir la creación de metas de ahorro mediante la definición de un monto
objetivo y una fecha estimada de cumplimiento.
El sistema deberá calcular automáticamente el progreso porcentual hacia la meta, considerando
los ingresos asignados o el balance disponible. Asimismo, deberá mostrar de manera visual el
avance alcanzado.
El usuario podrá editar o eliminar metas en cualquier momento.

- **Gestión de Deudas**

El sistema deberá permitir registrar deudas activas, diferenciando entre:
- Deudas que el usuario debe pagar.
- Deudas que otras personas deben al usuario.
Cada deuda deberá incluir información como monto, fecha límite y estado (pendiente o pagada).
El sistema deberá permitir marcar una deuda como saldada y reflejar automáticamente el impacto
correspondiente en el balance financiero.
El módulo de deudas deberá integrarse con el sistema general de movimientos financieros,
evitando inconsistencias contables.

- **Gestión de Recordatorios**
- 
El sistema deberá permitir configurar recordatorios asociados a eventos financieros, tales como
pagos recurrentes, vencimientos de deudas o fechas límite de metas de ahorro.
El usuario podrá definir la fecha del recordatorio y una descripción. Cuando se alcance la fecha
programada, el sistema deberá generar una notificación dentro de la plataforma.
Esta funcionalidad tendrá un carácter preventivo y organizativo.

- **Visualización y Análisis Financiero**

El sistema deberá incluir un panel principal (dashboard) que sintetice la información financiera del
usuario. Este panel deberá mostrar el balance general actualizado, el total de ingresos y el total de
gastos en un período determinado.
Asimismo, el sistema deberá generar representaciones gráficas que permitan visualizar la
distribución de gastos por categoría y la evolución temporal de ingresos y egresos.
El usuario deberá poder filtrar la visualización por períodos de tiempo, como mensual o anual.

- **Integridad y Consistencia de la Información**

El sistema deberá garantizar que toda modificación, eliminación o actualización de registros
financieros se refleje inmediatamente en los cálculos asociados, como balances, presupuestos y
gráficos.
La coherencia entre los diferentes módulos deberá mantenerse en todo momento, evitando
duplicidades o inconsistencias en los datos.

- **Gestión Individual y Grupal de Finanzas**

El sistema de gestión de finanzas personales permitirá que todas sus funcionalidades puedan
ejecutarse tanto en modalidad individual como en modalidad grupal.
Esto implica que el usuario podrá administrar su información financiera de forma personal (uso
individual) o asociarse a un grupo financiero para gestionar movimientos compartidos, deudas
colectivas, metas comunes y presupuestos grupales.
La modalidad grupal no representa un sistema aparte, sino una extensión del mismo modelo
funcional, donde las entidades financieras pueden estar asociadas a uno o varios usuarios dentro
de un grupo.

**Requerimientos no funcionales**

- **Usabilidad**

El sistema deberá priorizar la facilidad de uso como eje central de su diseño. La interfaz deberá ser
intuitiva, clara y coherente, permitiendo que un usuario sin conocimientos técnicos pueda
comprender su funcionamiento sin necesidad de instrucciones extensas.
El proceso de registro rápido deberá poder ejecutarse en pocos pasos, sin navegación innecesaria
entre múltiples pantallas. Los elementos interactivos deberán ofrecer retroalimentación visual
inmediata para confirmar acciones realizadas, como el registro exitoso de un movimiento.
La aplicación deberá mantener consistencia visual en colores, tipografías, iconografía y disposición
de componentes, siguiendo los principios de diseño atómico para garantizar uniformidad y
reutilización estructural.

- **Responsividad**

La aplicación deberá adaptarse correctamente a distintos tamaños de pantalla, incluyendo
dispositivos móviles, tabletas y computadores de escritorio.


- **Seguridad**

Dado que el sistema manejará información financiera sensible, deberá garantizar mecanismos
básicos de seguridad. Las contraseñas deberán almacenarse de manera cifrada y el acceso al
sistema deberá realizarse mediante autenticación válida.
La información de cada usuario deberá estar protegida mediante mecanismos que impidan el
acceso no autorizado a los datos financieros de terceros.
Asimismo, el sistema deberá implementar control de sesiones, evitando accesos simultáneos no
controlados o pérdida de integridad en la autenticación.

- **Rendimiento**

El sistema deberá responder de manera eficiente a las acciones del usuario. Las operaciones
comunes, como registrar un ingreso o gasto, consultar el dashboard o generar gráficos, no
deberán exceder un tiempo de respuesta razonable bajo condiciones normales de uso.
El procesamiento de cálculos asociados a balances, porcentajes de presupuesto y visualización
gráfica deberá realizarse de forma automática sin demoras perceptibles que afecten la experiencia
del usuario.

- **Mantenibilidad y Escalabilidad**

La aplicación deberá diseñarse bajo una estructura modular que facilite futuras ampliaciones,
como integración bancaria automática o incorporación de nuevos módulos financieros. El uso de
diseño atómico en el frontend contribuirá a mantener coherencia y reutilización de componentes.

- **Integridad y Consistencia de Datos**

El sistema deberá mantener coherencia entre los distintos módulos funcionales. Toda
modificación en los registros financieros deberá reflejarse automáticamente en los balances,
gráficos, presupuestos y metas asociadas.
No deberán generarse inconsistencias entre ingresos, gastos, deudas y cálculos financieros
derivados. La base de datos deberá preservar integridad referencial entre las entidades
relacionadas.}

## 7. Usuarios Objetivo:

Estudiantes universitarios, Familias, Parejas, Grupos de amigos, Emprendedores pequeño.

**Escenario de uso:**

El usuario accede desde navegador web, inicia sesión y puede consultar su situación financiera en
tiempo real, registrar movimientos y analizar su comportamiento financiero individual o grupal.

## 8. Casos de uso

**8 .1 Caso de Uso: Registrar Usuario**

Actor principal: Usuario
Descripción: Permite a una persona crear una cuenta en el sistema para acceder a las
funcionalidades financieras.
Precondiciones:
El usuario no debe estar autenticado en el sistema.
Flujo principal:
1. El usuario accede a la pantalla de registro.
2. El sistema solicita nombre, correo electrónico y contraseña.
3. El usuario ingresa la información requerida.
4. El sistema valida que el correo no esté previamente registrado.
5. El sistema almacena la información de manera segura.
6. El sistema confirma el registro exitoso.
Postcondición:
El usuario queda registrado y puede iniciar sesión.
**8 .2 Caso de Uso: Iniciar Sesión**
Actor principal: Usuario
Descripción: Permite al usuario autenticarse y acceder a su información financiera.
Precondiciones:
El usuario debe estar previamente registrado.
Flujo principal:
1. El usuario ingresa correo y contraseña.
2. El sistema valida las credenciales.
3. El sistema crea una sesión activa.
4. El sistema redirige al dashboard principal.
Postcondición:
El usuario accede a su entorno financiero personalizado.
**8 .3 Caso de Uso: Registrar Movimiento (Modo Rápido)**
Actor principal: Usuario
Descripción: Permite registrar un ingreso o gasto mediante el flujo simplificado.
Precondiciones:
El usuario debe estar autenticado.
Flujo principal:
1. El usuario presiona el botón de registro rápido.
2. El sistema solicita tipo de movimiento (ingreso o gasto).
3. El usuario selecciona el tipo.
4. El sistema solicita el monto.
5. El usuario ingresa el valor.
6. El sistema asigna fecha automática.
7. El sistema guarda la transacción.
8. El sistema actualiza el balance.
Postcondición:
El movimiento queda almacenado y el balance se actualiza.
**8 .4 Caso de Uso: Ingresar especificaciones al movimiento**
Actor principal: Usuario
Descripción: Permite registrar una transacción con información ampliada.
Precondiciones:
El usuario debe haber hecho un movimiento.
Flujo principal:
1. El usuario accede a la opción de historial.
2. El sistema muestra los movimientos realizados.
3. El usuario escoge el movimiento.
4. El usuario presiona al botón de editar.
5. El usuario puede añadir descripción.
6. El usuario puede modificar fecha.
7. El usuario puede añadir especificaciones.
8. El sistema valida la información.
9. El sistema almacena el registro.
10. El sistema actualiza balances y gráficos.
Postcondición:
El movimiento detallado queda registrado correctamente.
**8 .5 Caso de Uso: Crear Meta de Ahorro**
Actor principal: Usuario
Descripción: Permite establecer un objetivo de ahorro.
Precondiciones:
El usuario debe estar autenticado.
Flujo principal:
1. El usuario accede al módulo de metas.
2. El sistema solicita monto objetivo y fecha estimada.
3. El usuario ingresa los datos.
4. El sistema almacena la meta.
5. El sistema muestra el progreso porcentual en el dashboard.
Postcondición:
La meta queda registrada y visible en el sistema.
**8 .6 Caso de Uso: Registrar Deuda**
Actor principal: Usuario
Descripción: Permite registrar una deuda activa.
Precondiciones:
El usuario debe estar autenticado.
Flujo principal:
1. El usuario accede al módulo de deudas.
2. El sistema solicita monto, descripción y fecha límite.
3. El usuario indica si la deuda es por pagar o por cobrar.
4. El sistema guarda la deuda con estado pendiente.
5. La deuda aparece en el listado correspondiente.
Postcondición:
La deuda queda registrada y vinculada al perfil del usuario.
**8 .7 Caso de Uso: Configurar Recordatorio**
Actor principal: Usuario
Descripción: Permite configurar un recordatorio asociado a un evento financiero.
Precondiciones:
El usuario debe estar autenticado.
Flujo principal:
1. El usuario accede a la sección de recordatorios.
2. El sistema solicita fecha y descripción.
3. El usuario ingresa la información.
4. El sistema almacena el recordatorio.
5. En la fecha indicada, el sistema genera una notificación interna.
Postcondición:
El recordatorio queda programado.
**8 .8 Caso de Uso: Visualizar Dashboard Financiero**
Actor principal: Usuario
Descripción: Permite consultar el resumen general del comportamiento financiero.
Precondiciones:
El usuario debe estar autenticado.
Flujo principal:
1. El usuario accede al dashboard.
2. El sistema calcula el balance actualizado.
3. El sistema genera gráficos de ingresos y gastos.
4. El sistema muestra distribución por categorías.
5. El usuario puede filtrar por período de tiempo.
Postcondición:
El usuario visualiza información financiera consolidada.
**8.9 Caso de Uso: Crear Grupo Financiero**
Actor principal: Usuario
Descripción: Permite crear un nuevo grupo para gestionar finanzas compartidas con otros
usuarios.
Precondiciones:
El usuario debe estar autenticado.
Flujo principal:
1. El usuario accede a la sección de grupos.
2. El usuario selecciona la opción “Crear grupo”.
3. El sistema solicita el nombre del grupo.
4. El usuario ingresa el nombre y confirma la creación.
5. El sistema genera el grupo y lo asocia como creador y administrador.
6. El sistema muestra confirmación de creación exitosa.
Postcondición:
El grupo queda registrado en el sistema y el usuario aparece como miembro y
administrador del mismo.
**8.10 Caso de Uso: Unirse a Grupo Financiero**
Actor principal: Usuario
Descripción: Permite unirse a un grupo financiero existente mediante invitación o código
de acceso.
Precondiciones:
El usuario debe estar autenticado.
El grupo debe existir en el sistema.
Flujo principal:
1. El usuario accede a la sección de grupos.
2. El usuario selecciona la opción “Unirse a grupo”.
3. El sistema solicita un código o enlace de invitación.
4. El usuario ingresa el código correspondiente.
5. El sistema valida la existencia del grupo.
6. El sistema asocia al usuario como miembro del grupo.
7. El sistema muestra confirmación de ingreso exitoso.
Postcondición:
El usuario queda registrado como integrante del grupo y puede visualizar y registrar
movimientos dentro del mismo.
