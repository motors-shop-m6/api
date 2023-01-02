# API

  <ol>
  <li> <a href="">Documentation</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li>
        <a href="#summary"></a>
        <a href="#getting-started">Getting Started</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
        </ul>
    </li>
    <li><a href="#installing"> Installing</a></li>
    <li>
        <a href="#routes">Routes</a>
        <ul>
          <li><a href="#login">Login</a></li>
          <li><a href="#advertisement">Advertisement</a></li>
        </ul>
    </li>
  </ol>

<br>

## Built With

- [typescript](https://www.npmjs.com/package/typescript)
- [express](https://www.npmjs.com/package/express)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [yup](https://www.npmjs.com/package/yup)
- [postgres](https://www.npmjs.com/package/pg)
- [typeorm](https://typeorm.io/)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [uuid](https://www.npmjs.com/package/uuid)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [cloudinary](https://www.npmjs.com/package/cloudinary)
- [multer](https://www.npmjs.com/package/multer)

<br>

## Summary

### Getting Started

> These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Nodejs](https://www.nodejs.org/en/)
- [PostgresSQL:14](https://www.postgresql.org/download/)
- [Cloudinary](https://cloudinary.com/users/register_free#gsc.tab=0)

<br>

## Installing

> Rename and Configure the environment variables

- `.env.example` to `.env`

> Install dependencies

- `yarn`
- `npm install`

> Run the migrations

- `yarn migration`
- `npm run migration`

<br>

## Routes

> Without TOKEN authorization

### **Login**

> **POST** `/login`

- Request

```JSON
  {
    "email": "example_email@gmail.com",
    "password": "example_password"
  }
```

- Response

```JSON
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjY5ODQ4MDk2LCJleHAiOjE2Njk5MzQ0OTYsInN1YiI6ImYwM2ViNmMzLTg4NWUtNGQ2NS04OTZkLTRjMmJkNTdlM2RlMSJ9.UGu_Nw31sdIAoF5j7N3Z6gjK9Vu4pcYik5C3e1AKmdk",
    "id": "69ca4e4a-0b63-47ff-99cb-24fff39fcbb7"
  }
  Status -> 201 CREATED
```

```JSON
  {
    "message": "Invalid Fields"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Invalid Credentials"
  }
  Status -> 403 FORBIDDEN
```

> With TOKEN authorization

```JSON
  {
    Authorization: "Bearer TOKEN"
  }
```

### **Advertisement**

> **POST** `/advertisement`

- Request

```JSON
  {
    "title": "Example_Ads",
    "year": "1360",
    "km": "260600",
    "price": "20603000.00",
    "description": "Ads description example",
    "images": [
      "url",
      "url"
    ],
    "typeOfVehicle": "carro"
  }
```

- Response

```JSON

  {
    "title": "Example_Ads",
    "year": "1360",
    "km": "260600",
    "price": "20603000.00",
    "description": "Ads description example",
    "images": [
      "url",
      "url"
    ],
    "typeOfVehicle": "carro",
    "user": {},
    "id": "6e61bad1-ce76-493e-8ea4-50eadb46e33d",
    "isActive": true,
    "createdAt": "2022-12-20T11:07:59.998Z",
    "updatedAt": "2022-12-20T11:07:59.998Z"
  }
  Status -> 201 CREATED
```

```JSON
  {
    "message": "Invalid Fields"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Invalid Credentials"
  }
  Status -> 403 FORBIDDEN
```

> **Get list** `/advertisement/list`

- Response

```JSON
  [
    {
      "id": "bf86b932-d7a7-4282-846f-665a59957d1a",
      "title": "Example_Ads",
      "year": "1360",
      "km": "260600",
      "price": "20603000.00",
      "description": "Ads description example",
      "typeOfVehicle": "carro",
      "isActive": true,
      "createdAt": "2022-12-19T13:16:13.860Z",
      "updatedAt": "2022-12-19T13:16:13.860Z",
      "coverImage": [
        {
          "image": "URL"
        },
        {
          "image": "URL"
        }
      ]
    }
  ]
  Status -> 200 OK
```

> **Get by Id** `/advertisement/:id`

- Response

```JSON
{
	"id": "bb2b51e0-90d4-4246-a318-87ac98df46e8",
	"title": "Example_Ads",
	"year": "1360",
	"km": "260600",
	"price": "20603000.00",
	"description": "Ads description example",
	"typeOfVehicle": "carro",
	"isActive": true,
	"createdAt": "2022-12-20T11:21:05.546Z",
	"updatedAt": "2022-12-20T11:21:05.546Z",
	"coverImage": [
		{
			"image": "URL"
		},
		{
			"image": "URL"
		}
	]
}
Status -> 200 OK
```

```JSON
  {
    "message": "Invalid Id Format"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Invalid Ad Id"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Id is Inactive"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Invalid Credentials"
  }
  Status -> 403 FORBIDDEN
```

> **Update by Id** `/advertisement/:id`

- Request
  ##### No required Fields

```JSON
  {
    "title": "Example_Updated_Ads",
		"year": "1360",
		"km": "2606",
		"price": "150.00",
		"description": "Ads updated description example",
		"images":[],
		"typeOfVehicle": "carro"
  }
```

- Response

```JSON
  {
	"id": "a47ec106-275e-419d-8bdc-0fd40cd7a8e3",
	"title": "Example_Updated_Ads",
	"year": "1360",
	"km": "2606",
	"price": "150.00",
	"description": "Ads updated description example",
	"typeOfVehicle": "carro",
	"isActive": true,
	"createdAt": "2022-12-20T11:28:10.480Z",
	"updatedAt": "2022-12-20T11:31:56.043Z",
	"coverImage": [
    {
			"image": "URL"
		},{
			"image": "URL"
		},
	]
}
  Status -> 200 OK
```

```JSON
  {
    "message": "Invalid Id Format"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Invalid Ad Id"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Id is Inactive"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
	  "message": "User credentials invalid"
  }
  Status -> 401 FORBIDDEN
```

```JSON
  {
    "message": "Invalid Credentials"
  }
  Status -> 403 FORBIDDEN
```

> **Delete by Id** `/advertisement/:id`

- Response

```JSON
  Status -> 204 NOCONTENT
```

```JSON
  {
    "message": "Invalid Id Format"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Invalid Ad Id"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
    "message": "Id is Inactive"
  }
  Status -> 400 BADREQUEST
```

```JSON
  {
	  "message": "User credentials invalid"
  }
  Status -> 401 FORBIDDEN
```

```JSON
  {
    "message": "Invalid Credentials"
  }
  Status -> 403 FORBIDDEN
```

