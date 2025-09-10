/*
============================================
FIRST POSITIVE NUMBER IN EVERY WINDOW OF SIZE K
============================================


Problem Statement:
Given an integer array nums and a positive integer k, 
find the first positive integer for each and every window (contiguous subarray) 
of size k.

If a window does not contain any positive integer, return 0 for that window.
Return an array containing the first positive number for each window.


Example:
Input: nums = [8, -2, -3, 6, -1], k = 2
Output: [8, 0, 6, 6]
Explanation: First positive integer for each window of size 2
- [8, -2] → 8
- [-2, -3] → 0 (no positive number)
- [-3, 6] → 6
- [6, -1] → 6

Input: nums = [-12, 1, 7, -8, 15, -30, -16, 28], k = 3
Output: [1, 1, 7, 15, 15, 28]
Explanation: First positive integer for each window of size 3
- [-12, 1, 7] → 1
- [1, 7, -8] → 1
- [7, -8, 15] → 7
- [-8, 15, -30] → 15
- [15, -30, -16] → 15
- [-30, -16, 28] → 28


Constraints:
- 1 ≤ nums.length ≤ 10^5
- -10^4 ≤ nums[i] ≤ 10^4
- 1 ≤ k ≤ nums.length
- nums[i] can be negative, zero, or positive


Edge Cases:
- All positive numbers → each window returns first element of that window
- All negative numbers → all windows return 0
- k = 1 → return array of positive numbers (0 for negatives/zeros)
- k = nums.length → return first positive number in entire array
- Mixed positive and negative → sliding window tracks first positive efficiently


Brute Force Logic:
- For each starting position i from 0 to n-k
- Examine all k elements in window [i, i+k-1]
- Find first positive number in current window
- If no positive number found, add 0 to result
- Continue for all possible windows


Brute Force Code:
function firstPositiveInWindowBrute(nums, k) {
    const result = [];
    const n = nums.length;
    
    for (let i = 0; i <= n - k; i++) {
        let found = false;
        
        for (let j = i; j < i + k; j++) {
            if (nums[j] > 0) {
                result.push(nums[j]);
                found = true;
                break;
            }
        }
        
        if (!found) {
            result.push(0);
        }
    }
    
    return result;
}


Time and Space Complexity (Brute Force):
- Time: O(n * k) - for each of n-k+1 windows, check k elements
- Space: O(1) - excluding result array, only using loop variables


Bottlenecks:
- Redundant scanning of overlapping elements between consecutive windows
- Each window restart search from beginning
- No memory of previous window's positive elements


Optimized Logic Hints:
- Use sliding window with deque to track indices of positive numbers
- Maintain deque of indices where elements are positive
- Remove indices that are outside current window
- First element in deque gives index of first positive number


Optimized Logic (Sliding Window with Deque):
- Use deque to store indices of positive numbers in current window
- Process first k elements and add positive indices to deque
- For remaining elements (sliding the window):
  - Add result based on front of deque (first positive index)
  - Remove indices that are now outside window bounds
  - Add current index to deque if current element is positive
- Handle last window separately


Pseudo Code:
function firstPositiveInWindow(nums, k):
    deque = []
    result = []
    n = nums.length
    
    // Process first window
    for i from 0 to k-1:
        if nums[i] > 0:
            deque.push(i)
    
    // Process remaining windows
    for i from k to n-1:
        // Add result for previous window
        if deque.length > 0:
            result.push(nums[deque[0]])
        else:
            result.push(0)
        
        // Remove indices outside current window
        while deque.length > 0 and deque[0] <= i-k:
            deque.shift()
        
        // Add current index if positive
        if nums[i] > 0:
            deque.push(i)
    
    // Handle last window
    if deque.length > 0:
        result.push(nums[deque[0]])
    else:
        result.push(0)
    
    return result


*/


//Optimized Code:
function firstPositiveInWindow(nums, k) {
    const deque = [];
    const result = [];
    const n = nums.length;
    
    // Process first k elements
    for (let i = 0; i < k; i++) {
        if (nums[i] > 0) {
            deque.push(i);
        }
    }
    
    // Process remaining elements
    for (let i = k; i < n; i++) {
        // Add result for previous window
        if (deque.length > 0) {
            result.push(nums[deque[0]]);
        } else {
            result.push(0);
        }
        
        // Remove indices that are outside current window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Add current index if element is positive
        if (nums[i] > 0) {
            deque.push(i);
        }
    }
    
    // Add result for last window
    if (deque.length > 0) {
        result.push(nums[deque[0]]);
    } else {
        result.push(0);
    }
    
    return result;
}


// Test Cases:
firstPositiveInWindow([8, -2, -3, 6, -1], 2) // [8, 0, 6, 6]
firstPositiveInWindow([-12, 1, 7, -8, 15, -30, -16, 28], 3) // [1, 1, 7, 15, 15, 28]
firstPositiveInWindow([1, 2, 3, 4], 2) // [1, 2, 3]
firstPositiveInWindow([-1, -2, -3, -4], 2) // [0, 0, 0]
firstPositiveInWindow([5], 1) // [5]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - each element enters and leaves deque at most once
- Space: O(k) - deque can store at most k indices


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Index Tracking Approach:
Logic:
- Keep track of index of first positive number in current window
- When window slides, update the index pointer
- Skip over non-positive elements and out-of-window indices
- O(1) extra space but may need more careful index management

Code:
function firstPositiveIndexTracking(nums, k) {
    const result = [];
    const n = nums.length;
    let firstPosIdx = 0;
    
    for (let i = k - 1; i < n; i++) {
        // Skip elements that are out of window or not positive
        while (firstPosIdx <= i - k || (firstPosIdx < n && nums[firstPosIdx] <= 0)) {
            firstPosIdx++;
        }
        
        // Check if valid positive element found
        if (firstPosIdx < n && nums[firstPosIdx] > 0 && firstPosIdx >= i - k + 1) {
            result.push(nums[firstPosIdx]);
        } else {
            result.push(0);
        }
    }
    
    return result;
}
Time: O(n), Space: O(1)


2. Queue-based Sliding Window:
Logic:
- Use queue instead of deque for simpler implementation
- Store indices of positive elements
- Remove front elements when they go out of window
- Similar to deque approach but with different data structure

Code:
function firstPositiveQueue(nums, k) {
    const queue = [];
    const result = [];
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        // Remove elements outside current window
        while (queue.length > 0 && queue[0] <= i - k) {
            queue.shift();
        }
        
        // Add current element if positive
        if (nums[i] > 0) {
            queue.push(i);
        }
        
        // Add result for current window (if window is complete)
        if (i >= k - 1) {
            if (queue.length > 0) {
                result.push(nums[queue[0]]);
            } else {
                result.push(0);
            }
        }
    }
    
    return result;
}
Time: O(n), Space: O(k)


3. Hash Set with Window Scanning:
Logic:
- For each window, use set to track positive numbers
- Find minimum index among positive numbers in current window
- Less efficient but demonstrates alternative approach
- Not optimal due to repeated set operations

Code:
function firstPositiveHashSet(nums, k) {
    const result = [];
    const n = nums.length;
    
    for (let i = 0; i <= n - k; i++) {
        let firstPos = null;
        
        for (let j = i; j < i + k; j++) {
            if (nums[j] > 0) {
                firstPos = nums[j];
                break;
            }
        }
        
        result.push(firstPos || 0);
    }
    
    return result;
}
Time: O(n * k), Space: O(1)


Pattern Recognition:
- Fixed-size sliding window with condition → deque for efficient tracking
- First element with property → maintain ordered indices in deque
- Window boundary management → remove out-of-bounds indices
- Similar to "First Negative Number" but with opposite condition


Method Comparison:
1. Deque Sliding Window: O(n) time, O(k) space, optimal and clean
2. Index Tracking: O(n) time, O(1) space, more complex logic
3. Queue-based: O(n) time, O(k) space, similar to deque
4. Hash Set: O(n*k) time, O(1) space, inefficient
5. Brute Force: O(n*k) time, O(1) space, simple but slow


Pitfalls:
- Forgetting to handle windows with no positive numbers (return 0)
- Off-by-one errors in window boundary calculations
- Not properly removing out-of-window indices from deque
- Confusing index vs value when storing in deque
- Not handling edge cases like k=1 or all negative numbers


Key Insights:
- Deque maintains indices in window order, front gives first positive
- Each element enters and leaves deque exactly once → O(n) amortized
- Window sliding requires careful boundary management
- Problem is mirror of "First Negative Number" with condition flipped


Real-world Applications:
- Financial data: first profitable transaction in sliding time windows
- Sensor monitoring: first positive reading in measurement windows  
- Quality control: first passing test in batch windows
- Performance metrics: first improvement in sliding periods
- Market analysis: first gain in trading windows


Algorithm Variants:
1. First negative number in every window (opposite condition)
2. Last positive number in every window (use deque differently)
3. Count of positive numbers in every window (sliding window counting)
4. Maximum positive number in every window (sliding window maximum)
5. All positive numbers in every window (collect all, not just first)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
