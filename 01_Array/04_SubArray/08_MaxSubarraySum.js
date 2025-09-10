/*
============================================
KADANE'S ALGORITHM (MAXIMUM SUBARRAY SUM)
============================================


Problem Statement:
Given an integer array nums, 
find the contiguous subarray (containing at least one number) 
which has the largest sum and return its sum.

This is also known as the "Maximum Subarray Problem" and is optimally 
solved using Kadane's Algorithm in O(n) time and O(1) space.


Example:
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: The subarray [4, -1, 2, 1] has the largest sum 6

Input: nums = [5, 4, -1, 7, 8]
Output: 23
Explanation: The entire array [5, 4, -1, 7, 8] has the largest sum 23

Input: nums = [-2, -3, -1, -5]
Output: -1
Explanation: The subarray [-1] has the largest sum -1


Constraints:
- 1 ≤ nums.length ≤ 10^5
- -10^4 ≤ nums[i] ≤ 10^4
- Must find contiguous subarray (not subsequence)
- At least one element must be included


Edge Cases:
- All negative numbers → return the maximum (least negative) element
- All positive numbers → return sum of entire array
- Single element → return that element
- Mix of positive and negative → Kadane's algorithm shines
- Array with zeros → zeros can be part of optimal subarray


Brute Force Logic:
- Generate all possible subarrays using nested loops
- Calculate sum of each subarray
- Track the maximum sum encountered
- Return the maximum sum found


Brute Force Code:
function maxSubarrayBrute(nums) {
    let maxSum = -Infinity;
    const n = nums.length;
    
    for (let start = 0; start < n; start++) {
        let currentSum = 0;
        
        for (let end = start; end < n; end++) {
            currentSum += nums[end];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops examining all subarrays
- Space: O(1) - only using variables for tracking


Bottlenecks:
- Redundant recalculation of overlapping subarray sums
- Doesn't leverage the optimal substructure property
- Quadratic time complexity is inefficient for large arrays


Optimized Logic Hints:
- Use dynamic programming approach (Kadane's Algorithm)
- Key insight: maximum subarray ending at position i depends on maximum subarray ending at position i-1
- At each position, decide whether to extend previous subarray or start new one
- Track global maximum throughout the process


Optimized Logic (Kadane's Algorithm):
- Maintain two variables: currentSum (max sum ending at current position) and maxSum (global maximum)
- For each element, decide:
  - Option 1: Extend previous subarray (currentSum + nums[i])
  - Option 2: Start new subarray from current element (nums[i])
  - Choose the option that gives larger sum
- Update global maximum if current sum is better
- The decision rule: currentSum = max(nums[i], currentSum + nums[i])


Pseudo Code:
function maxSubarray(nums):
    maxSum = nums[0]        // Global maximum
    currentSum = nums[0]    // Max sum ending at current position
    
    for i from 1 to nums.length-1:
        // Decide: extend previous subarray or start new one
        currentSum = max(nums[i], currentSum + nums[i])
        
        // Update global maximum
        maxSum = max(maxSum, currentSum)
    
    return maxSum


*/


//Optimized Code (Kadane's Algorithm):
function maxSubarray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Choose between starting new subarray or extending previous one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        
        // Update global maximum
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}


// Alternative implementation (more explicit):
function maxSubarrayExplicit(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = nums[i];  // Start new subarray
        } else {
            currentSum += nums[i]; // Extend current subarray
        }
        
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}


// Test Cases:
maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) // 6 ([4, -1, 2, 1])
maxSubarray([5, 4, -1, 7, 8]) // 23 (entire array)
maxSubarray([-2, -3, -1, -5]) // -1 ([-1])
maxSubarray([1]) // 1
maxSubarray([-1]) // -1


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only using two variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Divide and Conquer Approach:
Logic:
- Recursively divide array into left and right halves
- Maximum subarray is either:
  - Entirely in left half
  - Entirely in right half  
  - Crosses the middle point
- Combine results from all three cases
- Classic divide and conquer but less efficient than Kadane's

Code:
function maxSubarrayDivideConquer(nums, left = 0, right = nums.length - 1) {
    if (left === right) return nums[left];
    
    const mid = Math.floor((left + right) / 2);
    
    // Maximum in left half
    const leftMax = maxSubarrayDivideConquer(nums, left, mid);
    
    // Maximum in right half
    const rightMax = maxSubarrayDivideConquer(nums, mid + 1, right);
    
    // Maximum crossing the middle
    let leftSum = -Infinity, sum = 0;
    for (let i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    const crossSum = leftSum + rightSum;
    
    return Math.max(leftMax, rightMax, crossSum);
}
Time: O(n log n), Space: O(log n)


2. Prefix Sum Approach:
Logic:
- Calculate prefix sums for all positions
- For each ending position, find minimum prefix sum before it
- Subarray sum = currentPrefix - minPrefixBefore
- Track maximum difference found

Code:
function maxSubarrayPrefix(nums) {
    let maxSum = nums[0];
    let prefixSum = 0;
    let minPrefixSum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];
        maxSum = Math.max(maxSum, prefixSum - minPrefixSum);
        minPrefixSum = Math.min(minPrefixSum, prefixSum);
    }
    
    return maxSum;
}
Time: O(n), Space: O(1)


3. Dynamic Programming (Explicit States):
Logic:
- dp[i] = maximum sum of subarray ending at position i
- dp[i] = max(nums[i], dp[i-1] + nums[i])
- Result is maximum value in dp array
- Same as Kadane's but with explicit DP array

Code:
function maxSubarrayDP(nums) {
    const n = nums.length;
    const dp = new Array(n);
    dp[0] = nums[0];
    let maxSum = nums[0];
    
    for (let i = 1; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
    }
    
    return maxSum;
}
Time: O(n), Space: O(n)


Pattern Recognition:
- Maximum subarray problem → Kadane's Algorithm is the gold standard
- Optimal substructure → decision at each position depends on previous position
- Greedy choice → always choose better of extending vs starting new
- Dynamic programming → but can be optimized to O(1) space


Method Comparison:
1. Kadane's Algorithm: O(n) time, O(1) space, optimal and elegant
2. Prefix Sum: O(n) time, O(1) space, alternative O(n) approach
3. Dynamic Programming: O(n) time, O(n) space, explicit but unnecessary space usage
4. Divide & Conquer: O(n log n) time, O(log n) space, educational but inefficient
5. Brute Force: O(n²) time, O(1) space, simple but too slow


Pitfalls:
- Forgetting to handle all negative arrays (should return maximum element)
- Not initializing maxSum and currentSum to nums[0]
- Confusing subarray (contiguous) with subsequence (not necessarily contiguous)
- Off-by-one errors in loop bounds
- Not understanding the core decision: extend vs restart


Key Insights:
- Kadane's algorithm is based on optimal substructure property
- The key insight: negative prefix sums should be discarded
- At each position, we decide whether previous subarray helps or hurts
- Algorithm naturally handles all edge cases including all-negative arrays
- The "magic" is in the decision rule: max(current, previous + current)


Real-world Applications:
- Stock trading: maximum profit from buying and selling stocks
- Data analysis: finding periods of maximum performance
- Signal processing: detecting strongest signal periods
- Financial modeling: finding periods of maximum returns
- Resource allocation: optimizing utilization periods
- Quality metrics: identifying best-performing time windows


Algorithm Variants:
1. Maximum Product Subarray (requires different approach due to negative numbers)
2. Maximum Sum Circular Subarray (array wraps around)
3. Maximum Sum Rectangle in 2D Array (extends Kadane's to 2D)
4. K-Kadane: Maximum sum of k non-overlapping subarrays
5. Maximum Subarray with at most K elements
6. Print the actual maximum subarray (requires tracking indices)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
