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

Open `.env` file set your desired `PORT` address
```env
PORT = <PORT Number>
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

#### Get a single bounty

```http
  GET /api/bounty/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of bounty to fetch |

Takes bounty id and returns the bounty details.

```json
{
  "bounty_title": "Js Program to Scrape Bounties",
  "bounty_amount": "0",
  "bounty_xDAI": "0",
  "bounty_description": "Mission\nWrite a Javascript program to scrape each bounty (e.g. https://devcash.dev/bountyplatform/bounty/192)\nShould get\n\nBounty amount\nBounty Description\npublic/private bounty\nbounty smart contract addresss\nCreated By\nBounties left and deadline\n\nThen we need an API to serve all this info.\n",
  "bounty_smart_contract_addresss": "0x71dF7bd1eCa1d12F02Ac9CDe6330188C23859Bdd",
  "bounty_created_by": "0x30a1292Dc133DDa1d43Ab2B6703FeDdF382d62E2",
  "bounty_deadline": "Expired ",
  "bountiesLeft": "0 bounties left",
  "bounty_scope_result": "public",
  "bounty_category": "Other"
}
```
#### Get all bounty

```http
  GET /api/bounty/all
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| none      | none     | Returns a list of all bounties      |

```json
[
  {
    "id": 152,
    "bounty_title": "test bounty"
  },
  {
    "id": 153,
    "bounty_title": "test bounty"
  },
  {
    "id": 154,
    "bounty_title": "test bounty"
  },
  ...
  ...
  ...
  {
    "id": 194,
    "bounty_title": "Follow up with learn to earn platform list"
  },
  {
    "id": 195,
    "bounty_title": "Unlock Devcash"
  },
  {
    "id": 196,
    "bounty_title": "Js Program to Scrape Bounties"
  },
  {
    "id": 197,
    "bounty_title": "UCASH Buying Bot"
  }
]
```