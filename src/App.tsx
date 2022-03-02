import React, { useEffect, useState } from 'react';
import logo from './enara-log-web-300x60.png';
import './App.css';
import { BoardInterface, BoardObjectInterface, DictionaryInterface, PointsInterface, Utils } from './_helpers';

function App() {
  const [listBoard] = useState<BoardInterface>(
    Math.floor(Math.random() * (3 - 1) + 1) === 1
      ? (require('./files/test-board-1.json') as BoardInterface)
      : (require('./files/test-board-2.json') as BoardInterface),
  );
  const [dictionary] = useState<DictionaryInterface>(
    require('./files/dictionary.json') as DictionaryInterface,
  );
  const [board] = useState(listBoard.board);
  const [matrixBoard, setMatrixBoard] = useState([]);

  const [word, setWord] = useState<any[]>([]);
  const [wordIsCorrect, setWordIsCorrect] = useState(false);
  let idCount = 0;

  useEffect(() => {
    const boardReduce = board.reduce(
      (acc: BoardObjectInterface[], current: string, index: number) => {
        acc[index] = { board: current, selected: false, id: index };
        return acc;
      },
      [],
    );
    setWord(res => []);
    Utils.listToMatrix(boardReduce, 4).then((matrix: any) =>
      setMatrixBoard(matrix),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let element = '';

    word.map(res => element = element + '' + res.letter)
    console.log(element)
    const findWord = dictionary.words.find(
      wordDict => wordDict === element.toLowerCase(),
    );
    findWord !== undefined ? setWordIsCorrect(true) : setWordIsCorrect(false);
  }, [word]);

  const handleCheck = (indexX: number, indexY: number) => {
    setMatrixBoard((prevState: any) =>
      prevState.map((row: BoardObjectInterface[], iX: number) =>
        row.map((col: BoardObjectInterface, iY: number) =>
          isAdjacency(indexX, indexY)
            ? iX === indexX && iY === indexY
              ? pushLetterInWord({ ...col, selected: true })
              : col
            : col,
        ),
      ),
    );
    // dictionary.words.find(words=>)
  };
  const isAdjacency = (indexX: number, indexY: number) => {
    let result = true;
    const matrixAux = matrixBoard;
    matrixAux.map((row: any, iX: any) =>
      row.map((col: any, iY: any) =>
        col.selected
          ? Utils.nCoordinates(iX, iY).find(
            (coords: PointsInterface) =>
              coords.x === indexX && coords.y === indexY,
          )
            ? (result = true)
            : (result = false)
          : '',
      ),
    );
    return result;
  };
  const handleClearWord = () => {
    setMatrixBoard((prevState: any) =>
      prevState.map((row: any) =>
        row.map((col: any) =>
          col.selected ? { ...col, selected: false } : { ...col, selected: false },
        ),
      ),
    );
    setWord(res => []);
  };
  const pushLetterInWord = (objectBoard: BoardObjectInterface) => {
    if (idCount !== 1) {
      setWord(result => [
        ...result,
        {
          id: idCount,
          letter: objectBoard.board,
        },
      ])
    }

    idCount++;

    return objectBoard;
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={styles.desf}>
          <div style={styles.desfText}>Fullstack Interview - Victor Galvez</div>
        </div>
        <div className="flexbox-container">
          <div className="container-board">
            {matrixBoard.map(
              (sub: BoardObjectInterface[], indexX: number) =>
                sub.map(
                  (_board: BoardObjectInterface, indexY: number) => (

                    <div className="box-board" onClick={() => handleCheck(indexX, indexY)}>
                      <div key={_board.id}>
                        <div style={
                          _board.selected
                            ? styles.selectedButton
                            : styles.noSelectedButton
                        } className="content-board" >
                          {_board.board}
                        </div>
                      </div>
                    </div>
                  ),
                ),
            )}
          </div>
          <div className="align-bottom">
            <div className="container-refresh" onClick={() => handleClearWord()}>
              Clear word
              <span className="circule-icon">X</span>
            </div>
            <div className="container-input">
              <div style={!wordIsCorrect ? styles.invalidText : styles.validText} className="box-input">
                <div>
                  {
                    word.map((_word: any) => (
                      _word.letter
                    ))
                  }
                </div>
                <div>
                  {!wordIsCorrect ?
                    "Invalid"
                    :
                    "Valid"
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

const styles = {
  noSelectedButton: {
    backgroundImage: "linear-gradient(to bottom, #FAD760,  #F76E1E)",
    border: " 2px solid #D93849"
  },
  selectedButton: {
    backgroundImage: "linear-gradient(to bottom, #F34F5E,  #A1061D)",
  },
  validText: {
    color: '#A1D65B',
  },
  invalidText: {
    color: '#A83133',
  },
  desf: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    padding: 20,
    color:'black'
  },
  desfText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}