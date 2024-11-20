# Servicio de Gestión de DID

Un servicio seguro basado en TypeScript para gestionar Identificadores Descentralizados (DIDs) siguiendo la especificación W3C DID. Este servicio implementa el método did:key con operaciones criptográficas ED25519.

## Características

- ✨ Creación de DIDs usando el método did:key
- 🔐 Generación de claves criptográficas ED25519
- 📄 Resolución de documentos DID
- 🔒 Encriptación segura de claves privadas
- 🗄️ Persistencia en MongoDB
- 🐳 Soporte para despliegue con Docker
- 🧪 Suite completa de pruebas

## Características de Seguridad

- ED25519 para operaciones criptográficas
- Encriptación AES-256-GCM para claves privadas
- Generación segura de claves usando números aleatorios criptográficamente seguros
- Las claves privadas se encriptan antes de almacenarse
- Configuración de clave de encriptación basada en variables de entorno

## Requisitos Previos

- Node.js 18 o superior
- MongoDB 4.4 o superior
- Docker y Docker Compose (para despliegue en contenedores)

## Instalación

1. Clonar el repositorio
2. Crear un archivo `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/did-service
   ENCRYPTION_KEY=tu-clave-segura-de-encriptacion
   PORT=3000
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```

## Desarrollo

1. Iniciar MongoDB localmente o usando Docker:
   ```bash
   docker-compose up mongodb
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Pruebas

Ejecutar la suite de pruebas:
```bash
npm test
```

## Despliegue en Producción

### Usando Docker Compose

1. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```

2. Construir y ejecutar servicios:
   ```bash
   docker-compose up --build
   ```

### Despliegue Manual

1. Construir el código TypeScript:
   ```bash
   npm run build
   ```

2. Iniciar el servidor de producción:
   ```bash
   npm start
   ```

## Endpoints de la API

### Crear DID
- **POST** `/api/did/create`
- Crea un nuevo DID con claves ED25519
- Retorna: Documento DID

### Resolver DID
- **GET** `/api/did/resolve/:did`
- Resuelve un DID existente
- Retorna: Documento DID

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `MONGODB_URI` | Cadena de conexión MongoDB | `mongodb://localhost:27017/did-service` |
| `ENCRYPTION_KEY` | Clave para encriptar claves privadas | Requerido |
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Modo de entorno | `development` |

## Estructura del Proyecto

```
.
├── src/
│   ├── controllers/    # Manejadores de peticiones
│   ├── models/         # Modelos de base de datos
│   ├── services/       # Lógica de negocio
│   ├── types/          # Tipos de TypeScript
│   ├── routes/         # Rutas de la API
│   └── index.ts        # Entrada de la aplicación
├── tests/             # Archivos de prueba
├── Dockerfile         # Definición del contenedor
└── docker-compose.yml # Orquestación de contenedores
```
