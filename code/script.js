// All the DOM selectors stored as short variables
const chat = document.getElementById("chat");
const inputWrapper = document.getElementById("input-wrapper");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const nameInput = document.getElementById("name-input");

//show message from user
const userReply = (msg) => {
  showMessage(msg, "user");
};
//show message from bot
const botReply = (msg) => {
  showMessage(msg, "bot");
};

//Global Variavle - Numerically labels questions so nextQuestion function can find them.
let indexDoggos = 1;

// Conditional rendering - render message based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `;
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }
  // Makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
};

//Allows the user to restart the chatbot if the answer is "no" on the first question
const reloadBot = () => {
  userReply("Fy fan nej!");
  setTimeout(
    () =>
      // Add 1 second delay before bot reply appears.
      botReply(
        "No Doggos is a sad doggo-less day for us... but maybe you've changed your mind?"
      ),
    1000
  );

  inputWrapper.innerHTML = `<div>
      <button id="reloadBtn">Restart</button>
      </div>`;

  document.getElementById("reloadBtn").addEventListener("click", () => {
    location.reload();
  });
};

const nextQuestion = (message) => {
  if (indexDoggos === 1) {
    userReply(message);
    setTimeout(() => dogSize(message), 2000);
  } else if (indexDoggos === 2) {
    userReply(message);
    setTimeout(() => typeOfDog(message), 2000);
  } else if (indexDoggos === 3) {
    userReply(message);
    setTimeout(() => giftWrapDog(message), 1000);
  } else if (indexDoggos === 4) {
    console.log();
    userReply(message);
    setTimeout(() => nameofDog(message), 2000);
  } else {
    userReply(message);
    setTimeout(() => goodbye(message), 2000);
  }
};

// 1 question
const greeting = () => {
  indexDoggos = 1;
  botReply("Hello there! Are you here for a doggo friend?🐶");
  //the yes/no buttons are in in index.html
  yesButton.addEventListener("click", () => nextQuestion("Hell yes!"));
  noButton.addEventListener("click", () => reloadBot());
};

//2 question
const dogSize = (message) => {
  indexDoggos++;
  botReply("🐾PAW-some!🐾 What size doggo friend would you like?");

  inputWrapper.innerHTML = ` 
        <button id="small-btn">Small</button>
        <button id="medium-btn">Medium</button>
        <button id="large-btn">Large</button> 
      `;
  document
    .getElementById("small-btn")
    .addEventListener("click", () => nextQuestion("Small"));
  document
    .getElementById("medium-btn")
    .addEventListener("click", () => nextQuestion("Medium"));
  document
    .getElementById("large-btn")
    .addEventListener("click", () => nextQuestion("Large"));
};

//3 question
const typeOfDog = (type) => {
  indexDoggos++;
  botReply(
    `Excellent! A ${type} doggo! Based on that please choose a breed below!`
  );
  //Select breed from a dropdown menu based on answer from second question
  if (type === "Small") {
    inputWrapper.innerHTML = `
        <select id='select'>
          <option value="">Select Here</option>
          <option value="Yorkshire Terrier">Yorkshire Terrier</option>
          <option value="Chihuahua">Chihauhua</option>
          <option value="Beagle">Beagle</option>
          <option value="Pomeranian">Pomeranian</option>
          <option value="Welsh Cardigan/Pembroke Corgi">Welsh Cardigan or Pembroke Corgi (Yes there 2 diff. breeds)</option>
          <option value="Dachshund the sausage doggo">Dachshund aka Sausage dog!</option>
        </select>`;
  } else if (type === "Medium") {
    inputWrapper.innerHTML = `
        <select id='select'>
          <option value="">Select Here</option>
          <option value="Soft-Coated Wheaton Terrier">Soft-Coated Wheaton Terrier</option>
          <option value="Siberian Husky">Siberian husky</option>
          <option value="Basset Hound">Basset Hound</option>
          <option value="Poodle">Poodle</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="Bull Terrier">Bull Terrier</option>
        </select>`;
  } else {
    inputWrapper.innerHTML = `
        <select id='select'>
          <option value="">Select Here</option>
          <option value="Great Dane">Great Dane</option>
          <option value="Saint Bernard">Saint Bernard</option>
          <option value="American PitBull">American PitBull</option>
          <option value="German Shepard">German Shepard</option>
          <option value="Mastiff">Mastiff</option>
          <option value="Irish Wolfhound">Irish Wolfhound</option>
        </select>`;
  }
  const select = document.getElementById("select");
  select.addEventListener("change", () => nextQuestion(select.value));
};

//4 question
const giftWrapDog = () => {
  indexDoggos++;
  botReply(`Ooo a ${select.value}? Great choice!`);
  setTimeout(
    () =>
      //add 1 second delay before answer appear.
      botReply(`Would you like us to gift wrap your doggo?`),
    2500
  );

  inputWrapper.innerHTML = `
        <button id="yes-pls-btn">🎁Yes, please.</button>
        <button id="wtf-btn">Wtf... no!!</button>
      `;
  document
    .getElementById("yes-pls-btn")
    .addEventListener("click", () => nextQuestion("Yes, please."));
  document
    .getElementById("wtf-btn")
    .addEventListener("click", () => nextQuestion("Wtf... no!"));
};

//5 question
const nameofDog = (message) => {
  indexDoggos++;
  botReply(`We don't gift wrap doggos! We're not monsters!`);
  setTimeout(
    () =>
      botReply(`How about a name for your new doggo friend?`),
    3000
  );

  inputWrapper.innerHTML = `
        <form id="name-form">
           <input id="name-input" type="text" />
           <button id="send-btn" type="submit"> 
           Send 
           </button>
        </form> `;
  //declares userInput function
  const userInput = document.getElementById("name-input");
  //Prevents refresh by default
  const form = document.getElementById("name-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    nextQuestion(userInput.value);
    userInput.value = "";
  });
};

//Final bot Message
const goodbye = (message) => {
  botReply(`${message}?`); //Repeats userInput.value from Question 5
  setTimeout(
    () =>
      //This adds a 1 second delay before the bots chat appears.
      botReply(
        `Cute name! A quick brush and ${message} will be on the way to you shortly!🚚`
      ),
    3000
  );
  setTimeout(
    () =>
      botReply(
        `Thank you for using Doggo Bot! Here for all your Doggo Bestest Boi(or Gurl) needs!`
      ),
    8000
  );
};

setTimeout(greeting, 1000);
