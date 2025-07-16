//test.js
import { Tree } from './BST.js';

// Helper: Generate an array of random integers < 100
function generateRandomArray(size = 15, max = 100) {
    const arr = [];
    while (arr.length < size) {
      const num = Math.floor(Math.random() * max);
      if (!arr.includes(num)) arr.push(num);
    }
    return arr;
  }

  
  // Traversal printer helper
  function printTraversals(tree) {
    console.log('\n🔁 Level Order:');
    tree.levelOrderForEach((n) => console.log(n.data));
  
    console.log('\n🔁 Pre Order:');
    tree.preOrderForEach((n) => console.log(n.data));
  
    console.log('\n🔁 Post Order:');
    tree.postOrderForEach((n) => console.log(n.data));
  
    console.log('\n🔁 In Order:');
    tree.inOrderForEach((n) => console.log(n.data));
  }
  
  // === DRIVER SCRIPT ===
  
  // 1. Generate random numbers and build the tree
  const randomArray = generateRandomArray();
  console.log('🌱 Initial Random Array:', randomArray);
  
  const tree = new Tree(randomArray);
  
  console.log('\n📦 Initial Tree:');
  tree.prettyPrint();
  
  // 2. Check if balanced
  console.log('\n✅ Is Tree Balanced?', tree.isBalanced());
  
  // 3. Print all traversals
  printTraversals(tree);
  
  // 4. Unbalance the tree by adding numbers > 100
  console.log('\n💥 Unbalancing tree by inserting values > 100...');
  [101, 102, 103, 104, 105].forEach(val => tree.insert(val));
  
  console.log('\n🌪️ Unbalanced Tree:');
  tree.prettyPrint();
  
  // 5. Confirm unbalanced
  console.log('\n❌ Is Tree Balanced?', tree.isBalanced());
  
  // 6. Rebalance
  console.log('\n🔧 Rebalancing tree...');
  tree.rebalance();
  
  console.log('\n🛠️ Rebalanced Tree:');
  tree.prettyPrint();
  
  // 7. Confirm balanced
  console.log('\n✅ Is Tree Balanced?', tree.isBalanced());
  
  // 8. Print all traversals again
  printTraversals(tree);
  