/*
============================================
FIND MISSING NUMBER (LeetCode #268)
============================================


Problem Statement:
Given an array nums containing n distinct numbers in the range [0, n],
return the only number in the range that is missing from the array.

The array has length n and contains n distinct numbers from the range [0, n],
meaning exactly one number from 0 to n is missing.


Example:
Input: nums = [3, 0, 1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3].
2 is the missing number in the range since it does not appear in nums.

Input: nums = [0, 1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2].
2 is the missing number.

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in [0,9]. 8 is missing.


Constraints:
- n == nums.length
- 1 ≤ n ≤ 10^4
- 0 ≤ nums[i] ≤ n
- All numbers in nums are unique
- Only one number from 0 to n is missing


Edge Cases:
- Missing number is 0: [1, 2, 3] → 0
- Missing number is n: [0, 1, 2] → 3 (last number)
- Missing number in middle: [0, 2, 3] → 1
- Two elements: [0, 1] → 2
- Single element [0] → 1 or [1] → 0


Brute Force Logic:
- For each number from 0 to n, check if it exists in array
- Use nested loops: outer loop iterates 0 to n, inner loop searches array
- Return first number not found in array


Brute Force Code:
function missingNumberBrute(nums) {
    const n = nums.length;
    
    for (let i = 0; i <= n; i++) {
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
    
    return -1;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops checking each number
- Space: O(1) - only using variables


Bottlenecks:
- Redundant searching for each candidate number
- Quadratic time complexity doesn't scale
- No efficient lookup mechanism


Optimized Logic Hints:
- Use mathematical property: sum of 0 to n minus sum of array
- Or use XOR property: a XOR a = 0, a XOR 0 = a
- Or use cyclic sort to place elements at correct indices
- All achieve O(n) time with O(1) space


Optimized Logic (Sum Formula - Most Intuitive):
- Calculate expected sum of numbers from 0 to n using formula: n * (n + 1) / 2
- Calculate actual sum of all elements in array
- Missing number = expected sum - actual sum
- Works because exactly one number is missing


Pseudo Code:
function missingNumber(nums):
    n = nums.length
    expectedSum = n * (n + 1) / 2
    
    actualSum = 0
    for each num in nums:
        actualSum += num
    
    return expectedSum - actualSum


*/


//Optimized Code (Sum Approach):
function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    
    let actualSum = 0;
    for (const num of nums) {
        actualSum += num;
    }
    
    return expectedSum - actualSum;
}


// Alternative: XOR Approach (Bit Manipulation)
function missingNumberXOR(nums) {
    let xor = nums.length;  // Start with n
    
    for (let i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];  // XOR with index and element
    }
    
    return xor;
}


// Alternative: Cyclic Sort Approach
function missingNumberCyclicSort(nums) {
    let i = 0;
    const n = nums.length;
    
    // Place each number at its index position
    while (i < n) {
        const correctIndex = nums[i];
        
        // If number is in valid range and not at correct position
        if (nums[i] < n && nums[i] !== nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    
    // Find the index where number doesn't match
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }
    
    return n;  // If all indices match, missing number is n
}


// Test Cases:
missingNumber([3, 0, 1]) // 2
missingNumber([0, 1]) // 2
missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]) // 8
missingNumber([0]) // 1
missingNumber([1]) // 0


/*
Time and Space Complexity (Optimized):
- Sum Approach: O(n) time, O(1) space
- XOR Approach: O(n) time, O(1) space
- Cyclic Sort: O(n) time, O(1) space


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Hash Set Approach:
Logic:
- Add all array elements to hash set
- Iterate from 0 to n and check which number is not in set
- Simple but uses extra space

Code:
function missingNumberHashSet(nums) {
    const numSet = new Set(nums);
    const n = nums.length;
    
    for (let i = 0; i <= n; i++) {
        if (!numSet.has(i)) {
            return i;
        }
    }
    
    return -1;
}
Time: O(n), Space: O(n)


2. Sorting Approach:
Logic:
- Sort array first
- Check each index to see if nums[i] === i
- If not, i is the missing number
- If all match, n is missing

Code:
function missingNumberSort(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }
    
    return nums.length;
}
Time: O(n log n), Space: O(1) or O(log n) for sorting


3. Boolean Array Marking:
Logic:
- Create boolean array of size n+1
- Mark indices present in input array
- Find unmarked index

Code:
function missingNumberBoolean(nums) {
    const n = nums.length;
    const present = new Array(n + 1).fill(false);
    
    for (const num of nums) {
        present[num] = true;
    }
    
    for (let i = 0; i <= n; i++) {
        if (!present[i]) {
            return i;
        }
    }
    
    return -1;
}
Time: O(n), Space: O(n)


4. Using Array Reduce:
Logic:
- Use reduce to calculate sum difference in functional style
- Same mathematical approach but more concise

Code:
function missingNumberReduce(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    
    return expectedSum - actualSum;
}
Time: O(n), Space: O(1)


Pattern Recognition:
- Missing element in range [0, n] → sum/XOR properties
- Exactly one missing → difference-based approach works
- In-place requirement → cyclic sort pattern
- Related to: Find Duplicate, Find All Missing Numbers


Method Comparison:
1. Sum Formula: O(n) time, O(1) space, most intuitive and clean
2. XOR: O(n) time, O(1) space, elegant bit manipulation, no overflow issues
3. Cyclic Sort: O(n) time, O(1) space, modifies array, good for pattern practice
4. Hash Set: O(n) time, O(n) space, simple but uses extra memory
5. Sorting: O(n log n) time, varies space, slower than needed
6. Brute Force: O(n²) time, O(1) space, too slow


Pitfalls:
- Integer overflow with sum approach for very large n (use XOR instead)
- Not handling edge case where missing number is n itself
- Forgetting that range starts from 0, not 1
- Off-by-one errors in cyclic sort index calculations
- Modifying input array in cyclic sort when problem says not to


Key Insights:
- Mathematical property: missing = total expected - total actual
- XOR property eliminates matched pairs, leaving only missing number
- Cyclic sort leverages index mapping for [0, n] range
- Sum approach is most readable, XOR avoids overflow
- All optimal solutions achieve O(n) time with O(1) space


Real-world Applications:
- Database record validation (sequential IDs)
- Network packet loss detection (sequence numbers)
- File system integrity checks (missing blocks)
- Quality control (missing serial numbers)
- Attendance tracking (missing participant IDs)
- Distributed system synchronization


Algorithm Variants and Related Problems:
1. Find Duplicate Number (one number repeats, similar techniques)
2. Find All Missing Numbers (multiple numbers missing)
3. Find Missing and Duplicate (one missing, one duplicate)
4. First Missing Positive (unsorted array, find smallest missing positive)
5. Missing Number in Arithmetic Progression
6. Missing Ranges (find all missing ranges in sorted array)


Why XOR Approach is Clever:
- Property: a XOR a = 0, a XOR 0 = a
- XOR all indices (0 to n) with all array elements
- Matched numbers cancel out, only missing remains
- Example: [3,0,1]
  - XOR chain: 0^1^2^3 ^ 3^0^1 = 2
  - (0^0)^(1^1)^(3^3)^2 = 0^0^0^2 = 2


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
