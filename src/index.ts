import express from "express";

const app = express();

const port = process.env.PORT || 8000;

async function main() {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

main();
