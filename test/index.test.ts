import { readFromFile } from "../src/utility";

import { GameMap } from "../src/map";
import { Mountain } from "./../src/mountain";
import { Adventurer } from "./../src/adventurer";
import { Treasure } from "./../src/treasure";
import { shape } from "../src/shape";
import { Game } from "../src/game";

const assert = require("assert").strict;

describe("Unit Testing", function () {
  it("writes a outFile with game Data", function () {
    let data = readFromFile("./Test_files/test1.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    let outData = readFromFile("./out.txt");
    assert.strictEqual(
      outData,
      "C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 1 - 3 - 2\nA - Lara - 0 - 3 - S - 3\n"
    );
  });
  it("should read a file", function () {
    let data = readFromFile("./Test_files/test1.txt");
    assert.strictEqual(
      data,
      "C - 3 - 4\r\nM - 1 - 0\r\nM - 2 - 1\r\nT - 0 - 3 - 2\r\nT - 1 - 3 - 3\r\nA - Lara - 1 - 1 - S - AADADAGGA"
    );
  });
  it("should create a map of the right shape", function () {
    let data = readFromFile("./Test_files/test1.txt");
    const map: GameMap = new GameMap(data);
    const shape: shape = { xLength: 3, yLength: 4 };
    assert.deepStrictEqual(map.shape, shape);
  });

  it("should add the mountains", function () {
    let data = readFromFile("./Test_files/test1.txt");
    const map: GameMap = new GameMap(data);
    const mountainList: Mountain[] = [
      new Mountain({ xPosition: 1, yPosition: 0 }),
      new Mountain({ xPosition: 2, yPosition: 1 }),
    ];
    assert.deepStrictEqual(map.mountainList, mountainList);
  });

  it("should add the treasures", function () {
    let data = readFromFile("./Test_files/test1.txt");
    const map: GameMap = new GameMap(data);
    const treasureList: Treasure[] = [
      new Treasure(2, { xPosition: 0, yPosition: 3 }),
      new Treasure(3, { xPosition: 1, yPosition: 3 }),
    ];
    assert.deepStrictEqual(map.treasureList, treasureList);
  });
  it("should add the adventurers", function () {
    let data = readFromFile("./Test_files/test1.txt");
    const map: GameMap = new GameMap(data);
    const adventurerList: Adventurer[] = [
      new Adventurer({
        name: "Lara",
        position: { xPosition: 1, yPosition: 1 },
        direction: "S",
        moves: "AADADAGGA",
      }),
    ];
    assert.deepStrictEqual(map.adventurerList, adventurerList);
  });

  it("cannot have two adventurers loaded on the same position and will choose the first in the file", function () {
    let data = readFromFile("./Test_files/test3-1.txt");
    const map: GameMap = new GameMap(data);
    assert.strictEqual(map.adventurerList.length, 1);
  });
  it("cannot have two mountains loaded on the same position and will choose the first in the file", function () {
    let data = readFromFile("./Test_files/test3-2.txt");
    const map: GameMap = new GameMap(data);
    assert.strictEqual(map.mountainList.length, 1);
  });
  it("cannot have two treasures loaded on the same position and will choose the first in the file", function () {
    let data = readFromFile("./Test_files/test3-3.txt");
    const map: GameMap = new GameMap(data);
    assert.strictEqual(map.treasureList.length, 1);
  });

  it("cannot have an adventurer load onto a mountain, skips him/her", function () {
    let data = readFromFile("./Test_files/test4.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.adventurerList.length, 0);
  });
  it("cannot have a treasure load onto a mountain, skips it", function () {
    let data = readFromFile("./Test_files/test5.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.treasureList.length, 0);
  });

  //je fais l'hypothèse que un aventurier ne peut pas apparaitre sur un trésor
  it("cannot have an adventurer load onto a treasure, skips him/her", function () {
    let data = readFromFile("./Test_files/test6.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.adventurerList.length, 0);
  });
  it("cannot load an adventurer out of the map", function () {
    let data = readFromFile("./Test_files/test7.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.adventurerList.length, 0);
  });
  it("cannot load a mountain out of the map", function () {
    let data = readFromFile("./Test_files/test7.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.mountainList.length, 0);
  });

  it("cannot load a treasure out of the map", function () {
    let data = readFromFile("./Test_files/test7.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.treasureList.length, 0);
  });
  it("can handle negative positions without crashing", function () {
    let data = readFromFile("./Test_files/test8.txt");
    const map: GameMap = new GameMap(data);
    assert.deepStrictEqual(map.mountainList.length, 0);
  });

  it("will say it is over when adventurers have no moves", function () {
    let data = readFromFile("./Test_files/test9.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    assert.strictEqual(game.is_over(), true);
  });

  it("handles an adventurer turning right", function () {
    let data = readFromFile("./Test_files/test10.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.direction,
      "N"
    );
  });
  it("handles an adventurer turning left", function () {
    let data = readFromFile("./Test_files/test11.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.direction,
      "O"
    );
  });

  it("handles an adventurer walking east", function () {
    let data = readFromFile("./Test_files/test13-1.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.position.xPosition,
      1
    );
  });

  it("handles an adventurer walking west", function () {
    let data = readFromFile("./Test_files/test13-2.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.position.xPosition,
      0
    );
  });

  it("handles an adventurer walking north", function () {
    let data = readFromFile("./Test_files/test13-3.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.position.yPosition,
      0
    );
  });
  it("handles an adventurer walking south", function () {
    let data = readFromFile("./Test_files/test13-4.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.position.yPosition,
      1
    );
  });

  it("adventurers cannot walk into a mountain", function () {
    let data = readFromFile("./Test_files/test14.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.position.yPosition,
      0
    );
  });
  it("two adventurers cannot  walk into the same tile the first one moves, the other skips his turn", function () {
    let data = readFromFile("./Test_files/test15.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();

    assert.strictEqual(
      game.map.adventurerList[0].adventurerParameter.position.xPosition,
      1
    );
    assert.strictEqual(
      game.map.adventurerList[1].adventurerParameter.position.xPosition,
      2
    );
  });
  it("gives a treasure to an adventurer when he gets on a treasure tile", function () {
    let data = readFromFile("./Test_files/test16.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(game.map.adventurerList[0].numberOfTreasures, 1);
    assert.strictEqual(game.map.treasureList[0].numberOfTreasures, 2);
  });

  it("remove treasure once number of treasures goes to 0", function () {
    let data = readFromFile("./Test_files/test17.txt");
    const map: GameMap = new GameMap(data);
    const game: Game = new Game(map);
    game.gameLoop();
    assert.strictEqual(game.map.treasureList.length, 0);
  });
});
