#!/bin/bash

# 1. Agregar todos los cambios
git add .

# 2. Pedir el mensaje del commit (si no ponés nada, usa uno por defecto)
echo "📝 Ingresá el mensaje del commit (o enter para 'update'):"
read mensaje
if [ -z "$mensaje" ]; then
  mensaje="update"
fi

# 3. Hacer el commit
git commit -m "$mensaje"

# 4. Subir a la rama actual
echo "🚀 Subiendo cambios a GitHub..."
git push origin $(git branch --show-current)

if [ $? -eq 0 ]; then
    echo "✅ ¡Todo listo y subido!"
else
    echo "❌ Hubo un error al subir. Revisá el token o la conexión."
fi