/*
============================================
FIND ALL DUPLICATE NUMBERS (LeetCode #442)
============================================


Problem Statement:
Given an integer array nums of length n where all the integers are in the range [1, n],
and each integer appears once or twice, return an array of all the integers that appear twice.

You must write an algorithm that runs in O(n) time and uses only constant O(1) extra space.


Example:
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Output: [2, 3]
Explanation: 2 and 3 each appear exactly twice

Input: nums = [1, 1, 2]
Output: [1]
Explanation: Only 1 appears twice

Input: nums = [1]
Output: []
Explanation: No duplicates


Constraints:
- n == nums.length
- 1 ≤ n ≤ 10^5
- 1 ≤ nums[i] ≤ n
- Each element appears once or twice (at most twice)
- Must run in O(n) time
- Must use O(1) extra space (not counting output array)


Edge Cases:
- No duplicates [1, 2, 3, 4] → []
- All duplicates [1, 1, 2, 2] → [1, 2]
- Single duplicate [1, 2, 3, 3] → [3]
- Single element [1] → []


Brute Force Logic:
- For each unique element, count its occurrences
- Use nested loops to compare each element with others
- Collect elements that appear exactly twice


Brute Force Code:
function findDuplicatesBrute(nums) {
    const result = [];
    const processed = new Set();
    
    for (let i = 0; i < nums.length; i++) {
        if (processed.has(nums[i])) continue;
        
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }
        
        if (count === 2) {
            result.push(nums[i]);
        }
        
        processed.add(nums[i]);
    }
    
    return result;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops
- Space: O(n) - set to track processed elements


Bottlenecks:
- Quadratic time complexity
- Redundant counting for same elements
- Doesn't leverage [1, n] range property


Optimized Logic Hints:
- Use cyclic sort to place each number at correct index
- Use in-place marking by negating values
- Both achieve O(n) time, O(1) space


Optimized Logic 1 (Cyclic Sort - Best for Learning):
- Goal: Place number i at index i-1
- After sorting, if nums[i] !== i+1, then nums[i] is a duplicate
- The number that should be at index i was replaced by duplicate
- Collect all such mismatched positions


Pseudo Code (Cyclic Sort):
function findDuplicates(nums):
    i = 0
    
    // Phase 1: Cyclic sort
    while i < nums.length:
        correctIndex = nums[i] - 1
        
        if nums[i] != nums[correctIndex]:
            swap(nums[i], nums[correctIndex])
        else:
            i++
    
    // Phase 2: Find duplicates
    result = []
    for i from 0 to nums.length - 1:
        if nums[i] != i + 1:
            result.push(nums[i])
    
    return result


*/


//Optimized Code 1 (Cyclic Sort):
function findDuplicates(nums) {
    let i = 0;
    const n = nums.length;
    
    // Step 1: Cyclic sort - place each number at correct index
    while (i < n) {
        const correctIndex = nums[i] - 1;
        
        // If number is not at its correct position
        if (nums[i] !== nums[correctIndex]) {
            // Swap to place it correctly
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            // Number is at correct position or duplicate exists
            i++;
        }
    }
    
    // Step 2: Find all duplicates
    const result = [];
    for (let i = 0; i < n; i++) {
        // If position i doesn't have i+1, then nums[i] is duplicate
        if (nums[i] !== i + 1) {
            result.push(nums[i]);
        }
    }
    
    return result;
}


//Optimized Code 2 (Marking with Negation - Space Optimal):
function findDuplicatesMarking(nums) {
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Get absolute value (in case it was marked negative)
        const index = Math.abs(nums[i]) - 1;
        
        // If value at index is negative, we've seen this number before
        if (nums[index] < 0) {
            result.push(Math.abs(nums[i]));
        } else {
            // Mark as visited by negating
            nums[index] = -nums[index];
        }
    }
    
    // Optional: Restore original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i]);
    }
    
    return result;
}


// Test Cases:
findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]) // [2, 3]
findDuplicates([1, 1, 2]) // [1]
findDuplicates([1]) // []
findDuplicates([2, 2]) // [2]


/*
Time and Space Complexity (Optimized):
- Cyclic Sort: O(n) time, O(1) space, modifies array
- Marking: O(n) time, O(1) space, modifies array (can restore)


Why Cyclic Sort Works:
- Array has n elements with values [1, n]
- Each value appears 1 or 2 times
- Place number i at index i-1
- After sorting, duplicates are at wrong positions
- If nums[i] !== i+1, the value at position i is the duplicate


Visual Example (Cyclic Sort):
Input: [4, 3, 2, 7, 8, 2, 3, 1]

Step 1: Place 4 at index 3 → [7, 3, 2, 4, 8, 2, 3, 1]
Step 2: Place 7 at index 6 → [3, 3, 2, 4, 8, 2, 7, 1]
Step 3: 3 already at index 2 (duplicate), skip
Step 4: Continue sorting...
Final: [1, 2, 3, 4, 8, 2, 7, 3] (approximately)

Scan result: positions with wrong values indicate duplicates


Why Marking Works:
- Use sign bit to store "visited" information
- When visiting nums[i], mark index nums[i]-1 as negative
- If already negative, nums[i] is duplicate
- Works because all numbers are positive initially


Visual Example (Marking):
Input: [4, 3, 2, 7, 8, 2, 3, 1]

Process 4: Mark index 3 → [4, 3, 2, -7, 8, 2, 3, 1]
Process 3: Mark index 2 → [4, 3, -2, -7, 8, 2, 3, 1]
Process 2: Mark index 1 → [4, -3, -2, -7, 8, 2, 3, 1]
Process 7: Mark index 6 → [4, -3, -2, -7, 8, 2, -3, 1]
Process 8: Mark index 7 → [4, -3, -2, -7, 8, 2, -3, -1]
Process 2: Index 1 already negative → 2 is duplicate!
Process 3: Index 2 already negative → 3 is duplicate!
Process 1: Mark index 0 → [-4, -3, -2, -7, 8, 2, -3, -1]

Result: [2, 3]


All Other Approaches:


1. Hash Set (Violates Space Constraint):
Logic:
- Use set to track seen numbers
- Add duplicates to result when encountered second time

Code:
function findDuplicatesHashSet(nums) {
    const seen = new Set();
    const result = [];
    
    for (const num of nums) {
        if (seen.has(num)) {
            result.push(num);
        } else {
            seen.add(num);
        }
    }
    
    return result;
}
Time: O(n), Space: O(n) - violates constraint


2. Frequency Counter (Violates Space Constraint):
Logic:
- Count frequency of each number
- Return numbers with frequency 2

Code:
function findDuplicatesFrequency(nums) {
    const frequency = new Map();
    
    for (const num of nums) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    }
    
    const result = [];
    for (const [num, count] of frequency) {
        if (count === 2) {
            result.push(num);
        }
    }
    
    return result;
}
Time: O(n), Space: O(n)


3. Sorting (Violates Time Constraint):
Logic:
- Sort array and check adjacent elements
- Collect pairs of equal adjacent elements

Code:
function findDuplicatesSort(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            result.push(nums[i]);
            i++; // Skip next to avoid counting same duplicate twice
        }
    }
    
    return result;
}
Time: O(n log n), Space: O(1)


Pattern Recognition:
- Numbers in range [1, n] → cyclic sort or marking
- Each appears once or twice → perfect for in-place marking
- Find all duplicates → scan after sorting/marking
- O(n) time + O(1) space → must use index mapping


Method Comparison:
1. Cyclic Sort: O(n) time, O(1) space, intuitive, modifies array ✅
2. Marking: O(n) time, O(1) space, clever, modifies array ✅
3. Hash Set: O(n) time, O(n) space, simple but violates constraint
4. Frequency Counter: O(n) time, O(n) space, clear but violates constraint
5. Sorting: O(n log n) time, O(1) space, violates time constraint
6. Brute Force: O(n²) time, too slow


Pitfalls:
- Not using Math.abs() when using marking approach
- Forgetting to restore array after marking (if needed)
- In cyclic sort, not handling case where duplicate is at correct position
- Off-by-one errors in index calculations
- Counting same duplicate multiple times


Key Insights:
- Cyclic sort naturally handles duplicates by leaving them at wrong positions
- Marking uses sign bit as visited flag (clever space optimization)
- Both methods meet O(n) time and O(1) space requirements
- Range [1, n] property is key to both solutions
- Each element appears at most twice simplifies logic


Real-world Applications:
- Database integrity checks (duplicate records)
- Network packet duplicate detection
- File deduplication in storage systems
- Data validation in constrained systems
- Memory management (duplicate references)


Algorithm Variants and Related Problems:
1. Find Single Duplicate (LeetCode 287) - Floyd's cycle detection
2. Find Missing Number (LeetCode 268) - sum or cyclic sort
3. Find All Missing Numbers (LeetCode 448) - cyclic sort or marking
4. Set Mismatch (LeetCode 645) - one duplicate, one missing
5. First Missing Positive (LeetCode 41) - cyclic sort variant


Cyclic Sort vs Marking:
- Cyclic Sort: More intuitive, demonstrates sorting pattern
- Marking: More clever, single pass sufficient
- Both: O(n) time, O(1) space, modify array
- Cyclic Sort: Better for learning the pattern
- Marking: More elegant for interviews


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
