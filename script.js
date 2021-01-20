var turnCounter = 0;
var colorCounter = 0;
var userInput = [];
var computerCode = [];
var feedback = [];
const colors = ["red","yellow","green","blue","black","white"];
populateUserArea = () => {
  var ua = document.getElementById('user-area');
  for (j=9;j>-1;j--) {
    row = document.createElement('div');
    ua.appendChild(row);
    row.setAttribute('class','row');
    row.setAttribute('id',`row-${j}`);
    for (i=0;i<4;i++) {
      peg = document.createElement('div');
      row.appendChild(peg);
      peg.setAttribute('id',`user-peg-${i + (j * 4)}`);
      peg.setAttribute('class','peg');
    }
    fb = document.createElement('div');
    row.appendChild(fb);
    fb.setAttribute('id','feedback');
    btn = document.createElement('button');
    row.appendChild(btn);
    btn.setAttribute('id',`row-${j}-guess`);
    btn.textContent = 'GUESS';
    topFeedback = document.createElement('div');
    bottomFeedback = document.createElement('div');
    fb.appendChild(topFeedback);
    fb.appendChild(bottomFeedback);
    topFeedback.setAttribute('id','top-feedback');
    bottomFeedback.setAttribute('id','bottom-feedback');
    fp = document.createElement('div');
    topFeedback.appendChild(fp);
    fp.setAttribute('id',`feedback-peg-${0 + (j * 4)}`);
    fp.setAttribute('class','feedback-peg');
    fp = document.createElement('div');
    topFeedback.appendChild(fp);
    fp.setAttribute('id',`feedback-peg-${1 + (j * 4)}`);
    fp.setAttribute('class','feedback-peg');
    fp = document.createElement('div');
    bottomFeedback.appendChild(fp);
    fp.setAttribute('id',`feedback-peg-${2 + (j * 4)}`);
    fp.setAttribute('class','feedback-peg');
    fp = document.createElement('div');
    bottomFeedback.appendChild(fp);
    fp.setAttribute('id',`feedback-peg-${3 + (j * 4)}`);
    fp.setAttribute('class','feedback-peg');
  }  
}
populateUserArea();
generateRandomCode = () => {
  computerCode = [colors[Number((Math.random() * 5).toFixed())],
                  colors[Number((Math.random() * 5).toFixed())],
                  colors[Number((Math.random() * 5).toFixed())],
                  colors[Number((Math.random() * 5).toFixed())]];
  for (i=0;i<4;i++) {
    peg = document.getElementById(`code-peg-${i}`);
    peg.setAttribute('style', `background-color: gray;`);
  }
}
revealCodemakerLine = () => {
  for (i=0;i<4;i++) {
    peg = document.getElementById(`code-peg-${i}`);
    peg.setAttribute('style', `background-color: ${computerCode[i]};`);
  }
}
hideCodemakerLine = () => {
  for (i=0;i<4;i++) {
    peg = document.getElementById(`code-peg-${i}`);
    peg.setAttribute('style', `background-color: gray;`);
  }
}
revealFeedback = (rowNumber) => {
  for (i=0;i<4;i++) {
    peg = document.getElementById(`feedback-peg-${i + (rowNumber * 4)}`);
    peg.setAttribute('style', `background-color: ${feedback[i]};`);
  }
  checkForWin(rowNumber);
  feedback = [];
}
pickColor = (spot) => {
  peg = document.getElementById(`user-peg-${spot}`);
  peg.setAttribute('style', `background-color: ${colors[colorCounter]};`);
  colorCounter++;
  if (colorCounter === 6) {
    colorCounter = 0;
  }
}
guessAndGetFeedback = (rowNumber) => {
  var userRow = [];
  for (i=0;i<4;i++) {
    userPeg = document.getElementById(`user-peg-${i + (rowNumber * 4)}`);
    userPeg = userPeg.style.backgroundColor;
    userRow[i] = userPeg;
  }
  if (userRow.includes('') === false) {
    userInput[rowNumber] = userRow;
    adjustEvents(rowNumber);
    giveFeedback(rowNumber);
  } else {
    alert('Make sure you select 4 colors');
  }
}
redFeedback = (rowNumber) => {
  red = 0;
  for (i=0;i<4;i++) {
    if (userInput[rowNumber][i] === computerCode[i]) {
      red = red + 1;    
    } else {
    }
  }
  return red;
}
giveFeedback = (rowNumber) => {
  var computerTally = [0,0,0,0,0,0];
  var userTally = [0,0,0,0,0,0];
  var white = 0;
  for (i=0;i<colors.length;i++) {
    for (j=0;j<4;j++) {
      if (userInput[rowNumber][j] === colors[i]) {
        userTally[i]++;
      }
      if (computerCode[j] === colors[i]) {
        computerTally[i]++;
      }
    }
  }
  for (i=0;i<colors.length;i++) {
    if (userTally[i] === 0) {
    } else if (userTally[i] !== 0 && userTally[i] >= computerTally[i]) {
      white = white + computerTally[i];
    } else if (userTally[i] !== 0 && userTally[i] < computerTally[i]) {
      white = white + userTally[i]
    }
  }
  red = redFeedback(rowNumber);
  white = white - red;
  for (i=0;i<red;i++) {
    feedback.push('red')
  }
  for (i=0;i<white;i++) {
    feedback.push('white')
  }
  revealFeedback(rowNumber);
}
checkForWin = (rowNumber) => {
  if (feedback.includes('white') === false && feedback.length === 4) {
    revealCodemakerLine();
    for (i=0;i<4;i++) {
      peg = document.getElementById(`user-peg-${i + ((rowNumber + 1) * 4)}`);
      peg.removeAttribute('onclick');
    }
  btn = document.getElementById(`row-${rowNumber + 1}-guess`);
  btn.removeAttribute('onclick');
  }
}
adjustEvents = (rowNumber) => {
  for (i=0;i<4;i++) {
    peg = document.getElementById(`user-peg-${i + (rowNumber * 4)}`);
    peg.removeAttribute('onclick');
  }
  if (rowNumber !== 9) {
    enablePickColor(rowNumber + 1)
  }
  btn = document.getElementById(`row-${rowNumber}-guess`);
  btn.removeAttribute('onclick');
  if (rowNumber !== 9) {
    enableButton(rowNumber + 1);
  }
}
disableAllEvents = () => {
  for (j=0;j<10;j++) {
    for (i=0;i<4;i++) {
      peg = document.getElementById(`user-peg-${i + (j * 4)}`);
      peg.removeAttribute('onclick');
    }
    btn = document.getElementById(`row-${rowNumber}-guess`);
    btn.removeAttribute('onclick');
  }
}
enableButton = (rowNumber) => {
  for (i=0;i<10;i++) {
    btn = document.getElementById(`row-${rowNumber}-guess`);  
    btn.setAttribute('onclick', `guessAndGetFeedback(${rowNumber})`);
  }
}
startNewGame = () => {
  generateRandomCode();
  enableButton(0);
  enablePickColor(0);
}
enablePickColor = (rowNumber) => {
  for (i=0;i<4;i++) {
    peg = document.getElementById(`user-peg-${i + (rowNumber * 4)}`);
    peg.setAttribute('onclick', `pickColor(${i + (rowNumber * 4)})`);
  }
}
