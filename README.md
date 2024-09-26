# devcash-api
API for DevCash.dev

## Run Locally

Clone the project

```bash
  git clone https://github.com/NithinNitz12/devcash-api
```

Go to the project directory

```bash
  cd api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## API Reference

#### Get item

```http
  GET /api/bounty/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of bounty to fetch |

Takes bounty id and returns the bounty details.
