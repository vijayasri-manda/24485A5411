# Token Update Guide

## ⚠️ Issue: Token Expired

The Bearer token in `server.js` has expired. You need to get a new token from the authentication API.

---

## 🔑 Steps to Get New Token

### 1. Get Authentication Token

**API Endpoint:** `POST http://4.224.186.213/evaluation-service/auth`

**Request Body:**
```json
{
  "email": "24485a5411@gecgudlavalleru.ac.in",
  "name": "manda vijaya sri",
  "rollNo": "24485a5411",
  "accessCode": "eJdCuC",
  "clientID": "3bcc0e39-447e-44f7-840f-1c1a270569d6",
  "clientSecret": "UHabMWdFWdajexau"
}
```

### 2. Using Postman

1. Open Postman
2. Create new POST request
3. URL: `http://4.224.186.213/evaluation-service/auth`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON): Paste the JSON above
6. Click "Send"

### 3. Expected Response

```json
{
  "token_type": "Bearer",
  "access_token": "eyJhbGc...",
  "expires_in": 1778306162
}
```

### 4. Update server.js

Copy the `access_token` value and replace it in `notification_app_be/server.js`:

```javascript
Authorization: `Bearer YOUR_NEW_TOKEN_HERE`
```

### 5. Restart Server

```bash
cd notification_app_be
node server.js
```

---

## 🔧 Alternative: Using curl

```bash
curl -X POST http://4.224.186.213/evaluation-service/auth ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"24485a5411@gecgudlavalleru.ac.in\",\"name\":\"manda vijaya sri\",\"rollNo\":\"24485a5411\",\"accessCode\":\"eJdCuC\",\"clientID\":\"3bcc0e39-447e-44f7-840f-1c1a270569d6\",\"clientSecret\":\"UHabMWdFWdajexau\"}"
```

---

## 📝 Quick Fix Script

Save this as `update-token.js` in `notification_app_be/`:

```javascript
const axios = require('axios');
const fs = require('fs');

async function getNewToken() {
    try {
        const response = await axios.post('http://4.224.186.213/evaluation-service/auth', {
            email: "24485a5411@gecgudlavalleru.ac.in",
            name: "manda vijaya sri",
            rollNo: "24485a5411",
            accessCode: "eJdCuC",
            clientID: "3bcc0e39-447e-44f7-840f-1c1a270569d6",
            clientSecret: "UHabMWdFWdajexau"
        });

        const token = response.data.access_token;
        console.log('New Token:', token);
        console.log('\nUpdate server.js with this token!');
        
        // Save to file
        fs.writeFileSync('new-token.txt', token);
        console.log('Token saved to new-token.txt');
        
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

getNewToken();
```

Run it:
```bash
cd notification_app_be
node update-token.js
```

---

## ✅ Verify Token Works

After updating, test with:
```bash
curl http://localhost:3000/notifications
```

You should see notifications instead of error!
