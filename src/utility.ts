import { AdventurerParameterType } from "./adventurerParameterType";

const fs = require("fs");

const readFromFile = (path: string) => {
  const data: string = fs.readFileSync(path, "utf8");
  return data;
};

const processMapData = (mapString: string): string[][] => {
  let mapData: string[] = mapString.split("\n");
  mapData = mapData.map((row) => row.replace(/\s/g, ""));
  const mapData2D: string[][] = mapData.map((row) => row.split("-"));
  return mapData2D;
};

const create_AdventurerParameters = (
  map_item: string[]
): AdventurerParameterType => {
  return {
    name: map_item[1],
    direction: map_item[4],
    moves: map_item[5],
    position: {
      xPosition: parseInt(map_item[2]),
      yPosition: parseInt(map_item[3]),
    },
  };
};

const is_between = (value: number, max: number) => {
  return value >= 0 && value < max;
};

const write_toFile = (data: string) => {
  fs.writeFile("./out.txt", data, "utf8", (err: Error) => {
    if (err) {
      console.error(err);
    }
    // fichier écrit avec succès
  });
};

export {
  readFromFile,
  processMapData,
  create_AdventurerParameters,
  is_between,
  write_toFile,
};
