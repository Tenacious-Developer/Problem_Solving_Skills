/*
============================================
REVERSE ARRAY
============================================

Problem Statement:
Given an array, reverse the order of elements. First element becomes last, last becomes first.

Example:
Input: [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]

Constraints:
- Array length: 0 to 10^6
- Elements can be any type (numbers, strings, objects)
- Handle empty array case
- Decide if modification in-place or new array needed

Edge Cases:
- Empty array [] → return []
- Single element [5] → return [5] (no change)
- Two elements [1, 2] → return [2, 1]
- Even length [1,2,3,4] → [4,3,2,1]
- Odd length [1,2,3,4,5] → [5,4,3,2,1]

Brute Force Logic:
- Create new array of same size
- Copy elements from original array in reverse order
- Return new array (preserves original)

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(n) - new array created

Bottlenecks:
- Extra space usage when in-place reversal possible
- Two loops (copy to temp, copy back) when one suffices

Optimized Logic (In-place Two Pointers):
- Use two pointers: left (start) and right (end)
- Swap elements at left and right positions
- Move pointers toward center until they meet
- Pattern: Two pointers with swapping

Pseudo Code:
function reverseArray(arr):
    if arr.length <= 1: return arr
    left = 0
    right = arr.length - 1
    while left < right:
        swap arr[left] and arr[right]
        left++
        right--
    return arr

Time and Space Complexity (Optimized):
- Time: O(n) - single pass, swap n/2 elements
- Space: O(1) - only pointer variables needed

Alternate Approach (Built-in Method):
- Use JavaScript's arr.reverse() method
- Modifies original array in-place
- Time: O(n), Space: O(1)
*/

function reverseArray(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    // Swap elements from both ends moving toward center
    while (left < right) {
        // Swap elements at left and right positions
        [arr[left], arr[right]] = [arr[right], arr[left]];
        
        // Move pointers toward center
        left++;
        right--;
    }
    
    return arr;
}

// Alternative: Non-destructive reverse (creates new array)
function reverseArrayNonDestructive(arr) {
    if (arr.length <= 1) {
        return [...arr]; // Return copy for consistency
    }
    
    const reversed = [];
    
    // Copy elements in reverse order
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    
    return reversed;
}

// Using built-in method (modifies original)
function reverseArrayBuiltIn(arr) {
    return arr.reverse();
}

// Using built-in method (preserves original)
function reverseArrayBuiltInSafe(arr) {
    return [...arr].reverse();
}

/*
Pattern Recognition:
- In-place array manipulation → two pointers technique
- Need to preserve original → create new array or clone first
- Swapping elements → use temp variable or destructuring

Method Comparison:
1. Two Pointers: O(n) time, O(1) space, in-place
2. New Array Loop: O(n) time, O(n) space, preserves original  
3. Built-in reverse(): O(n) time, O(1) space, in-place
4. Clone + reverse(): O(n) time, O(n) space, preserves original

Test Cases:
reverseArray([1, 2, 3, 4, 5]) // [5, 4, 3, 2, 1]
reverseArray([1]) // [1]
reverseArray([]) // []
reverseArray([1, 2]) // [2, 1]
reverseArray(['a', 'b', 'c']) // ['c', 'b', 'a']

Pitfalls:
- Forgetting to handle empty or single element arrays
- Off-by-one errors in loop conditions (left < right, not left <= right)
- Not stopping when pointers meet (would reverse back to original)
- Modifying original array when preservation is needed
- Using wrong loop bounds in manual approach

Key Insights:
- Two pointers pattern is optimal for in-place array reversal
- Always clarify if original array should be preserved
- Built-in reverse() is clean but modifies original
- For interview: implement manual two-pointer approach to show algorithm knowledge

Performance Notes:
- All methods are O(n) time - cannot be improved
- Space complexity choice depends on requirements
- Built-in methods are highly optimized but less educational

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
