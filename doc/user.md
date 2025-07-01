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
    }
}
```

Response Body (error):

```json
{
    "errors": "username already registered"
}
```

## Login User

Endpoint : POST  /api/login

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
        "name" : "nanda",
        "token" : "abcd"
    }
}
```

Response Body (error):

```json
{
    "errors": "password is worng"
}
```

## Get User

## Update User

## Logout User