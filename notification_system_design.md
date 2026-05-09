# Notification System Design

## System Architecture

### Overview
A full-stack notification system with Express.js backend and React frontend using Material UI.

### Components

#### 1. Backend (notification_app_be)
- **Framework**: Express.js with Node.js
- **Port**: 3000
- **Features**:
  - REST API endpoint: `/notifications`
  - CORS enabled for frontend communication
  - Logging middleware integration
  - External API integration with Bearer token authentication
  - Query parameters: `type`, `page`, `limit`
  - Sorting by timestamp (latest first)
  - Server-side filtering and pagination

#### 2. Frontend (notification_app_fe)
- **Framework**: React 19 with Vite
- **UI Library**: Material UI (MUI)
- **Features**:
  - Responsive grid layout (2 columns on desktop, 1 on mobile)
  - Notification cards with type badges
  - Dropdown filter (All, Event, Result, Placement)
  - Pagination component (6 items per page)
  - Loading states with CircularProgress
  - Error handling with Alert component
  - Formatted timestamps using toLocaleString()

#### 3. Logging Middleware (logging_middleware)
- **Purpose**: Request logging
- **Output**: Logs to `logs.txt` and console
- **Format**: ISO timestamp + HTTP method + URL

### API Flow

```
Frontend (React) 
    ↓ HTTP GET
Backend (Express :3000/notifications)
    ↓ axios GET + Bearer token
External API (4.224.186.213/evaluation-service/notifications)
    ↓ JSON response
Backend (filter, sort, paginate)
    ↓ JSON response
Frontend (display in MUI cards)
```

### Data Model

**Notification Object:**
```json
{
  "Message": "string",
  "Type": "event|result|placement",
  "Timestamp": "ISO 8601 date string"
}
```

### Technology Stack

**Backend:**
- express: ^5.2.1
- axios: ^1.16.0
- cors: ^2.8.6

**Frontend:**
- react: ^19.2.5
- @mui/material: ^6.x
- @emotion/react & @emotion/styled (MUI peer deps)
- @mui/icons-material
- vite: ^8.0.10

### Security
- Bearer token authentication for external API
- CORS configuration for cross-origin requests
- Environment-based configuration (credentials in separate file)

### Deployment Instructions

**Backend:**
```bash
cd notification_app_be
npm install
npm start
```

**Frontend:**
```bash
cd notification_app_fe
npm install
npm run dev
```

### Future Enhancements
- Real-time notifications using WebSockets
- User authentication
- Notification preferences
- Push notifications
- Database persistence
