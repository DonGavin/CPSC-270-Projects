import React, { useState } from 'react';
import { View,  TouchableOpacity, StyleSheet } from 'react-native';

class LightsOutGame {
  private board: number[][];
  private moves: number;
  private hasWon: boolean;

  constructor(private boardSize: number, initialBoard?: number[][]) {
    this.board = initialBoard || this.createRandomBoard();
    this.moves = 0;
    this.hasWon = false;
  }

  reset(initialBoard: number[][] | null = null) {
    this.board = initialBoard || this.createRandomBoard();
    this.moves = 0;
    this.hasWon = false;
  }

  getBoard(): number[][] {
    return this.board;
  }

  getMoves(): number {
    return this.moves;
  }

  toggleCell(row: number, col: number) {
    const toggle = (r: number, c: number) => {
      if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
        this.board[r][c] = this.board[r][c] === 1 ? 0 : 1;
      }
    };

    toggle(row, col); 
    toggle(row - 1, col); 
    toggle(row + 1, col); 
    toggle(row, col - 1); 
    toggle(row, col + 1); 

    this.moves += 1;
    this.checkWinCondition();
  }

  private checkWinCondition() {
    this.hasWon = this.board.every(row => row.every(cell => cell === 0));
  }

  private createRandomBoard(): number[][] {
    return Array.from({ length: this.boardSize }, () =>
      Array.from({ length: this.boardSize }, () => Math.round(Math.random()))
    );
  }
}

function LightsOutController(props) {
  const boardSize = props.boardSize || 5;
  const initialBoard = props.initialBoard;

  const [model] = useState(() => new LightsOutGame(boardSize, initialBoard));
  const [, setRenderTrigger] = useState(0);

  function forceUpdate() {
    setRenderTrigger(prev => prev + 1);
  }

  function handleCellPress(row: number, col: number) {
    model.toggleCell(row, col);
    forceUpdate();
  }

  return (
    <View style={styles.board}>
      {model.getBoard().map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.cell,
                { backgroundColor: cell === 1 ? 'black' : 'white' },
              ]}
              onPress={() => handleCellPress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    margin: 2,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default LightsOutController;