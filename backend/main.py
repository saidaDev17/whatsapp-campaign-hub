from fastapi import FastAPI, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from database import engine, get_db
from worker import enviar_mensaje_masivo
import models 
import schemas

# Crea tablas fisicamente si no existen
models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Plataforma Omnicanal de Notificaciones Masivas",
    description="Backend para la gestión de campañas mediante WhatsApp Business Cloud API",
    version="1.0.0"
)

TOKEN_VERIFICACION = "mi_token_secreto_de_whatsapp_123"

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Servidor de Campañas de WhatsApp activo e impecable",
        "docs_url": "/docs"
    }


@app.get("/webhook")
def verificar_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: int = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    """
    Ruta GET para que Meta valide el servidor con el token secreto.
    """
    if hub_mode == "subscribe" and hub_verify_token == TOKEN_VERIFICACION:
        print("¡Webhook verificado con éxito ante los servidores de Meta!")
        return hub_challenge
    raise HTTPException(status_code=403, detail="Token de verificación inválido")


@app.post("/webhook")
async def recibir_notificacion_whatsapp(request: Request):
    """
    Ruta POST: Aqui llegarán en tiempo real los estados de entrega y lectura de Meta.
    """
    datos = await request.json()
    print("Notificación en tiempo real recibida de Whatsaap:", datos)
    return {"status": "recibido"}


@app.post("/contactos/", status_code=201)
def crear_contacto(contacto: schemas.ContactoCreate, db: Session = Depends(get_db)):
    """
    Endpoint para registrar un nuevo cliente de forma individual en PostgreSQL.
    Evita registrar números telefónicos duplicados.
    """
    # Verifica si el teléfono ya existe
    db_contacto = db.query(models.Contacto).filter(models.Contacto.telefono == contacto.telefono).first()
    if db_contacto:
        raise HTTPException(status_code=400, detail="Este número de teléfono ya está registrado")
    
    # Crea y guardar el registro
    nuevo_contacto = models.Contacto(nombre=contacto.nombre, telefono=contacto.telefono)
    db.add(nuevo_contacto)
    db.commit()
    
    return {"nombre": contacto.nombre, "telefono": contacto.telefono}


@app.get("/contactos/")
def listar_contactos(db: Session = Depends(get_db)):
    """
    Endpoint para obtener todos los contactos guardados en la base de datos.
    """
    return db.query(models.Contacto).all()
