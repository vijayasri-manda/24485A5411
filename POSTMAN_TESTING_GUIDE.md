# Postman API Testing Guide

## 📮 Postman Collection for Notification System

### Setup Instructions
1. Open Postman
2. Create a new Collection named "Notification System"
3. Add the following requests

---

## 🔹 Request 1: Get All Notifications

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications`

**Headers:** None required

**Expected Response:**
```json
{
  "total": 50,
  "page": 1,
  "limit": 10,
  "notifications": [
    {
      "Message": "Sample notification message",
      "Type": "event",
      "Timestamp": "2025-01-06T10:30:00.000Z"
    }
  ]
}
```

---

## 🔹 Request 2: Filter by Type - Event

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications?type=event`

**Query Parameters:**
- `type`: `event`

---

## 🔹 Request 3: Filter by Type - Result

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications?type=result`

**Query Parameters:**
- `type`: `result`

---

## 🔹 Request 4: Filter by Type - Placement

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications?type=placement`

**Query Parameters:**
- `type`: `placement`

---

## 🔹 Request 5: Pagination - Page 1

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications?page=1&limit=5`

**Query Parameters:**
- `page`: `1`
- `limit`: `5`

---

## 🔹 Request 6: Pagination - Page 2

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications?page=2&limit=5`

**Query Parameters:**
- `page`: `2`
- `limit`: `5`

---

## 🔹 Request 7: Combined Filter + Pagination

**Method:** `GET`  
**URL:** `http://localhost:3000/notifications?type=event&page=1&limit=3`

**Query Parameters:**
- `type`: `event`
- `page`: `1`
- `limit`: `3`

---

## 📊 Testing Middleware Logging

After each request, check:

1. **Console Output** - Server terminal should show:
   ```
   2025-01-06T10:30:45.123Z GET /notifications
   2025-01-06T10:30:46.456Z GET /notifications?type=event
   ```

2. **logs.txt File** - Check the file in `notification_app_be/logs.txt`:
   ```bash
   cd notification_app_be
   type logs.txt
   ```

---

## 🎯 Postman Tests (Add to Tests tab)

Add this script to verify responses:

```javascript
// Test 1: Status code is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test 2: Response has required fields
pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('total');
    pm.expect(jsonData).to.have.property('page');
    pm.expect(jsonData).to.have.property('limit');
    pm.expect(jsonData).to.have.property('notifications');
});

// Test 3: Notifications is an array
pm.test("Notifications is an array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.notifications).to.be.an('array');
});

// Test 4: Response time is less than 2000ms
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

---

## 📥 Import Postman Collection (JSON)

Save this as `notification-system.postman_collection.json`:

```json
{
  "info": {
    "name": "Notification System API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Notifications",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"]
        }
      }
    },
    {
      "name": "Filter by Event",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications?type=event",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"],
          "query": [
            {
              "key": "type",
              "value": "event"
            }
          ]
        }
      }
    },
    {
      "name": "Filter by Result",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications?type=result",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"],
          "query": [
            {
              "key": "type",
              "value": "result"
            }
          ]
        }
      }
    },
    {
      "name": "Filter by Placement",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications?type=placement",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"],
          "query": [
            {
              "key": "type",
              "value": "placement"
            }
          ]
        }
      }
    },
    {
      "name": "Pagination - Page 1",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications?page=1&limit=5",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"],
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "5"
            }
          ]
        }
      }
    },
    {
      "name": "Combined Filter + Pagination",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/notifications?type=event&page=1&limit=3",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["notifications"],
          "query": [
            {
              "key": "type",
              "value": "event"
            },
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "3"
            }
          ]
        }
      }
    }
  ]
}
```

---

## 🚀 Quick Start

1. **Start Backend:**
   ```bash
   cd notification_app_be
   node server.js
   ```

2. **Import Collection in Postman:**
   - Click "Import" button
   - Drag the JSON file above
   - Or paste the JSON content

3. **Run Requests:**
   - Click on any request
   - Click "Send"
   - View response in the bottom panel

4. **Verify Logging:**
   - Check server console
   - Check `logs.txt` file

---

## ✅ Expected Results

- ✓ All requests return 200 status
- ✓ Response contains `total`, `page`, `limit`, `notifications`
- ✓ Filtering works correctly
- ✓ Pagination returns correct number of items
- ✓ Middleware logs every request to console and file
- ✓ Timestamps are in ISO format

---

## 📸 Screenshot Checklist for Submission

Capture screenshots showing:
1. Postman request with URL and parameters
2. Response body with status 200
3. Response time
4. Server console showing logs
5. `logs.txt` file content
