const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messagesRoute = require("./routes/messageRoutes");
const crypto = require('crypto');


dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "set" : "not set");
console.log("EMAIL_TO:", process.env.EMAIL_TO);
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messagesRoute);

app.post('/api/tco-signature', (req, res) => {
  const { amount, currency, billingEmail } = req.body;
  const merchantCode = process.env.TCO_MERCHANT_CODE;
  const secretWord = process.env.TCO_SECRET_WORD;
  if (!merchantCode || !secretWord) {
    return res.status(500).json({ error: '2Checkout credentials not set' });
  }
  // 2CO signature: SHA256(merchantCode + amount + currency + billingEmail + secretWord)
  const signatureString = merchantCode + amount + currency + billingEmail + secretWord;
  const signature = crypto.createHash('sha256').update(signatureString).digest('hex');
  res.json({ signature, merchantCode });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
