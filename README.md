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
    "bounty_id": 152,
    "bounty_title": "test bounty",
    "bounty_amount": "5,000.0",
    "bounty_xDAI": "0.0",
    "bounty_description": "This is a test bounty. This is a test bounty. This is a test bounty. This is a test bounty. This is a test bounty.\n",
    "bounty_smart_contract_addresss": "0x6eEb7FD9FAa0c7eF6f1AB627B69a4e5ecaeE3A4E",
    "bounty_created_by": "0x2c8a7fE54782D63a4a5B0F1677C0D65A33421F60",
    "bounty_deadline": "Expired ",
    "bountiesLeft": "1 bounties left",
    "bounty_scope_result": "public",
    "bounty_category": "Other"
  },
  {
    "bounty_id": 153,
    "bounty_title": "test bounty",
    "bounty_amount": "1,000.0",
    "bounty_xDAI": "0.0",
    "bounty_description": "Test bounty\nTest bounty Test bounty Test bounty Test bounty Test bounty Test bounty Test bounty\n",
    "bounty_smart_contract_addresss": "0xdA4f0a1864fB1467BB3d214a29B21251fd37Fe6a",
    "bounty_created_by": "0x4bC260bE6cDE5992bBfc161f0d930227c292756f",
    "bounty_deadline": "Expired ",
    "bountiesLeft": "1 bounties left",
    "bounty_scope_result": "public",
    "bounty_category": "Other"
  },
  ...
  ...
  ...
  {
    "bounty_id": 198,
    "bounty_title": "[RESEARCH] write report on The Guild",
    "bounty_amount": "30,000.0",
    "bounty_xDAI": "0.0",
    "bounty_description": "Write a report on The Guild\nTask\nSign up to https://beta.theguild.quest, investigate as much as you can\n\ntry doing quests\nTest out their features\nCheck out the wallet\nTry earning some XP\nTry joining their community\nMeet some community members\n\nPlease write a report on your experiences and impressions.\nWe would like to know to know\n\nWhat are the overall goals of the platform\n\nFeatures\n\nHow easy was it to use their features\n\nLimitations\n\nBugs\n\nCommunity\n\nYour Opinions\n\n\nRequirements\n~ 750 words\n~ include 2 relevant screenshots\n~include 2 relevant social media links\nConsideration\nIf you use AI, please make sure you manually check for accuracy before submitting.\nNoteform is acceptable\n",
    "bounty_smart_contract_addresss": "0x242D3c0Ee3f3F12ea6Af38409790e423A8Cd683f",
    "bounty_created_by": "0x30a1292Dc133DDa1d43Ab2B6703FeDdF382d62E2",
    "bounty_deadline": "2 days remaining",
    "bountiesLeft": "1 bounties left",
    "bounty_scope_result": "private - 0xc2Dd665F729749ee6a2e94F1F0FBBf655Bf63A0E",
    "bounty_category": "Other"
  }
]
```