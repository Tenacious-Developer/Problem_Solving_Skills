/*
============================================
UNION OF TWO SORTED ARRAYS
============================================

Problem Statement:
Given two sorted arrays, find the union of both arrays. Union contains all distinct elements from both arrays in sorted order.

Example:
Input: arr1 = [1, 2, 4, 5, 6], arr2 = [2, 3, 5, 7]
Output: [1, 2, 3, 4, 5, 6, 7]
Explanation: Union contains all unique elements from both arrays

Constraints:
- Both arrays are sorted in non-decreasing order
- Array lengths: 0 to 10^5 each
- Elements can be integers (positive/negative)
- Handle empty arrays and duplicates within same array

Edge Cases:
- One or both arrays empty: [], [1,2,3] → [1,2,3]
- No common elements: [1,2], [3,4] → [1,2,3,4]
- All elements common: [1,2,3], [1,2,3] → [1,2,3]
- Duplicates within arrays: [1,1,2], [2,3,3] → [1,2,3]
- Different sizes: [1], [2,3,4,5] → [1,2,3,4,5]

Brute Force Logic:
- Concatenate both arrays
- Sort the combined array
- Remove duplicates using Set or manual iteration

Time and Space Complexity (Brute Force):
- Time: O((n+m) log(n+m)) - sorting dominates
- Space: O(n+m) - combined array storage

Bottlenecks:
- Ignores sorted property of input arrays
- Sorting is unnecessary when inputs are already sorted
- Set operations or duplicate removal adds overhead

Optimized Logic (Two Pointers):
- Use two pointers, one for each array
- Compare elements at current positions
- Add smaller element to result (avoid duplicates)
- Skip duplicates within same array
- Add remaining elements from non-exhausted array
- Pattern: Merge with duplicate elimination

Pseudo Code:
function unionSortedArrays(arr1, arr2):
    result = []
    i = 0, j = 0
    
    while i < arr1.length AND j < arr2.length:
        if arr1[i] < arr2[j]:
            result.push(arr1[i])
            i++
        else if arr1[i] > arr2[j]:
            result.push(arr2[j])
            j++
        else: // arr1[i] == arr2[j]
            result.push(arr1[i])  // Add once for union
            i++
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

Alternate Approach (Using Set):
- Add all elements from both arrays to Set
- Convert Set back to array and sort if needed
- Simple but may lose input sorted property
- Time: O(n + m), Space: O(n + m)
*/

function unionSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    // Two pointers approach with duplicate handling
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            // Add arr1 element if not already added
            if (result.length === 0 || result[result.length - 1] !== arr1[i]) {
                result.push(arr1[i]);
            }
            i++;
        } else if (arr1[i] > arr2[j]) {
            // Add arr2 element if not already added
            if (result.length === 0 || result[result.length - 1] !== arr2[j]) {
                result.push(arr2[j]);
            }
            j++;
        } else {
            // Both elements are equal, add once
            if (result.length === 0 || result[result.length - 1] !== arr1[i]) {
                result.push(arr1[i]);
            }
            i++;
            j++;
        }
    }
    
    // Add remaining elements from arr1
    while (i < arr1.length) {
        if (result.length === 0 || result[result.length - 1] !== arr1[i]) {
            result.push(arr1[i]);
        }
        i++;
    }
    
    // Add remaining elements from arr2
    while (j < arr2.length) {
        if (result.length === 0 || result[result.length - 1] !== arr2[j]) {
            result.push(arr2[j]);
        }
        j++;
    }
    
    return result;
}

// Alternative: Using Set (simpler but may need sorting)
function unionSortedArraysSet(arr1, arr2) {
    const unionSet = new Set([...arr1, ...arr2]);
    return Array.from(unionSet).sort((a, b) => a - b);
}

// Alternative: Brute force with concat and sort
function unionSortedArraysBrute(arr1, arr2) {
    const combined = [...arr1, ...arr2];
    const sorted = combined.sort((a, b) => a - b);
    
    // Remove duplicates
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i === 0 || sorted[i] !== sorted[i - 1]) {
            result.push(sorted[i]);
        }
    }
    
    return result;
}

// Optimized version with cleaner duplicate handling
function unionSortedArraysClean(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            addToResult(result, arr1[i]);
            i++;
        } else if (arr1[i] > arr2[j]) {
            addToResult(result, arr2[j]);
            j++;
        } else {
            addToResult(result, arr1[i]);
            i++;
            j++;
        }
    }
    
    // Add remaining elements
    while (i < arr1.length) {
        addToResult(result, arr1[i]);
        i++;
    }
    
    while (j < arr2.length) {
        addToResult(result, arr2[j]);
        j++;
    }
    
    return result;
}

// Helper function to add element only if it's not a duplicate
function addToResult(result, element) {
    if (result.length === 0 || result[result.length - 1] !== element) {
        result.push(element);
    }
}

/*
Pattern Recognition:
- Two sorted sequences + distinct elements → two pointers with deduplication
- Union operation → include all unique elements from both sets
- Maintain sorted order → leverage input sorting property
- Similar to merge in merge sort but with duplicate elimination

Method Comparison:
1. Two Pointers: O(n+m) time, O(n+m) space, optimal for sorted arrays
2. Set-based: O(n+m) time, O(n+m) space, simple but may need re-sorting
3. Concat + Sort: O((n+m)log(n+m)) time, doesn't use sorted property
4. Clean version: Same complexity but better code organization

Test Cases:
unionSortedArrays([1, 2, 4, 5, 6], [2, 3, 5, 7]) // [1, 2, 3, 4, 5, 6, 7]
unionSortedArrays([], [1, 2, 3]) // [1, 2, 3]
unionSortedArrays([1, 1, 2, 3], [2, 3, 4, 4]) // [1, 2, 3, 4]
unionSortedArrays([1, 2, 3], [4, 5, 6]) // [1, 2, 3, 4, 5, 6]
unionSortedArrays([1, 3, 5], [1, 3, 5]) // [1, 3, 5]

Pitfalls:
- Not handling duplicates within same array
- Forgetting to add remaining elements after one array is exhausted
- Adding duplicates when elements from both arrays are equal
- Not leveraging sorted property of input arrays
- Index out of bounds when arrays have different lengths

Key Insights:
- Union of sorted arrays maintains sorted order naturally
- Two pointers technique is optimal for sorted array operations
- Duplicate elimination requires checking last added element
- Helper functions improve code readability and maintainability

Real-world Applications:
- Database query result merging (UNION operation)
- Combining sorted search results from multiple sources
- Set operations in data processing pipelines
- Merging configuration files with unique settings

Algorithm Variants:
1. Intersection of sorted arrays (common elements only)
2. Symmetric difference (elements in either but not both)
3. Union with count (how many times each element appears)
4. Union of multiple sorted arrays

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
