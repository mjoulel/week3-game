//Hangman obj.
var hangman = {
        //List of 80s artists
        // var word = ['Prince', 'Madonna', 'Michael Jackson', 'Wham'];

        word: {
            "prince" : {
                picture: "http://www.6am-group.com/wp-content/uploads/2016/10/Prince.png",
                song: "I Will Die For You",
                preview: "https://www.youtube.com/watch?v=W5U6KGcjMKU"
            },
            "madonna" : {
                picture: "https://www.filepicker.io/api/file/Bwjon5VaRTywtse0ajrX",
                song: "Holiday",
                preview: "https://www.youtube.com/watch?v=5Rswx2Z7SDw"
            },
            "michaelJackson" : {
                picture: "https://2.bp.blogspot.com/-6BrnIPvNAPc/V2RTpiMtAKI/AAAAAAAAHn8/WgjTdNXam20EUy1as49eKhty11ZnWyrzACLcB/s1600/1981-michael-jackson-.jpg",
                song: "Rock With You",
                preview: "https://www.youtube.com/watch?v=5X-Mrc2l1d0"
            },
            "wham" : {
                picture: "https://s-media-cache-ak0.pinimg.com/564x/f8/a4/3f/f8a43ff340dee24b18ac4795f066623b.jpg",
                song: "Careless Whisper",
                preview: "https://www.youtube.com/watch?v=izGwDsrQ1eQ"
            },

        // Sets up our hangman game.
        currentWord: null,
        space: [],              //Letters in the word
        match: [],              //Matched letters
        guessLtrs: [],          //Guessed letters
        guessLft: 0,            //Guesses left
        totalGuesses: 0,        //Total guesses
        ltrsGuessed: null,      //Letters guessed
        wins: 0,

        //Picks the 80s artist
        // var new_word = word[Math.floor(Math.random()*word.length)]
        // var cGuess=new_word;
        // var uGuess;             //User guess
        // var uGuesses=[ ];       //Stored user guesses
        // var counter;            //Count correct guesses
        // var space;              //Number of spaces in the word


        setGame: function(){
            //Randomly picks word
            var objKeys = Object.keys(this.word);
            this.currentWord = objKeys[Math.floor(Math.random() * objKeys.length)];

            // Splits currentWord into its individual letters.
            this.space = this.currentWord.split("");
            // Displays the word we are trying to guess on the page.
            // Initially underscores are shown since we haven't guessed any letters ("_ _ _ _").
            this.rebldWordView();
            // This function sets the number of user guesses , and renders it to the HTML.
            this.processUpdateTotalGuesses();
        },

        // This function is run whenever the user guesses a letter..
        updtPg: function(ltr) {
        // If the user has no guesses left, restart the game.
        if (this.guessLft === 0) {
            this.restartGame();
        }
        // Otherwise...
        else {
            // Check & handle incorrect guesses.
            this.updateGuesses(ltr);

            // Check & handle correct guesses.
            this.updateMatchedLetters(ltr);

            // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
            this.rebldWordView();

            // If you win, restart the game.
            if (this.updateWins() === true) {
                this.restartGame();
            }
        }
    },

    // This function handles a user's incorrect guess (that they haven't guessed before).
    updateGuesses: function(ltr) {
    // If the ltr is not in the guessLtrs array, and the ltr is not in the lettersOfTheWord array..
    if ((this.guessLtrs.indexOf(ltr) === -1) && (this.space.indexOf(ltr) === -1)) {

      // Add the ltr to the guessLtrs array.
      this.guessLtrs.push(ltr);

      // Decrement guesses by one.
      this.guessLft--;

      // Update guesses-remaining and guessed-letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessLft;
      document.querySelector("#guessed-letters").innerHTML = this.guessLtrs.join(", ");
    }
  },

  // This function sets the initial guesses the user gets.
  procUpdtTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = this.space.length + 5;
    this.guessLft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessLft;
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(ltr) {
    // Loop through the ltrs of the "solution".
    for (var i = 0; i < this.space.length; i++) {
      // If the guessed ltr is in the solution, and we haven't guessed it already..
      if ((ltr === this.space[i]) && (this.match.indexOf(ltr) === -1)) {
        // Push the newly guessed ltr into the match array.
        this.match.push(ltr);
      }
    }
  },

  // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebldWordView: function() {
    // We start with an empty string.
    var wordView = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.space.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.match.indexOf(this.space[i]) !== -1) {
        wordView += this.space[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#current-word").innerHTML = wordView;
  },

  // Function that "restarts" the game by resetting all of the variables.
  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.currentWord = null;
    this.space = [];
    this.match = [];
    this.guessLtrs = [];
    this.guessLft = 0;
    this.totalGuesses = 0;
    this.ltrsGuessed = null;
    this.setGame();
    this.rebldWordView();
  },

  // Function that checks to see if the user has won.
  updateWins: function() {

    // this won't work for words with double or triple letters
      // var lettersOfTheWordClone = this.space.slice(); //clones the array
      // this.match.sort().join('') == lettersOfTheWordClone.sort().join('')

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.match.length === 0) {
      var win = false;
    }
    // Otherwise, we set win to true.
    else {
      var win = true;
    }

    // If a ltr appears in the match array, but not in the match array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.match.length; i++) {
      if (this.match.indexOf(this.space[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win === true) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = this.wins;

      // Update the song title and band on the page.
      document.querySelector("#music").innerHTML = this.word[this.currentWord].song + " By " + this.currentWord;

      // Update the image of the band on the page.
      document.querySelector("#bandDiv").innerHTML = "<img class='bandImage' src='images/" + this.word[this.currentWord].picture + "' alt='" + this.word[this.currentWord].song + "'>";

      // Play an audio track of the band.
      var audio = new Audio(this.word[this.currentWord].preview);
      audio.play();

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    else {
      return false;
    }
  }
};

// Initialize the game when the page loads.
hangman.setGame();

// When a key is pressed..
document.onkeyup = function(event) {
  // Capture pressed key and make it lowercase.
  hangman.ltrsGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  // Pass the guessed letter into our updatePage function to run the game logic.
  hangman.updtPg(hangman.ltrsGuessed);
};