/*
============================================
LONGEST SUBARRAY WITHOUT REPEATING ELEMENTS
============================================


Problem Statement:
Given an array of integers nums, 
find the length of the longest contiguous subarray 
that contains no repeating elements.

Each element in the subarray must be unique (appear exactly once).
Return the length of the longest such subarray.


Example:
Input: nums = [3, 2, 5, 2, 3, 6]
Output: 4
Explanation: The subarray [2, 5, 2, 3] is invalid due to repeating 2
The longest valid subarray is [2, 5, 2, 3] -> invalid, try [5, 2, 3, 6] which has length 4

Input: nums = [1, 2, 3, 1, 2, 3]
Output: 3
Explanation: The longest subarray without repeating elements is [1, 2, 3] with length 3

Input: nums = [1, 1, 1, 1]
Output: 1
Explanation: Each element forms a subarray of length 1


Constraints:
- 0 ≤ nums.length ≤ 5 × 10^4
- -10^4 ≤ nums[i] ≤ 10^4
- Array can contain negative numbers, zero, and positive numbers
- Empty array returns 0


Edge Cases:
- Empty array [] → 0
- Single element [5] → 1
- All elements same [3, 3, 3] → 1
- All elements different [1, 2, 3, 4] → 4 (entire array)
- Two elements repeating [1, 2, 1] → 2 ([1, 2] or [2, 1])


Brute Force Logic:
- For each starting position, extend ending position while tracking seen elements
- Use set to check if current element is already in current subarray
- Track maximum length found across all valid subarrays
- Stop extending when duplicate is found


Brute Force Code:
function longestSubarrayBrute(nums) {
    let maxLength = 0;
    const n = nums.length;
    
    for (let start = 0; start < n; start++) {
        const seen = new Set();
        
        for (let end = start; end < n; end++) {
            if (seen.has(nums[end])) {
                break; // Found duplicate, stop extending
            }
            
            seen.add(nums[end]);
            maxLength = Math.max(maxLength, end - start + 1);
        }
    }
    
    return maxLength;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops examining all start-end pairs
- Space: O(n) - set to track elements in current subarray


Bottlenecks:
- Redundant recalculation for overlapping subarrays
- Each starting position rebuilds seen set from scratch
- Doesn't leverage sliding window property efficiently


Optimized Logic Hints:
- Use sliding window (two pointers) with hash map/set
- Maintain window of unique elements between left and right pointers
- When duplicate found, shrink window from left until duplicate is removed
- Track maximum window size throughout the process


Optimized Logic (Sliding Window with Set):
- Use two pointers: left and right, both starting at 0
- Maintain set of elements in current window [left, right]
- Expand window: move right pointer, add nums[right] to set
- When duplicate found (nums[right] already in set):
  - Contract window: remove nums[left] from set, move left pointer
  - Continue until nums[right] is no longer in set
- Track maximum window size when all elements are unique


Pseudo Code:
function longestSubarray(nums):
    left = 0
    maxLength = 0
    seen = new Set()
    
    for right from 0 to nums.length-1:
        // Contract window until no duplicate
        while seen.has(nums[right]):
            seen.delete(nums[left])
            left++
        
        // Expand window
        seen.add(nums[right])
        maxLength = max(maxLength, right - left + 1)
    
    return maxLength


*/


//Optimized Code:
function longestSubarray(nums) {
    let left = 0;
    let maxLength = 0;
    const seen = new Set();
    
    for (let right = 0; right < nums.length; right++) {
        // Contract window until current element is not duplicate
        while (seen.has(nums[right])) {
            seen.delete(nums[left]);
            left++;
        }
        
        // Add current element and update max length
        seen.add(nums[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}


// Test Cases:
longestSubarray([3, 2, 5, 2, 3, 6]) // 4 ([2,5,2,3] invalid, [5,2,3,6] valid)
longestSubarray([1, 2, 3, 1, 2, 3]) // 3 ([1,2,3])
longestSubarray([1, 1, 1, 1]) // 1 ([1])
longestSubarray([1, 2, 3, 4]) // 4 (entire array)
longestSubarray([]) // 0
longestSubarray([5]) // 1


/*
Time and Space Complexity (Optimized):
- Time: O(n) - each element enters and leaves set at most once
- Space: O(n) - set stores at most n unique elements


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Sliding Window with Index Map:
Logic:
- Instead of set, use map to store element -> last seen index
- When duplicate found, jump left pointer to position after last occurrence
- More efficient as it can skip elements in single jump
- Handles the case where we can optimize left pointer movement

Code:
function longestSubarrayMap(nums) {
    let left = 0;
    let maxLength = 0;
    const lastIndex = new Map();
    
    for (let right = 0; right < nums.length; right++) {
        if (lastIndex.has(nums[right])) {
            // Jump left pointer to position after last occurrence
            left = Math.max(left, lastIndex.get(nums[right]) + 1);
        }
        
        lastIndex.set(nums[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
Time: O(n), Space: O(n)


2. Array-based Tracking (for limited range):
Logic:
- Use array instead of map for index tracking (if element range is small)
- Initialize array with -1 to indicate "not seen"
- Similar to map approach but potentially more efficient
- Only works when element range is manageable

Code:
function longestSubarrayArray(nums) {
    const offset = 10000; // Handle negative numbers
    const lastIndex = new Array(20001).fill(-1);
    let left = 0, maxLength = 0;
    
    for (let right = 0; right < nums.length; right++) {
        const index = nums[right] + offset;
        if (lastIndex[index] >= left) {
            left = lastIndex[index] + 1;
        }
        
        lastIndex[index] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
Time: O(n), Space: O(range)


3. Recursive Approach with Memoization:
Logic:
- Divide problem into subproblems recursively
- Use memoization to cache results
- Not practical for this problem but demonstrates recursive thinking
- Exponential complexity without proper optimization

Code:
function longestSubarrayRecursive(nums, start = 0, seen = new Set(), memo = new Map()) {
    if (start >= nums.length) return 0;
    
    const key = `${start}-${Array.from(seen).sort().join(',')}`;
    if (memo.has(key)) return memo.get(key);
    
    let maxLen = 0;
    
    // Try extending current subarray
    if (!seen.has(nums[start])) {
        const newSeen = new Set(seen);
        newSeen.add(nums[start]);
        maxLen = 1 + longestSubarrayRecursive(nums, start + 1, newSeen, memo);
    }
    
    // Try starting new subarray from next position
    maxLen = Math.max(maxLen, longestSubarrayRecursive(nums, start + 1, new Set(), memo));
    
    memo.set(key, maxLen);
    return maxLen;
}
Time: O(2^n), Space: O(2^n)


Pattern Recognition:
- Variable-size sliding window → two pointers with expansion and contraction
- Unique elements constraint → use set or map for tracking
- Longest valid window → maximize window size while maintaining validity
- Classic "Longest Substring Without Repeating Characters" pattern


Method Comparison:
1. Sliding Window (Set): O(n) time, O(n) space, clean and intuitive
2. Sliding Window (Map): O(n) time, O(n) space, optimized pointer movement
3. Array Tracking: O(n) time, O(range) space, efficient for limited ranges
4. Recursive: O(2^n) time, O(2^n) space, educational but impractical
5. Brute Force: O(n²) time, O(n) space, simple but inefficient


Pitfalls:
- Not properly removing elements from set when contracting window
- Forgetting to handle empty array case
- Off-by-one errors in window size calculation
- Using map approach incorrectly (not updating left pointer properly)
- Memory issues when using array tracking for large element ranges


Key Insights:
- Sliding window maintains unique elements constraint efficiently
- Each element contributes to exactly one continuous range of valid windows
- Set/Map allows constant-time duplicate detection
- Greedy approach: always maximize current window before moving


Real-world Applications:
- Data stream processing: longest sequence without duplicate events
- Network monitoring: longest period without repeated connection IDs
- Log analysis: longest session without duplicate actions
- Memory management: longest allocation sequence without conflicts
- Quality control: longest production run without repeated defects


Algorithm Variants:
1. Longest substring without repeating characters (string version)
2. Longest subarray with at most K distinct elements
3. Longest subarray with exactly K unique elements
4. Count of subarrays without repeating elements
5. Shortest subarray containing all unique elements


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
