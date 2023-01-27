import { GameMap } from "./map";
import { Adventurer } from "./adventurer";
import { write_toFile } from "./utility";

export class Game {
  constructor(public map: GameMap) {}

  public gameLoop(): void {
    while (!this.is_over()) {
      this.map.adventurerList.forEach((adventurer) => {
        if (this.map.is_movePossible(adventurer)) {
          adventurer.move();
          this.map.give_treasures(adventurer);
        } else {
          if (!adventurer.has_noMoreMoves()) {
            adventurer.nextMove();
          }
        }
      });
    }
    this.write_outFile();
  }

  public is_over(): boolean {
    let is_over = true;
    this.map.adventurerList.forEach((adventurer: Adventurer) => {
      is_over = is_over && adventurer.has_noMoreMoves();
    });
    return is_over;
  }

  public write_outFile(): void {
    let mapData: string = "C - ";
    mapData += `${this.map.shape.xLength} - ${this.map.shape.yLength}\n`;
    this.map.mountainList.forEach((mountain) => {
      mapData += `M - ${mountain.position.xPosition} - ${mountain.position.yPosition}\n`;
    });
    this.map.treasureList.forEach((treasure) => {
      mapData += `T - ${treasure.position.xPosition} - ${treasure.position.yPosition} - ${treasure.numberOfTreasures}\n`;
    });
    this.map.adventurerList.forEach((adventurer) => {
      mapData += `A - ${adventurer.adventurerParameter.name} - ${adventurer.adventurerParameter.position.xPosition} - ${adventurer.adventurerParameter.position.yPosition} - ${adventurer.adventurerParameter.direction} - ${adventurer.numberOfTreasures}\n`;
    });
    write_toFile(mapData);
  }

  //créer un type position
}
