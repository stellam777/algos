// Is Unique
// Implement algo to dertime if a strig has all unique characters. What if you cannot use additional data structures?
const isUnique = (str) => {
  let unique = '';
  for (let i = 0; i < str.length; i++) {
    if (!unique.includes(str[i])) {
      unique += str[i];
    }
  }
  return unique.length === str.length;
};

// Check Permutation
// Given 2 strings, write a method to decide if one is a permutation of the other
const isPerm = (strA, strB) => {
  if (strA.length !== strB.length) return false;

  let obj = {};

  for (let i = 0; i < strA.length; i++) {
    let char = strA[i];

    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }

  for (let i = 0; i < strB.length; i++) {
    let char = strB[i];

    if (!obj[char]) return false;
    else obj[char]--;
  }

  return Object.values(obj).every((val) => val === 0);
};

const perm = (strA, strB) => {
  if (strA.length !== strB.length) return false;

  strA = strA.split('').sort();
  strB = strB.split('').sort();

  for (let i = 0; i < strA.length; i++) {
    let charA = strA[i];
    let charB = strB[i];

    if (charA !== charB) return false;
  }
  return true;
};

const isPerm = (str1, str2) => {
  // create an array of length 128 bc ASCII, and fill it with 0s
  // loop through first string, and match each char code of letter in the string to index in the array then increment the array elem by 1
  // loop through second string, match index based on char code in string, and decrement by 1
  // if any value goes below 0 then return false

  if (str1.length !== str2.length) return false;

  let arr = new Array(128).fill(0);

  for (let i = 0; i < str1.length; i++) {
    let charCode = str1.charCodeAt(i);
    arr[charCode]++;
  }

  for (let i = 0; i < str2.length; i++) {
    let charCode = str2.charCodeAt(i);
    arr[charCode]--;

    if (arr[charCode] < 0) return false;
  }
  return true;
};

// Urlify
// Write method to replace all spaces in a tring with "%20". You may assume that the string has sufficient space at the end to hold the additional chars, and that you are given the "true" length of the string.
// Input: "Mr John Smith", len = 13 | Output: "Mr%20John%20Smith"

const urlify = (url, urlLength) => {
  // count the number of spaces in the url by looping through
  // define a new index that is the length of the url plus 2x the count of blank spaces
  // loop through url backwards
  // if we hit a space, then replace the space with a 0, replace index -1 with 2, and index - 2 with %
  // else that index just equals the current character
  // return joined url
  url = url.split('');

  let spaceCount = 0;
  for (let i = 0; i < urlLength; i++) {
    if (url[i] === ' ') spaceCount++;
  }
  // i = 7
  let newIndex = urlLength + spaceCount * 2; //12
  // Mr Jones -> - - - - - - - - - % 2 0 j o n e s
  for (let i = urlLength - 1; i >= 0; i--) {
    // 7
    if (url[i] === ' ') {
      url[newIndex - 1] = '0';
      url[newIndex - 2] = '2';
      url[newIndex - 3] = '%';
      newIndex -= 3;
    } else {
      url[newIndex - 1] = url[i];
      newIndex--;
    }
  }

  return url.join('');
};

// Palindrome Permutation
// Given string, write function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to limited to just dictionary words. You can ignore casing and non-letter chars.

// loop through string creating an object that stores characters as key and their frequency as value
// loop through values in object, check...
// if value is odd, then increment oddCount variable
// if oddCount variable is greater than 1 then return false

const isPal = (str) => {
  str = str.toLowerCase();

  let obj = {};

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    obj[char] = (obj[char] || 0) + 1;
  }

  let counts = Object.values(obj);
  let oddCounts = 0;

  for (let i = 0; i < counts.length; i++) {
    if (counts[i] % 2 !== 0) {
      oddCounts++;
    }

    if (oddCounts > 1) return false;
  }
  return true;
};

// One Away
// There are three types of edits that can be performed on strings: insert, remove, or replace. Given 2 strings, write a function to check if they are one edit (or zero edits) away.
// Input: pale, pal | Output: true
// Input: pale, bae | Output: false
// initialize count for unmatched characters, determine longest string, iterate through that string
// if short string doesn't include the character in the longest string, then increment count
// if count is ever greater than 1 then return false immediately
// after looping, return true

const oneAway = (str1, str2) => {
  let count = 0;
  let longStr = str1.length >= str2.length ? str1 : str2;
  let shortStr = str1.length < str2.length ? str1 : str2;

  for (let i = 0; i < longStr.length; i++) {
    if (!shortStr.includes(longStr[i])) {
      count++;
    }

    if (count > 1) return false;
  }
  return true;
};

// String Compression
// Implement a method to perform basic string compression using the counts of repeated characters. For ex, the string "aabcccccaaa" would become "a2b1c5a3". If the compressed string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a-z, A-Z).

const compress = (str) => {
  let count = 0; //1
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    count++;

    if (str[i] !== str[i + 1] || i === str.length - 1) {
      newStr += str[i] + count;
      count = 0;
    }
  }
  return newStr.length < str.length ? newStr : str;
};

// Rotate Matrix
// Given an image represented by an NxN matrix, where each pizel in the image is represented by an integer, write a method to rotate the image by 90 degrees. Can you do this in place?
/* [[1,2,3],
    [4,5,6],
    [7,8,9]
   ] =>
   [[7,4,1],
    [8,5,2],
    [9,6,3]
   ]*/

const rotateMatrix = (m) => {
  // transpose first, swapping elements diagonally - setting i = j, ex after transpose:
  /* [[1,4,7],
         [2,5,8],
         [3,6,9]
        ]*/
  // then for every row swap first and last elem, move inwards and swap again - inner loop only for n/2 durations bc you'll end up swapping elements back

  let n = m.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let temp = m[i][j];
      m[i][j] = m[j][i];
      m[j][i] = temp;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      let temp = m[i][j];
      m[i][j] = m[i][n - 1 - j];
      m[i][n - 1 - j] = temp;
    }
  }

  return m;
};

// Zero Matrix
// Write an algo such that if an element in an MxN matrix is 0, its entire row and column are set to 0

// Going to double loop twice:
// First double loop will find the 0 elem, if found store indices in global variable
// then set that row equal to all 0s by using a helper function that takes in a row, loops through it linearally and changes all elems to 0s
// Second double loop will set all elements at column j equal to 0, but will skip the row at saved index i
const convertRow = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }
  return arr;
};

const zero = (m) => {
  let rows = m.length;
  let cols = m[0].length;
  let colIdx = [];
  let rowIdx = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (m[i][j] === 0) {
        colIdx.push(j);
        rowIdx.push(i);
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (colIdx.includes(j)) m[i][j] = 0;
    }
  }

  for (let i = 0; i < rows; i++) {
    if (rowIdx.includes(i)) {
      m[i] = convertRow(m[i]);
    }
  }

  return m;
};

// create new matrix copy and set all elements to false
// loop through m, if we come across a zero, then convert each false to true in our matrix copy
// loop through our copy, if we come across a true then set that element in original matrix to 0
// Break it down into functions: 1) generate bool matrix, 2) set col to true 3) set row to true 4) compare

const generateBoolMatrix = (m) => {
  let boolMatrix = [];

  for (let i = 0; i < m.length; i++) {
    let row = [];
    for (let j = 0; j < m[0].length; j++) {
      row[j] = false;
    }
    boolMatrix.push(row);
  }

  return boolMatrix;
};

const markAsTrueCol = (col, m) => {
  for (let i = 0; i < m.length; i++) {
    m[i][col] = true;
  }
};

const markAsTrueRow = (row, m) => {
  for (let i = 0; i < m[0].length; i++) {
    m[row][i] = true;
  }
};

const compare = (m, boolMatrix) => {
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (boolMatrix[i][j] === true) {
        m[i][j] = 0;
      }
    }
  }
  return m;
};

const setZero = (m) => {
  let boolMatrix = generateBoolMatrix(m);

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      if (m[i][j] === 0) {
        markAsTrueCol(j, boolMatrix);
        markAsTrueRow(i, boolMatrix);
      }
    }
  }
  return compare(m, boolMatrix);
};

// String Rotation
// Assume you have a method isSubstring which checks if one word is a substring of another. Given 2 strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring.
// Input: "waterbottle", "erbottlewat" Output: true
//         aterbottlew

// if string lengths not the same return false
// initialize 2 pointers i and j to 0, initialize matchCount that will store the number of consecutive character matches between str1 and str2
// while j is less than length of str1 or 2
// Check if char at i = char at j, then increment matchCount and increment both i and j
// if i and j aren't a match then just increment j
// if j pointer is at the last index of the string, then use isSubstring to check if the first part of str2 (0 through matchCount) equals the str1 at i+1 through it's length

const isSubstring = (str1, str2) => {};

const stringRotation = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  let i = 0;
  let j = 0;
  let matchCount = 0; //3

  while (j < str2.length) {
    let char1 = str1[i];
    let char2 = str2[j];

    if (char1 === char2) {
      matchCount++;

      if (j === str2.length - 1) {
        return isSubstring(str1.slice(matchCount), str2.slice(0, -matchCount));
      } else {
        i++;
        j++;
      }
    } else {
      j++;
    }
  }
  return false;
};

// if true, str2 will always be a substring of str1 + str1 (waterbottlewaterbottle)
// O(n) depending on time complexity of our mythical isSubstring function
const stringRotation = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  let s1s1 = str1 + str1;
  return isSubstring(s1s1, str2);
};
