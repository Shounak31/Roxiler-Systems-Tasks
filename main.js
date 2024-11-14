function countAlphabets(str) {
  // Create an empty object to hold the frequency
  let frequency = {};

  // Convert string to lowercase to handle both uppercase and lowercase
  str = str.toLowerCase();

  // Loop through each character in the string
  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    // Check if the character is a letter (ignoring other characters)
    if (char >= "a" && char <= "z") {
      // If the character is already in the object, increment its count
      if (frequency[char]) {
        frequency[char]++;
      } else {
        // Otherwise, set the count to 1
        frequency[char] = 1;
      }
    }
  }

  // Return the frequency object
  return frequency;
}

// Example usage:
let str = "aadsccdacANDSVDddvfvdssscbb";
let result = countAlphabets(str);
console.log(result);
