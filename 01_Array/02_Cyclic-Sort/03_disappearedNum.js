/*
============================================
FIND ALL MISSING NUMBERS (LeetCode #448)
============================================


Problem Statement:
Given an array nums of n integers where nums[i] is in the range [1, n],
return an array of all the integers in the range [1, n] that do not appear in nums.

Key difference from "Find Missing Number": Multiple numbers can be missing,
and some numbers may appear more than once (duplicates allowed).


Example:
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Output: [5, 6]
Explanation: Array length is 8, so range is [1, 8].
Numbers 5 and 6 are missing.

Input: nums = [1, 1]
Output: [2]
Explanation: Array length is 2, so range is [1, 2].
Number 2 is missing (1 appears twice).

Input: nums = [1, 2, 3, 4, 5]
Output: []
Explanation: All numbers from 1 to 5 are present.


Constraints:
- n == nums.length
- 1 ≤ n ≤ 10^4
- 1 ≤ nums[i] ≤ n
- Some numbers may appear multiple times
- Find all missing numbers in range [1, n]


Edge Cases:
- All numbers present [1, 2, 3] → []
- All duplicates [1, 1, 1] → [2, 3]
- Single element [1] → [] or [2] → [1]
- Consecutive duplicates [2, 2, 3, 3] → [1, 4]


Brute Force Logic:
- For each number from 1 to n, check if it exists in array
- Use nested loops: outer loop iterates 1 to n, inner loop searches array
- Collect numbers not found in array


Brute Force Code:
function findDisappearedNumbersBrute(nums) {
    const result = [];
    const n = nums.length;
    
    for (let i = 1; i <= n; i++) {
        let found = false;
        
        for (let j = 0; j < n; j++) {
            if (nums[j] === i) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            result.push(i);
        }
    }
    
    return result;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops checking each number
- Space: O(1) - excluding result array


Bottlenecks:
- Quadratic time due to repeated linear search
- No efficient lookup mechanism
- Doesn't leverage the [1, n] range property


Optimized Logic Hints:
- Use cyclic sort to place each number at its correct index
- Use in-place marking by negating values at corresponding indices
- Use hash set for O(1) lookup (but uses extra space)
- Cyclic sort is optimal: O(n) time, O(1) space


Optimized Logic (Cyclic Sort - Best Approach):
- Place each number at its correct position: number i goes to index i-1
- After sorting, iterate through array
- If nums[i] !== i+1, then i+1 is missing
- Collect all such missing numbers


Pseudo Code:
function findDisappearedNumbers(nums):
    i = 0
    
    // Cyclic sort: place each number at correct position
    while i < nums.length:
        correctIndex = nums[i] - 1
        if nums[i] != nums[correctIndex]:
            swap(nums[i], nums[correctIndex])
        else:
            i++
    
    // Find missing numbers
    result = []
    for i from 0 to nums.length - 1:
        if nums[i] != i + 1:
            result.push(i + 1)
    
    return result


*/


//Optimized Code (Cyclic Sort):
function findDisappearedNumbers(nums) {
    let i = 0;
    const n = nums.length;
    
    // Step 1: Cyclic sort - place each number at correct index
    while (i < n) {
        const correctIndex = nums[i] - 1;
        
        // If number is not at its correct position, swap
        if (nums[i] !== nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    
    // Step 2: Find indices where number doesn't match position
    const result = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            result.push(i + 1);
        }
    }
    
    return result;
}


// Alternative: In-Place Marking (Negation Approach)
function findDisappearedNumbersMarking(nums) {
    const n = nums.length;
    
    // Step 1: Mark presence by negating value at index
    for (let i = 0; i < n; i++) {
        const index = Math.abs(nums[i]) - 1;
        
        // Mark as seen by making negative (if not already negative)
        if (nums[index] > 0) {
            nums[index] = -nums[index];
        }
    }
    
    // Step 2: Positive values indicate missing numbers
    const result = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    
    return result;
}


// Test Cases:
findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]) // [5, 6]
findDisappearedNumbers([1, 1]) // [2]
findDisappearedNumbers([1, 2, 3, 4, 5]) // []
findDisappearedNumbers([2, 2]) // [1]


/*
Time and Space Complexity (Optimized):
- Cyclic Sort: O(n) time, O(1) space (excluding result array)
- Marking Approach: O(n) time, O(1) space (modifies array)


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Hash Set Approach:
Logic:
- Add all array elements to hash set
- Iterate from 1 to n and check which numbers are not in set
- Simple and intuitive but uses extra space

Code:
function findDisappearedNumbersHashSet(nums) {
    const numSet = new Set(nums);
    const result = [];
    const n = nums.length;
    
    for (let i = 1; i <= n; i++) {
        if (!numSet.has(i)) {
            result.push(i);
        }
    }
    
    return result;
}
Time: O(n), Space: O(n)


2. Boolean Array Approach:
Logic:
- Create boolean array of size n+1
- Mark indices present in input array as true
- Collect indices that remain false

Code:
function findDisappearedNumbersBoolean(nums) {
    const n = nums.length;
    const present = new Array(n + 1).fill(false);
    
    for (const num of nums) {
        present[num] = true;
    }
    
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (!present[i]) {
            result.push(i);
        }
    }
    
    return result;
}
Time: O(n), Space: O(n)


3. Frequency Counter with Object:
Logic:
- Count frequency of each number
- Find numbers with frequency 0
- Similar to hash set but tracks counts

Code:
function findDisappearedNumbersFrequency(nums) {
    const n = nums.length;
    const frequency = {};
    
    // Initialize all numbers with frequency 0
    for (let i = 1; i <= n; i++) {
        frequency[i] = 0;
    }
    
    // Count occurrences
    for (const num of nums) {
        frequency[num]++;
    }
    
    // Find numbers with frequency 0
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (frequency[i] === 0) {
            result.push(i);
        }
    }
    
    return result;
}
Time: O(n), Space: O(n)


Pattern Recognition:
- Numbers in range [1, n] with duplicates → cyclic sort pattern
- Multiple missing numbers → iterate to find all mismatches
- In-place requirement → marking or cyclic sort
- Related to: Find Missing Number, Find Duplicate Number, Find All Duplicates


Method Comparison:
1. Cyclic Sort: O(n) time, O(1) space, optimal, modifies array
2. Marking (Negation): O(n) time, O(1) space, optimal, modifies array
3. Hash Set: O(n) time, O(n) space, simple but extra memory
4. Boolean Array: O(n) time, O(n) space, explicit tracking
5. Frequency Counter: O(n) time, O(n) space, overkill for this problem
6. Brute Force: O(n²) time, O(1) space, too slow


Pitfalls:
- Not handling duplicates correctly in cyclic sort
- Forgetting to use Math.abs() when using marking approach (values become negative)
- Off-by-one errors converting between 1-based numbers and 0-based indices
- Modifying array when problem requires preserving original
- Not collecting all missing numbers (returning after finding first)


Key Insights:
- Cyclic sort naturally handles duplicates (doesn't try to place same number twice)
- Marking approach is clever: use sign bit to store presence information
- Both optimal approaches modify the array - restore if needed
- Hash set approach is acceptable if interviewer allows extra space
- Pattern extends to many "missing/duplicate in range [1,n]" problems


Real-world Applications:
- Database integrity checks (missing record IDs)
- Packet loss detection in networking (missing sequence numbers)
- Quality control (missing serial numbers in batch)
- File system verification (missing file blocks)
- Attendance tracking (absent participant IDs)
- Inventory management (missing SKUs)


Algorithm Variants and Related Problems:
1. Find Missing Number (single missing, no duplicates)
2. Find Duplicate Number (single duplicate, all others present)
3. Find All Duplicates (multiple duplicates possible)
4. First Missing Positive (unsorted, find smallest missing positive)
5. Set Mismatch (one missing, one duplicate)
6. Find the Duplicate and Missing (one of each)


Why Cyclic Sort Works Here:
- Goal: Place number i at index i-1
- Duplicates naturally handled: if nums[i] === nums[correctIndex], move on
- After sorting, any index i where nums[i] !== i+1 means i+1 is missing
- Works because we can have duplicates (unlike simple cyclic sort for distinct numbers)


Cyclic Sort vs Marking Comparison:
- Cyclic Sort: More intuitive, follows sorting pattern
- Marking: Clever space optimization, uses sign bit
- Both achieve O(n) time, O(1) space
- Cyclic sort better demonstrates the pattern for learning
- Marking is more "clever" for interviews


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
