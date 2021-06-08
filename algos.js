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
