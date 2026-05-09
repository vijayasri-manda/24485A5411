# 📮 Complete Postman Testing Guide - Step by Step

## 🎯 Prerequisites

1. ✅ Backend server running on port 3000
2. ✅ Postman installed
3. ✅ Server logs visible in terminal

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Start the Backend Server

```bash
cd notification_app_be
node server.js
```

**Expected Output:**
```
Server running on port 3000
```

Keep this terminal open to see logs!

---

### STEP 2: Open Postman

1. Launch Postman application
2. Click **"New"** → **"HTTP Request"**

---

### STEP 3: Test Basic GET Request

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications`
- **Headers:** None needed
- **Body:** None

#### Steps:
1. Select **GET** from dropdown
2. Enter URL: `http://localhost:3000/notifications`
3. Click **"Send"** button

#### Expected Response:
```json
{
  "total": 12,
  "page": 1,
  "limit": 10,
  "notifications": [
    {
      "Message": "Campus placement drive scheduled for next week",
      "Type": "placement",
      "Timestamp": "2025-01-10T10:00:00Z"
    },
    ...
  ]
}
```

#### ✅ Verify:
- Status: **200 OK**
- Response time: < 500ms
- Check server terminal for log:
  ```
  2025-01-06T12:30:45.123Z GET /notifications
  ```

---

### STEP 4: Test Filter by Type - Event

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications?type=event`

#### Steps:
1. In Postman, click **"Params"** tab
2. Add query parameter:
   - Key: `type`
   - Value: `event`
3. Click **"Send"**

#### Expected Response:
```json
{
  "total": 4,
  "page": 1,
  "limit": 10,
  "notifications": [
    {
      "Message": "Technical workshop on AI and ML",
      "Type": "event",
      "Timestamp": "2025-01-08T09:00:00Z"
    },
    ...
  ]
}
```

#### ✅ Verify:
- All notifications have `"Type": "event"`
- Check server log:
  ```
  2025-01-06T12:31:00.456Z GET /notifications?type=event
  ```

---

### STEP 5: Test Filter by Type - Result

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications?type=result`

#### Steps:
1. Change `type` parameter value to `result`
2. Click **"Send"**

#### Expected Response:
```json
{
  "total": 4,
  "page": 1,
  "limit": 10,
  "notifications": [
    {
      "Message": "Semester exam results will be announced soon",
      "Type": "result",
      "Timestamp": "2025-01-09T15:30:00Z"
    },
    ...
  ]
}
```

#### ✅ Verify:
- All notifications have `"Type": "result"`

---

### STEP 6: Test Filter by Type - Placement

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications?type=placement`

#### Steps:
1. Change `type` parameter value to `placement`
2. Click **"Send"**

#### Expected Response:
```json
{
  "total": 4,
  "page": 1,
  "limit": 10,
  "notifications": [
    {
      "Message": "Campus placement drive scheduled for next week",
      "Type": "placement",
      "Timestamp": "2025-01-10T10:00:00Z"
    },
    ...
  ]
}
```

#### ✅ Verify:
- All notifications have `"Type": "placement"`

---

### STEP 7: Test Pagination - Page 1 with Limit 5

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications?page=1&limit=5`

#### Steps:
1. Click **"Params"** tab
2. Add parameters:
   - Key: `page`, Value: `1`
   - Key: `limit`, Value: `5`
3. Click **"Send"**

#### Expected Response:
```json
{
  "total": 12,
  "page": "1",
  "limit": "5",
  "notifications": [ /* 5 items */ ]
}
```

#### ✅ Verify:
- Response contains exactly 5 notifications
- `"page": "1"`
- `"limit": "5"`

---

### STEP 8: Test Pagination - Page 2

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications?page=2&limit=5`

#### Steps:
1. Change `page` parameter to `2`
2. Keep `limit` as `5`
3. Click **"Send"**

#### Expected Response:
```json
{
  "total": 12,
  "page": "2",
  "limit": "5",
  "notifications": [ /* Next 5 items */ ]
}
```

#### ✅ Verify:
- Different notifications than page 1
- `"page": "2"`

---

### STEP 9: Test Combined Filter + Pagination

#### Request Setup:
- **Method:** `GET`
- **URL:** `http://localhost:3000/notifications?type=event&page=1&limit=3`

#### Steps:
1. Add three parameters:
   - Key: `type`, Value: `event`
   - Key: `page`, Value: `1`
   - Key: `limit`, Value: `3`
2. Click **"Send"**

#### Expected Response:
```json
{
  "total": 4,
  "page": "1",
  "limit": "3",
  "notifications": [ /* 3 event notifications */ ]
}
```

#### ✅ Verify:
- Only event type notifications
- Maximum 3 items returned

---

## 🔍 VERIFY LOGGING MIDDLEWARE

### Check Server Console

Your terminal should show logs like:
```
Server running on port 3000
2025-01-06T12:30:45.123Z GET /notifications
2025-01-06T12:31:00.456Z GET /notifications?type=event
2025-01-06T12:31:15.789Z GET /notifications?type=result
2025-01-06T12:31:30.012Z GET /notifications?type=placement
2025-01-06T12:31:45.345Z GET /notifications?page=1&limit=5
2025-01-06T12:32:00.678Z GET /notifications?page=2&limit=5
2025-01-06T12:32:15.901Z GET /notifications?type=event&page=1&limit=3
```

### Check logs.txt File

```bash
cd notification_app_be
type logs.txt
```

**Expected Content:**
```
2025-01-06T12:30:45.123Z GET /notifications
2025-01-06T12:31:00.456Z GET /notifications?type=event
2025-01-06T12:31:15.789Z GET /notifications?type=result
...
```

---

## 📸 SCREENSHOTS FOR SUBMISSION

Capture these screenshots:

### Screenshot 1: Basic GET Request
- Postman window showing:
  - URL: `http://localhost:3000/notifications`
  - Status: 200 OK
  - Response body with notifications array
  - Response time

### Screenshot 2: Filter by Event
- Postman window showing:
  - URL with `?type=event` parameter
  - Response with only event notifications
  - Status: 200 OK

### Screenshot 3: Pagination
- Postman window showing:
  - URL with `?page=1&limit=5` parameters
  - Response with 5 notifications
  - Total count showing 12

### Screenshot 4: Server Console Logs
- Terminal window showing:
  - Multiple log entries with timestamps
  - Different request URLs logged

### Screenshot 5: logs.txt File
- Text editor or terminal showing:
  - Contents of `notification_app_be/logs.txt`
  - All logged requests with timestamps

---

## 🧪 POSTMAN TESTS (Optional)

Add this to the **Tests** tab in Postman:

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

// Test 4: Response time is acceptable
pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// Test 5: Each notification has required fields
pm.test("Notifications have required fields", function () {
    var jsonData = pm.response.json();
    if (jsonData.notifications.length > 0) {
        var notification = jsonData.notifications[0];
        pm.expect(notification).to.have.property('Message');
        pm.expect(notification).to.have.property('Type');
        pm.expect(notification).to.have.property('Timestamp');
    }
});
```

Click **"Send"** and see all tests pass! ✅

---

## ✅ SUCCESS CHECKLIST

- [ ] Server starts without errors
- [ ] Basic GET request returns 200 OK
- [ ] Filter by event works
- [ ] Filter by result works
- [ ] Filter by placement works
- [ ] Pagination returns correct number of items
- [ ] Combined filter + pagination works
- [ ] Server console shows all request logs
- [ ] logs.txt file contains all requests
- [ ] All Postman tests pass (if added)
- [ ] Screenshots captured for submission

---

## 🎉 CONGRATULATIONS!

You've successfully tested:
✓ REST API endpoint
✓ Query parameter filtering
✓ Pagination
✓ Logging middleware
✓ Error handling

Your notification system is working perfectly! 🚀
