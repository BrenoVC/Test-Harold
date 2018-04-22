/* This Javascrip code aims to find the 100 most used words by Donald Trump in his Twitter				**
** The first step consists in find and extract all the Tweets in his page and create a collection of phrases (tweets)	**
** The second step split these phrases to find the words use by Trump							**
** The third step create an array with words (not repeated) and a second array with the number os apparitions of each 	**
** word. The idea here is to create a set of used words and after, use the number os occurences to sort both arrays.	**
** Finaly de fourth and last step consists in sort the two arrays based on the number of occurences of each word. Once  **
** ours arrays are sorted, show in console the 100 most used words means show the first 100 elements in the array of 	**
** words.														**
*/

/* We start by defining some functions. They will be used in this application */

// Its necessary to define a function that will split each phrase word by word separately. This function is splitPhrase.
splitPhrase = (phrase) => {
			// We create an Array that will contain the words
			let vector = new Array();
			// Start an empty word
			let word = '';
			// We search the words in phrase
			for (let j=0; j<phrase.length; j++){
				// We are  supposed to ignore “ and ”
				if (phrase[j] === '“' || phrase[j] === '”' || phrase[j] === ',' || phrase[j] === '.' || phrase[j] === '!' || phrase[j] === '?'){continue;}
				// Its possible to split the words by using ' ' (spaces)
				if (phrase[j] === ' '){
					vector.push(word);
					word = '';
					continue;
				}
				if ( j === (phrase.lenght-1)){
					word = word + phrase[j];
					vector.push(word);
				}
				word = word + phrase[j]; // Each letter is inclused until we find a space ' '
			}
			return vector;
		}

/*This function is able to slipt the Array of phrases into separated words by using the function splitPhrase. 
It iterates by phrasesArray and call splitPhrases for each phrase. */
Split = (phrasesArray) => {
	wordsVector = new Array();
	for (let phrase of phrasesArray){
		wordsVector.push(splitPhrase(phrase));
	}
	return wordsVector;
}

// This function gives the index of the first element 'word' in an Array. How we create a set, we will have always just one element in the set. 
indexOf = (word, wordsSet) =>{
	let index = 0;
	for (let element of wordsSet){
		if (element === word){
			return index;
		}
		index++;
	}
	return null;
}

// This function say if there is alreary some element in the Array or not. True = yes, there is! or False = there isn't!
has = (word, wordsSet) =>{
	for (let element of wordsSet){
		if (element === word){
			return true;
		}
	}
	return false;
}

/* This function sorts the vector os counters and the vector of words in a crescent way based on the number of occurences of each word.
** The correspondences between each word and counter are maintened*/
sortArrays = (counter, wordsSet) => {
	counterAndSet = new Array();
	let temporary;
	// We use an Insertion Sort = Sorting algorithm
	for (let i = 1; i<counter.length; i++){
		for (let j = i; counter[j-1] < counter[j] && j>0; j--){
			// Counter insertion
			temporary = counter[j];
			counter[j] = counter[j-1];
			counter[j-1] = temporary;
			
			// Word Insertion
			temporary = wordsSet[j];
			wordsSet[j] = wordsSet[j-1];
			wordsSet[j-1] = temporary;
		}
	}
	counterAndSet.push(counter);
	counterAndSet.push(wordsSet);
	return counterAndSet;
}

/* This function show the first 'n' elements of an given array (arraysSorted) by ignoring the an element if its equal to an element of 
** the unimportant array. 'n' = numberOfWords. */
showWords = (arraysSorted, unimportant, numberOfWords) =>{
	let number = 0;
	for (let i=0; i<numberOfWords; i++){
		let n = 0;
		for (let element of unimportant ){
			if (arraysSorted[1][i] === element){
				n+=1;
			}
		}
		if (n === 0){
			number++;
			console.log(`${number} : word = "${arraysSorted[1][i]}" used ${arraysSorted[0][i]} times`);
		} else {
			numberOfWords+=1;
		}
	}
}

// End of function's definition

// Begin of the application //

// Step 1 //

// collec return the collection of elements that contains the tweets. This set is an HTML collection os paragraphs.
// Here the HTML document provides all the paragraphs that contain tweets by using their class Name, that is the same for all Tweets.
collec = document.getElementsByClassName('TweetTextSize TweetTextSize--normal js-tweet-text tweet-text');

// Phrases is an empty array at the beginnig. It will be used to record all phrases of each Tweet.
this.phrases = new Array();

//  Now we include in Phrases all the phrases used by Trump for each Tweet. These sentences are strings.
for (let i = 0; i<collec.length; i++){
	phrases.push(collec[i].innerText);	
	document.write(phrases[i]);
}

// Step 2 //

// Split is a function that get an Array of phrases and return an Array of words.

wordsVector = Split(phrases); 
// At this point wordsVector contain all words used but repeated.

// Step 3 //

// Then we create a set of words, in other words, without repeated words using wordsVector. Besides that, we need to count the number of apparitions of each word and
// the words repeated aren't included twice. We create a real set (without use a specific structure).
wordsSet = new Array ();
counter = new Array();

// Its necessary to iterate by the words to count and to create our Set.
for (let line of wordsVector){ // We catch each line
	for (let word of line){ // We catch each word

		// We test if the set has already this word before include it
		if (has(word, wordsSet)){
		
		// If it has already the word its necessary to increase its number of occurences
		// The word will not be added to the set
		// Search for the index of the word in the set
			index = indexOf (word, wordsSet);
			counter[index] += 1;
		}
		else{
		// If the analysed word isn't in the Set, its included and the counter for this word is created.
			wordsSet.push(word);
			counter.push(1);
		}
	}	
}

// Once we have our set and counter its just necessary to sort both based on the counter to find the 100 most used words.
// Step 4 //

let counterAndSet = [counter, wordsSet];

let arraysSorted = sortArrays(counter, wordsSet);

// Once the two vectors are sorted we just need to show the 100 first elements in the console
// We define here a vector of unimportant words that will not be considered.
let unimportant = ['and', 'a', 'an', '&'];

let numberOfWords = 100;

console.log(`The ${numberOfWords} most used words by Donald Trump are : `);

// Function that show the result by ignoring some unimportant words like 'and', 'a', etc.
showWords (arraysSorted, unimportant, numberOfWords);

// If we need a real set instead of an Array we just need to change the array in a set using 'new Set(wordsSet);'.