import time 
from celery import Celery 

# Conexión de Celery con el motor de Redis
celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost6379/0"
)

@celery_app.task(name="tasks.enviar_mensaje_masivo")
def enviar_mensaje_masivo(nombre_contacto: str, telefono_contacto: str, mensaje_plantilla: str):
    """
    Tarea asincrona administrada por Celery. 
    Procesa miles de envíos controlando la velocidad en segundo plano.
    """
    print(f" [Cola Celery] Procedando envío para: {nombre_contacto}({telefono_contacto})")

    # Simulación del tiempo que tarda la red en enviar el mensaje a Meta (2 seg. de delay de seguridad)
    time.sleep(2)
    
    print(f" [Cola Celery] Mensaje enviado con éxito a {telefono_contacto}: '{mensaje_plantilla}'")
    return {"status": "enviado", "contacto": telefono_contacto}
