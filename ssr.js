const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const path = require('path');
let app = express();

// Define the port to run on
app.use(express.static(path.join(__dirname, 'dist')));

// Listen for requests
let server = app.listen(8081);

//
(async () => {
  const browser = await puppeteer.launch({headeless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:8081/idn/');

  page.on("error", function (err) {
    theTempValue = err.toString();
    console.log("Error: " + theTempValue);
  });

  let bodyRootHTML = await page.evaluate(() => document.getElementById('app').innerHTML);
  console.log(bodyRootHTML)

  fs.readFile('dist/index.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/<!-- tobereplace -->/g, bodyRootHTML);
    result = result.replace(/\r?\n|\r/g, "").replace(/>\s+</g, "><");
    fs.writeFile('dist/index.html', result, 'utf8', function (err) {
       if (err) return console.log(err);
       server.close();
    });
  });

  await browser.close();
})();
