const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const app = express();
app.use(express.json());

function getBounty(res, response, id) {
  const $ = cheerio.load(response.data);
  const bounty_id = id;
  const bounty_title = $("h1.font-extrabold").text();
  const bounty_amount = $("h2.font-extrabold").text().slice(3);
  const bounty_xDAI = $(
    "h3.text-lg.md\\:text-xl.text-left.md\\:text-right.mt-1"
  )
    .text()
    .slice(3);

  const bounty_description = $(
    "div.bg-c-background-sec.shadow-lg.w-full.md\\:w-auto.flex-1.flex.flex-col.flex-wrap.relative.rounded-tl-3xl.rounded-br-3xl.rounded-tr-lg.rounded-bl-lg.pt-6.pb-8.md\\:pt-10.md\\:pb-12.px-6.md\\:px-12.my-1.md\\:my-2"
  ).text();

  const bounty_scope = $("p.text-lg.font-bold.mr-1").text().trim();
  // console.log("bounty_scope",bounty_scope);

  let bounty_scope_result;
  if (bounty_scope.includes("Created for")) {
    const created_for_address = $("p.font-mono-jet.text-sm.ml-3").text();
    const regex = /0x[0-9a-fA-F]{40}/g;
    const matches = created_for_address.match(regex);
    bounty_scope_result = "private - " + matches[1];
  } else {
    bounty_scope_result = "public";
  }

  const extracted_bounty_link = $.extract({
    links: [
      {
        selector: "a",
        value: (el, key) => {
          const href = $(el).attr("href");
          return `${key}=${href}`;
        },
      },
    ],
  });

  const bounty_smart_contract_addresss = extracted_bounty_link.links[6]
    .split("=")[1]
    .split("/address/")
    .pop();

  const createdBy = $("p.font-mono-jet").text().trim();
  // console.log("Original createdBy:", createdBy);

  const addressRegex = /0x[a-fA-F0-9]{40}/;
  const match = createdBy.match(addressRegex);
  const bounty_created_by = match ? match[0] : "";

  const extracted_bounty_details = $.extract({
    text: [
      {
        selector: "div.text-left.text-sm",
        value: (el) => {
          const $el = $(el);
          const months = $el.find("span.font-bold").text().trim();
          const remaining = $el.find("span.opacity-75").text().trim();
          return `${months} ${remaining}`;
        },
      },
    ],
  });

  // console.log("details", extracted_bounty_details.text[0]);

  const bounty_deadline = extracted_bounty_details.text[1];
  const bountiesLeft = extracted_bounty_details.text[0];
  const bounty_category = $(
    "span.border.border-c-text-10.shadow-lg.font-bold.opacity-100.px-3.py-1.rounded-full"
  ).text();

  // const bounty_submissions = $('').text();

  return {
    bounty_id,
    bounty_title,
    bounty_amount,
    bounty_xDAI,
    bounty_description,
    bounty_smart_contract_addresss,
    bounty_created_by,
    bounty_deadline,
    bountiesLeft,
    bounty_scope_result,
    bounty_category,
  };
}

app.get("/api/bounty/all", async (req, res) => {
  let id = 152;
  const idsToSkip = [172, 179, 186];
  const results = [];

  while (true) {
    try {
      const url = `https://devcash.dev/bountyplatform/bounty/${id}`;
      const response = await axios.get(url);
      // const $ = cheerio.load(response.data);

      const bounty = getBounty(res, response, id);

      results.push(bounty);
    } catch (error) {
      if (error.message.includes("500")) {
        res.json(results);
        return;
      }
    }

    id++;
    if (idsToSkip.includes(id)) {
      id++;
    }
  }
});

app.get("/api/bounty/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://devcash.dev/bountyplatform/bounty/${id}`;

  try {
    const response = await axios.get(url);
    results = getBounty(res, response, id);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send("Bounty not found");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
