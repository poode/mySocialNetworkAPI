### JSONAPI.md

### Task 01: This API route will create connection between two email addresses

#### POST /connection

##### Request
- Content-Type: application/json

```
{
  "friends": [
  "andy@example.com",
  "john@example.com"
  ]
}
```

##### Response
- Content-Type: application/json

```
{
  "success": true
}
```

##### Error conditions
- req.body.friends should exists
- req.body.friends cannot have more than two entries
- req.body.friends[0] should not be empty & should be a string
- req.body.friends[1] should not be empty & should be a string

In case the JSON response will be 

```
{
  "err": true,
  "message": ""
}
```


### Task 02: This API route will retrieve the friends list for an email address

#### POST /friends

##### Request
- Content-Type: application/json

```
{
  email: 'andy@example.com'
}
```

##### Response
- Content-Type: application/json

```
{
  "success": true,
  "friends" :
  [
  'john@example.com'
  ],
  "count" : 1   
}
```

##### Error conditions
- req.body.email should exists
- req.body.email should of type string
- req.body.email should be defined

In case the JSON response will be 

```
{
  "err": true,
  "message": ""
}
```


### Task 03: This API will retrieve the common friends list between two email addresses

#### POST /friends/common

- CASE01
##### Request
- Content-Type: application/json

```
{
  friends:
  [
  'andy@example.com',
  'john@example.com'
  ]
}
```

##### Response
- Content-Type: application/json

```
{
  "success": true,
  "friends" :
  [
  'john@example.com'
  ],
  "count" : 1   
}
```

- CASE02
##### Request
- Content-Type: application/json

```
{
  "friends": [
      "eddy@example.com",
      "john@example.com"
    ]
}
```

##### Response
- Content-Type: application/json

```
{
    "success": true,
    "friends": [],
    "count": 1
}
```

##### Error conditions
- req.body.friends should exists
- req.body.friends cannot have more than two entries
- req.body.friends[0] should not be empty & should be a string
- req.body.friends[1] should not be empty & should be a string

In case the JSON response will be 

```
{
  "err": true,
  "message": ""
}
```

### Task 04: The API will subscribe to updates from an email address

Please note that "subscribing to updates" is NOT equivalent to "adding a friend connection".

##### Request
- Content-Type: application/json

```
{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
```

##### Response
- Content-Type: application/json

```
{
  "success": true
}
```

### Task 05: The API will block updates from an email address

Suppose "andy@example.com" blocks "john@example.com":
- if they are connected as friends, then "andy" will no longer receive notifications from "john"
- if they are not connected as friends, then no new friends connection can be added


##### Request
- Content-Type: application/json

```
{
  "requestor": "andy@example.com",
  "target": "john@example.com"
}
```

##### Response
- Content-Type: application/json

```
{
  "success": true
}
```

### Task 06: The API will retrieve all email addresses that can receive updates from an email address

Eligibility for receiving updates from i.e. "john@example.com":
- has not blocked updates from "john@example.com", and
- at least one of the following:
- has a friend connection with "john@example.com"
- has subscribed to updates from "john@example.com"
- has been @mentioned in the update

##### Request
- Content-Type: application/json

```
{
  "sender":  "john@example.com",
  "text": "Hello World! kate@example.com"
}
```

##### Response
- Content-Type: application/json

```
{
  "success": true
  "recipients":
  [
  "lisa@example.com",
  "kate@example.com"
  ]
}
```
