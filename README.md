# Secure Notes 🛡️

Secure Notes is a secure, modern, and premium web application designed for creating, managing, and auditing personal notes. Equipped with robust security features such as Multi-Factor Authentication (MFA), OAuth2 integrations, Role-Based Access Control (RBAC), and full audit logging, RookVault Notes ensures your data remains private and protected.

---

## 📸 Screenshots & Previews

### 🌐 Landing Page
*A sleek, cyber-themed entrance featuring features overview and quick navigation.*


### 📝 Notes Dashboard & Editor
*Manage your private notes with a rich text editor and easy CRUD operations.*


### 🔒 Security Settings (MFA & Profile)
*Configure Two-Factor Authentication (2FA) and update credentials instantly.*


### 🗃️ Admin Panel & Audit Logs
*Admin dashboard showing access controls, user lists, and detailed audit history of note actions.*

---

## ✨ Key Features

- **Secure Notes (CRUD)**: Create, read, update, and delete notes with structured parsing and rich-text editing.
- **Multi-Factor Authentication (MFA/2FA)**: Strengthen account security with Google Authenticator or compatible 2FA apps.
- **OAuth2 Integration**: Sign in easily using Google or GitHub authentication provider flows.
- **Role-Based Access Control (RBAC)**: Distinct permissions for standard users (`ROLE_USER`) and administrators (`ROLE_ADMIN`).
- **Audit Logs Trail**: Complete system transparency with detailed, real-time logging of user activity and note edits.
- **Credential Self-Management**: Standard users can change passwords and toggle MFA security features independently.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, TailwindCSS, Material-UI (MUI), React-Hook-Form, Axios, React-Hot-Toast.
- **Backend**: Spring Boot (Java), Spring Security, JWT (JSON Web Tokens), JPA/Hibernate.
- **Database**: MySQL

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **Java 17 / 21**
- **MySQL**

### Frontend Installation & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/msnawin/SecureNotes.git](https://github.com/msnawin/SecureNotes.git)
   cd SecureNotes
   ```

2. **Install the required Node dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and specify your backend API address:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```


npm start
The application should now be accessible at http://localhost:3000.
🔒 Security Configuration
JWT Tokens: Stored securely on client login and sent via HTTP authorization headers.
CSRF Protection: Integrated with the backend API to retrieve and set unique CSRF tokens dynamically for state-changing requests.
