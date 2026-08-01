import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const svg = readFileSync(new URL("../app/icon.svg", import.meta.url));

await sharp(svg).resize(32, 32).png().toFile("app/icon.png");
await sharp(svg).resize(32, 32).png().toFile("public/favicon.ico");
writeFileSync("public/favicon.svg", svg);
console.log("favicon assets written");
