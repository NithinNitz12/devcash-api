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

#### Get item

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
  "bounty_amount": "{D}0",
  "bounty_xDAI": "PostExploreOverview\n            0x71dF...9Bdd\n          + Ξ0",
  "bounty_description": "Mission\nWrite a Javascript program to scrape each bounty (e.g. https://devcash.dev/bountyplatform/bounty/192)\nShould get\n\nBounty amount\nBounty Description\npublic/private bounty\nbounty smart contract addresss\nCreated By\nBounties left and deadline\n\nThen we need an API to serve all this info.\nDevCash API added  \nhttps://github.com/NithinNitz12/devcash-api\ngreat job!!!!!\n",
  "bounty_smart_contract_addresss": "0x71dF7bd1eCa1d12F02Ac9CDe6330188C23859Bdd",
  "bounty_created_by": "0x30a1292Dc133DDa1d43Ab2B6703FeDdF382d62E2",
  "bounty_deadline": "Expired ",
  "bountiesLeft": "0 bounties left",
  "bounty_scope_result": "public"
}
```
