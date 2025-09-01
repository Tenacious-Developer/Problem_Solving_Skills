/*
============================================
ROTATE ARRAY BY K POSITIONS - LEFT
============================================

Problem Statement:
Given an array and integer k, rotate the array k positions to the left. Elements that go past the beginning wrap around to the end.

Example:
Input: [1, 2, 3, 4, 5], k = 2
Output: [3, 4, 5, 1, 2]

Constraints:
- Array length: 0 to 10^6
- k can be 0 to n or larger (handle with modulo)
- Elements can be any type
- Handle edge cases: empty array, k = 0, k > n

Edge Cases:
- Empty array [] → return []
- k = 0 → return original array
- k = n → return original array (full rotation)
- k > n → use k % n for effective rotations
- Single element [5] → always return [5]

Brute Force Logic:
- Perform k individual left rotations
- Each rotation: save first element, shift all left, place first at end
- Repeat k times

Time and Space Complexity (Brute Force):
- Time: O(k * n) - k rotations, each takes O(n)
- Space: O(1) - only temp variable

Bottlenecks:
- Redundant work when k > n (k % n gives same result)
- Multiple passes through array instead of single rearrangement

Optimized Logic (Reversal Algorithm):
- Reverse first k elements
- Reverse remaining n-k elements  
- Reverse entire array
- Pattern: Three strategic reversals achieve rotation in O(n)

Pseudo Code (Reversal Method):
function leftRotateByK(arr, k):
    if arr.length <= 1: return arr
    k = k % arr.length
    if k == 0: return arr
    
    reverse(arr, 0, k-1)        // Reverse first k elements
    reverse(arr, k, n-1)        // Reverse remaining elements
    reverse(arr, 0, n-1)        // Reverse entire array
    return arr

Time and Space Complexity (Optimized):
- Time: O(n) - three passes through different segments
- Space: O(1) - in-place reversal

Alternate Approach (Slice and Concatenate):
- Split array at position k: arr.slice(k) + arr.slice(0, k)
- Clean and readable but creates new array
- Time: O(n), Space: O(n)
*/

function leftRotateByK(arr, k) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Handle k larger than array length
    k = k % arr.length;
    
    if (k === 0) {
        return arr; // No rotation needed
    }
    
    // Helper function to reverse array segment
    function reverse(start, end) {
        while (start < end) {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    // Reversal algorithm: 3 strategic reversals
    reverse(0, k - 1);           // Reverse first k elements
    reverse(k, arr.length - 1);  // Reverse remaining elements
    reverse(0, arr.length - 1);  // Reverse entire array
    
    return arr;
}

// Alternative: Using array methods (creates new array)
function leftRotateByKSlice(arr, k) {
    if (arr.length <= 1) {
        return arr;
    }
    
    k = k % arr.length;
    
    if (k === 0) {
        return arr;
    }
    
    // Split and concatenate
    return arr.slice(k).concat(arr.slice(0, k));
}

/*
============================================
ROTATE ARRAY BY K POSITIONS - RIGHT
============================================

Problem Statement:
Given an array and integer k, rotate the array k positions to the right. Elements that go past the end wrap around to the beginning.

Example:
Input: [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]

Constraints:
- Same as left rotation
- Right rotation by k = Left rotation by (n - k)

Edge Cases:
- Same as left rotation

Brute Force Logic:
- Perform k individual right rotations
- Each rotation: save last element, shift all right, place last at beginning

Optimized Logic (Reversal Algorithm):
- Reverse entire array
- Reverse first k elements
- Reverse remaining n-k elements
- Pattern: Three reversals in different order than left rotation

Pseudo Code (Reversal Method):
function rightRotateByK(arr, k):
    if arr.length <= 1: return arr
    k = k % arr.length
    if k == 0: return arr
    
    reverse(arr, 0, n-1)        // Reverse entire array
    reverse(arr, 0, k-1)        // Reverse first k elements
    reverse(arr, k, n-1)        // Reverse remaining elements
    return arr

Alternate Approach (Convert to Left Rotation):
- Right rotation by k = Left rotation by (n - k)
- Reuse left rotation function with modified k
*/

function rightRotateByK(arr, k) {
    if (arr.length <= 1) {
        return arr;
    }
    
    k = k % arr.length;
    
    if (k === 0) {
        return arr;
    }
    
    // Helper function to reverse array segment
    function reverse(start, end) {
        while (start < end) {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    // Reversal algorithm for right rotation
    reverse(0, arr.length - 1);  // Reverse entire array
    reverse(0, k - 1);           // Reverse first k elements
    reverse(k, arr.length - 1);  // Reverse remaining elements
    
    return arr;
}

// Alternative: Convert right rotation to left rotation
function rightRotateByKConvert(arr, k) {
    if (arr.length <= 1) {
        return arr;
    }
    
    k = k % arr.length;
    
    // Right rotation by k = Left rotation by (n - k)
    return leftRotateByK(arr, arr.length - k);
}

// Alternative: Using array methods (creates new array)
function rightRotateByKSlice(arr, k) {
    if (arr.length <= 1) {
        return arr;
    }
    
    k = k % arr.length;
    
    if (k === 0) {
        return arr;
    }
    
    // Take last k elements + first n-k elements
    return arr.slice(-k).concat(arr.slice(0, -k));
}

/*
Pattern Recognition:
- Array rotation by k positions → reversal algorithm or slice/concat
- Large k values → use modulo to avoid redundant work
- Right rotation → convert to left rotation or use different reversal order
- In-place requirement → reversal algorithm
- Preserve original → slice/concat methods

Method Comparison:
1. Reversal Algorithm: O(n) time, O(1) space, in-place
2. Slice/Concat: O(n) time, O(n) space, preserves original
3. Multiple single rotations: O(k*n) time, O(1) space, inefficient
4. Convert right↔left: O(n) time, O(1) space, clean logic

Test Cases:
// Left Rotation
leftRotateByK([1, 2, 3, 4, 5], 2) // [3, 4, 5, 1, 2]
leftRotateByK([1, 2, 3], 3) // [1, 2, 3] (full rotation)
leftRotateByK([1], 5) // [1]
leftRotateByK([], 3) // []

// Right Rotation
rightRotateByK([1, 2, 3, 4, 5], 2) // [4, 5, 1, 2, 3]
rightRotateByK([1, 2, 3], 0) // [1, 2, 3]
rightRotateByK([1, 2], 7) // [2, 1] (7 % 2 = 1)

Pitfalls:
- Forgetting to use k % n for large k values
- Off-by-one errors in reverse function bounds
- Not handling k = 0 or empty array cases
- Confusing left vs right rotation direction
- Using slice with wrong indices (slice(-k) vs slice(arr.length - k))

Key Insights:
- Reversal algorithm is optimal for in-place rotation
- Right rotation by k = Left rotation by (n - k)
- Always normalize k with modulo to avoid redundant work
- For interviews: implement reversal algorithm to show algorithmic understanding

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
