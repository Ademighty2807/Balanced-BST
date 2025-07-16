// BST.js

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function buildTree(array) {
  const sorted = [...new Set(array)].sort((a, b) => a - b);

  function buildRecursive(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);

    node.left = buildRecursive(arr.slice(0, mid));
    node.right = buildRecursive(arr.slice(mid + 1));

    return node;
  }

  return buildRecursive(sorted);
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  // 🔁 INSERT: Recursively add value to BST
  insert(value, node = this.root) {
    if (!node) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    // Duplicate? Do nothing
    return node;
  }

  // 🧨 DELETE: Handles all three cases
  deleteItem(value, node = this.root) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      // Case 1: No children (leaf node)
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: One child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children
      const minValue = this.findMin(node.right);
      node.data = minValue;
      node.right = this.deleteItem(minValue, node.right);
    }

    return node;
  }

  // Helper to find smallest value in a subtree
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  // Pretty print function to visualize tree
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (!node) return;

    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  find(value, node = this.root) {
    if (!node) return null;
  
    if (value === node.data) return node;
  
    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }
  
    const queue = [];
    if (this.root) queue.push(this.root);
  
    const traverse = (q) => {
      if (q.length === 0) return;
  
      const node = q.shift();
      callback(node);
  
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
  
      traverse(q);
    };
  
    traverse(queue);
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }
  
    if (!node) return;
  
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }
  
  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }
  
    if (!node) return;
  
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }
  
  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }
  
    if (!node) return;
  
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }
  
  height(value) {
    const targetNode = this.find(value);
    if (!targetNode) return null;
  
    function getHeight(node) {
      if (!node) return -1; // base case: edge count, not node count
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    return getHeight(targetNode);
  }
  
  depth(value, node = this.root, currentDepth = 0) {
    if (!node) return null;
  
    if (value === node.data) return currentDepth;
  
    if (value < node.data) {
      return this.depth(value, node.left, currentDepth + 1);
    } else {
      return this.depth(value, node.right, currentDepth + 1);
    }
  }

  isBalanced(node = this.root) {
    if (!node) return true;
  
    const leftHeight = this.height(node.data, node.left);
    const rightHeight = this.height(node.data, node.right);
  
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  
  rebalance() {
    const nodes = [];
  
    this.inOrderForEach((node) => nodes.push(node.data)); // get sorted values
  
    this.root = buildTree(nodes); // rebuild balanced BST
  }
  
}

export { Tree }
  