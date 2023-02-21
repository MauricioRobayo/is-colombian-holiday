/* eslint-disable no-console, no-await-in-loop */

const axios = require("axios").default;

const maxTimeInHours = 8;
const timeoutMs = 2000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const webhook = process.argv[2];

if (!webhook) {
  console.error("No webhook provided!");
  process.exit(1);
}

let lapseInSeconds = 2;

const exponentialRetryBackOff = async () => {
  while (lapseInSeconds < maxTimeInHours * 60 * 60) {
    try {
      const { data, status } = await axios.post(
        webhook,
        {},
        { timeout: timeoutMs }
      );
      console.log({ data, status });
      return 0;
    } catch (error) {
      console.log(error.toJSON());
      console.log(`Waiting ${lapseInSeconds} seconds before next retry...`);
      await sleep(lapseInSeconds * 1000);
      lapseInSeconds *= 2;
    }
  }

  console.log("Max time exceeded, no more retries left. Request failed!");
  return 1;
};

exponentialRetryBackOff()
  .then(process.exit)
  .catch(() => process.exit(1));
