/*
============================================
FIRST MISSING POSITIVE
============================================


Problem Statement:
Given an unsorted integer array nums, find the smallest missing positive integer. Your algorithm must run in O(n) time and use constant extra space.


Example:
Input: nums = [1, 2, 0]
Output: 3
Explanation: The smallest missing positive integer is 3.

Input: nums = [3, 4, -1, 1]
Output: 2
Explanation: The smallest missing positive integer is 2.

Input: nums = [7, 8, 9, 11, 12]
Output: 1
Explanation: Since 1 is missing, it is the smallest missing positive integer.


Constraints:
- 1 ≤ nums.length ≤ 5 × 10^5
- -2^31 ≤ nums[i] ≤ 2^31 - 1
- Must run in O(n) time and use O(1) extra space
- Cannot modify the array (depends on problem variant)


Edge Cases:
- Single element array [1] → 2
- Single element array [2] → 1
- All negative numbers [-1, -2, -3] → 1
- Empty array [] → 1
- Consecutive positives starting from 1 [1, 2, 3] → 4
- All numbers out of range [100, 200, 300] → 1


Brute Force Logic:
- Starting from 1, check if each positive integer exists in array
- Use nested loops to search for each candidate number
- Return the first number not found in the array


Brute Force Code:
function firstMissingPositiveBrute(nums) {
    for (let i = 1; i <= nums.length + 1; i++) {
        let found = false;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) {
                found = true;
                break;
            }
        }
        if (!found) {
            return i;
        }
    }
    return nums.length + 1;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops for each number check
- Space: O(1) - only using variables for loops


Bottlenecks:
- Redundant linear searches for each candidate number
- No efficient mechanism to track which numbers are present
- Quadratic time complexity doesn't meet O(n) requirement


Optimized Logic Hints:
- Use array indices to represent numbers and mark presence
- Leverage constraint that answer must be in range [1, n+1]
- Use negative values or special markers to avoid extra space
- Ignore numbers outside valid range [1, n]


Optimized Logic (Index as Hash - Negative Marking):
- Ignore negative numbers, zero, and numbers > n (they can't be the answer)
- Use array indices as hash table where index i-1 represents number i
- For each valid number, mark corresponding index by making it negative
- Scan array to find first positive index, which indicates missing number
- Use absolute value when accessing to handle already marked indices


Pseudo Code:
function firstMissingPositive(nums):
    n = nums.length
    
    // Phase 1: Mark presence of numbers 1 to n
    for each num in nums:
        absNum = abs(num)
        if absNum >= 1 and absNum <= n:
            index = absNum - 1
            if nums[index] > 0:
                nums[index] = -nums[index]
    
    // Phase 2: Find first unmarked position
    for i from 0 to n-1:
        if nums[i] > 0:
            return i + 1
    
    return n + 1


*/


//Optimized Code:
function firstMissingPositive(nums) {
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        const absNum = Math.abs(nums[i]);
        if (absNum >= 1 && absNum <= n) {
            const index = absNum - 1;
            if (nums[index] > 0) {
                nums[index] = -nums[index];
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            return i + 1;
        }
    }
    
    return n + 1;
}


// Test Cases:
firstMissingPositive([1, 2, 0]) // 3
firstMissingPositive([3, 4, -1, 1]) // 2
firstMissingPositive([7, 8, 9, 11, 12]) // 1
firstMissingPositive([1]) // 2
firstMissingPositive([2]) // 1


/*
Time and Space Complexity (Optimized):
- Time: O(n) - two passes through array
- Space: O(1) - only using constant variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Cyclic Sort Approach:
Logic:
- Place each number in range [1, n] at its correct index position
- Number i should be at index i-1 (convert 1-based to 0-based)
- Ignore numbers outside range [1, n] as they can't affect answer
- After sorting, find first position where nums[i] != i+1
- This position indicates the first missing positive

Code:
function firstMissingPositiveCyclicSort(nums) {
    const n = nums.length;
    let i = 0;
    
    while (i < n) {
        const correctIndex = nums[i] - 1;
        if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return n + 1;
}
Time: O(n), Space: O(1)


2. Set-Based Approach:
Logic:
- Store all positive numbers in Set for O(1) lookup
- Starting from 1, check which number is missing from Set
- First missing number is the answer
- Uses extra space but simple logic

Code:
function firstMissingPositiveSet(nums) {
    const numSet = new Set(nums.filter(num => num > 0));
    
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!numSet.has(i)) {
            return i;
        }
    }
    
    return nums.length + 1;
}
Time: O(n), Space: O(n)


3. Sorting Approach:
Logic:
- Sort array and filter out non-positive numbers
- Scan sorted array to find first gap in sequence
- Handle duplicates by skipping them
- Violates O(1) space due to sorting

Code:
function firstMissingPositiveSort(nums) {
    const positives = nums.filter(num => num > 0).sort((a, b) => a - b);
    let expected = 1;
    
    for (const num of positives) {
        if (num === expected) {
            expected++;
        } else if (num > expected) {
            return expected;
        }
    }
    
    return expected;
}
Time: O(n log n), Space: O(n)


4. Boolean Array Approach:
Logic:
- Create boolean array of size n+1 to track presence
- Mark indices corresponding to positive numbers in range [1, n]
- Find first false position in boolean array
- Uses extra space for tracking

Code:
function firstMissingPositiveBoolean(nums) {
    const n = nums.length;
    const present = new Array(n + 2).fill(false);
    
    for (const num of nums) {
        if (num > 0 && num <= n) {
            present[num] = true;
        }
    }
    
    for (let i = 1; i <= n + 1; i++) {
        if (!present[i]) {
            return i;
        }
    }
    
    return n + 1;
}
Time: O(n), Space: O(n)


Pattern Recognition:
- Missing positive in constrained range → use indices as hash or cyclic sort
- Answer guaranteed in range [1, n+1] → leverage this for optimization
- O(1) space requirement → modify input array as marker system
- Numbers outside range [1, n] irrelevant → can be ignored


Method Comparison:
1. Negative Marking: O(n) time, O(1) space, optimal for constraints
2. Cyclic Sort: O(n) time, O(1) space, places elements in correct positions
3. Set-based: O(n) time, O(n) space, clean logic but violates space constraint
4. Boolean Array: O(n) time, O(n) space, intuitive tracking approach
5. Sorting: O(n log n) time, O(n) space, slower due to sorting
6. Brute Force: O(n²) time, O(1) space, too slow for large inputs


Pitfalls:
- Not using absolute value when accessing already marked indices
- In cyclic sort: infinite loops if swap conditions not properly checked
- Forgetting that answer is guaranteed to be in range [1, n+1]
- Not handling numbers outside valid range [1, n] correctly
- Modifying input array when preservation is required


Key Insights:
- Both negative marking and cyclic sort achieve optimal O(1) space
- Array indices can serve as hash table when range is constrained
- Smallest missing positive is guaranteed to be ≤ n+1
- Numbers outside [1, n] range don't affect the answer


Real-world Applications:
- Memory allocation systems finding first available slot
- Database systems assigning next available ID
- Resource management finding first free resource
- Queue systems finding next available position
- File systems allocating next available inode


Algorithm Variants:
1. Find first missing positive vs find all missing positives
2. Handle duplicate numbers vs assume all unique
3. Preserve input array vs allow modification
4. Different constraint ranges like [0, n-1]
5. Find kth missing positive number


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
