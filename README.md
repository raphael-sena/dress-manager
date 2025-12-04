# Dress Manager 👗

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3.3-green?style=for-the-badge&logo=spring" />
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Latest-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker" />
</p>

## 📋 About the Project

**Dress Manager** is a complete solution focused on business management specialized in dress sales and rentals. The system automates essential business processes, providing a clear and organized view for business owners.

### 🎯 Key Features

- **Customer Management** - Complete registration with rental history and preferences
- **Inventory Control** - Management of dresses, accessories, and available items
- **Rental Management** - Scheduling, deadline control, and returns
- **Alteration Management** - Tracking of modifications and repairs
- **Supplier Management** - Control of partners and suppliers
- **Financial System** - Control of payments, receipts, and reports
- **Integrated Calendar** - Visualization of reservations and appointments
- **Operations History** - Complete traceability of all transactions
- **Administrative Reports** - PDF report generation for performance analysis
- **Access Control** - JWT-based authentication and authorization system
- **Email Notifications** - Automated communication with customers

---

## 👥 Development Team

<table align="center">
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/isaac-portela"><img src="https://avatars.githubusercontent.com/isaac-portela" width="100px;" alt="Isaac Portela"/><br /><sub><b>Isaac Portela da Silva</b></sub></a><br /><a href="https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-2-ti3-8981100-dressmanager/commits?author=isaac-portela" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Campos001"><img src="https://avatars.githubusercontent.com/Campos001" width="100px;" alt="João Campos"/><br /><sub><b>João Pedro Campos de Barcelos</b></sub></a><br /><a href="https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-2-ti3-8981100-dressmanager/commits?author=Campos001" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/miguelpnonato"><img src="https://avatars.githubusercontent.com/miguelpnonato" width="100px;" alt="Miguel Pedrosa do Carmo Nonato"/><br /><sub><b>Miguel Pedrosa do Carmo Nonato</b></sub></a><br /><a href="https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-2-ti3-8981100-dressmanager/commits?author=miguelpnonato" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raphael-sena"><img src="https://avatars.githubusercontent.com/raphael-sena" width="100px;" alt="Raphael Sena"/><br /><sub><b>Raphael Sena Augusto de Brito</b></sub></a><br /><a href="https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-2-ti3-8981100-dressmanager/commits?author=raphael-sena" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yancota"><img src="https://avatars.githubusercontent.com/yancota" width="100px;" alt="Yan Cota"/><br /><sub><b>Yan Mariz Magalhães Cota</b></sub></a><br /><a href="https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-2-ti3-8981100-dressmanager/commits?author=yancota" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

### 🎓 Academic Advisors

* **Cristiano de Macêdo Neto**
* **Eveline Alonso Veloso**
* **João Caram Santos de Oliveira**

---

## 🏗️ Project Architecture

Dress Manager was developed following a modern **microservices** architecture, clearly separating responsibilities between frontend and backend.

```
dress-manager/
├── Codigo/
│   ├── backend/              # REST API in Java/Spring Boot
│   │   └── dressmanager/
│   │       ├── src/
│   │       │   ├── main/java/com/DressManager/
│   │       │   │   ├── controller/    # REST Endpoints
│   │       │   │   ├── service/       # Business Logic
│   │       │   │   ├── repository/    # Data Layer (JPA)
│   │       │   │   ├── model/         # Domain Entities
│   │       │   │   ├── dto/           # Data Transfer Objects
│   │       │   │   ├── security/      # Security Configuration
│   │       │   │   └── exception/     # Error Handling
│   │       │   └── resources/
│   │       │       └── application.properties
│   │       ├── pom.xml
│   │       └── Dockerfile
│   │
│   ├── frontend/             # Web Interface in Next.js
│   │   ├── src/
│   │   │   ├── app/          # Pages and Layouts (App Router)
│   │   │   │   ├── customer/      # Customer Management
│   │   │   │   ├── aluguel/       # Rental Management
│   │   │   │   ├── ajuste/        # Alteration Management
│   │   │   │   ├── fornecedor/    # Supplier Management
│   │   │   │   ├── Estoque/       # Inventory Management
│   │   │   │   ├── dashboard/     # Admin Dashboard
│   │   │   │   └── components/    # Specific Components
│   │   │   ├── components/   # Reusable Components
│   │   │   ├── services/     # API Communication
│   │   │   ├── Context/      # React Contexts (Auth)
│   │   │   ├── Models/       # TypeScript Models
│   │   │   └── Helpers/      # Utilities
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── db/                   # SQL Scripts
│       └── dml_dressmanager.sql
│
├── Artefatos/                # Project Documentation
│   ├── Diagramas/
│   ├── Interfaces de Usuário/
│   └── Documento de Visão/
│
└── docker-compose.yml        # Container Orchestration
```

---

## 🛠️ Technologies Used

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.3.3** - Main framework
  - Spring Data JPA - Data persistence
  - Spring Security - Authentication and authorization
  - Spring Web - REST API
  - Spring Mail - Email sending
  - OAuth2 Resource Server - JWT authentication
- **PostgreSQL** - Relational database
- **Lombok** - Boilerplate reduction
- **Maven** - Dependency management
- **Flying Saucer PDF** - PDF report generation
- **Bean Validation** - Data validation

### Frontend
- **Next.js 14.2** - React framework
- **TypeScript 5** - Typed JavaScript superset
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible components
- **shadcn/ui** - Component system
- **TanStack Table** - Advanced tables
- **React Hook Form** - Form management
- **Zod / Yup** - Schema validation
- **Axios** - HTTP client
- **jwt-decode** - JWT token decoding
- **React Toastify** - Toast notifications
- **date-fns** - Date manipulation
- **Recharts** - Charts and visualizations
- **html2canvas / jsPDF** - PDF export

### DevOps & Tools
- **Docker & Docker Compose** - Containerization
- **WSL2** - Windows Subsystem for Linux
- **Visual Studio Code** - IDE

---

## 🚀 How to Run the Project

### Prerequisites

Before starting, make sure you have the following tools installed:

1. **[Visual Studio Code](https://code.visualstudio.com/download)** - Code editor
2. **[WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)** - Windows Subsystem for Linux
3. **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** - Container platform

### 📦 Installation and Setup

#### 1️⃣ Configure WSL Environment

Open PowerShell as administrator and run:

```powershell
wsl --install
```

Restart your computer if necessary.

#### 2️⃣ Clone the Repository

In VS Code:

1. Open a remote connection to WSL:
   - Press `F1` or `Ctrl+Shift+P`
   - Type: `WSL: Connect to WSL`

2. Clone the repository:
   ```bash
   git clone https://github.com/raphael-sena/dress-manager.git
   cd dress-manager
   ```

#### 3️⃣ Run with Docker Compose

##### **Option A: Run Backend and Frontend Separately**

**Backend (API + PostgreSQL):**

```bash
cd Codigo/backend
docker-compose up --build
```

The backend will be available at: `http://localhost:8080`

**Frontend:**

In another terminal:

```bash
cd Codigo/frontend
docker-compose up --build
```

The frontend will be available at: `http://localhost:3000`

##### **Option B: Run Everything with a Single Command**

Create a `docker-compose.yml` file in the project root (if it doesn't exist):

```yaml
version: '3.8'

services:
  postgresdb:
    image: postgres:latest
    container_name: dressmanager-db
    environment:
      POSTGRES_DB: db_dressManager
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
    ports:
      - "5432:5432"
    networks:
      - app-network
    volumes:
      - postgres-data:/var/lib/postgresql/data

  backend:
    build: ./Codigo/backend
    container_name: dressmanager-backend
    ports:
      - "8080:8080"
    depends_on:
      - postgresdb
    networks:
      - app-network
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgresdb:5432/db_dressManager
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: root

  frontend:
    build: ./Codigo/frontend
    container_name: dressmanager-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - app-network
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8080

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
```

Run:

```bash
docker-compose up --build
```

### 🧪 Run without Docker (Local Development)

#### Backend

1. Make sure you have Java 17 and PostgreSQL installed
2. Configure the database in the `application.properties` file
3. Run:

```bash
cd Codigo/backend/dressmanager
./mvnw spring-boot:run
```

#### Frontend

1. Make sure you have Node.js 20+ installed
2. Install dependencies:

```bash
cd Codigo/frontend
npm install
```

3. Configure the API URL in the `urlService.ts` file
4. Run:

```bash
npm run dev
```

---

## 📊 API Endpoints

The REST API provides the following main resources:

| Resource | Base Endpoint | Methods |
|---------|---------------|---------|
| Authentication | `/api/auth` | POST |
| Customers | `/api/clientes` | GET, POST, PUT, DELETE |
| Items/Inventory | `/api/items` | GET, POST, PUT, DELETE |
| Rentals | `/api/alugueis` | GET, POST, PUT, DELETE |
| Alterations | `/api/ajustes` | GET, POST, PUT, DELETE |
| Suppliers | `/api/fornecedores` | GET, POST, PUT, DELETE |
| Users | `/api/usuarios` | GET, POST, PUT, DELETE |
| Email | `/api/email` | POST |
| PDF Reports | `/api/pdf` | GET |

### Request Example

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "senha": "password123"}'

# List Customers (with authentication)
curl -X GET http://localhost:8080/api/clientes \
  -H "Authorization: Bearer {your-jwt-token}"
```

---

## 🔐 Security

The system implements:

- **JWT Authentication** - Secure tokens for sessions
- **OAuth2 Resource Server** - Token validation
- **Spring Security** - Endpoint protection
- **Role-based access control** - Different permission levels
- **Password encryption** - BCrypt for password hashing

---

## 📱 Application Screens

The system has complete interfaces for:

- ✅ Login and authentication
- ✅ Administrative dashboard
- ✅ Customer management (full CRUD)
- ✅ Inventory management (full CRUD)
- ✅ Rental management
- ✅ Alteration management
- ✅ Supplier management
- ✅ Financial control
- ✅ Reservation calendar
- ✅ History consultation
- ✅ Password recovery

Check the `Artefatos/Interfaces de Usuário/` folder to view the prototypes.

---

## 📖 Additional Documentation

- **UML Diagrams**: `Artefatos/Diagramas/`
- **Vision Document**: `Artefatos/Documento de Visão/`
- **Use Cases**: `Artefatos/Diagramas/diagrama-de-caso-de-uso/`
- **Meeting Minutes**: `Artefatos/atas/`

---

## 🤝 How to Contribute

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is under the license specified in the [LICENSE](LICENSE) file.

---

## 📞 Contact

For questions or suggestions, contact the development team through GitHub.

---

<p align="center">
  Developed with ❤️ by the Dress Manager team | PUC Minas - 2024
</p>
