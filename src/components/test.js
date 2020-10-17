
let data = {id: 5, message: 'hekki', content: 'do well'}
// the data variale above is meant to be gotten from the API
// inside the forEach loop which displays all the messages

const template = 
` ........
  ........
  <button onclick = replyMessage(${data.id})
  ........
  ........
`

function compose_email(){
  //this function has already been defined
  // and I believe you understand what it does
}

function replyMessage(id){
  compose_email()

  //fetch for the data with that specific id
  fetch(`/emails/${id}`)
  .then(data => data.json())
  .then(data => handleData(data));

  function handleData(data){
    //get the input fields and set the values to that from the data gotten from the API
    document.querySelector('message').value = data.message;
    document.querySelector('content').value = data.content;
    document.querySelector('other_ stuff').value = data.the_name_the_api_gives_you

    //and i think that is all
  }
}

/* ------------------------------------------------- 
  A QUICK RECAP
  From the for loop... you put the id of each email so that when you click the button, 
  the replyMessage Function gets called
  The replyMessage Function is just going to call composeEmail() which displays the 
  appropriate page as you know, then makes a request to the api asking for the details of the
   email with that particular ID... after getting the information from the API,
   the handleData function gets called which just gets the fields(with their IDs probably or any means of identifying them)
   and then set their values to what was gotten from the API

   I HOPE YOU UNDERSTAND!!!!
 ================================================== */


// let array = 
// [
//   [1, 1, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0, 0],
//   [1, 1, 1, 0, 0, 0],
//   [0, 0, 2, 4, 4, 0],
//   [0, 0, 0, 2, 0, 0],
//   [0, 0, 1, 2, 4, 0]
// ]

// function hourglassSum(array) {
//   let hourglassValue = []
//   for(let i = 0; i < 4; i++){
//       for(let j = 0; j < 4; j++){
//         let rowValue = gethourglassSum(i, j, array);
//         hourglassValue.push(rowValue);
//       }
//   }
//   return Math.max(...hourglassValue);
  
//   function gethourglassSum(i, j, array){
//       let value = array[j][i] + array[j][i+1] + array[j][i+2] + array[j+1][i+1] +
//       array[j+2][i] + array[j+2][i+1] + array[j+2][i+2];
//       return value
//   }

// }

// function minimumBribes(final) {
//   let original = [];
//   final.forEach(node => original.push(node));
//   let initial = final.sort((a, b) => a-b);
//   let totalBribes = 0;

//   for(let i = 0; i < original.length; i++){
//     let difference = i - initial.indexOf(original[i]);
//     if(difference < -2){
//       return 'Too Chaotic'
//     } else totalBribes+=difference < 0? difference: 0
//   }
//   return Math.abs(totalBribes);
// }
// function minimumBribes(final) {
//   let original = [];
//   final.forEach(node => original.push(node));
//   let initial = final.sort((a, b) => a-b);
//   let totalBribes = 0;

//   for(let i = 0; i < original.length; i++){
//     let difference = i - initial.indexOf(original[i]);
//     if(difference < -2){
//       return 'Too Chaotic'
//     } else totalBribes+=difference < 0? difference: 0
//   }
//   return Math.abs(totalBribes);
// }
// console.log(minimumBribes([2, 1, 5, 3, 4]))