/*
============================================
MAX CONSECUTIVE ONES
============================================


Problem Statement:
Given a binary array nums (containing only 0s and 1s),
find the maximum number of consecutive 1's in the array.

Return the count of maximum consecutive 1's, not the actual subarray.


Example:
Input: nums = [1, 1, 0, 1, 1, 1]
Output: 3
Explanation: The first two 1's and last three 1's are consecutive.
The maximum number of consecutive 1's is 3.

Input: nums = [1, 0, 1, 1, 0, 1]
Output: 2
Explanation: There are two groups of consecutive 1's: [1] and [1,1].
The maximum length is 2.


Constraints:
- 1 ≤ nums.length ≤ 10^5
- nums[i] is either 0 or 1
- Array contains only binary values


Edge Cases:
- All ones [1, 1, 1, 1] → 4 (entire array)
- All zeros [0, 0, 0, 0] → 0 (no consecutive ones)
- Single element [1] → 1
- Single element [0] → 0
- Alternating [1, 0, 1, 0] → 1 (each group has length 1)
- Empty array [] → 0


Brute Force Logic:
- For each starting position that contains 1, count consecutive 1s
- Use nested loops where outer loop finds start of 1-sequence
- Inner loop counts length of current sequence
- Track maximum length found across all sequences


Brute Force Code:
function findMaxConsecutiveOnesBrute(nums) {
    let maxCount = 0;
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) {
            let currentCount = 0;
            let j = i;
            
            // Count consecutive 1s starting from i
            while (j < n && nums[j] === 1) {
                currentCount++;
                j++;
            }
            
            maxCount = Math.max(maxCount, currentCount);
            i = j - 1; // Skip to end of current sequence
        }
    }
    
    return maxCount;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - each element is visited at most twice
- Space: O(1) - only using variables for counting


Bottlenecks:
- Still requires nested loop structure even though optimized
- Could be simplified with single pass approach
- Multiple comparisons and pointer management


Optimized Logic Hints:
- Single pass through array tracking current and maximum counts
- Reset current count when encountering 0
- Update maximum count when encountering 1
- No need for nested loops or complex pointer management


Optimized Logic (Single Pass Counting):
- Maintain two variables: currentCount and maxCount
- Traverse array once from left to right
- When encountering 1: increment currentCount, update maxCount if needed
- When encountering 0: reset currentCount to 0
- Return maxCount after completing traversal


Pseudo Code:
function findMaxConsecutiveOnes(nums):
    maxCount = 0
    currentCount = 0
    
    for each num in nums:
        if num == 1:
            currentCount++
            maxCount = max(maxCount, currentCount)
        else:
            currentCount = 0
    
    return maxCount


*/


//Optimized Code:
function findMaxConsecutiveOnes(nums) {
    let maxCount = 0;
    let currentCount = 0;
    
    for (const num of nums) {
        if (num === 1) {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }
    
    return maxCount;
}


// Test Cases:
findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]) // 3
findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]) // 2
findMaxConsecutiveOnes([0, 0, 0, 0]) // 0
findMaxConsecutiveOnes([1, 1, 1, 1]) // 4
findMaxConsecutiveOnes([1, 0, 1, 0, 1]) // 1


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only using two counter variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Two Pointers Approach:
Logic:
- Use left and right pointers to track start and end of consecutive 1s
- Move left pointer to first 1 in each group
- Extend right pointer while elements are 1
- Calculate length and update maximum
- More complex than needed but demonstrates two-pointer technique

Code:
function findMaxConsecutiveOnesTwoPointers(nums) {
    let maxCount = 0;
    let left = 0;
    const n = nums.length;
    
    while (left < n) {
        if (nums[left] === 0) {
            left++;
        } else {
            let right = left;
            while (right < n && nums[right] === 1) {
                right++;
            }
            maxCount = Math.max(maxCount, right - left);
            left = right;
        }
    }
    
    return maxCount;
}
Time: O(n), Space: O(1)


2. Sliding Window Approach:
Logic:
- Maintain window of consecutive 1s
- Expand window while encountering 1s
- Reset window when encountering 0
- Track maximum window size
- Overkill for this problem but shows sliding window pattern

Code:
function findMaxConsecutiveOnesSlidingWindow(nums) {
    let maxCount = 0;
    let windowStart = 0;
    
    for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
        if (nums[windowEnd] === 0) {
            windowStart = windowEnd + 1;
        } else {
            maxCount = Math.max(maxCount, windowEnd - windowStart + 1);
        }
    }
    
    return maxCount;
}
Time: O(n), Space: O(1)


3. Recursive Approach:
Logic:
- Recursively find maximum in left and right halves
- Handle crossing consecutive 1s at the boundary
- Divide and conquer approach
- Not practical for this problem but demonstrates recursion

Code:
function findMaxConsecutiveOnesRecursive(nums, start = 0, end = nums.length - 1) {
    if (start > end) return 0;
    if (start === end) return nums[start];
    
    const mid = Math.floor((start + end) / 2);
    
    // Maximum in left half
    const leftMax = findMaxConsecutiveOnesRecursive(nums, start, mid);
    
    // Maximum in right half
    const rightMax = findMaxConsecutiveOnesRecursive(nums, mid + 1, end);
    
    // Maximum crossing the middle
    let leftCross = 0;
    for (let i = mid; i >= start && nums[i] === 1; i--) {
        leftCross++;
    }
    
    let rightCross = 0;
    for (let i = mid + 1; i <= end && nums[i] === 1; i++) {
        rightCross++;
    }
    
    const crossingMax = leftCross + rightCross;
    
    return Math.max(leftMax, rightMax, crossingMax);
}
Time: O(n log n), Space: O(log n)


Pattern Recognition:
- Consecutive elements counting → single pass with counter reset
- Binary array processing → simple state tracking (in/out of sequence)
- Maximum subarray variant → track current and global maximum
- Similar to "Longest Substring" but with simpler binary condition


Method Comparison:
1. Single Pass Counter: O(n) time, O(1) space, optimal and simplest
2. Two Pointers: O(n) time, O(1) space, more complex but clear logic
3. Sliding Window: O(n) time, O(1) space, demonstrates window pattern
4. Recursive: O(n log n) time, O(log n) space, educational but inefficient
5. Brute Force: O(n) time, O(1) space, works but unnecessary complexity


Pitfalls:
- Forgetting to update maximum count inside the loop when encountering 1
- Not resetting current count when encountering 0
- Off-by-one errors in boundary conditions
- Overcomplicating with unnecessary data structures
- Not handling empty array case properly


Key Insights:
- Simple state machine: counting vs not counting consecutive 1s
- Reset mechanism triggered by 0s naturally handles sequence boundaries
- Single pass sufficient due to simple counting requirement
- Maximum tracking can be done inline with counting


Real-world Applications:
- Uptime monitoring: longest period of continuous service
- Quality control: longest streak of defect-free products
- Performance analysis: longest period of meeting targets
- Network monitoring: longest period of stable connections
- Financial analysis: longest streak of profitable days


Algorithm Variants:
1. Max Consecutive Ones II (can flip one 0)
2. Max Consecutive Ones III (can flip at most k 0s)
3. Max consecutive 0s in binary array
4. Longest subarray with equal 0s and 1s
5. Count all subarrays with consecutive 1s


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
