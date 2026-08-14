from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# URL de coneción a la base de datos de Docker
# Formato: postgre://usuario:contraseña@servidor:puerto/nombre_bd
DATABASE_URL = "postgresql://postgres:mysecretpassword@localhost:5432/whatsapp_campaigns"

#El motor encargado de gestionar las conexiones fisicas
engine = create_engine(DATABASE_URL)

#Fabrica de sesiones para interactuar con las tablas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#Clase base de la que heredaran futuros modelos/tablas
Base = declarative_base()
def get_db():
    """
    Inyector de dependencia para abrir y cerrar la conexion
    con la base de datos automaticamente en cada peticion HTTP.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()