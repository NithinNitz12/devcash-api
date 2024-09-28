const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/api/bounty/all", async (req, res) => {
  const url = "https://devcash.dev/bountyplatform";

  try {
    const response = await axios.get(url);
    // console.log("test= ",response)
    const $ = cheerio.load(response.data);

    const test = $('h4.font-extrabold').text();
    console.log("test= ",test)
      

    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(404).send("Bounties not found");
  }
});

app.get("/api/bounty/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://devcash.dev/bountyplatform/bounty/${id}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

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
    console.log(bounty_scope);

    let bounty_scope_result;
    if (bounty_scope.includes("Created for")) {
      bounty_scope_result = "private";
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

    res.json({
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
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Bounty not found");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
