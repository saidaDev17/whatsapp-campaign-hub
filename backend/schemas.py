from pydantic import BaseModel, Field

class ContactoCreate(BaseModel):
    nombre: str = Field(..., max_length=100, example="Irina Blas")
    telefono: str = Field(..., max_length=20, example=51999888777) #Código pais + número

    class Config:
        from_attributes = True
