/*
============================================
SORT ARRAY BY PARITY
============================================

Problem Statement:
Given an array of integers, rearrange it so that all even numbers appear before odd numbers. The relative order within each parity group doesn't need to be preserved unless specifically mentioned.

Example:
Input: [3, 1, 2, 4]
Output: [2, 4, 3, 1] (or any valid arrangement like [4, 2, 1, 3])

Constraints:
- Array length: 1 to 5000
- Elements are non-negative integers 0 to 5000
- Modify array in-place with O(1) extra space
- Any valid arrangement is acceptable

Edge Cases:
- All even [2, 4, 6, 8] → [2, 4, 6, 8] (no change needed)
- All odd [1, 3, 5, 7] → [1, 3, 5, 7] (no change needed)
- Single element [5] → [5] (no change)
- Mixed [1, 2, 3, 4] → [2, 4, 1, 3] (or other valid arrangements)
- Contains zero [0, 1, 2, 3] → [0, 2, 1, 3] (zero is even)

Brute Force Logic:
- Create two separate arrays for even and odd numbers
- Traverse original array and populate both arrays
- Concatenate even array with odd array
- Copy back to original array

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(n) - two temporary arrays

Bottlenecks:
- Uses extra space when in-place modification required
- Multiple array operations (create, populate, merge)
- Violates space constraint

Optimized Logic (Two Pointers):
- Use left pointer starting from beginning
- Use right pointer starting from end
- Move left right while element is even (correct position)
- Move right left while element is odd (correct position)
- When both stop (left=odd, right=even), swap and continue
- Pattern: Two pointers with condition-based movement

Pseudo Code:
function sortArrayByParity(nums):
    left = 0, right = nums.length - 1
    
    while left < right:
        // Move left to first odd number
        while left < right AND nums[left] % 2 == 0:
            left++
        
        // Move right to first even number  
        while right > left AND nums[right] % 2 == 1:
            right--
        
        // If both stopped, swap odd on left with even on right
        if left < right:
            swap(nums[left], nums[right])
            left++
            right--

Time and Space Complexity (Optimized):
- Time: O(n) - each element visited at most once
- Space: O(1) - only pointer variables

Alternate Approach (Partition-style):
- Use write pointer for even numbers
- Scan array, when even found, swap with write position
- Similar to quicksort partition logic
- Time: O(n), Space: O(1)
*/

function sortArrayByParity(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        // Move left pointer right while current element is even
        while (left < right && nums[left] % 2 === 0) {
            left++;
        }
        
        // Move right pointer left while current element is odd
        while (right > left && nums[right] % 2 === 1) {
            right--;
        }
        
        // If both pointers stopped, we have odd on left and even on right
        if (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    
    return nums;
}

// Alternative: Partition-style approach (stable for evens)
function sortArrayByParityPartition(nums) {
    let writeIndex = 0; // Position where next even should go
    
    // Move all even numbers to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            [nums[writeIndex], nums[i]] = [nums[i], nums[writeIndex]];
            writeIndex++;
        }
    }
    
    return nums;
}

// Alternative: Two-pass approach (stable)
function sortArrayByParityStable(nums) {
    const result = [];
    
    // First pass: add all even numbers
    for (const num of nums) {
        if (num % 2 === 0) {
            result.push(num);
        }
    }
    
    // Second pass: add all odd numbers
    for (const num of nums) {
        if (num % 2 === 1) {
            result.push(num);
        }
    }
    
    // Copy back to original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}

// More efficient: Insertion-style approach (your concept in cleaner form)
function sortArrayByParityInsertion(nums) {
    let evenCount = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            // Remove current even element
            const evenNum = nums[i];
            
            // Shift all elements from evenCount to i-1 one position right
            for (let j = i; j > evenCount; j--) {
                nums[j] = nums[j - 1];
            }
            
            // Insert even number at correct position
            nums[evenCount] = evenNum;
            evenCount++;
        }
    }
    
    return nums;
}

// Alternative: Using built-in sort (less efficient)
function sortArrayByParitySort(nums) {
    return nums.sort((a, b) => (a % 2) - (b % 2));
}

// Alternative: Filter approach (creates new array)
function sortArrayByParityFilter(nums) {
    const evens = nums.filter(num => num % 2 === 0);
    const odds = nums.filter(num => num % 2 === 1);
    return [...evens, ...odds];
}

/*
Pattern Recognition:
- Segregate by binary condition → two pointers or partition approach
- Even/odd classification → modulo operation (n % 2)
- In-place rearrangement → Dutch National Flag pattern
- Similar to move negatives, move zeros problems

Method Comparison:
1. Two Pointers: O(n) time, O(1) space, unstable but optimal
2. Partition Style: O(n) time, O(1) space, semi-stable
3. Two-Pass: O(n) time, O(n) space, stable but uses extra space
4. Sort: O(n log n) time, O(1) space, stable but inefficient
5. Filter: O(n) time, O(n) space, stable but violates constraint

Test Cases:
sortArrayByParity([3, 1, 2, 4]) // [2, 4, 3, 1] or [4, 2, 1, 3]
sortArrayByParity([0]) // [0]
sortArrayByParity([1, 2, 3, 4, 5, 6]) // [2, 4, 6, 1, 3, 5]
sortArrayByParity([2, 4, 6, 8]) // [2, 4, 6, 8] (all even)
sortArrayByParity([1, 3, 5, 7]) // [1, 3, 5, 7] (all odd)

Pitfalls:
- Not handling all even or all odd arrays correctly
- Infinite loops when pointer conditions are wrong
- Not checking bounds properly (left < right conditions)
- Forgetting that 0 is even (0 % 2 === 0)
- Assuming relative order must be preserved when not required

Key Insights:
- Two pointers approach is most efficient for basic parity segregation
- Zero is classified as even (0 % 2 === 0)
- Problem allows any valid arrangement, not specific order
- Similar pattern to Dutch National Flag algorithm

Real-world Applications:
- Data preprocessing (separate valid/invalid records)
- Task scheduling (high/low priority)
- Memory management (active/inactive objects)
- Quality control (pass/fail items)
- Database indexing (indexed/non-indexed fields)

Algorithm Variants:
1. Sort Array by Parity II (specific positions for even/odd)
2. Maintain relative order within parity groups (stable version)
3. Three-way partitioning (negative, zero, positive)
4. Custom parity conditions (divisible by k)

Stability Analysis:
- Two Pointers: **Unstable** ❌ - swapping can change relative order
- Partition Style: **Semi-stable** ⚠️ - preserves even order, not odd order
- Two-Pass: **Stable** ✅ - preserves relative order within each group
- Filter: **Stable** ✅ - maintains original order within groups

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
