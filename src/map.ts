import { Mountain } from "./mountain";
import { Adventurer } from "./adventurer";
import { Treasure } from "./treasure";
import {
  create_AdventurerParameters,
  is_between,
  processMapData,
} from "./utility";
import { position } from "./position";
import { shape } from "./shape";
import { AdventurerParameterType } from "./adventurerParameterType";
export class GameMap {
  public adventurerList: Adventurer[];
  public mountainList: Mountain[];
  public treasureList: Treasure[];
  public shape: shape;
  constructor(mapData: string) {
    this.shape = { xLength: 0, yLength: 0 };
    this.adventurerList = new Array();
    this.mountainList = new Array();
    this.treasureList = new Array();
    const mapData2D = processMapData(mapData);
    mapData2D.forEach((map_item) => {
      const letter_identifier: string = map_item[0];
      const position: position = {
        xPosition: parseInt(map_item[1]),
        yPosition: parseInt(map_item[2]),
      };
      switch (letter_identifier) {
        case "C":
          //set shape
          this.shape = {
            xLength: parseInt(map_item[1]),
            yLength: parseInt(map_item[2]),
          };
          break;
        case "M":
          this.add_mountain(position);
          break;
        case "T":
          this.add_treasure(position, map_item[3]);

          break;
        case "A":
          this.add_adventurer(map_item);
          break;
        default:
          break;
      }
    });
  }
  public add_mountain(position: position) {
    if (this.is_positionAvailable(position)) {
      this.mountainList.push(new Mountain(position));
    }
  }
  add_treasure(position: position, numberOfTreasures: string) {
    if (this.is_positionAvailable(position)) {
      this.treasureList.push(
        new Treasure(parseInt(numberOfTreasures), position)
      );
    }
  }
  public add_adventurer(map_item: string[]) {
    const adventurerParameter: AdventurerParameterType =
      create_AdventurerParameters(map_item);
    if (this.is_positionAvailable(adventurerParameter.position)) {
      this.adventurerList.push(new Adventurer(adventurerParameter));
    }
  }

  public is_positionAvailable(
    position: position,
    skipTreasuresFlag: boolean = false
  ): boolean {
    return (
      this.is_onMap(position) && this.is_empty(position, skipTreasuresFlag)
    );
  }

  public is_onMap(position: position): boolean {
    const a = is_between(position.xPosition, this.shape.xLength);
    const b = is_between(position.yPosition, this.shape.yLength);
    return a && b;
  }

  public is_empty(position: position, skipTreasuresFlag: boolean): boolean {
    let is_empty: boolean = true;
    this.mountainList.forEach((mountain) => {
      is_empty =
        is_empty && !this.is_positionEqual(position, mountain.position);
    });

    this.adventurerList.forEach((adventurer) => {
      is_empty =
        is_empty &&
        !this.is_positionEqual(
          position,
          adventurer.adventurerParameter.position
        );
    });
    if (!skipTreasuresFlag) {
      this.treasureList.forEach((treasure) => {
        is_empty =
          is_empty && !this.is_positionEqual(position, treasure.position);
      });
    }
    return is_empty;
  }
  public is_positionEqual(posA: position, posB: position) {
    return posA.xPosition == posB.xPosition && posA.yPosition == posB.yPosition;
  }

  public is_movePossible(adventurer: Adventurer): boolean {
    if (adventurer.has_noMoreMoves()) {
      return false;
    }
    const move: string = adventurer.adventurerParameter.moves[0];

    switch (move) {
      case "D":
        return true;

      case "G":
        return true;

      case "A":
        return this.is_nextPositionAvailable(adventurer);
      default:
        return false;
    }
  }

  public is_nextPositionAvailable(adventurer: Adventurer): boolean {
    const direction = adventurer.adventurerParameter.direction;
    switch (direction) {
      case "N":
        let new_positionNorth: position = {
          xPosition: adventurer.adventurerParameter.position.xPosition,
          yPosition: adventurer.adventurerParameter.position.yPosition - 1,
        };
        return this.is_positionAvailable(new_positionNorth, true);
      case "S":
        let new_positionSuouth: position = {
          xPosition: adventurer.adventurerParameter.position.xPosition,
          yPosition: adventurer.adventurerParameter.position.yPosition + 1,
        };
        return this.is_positionAvailable(new_positionSuouth, true);
      case "E":
        let new_positionEast: position = {
          xPosition: adventurer.adventurerParameter.position.xPosition + 1,
          yPosition: adventurer.adventurerParameter.position.yPosition,
        };
        return this.is_positionAvailable(new_positionEast, true);
      case "O":
        let new_positionWest: position = {
          xPosition: adventurer.adventurerParameter.position.xPosition - 1,
          yPosition: adventurer.adventurerParameter.position.yPosition,
        };
        return this.is_positionAvailable(new_positionWest, true);
      default:
        return false;
    }
  }
  public give_treasures(adventurer: Adventurer): void {
    this.treasureList.forEach((treasure) => {
      if (
        this.is_positionEqual(
          adventurer.adventurerParameter.position,
          treasure.position
        ) &&
        adventurer.has_advanced
      ) {
        adventurer.numberOfTreasures++;
        treasure.numberOfTreasures--;
      }
      if (treasure.numberOfTreasures == 0) {
        const toDelete = [treasure];
        this.treasureList = this.treasureList.filter(
          (item) => !toDelete.includes(item)
        );
      }
    });
  }

  /*   public set_mapData2D(mapData2D: string[][]) {
    this.mapData2D = mapData2D;
  }

  set_mapLayout(lenX: number, lenY: number) {
    this.mapRepresentation = [...Array(lenX)].map((e) =>
      Array(lenY).fill(new Tile())
    );
  }

  set_Mountains(xPosition: number, yPosition: number) {
    if (this.is_onMap(xPosition, yPosition)) {
      this.mapRepresentation[xPosition][yPosition] = new Mountain();
    }
  }

  set_Adventurer(adventurer: Adventurer) {
    if (
      this.is_onMap(
        adventurer.adventurerParameter.xPosition,
        adventurer.adventurerParameter.yPosition
      )
    ) {
      this.mapRepresentation[adventurer.adventurerParameter.xPosition][
        adventurer.adventurerParameter.yPosition
      ] = adventurer;
    } else {
      console.log("SUUUUUUUUUUR LA CAAAAAAAARTE");
    }
  }

  set_Treasure(xPosition: number, yPosition: number, numberOfTreasure: number) {
    if (this.is_onMap(xPosition, yPosition)) {
      this.mapRepresentation[xPosition][yPosition] = new Treasure(
        numberOfTreasure
      );
    }
  }



  update_adventurerPosition(adventurer: Adventurer) {
    let tile: Tile =
      this.mapRepresentation[adventurer.adventurerParameter.xPosition][
        adventurer.adventurerParameter.yPosition
      ];
    console.log(tile);
    if (tile.symbol.startsWith("T")) {
      console.log("TEEEEEEEEEEEEEEEEEEST");
      adventurer.numberOfTreasures++;
      (tile as Treasure).numberOfTreasures--;
      (tile as Treasure).is_available = false;
    } else {
      this.mapRepresentation[adventurer.adventurerParameter.xPosition][
        adventurer.adventurerParameter.yPosition
      ] = adventurer;
      this.mapRepresentation[adventurer.old_xPosition][
        adventurer.old_yPosition
      ] = tile;
    }
  }

  public toString(): string {
    let sValue = "";

    this.mapRepresentation.forEach((row) => {
      row.forEach((tile) => {
        sValue = sValue + tile.toString();
      });
      sValue += "\n";
    });
    return sValue;
  } */
}
