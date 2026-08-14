# Hub de Campañas Masivas — WhatsApp Cloud API

Plataforma omnicanal diseñada para la gestión, segmentación e importación masiva de contactos para el lanzamiento de campañas automatizadas de WhatsApp a gran escala.

##  Arquitectura y Tecnologías Utilizadas

El sistema fue construido utilizando una arquitectura limpia desacoplada en tres capas principales:

- **Frontend (Capa Visual):** Desarrollado con **React** y **Vite**, implementando un Dashboard interactivo con módulos para la creación de plantillas de mensajes, carga masiva de audiencias mediante archivos **CSV/Excel** y visualización de métricas de entrega en tiempo real.
- **Backend (Capa de Lógica):** Motor asíncrono de alto rendimiento programado en Python utilizando **FastAPI**, optimizado para el manejo de webhooks entrantes y peticiones REST concurrentes.
- **Infraestructura y Persistencia:** 
  - Contenedores aislados mediante **Docker**.
  - Base de datos relacional robusta con **PostgreSQL** mediante el ORM SQLAlchemy.
  - Gestión de colas de tareas asíncronas en segundo plano distribuidas con **Redis** y **Celery** para controlar los límites de velocidad (Rate Limiting) exigidos por Meta.
  - Túnel de red seguro cifrado con **Ngrok** para pruebas locales de Webhooks de extremo a extremo.

## Características Clave del Proyecto
- **Validación Estricta de Datos:** Esquemas de datos blindados mediante Pydantic.
- **Evitación de Duplicados:** Sistema inteligente de inserción indexada para prevenir números repetidos.
- **Procesamiento en Lote (Seeder):** Poblador automatizado capaz de inyectar volúmenes masivos de contactos de prueba en milisegundos.
