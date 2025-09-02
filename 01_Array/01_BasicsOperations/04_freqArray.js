/*
============================================
COUNT FREQUENCY OF ELEMENTS IN ARRAY
============================================

Problem Statement:
Given an array of integers, count how many times each element occurs. Return the result as an object/map where keys are elements and values are their frequencies.

Example:
Input: [1, 2, 2, 3, 3, 3, 4]
Output: {1: 1, 2: 2, 3: 3, 4: 1}

Constraints:
- Array length: 0 to 10^4
- Elements can be any integers (positive, negative, zero)
- Handle empty array case
- Return frequency count for each unique element

Edge Cases:
- Empty array [] → {} (empty frequency map)
- Single element [5] → {5: 1}
- All same elements [2, 2, 2, 2] → {2: 4}
- All unique elements [1, 2, 3, 4] → {1: 1, 2: 1, 3: 1, 4: 1}
- Mixed positive/negative [-1, 0, 1, -1] → {-1: 2, 0: 1, 1: 1}

Brute Force Logic:
- For each unique element, count its occurrences using nested loops
- Use outer loop to iterate through array
- Use inner loop to count occurrences of current element
- Skip elements already counted

Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops for counting
- Space: O(k) - where k is number of unique elements

Bottlenecks:
- Redundant counting of same elements multiple times
- No efficient lookup mechanism for already processed elements
- Quadratic time complexity for large arrays

Optimized Logic (Hash Map/Object):
- Use object/Map to store element frequencies
- Single pass through array
- For each element, increment its count in hash map
- Initialize count to 1 for first occurrence, increment for subsequent
- Pattern: Hash map for frequency counting

Pseudo Code:
function countFrequency(nums):
    frequency = {}
    
    for each num in nums:
        if frequency[num] exists:
            frequency[num]++
        else:
            frequency[num] = 1
    
    return frequency

Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(k) - where k is number of unique elements

Alternate Approach (Array.reduce):
- Use reduce method for functional programming style
- Accumulator maintains frequency object
- More concise but same complexity
- Time: O(n), Space: O(k)
*/

function countFrequency(nums) {
    if (nums.length === 0) {
        return {};
    }
    
    const frequency = {};
    
    // Single pass through array
    for (const num of nums) {
        // Increment count or initialize to 1
        frequency[num] = (frequency[num] || 0) + 1;
    }
    
    return frequency;
}

// Alternative: Using forEach method
function countFrequencyForEach(nums) {
    const frequency = {};
    
    nums.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    
    return frequency;
}

// Alternative: Using Array.reduce (functional approach)
function countFrequencyReduce(nums) {
    return nums.reduce((freq, num) => {
        freq[num] = (freq[num] || 0) + 1;
        return freq;
    }, {});
}

// Alternative: Using Map (handles non-string keys better)
function countFrequencyMap(nums) {
    const frequency = new Map();
    
    for (const num of nums) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    }
    
    return frequency;
}

// Alternative: Using conditional check (more explicit)
function countFrequencyExplicit(nums) {
    const frequency = {};
    
    for (const num of nums) {
        if (frequency[num]) {
            frequency[num]++;
        } else {
            frequency[num] = 1;
        }
    }
    
    return frequency;
}

// Alternative: Brute force approach (for comparison)
function countFrequencyBrute(nums) {
    const frequency = {};
    const processed = new Set();
    
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        
        // Skip if already processed
        if (processed.has(current)) {
            continue;
        }
        
        // Count occurrences of current element
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === current) {
                count++;
            }
        }
        
        frequency[current] = count;
        processed.add(current);
    }
    
    return frequency;
}

// Alternative: Using Array.filter for counting
function countFrequencyFilter(nums) {
    const frequency = {};
    const uniqueElements = [...new Set(nums)];
    
    uniqueElements.forEach(element => {
        frequency[element] = nums.filter(num => num === element).length;
    });
    
    return frequency;
}

// Alternative: Return array of [element, count] pairs
function countFrequencyPairs(nums) {
    const frequency = countFrequency(nums);
    return Object.entries(frequency).map(([element, count]) => 
        [parseInt(element), count]
    );
}

// Alternative: Return sorted by frequency (descending)
function countFrequencySorted(nums) {
    const frequency = countFrequency(nums);
    
    return Object.entries(frequency)
        .map(([element, count]) => [parseInt(element), count])
        .sort((a, b) => b[1] - a[1]); // Sort by count descending
}

/*
Pattern Recognition:
- Count occurrences → hash map/object for O(1) lookup
- Single pass counting → increment existing or initialize to 1
- Frequency analysis → reduce to key-value pairs
- Similar to histogram generation or voting algorithms

Method Comparison:
1. Object with ||: O(n) time, O(k) space, concise and efficient
2. Map: O(n) time, O(k) space, better for non-string keys
3. Reduce: O(n) time, O(k) space, functional programming style
4. Brute Force: O(n²) time, O(k) space, inefficient
5. Filter: O(n²) time, O(k) space, clean but inefficient

Test Cases:
countFrequency([1, 2, 2, 3, 3, 3, 4]) // {1: 1, 2: 2, 3: 3, 4: 1}
countFrequency([]) // {}
countFrequency([5]) // {5: 1}
countFrequency([2, 2, 2, 2]) // {2: 4}
countFrequency([-1, 0, 1, -1, 0]) // {-1: 2, 0: 2, 1: 1}

Pitfalls:
- Not handling empty arrays
- Using inefficient O(n²) approaches when O(n) available
- Not considering that object keys are strings (use Map for type preservation)
- Forgetting to initialize count for new elements
- Not handling negative numbers or zero correctly

Key Insights:
- Hash map approach is optimal for frequency counting
- JavaScript objects work well for integer keys (converted to strings)
- Use Map when key type preservation is important
- Single-pass algorithm with O(1) lookup gives O(n) overall complexity

Real-world Applications:
- Text analysis and word frequency counting
- Data analysis and statistical computations
- Vote counting and polling systems
- Inventory management and stock counting
- Performance monitoring (event frequency)
- Histogram generation for data visualization

Algorithm Variants:
1. Count frequency of specific element only
2. Find most/least frequent elements
3. Count frequency with threshold filtering
4. Frequency counting with grouping by ranges

Performance Notes:
- Object lookup is O(1) average case
- Map has slightly better performance for frequent additions/deletions
- Reduce method is functional but not necessarily faster
- Avoid nested loops (filter, brute force) for large arrays

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
