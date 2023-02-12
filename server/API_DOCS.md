# Available REST API 

## Authentication

#### Sign up

<details>
 <summary><code>POST</code> <code><b>/api/signup</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username  |  required | object (JSON)           | N/A  |
> | password  |  required | object (JSON)           | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`                | `{"token":"eyJhbGciOiJIUzI1N"}`                                     |
> | `400`         | `application/json`                | `{"msg: "This username is already taken. Enter a different username"}` |   

##### Example cURL

> ```
>  curl -X POST http://localhost:8080/api/signup -H "Content-Type: application/json" -d "{"username":"shin","password":"1142a"}"
> ```
 
</details>

#### Login

<details>
 <summary><code>POST</code> <code><b>/api/login</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username  |  required | object (JSON)           | N/A  |
> | password  |  required | object (JSON)           | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"token":"eyJhbGciOiJIUzI1N"}`                                     |
> | `400`         | `application/json`                | `{"msg: "Invalid password, Enter a correct password."}`             |   
 
 ##### Example cURL

> ```
>  curl -X POST http://localhost:8080/api/login -H "Content-Type: application/json" -d "{"username":"shin","password":"1142a"}"
> ```
 
</details>

## Cat Breeds
