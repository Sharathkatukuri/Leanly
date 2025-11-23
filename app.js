if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ quiet: true });
}
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const Longlink = require("./models/links");
const app = express();

// nanoid setup
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const nanoid = customAlphabet(alphabet, 7); // generates 7-char codes

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

//accessing of view folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res) => {
  const links = await Longlink.find();
  res.render("home.ejs", { links });
});

app.post("/api/links", async (req, res) => {
  try {
    let { url, code, title } = req.body;
    // 1. Validate URL
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    try {
      new URL(url); // URL validation
    } catch (err) {
      return res.status(400).json({ error: "Invalid URL format" });
    }
    // 2. Handle custom / auto code
    if (!code || code.trim() === "") {
      code = nanoid(); // auto-generate
    }
    // Validate code format
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return res.status(400).json({
        error: "Code must be 6–8 characters (letters or numbers only)",
      });
    }
    // 3. Check duplicate codes
    const exists = await Longlink.findOne({ code });
    if (exists) {
      return res.status(409).json({ error: "Code already exists" });
    }
    // 4. Save new link
    const newLink = new Longlink({
      url,
      code,
      title,
    });

    await newLink.save();
    return res.redirect("/");
  } catch (err) {
    console.error("Error in POST /api/links", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/:code", async (req, res) => {
  const { code } = req.params;
  const link = await Longlink.findOne({ code });
  if (!link) {
    return res.status(404).send("<h1>Short link not found</h1>");
  }
  // record analytics
  link.clicks += 1;
  link.lastClicked = new Date();
  link.history.push({
    ts: new Date(),
    ip: req.ip,
    ua: req.headers["user-agent"],
    referrer: req.get("referer") || null,
  });
  await link.save();
  return res.redirect(302, link.url);
});

app.delete("/api/links/:code", async (req, res) => {
  const { code } = req.params;
  const deleted = await Longlink.findOneAndDelete({ code });
  if (!deleted) {
    return res.status(404).json({ error: "Code not found" });
  }
  res.json({ ok: true });
});

app.get("/code/:code", async (req, res) => {
  const { code } = req.params;
  const link = await Longlink.findOne({ code });
  if (!link) {
    return res.status(404).send("Short code not found");
  }
  res.render("stats", { link });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server running at port ${process.env.PORT}`);
});
