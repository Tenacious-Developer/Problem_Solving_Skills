/*
============================================
FIRST MISSING POSITIVE (LeetCode #41)
============================================


Problem Statement:
Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses only constant extra space O(1).


Example:
Input: nums = [1, 2, 0]
Output: 3
Explanation: The numbers 1 and 2 are present, so the first missing positive is 3

Input: nums = [3, 4, -1, 1]
Output: 2
Explanation: 1 is present but 2 is missing

Input: nums = [7, 8, 9, 11, 12]
Output: 1
Explanation: No numbers starting from 1 are present


Constraints:
- 1 ≤ nums.length ≤ 10^5
- -2^31 ≤ nums[i] ≤ 2^31 - 1
- Array can contain negative numbers, zero, and positive numbers
- Must run in O(n) time
- Must use O(1) extra space


Edge Cases:
- All negative [−3, −2, −1] → 1
- All positive consecutive [1, 2, 3, 4] → 5
- Empty or single [1] → 2
- Large numbers [100, 200, 300] → 1
- Contains 1 but missing 2 [1, 3, 4] → 2


Brute Force Logic:
- Check each positive integer starting from 1
- For each candidate, search entire array
- Return first integer not found


Brute Force Code:
function firstMissingPositiveBrute(nums) {
    for (let candidate = 1; candidate <= nums.length + 1; candidate++) {
        let found = false;
        
        for (const num of nums) {
            if (num === candidate) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            return candidate;
        }
    }
    
    return nums.length + 1;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - for each of n+1 candidates, search array
- Space: O(1)


Bottlenecks:
- Quadratic time due to nested searching
- Doesn't leverage that answer is in range [1, n+1]
- No efficient tracking of seen numbers


Optimized Logic Hints:
- Key insight: Answer MUST be in range [1, n+1]
- Use cyclic sort to place positive integers at correct indices
- Only care about numbers in range [1, n]
- After sorting, first mismatch reveals missing positive


Optimized Logic (Cyclic Sort):
- Goal: Place number i at index i-1 (for numbers in range [1, n])
- Ignore negatives, zeros, and numbers > n (they don't affect answer)
- After sorting, scan for first index where nums[i] !== i+1
- If all match, answer is n+1


Why Answer is in [1, n+1]:
- Array has n positions
- Best case: contains all numbers [1, 2, 3, ..., n]
- In that case, first missing is n+1
- Otherwise, some number from 1 to n is missing


Pseudo Code:
function firstMissingPositive(nums):
    i = 0
    n = nums.length
    
    // Phase 1: Cyclic sort (only for valid range)
    while i < n:
        correctIndex = nums[i] - 1
        
        // Only swap if number is in valid range and not at correct position
        if nums[i] >= 1 and nums[i] <= n and nums[i] != nums[correctIndex]:
            swap(nums[i], nums[correctIndex])
        else:
            i++
    
    // Phase 2: Find first missing
    for i from 0 to n-1:
        if nums[i] != i + 1:
            return i + 1
    
    return n + 1


*/


//Optimized Code (Cyclic Sort):
function firstMissingPositive(nums) {
    const n = nums.length;
    let i = 0;
    
    // Step 1: Cyclic sort - place each valid number at correct index
    while (i < n) {
        const correctIndex = nums[i] - 1;
        
        // Only swap if:
        // 1. Number is positive (>= 1)
        // 2. Number is in valid range (<= n)
        // 3. Number is not already at correct position
        if (nums[i] >= 1 && nums[i] <= n && nums[i] !== nums[correctIndex]) {
            // Swap to correct position
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            // Skip invalid numbers or already correct
            i++;
        }
    }
    
    // Step 2: Find first position where number doesn't match
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;  // This is the missing positive
        }
    }
    
    // All positions have correct values [1, 2, ..., n]
    return n + 1;
}


//Alternative: Marking with Negation (More Complex)
function firstMissingPositiveMarking(nums) {
    const n = nums.length;
    
    // Step 1: Replace non-positive numbers with n+1
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0) {
            nums[i] = n + 1;
        }
    }
    
    // Step 2: Mark presence by negating values at indices
    for (let i = 0; i < n; i++) {
        const val = Math.abs(nums[i]);
        
        if (val <= n) {
            nums[val - 1] = -Math.abs(nums[val - 1]);
        }
    }
    
    // Step 3: Find first positive value (unmarked = missing)
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
firstMissingPositive([2, 1]) // 3


/*
Time and Space Complexity (Optimized):
- Cyclic Sort: O(n) time, O(1) space
- Marking: O(n) time, O(1) space


Why Cyclic Sort Works:
- Only numbers 1 to n matter for finding missing positive
- Place each at index value-1
- After sorting: [1, 2, 3, ..., n] if all present
- First gap reveals missing number
- Numbers outside [1, n] are ignored (don't affect result)


Visual Example (Cyclic Sort):
Input: [3, 4, -1, 1]

i=0: nums[0]=3, correctIndex=2
     Swap 3 to index 2
     [-1, 4, 3, 1]

i=0: nums[0]=-1, invalid (< 1)
     Skip, i++

i=1: nums[1]=4, correctIndex=3
     Swap 4 to index 3
     [-1, 1, 3, 4]

i=1: nums[1]=1, correctIndex=0
     Swap 1 to index 0
     [1, -1, 3, 4]

i=1: nums[1]=-1, invalid
     Skip, i++

i=2: nums[2]=3, correctIndex=2
     Already correct, i++

i=3: nums[3]=4, correctIndex=3
     Already correct, i++

Scan: nums[0]=1✓, nums[1]=-1✗
Missing: 1+1 = 2


Visual Example (Marking):
Input: [3, 4, -1, 1]

Replace negatives: [3, 4, 5, 1] (replace -1 with n+1=5)

Mark presence:
- 3 present: negate index 2 → [3, 4, -5, 1]
- 4 present: negate index 3 → [3, 4, -5, -1]
- 5 > n: ignore
- 1 present: negate index 0 → [-3, 4, -5, -1]

Scan: index 1 is positive → missing = 1+1 = 2


All Other Approaches:


1. Hash Set (Violates Space Constraint):
Logic:
- Add all positive numbers to set
- Check 1, 2, 3... until finding missing

Code:
function firstMissingPositiveHashSet(nums) {
    const positives = new Set(nums.filter(n => n > 0));
    
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!positives.has(i)) {
            return i;
        }
    }
    
    return nums.length + 1;
}
Time: O(n), Space: O(n)


2. Sorting (Violates Time/Space Constraint):
Logic:
- Sort array and scan for first gap in positives
- Slower and modifies array

Code:
function firstMissingPositiveSort(nums) {
    nums.sort((a, b) => a - b);
    let missing = 1;
    
    for (const num of nums) {
        if (num === missing) {
            missing++;
        }
    }
    
    return missing;
}
Time: O(n log n), Space: O(1) or O(log n)


Pattern Recognition:
- Answer constrained to [1, n+1] → use index mapping
- In-place O(1) space → cyclic sort or marking
- Unsorted with negatives → filter/ignore invalid values
- Find smallest missing → scan after organizing


Method Comparison:
1. Cyclic Sort: O(n) time, O(1) space, intuitive ✅
2. Marking: O(n) time, O(1) space, clever but complex ✅
3. Hash Set: O(n) time, O(n) space, simple but violates constraint
4. Sorting: O(n log n) time, slower
5. Brute Force: O(n²) time, too slow


Pitfalls:
- Not handling negatives and zeros properly
- Trying to place numbers > n (pointless, ignore them)
- Infinite loop if not skipping invalid numbers
- Off-by-one: number i goes to index i-1
- Forgetting answer could be n+1


Key Insights:
- Answer MUST be in [1, n+1] - critical observation
- Only numbers 1 to n are relevant
- Cyclic sort places valid numbers at correct indices
- Invalid numbers (≤ 0 or > n) don't affect result
- First mismatch after sorting reveals answer


Real-world Applications:
- ID generation (find next available ID)
- Memory allocation (find first free block)
- Resource management (first available slot)
- Database record IDs
- File system block allocation


Algorithm Variants and Related Problems:
1. Find Missing Number (LeetCode 268) - complete range [0, n]
2. Kth Missing Positive (LeetCode 1539) - kth missing, not first
3. Missing Element in Sorted Array (LeetCode 1060) - sorted input
4. Find All Missing Numbers (LeetCode 448) - all missing in [1, n]


Why This is Hardest Cyclic Sort Problem:
- Array contains negatives and large numbers (not just [1, n])
- Must filter invalid values while sorting
- Requires understanding of answer range constraint
- Tests deep understanding of cyclic sort pattern


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
