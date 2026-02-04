# 📦 File Upload Service

**NestJS + MinIO (S3 local) + Docker**


## 📝 Description

Ce projet est un **service de téléchargement de fichiers** développé avec **NestJS**.
Il permet de :

* 📤 Uploader des fichiers via une API REST
* 💾 Stocker les fichiers :

  * sur le **système local**
  * sur **MinIO (S3 local)**
* 🔒 Appliquer des **contraintes** :

  * Taille maximale : **5 MB**
  * Types autorisés : **PNG, JPG, PDF**
* 🧾 Sauvegarder les **métadonnées** des fichiers
* 🐳 Être exécuté avec ou sans **Docker**

---

## 🧰 Technologies utilisées

* NestJS
* Multer
* MinIO (S3 compatible)
* Docker & Docker Compose
* Postman

---

## 📋 Prérequis

### Sans Docker

* Node.js >= 18
* npm >= 9
* NestJS CLI
* MinIO Server (version gratuite)
* Postman

### Avec Docker (recommandé)

* Docker
* Docker Compose

---

## ⚙️ Installation (sans Docker)

### 1️⃣ Cloner le projet

```bash
git clone <URL_DU_REPO>
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Créer le dossier des fichiers locaux

```bash
mkdir uploads
```

### 4️⃣ Lancer MinIO localement

```bash
minio.exe server E:\minio-data --console-address ":9001"
```

* Console MinIO : [http://localhost:9001](http://localhost:9001)
* Login : `minioadmin`
* Password : `minioadmin`

➡️ Créer un bucket nommé **uploads**

### 5️⃣ Configuration des variables d’environnement

Créer un fichier `.env` à partir de l’exemple :

```env
MINIO_ENDPOINT=127.0.0.1
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=uploads
```

---

## ▶️ Lancer le projet (local)

```bash
npm run start:dev
```

📍 API disponible sur :
[http://localhost:3000](http://localhost:3000)

---

## 🧪 Tests avec Postman

### 📤 Upload d’un fichier

* **URL** : `POST /files/upload`
* **Body** : `form-data`

| Key  | Type | Value  |
| ---- | ---- | ------ |
| file | File | cv.pdf |

---

## 📁 Structure du projet

```
file-upload-service/
│
├── src/
│   ├── files/
│   │   ├── files.controller.ts
│   │   ├── files.service.ts
│   │   ├── files.module.ts
│   │   └── upload.config.ts
│   │
│   ├── storage/
│   │   └── minio.service.ts
│   │
│   └── main.ts
│
├── uploads/                # fichiers locaux (ignorés par Git)
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🐳 Utilisation avec Docker

### 🚀 Lancer les services

```bash
docker compose up --build
```

### 🛑 Arrêter les services

```bash
docker compose down
```

### 🌐 Services disponibles

| Service       | URL                                            |
| ------------- | ---------------------------------------------- |
| API NestJS    | [http://localhost:3000](http://localhost:3000) |
| MinIO API     | [http://localhost:9000](http://localhost:9000) |
| MinIO Console | [http://localhost:9001](http://localhost:9001) |

