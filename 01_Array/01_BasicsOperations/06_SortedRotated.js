/*
============================================
CHECK IF ARRAY IS SORTED AND ROTATED
============================================

Problem Statement:
Given an array, check if it was originally sorted in non-decreasing order and then rotated some number of positions (including zero rotations). Return true if yes, false otherwise.

Example:
Input: [3, 4, 5, 1, 2]
Output: true
Explanation: Original sorted array [1, 2, 3, 4, 5] rotated clockwise by 3 positions

Input: [3, 4, 6, 1, 2, 5]
Output: false
Explanation: Cannot be formed by rotating any sorted array

Constraints:
- Array length: 1 to 5000
- Elements can be integers with duplicates allowed
- Consider non-decreasing order (arr[i] <= arr[i+1])
- Zero rotation (already sorted) should return true

Edge Cases:
- Already sorted [1, 2, 3, 4] → true (zero rotations)
- Single element [5] → true (trivially sorted and rotated)
- Two elements [2, 1] → true (sorted [1, 2] rotated by 1)
- All equal elements [3, 3, 3] → true
- Reverse sorted [5, 4, 3, 2, 1] → false (cannot be obtained by rotation)
- Multiple breaks in order [1, 3, 2, 4] → false

Brute Force Logic:
- Try all possible rotations of the array
- For each rotation, check if it's sorted in non-decreasing order
- If any rotation is sorted, return true

Time and Space Complexity (Brute Force):
- Time: O(n²) - n rotations, each takes O(n) to check if sorted
- Space: O(n) - space to store rotated array

Bottlenecks:
- Generating all rotations is expensive
- Multiple array copies and sorting checks
- Not leveraging the property of sorted rotated arrays

Optimized Logic (Count Inversions):
- A sorted rotated array has at most one "inversion point"
- Inversion: arr[i] > arr[i+1] (including circular comparison)
- Count such inversions, if <= 1, array is sorted and rotated
- Pattern: Single pass with circular comparison

Pseudo Code:
function isSortedAndRotated(arr):
    if arr.length <= 1: return true
    
    count = 0  // Count of inversions
    n = arr.length
    
    for i from 0 to n-1:
        if arr[i] > arr[(i + 1) % n]:  // Circular comparison
            count++
    
    return count <= 1

Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only counter variable

Alternate Approach (Find Rotation Point):
- Find the minimum element (rotation point)
- Check if elements before and after minimum are sorted
- Check if last element <= first element (circular property)
- Time: O(n), Space: O(1)
*/

function isSortedAndRotated(nums) {
    if (nums.length <= 1) {
        return true;
    }
    
    let count = 0; // Count of inversions (points where order breaks)
    const n = nums.length;
    
    // Check adjacent pairs including circular pair (last, first)
    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) {
            count++;
            
            // Early termination: more than 1 inversion means not sorted and rotated
            if (count > 1) {
                return false;
            }
        }
    }
    
    // At most 1 inversion allowed for sorted and rotated array
    return count <= 1;
}

// Alternative: Find rotation point approach
function isSortedAndRotatedRotationPoint(nums) {
    if (nums.length <= 1) {
        return true;
    }
    
    const n = nums.length;
    
    // Find the minimum element and its index
    let minIndex = 0;
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }
    }
    
    // Check if elements before minIndex are in non-decreasing order
    for (let i = 1; i < minIndex; i++) {
        if (nums[i] < nums[i - 1]) {
            return false;
        }
    }
    
    // Check if elements after minIndex are in non-decreasing order
    for (let i = minIndex + 1; i < n; i++) {
        if (nums[i] < nums[i - 1]) {
            return false;
        }
    }
    
    // For rotation to be valid, last element should be <= first element
    // This ensures the "wrap around" property of rotation
    return nums[n - 1] <= nums[0];
}

// Alternative: Brute force (for educational purposes)
function isSortedAndRotatedBrute(nums) {
    if (nums.length <= 1) {
        return true;
    }
    
    const n = nums.length;
    
    // Try all possible rotations
    for (let rotation = 0; rotation < n; rotation++) {
        let isSorted = true;
        
        // Check if current rotation is sorted
        for (let i = 0; i < n - 1; i++) {
            const currentIndex = (i + rotation) % n;
            const nextIndex = (i + 1 + rotation) % n;
            
            if (nums[currentIndex] > nums[nextIndex]) {
                isSorted = false;
                break;
            }
        }
        
        if (isSorted) {
            return true;
        }
    }
    
    return false;
}

// Helper function to check if array is sorted
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

/*
Pattern Recognition:
- Sorted and rotated array → at most one "break" point in order
- Circular array property → use modulo for wraparound comparison
- Single pass counting → more efficient than generating rotations
- Similar to finding rotation count in sorted rotated array

Method Comparison:
1. Count Inversions: O(n) time, O(1) space, optimal
2. Find Rotation Point: O(n) time, O(1) space, more complex logic
3. Brute Force: O(n²) time, O(1) space, educational only

Test Cases:
isSortedAndRotated([3, 4, 5, 1, 2]) // true
isSortedAndRotated([2, 1, 3, 4]) // false
isSortedAndRotated([1, 2, 3]) // true (zero rotation)
isSortedAndRotated([1]) // true
isSortedAndRotated([1, 1, 1]) // true
isSortedAndRotated([2, 1]) // true
isSortedAndRotated([3, 4, 6, 1, 2, 5]) // false

Pitfalls:
- Forgetting to handle circular comparison (last element with first)
- Using strict inequality when duplicates are allowed
- Not considering zero rotation case (already sorted array)
- Off-by-one errors in modulo calculation
- Early termination logic errors in counting approach

Key Insights:
- A sorted rotated array can have at most one inversion point
- Zero rotations (already sorted) is a valid case
- Circular comparison is crucial: arr[n-1] with arr[0]
- Count inversions approach is most elegant and efficient

Real-world Applications:
- Validating time-series data after rotation/shifting
- Checking if circular buffer maintains sorted order
- Database index validation after rotation operations
- Quality assurance for rotated sorted datasets

Algorithm Variants:
1. Return rotation count instead of boolean
2. Handle strictly increasing vs non-decreasing
3. Find the actual rotation point/index
4. Work with custom comparator functions

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
