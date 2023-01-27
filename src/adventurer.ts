import { AdventurerParameterType } from "./adventurerParameterType";

export class Adventurer {
  public numberOfTreasures: number;
  public directionList: string[];
  public has_advanced = false;
  constructor(public adventurerParameter: AdventurerParameterType) {
    this.directionList = ["N", "E", "S", "O"];
    this.numberOfTreasures = 0;
  }

  public has_noMoreMoves() {
    return (
      this.adventurerParameter.moves == undefined ||
      this.adventurerParameter.moves.length == 0
    );
  }

  public move(): void {
    this.has_advanced = false;
    switch (this.adventurerParameter.moves[0]) {
      case "D":
        this.turn_right();
        break;
      case "G":
        this.turn_left();
        break;
      case "A":
        this.advance();
        this.has_advanced = true;
        break;
    }
    this.nextMove();
  }

  public turn_left(): void {
    const direction_index = this.directionList.indexOf(
      this.adventurerParameter.direction
    );
    if (direction_index == 0) {
      this.adventurerParameter.direction =
        this.directionList[this.directionList.length - 1];
    } else {
      this.adventurerParameter.direction =
        this.directionList[direction_index - 1];
    }
  }

  public turn_right(): void {
    const direction_index = this.directionList.indexOf(
      this.adventurerParameter.direction
    );
    if (direction_index == this.directionList.length - 1) {
      this.adventurerParameter.direction = this.directionList[0];
    } else {
      this.adventurerParameter.direction =
        this.directionList[direction_index + 1];
    }
  }

  public advance(): void {
    switch (this.adventurerParameter.direction) {
      case "N":
        this.adventurerParameter.position.yPosition--;
        break;
      case "S":
        this.adventurerParameter.position.yPosition++;
        break;
      case "E":
        this.adventurerParameter.position.xPosition++;
        break;
      case "O":
        this.adventurerParameter.position.xPosition--;
        break;
    }
  }
  public nextMove(): void {
    this.adventurerParameter.moves = this.adventurerParameter.moves.slice(1);
  }
}
