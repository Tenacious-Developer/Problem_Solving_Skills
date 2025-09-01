/*
============================================
MOVE ZEROS TO END OF ARRAY
============================================

Problem Statement:
Given an array of integers, move all zeros to the end while maintaining the relative order of non-zero elements. Modify the array in-place.

Example:
Input: [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]

Constraints:
- Array length: 1 to 10^4
- Modify array in-place (no extra space for new array)
- Maintain relative order of non-zero elements
- Minimize total number of operations

Edge Cases:
- No zeros [1, 2, 3, 4] → [1, 2, 3, 4] (no change)
- All zeros [0, 0, 0] → [0, 0, 0] (no change)
- Single element [0] → [0] or [5] → [5]
- Zeros at beginning [0, 0, 1, 2] → [1, 2, 0, 0]
- Zeros at end [1, 2, 0, 0] → [1, 2, 0, 0] (already correct)
- Mixed pattern [1, 0, 2, 0, 3] → [1, 2, 3, 0, 0]

Brute Force Logic:
- Create temporary array
- Copy all non-zero elements first
- Fill remaining positions with zeros
- Copy back to original array

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(n) - temporary array storage

Bottlenecks:
- Uses extra space when in-place modification required
- Multiple array copies (original→temp→original)
- Violates space constraint of the problem

Optimized Logic (Two Pass):
- First pass: move all non-zero elements to front, count them
- Second pass: fill remaining positions with zeros
- Uses single pointer to track position for non-zero elements
- Pattern: Two-pass with write pointer

Pseudo Code:
function moveZeros(nums):
    writeIndex = 0
    
    // First pass: move non-zero elements to front
    for i from 0 to n-1:
        if nums[i] != 0:
            nums[writeIndex] = nums[i]
            writeIndex++
    
    // Second pass: fill remaining with zeros
    for i from writeIndex to n-1:
        nums[i] = 0

Time and Space Complexity (Optimized):
- Time: O(n) - two passes through array
- Space: O(1) - only pointer variables

Alternate Approach (Single Pass with Swap):
- Use two pointers: left (non-zero position) and right (current element)
- When right finds non-zero, swap with left and increment left
- More elegant but involves unnecessary swaps
- Time: O(n), Space: O(1)
*/

function moveZeros(nums) {
    let writeIndex = 0; // Position where next non-zero should go
    
    // First pass: Move all non-zero elements to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    // Second pass: Fill remaining positions with zeros
    for (let i = writeIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    
    return nums; // For testing, though problem usually returns void
}

// Alternative: Single pass with swapping (Two Pointers)
function moveZerosSinglePass(nums) {
    let left = 0; // Points to position for next non-zero element
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            // Swap only if positions are different (optimization)
            if (left !== right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
            left++;
        }
    }
    
    return nums;
}

// Alternative: Using splice and push (less efficient)
function moveZerosSplice(nums) {
    let i = 0;
    while (i < nums.length) {
        if (nums[i] === 0) {
            // Remove zero and add it to end
            const zero = nums.splice(i, 1)[0];
            nums.push(zero);
        } else {
            i++; // Only increment when not removing element
        }
    }
    return nums;
}

// Alternative: Count zeros approach
function moveZerosCount(nums) {
    let zeroCount = 0;
    let writeIndex = 0;
    
    // Move non-zeros and count zeros
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            zeroCount++;
        } else {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    // Fill end with counted zeros
    for (let i = 0; i < zeroCount; i++) {
        nums[nums.length - 1 - i] = 0;
    }
    
    return nums;
}

/*
Pattern Recognition:
- In-place array modification → use write pointer technique
- Maintain relative order → stable partitioning
- Move specific elements to end → two-pass or swap-based approach
- Similar to partition logic in quicksort

Method Comparison:
1. Two Pass: O(n) time, O(1) space, clean and readable
2. Single Pass Swap: O(n) time, O(1) space, slightly more complex
3. Splice/Push: O(n²) time worst case, less efficient
4. Count Zeros: O(n) time, O(1) space, alternative logic

Test Cases:
moveZeros([0, 1, 0, 3, 12]) // [1, 3, 12, 0, 0]
moveZeros([0]) // [0]
moveZeros([0, 0, 1]) // [1, 0, 0]
moveZeros([1, 2, 3]) // [1, 2, 3]
moveZeros([0, 0, 0]) // [0, 0, 0]

Pitfalls:
- Not maintaining relative order of non-zero elements
- Using extra space when in-place modification required
- Forgetting to handle edge cases (all zeros, no zeros)
- Off-by-one errors in second loop bounds
- Using inefficient splice operations in loops
- Not optimizing unnecessary swaps in single-pass approach

Key Insights:
- Two-pass approach is most readable and efficient
- Write pointer technique is common for in-place array modifications
- Problem is essentially stable partitioning (zeros vs non-zeros)
- Single-pass with swap is optimization but adds complexity

Real-world Applications:
- Data cleaning and preprocessing
- Moving invalid/null records to end for batch processing
- Sorting algorithms (partitioning step)
- Memory compaction in garbage collection

Performance Notes:
- Two-pass is optimal for readability and performance
- Single-pass saves one traversal but adds swap logic
- Both are O(n) time and O(1) space as required
- Avoid array methods like splice in loops (O(n²) complexity)

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
