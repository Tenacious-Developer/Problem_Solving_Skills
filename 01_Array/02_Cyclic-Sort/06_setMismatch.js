/*
============================================
SET MISMATCH (LeetCode #645)
============================================


Problem Statement:
You have a set of integers s, which originally contains all the numbers from 1 to n.
Unfortunately, due to some error, one of the numbers in s got duplicated to another 
number in the set, which results in:
- One number appearing twice (duplicate)
- One number missing

Given an integer array nums representing the data after the error,
return the number that occurs twice and the number that is missing in the format [duplicate, missing].


Example:
Input: nums = [1, 2, 2, 4]
Output: [2, 3]
Explanation: 2 appears twice, 3 is missing

Input: nums = [1, 1]
Output: [1, 2]
Explanation: 1 appears twice, 2 is missing

Input: nums = [3, 2, 3, 1]
Output: [3, 4]
Explanation: 3 appears twice, 4 is missing


Constraints:
- 2 ≤ n ≤ 10^4
- nums.length == n
- 1 ≤ nums[i] ≤ n
- All numbers appear exactly once except one number appears twice
- Exactly one number from 1 to n is missing
- Return [duplicate, missing] in this order


Edge Cases:
- Two elements [1, 1] → [1, 2]
- Duplicate at start [2, 2, 3] → [2, 1]
- Duplicate at end [1, 2, 3, 3] → [3, 4]
- Missing first [2, 3, 4] → impossible (all from 1 to n)


Brute Force Logic:
- Count frequency of each number from 1 to n
- Find number with count 2 (duplicate)
- Find number with count 0 (missing)


Brute Force Code:
function findErrorNumsBrute(nums) {
    const frequency = new Array(nums.length + 1).fill(0);
    
    for (const num of nums) {
        frequency[num]++;
    }
    
    let duplicate = -1, missing = -1;
    
    for (let i = 1; i <= nums.length; i++) {
        if (frequency[i] === 2) {
            duplicate = i;
        } else if (frequency[i] === 0) {
            missing = i;
        }
    }
    
    return [duplicate, missing];
}


Time and Space Complexity (Brute Force):
- Time: O(n) - two passes
- Space: O(n) - frequency array


Bottlenecks:
- Uses extra O(n) space
- Could solve in-place with modification


Optimized Logic Hints:
- Use cyclic sort to place each number at correct index
- Use marking with negation to track seen numbers
- Use mathematical formulas (sum and sum of squares)


Optimized Logic 1 (Cyclic Sort - Best for Pattern Learning):
- Place each number at index = value - 1
- While sorting, if target position already has correct value, found duplicate
- After sorting, position with wrong value reveals missing number


Pseudo Code (Cyclic Sort):
function findErrorNums(nums):
    i = 0
    duplicate = -1
    
    // Phase 1: Cyclic sort and find duplicate
    while i < nums.length:
        correctIndex = nums[i] - 1
        
        if nums[i] == nums[correctIndex]:
            if nums[i] != i + 1:
                duplicate = nums[i]
            i++
        else:
            swap(nums[i], nums[correctIndex])
    
    // Phase 2: Find missing number
    for i from 0 to nums.length - 1:
        if nums[i] != i + 1:
            missing = i + 1
    
    return [duplicate, missing]


*/


//Optimized Code 1 (Cyclic Sort):
function findErrorNums(nums) {
    let i = 0;
    let duplicate = -1;
    
    // Step 1: Cyclic sort and identify duplicate
    while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        
        // If number equals value at its correct position
        if (nums[i] === nums[correctIndex]) {
            // If not already at correct position, it's duplicate
            if (i !== correctIndex) {
                duplicate = nums[i];
            }
            i++;
        } else {
            // Swap to place at correct position
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        }
    }
    
    // Step 2: Find missing number
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            return [duplicate, i + 1];
        }
    }
    
    return [duplicate, -1];
}


//Optimized Code 2 (Marking with Negation):
function findErrorNumsMarking(nums) {
    let duplicate = -1;
    
    // Mark visited numbers by negating
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        
        if (nums[index] < 0) {
            // Already marked, found duplicate
            duplicate = Math.abs(nums[i]);
        } else {
            // Mark as visited
            nums[index] = -nums[index];
        }
    }
    
    // Find missing number (positive value indicates not visited)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            return [duplicate, i + 1];
        }
    }
    
    return [duplicate, -1];
}


//Optimized Code 3 (Mathematical Sum - No Modification):
function findErrorNumsSum(nums) {
    const n = nums.length;
    
    // Expected sum of 1 to n
    const expectedSum = (n * (n + 1)) / 2;
    
    // Sum of unique numbers in array
    const uniqueSum = [...new Set(nums)].reduce((sum, num) => sum + num, 0);
    
    // Actual sum (includes duplicate)
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    
    // duplicate = actualSum - uniqueSum
    const duplicate = actualSum - uniqueSum;
    
    // missing = expectedSum - uniqueSum
    const missing = expectedSum - uniqueSum;
    
    return [duplicate, missing];
}


// Test Cases:
findErrorNums([1, 2, 2, 4]) // [2, 3]
findErrorNums([1, 1]) // [1, 2]
findErrorNums([3, 2, 3, 1]) // [3, 4]
findErrorNums([2, 2]) // [2, 1]


/*
Time and Space Complexity:
- Cyclic Sort: O(n) time, O(1) space, modifies array
- Marking: O(n) time, O(1) space, modifies array
- Sum: O(n) time, O(1) space, no modification


Why Cyclic Sort Works:
- Original set: [1, 2, 3, 4]
- After error: [1, 2, 2, 4] (3 replaced by duplicate 2)
- During cyclic sort:
  - Try to place each number at index value-1
  - When placing second 2, find position already occupied by 2
  - This reveals the duplicate
- After sorting: [1, 2, ?, 4]
  - Position 2 (index 2) has wrong value
  - Should have 3, so 3 is missing


Visual Example (Cyclic Sort):
Input: [1, 2, 2, 4]

Step 1: i=0, nums[0]=1, correctIndex=0
        Already at correct position, i++
        [1, 2, 2, 4]

Step 2: i=1, nums[1]=2, correctIndex=1
        Already at correct position, i++
        [1, 2, 2, 4]

Step 3: i=2, nums[2]=2, correctIndex=1
        nums[1] also has 2! Found duplicate: 2
        i++
        [1, 2, 2, 4]

Step 4: i=3, nums[3]=4, correctIndex=3
        Already at correct position, i++
        [1, 2, 2, 4]

Scan: nums[2]=2 but should be 3 → missing = 3
Result: [2, 3]


Visual Example (Marking):
Input: [1, 2, 2, 4]

Process 1: Mark index 0 → [-1, 2, 2, 4]
Process 2: Mark index 1 → [-1, -2, 2, 4]
Process 2: Index 1 already negative → duplicate = 2
Process 4: Mark index 3 → [-1, -2, 2, -4]

Scan: Index 2 is positive → missing = 2+1 = 3
Result: [2, 3]


All Other Approaches:


1. Hash Set (Extra Space):
Logic:
- Track seen numbers in set
- Find duplicate when encountered second time
- Find missing by checking 1 to n

Code:
function findErrorNumsHashSet(nums) {
    const seen = new Set();
    let duplicate = -1;
    
    for (const num of nums) {
        if (seen.has(num)) {
            duplicate = num;
        } else {
            seen.add(num);
        }
    }
    
    for (let i = 1; i <= nums.length; i++) {
        if (!seen.has(i)) {
            return [duplicate, i];
        }
    }
    
    return [duplicate, -1];
}
Time: O(n), Space: O(n)


2. XOR Approach (Complex):
Logic:
- Use XOR properties to find difference
- XOR all numbers 1 to n and all array elements
- Result is XOR of duplicate and missing
- Requires additional logic to separate them

Code:
function findErrorNumsXOR(nums) {
    let xor = 0;
    const n = nums.length;
    
    // XOR with 1 to n
    for (let i = 1; i <= n; i++) {
        xor ^= i;
    }
    
    // XOR with array elements
    for (const num of nums) {
        xor ^= num;
    }
    
    // xor now contains missing XOR duplicate
    // Need additional logic to separate them
    // Complex to implement correctly
    
    return []; // Incomplete
}
Time: O(n), Space: O(1)


Pattern Recognition:
- Numbers in range [1, n] → cyclic sort applicable
- One duplicate + one missing → two-phase problem
- In-place requirement → cyclic sort or marking
- Similar to: Find Duplicate, Find Missing, Find All Duplicates


Method Comparison:
1. Cyclic Sort: O(n) time, O(1) space, intuitive, modifies array ✅
2. Marking: O(n) time, O(1) space, clever, modifies array ✅
3. Sum Formula: O(n) time, O(1) space, no modification ✅
4. Hash Set: O(n) time, O(n) space, simple but extra memory
5. XOR: O(n) time, O(1) space, complex implementation
6. Frequency Array: O(n) time, O(n) space


Pitfalls:
- In cyclic sort, not detecting duplicate when nums[i] == nums[correctIndex]
- Forgetting that duplicate might already be at correct position
- In marking, forgetting Math.abs() when index is already negative
- Infinite loop if not incrementing i when duplicate found
- Wrong order in return [duplicate, missing] vs [missing, duplicate]


Key Insights:
- Cyclic sort naturally finds both duplicate and missing
- Duplicate detected when trying to place number where same value exists
- Missing found at position with wrong value after sorting
- Marking uses sign bit to track visited (negative = seen)
- Sum approach is elegant but cyclic sort demonstrates pattern better


Real-world Applications:
- Database record validation (duplicate and missing IDs)
- File system integrity (duplicate and missing blocks)
- Network packet validation (duplicate and missing sequence numbers)
- Quality control (duplicate and missing serial numbers)
- Inventory management (duplicate entries, missing items)


Algorithm Variants and Related Problems:
1. Find Missing Number (LeetCode 268) - only missing
2. Find Duplicate Number (LeetCode 287) - only duplicate
3. Find All Duplicates (LeetCode 442) - multiple duplicates
4. Find All Missing Numbers (LeetCode 448) - multiple missing
5. First Missing Positive (LeetCode 41) - different range


Why This Problem is Perfect for Cyclic Sort:
- Original set: complete sequence 1 to n
- After error: one duplicate, one missing
- Cyclic sort places each at correct position
- Duplicate causes collision during placement
- Missing leaves gap after sorting
- Both found in single pass with sorting


Cyclic Sort Implementation Details:
1. When nums[i] == nums[correctIndex]:
   - If i == correctIndex: number at correct position, move on
   - If i != correctIndex: found duplicate, record and move on
2. When nums[i] != nums[correctIndex]:
   - Swap to place nums[i] at correct position
   - Don't increment i (check swapped value)
3. After sorting:
   - Scan for position where nums[i] != i+1
   - That position number (i+1) is missing


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
