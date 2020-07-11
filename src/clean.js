"use strict";

const fs = require("fs");
let dirtyData = JSON.parse(fs.readFileSync("../public/output_dataset.json"));

const nodeSize = dirtyData["nodes"].length;
const linkSize = dirtyData["links"].length;

let foundFlag = false;
let cleanedIDs = [];

console.log(`Initializing...`);
console.log(`nodeSize: ${nodeSize}\nlinkSize: ${linkSize}`);

for (let linkObjectIndex = 0; linkObjectIndex < linkSize; linkObjectIndex++) {
  let linkSource = dirtyData["links"][linkObjectIndex]["source"];
  let linkTarget = dirtyData["links"][linkObjectIndex]["target"];
  foundFlag = false;

  console.log(`Scanning ${linkTarget}, which is ${linkObjectIndex} of ${linkSize}...`);
  
  for (let nodeObjectIndex = 0; nodeObjectIndex < nodeSize; nodeObjectIndex++) {
    let nodeID = dirtyData["nodes"][nodeObjectIndex]["id"];

    console.log("\x1b[31m", `Testing ${nodeID} against ${linkTarget}`);

    if (linkTarget === nodeID) {
      // Node found.
      foundFlag = true;
      break;
    }
  }

  if (foundFlag === true) {
    // Node found.
    continue;
  } else {
    // Node not found. Delete link.
    cleanedIDs.append(linkTarget);
    console.log(`Cleaning ${linkTarget}, who is the target of ${linkSource}.`);
    dirtyData["link"].splice(linkObjectIndex, 1);
  }
}

console.log(`Cleaned: ${cleanedIDs}`);

let cleanData = JSON.stringify(dirtyData, null, 4);
fs.writeFileSync("../public/clean_dataset.json", cleanData);