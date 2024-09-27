
const vide = ' ';
const firstLine = 0;
const secondLine = 1;
const thirdLine = 2;
export class Game {
  private _lastSymbol = vide;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == vide) {
      if (player == 'O') {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != vide) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(firstLine, firstLine)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(secondLine, firstLine)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(thirdLine, firstLine)!.Symbol;
    }

    return vide;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(firstLine, firstLine)!.Symbol != vide &&
      this._board.TileAt(firstLine, secondLine)!.Symbol != vide &&
      this._board.TileAt(firstLine, thirdLine)!.Symbol != vide
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(firstLine, firstLine)!.Symbol == this._board.TileAt(firstLine, secondLine)!.Symbol &&
      this._board.TileAt(firstLine, thirdLine)!.Symbol == this._board.TileAt(firstLine, secondLine)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(secondLine, firstLine)!.Symbol != vide &&
      this._board.TileAt(secondLine, secondLine)!.Symbol != vide &&
      this._board.TileAt(secondLine, thirdLine)!.Symbol != vide
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(secondLine, firstLine)!.Symbol == this._board.TileAt(secondLine, secondLine)!.Symbol &&
      this._board.TileAt(secondLine, thirdLine)!.Symbol == this._board.TileAt(secondLine, secondLine)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(thirdLine, firstLine)!.Symbol != vide &&
      this._board.TileAt(thirdLine, secondLine)!.Symbol != vide &&
      this._board.TileAt(thirdLine, thirdLine)!.Symbol != vide
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(thirdLine, firstLine)!.Symbol == this._board.TileAt(thirdLine, secondLine)!.Symbol &&
      this._board.TileAt(thirdLine, thirdLine)!.Symbol == this._board.TileAt(thirdLine, secondLine)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: vide };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
