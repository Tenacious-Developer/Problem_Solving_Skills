/*
============================================
LEFT ROTATE ARRAY BY 1 POSITION
============================================

Problem Statement:
Given an array, rotate all elements one position to the left. First element becomes last element.

Example:
Input: [1, 2, 3, 4, 5]
Output: [2, 3, 4, 5, 1]

Constraints:
- Array length: 0 to 10^6
- Elements can be any type (numbers, strings, etc.)
- Handle empty array case

Edge Cases:
- Empty array [] → return []
- Single element [5] → return [5] (no change)
- Two elements [1, 2] → return [2, 1]

Brute Force Logic:
- Store first element in temp variable
- Shift all other elements one position left
- Place temp at last position

Time and Space Complexity (Brute Force):
- Time: O(n) - must move n-1 elements
- Space: O(1) - only one temp variable

Bottlenecks:
- Must shift every element, no way to avoid O(n) time
- This is actually optimal for in-place rotation

Optimized Logic:
- Same as brute force - this is the optimal solution
- Alternative: use array methods (shift/push) but creates new array
- Pattern: Single element storage with shifting

Pseudo Code:
function leftRotateByOne(arr):
    if arr.length <= 1: return arr
    temp = arr[0]
    for i from 0 to n-2:
        arr[i] = arr[i+1]
    arr[n-1] = temp
    return arr

Time and Space Complexity:
- Time: O(n) - single pass through array
- Space: O(1) - only temp variable needed

Alternate Approach (Using Array Methods):
- Use arr.push(arr.shift()) - removes first, adds to end
- Creates new array internally, less memory efficient
- Time: O(n), Space: O(n)
*/

function leftRotateByOne(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Store first element
    const temp = arr[0];
    
    // Shift all elements one position left
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }
    
    // Place first element at the end
    arr[arr.length - 1] = temp;
    
    return arr;
}

/*
============================================
RIGHT ROTATE ARRAY BY 1 POSITION  
============================================

Problem Statement:
Given an array, rotate all elements one position to the right. Last element becomes first element.

Example:
Input: [1, 2, 3, 4, 5]
Output: [5, 1, 2, 3, 4]

Constraints:
- Array length: 0 to 10^6
- Elements can be any type
- Handle empty array case

Edge Cases:
- Empty array [] → return []
- Single element [5] → return [5] (no change)
- Two elements [1, 2] → return [2, 1]

Brute Force Logic:
- Store last element in temp variable
- Shift all other elements one position right
- Place temp at first position

Time and Space Complexity:
- Time: O(n) - must move n-1 elements
- Space: O(1) - only one temp variable

Optimized Logic:
- Same as brute force - this is optimal for in-place rotation
- Pattern: Single element storage with shifting (reverse direction)

Pseudo Code:
function rightRotateByOne(arr):
    if arr.length <= 1: return arr
    temp = arr[n-1]
    for i from n-1 down to 1:
        arr[i] = arr[i-1]
    arr[0] = temp
    return arr

Alternate Approach (Using Array Methods):
- Use arr.unshift(arr.pop()) - removes last, adds to front
- Time: O(n), Space: O(n)
*/

function rightRotateByOne(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Store last element
    const temp = arr[arr.length - 1];
    
    // Shift all elements one position right
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    
    // Place last element at the beginning
    arr[0] = temp;
    
    return arr;
}

/*
Pattern Recognition:
- Single position rotation → element storage with shifting
- Left rotation → save first, shift left, place at end
- Right rotation → save last, shift right, place at start
- Both are O(n) time, O(1) space optimal

Test Cases:
// Left Rotation
leftRotateByOne([1, 2, 3, 4, 5]) // [2, 3, 4, 5, 1]
leftRotateByOne([1]) // [1]
leftRotateByOne([]) // []

// Right Rotation  
rightRotateByOne([1, 2, 3, 4, 5]) // [5, 1, 2, 3, 4]
rightRotateByOne([1]) // [1] 
rightRotateByOne([]) // []

Pitfalls:
- Forgetting to handle empty or single element arrays
- Off-by-one errors in loop bounds
- Not storing the element that gets overwritten
- Starting loop from wrong index (especially in right rotation)

Key Insights:
- Both rotations are O(n) and cannot be optimized further for single rotation
- For multiple rotations, consider reversal algorithm or modular arithmetic
- Array methods like shift/push are cleaner but less space efficient

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
