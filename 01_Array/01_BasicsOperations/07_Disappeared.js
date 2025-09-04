/*
============================================
FIND ALL NUMBERS DISAPPEARED IN AN ARRAY
============================================


Problem Statement:
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums. The challenge is to solve it without using extra space.


Example:
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Output: [5, 6]
Explanation: Numbers 1-8 should be present, but 5 and 6 are missing

Input: nums = [1, 1]
Output: [2]
Explanation: Numbers 1-2 should be present, but 2 is missing


Constraints:
- n == nums.length
- 1 ≤ n ≤ 10^5
- 1 ≤ nums[i] ≤ n
- Array may contain duplicates
- Solve without using extra space (O(1) space complexity)


Edge Cases:
- No missing numbers [1, 2, 3, 4] → []
- All numbers missing except duplicates [1, 1, 1, 1] → [2, 3, 4]
- Single element [1] → []
- Single missing [1, 3, 4, 5] → [2]
- Multiple missing [1, 1, 3, 3] → [2, 4]


Brute Force Logic:
- For each number from 1 to n, check if it exists in the array
- Use nested loops to search for each expected number
- Collect all numbers that are not found in the array


Brute Force Code:
function findDisappearedNumbersBrute(nums) {
    const n = nums.length;
    const missing = [];
    
    for (let i = 1; i <= n; i++) {
        let found = false;
        for (let j = 0; j < n; j++) {
            if (nums[j] === i) {
                found = true;
                break;
            }
        }
        if (!found) {
            missing.push(i);
        }
    }
    
    return missing;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops for each number check
- Space: O(1) - only output array, no extra space for computation


Bottlenecks:
- Redundant linear searches through array for each missing candidate
- No efficient mechanism to mark which numbers have been seen
- Quadratic time complexity doesn't meet optimal requirements


Optimized Logic Hints:
- Use array indices to represent numbers and mark presence
- Leverage the constraint that numbers are in range [1, n]
- Use negative values as markers to avoid extra space
- Array index i represents number i+1


Optimized Logic (Index as Hash - Negative Marking):
- Use the array itself as a hash table where index represents the number
- For each number in array, mark the corresponding index by making it negative
- Numbers that map to positive indices are missing
- Use absolute value when accessing to handle already marked indices
- Collect indices that remain positive as missing numbers


Pseudo Code:
function findDisappearedNumbers(nums):
    // Phase 1: Mark present numbers
    for each num in nums:
        index = abs(num) - 1  // Convert to 0-based index
        if nums[index] > 0:
            nums[index] = -nums[index]  // Mark as visited
    
    // Phase 2: Find unmarked indices
    missing = []
    for i from 0 to nums.length - 1:
        if nums[i] > 0:
            missing.push(i + 1)  // Convert back to 1-based
    
    return missing


*/


//Optimized Code:
function findDisappearedNumbers(nums) {
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] > 0) {
            nums[index] = -nums[index];
        }
    }
    
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    
    return result;
}


// Test Cases:
findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]) // [5, 6]
findDisappearedNumbers([1, 1]) // [2]
findDisappearedNumbers([1, 2, 3, 4]) // []
findDisappearedNumbers([2, 2, 2, 2]) // [1, 3, 4]
findDisappearedNumbers([1, 3, 5, 7]) // [2, 4, 6, 8]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - two passes through array
- Space: O(1) - only output array, no extra space for computation


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Cyclic Sort Approach:
Logic:
- Use cyclic sort pattern to place each number at its correct index
- For number i, correct position is index i-1 (converting 1-based to 0-based)
- Swap elements until each position has correct number or duplicate
- After sorting, scan array to find positions where nums[i] != i+1
- These positions indicate missing numbers

Code:
function findDisappearedNumbersCyclicSort(nums) {
    let i = 0;
    
    while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        if (nums[i] !== nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            result.push(i + 1);
        }
    }
    
    return result;
}
Time: O(n), Space: O(1)


2. Set-Based Approach:
Logic:
- Convert array to Set for O(1) membership testing
- Iterate through range [1, n] and check presence in Set
- Collect numbers not present in Set
- Uses extra space but simpler logic

Code:
function findDisappearedNumbersSet(nums) {
    const numSet = new Set(nums);
    const missing = [];
    
    for (let i = 1; i <= nums.length; i++) {
        if (!numSet.has(i)) {
            missing.push(i);
        }
    }
    
    return missing;
}
Time: O(n), Space: O(n)


3. Boolean Array Approach:
Logic:
- Create boolean array to track presence of each number
- Mark true for numbers present in input array
- Collect indices with false values as missing numbers
- Clear and straightforward but uses extra space

Code:
function findDisappearedNumbersBoolean(nums) {
    const present = new Array(nums.length + 1).fill(false);
    
    for (const num of nums) {
        present[num] = true;
    }
    
    const missing = [];
    for (let i = 1; i <= nums.length; i++) {
        if (!present[i]) {
            missing.push(i);
        }
    }
    
    return missing;
}
Time: O(n), Space: O(n)


4. Sorting and Comparison:
Logic:
- Sort the array and remove duplicates
- Compare with expected sequence [1, 2, ..., n]
- Find gaps in the sorted sequence
- Modifies input array

Code:
function findDisappearedNumbersSort(nums) {
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const missing = [];
    let expectedNum = 1;
    
    for (const num of sorted) {
        while (expectedNum < num) {
            missing.push(expectedNum);
            expectedNum++;
        }
        expectedNum = num + 1;
    }
    
    while (expectedNum <= nums.length) {
        missing.push(expectedNum);
        expectedNum++;
    }
    
    return missing;
}
Time: O(n log n), Space: O(n)


Pattern Recognition:
- Missing elements in constrained range → use indices as hash or cyclic sort
- Numbers in range [1, n] with array size n → perfect mapping opportunity
- O(1) space requirement → modify input array as marker system
- Avoid extra data structures → leverage array properties creatively


Method Comparison:
1. Negative Marking: O(n) time, O(1) space, optimal for constraints, uses sign bit
2. Cyclic Sort: O(n) time, O(1) space, places elements in correct positions
3. Set-based: O(n) time, O(n) space, clean logic but violates space constraint
4. Boolean Array: O(n) time, O(n) space, intuitive but uses extra space
5. Sorting: O(n log n) time, O(n) space, slower due to sorting overhead
6. Brute Force: O(n²) time, O(1) space, too slow for large inputs


Pitfalls:
- Not using absolute value when accessing already marked indices in negative marking
- In cyclic sort: infinite loops if swap condition not checked properly
- Forgetting to convert between 0-based indices and 1-based numbers
- Not handling duplicates correctly in both approaches
- Modifying input array when preservation is required


Key Insights:
- Both negative marking and cyclic sort achieve O(1) space complexity
- Array indices can serve as hash table when numbers match array size
- Negative values can mark presence without additional space
- Cyclic sort naturally places elements in their expected positions


Real-world Applications:
- Database integrity checks for sequential IDs
- Finding missing records in batch processing
- Quality control in manufacturing with serial numbers
- Detecting missing packets in network communication
- File system integrity checks for numbered files


Algorithm Variants:
1. Find disappeared vs find duplicates
2. Range [1, n] vs other ranges like [0, n-1]
3. Preserve input array vs allow modification
4. Return missing numbers vs return indices
5. Handle multiple ranges or discontinuous sequences


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
