/*
============================================
FIND DUPLICATE NUMBER/NUMBERS IN ARRAY
============================================

Problem Statement:
Given an array of integers, find duplicate elements. There are two main variants:
1. Find all duplicate elements (elements that appear more than once)
2. Find the single duplicate in array of n+1 elements where each element is in range [1, n]

Example:
Input: [1, 3, 4, 2, 2]
Output: [2] (for all duplicates)
Or: 2 (for single duplicate)

Constraints:
- Array length: 1 to 10^4
- For LeetCode variant: exactly n+1 elements, values in range [1, n], only one duplicate
- For general case: any integers, multiple duplicates possible
- Handle empty array case

Edge Cases:
- No duplicates [1, 2, 3, 4] → [] (empty result)
- Single element [5] → [] (no duplicates possible)
- All duplicates [2, 2, 2, 2] → [2] (single unique duplicate)
- Multiple duplicates [1, 2, 2, 3, 3, 4] → [2, 3]
- LeetCode case [1, 3, 4, 2, 2] → 2 (single duplicate)

Brute Force Logic:
- For each element, check if it appears elsewhere in the array
- Use nested loops to compare every pair of elements
- Collect duplicates avoiding re-adding same duplicate

Brute Force Code:
function findDuplicatesBrute(nums) {
    const duplicates = [];
    
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j] && !duplicates.includes(nums[i])) {
                duplicates.push(nums[i]);
            }
        }
    }
    
    return duplicates;
}

Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops to check all pairs
- Space: O(k) - where k is number of unique duplicates

Bottlenecks:
- Redundant comparisons between same elements
- No efficient lookup mechanism
- Quadratic time complexity for large arrays

Optimized Logic Hints:
- Think of array elements as indices pointing to other positions
- For range [1, n] in n+1 array, treat as linked list traversal
- Use cycle detection technique to find repeated element
- Apply fast and slow pointer approach

Optimized Logic (using Floyd's Cycle Detection for array):
- Treat array as linked list where nums[i] points to index nums[i]
- Since there's exactly one duplicate, there will be a cycle in this "linked list"
- Use Floyd's cycle detection with slow and fast pointers
- Phase 1: Find meeting point in cycle using different speeds
- Phase 2: Find start of cycle (which is the duplicate number)

Pseudo Code:
function findDuplicate(nums):
    slow = nums[0]
    fast = nums[0]
    
    // Phase 1: Find meeting point
    do:
        slow = nums[slow]
        fast = nums[nums[fast]]
    while slow != fast
    
    // Phase 2: Find cycle start (duplicate)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    
    return slow

*/

//Optimized Code:
function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];
    
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}

// Test Cases:
findDuplicate([1, 3, 4, 2, 2]) // 2
findDuplicate([3, 1, 3, 4, 2]) // 3
findDuplicate([1, 1]) // 1
findDuplicate([2, 2, 2, 2, 2]) // 2

/*
Time and Space Complexity (Optimized):
- Time: O(n) - at most 2 passes through array
- Space: O(1) - only using two pointer variables

All Other Approaches (that uses other data structures or algorithms other than this array topic):

1. Hash Set Approach:
Logic: 
- Use Set to track seen elements during single pass
- If element already in Set, it's a duplicate
- Add duplicates to result set to avoid repetition

Code:

function findAllDuplicatesSet(nums) {
    const seen = new Set();
    const duplicates = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }
    
    return Array.from(duplicates);
}
Time: O(n), Space: O(n)

2. Frequency Map Approach:
Logic:
- Count frequency of each element using object/map
- Iterate through frequency map
- Return elements with count > 1

Code:
function findDuplicatesFrequency(nums) {
    const frequency = {};
    
    for (const num of nums) {
        frequency[num] = (frequency[num] || 0) + 1;
    }
    
    return Object.keys(frequency)
        .filter(key => frequency[key] > 1)
        .map(Number);
}
Time: O(n), Space: O(n)

3. Sort-based Approach:
Logic:
- Sort array to group duplicate elements together
- Check adjacent elements for equality
- Collect unique duplicates

Code:
function findDuplicatesSort(nums) {
    nums.sort((a, b) => a - b);
    const duplicates = [];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] && !duplicates.includes(nums[i])) {
            duplicates.push(nums[i]);
        }
    }
    
    return duplicates;
}
Time: O(n log n), Space: O(1)

Pattern Recognition:
- Duplicate detection in constrained array → cycle detection technique
- Array elements as pointers → linked list simulation
- Fast and slow pointer → Floyd's cycle detection algorithm
- Range [1, n] with n+1 elements → guaranteed cycle exists

Method Comparison:
1. Floyd's Cycle: O(n) time, O(1) space, works only for specific constraints
2. Hash Set: O(n) time, O(n) space, optimal general solution
3. Frequency Map: O(n) time, O(n) space, gives counts too
4. Sort: O(n log n) time, O(1) space, modifies array
5. Brute Force: O(n²) time, O(1) space, inefficient

Pitfalls:
- Not understanding the specific constraints for Floyd's algorithm
- Confusing array indices with array values in cycle detection
- Using HashSet approach when O(1) space is required
- Not handling edge cases like single duplicate or no duplicates
- Assuming Floyd's works for all duplicate detection problems

Key Insights:
- Floyd's Cycle Detection achieves O(1) space for specific duplicate problems
- Array can be treated as implicit linked list when values are indices
- Different variants of duplicate problems require different optimal approaches
- Constraint analysis is crucial for choosing the right algorithm

Real-world Applications:
- Memory leak detection in circular references
- Database integrity checks for unique constraints
- Network topology cycle detection
- Duplicate file detection in file systems
- Cache collision detection

Algorithm Variants:
1. Find single duplicate vs multiple duplicates
2. Return duplicate value vs its index
3. Detect presence vs count frequency
4. Handle general arrays vs constrained ranges

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
