"use strict";

const fs = require("fs");

const rawDataset = JSON.parse(fs.readFileSync("raw_dataset.json"));
const rawDatasetKeyFriendsArray = Object.getOwnPropertyNames(rawDataset);

console.log("rawDatasetKeyFriendsArray", rawDatasetKeyFriendsArray);

const rawDatasetArray = Object.keys(rawDataset);
const rawDatasetLength = rawDatasetArray.length;
const colors = [
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#00b894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#2c3e50",
  "#f6e58d",
  "#ffbe76",
  "#ff7979",
  "#badc58",
  "#f9ca24",
  "#f0932b",
  "#eb4d4b",
  "#6ab04c",
  "#7ed6df",
  "#e056fd",
  "#686de0",
  "#30336b",
  "#22a6b3",
  "#be2edd",
  "#4834d4",
  "#130f40",
  "#00a8ff",
  "#9c88ff",
  "#fbc531",
  "#4cd137",
  "#487eb0",
  "#0097e6",
  "#8c7ae6",
  "#e1b12c",
  "#44bd32",
  "#40739e",
  "#e84118",
  "#c23616",
  "#273c75",
  "#ff9ff3",
  "#feca57",
  "#ff6b6b",
  "#48dbfb",
  "#1dd1a1",
  "#f368e0",
  "#ff9f43",
  "#ee5253",
  "#0abde3",
  "#10ac84",
  "#00d2d3",
  "#54a0ff",
  "#5f27cd",
  "#01a3a4",
  "#2e86de",
  "#341f97",
  "#cd84f1",
  "#ffcccc",
  "#ff4d4d",
  "#ffaf40",
  "#fffa65",
  "#c56cf0",
  "#ffb8b8",
  "#ff3838",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
  "#3ae374",
  "#67e6dc",
  "#17c0eb",
  "#7158e2",
];

let outputDataset = {
  nodes: [],
  links: [],
};

for (let myFriendIndex = 0; myFriendIndex < rawDatasetLength; myFriendIndex++) {
  for (
    let friendsIndex = 0;
    friendsIndex < rawDataset[rawDatasetArray[myFriendIndex]]["friends"].length;
    friendsIndex++
  ) {
    let id;
    if (friendsIndex === 0) {
      id = rawDatasetKeyFriendsArray[myFriendIndex];
    } else {
      id = rawDataset[rawDatasetArray[myFriendIndex]]["friends"][friendsIndex];
    }

    let nodeObject = {
      id,
      group: myFriendIndex,
      color: colors[myFriendIndex],
    };

    let linkObject = {
      source: rawDatasetKeyFriendsArray[myFriendIndex],
      target:
        rawDataset[rawDatasetArray[myFriendIndex]]["friends"][friendsIndex],
    };

    outputDataset.nodes.push(nodeObject);
    outputDataset.links.push(linkObject);
  }
}

let parsedData = JSON.stringify(outputDataset, null, 4);
fs.writeFileSync("../public/output_dataset.json", parsedData);
