import { position } from "./position";
export class Treasure {
  constructor(public numberOfTreasures: number, public position: position) {
    //on initialise à false pour eviter que les aventuriers apparaissent
  }
  public update_treasures() {
    this.numberOfTreasures = this.numberOfTreasures - 1;
  }
}
