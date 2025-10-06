/*
============================================
FIND SECOND LARGEST ELEMENT IN ARRAY
============================================

Problem Statement:
Given an array of integers, find the second largest element. If no second largest exists (all elements are same or array has < 2 elements), return appropriate result.

Example:
Input: [12, 35, 1, 10, 34, 1]
Output: 34
Input: [5, 5, 5, 5]
Output: null (no second largest exists)

Constraints:
- Array length: 0 to 10^6
- Elements can be negative/positive integers
- Handle edge cases: empty array, single element, all duplicates

Edge Cases:
- Empty array [] → return null or throw error
- Single element [5] → return null (no second largest)
- Two elements [3, 7] → return 3 (smaller one)
- All equal [5, 5, 5] → return null (no distinct second largest)
- Two distinct values [3, 7, 3, 7] → return 3

Brute Force Logic:
- Sort array in descending order
- Find first element that's different from the largest
- Simple but involves unnecessary sorting

Time and Space Complexity (Brute Force):
- Time: O(n log n) - sorting overhead
- Space: O(1) if in-place sort, O(n) if copying array

Bottlenecks:
- Sorting entire array when we only need two largest values
- Multiple passes through data

Optimized Logic:
- Single pass through array tracking largest and second largest
- Use two variables: first (largest) and second (second largest)
- Update both variables as we encounter larger elements
- Pattern: Two-variable tracking with conditional updates

Pseudo Code:
function getSecondLargest(arr):
    if arr.length < 2: return null
    first = -Infinity
    second = -Infinity
    for each element in arr:
        if element > first:
            second = first
            first = element
        else if element > second AND element < first:
            second = element
    return second === -Infinity ? null : second

Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only two tracking variables

Alternate Approach (Two Pass):
- First pass: find the maximum element
- Second pass: find maximum element that's less than first maximum
- Slightly more readable but requires two traversals
- Time: O(n), Space: O(1)
*/

function getSecondLargest(arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return null; // No second largest possible
    }
    
    let first = -Infinity;   // Largest element
    let second = -Infinity;  // Second largest element
    
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        
        if (current > first) {
            // Current is larger than largest, update both
            second = first;
            first = current;
        } else if (current > second && current < first) {
            // Current is between largest and second largest
            second = current;
        }
        // If current <= second, no update needed
    }
    
    // If second is still -Infinity, no second largest exists
    return second === -Infinity ? null : second;
}

/*
Pattern Recognition:
- Need second largest (not full ordering) → two-variable tracking
- Want to avoid sorting → single pass with comparisons
- All elements same → handle with -Infinity initialization

Test Cases:
getSecondLargest([12, 35, 1, 10, 34, 1]) // 34
getSecondLargest([5]) // null
getSecondLargest([3, 7]) // 3
getSecondLargest([5, 5, 5, 5]) // null
getSecondLargest([-1, -2, -3, -4]) // -2
getSecondLargest([]) // null

Pitfalls:
- Forgetting to handle arrays with < 2 elements
- Not checking if current < first when updating second
- Using 0 or Number.MIN_VALUE instead of -Infinity (fails with negative arrays)
- Not handling case where all elements are identical
- Updating second with first even when current equals first (creates duplicates)

Key Insight:
The condition "current > second && current < first" ensures we only update 
second with values that are truly between first and second, avoiding duplicates.

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
