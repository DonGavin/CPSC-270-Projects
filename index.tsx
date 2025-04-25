import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Cell component
function Cell(props) {
  function handlePress() {
    props.onPress();
  }

  return (
    <TouchableOpacity
      style={[styles.cell, props.isOn ? styles.cellOn : styles.cellOff]}
      onPress={handlePress}
    />
  );
}

// Board component
function Board(props) {
  function renderRow(row, rowIndex) {
    return (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
      </View>
    );
  }

  function renderCell(cell, rowIndex, colIndex) {
    function handleCellPress() {
      props.onToggle(rowIndex, colIndex);
    }

    return (
      <Cell
        key={`${rowIndex}-${colIndex}`}
        isOn={cell}
        onPress={handleCellPress}
      />
    );
  }

  return (
    <View style={styles.board}>
      {props.board.map(renderRow)}
    </View>
  );
}

function LightsOutGame(props) {
  const boardSize = props.boardSize || 5;
  function createInitialBoard() {
    if (props.initialBoard) {
      return props.initialBoard;
    }
    const newBoard = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(Math.random() > 0.5);
      }
      newBoard.push(row);
    }
    return newBoard;
  }
  
  const [board, setBoard] = useState(createInitialBoard);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  

  useEffect(function checkWinCondition() {
    let isWon = true;
    
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j]) {
          isWon = false;
          break;
        }
      }
      if (!isWon) {
        break;
      }
    }
    
    setHasWon(isWon);
  }, [board]);
  

  function toggleCell(board, row, col) {
    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      board[row][col] = !board[row][col];
    }
    return board;
  }
  

  function handleToggle(row, col) {
    if (hasWon) {
      return;
    }
    
    setBoard(function updateBoard(prevBoard) {
      // Create a deep copy of the board
      const newBoard = prevBoard.map(row => [...row]);
      
      // Toggle the cell and its neighbors
      toggleCell(newBoard, row, col);      // Center
      toggleCell(newBoard, row-1, col);    // Up
      toggleCell(newBoard, row+1, col);    // Down
      toggleCell(newBoard, row, col-1);    // Left
      toggleCell(newBoard, row, col+1);    // Right
      
      return newBoard;
    });
    
    setMoves(function incrementMoves(prevMoves) {
      return prevMoves + 1;
    });
  }
  
  function resetGame() {
    setBoard(createInitialBoard());
    setMoves(0);
    setHasWon(false);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LIGHTS OUT GAME</Text>
      <Board board={board} onToggle={handleToggle} />
      <Text style={styles.moves}>Moves: {moves}</Text>
      
      {hasWon && (
        <Text style={styles.winText}>You won! Play again?</Text>
      )}
      
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: 250,
    height: 250,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    margin: 3,
    borderWidth: 1,
    borderColor: '#888',
  },
  cellOn: {
    backgroundColor: 'yellow',
  },
  cellOff: {
    backgroundColor: 'black',
  },
  moves: {
    fontSize: 18,
    marginTop: 15,
  },
  winText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LightsOutGame;

// Mockup 

// --------------------------------
// |                              |
// |      [ ][ ][X][ ][ ]         |
// |      [ ][X][X][X][ ]         |
// |      [X][X][ ][X][X]         |
// |      [ ][X][X][X][ ]         |
// |      [ ][ ][X][ ][ ]         |
// |                              |
// |                              |
// --------------------------------
// Mockup JSON 
// {
//   "boardSize": 5,
//   "initialBoard": [
//     [false, false, true, false, false],
//     [false, true, true, true, false],
//     [true, true, false, true, true],
//     [false, true, true, true, false],
//     [false, false, true, false, false]
//   ]
// }