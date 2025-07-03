# User API Spec

## Register User

Endpoint : POST  /api/users

Request Body :

```json
{
    "username" : "nanda",
    "password" : "password"
}
```

Response Body (success): 

```json
{
    "data" {
        "username": "nanda",
        "name" : "nanda"
    },
    "message": "registered success"
}
```

Response Body (error):

```json
{
    "errors": "username already registered"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "nanda",
    "email": "nanda@gmail.com",
    "username": "nanda",
    "password": "password"
  }'
```

## Login User

Endpoint : POST  /api/users/login

Request Body :

```json
{
    "username" : "nanda",
    "password" : "password"
}
```

Response Body (success): 

```json
{
    "data" {
        "user" : {
            "id": "abcd",
            "name": "nanda",
            "email": "nanwp.dev@gmail.com"
        },
        "accessToken": "abcd"
    }, 
    "message": "User Logedin success"
}
```

Response Body (error):

```json
{
    "errors": "password is worng"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nanda",
    "password": "password"
  }'
```

## Get User

## Update User

## Logout User