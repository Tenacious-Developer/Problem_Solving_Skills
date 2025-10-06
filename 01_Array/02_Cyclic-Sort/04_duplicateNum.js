/*
============================================
FIND DUPLICATE NUMBER (LeetCode #287)
============================================


Problem Statement:
Given an array of integers nums containing n + 1 integers where each integer 
is in the range [1, n] inclusive, return the one repeated number in nums.

Key Constraints:
- There is only ONE repeated number (but it can appear more than twice)
- You must solve it WITHOUT modifying the array
- You must use only constant O(1) extra space
- Runtime complexity should be less than O(n²)


Example:
Input: nums = [1, 3, 4, 2, 2]
Output: 2
Explanation: 2 is the only duplicate number

Input: nums = [3, 1, 3, 4, 2]
Output: 3
Explanation: 3 appears twice

Input: nums = [3, 3, 3, 3, 3]
Output: 3
Explanation: 3 is the duplicate (appears multiple times)


Constraints:
- 1 ≤ n ≤ 10^5
- nums.length == n + 1
- 1 ≤ nums[i] ≤ n
- All integers in nums appear only once except for ONE integer which appears at least twice
- Cannot modify the array
- Must use O(1) extra space


Edge Cases:
- Duplicate appears twice [1, 2, 3, 2] → 2
- Duplicate appears many times [2, 2, 2, 2, 2] → 2
- Duplicate is 1 [1, 1, 2, 3] → 1
- Duplicate is n [1, 2, 3, 3] → 3


Brute Force Logic:
- For each element, count how many times it appears in array
- Use nested loops to check each element against all others
- Return first element found more than once


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
- Time: O(n²) - nested loops checking all pairs
- Space: O(1) - only using counter variable


Bottlenecks:
- Quadratic time complexity
- Redundant comparisons
- Doesn't leverage the [1, n] range property
- No efficient lookup mechanism


Optimized Logic Hints:
- Think of array as linked list where nums[i] points to index nums[i]
- Since there's a duplicate, there MUST be a cycle (multiple pointers to same node)
- Use Floyd's Cycle Detection (Tortoise and Hare) algorithm
- Find the cycle, then find the entry point (which is the duplicate)


Optimized Logic (Floyd's Cycle Detection):
- Phase 1: Detect cycle using slow and fast pointers
  - slow moves one step: slow = nums[slow]
  - fast moves two steps: fast = nums[nums[fast]]
  - They will meet inside the cycle
- Phase 2: Find cycle entry point (the duplicate number)
  - Reset slow to start
  - Move both slow and fast one step at a time
  - They will meet at the cycle entry point (duplicate value)


Why This Works:
- Array forms a linked list: index i points to index nums[i]
- Since values are [1, n] and array size is n+1, index 0 is never pointed to
- Duplicate value means multiple indices point to same value
- This creates a cycle where the duplicate is the entry point


Pseudo Code:
function findDuplicate(nums):
    // Phase 1: Find intersection point in cycle
    slow = nums[0]
    fast = nums[0]
    
    do:
        slow = nums[slow]
        fast = nums[nums[fast]]
    while slow != fast
    
    // Phase 2: Find entrance to cycle (duplicate number)
    slow = nums[0]
    
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    
    return slow


*/


//Optimized Code (Floyd's Cycle Detection):
function findDuplicate(nums) {
    // Phase 1: Find intersection point in the cycle
    let slow = nums[0];
    let fast = nums[0];
    
    // Move until they meet
    do {
        slow = nums[slow];           // Move one step
        fast = nums[nums[fast]];     // Move two steps
    } while (slow !== fast);
    
    // Phase 2: Find the entrance to the cycle (duplicate number)
    slow = nums[0];  // Reset slow to start
    
    while (slow !== fast) {
        slow = nums[slow];  // Both move one step
        fast = nums[fast];
    }
    
    return slow;  // The meeting point is the duplicate
}


// Test Cases:
findDuplicate([1, 3, 4, 2, 2]) // 2
findDuplicate([3, 1, 3, 4, 2]) // 3
findDuplicate([3, 3, 3, 3, 3]) // 3
findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1, 4]) // 9


/*
Time and Space Complexity (Optimized):
- Time: O(n) - both phases traverse array linearly
- Space: O(1) - only using two pointer variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):

1.CYCLIC SORT APPROACH
Optimized Logic Hints:
- Use cyclic sort to place each number at correct index
- When trying to swap, if target position already has correct value, that's the duplicate
- Key insight: Since there are n+1 numbers and only n positions (1 to n), one number must repeat


Optimized Logic (Cyclic Sort):
- Iterate through array with index i
- For current element nums[i], calculate correct position: correctIndex = nums[i] - 1
- If nums[i] is not at correct position AND target position has different value:
  - Swap nums[i] with nums[correctIndex]
  - Don't increment i (check swapped element)
- If nums[i] equals nums[correctIndex] but i ≠ correctIndex:
  - Found duplicate! Return nums[i]
- If nums[i] is at correct position (nums[i] == i + 1):
  - Move to next position (i++)


Pseudo Code:
function findDuplicate(nums){:
    i = 0
    
    while i < nums.length:
        correctIndex = nums[i] - 1
        
        // If current number is not at correct position
        if nums[i] != i + 1:
            // Check if correct position already has the right value
            if nums[i] == nums[correctIndex]:
                return nums[i]  // Found duplicate
            else:
                swap(nums[i], nums[correctIndex])
        else:
            i++
    
    return -1
}
    
//Optimized Code (Cyclic Sort - Modifies Array):
function findDuplicate(nums) {
    let i = 0;
    
    while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        
        // If number is not at its correct position
        if (nums[i] !== nums[correctIndex]) {
            // Swap to place it at correct position
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else if (nums[i] !== i + 1) {
            // Found duplicate: same value at two different indices
            return nums[i];
        } else {
            // Number is at correct position, move to next
            i++;
        }
    }
    
    return -1;
}

2. Binary Search on Values (Meets Constraints):
Logic:
- Binary search on range [1, n], not on array indices
- For each mid value, count how many numbers are ≤ mid
- If count > mid, duplicate is in [1, mid], else in [mid+1, n]
- Uses pigeonhole principle

Code:
function findDuplicateBinarySearch(nums) {
    let left = 1;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Count numbers <= mid
        let count = 0;
        for (const num of nums) {
            if (num <= mid) {
                count++;
            }
        }
        
        // By pigeonhole principle
        if (count > mid) {
            right = mid;  // Duplicate in [1, mid]
        } else {
            left = mid + 1;  // Duplicate in [mid+1, n]
        }
    }
    
    return left;
}
Time: O(n log n), Space: O(1)


3. Hash Set (Violates Space Constraint):
Logic:
- Use set to track seen numbers
- Return first number already in set
- Simple but uses extra space

Code:
function findDuplicateHashSet(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    
    return -1;
}
Time: O(n), Space: O(n) - violates constraint


4. Sorting (Violates Modification Constraint):
Logic:
- Sort array and check adjacent elements
- First pair of adjacent equal elements is duplicate
- Modifies array which violates constraint

Code:
function findDuplicateSort(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            return nums[i];
        }
    }
    
    return -1;
}
Time: O(n log n), Space: O(1) or O(log n) - but modifies array


5. Marking with Negation (Violates Modification Constraint):
Logic:
- Mark visited indices by negating values
- If value at index is already negative, index is duplicate
- Modifies array which violates constraint

Code:
function findDuplicateMarking(nums) {
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]);
        
        if (nums[index] < 0) {
            return index;  // Already marked, this is duplicate
        }
        
        nums[index] = -nums[index];  // Mark as visited
    }
    
    return -1;
}
Time: O(n), Space: O(1) - but modifies array


Pattern Recognition:
- Array with cycle → Floyd's Cycle Detection
- Values in range [1, n] with n+1 elements → pigeonhole principle
- Cannot modify array + O(1) space → limits approaches significantly
- Related to: Linked List Cycle, Happy Number


Method Comparison:
1. Floyd's Cycle: O(n) time, O(1) space, no modification, OPTIMAL
2. Binary Search: O(n log n) time, O(1) space, no modification, acceptable
3. Hash Set: O(n) time, O(n) space, violates space constraint
4. Sorting: O(n log n) time, modifies array, violates constraint
5. Marking: O(n) time, modifies array, violates constraint
6. Brute Force: O(n²) time, O(1) space, too slow


Pitfalls:
- Not understanding why the cycle exists (duplicate creates multiple pointers to same index)
- Confusing array indices with array values in Floyd's algorithm
- Starting fast at nums[nums[0]] instead of nums[0]
- Not resetting slow to nums[0] in phase 2
- Forgetting that duplicate can appear more than twice


Key Insights:
- Array can be viewed as linked list: nums[i] → nums[nums[i]]
- Duplicate value causes cycle because multiple indices point to it
- Floyd's algorithm finds cycle entry point, which is the duplicate
- Phase 1 finds meeting point, Phase 2 finds cycle entrance
- Only Floyd's and Binary Search meet all constraints optimally


Real-world Applications:
- Detecting duplicate database records with constraints
- Memory leak detection in systems
- Finding duplicates in constrained embedded systems
- Network packet duplicate detection with limited memory
- Duplicate detection in read-only data structures


Algorithm Variants and Related Problems:
1. Find All Duplicates (multiple duplicates, can modify array)
2. Find Missing Number (one missing instead of duplicate)
3. Find Missing and Duplicate (one of each)
4. Linked List Cycle II (same algorithm, different problem)
5. Happy Number (uses cycle detection concept)


Why Floyd's Cycle Detection Works Here:
- Think of array as: 0 → nums[0] → nums[nums[0]] → ...
- Since values are [1, n], index 0 is never pointed to (no incoming edges)
- Duplicate means multiple indices have same value, creating cycle
- Example: [1,3,4,2,2]
  - 0→1→3→2→4→2 (cycle: 2→4→2)
  - Entry point 2 is the duplicate


Visual Understanding:
