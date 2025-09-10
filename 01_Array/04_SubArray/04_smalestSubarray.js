/*
============================================
SMALLEST SUBARRAY WITH SUM >= TARGET
============================================


Problem Statement:
Given an array of positive integers nums and a positive integer target,
find the minimal length of a contiguous subarray whose sum is greater than 
or equal to target.

Return the length of the smallest such subarray. If no such subarray exists, return 0.
Note: This problem specifically assumes all elements in nums are positive integers.


Example:
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
Explanation: The subarray [4, 3] has sum 7 and minimal length 2

Input: target = 15, nums = [1, 2, 3, 4, 5]
Output: 5
Explanation: The entire array sums to 15, so length is 5

Input: target = 100, nums = [1, 2, 3, 4, 5]
Output: 0
Explanation: No subarray can sum to >= 100


Constraints:
- 1 ≤ nums.length ≤ 10^5
- 1 ≤ nums[i] ≤ 10^4 (all positive integers)
- 1 ≤ target ≤ 10^9
- Find minimal length, not the actual subarray


Edge Cases:
- Single element >= target → return 1
- Target larger than sum of entire array → return 0
- All elements are 1 and target is large → return target (if possible)
- Target equals sum of entire array → return array length
- Multiple subarrays with same minimal length → length is same anyway


Brute Force Logic:
- For each starting index i, find the smallest ending index j such that sum(nums[i..j]) >= target
- Use nested loops where outer loop fixes start and inner loop extends end
- Track the minimum length found across all valid subarrays
- Return minimum length or 0 if no valid subarray exists


Brute Force Code:
function minSubArrayLenBrute(target, nums) {
    let minLength = Infinity;
    const n = nums.length;
    
    for (let start = 0; start < n; start++) {
        let currentSum = 0;
        
        for (let end = start; end < n; end++) {
            currentSum += nums[end];
            
            if (currentSum >= target) {
                minLength = Math.min(minLength, end - start + 1);
                break; // Found minimum for this start, move to next start
            }
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops examining all start-end pairs
- Space: O(1) - only using variables for tracking


Bottlenecks:
- Redundant recalculation of sums for overlapping subarrays
- Each starting position recalculates entire cumulative sum
- Doesn't leverage the positive integers property efficiently


Optimized Logic Hints:
- Use sliding window (two pointers) technique
- Since all numbers are positive, sum only increases when adding elements
- Expand window by moving right pointer until sum >= target
- Contract window by moving left pointer to find minimal length


Optimized Logic (Sliding Window):
- Use two pointers: start and end, both initially at 0
- Maintain running sum of current window [start, end]
- Expand window: move end pointer and add nums[end] to sum
- When sum >= target: 
  - Update minimum length with current window size
  - Contract window: subtract nums[start] and increment start
  - Continue contracting while sum >= target to find minimal length
- Continue until end pointer reaches array end


Pseudo Code:
function minSubArrayLen(target, nums):
    start = 0
    currentSum = 0
    minLength = Infinity
    
    for end from 0 to nums.length-1:
        currentSum += nums[end]  // Expand window
        
        while currentSum >= target:
            minLength = min(minLength, end - start + 1)
            currentSum -= nums[start]  // Contract window
            start++
        
    return minLength == Infinity ? 0 : minLength


*/


//Optimized Code:
function minSubArrayLen(target, nums) {
    let start = 0;
    let currentSum = 0;
    let minLength = Infinity;
    
    for (let end = 0; end < nums.length; end++) {
        currentSum += nums[end];
        
        while (currentSum >= target) {
            minLength = Math.min(minLength, end - start + 1);
            currentSum -= nums[start];
            start++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}


// Test Cases:
minSubArrayLen(7, [2, 3, 1, 2, 4, 3]) // 2 ([4,3])
minSubArrayLen(15, [1, 2, 3, 4, 5]) // 5 (entire array)
minSubArrayLen(100, [1, 2, 3, 4, 5]) // 0 (no valid subarray)
minSubArrayLen(4, [1, 4, 4]) // 1 ([4])
minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]) // 0 (sum = 8 < 11)


/*
Time and Space Complexity (Optimized):
- Time: O(n) - each element enters and leaves the window at most once
- Space: O(1) - only using pointer variables and sum tracker


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Prefix Sum with Binary Search:
Logic:
- Build prefix sum array for O(1) subarray sum queries
- For each starting position, use binary search to find minimal ending position
- Since prefix sums are monotonically increasing (positive integers), binary search works
- Time complexity becomes O(n log n)

Code:
function minSubArrayLenBinarySearch(target, nums) {
    const n = nums.length;
    const prefixSum = new Array(n + 1).fill(0);
    
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
    }
    
    let minLength = Infinity;
    
    for (let start = 0; start < n; start++) {
        const targetSum = target + prefixSum[start];
        
        // Binary search for first prefix sum >= targetSum
        let left = start + 1, right = n;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (prefixSum[mid] >= targetSum) {
                minLength = Math.min(minLength, mid - start);
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}
Time: O(n log n), Space: O(n)


2. Deque-based Approach (overkill for this problem):
Logic:
- Use deque to maintain potential starting points
- More complex than needed for this specific problem
- Better suited for problems with negative numbers

Code:
function minSubArrayLenDeque(target, nums) {
    const prefixSum = new Array(nums.length + 1).fill(0);
    for (let i = 1; i <= nums.length; i++) {
        prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
    }
    
    const deque = [];
    let minLength = Infinity;
    
    for (let i = 0; i <= nums.length; i++) {
        while (deque.length && prefixSum[i] - prefixSum[deque[0]] >= target) {
            minLength = Math.min(minLength, i - deque.shift());
        }
        
        while (deque.length && prefixSum[i] <= prefixSum[deque[deque.length - 1]]) {
            deque.pop();
        }
        
        deque.push(i);
    }
    
    return minLength === Infinity ? 0 : minLength;
}
Time: O(n), Space: O(n)


Pattern Recognition:
- Variable-size sliding window → two pointers with expansion and contraction
- Positive integers only → monotonic property enables sliding window
- Minimum length requirement → contract window as much as possible when valid
- Similar to "Longest Substring" problems but with sum constraint


Method Comparison:
1. Sliding Window: O(n) time, O(1) space, optimal for positive integers
2. Prefix Sum + Binary Search: O(n log n) time, O(n) space, works for any integers
3. Deque approach: O(n) time, O(n) space, handles negative numbers efficiently
4. Brute Force: O(n²) time, O(1) space, simple but inefficient


Pitfalls:
- Attempting sliding window with negative numbers (doesn't work due to non-monotonic sums)
- Not handling case where no valid subarray exists (return 0)
- Off-by-one errors in window size calculation (end - start + 1)
- Infinite loop if not properly incrementing start pointer in while loop
- Forgetting that problem asks for length, not the actual subarray


Key Insights:
- Sliding window works because all elements are positive (monotonic sum property)
- Each element enters and exits the window exactly once → amortized O(n)
- Greedy approach: always try to minimize window size when sum is sufficient
- Two-pointer technique naturally finds all possible windows efficiently


Real-world Applications:
- Finding minimum time window to achieve target performance metrics
- Resource allocation: minimum resources needed to meet target output
- Financial analysis: shortest investment period to reach target returns
- Manufacturing: minimum batch size to meet production targets
- Network optimization: minimum bandwidth allocation for target throughput


Algorithm Variants:
1. Longest subarray with sum ≤ target (different constraint)
2. Shortest subarray with sum exactly equal to target (requires different approach)
3. Shortest subarray with at least k distinct elements
4. Minimum window substring (character-based instead of sum-based)
5. Circular array variant (subarray can wrap around)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
