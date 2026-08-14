import random
from database import SessionLocal
import models

# Nombres y apellidos para simular clientes reales
NOMBRES = ["Carlos", "Ana", "Luis", "Maria", "Juan", "Sofía", "Pedro", "Elena", "Diego", "Laura"]
APELLIDOS = ["García", "Rodríguez", "Martínez", "López", "González", "Pérez", "Sánchez", "Ramírez", "Torres", "Flores"]

def poblar_base_de_datos():
    db = SessionLocal()
    print(" Iniciando la inyección masiva de 500 contactos en PostgreSQL...")
    
    contactos_creados = 0
    # 500 registros únicos
    for i in range(1, 501):
        nombre_completo = f"{random.choice(NOMBRES)} {random.choice(APELLIDOS)}"
        # Generamos un número ficticio único con código de país (ej: 51 para Perú)
        telefono_ficticio = f"51900000{i:03d}"
        
        # Verificar que no exista por si acaso
        existe = db.query(models.Contacto).filter(models.Contacto.telefono == telefono_ficticio).first()
        if not existe:
            nuevo = models.Contacto(nombre=nombre_completo, telefono=telefono_ficticio)
            db.add(nuevo)
            contactos_creados += 1

    db.commit()
    db.close()
    print(f" Se han inyectado con éxito {contactos_creados} contactos reales en tu base de datos de Docker.")

if __name__ == "__main__":
    poblar_base_de_datos()
