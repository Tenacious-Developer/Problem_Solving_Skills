/*
============================================
MERGE TWO SORTED ARRAYS
============================================

Problem Statement:
Given two sorted arrays, merge them into a new sorted array. Maintain the sorted order in the result.

Example:
Input: arr1 = [1, 3, 5, 7], arr2 = [2, 4, 6, 8]
Output: [1, 2, 3, 4, 5, 6, 7, 8]

Constraints:
- Both arrays are sorted in non-decreasing order
- Array lengths: 0 to 10^6 each
- Elements can be integers (positive/negative)
- Handle empty arrays

Edge Cases:
- One or both arrays empty: [], [1,2,3] → [1,2,3]
- Arrays of different lengths: [1,2], [3,4,5,6] → [1,2,3,4,5,6]
- All elements in arr1 < all elements in arr2: [1,2], [5,6] → [1,2,5,6]
- All elements in arr2 < all elements in arr1: [5,6], [1,2] → [1,2,5,6]
- Duplicate elements: [1,3,5], [1,2,5] → [1,1,2,3,5,5]

Brute Force Logic:
- Concatenate both arrays into one
- Sort the combined array
- Return sorted result

Time and Space Complexity (Brute Force):
- Time: O((n+m) log(n+m)) - sorting dominates
- Space: O(n+m) - new combined array

Bottlenecks:
- Ignores the fact that input arrays are already sorted
- Sorting combined array is unnecessary work
- Can't take advantage of sorted property

Optimized Logic (Two Pointers):
- Use two pointers, one for each array
- Compare elements at current positions
- Add smaller element to result, advance its pointer
- Continue until one array is exhausted
- Add remaining elements from the other array
- Pattern: Two pointers with comparison-based merging

Pseudo Code:
function mergeSortedArrays(arr1, arr2):
    result = []
    i = 0, j = 0
    
    while i < arr1.length AND j < arr2.length:
        if arr1[i] <= arr2[j]:
            result.push(arr1[i])
            i++
        else:
            result.push(arr2[j])
            j++
    
    // Add remaining elements
    while i < arr1.length:
        result.push(arr1[i])
        i++
    
    while j < arr2.length:
        result.push(arr2[j])
        j++
    
    return result

Time and Space Complexity (Optimized):
- Time: O(n + m) - single pass through both arrays
- Space: O(n + m) - result array storage

Alternate Approach (In-place merge):
- If modifying input arrays is allowed
- Merge into the larger array or first array
- More complex pointer management
- Time: O(n + m), Space: O(1)
*/

function mergeSortedArrays(arr1, arr2) {
    // Handle edge cases
    if (!arr1.length) return [...arr2];
    if (!arr2.length) return [...arr1];
    
    const result = [];
    let i = 0; // Pointer for arr1
    let j = 0; // Pointer for arr2
    
    // Compare elements and merge while both arrays have elements
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    
    // Add remaining elements from arr1 (if any)
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    
    // Add remaining elements from arr2 (if any)
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    
    return result;
}

// Alternative: Brute force approach (for comparison)
function mergeSortedArraysBrute(arr1, arr2) {
    const combined = [...arr1, ...arr2];
    return combined.sort((a, b) => a - b);
}

// Alternative: More concise version using array methods
function mergeSortedArraysConcise(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    // Main merging loop
    while (i < arr1.length || j < arr2.length) {
        const val1 = i < arr1.length ? arr1[i] : Infinity;
        const val2 = j < arr2.length ? arr2[j] : Infinity;
        
        if (val1 <= val2) {
            result.push(val1);
            i++;
        } else {
            result.push(val2);
            j++;
        }
    }
    
    return result;
}

/*
Pattern Recognition:
- Two sorted sequences → two pointers technique
- Need to maintain sorted order → comparison-based merging
- Exhausted array handling → add remaining elements
- Similar to merge step in merge sort algorithm

Algorithm Variants:
1. Two Pointers (Optimal): O(n+m) time, O(n+m) space
2. Concat + Sort: O((n+m)log(n+m)) time, O(n+m) space  
3. In-place merge: O(n+m) time, O(1) space (complex)

Test Cases:
mergeSortedArrays([1, 3, 5, 7], [2, 4, 6, 8]) // [1,2,3,4,5,6,7,8]
mergeSortedArrays([], [1, 2, 3]) // [1,2,3]
mergeSortedArrays([1, 2, 3], []) // [1,2,3]
mergeSortedArrays([1, 5, 9], [2, 3, 4, 6, 7, 8]) // [1,2,3,4,5,6,7,8,9]
mergeSortedArrays([1, 1, 2], [1, 3, 3]) // [1,1,1,2,3,3]

Pitfalls:
- Forgetting to handle remaining elements after one array is exhausted
- Not using <= comparison (could miss equal elements)
- Index out of bounds when checking exhausted arrays
- Not handling empty array edge cases
- Using wrong comparison logic (> instead of <=)

Key Insights:
- Two pointers technique is optimal for merging sorted sequences
- Always handle remaining elements after main loop
- This is the core logic used in merge sort's merge step
- For interview: demonstrate understanding of sorted array properties

Real-world Applications:
- Merge sort algorithm implementation
- Database query result merging
- Combining sorted search results
- Timeline/event merging in chronological order

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
