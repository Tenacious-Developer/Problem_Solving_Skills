/*
============================================
INTERSECTION OF TWO SORTED ARRAYS
============================================

Problem Statement:
Given two sorted arrays, find their intersection (common elements). Return elements that appear in both arrays. Handle duplicates based on problem variant.

Example:
Input: arr1 = [1, 2, 3, 4, 5], arr2 = [3, 4, 5, 6, 7]
Output: [3, 4, 5]

Input: arr1 = [1, 1, 2, 2], arr2 = [2, 2, 3, 3]
Output: [2, 2] (if duplicates allowed) or [2] (if unique only)

Constraints:
- Both arrays are sorted in non-decreasing order
- Array lengths: 0 to 10^5 each
- Elements can be integers (positive/negative)
- Handle empty arrays and duplicates

Edge Cases:
- One or both arrays empty: [], [1,2,3] → []
- No common elements: [1,2], [3,4] → []
- All elements common: [1,2,3], [1,2,3] → [1,2,3]
- Different sizes: [1,2,3,4,5], [3,4] → [3,4]
- Duplicates: [1,1,2,3], [1,2,2,3] → [1,2,3] or [1,2,2,3] based on variant

Brute Force Logic:
- For each element in first array, search in second array
- If found, add to result and mark as used
- Use nested loops or binary search for lookup

Time and Space Complexity (Brute Force):
- Time: O(n * m) with linear search, O(n * log m) with binary search
- Space: O(1) - not counting result array

Bottlenecks:
- Not utilizing sorted property of both arrays
- Redundant searches in second array
- Complex duplicate handling with marking

Optimized Logic (Two Pointers):
- Use two pointers, one for each array
- Compare elements at current positions
- If equal, add to result and move both pointers
- If arr1[i] < arr2[j], move first pointer
- If arr1[i] > arr2[j], move second pointer
- Pattern: Merge-like traversal with intersection logic

Pseudo Code:
function intersectionSortedArrays(arr1, arr2):
    result = []
    i = 0, j = 0
    
    while i < arr1.length AND j < arr2.length:
        if arr1[i] == arr2[j]:
            result.push(arr1[i])
            i++
            j++
        else if arr1[i] < arr2[j]:
            i++
        else:
            j++
    
    return result

Time and Space Complexity (Optimized):
- Time: O(n + m) - single pass through both arrays
- Space: O(1) - only pointer variables (not counting result)

Alternate Approach (Set-based):
- Convert smaller array to Set for O(1) lookup
- Iterate through larger array and check membership
- Time: O(n + m), Space: O(min(n, m))
*/

function intersectionSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    // Two pointers approach
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] === arr2[j]) {
            // Found common element
            result.push(arr1[i]);
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            // Element in arr1 is smaller, move first pointer
            i++;
        } else {
            // Element in arr2 is smaller, move second pointer
            j++;
        }
    }
    
    return result;
}

// Alternative: Intersection without duplicates
function intersectionSortedArraysUnique(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] === arr2[j]) {
            // Add only if not already added (avoid duplicates)
            if (result.length === 0 || result[result.length - 1] !== arr1[i]) {
                result.push(arr1[i]);
            }
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}

// Alternative: Using Set (good for unsorted or when one array is much smaller)
function intersectionSortedArraysSet(arr1, arr2) {
    // Use smaller array for Set to save space
    const [smaller, larger] = arr1.length <= arr2.length ? [arr1, arr2] : [arr2, arr1];
    const set = new Set(smaller);
    const result = [];
    
    for (const element of larger) {
        if (set.has(element)) {
            result.push(element);
            set.delete(element); // Remove to avoid duplicates
        }
    }
    
    return result.sort((a, b) => a - b); // Maintain sorted order
}

// Alternative: Binary search approach
function intersectionSortedArraysBinarySearch(arr1, arr2) {
    // Use smaller array to search in larger array
    const [smaller, larger] = arr1.length <= arr2.length ? [arr1, arr2] : [arr2, arr1];
    const result = [];
    
    for (let i = 0; i < smaller.length; i++) {
        // Skip duplicates in smaller array
        if (i > 0 && smaller[i] === smaller[i - 1]) {
            continue;
        }
        
        if (binarySearch(larger, smaller[i])) {
            result.push(smaller[i]);
        }
    }
    
    return result;
}

// Helper function for binary search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return true;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}

// LeetCode style: Return intersection with frequency (duplicates matter)
function intersectWithFrequency(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] === arr2[j]) {
            result.push(arr1[i]);
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}


var intersection = function(nums1, nums2) {
    let freqNums1 = {};
    for(let i = 0; i < nums1.length; i++) {
        let element = nums1[i];
        freqNums1[element] = true; // Store existence as a boolean
    }

    let freqNums2 = {};
    for(let i = 0; i < nums2.length; i++) {
        let element = nums2[i];
        if(freqNums1[element]) {
            freqNums2[element] = 1; // Add to freqNums2 only if it exists in freqNums1
        }
    }

    // Convert keys from string to number and return the array of integers
    return Object.keys(freqNums2).map(Number);
};

/*
Pattern Recognition:
- Two sorted sequences + common elements → two pointers technique
- Intersection operation → include only elements present in both
- Maintain sorted order → leverage input sorting property
- Similar to merge but only when elements match

Method Comparison:
1. Two Pointers: O(n+m) time, O(1) space, optimal for sorted arrays
2. Set-based: O(n+m) time, O(min(n,m)) space, good for general case
3. Binary Search: O(n log m) time, O(1) space, when one array much smaller
4. Brute Force: O(n*m) time, O(1) space, inefficient

Problem Variants:
1. Unique elements only (no duplicates in result)
2. With frequency (duplicates allowed based on minimum frequency)
3. Return indices instead of values
4. Multiple arrays intersection

Test Cases:
intersectionSortedArrays([1, 2, 3, 4], [3, 4, 5, 6]) // [3, 4]
intersectionSortedArrays([1, 1, 2, 2], [2, 2, 3, 3]) // [2, 2]
intersectionSortedArrays([], [1, 2, 3]) // []
intersectionSortedArrays([1, 2, 3], [4, 5, 6]) // []
intersectionSortedArrays([1, 2, 3], [1, 2, 3]) // [1, 2, 3]

Pitfalls:
- Not handling empty arrays properly
- Forgetting to advance both pointers when elements match
- Moving wrong pointer based on comparison
- Not handling duplicates correctly (depends on problem variant)
- Using inefficient approaches when sorted property available

Key Insights:
- Two pointers technique is optimal for sorted array intersection
- Result naturally maintains sorted order
- Duplicate handling depends on problem requirements
- For very different array sizes, consider binary search approach

Real-world Applications:
- Database query optimization (JOIN operations)
- Finding common elements in sorted datasets
- Set intersection in data analysis
- Common friends/connections in social networks
- Search result intersection from multiple sources

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
