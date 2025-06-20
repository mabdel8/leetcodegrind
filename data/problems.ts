export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  patterns: string[];
  companies: string[];
  frequency: number;
  leetcodeUrl: string;
  sources: ('LeetCodeWizard' | 'NeetCode' | 'LeetCode75' | 'Blind75')[];
  description?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  problems: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
}

export const patterns: Pattern[] = [
  {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    description: 'Master array manipulation, hash tables, and frequency counting',
    problems: ['two-sum', 'contains-duplicate', 'valid-anagram', 'group-anagrams', 'top-k-frequent', 'product-except-self'],
    difficulty: 'Beginner',
    estimatedHours: 8
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    description: 'Efficient array traversal using multiple pointers',
    problems: ['valid-palindrome', 'two-sum-ii', 'container-with-most-water', '3sum', 'trapping-rain-water'],
    difficulty: 'Beginner',
    estimatedHours: 6
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    description: 'Optimize substring and subarray problems',
    problems: ['longest-substring-without-repeating', 'longest-repeating-character', 'minimum-window-substring', 'sliding-window-maximum'],
    difficulty: 'Intermediate',
    estimatedHours: 10
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'LIFO data structure applications',
    problems: ['valid-parentheses', 'min-stack', 'evaluate-rpn', 'generate-parentheses'],
    difficulty: 'Beginner',
    estimatedHours: 4
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    description: 'Divide and conquer search algorithms',
    problems: ['binary-search', 'search-2d-matrix', 'koko-eating-bananas', 'find-minimum-rotated'],
    difficulty: 'Beginner',
    estimatedHours: 6
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    description: 'Pointer manipulation and list operations',
    problems: ['reverse-linked-list', 'merge-two-lists', 'linked-list-cycle', 'remove-nth-node'],
    difficulty: 'Intermediate',
    estimatedHours: 8
  },
  {
    id: 'trees',
    name: 'Trees',
    description: 'Binary tree traversal and operations',
    problems: ['invert-binary-tree', 'maximum-depth', 'same-tree', 'subtree-of-another'],
    difficulty: 'Intermediate',
    estimatedHours: 12
  },
  {
    id: 'tries',
    name: 'Tries',
    description: 'Prefix tree data structure',
    problems: ['implement-trie', 'design-add-search', 'word-search-ii'],
    difficulty: 'Intermediate',
    estimatedHours: 6
  },
  {
    id: 'heap-priority-queue',
    name: 'Heap / Priority Queue',
    description: 'Priority-based data management',
    problems: ['kth-largest-element', 'task-scheduler', 'design-twitter'],
    difficulty: 'Intermediate',
    estimatedHours: 8
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    description: 'Recursive problem-solving',
    problems: ['subsets', 'combination-sum', 'permutations', 'word-search'],
    difficulty: 'Advanced',
    estimatedHours: 12
  },
  {
    id: 'graphs',
    name: 'Graphs',
    description: 'Graph traversal and algorithms',
    problems: ['number-of-islands', 'clone-graph', 'max-area-island', 'pacific-atlantic'],
    difficulty: 'Advanced',
    estimatedHours: 15
  },
  {
    id: 'advanced-graphs',
    name: 'Advanced Graphs',
    description: 'Complex graph problems',
    problems: ['reconstruct-itinerary', 'min-cost-connect-points', 'network-delay-time'],
    difficulty: 'Advanced',
    estimatedHours: 18
  },
  {
    id: '1d-dynamic-programming',
    name: '1-D Dynamic Programming',
    description: 'Optimization problems',
    problems: ['climbing-stairs', 'min-cost-climbing', 'house-robber', 'house-robber-ii'],
    difficulty: 'Advanced',
    estimatedHours: 15
  },
  {
    id: '2d-dynamic-programming',
    name: '2-D Dynamic Programming',
    description: 'Complex optimization',
    problems: ['unique-paths', 'longest-common-subsequence', 'best-time-buy-sell-cooldown'],
    difficulty: 'Advanced',
    estimatedHours: 20
  },
  {
    id: 'greedy',
    name: 'Greedy',
    description: 'Optimal choice algorithms',
    problems: ['maximum-subarray', 'jump-game', 'gas-station', 'hand-of-straights'],
    difficulty: 'Advanced',
    estimatedHours: 10
  },
  {
    id: 'intervals',
    name: 'Intervals',
    description: 'Range and interval problems',
    problems: ['insert-interval', 'merge-intervals', 'non-overlapping-intervals'],
    difficulty: 'Advanced',
    estimatedHours: 8
  },
  {
    id: 'math-geometry',
    name: 'Math & Geometry',
    description: 'Mathematical problem solving',
    problems: ['rotate-image', 'spiral-matrix', 'set-matrix-zeroes'],
    difficulty: 'Advanced',
    estimatedHours: 10
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    description: 'Binary operations',
    problems: ['single-number', 'number-of-1-bits', 'counting-bits'],
    difficulty: 'Advanced',
    estimatedHours: 6
  }
];

export const problems: Problem[] = [
  // Arrays & Hashing
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['arrays-hashing'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    frequency: 100,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    sources: ['LeetCodeWizard', 'NeetCode', 'LeetCode75', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['arrays-hashing'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    frequency: 85,
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'String',
    patterns: ['arrays-hashing'],
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    frequency: 80,
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'String',
    patterns: ['arrays-hashing'],
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Uber'],
    frequency: 75,
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)'
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['arrays-hashing', 'heap-priority-queue'],
    companies: ['Amazon', 'Facebook', 'Apple', 'Spotify'],
    frequency: 70,
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n + k)'
  },
  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['arrays-hashing'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 88,
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },

  // Two Pointers
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'String',
    patterns: ['two-pointers'],
    companies: ['Microsoft', 'Facebook', 'Amazon'],
    frequency: 70,
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'two-sum-ii',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['two-pointers'],
    companies: ['Amazon', 'Microsoft'],
    frequency: 65,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    sources: ['NeetCode'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['two-pointers'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 64,
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['two-pointers'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 61,
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Array',
    patterns: ['two-pointers'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 66,
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },

  // Sliding Window
  {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'String',
    patterns: ['sliding-window'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 64,
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m,n))'
  },
  {
    id: 'longest-repeating-character',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    category: 'String',
    patterns: ['sliding-window'],
    companies: ['Microsoft', 'Amazon'],
    frequency: 55,
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    category: 'String',
    patterns: ['sliding-window'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 58,
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(|S| + |T|)',
    spaceComplexity: 'O(|S| + |T|)'
  },

  // Stack
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'String',
    patterns: ['stack'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 95,
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    sources: ['NeetCode', 'Blind75', 'LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },

  // Binary Search
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['binary-search'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    frequency: 90,
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
    sources: ['NeetCode'],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)'
  },

  // Linked List
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    patterns: ['linked-list'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 85,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    sources: ['NeetCode', 'Blind75', 'LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'merge-two-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    patterns: ['linked-list'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 61,
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    category: 'Linked List',
    patterns: ['linked-list', 'two-pointers'],
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    frequency: 75,
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },

  // Trees
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Tree',
    patterns: ['trees'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    frequency: 70,
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)'
  },
  {
    id: 'maximum-depth',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Tree',
    patterns: ['trees'],
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    frequency: 65,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)'
  },

  // Graphs
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Graph',
    patterns: ['graphs'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 61,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)'
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'Medium',
    category: 'Graph',
    patterns: ['graphs'],
    companies: ['Google', 'Amazon', 'Facebook'],
    frequency: 55,
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(N)'
  },

  // Dynamic Programming
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    patterns: ['1d-dynamic-programming'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    frequency: 80,
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    sources: ['NeetCode', 'Blind75', 'LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    patterns: ['1d-dynamic-programming'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    frequency: 66,
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['arrays-hashing', '1d-dynamic-programming'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 61,
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75', 'LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },

  // More LeetCode 75 problems
  {
    id: 'merge-strings-alternately',
    title: 'Merge Strings Alternately',
    difficulty: 'Easy',
    category: 'String',
    patterns: ['two-pointers'],
    companies: ['Google'],
    frequency: 84,
    leetcodeUrl: 'https://leetcode.com/problems/merge-strings-alternately/',
    sources: ['LeetCodeWizard', 'LeetCode75'],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)'
  },
  {
    id: 'greatest-common-divisor-of-strings',
    title: 'Greatest Common Divisor of Strings',
    difficulty: 'Easy',
    category: 'String',
    patterns: ['math-geometry'],
    companies: ['Amazon'],
    frequency: 45,
    leetcodeUrl: 'https://leetcode.com/problems/greatest-common-divisor-of-strings/',
    sources: ['LeetCode75'],
    timeComplexity: 'O(min(m,n)*(m+n))',
    spaceComplexity: 'O(min(m,n))'
  },
  {
    id: 'kids-with-candies',
    title: 'Kids With the Greatest Number of Candies',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['arrays-hashing'],
    companies: ['Amazon'],
    frequency: 40,
    leetcodeUrl: 'https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/',
    sources: ['LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'can-place-flowers',
    title: 'Can Place Flowers',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['greedy'],
    companies: ['LinkedIn'],
    frequency: 35,
    leetcodeUrl: 'https://leetcode.com/problems/can-place-flowers/',
    sources: ['LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'reverse-vowels-of-string',
    title: 'Reverse Vowels of a String',
    difficulty: 'Easy',
    category: 'String',
    patterns: ['two-pointers'],
    companies: ['Google', 'Microsoft'],
    frequency: 42,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-vowels-of-a-string/',
    sources: ['LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'reverse-words-in-string',
    title: 'Reverse Words in a String',
    difficulty: 'Medium',
    category: 'String',
    patterns: ['two-pointers'],
    companies: ['Microsoft', 'Amazon'],
    frequency: 48,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-words-in-a-string/',
    sources: ['LeetCode75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },

  // More comprehensive problems from different sources
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    category: 'Array',
    patterns: ['greedy', '1d-dynamic-programming'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 85,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['intervals'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    frequency: 66,
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    sources: ['LeetCodeWizard', 'NeetCode', 'Blind75'],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['intervals'],
    companies: ['Google', 'Facebook', 'LinkedIn'],
    frequency: 60,
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    category: 'Array',
    patterns: ['intervals', 'greedy'],
    companies: ['Amazon', 'Microsoft'],
    frequency: 50,
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    sources: ['NeetCode', 'Blind75'],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)'
  }
]; 