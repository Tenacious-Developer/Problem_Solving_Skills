/*
============================================
FIND DUPLICATE NUMBER
============================================


Problem Statement:
Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), find the duplicate number. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and uses only constant extra space.


Example:
Input: nums = [1, 3, 4, 2, 2]
Output: 2
Explanation: 2 appears twice in the array


Constraints:
- 1 ≤ n ≤ 10^5
- nums.length == n + 1
- 1 ≤ nums[i] ≤ n
- All integers in nums are unique except for one integer which appears exactly twice
- Cannot modify the array
- Must use O(1) extra space


Edge Cases:
- Minimum case [1, 1] → 1
- Duplicate at beginning [2, 1, 2] → 2
- Duplicate at end [1, 2, 2] → 2
- Large array with duplicate in middle [1, 3, 4, 2, 2] → 2


Brute Force Logic:
- For each element, count its occurrences in the array
- Use nested loops to compare every element with all others
- Return the element that appears more than once


Brute Force Code:
function findDuplicateBrute(nums) {
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }
        if (count > 1) {
            return nums[i];
        }
    }
    return -1;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops to check all pairs
- Space: O(1) - only using counter variable


Bottlenecks:
- Redundant comparisons between same elements multiple times
- No efficient mechanism to detect cycles or patterns
- Quadratic time complexity doesn't leverage array constraints


Optimized Logic Hints:
- Think of array as linked list where nums[i] points to nums[nums[i]]
- Since values are in range [1, n] and array has n+1 elements, guaranteed cycle exists
- Use cycle detection algorithm to find the duplicate
- Apply Floyd's tortoise and hare algorithm


Optimized Logic (Floyd's Cycle Detection):
- Treat array as implicit linked list where nums[i] is pointer to index nums[i]
- Since there's exactly one duplicate, there will be a cycle in this linked list
- Use slow and fast pointers to detect cycle intersection point
- Phase 1: Move slow pointer 1 step, fast pointer 2 steps until they meet
- Phase 2: Reset one pointer to start, move both 1 step until they meet again
- Meeting point in phase 2 is the duplicate number


Pseudo Code:
function findDuplicate(nums):
    slow = nums[0]
    fast = nums[0]
    
    // Phase 1: Find intersection point
    do:
        slow = nums[slow]
        fast = nums[nums[fast]]
    while slow != fast
    
    // Phase 2: Find entrance of cycle (duplicate)
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
findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1]) // 9


/*
Time and Space Complexity (Optimized):
- Time: O(n) - at most linear passes through array
- Space: O(1) - only using two pointer variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Cyclic Sort Approach:
Logic:
- Place each number at its correct index position (number i at index i-1)
- During sorting, when we find a number already at its correct position, it's the duplicate
- Violates "don't modify array" constraint but shows the pattern
- Would work perfectly if modification was allowed

Code:
function findDuplicateCyclicSort(nums) {
    // Note: This approach VIOLATES the constraint of not modifying the array
    // Included for educational purposes to show cyclic sort pattern
    const n = nums.length;
    let i = 0;
    
    while (i < n) {
        const correctIndex = nums[i] - 1;
        if (nums[i] !== nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else if (correctIndex !== i) {
            // Found duplicate - number is at correct position but we're not at that index
            return nums[i];
        } else {
            i++;
        }
    }
    
    return -1;
}
Time: O(n), Space: O(1), but VIOLATES "don't modify array" constraint
Cyclic Sort Approach is different then Cycle Detection

2. Hash Set Approach:
Logic:
- Use Set to track seen elements during traversal
- When encounter element already in Set, return it as duplicate
- Violates O(1) space constraint but simple to understand

Code:
function findDuplicateSet(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    
    return -1;
}
Time: O(n), Space: O(n)


3. Negative Marking Approach:
Logic:
- Use array indices as hash by marking visited numbers with negative values
- When accessing an already negative index, we found the duplicate
- Violates "don't modify array" constraint

Code:
function findDuplicateNegativeMarking(nums) {
    // Note: This approach VIOLATES the constraint of not modifying the array
    for (let i = 0; i < nums.length; i++) {
        const absNum = Math.abs(nums[i]);
        const index = absNum - 1;
        
        if (nums[index] < 0) {
            return absNum; // Found duplicate
        } else {
            nums[index] = -nums[index]; // Mark as visited
        }
    }
    
    return -1;
}
Time: O(n), Space: O(1), but VIOLATES "don't modify array" constraint


4. Sorting Approach:
Logic:
- Sort the array and check adjacent elements
- Return first pair of adjacent equal elements
- Violates "don't modify array" constraint

Code:
function findDuplicateSort(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return nums[i];
        }
    }
    
    return -1;
}
Time: O(n log n), Space: O(1)


5. Binary Search Approach:
Logic:
- Use binary search on possible values [1, n]
- For each mid value, count elements ≤ mid
- If count > mid, duplicate is in left half, else right half
- Meets all constraints but more complex

Code:
function findDuplicateBinarySearch(nums) {
    let left = 1;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        let count = 0;
        
        for (const num of nums) {
            if (num <= mid) count++;
        }
        
        if (count > mid) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
Time: O(n log n), Space: O(1)


Pattern Recognition:
- Array with constrained values → can be treated as implicit linked list or use cyclic sort
- Cycle detection problem → Floyd's tortoise and hare algorithm
- Pigeonhole principle → n+1 elements in range [1,n] guarantees duplicate
- Phase-based algorithm → first find cycle, then find cycle start


Method Comparison:
1. Floyd's Cycle: O(n) time, O(1) space, meets ALL constraints, optimal
2. Binary Search: O(n log n) time, O(1) space, meets all constraints but slower
3. Cyclic Sort: O(n) time, O(1) space, VIOLATES "don't modify" constraint
4. Negative Marking: O(n) time, O(1) space, VIOLATES "don't modify" constraint
5. Hash Set: O(n) time, O(n) space, violates space constraint
6. Sorting: O(n log n) time, O(1) space, violates modification constraint
7. Brute Force: O(n²) time, O(1) space, too slow for large inputs


Pitfalls:
- Not understanding how array represents implicit linked list structure
- Confusing array indices with array values in pointer movements
- Forgetting that values are 1-indexed while array indices are 0-indexed
- Not implementing both phases of Floyd's algorithm correctly
- Applying cyclic sort without considering the "don't modify array" constraint
- Assuming other approaches meet the strict space and modification constraints


Key Insights:
- Floyd's Cycle Detection is the ONLY approach meeting ALL constraints optimally
- Cyclic sort pattern applies but violates modification constraint
- Array can represent linked list when values serve as pointers to indices
- Pigeonhole principle guarantees exactly one duplicate exists
- Two-phase algorithm: detect cycle existence, then find cycle entrance


Real-world Applications:
- Memory leak detection in circular references
- Detecting infinite loops in state machines
- Finding repeated processes in system monitoring
- Cycle detection in dependency graphs
- Duplicate detection in streaming data with space constraints


Algorithm Variants:
1. Find all duplicates vs single duplicate
2. Multiple duplicates allowed vs exactly one duplicate
3. Different value ranges and constraints
4. Return duplicate count vs duplicate value
5. Allow modification vs preserve array


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
