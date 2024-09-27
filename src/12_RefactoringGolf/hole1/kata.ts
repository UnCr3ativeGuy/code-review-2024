/* eslint-disable */

const emptyPlay = ' ';
const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;
export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    let playerO = 'O';
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
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
    if (this._board.isTileEmpty(x,y)) {
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
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this._board.getTileSymbol(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this._board.getTileSymbol(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this._board.getTileSymbol(thirdRow, firstColumn);
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
        this._board.isTileEmpty(row,firstColumn) &&
        this._board.isTileEmpty(row,secondColumn) &&
        this._board.isTileEmpty(row,thirdColumn)
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
        this._board.getTileSymbol(row, firstColumn) ==
        this._board.getTileSymbol(row, secondColumn) &&
        this._board.getTileSymbol(row, thirdColumn) ==
        this._board.getTileSymbol(row, secondColumn)
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
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public getTileSymbol(x: number, y: number): string {
    return this.TileAt(x, y)!.Symbol
  }

  public isTileEmpty(x: number, y: number): boolean {
    return this.getTileSymbol(x,y) != emptyPlay
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
