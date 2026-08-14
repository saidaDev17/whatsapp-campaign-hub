from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base

class Contacto(Base):
    """
    Representacion de la tabla 'Contactos' en la base de datos PostgreSQL.
    Aqui se almacenarán los números telefónicos subidos masivamente mediante el CSV/Excel.
    """
    __tablename__="contactos"

    #Columnas de la tabla
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    telefono = Column(String(20), unique=True, index=True, nullable=False) #Formato internacional (ej: 51999888777)
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)



