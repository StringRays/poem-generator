//calls datamuse api for each line
function makeHaiku() {
const firstLine = document.getElementById("first").value;
const secondLine = document.getElementById("second").value;
const thirdLine = document.getElementById("third").value;

const firstLineAnswer = document.getElementById("firstLineAnswer");
const secondLineAnswer = document.getElementById("secondLineAnswer");
const thirdLineAnswer = document.getElementById("thirdLineAnswer");


//takes input and splits it up for datamuse query - for searching words & phrases
const firstURLString = firstLine.split(" ").join("+");
const secondURLString = secondLine.split(" ").join("+");
const thirdURLString = thirdLine.split(" ").join("+");

fetch(`http://api.datamuse.com/words?ml=${firstURLString}&md=s`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data) 
    firstLineAnswer.innerHTML=getCorrectSyllables(data, 5);
  });


fetch(`http://api.datamuse.com/words?ml=${secondURLString}&md=s`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data) 
    secondLineAnswer.innerHTML=getCorrectSyllables(data, 7);
  });


fetch(`http://api.datamuse.com/words?ml=${thirdURLString}&md=s`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data) 
    thirdLineAnswer.innerHTML=getCorrectSyllables(data, 5);
  });

  //clears inputs
  document.getElementById("first").value="";
  document.getElementById("second").value="";
  document.getElementById("third").value="";
}


//returns an array of syllables in the generated word array
const getCorrectSyllables = (array, number) => {
  const sylLengths = [];
  const sylIndexes = [];
  for (let i = 0; i < array.length; i++){

    //returns word with correct syllables if one exists
    if (array[i]['numSyllables'] === number){
      return array[i]['word'];
    }

    //otherwise, creates a map of other syllable lengths and their indexes
    if (array[i]['numSyllables'] < number) {
      if (sylLengths.includes(array[i]['numSyllables'])){
        sylIndexes[sylLengths.indexOf(array[i]['numSyllables'])].push(i);
      } else {
        sylLengths.push(array[i]['numSyllables']);
        sylIndexes.push([i]);
      }
    }
  }

//placeholder logic to give an output
  if (number===7){
    return array[sylIndexes[sylLengths.indexOf(2)][0]]['word']+" "+array[sylIndexes[sylLengths.indexOf(3)][0]]['word']+" "+array[sylIndexes[sylLengths.indexOf(2)][1]]['word'];
  }
  if (number===5){
    return array[sylIndexes[sylLengths.indexOf(2)][0]]['word']+" "+array[sylIndexes[sylLengths.indexOf(3)][0]]['word'];
  }
  console.log(sylLengths);
  console.log(sylIndexes); 
  
  return "Not Found, sorry!";
}










document.getElementById("submit").addEventListener('click', (() => {
  makeHaiku();
}));
