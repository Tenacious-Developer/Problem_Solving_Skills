/*
============================================
LONGEST SUBARRAY WITH AT MOST K DISTINCT ELEMENTS
============================================


Problem Statement:
Given an array of integers nums and an integer k,
find the length of the longest contiguous subarray that contains 
at most k distinct elements.

A distinct element is counted based on its value, regardless of frequency.
The subarray must be contiguous and non-empty.


Example:
Input: nums = [1, 2, 1, 2, 3], k = 2
Output: 4
Explanation: The subarray [1, 2, 1, 2] has length 4 with 2 distinct elements (1 and 2)

Input: nums = [1, 2, 3, 4, 5], k = 3
Output: 3
Explanation: Any subarray of length 3 has exactly 3 distinct elements

Input: nums = [1, 1, 1, 1], k = 1
Output: 4
Explanation: The entire array has only 1 distinct element


Constraints:
- 1 ≤ nums.length ≤ 10^5
- 1 ≤ nums[i] ≤ 10^4
- 1 ≤ k ≤ nums.length
- Return length of subarray, not the actual subarray


Edge Cases:
- k = 1 → find longest subarray with single distinct element
- k ≥ number of distinct elements in array → entire array is valid
- All elements are same → entire array has 1 distinct element
- All elements are different → maximum length is k
- k > nums.length → entire array is always valid


Brute Force Logic:
- For each starting position, expand ending position while tracking distinct elements
- Use set or frequency map to count distinct elements in current window
- Track maximum length where distinct count ≤ k
- Check all possible subarrays


Brute Force Code:
function longestSubarrayBrute(nums, k) {
    let maxLength = 0;
    const n = nums.length;
    
    for (let start = 0; start < n; start++) {
        const seen = new Set();
        
        for (let end = start; end < n; end++) {
            seen.add(nums[end]);
            
            if (seen.size <= k) {
                maxLength = Math.max(maxLength, end - start + 1);
            } else {
                break; // Too many distinct elements, stop extending
            }
        }
    }
    
    return maxLength;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops examining all start-end pairs
- Space: O(k) - set to track distinct elements (at most k+1 elements)


Bottlenecks:
- Redundant recalculation of distinct elements for overlapping windows
- Each starting position rebuilds frequency information from scratch
- Doesn't leverage the sliding window property efficiently


Optimized Logic Hints:
- Use sliding window (two pointers) with frequency map
- Expand window by moving right pointer and adding elements
- Contract window by moving left pointer when distinct count exceeds k
- Track maximum window size throughout the process


Optimized Logic (Sliding Window):
- Use two pointers: left and right, both starting at 0
- Maintain frequency map of elements in current window [left, right]
- Expand window: move right pointer, add nums[right] to frequency map
- When distinct elements > k:
  - Contract window: decrement frequency of nums[left], move left pointer
  - Remove element from map if frequency becomes 0
- Track maximum window size when distinct elements ≤ k


Pseudo Code:
function longestSubarray(nums, k):
    left = 0
    maxLength = 0
    frequencyMap = new Map()
    
    for right from 0 to nums.length-1:
        // Expand window
        frequencyMap[nums[right]] = (frequencyMap[nums[right]] || 0) + 1
        
        // Contract window if too many distinct elements
        while frequencyMap.size > k:
            frequencyMap[nums[left]]--
            if frequencyMap[nums[left]] == 0:
                delete frequencyMap[nums[left]]
            left++
        
        // Update maximum length
        maxLength = max(maxLength, right - left + 1)
    
    return maxLength


*/


//Optimized Code:
function longestSubarray(nums, k) {
    let left = 0;
    let maxLength = 0;
    const frequencyMap = new Map();
    
    for (let right = 0; right < nums.length; right++) {
        // Expand window by adding current element
        frequencyMap.set(nums[right], (frequencyMap.get(nums[right]) || 0) + 1);
        
        // Contract window if we have more than k distinct elements
        while (frequencyMap.size > k) {
            const leftElement = nums[left];
            frequencyMap.set(leftElement, frequencyMap.get(leftElement) - 1);
            
            if (frequencyMap.get(leftElement) === 0) {
                frequencyMap.delete(leftElement);
            }
            
            left++;
        }
        
        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}


// Test Cases:
longestSubarray([1, 2, 1, 2, 3], 2) // 4 ([1,2,1,2])
longestSubarray([1, 2, 3, 4, 5], 3) // 3 (any 3 consecutive elements)
longestSubarray([1, 1, 1, 1], 1) // 4 (entire array)
longestSubarray([1, 2, 1, 3, 4], 2) // 3 ([1,2,1])
longestSubarray([4, 1, 1, 1, 2, 1, 3, 3], 2) // 5 ([1,1,1,2,1])


/*
Time and Space Complexity (Optimized):
- Time: O(n) - each element enters and leaves window at most once
- Space: O(k) - frequency map stores at most k distinct elements


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Two Pointers with Array Frequency:
Logic:
- Use array instead of map for frequency tracking (if element range is small)
- Maintain count of distinct elements separately
- Slightly more efficient for small integer ranges
- Same sliding window principle

Code:
function longestSubarrayArray(nums, k) {
    const maxVal = Math.max(...nums);
    const frequency = new Array(maxVal + 1).fill(0);
    let left = 0, maxLength = 0, distinctCount = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (frequency[nums[right]] === 0) {
            distinctCount++;
        }
        frequency[nums[right]]++;
        
        while (distinctCount > k) {
            frequency[nums[left]]--;
            if (frequency[nums[left]] === 0) {
                distinctCount--;
            }
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
Time: O(n), Space: O(maxVal)


2. Sliding Window with Character Array (for string version):
Logic:
- Similar approach but for strings with character constraints
- Use fixed-size array for ASCII characters
- More memory efficient for character-based problems

Code:
function longestSubstringKDistinct(s, k) {
    const charCount = new Array(256).fill(0);
    let left = 0, maxLength = 0, distinctCount = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (charCount[s.charCodeAt(right)] === 0) {
            distinctCount++;
        }
        charCount[s.charCodeAt(right)]++;
        
        while (distinctCount > k) {
            charCount[s.charCodeAt(left)]--;
            if (charCount[s.charCodeAt(left)] === 0) {
                distinctCount--;
            }
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
Time: O(n), Space: O(1) for fixed character set


3. Recursive Approach with Memoization:
Logic:
- Divide problem into subproblems recursively
- Use memoization to avoid recalculation
- Less efficient than sliding window but demonstrates recursive thinking
- Not practical for this problem

Code:
function longestSubarrayRecursive(nums, k, memo = new Map()) {
    function helper(start, end, distinctSet) {
        if (start > end) return 0;
        
        const key = `${start}-${end}-${Array.from(distinctSet).sort().join(',')}`;
        if (memo.has(key)) return memo.get(key);
        
        let maxLen = 0;
        const newSet = new Set(distinctSet);
        newSet.add(nums[start]);
        
        if (newSet.size <= k) {
            maxLen = Math.max(
                end - start + 1,
                helper(start + 1, end, newSet)
            );
        }
        
        memo.set(key, maxLen);
        return maxLen;
    }
    
    let maxLength = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            maxLength = Math.max(maxLength, helper(i, j, new Set()));
        }
    }
    
    return maxLength;
}
Time: O(n² * 2^k), Space: O(n * k)


Pattern Recognition:
- Variable-size sliding window → two pointers with expansion and contraction
- At most K constraint → use frequency tracking with size limit
- Longest valid window → maximize window size while maintaining validity
- Similar to "Longest Substring with At Most K Distinct Characters"


Method Comparison:
1. Sliding Window (Map): O(n) time, O(k) space, optimal and flexible
2. Sliding Window (Array): O(n) time, O(maxVal) space, efficient for small ranges
3. Character Array: O(n) time, O(1) space, specialized for strings
4. Recursive: O(n² * 2^k) time, O(n*k) space, educational but impractical
5. Brute Force: O(n²) time, O(k) space, simple but inefficient


Pitfalls:
- Not properly removing elements from frequency map when count becomes 0
- Forgetting to update distinct count when using array-based frequency tracking
- Off-by-one errors in window size calculation
- Not handling edge case where k ≥ total distinct elements
- Memory issues when using array frequency for large element ranges


Key Insights:
- Sliding window naturally maintains the "at most K" constraint
- Frequency map allows efficient addition/removal of elements
- Each element contributes to exactly one contiguous range of windows
- Greedy approach: always maximize current window before moving


Real-world Applications:
- Text analysis: longest text segment with limited vocabulary
- Data stream processing: longest sequence with bounded categories
- Network monitoring: longest time period with limited connection types
- Inventory management: longest period tracking limited product types
- Log analysis: longest session with bounded event types


Algorithm Variants:
1. Exactly K distinct elements (requires different sliding window logic)
2. At most K distinct characters in string
3. Longest subarray with sum constraints and distinct element constraints
4. Count of subarrays with at most K distinct elements
5. Shortest subarray with at least K distinct elements


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
