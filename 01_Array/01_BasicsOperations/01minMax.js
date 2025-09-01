/*
============================================
FIND MINIMUM AND MAXIMUM IN AN ARRAY
============================================

Problem Statement:
Given an integer array, return both the minimum and maximum values present in it.

Example:
Input: [3, 1, 4, 1, 5, 9, 2, 6]
Output: {min: 1, max: 9}

Constraints:
- Array length: 0 to 10^6
- Elements can be negative/positive integers
- Handle empty array case

Edge Cases:
- Empty array [] → throw error or return null
- Single element [5] → min=5, max=5  
- All equal [7,7,7] → min=7, max=7
- All negative [-5,-2,-10] → min=-10, max=-2

Brute Force Logic:
- Sort the array, take first and last elements
- Simple but unnecessary work

Time and Space Complexity (Brute Force):
- Time: O(n log n) - sorting dominates
- Space: O(1) if in-place sort, O(n) if copying

Bottlenecks:
- Sorting is overkill when we only need min/max
- No need to order all elements

Optimized Logic:
- Single pass through array
- Initialize min=max=arr[0], update on each element
- Pattern: Linear scan with comparison

Pseudo Code:
function getMinMax(arr):
    if arr.length == 0: handle error
    min = arr[0]
    max = arr[0] 
    for i from 1 to n-1:
        if arr[i] > max: max = arr[i]
        else if arr[i] < min: min = arr[i]
    return {min, max}

Time and Space Complexity (Optimized):
- Time: O(n) - single pass
- Space: O(1) - only two variables

Alternate Approach (Pairwise Comparison):
- Process elements in pairs to reduce total comparisons
- Compare pair elements first, then update global min/max
- Reduces comparisons from ~2n to ~1.5n
- Time: O(n), Space: O(1)
*/

function getMinMax(arr) {
    if (arr.length === 0) {
        return null;
    }
    
    let min = arr[0];
    let max = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        if (current > max) {
            max = current;
        } else if (current < min) {
            min = current;
        }
    }
    
    return { min, max };
}

// Test Cases:
console.log(getMinMax([3, 1, 4, 1, 5, 9, 2, 6])); // {min: 1, max: 9}
console.log(getMinMax([7])); // {min: 7, max: 7}
console.log(getMinMax([-5, -2, -10, 0])); // {min: -10, max: 0}
console.log(getMinMax([])); // throws error

/*
Pattern Recognition:
- Need only min/max (not full ordering) → single pass
- Want fewer comparisons → pairwise method
- Need sliding window min/max → use deque

Pitfalls:
- Forgetting to handle empty array
- Not initializing min/max correctly
- Using > and < instead of >= and <= can miss duplicates

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
