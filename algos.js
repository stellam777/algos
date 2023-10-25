// TWO NUMBER SUM
/* Write a function that takes in non-empty array of integers and a target sum. If any two numbers in the array add up to the target sum, then return them in an array in any order. If no integers add up to the target sum then return an empty array */

// O(n) time | O(n) space
function twoNumberSum(array, targetSum) {
  let obj = {};
  for (let i = 0; i < array.length; i++) {
    let num = array[i];
    if (obj[targetSum - num]) {
      return [num, targetSum - num];
    } else {
      obj[num] = true;
    }
  }
  return [];
}

// O(nlog(n)) time | O(1) space
function twoNumberSum(array, targetSum) {
  array.sort((a, b) => a - b);
  let pointer1 = 0;
  let pointer2 = array.length - 1;
  while (pointer1 !== pointer2) {
    let currSum = array[pointer1] + array[pointer2];
    if (currSum < targetSum) {
      pointer1++;
    } else if (currSum > targetSum) {
      pointer2--;
    } else {
      return [array[pointer1], array[pointer2]];
    }
  }
  return [];
}

// VALIDATE SEQUENCE
/* Given two non empty arrays of integers, write a function to determine whether the second array is a subsequence of the first array */

// O(n) time | O(1) space
function isValidSubsequence(array, sequence) {
  if (sequence.length > array.length) return false;
  let aP = 0; // 7
  let sP = 0; // 3
  while (aP < array.length && sP < sequence.length) {
    if (array[aP] === sequence[sP]) {
      aP++;
      sP++;
    } else {
      aP++;
    }
  }
  return sP === sequence.length;
}

// NONCONSTRUCTIBLE CHANGE
/* Given an array of positive ints representing values of coins in your possession, write a fn that returns the min amount of change that you cannot create */

// O(nlogn) time | O(1) space
function nonConstructibleChange(coins) {
  coins.sort((a, b) => a - b);
  let change = 0;
  for (let coin of coins) {
    if (coin > change + 1) return change + 1;
    change += coin;
  }
  return change + 1;
}

// FIND CLOSEST VALUE IN BST
/* Write a function that takes in a BST and a target num and returns the closest value to that target value contained in the BST */

// O(n) time | O(n) space
function findClosestValueInBst(tree, target) {
  return helper(tree, target, (closest = Infinity));
}

function helper(node, target, closest) {
  if (node === null) return closest;

  if (Math.abs(closest - target) > Math.abs(node.value - target)) {
    closest = node.value;
  }

  if (target < node.value) {
    return helper(node.left, target, closest);
  } else if (target > node.value) {
    return helper(node.right, target, closest);
  } else {
    return node.value;
  }
}

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BRANCH SUMS
// Write a fn that takes in a BST and returns a list of its branch sums ordered from leftmost branch sum to rightmost branchsum

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function branchSums(root) {
  let sum = 0;
  let arr = [];
  function helper(node, sum) {
    sum += node.value;
    if (node.left) helper(node.left, sum);
    if (!node.left && !node.right) arr.push(sum);
    if (node.right) helper(node.right, sum);
  }
  helper(root, sum);
  return arr;
}

// NODE DEPTHS
/* The distance between a node in a BST and the tree's root is called the node's depth. Write a function that takes in a BST and returns the sum of its node's depth */

// O(n) time | O(h) space where h is the height of the BST
function nodeDepths(root, depth = 0) {
  if (!root) return 0;
  return (
    depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)
  );
}

// O(n) time | O(h) space where h is the height of the BST
function nodeDepths(root) {
  let stack = [{ node: root, depth: 0 }];
  let sum = 0;
  while (stack.length) {
    let { node, depth } = stack.pop();
    sum += depth;
    if (node.left) stack.push({ node: node.left, depth: depth + 1 });
    if (node.right) stack.push({ node: node.right, depth: depth + 1 });
  }
  return sum;
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//MINIMUM WAITING TIME
/* You're given a non-empty array of positive integers representing the amounts
  of time that specific queries take to execute. Only one query can be executed
  at a time, but the queries can be executed in any order. A query is defined as the amount of time that it must wait before its execution starts. In other words, if a query is executed
  second, then its waiting time is the duration of the first query; if a query
  is executed third, then its waiting time is the sum of the durations of the
  first two queries. Write a function that returns the minimum waiting time for all of the queries.
*/

// O(nlogn) time | O(1) space
function minimumWaitingTime(queries) {
  queries.sort((a, b) => a - b);
  let waitingTime = 0;
  for (let i = 0; i < queries.length; i++) {
    let query = queries[i];
    let duration = queries.length - 1 - i;
    waitingTime += query * duration;
  }
  return waitingTime;
}

// CLASS PHOTO
/* It's photo day at the local school, and you're the photographer assigned to
  take class photos. The class that you'll be photographing has an even number
  of students, and all these students are wearing red or blue shirts. In fact,
  exactly half of the class is wearing red shirts, and the other half is wearing
  blue shirts. You're responsible for arranging the students in two rows before
  taking the photo. Each row should contain the same number of the students and
  should adhere to the following guidelines:
   - All students wearing red shirts must be in the same row.
   - All students wearing blue shirts must be in the same row.
   - Each student in the back row must be strictly taller than the student
    directly in front of them in the front row.

  You're given two input arrays: one containing the heights of all the students
  with red shirts and another one containing the heights of all the students
  with blue shirts. These arrays will always have the same length, and each
  height will be a positive integer. Write a function that returns whether or
  not a class photo that follows the stated guidelines can be taken. */

// O(nlogn) time | O(1) space
function classPhotos(redShirtHeights, blueShirtHeights) {
  redShirtHeights.sort((a, b) => a - b);
  blueShirtHeights.sort((a, b) => a - b);
  let redShirtFront = redShirtHeights[0] < blueShirtHeights[0] ? true : false;
  for (let i = 0; i < redShirtHeights.length; i++) {
    let red = redShirtHeights[i];
    let blue = blueShirtHeights[i];
    if (redShirtFront) {
      if (red >= blue) return false;
    } else if (blue >= red) return false;
  }
  return true;
}

// TANDEM BICYCLE
// O(nlogn) time | O(1) space
function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
  redShirtSpeeds.sort((a, b) => a - b);
  blueShirtSpeeds = fastest
    ? blueShirtSpeeds.sort((a, b) => b - a)
    : blueShirtSpeeds.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < redShirtSpeeds.length; i++) {
    sum += Math.max(redShirtSpeeds[i], blueShirtSpeeds[i]);
  }
  return sum;
}

//REMOVE DUPES FROM LINKED LIST
/* You're given the head of a Singly Linked List whose nodes are in sorted order
  with respect to their values. Write a function that returns a modified version
  of the Linked List that doesn't contain any nodes with duplicate values. The
  Linked List should be modified in place (i.e., you shouldn't create a brand
  new list), and the modified Linked List should still have its nodes sorted
  with respect to their values. */

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space
function removeDuplicatesFromLinkedList(linkedList) {
  let current = linkedList;
  while (current.next) {
    if (current.value === current.next.value) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return linkedList;
}

// NTH FIBONACCI
// O(2^n) time | O(n) space
function getNthFib(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;
  return getNthFib(n - 1) + getNthFib(n - 2);
}

// PRODUCT SUM
// Write a function that takes in a special array and returns the product sum

// O(n) time | O(d) space
function productSum(arr, depth = 1) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      sum += productSum(arr[i], depth + 1);
    } else {
      sum += arr[i];
    }
  }
  sum *= depth;
  return sum;
}

// REMOVE ARRAY ELEM
// Write a function that removes an element from an array in O(1) time

function removeElem(arr, idx) {
  //[10, 4, 56, 0, 8, 1], 2
  if (idx === arr.length - 1) return arr.pop();
  let temp = arr[2];
  arr[2] = arr[arr.length - 1];
  arr[arr.length - 1] = temp;
  arr.pop();
  return arr;
}
