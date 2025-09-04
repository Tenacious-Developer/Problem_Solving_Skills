/*
============================================
MOVE NEGATIVE NUMBERS TO ONE SIDE
============================================

Problem Statement:
Given an array of integers, rearrange the array so that all negative numbers appear on one side (usually left) and all positive numbers on the other side. The relative order within each group may or may not be preserved depending on the approach.

Example:
Input: [-12, 11, -13, -5, 6, -7, 5, -3, -6]
Output: [-12, -13, -5, -7, -3, -6, 11, 6, 5] (negatives first)

Constraints:
- Array length: 1 to 10^4
- Modify array in-place with O(1) extra space
- Handle zeros (typically grouped with positives)
- Preserve relative order if specified in problem variant

Edge Cases:
- All negative [-1, -2, -3] → [-1, -2, -3] (no change)
- All positive [1, 2, 3] → [1, 2, 3] (no change)
- Single element [5] or [-5] → no change
- Contains zeros [0, -1, 2] → typically [0, 2, -1] or [-1, 0, 2]
- Mixed pattern [1, -2, 3, -4, 5] → [-2, -4, 1, 3, 5]

Brute Force Logic:
- Create two separate arrays for negative and positive numbers
- Traverse original array and populate both arrays
- Merge both arrays back into original

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(n) - two temporary arrays

Bottlenecks:
- Uses extra space when in-place modification required
- Multiple array operations (create, populate, merge)
- Violates space constraint

Optimized Logic (Two Pointers - Dutch National Flag):
- Use left pointer starting from beginning
- Use right pointer starting from end
- Move left right while element is negative
- Move right left while element is positive
- When both stop, swap elements and continue
- Pattern: Two pointers with condition-based movement

Pseudo Code:
function moveNegativesToLeft(nums):
    left = 0, right = nums.length - 1
    
    while left < right:
        // Move left pointer to first positive number
        while left < right AND nums[left] < 0:
            left++
        
        // Move right pointer to first negative number
        while right > left AND nums[right] >= 0:
            right--
        
        // If both pointers stopped, swap elements
        if left < right:
            swap(nums[left], nums[right])
            left++
            right--

Time and Space Complexity (Optimized):
- Time: O(n) - each element visited at most once
- Space: O(1) - only pointer variables

Alternate Approach (Partition-style):
- Use single write pointer for negative numbers
- Scan array, when negative found, swap with write position
- Similar to quicksort partition logic
- Time: O(n), Space: O(1)
*/

function moveNegativesToLeft(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        // Move left pointer right while current element is negative
        while (left < right && nums[left] < 0) {
            left++;
        }
        
        // Move right pointer left while current element is positive or zero
        while (right > left && nums[right] >= 0) {
            right--;
        }
        
        // If both pointers have stopped, we found a positive on left 
        // and negative on right, so swap them
        if (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    
    return nums;
}

// Alternative: Partition-style approach (preserves relative order of negatives)
function moveNegativesToLeftPartition(nums) {
    let writeIndex = 0; // Position where next negative should go
    
    // First pass: move all negative numbers to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            [nums[writeIndex], nums[i]] = [nums[i], nums[writeIndex]];
            writeIndex++;
        }
    }
    
    return nums;
}

// Alternative: Move negatives to right side
function moveNegativesToRight(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        // Move left pointer right while current element is positive or zero
        while (left < right && nums[left] >= 0) {
            left++;
        }
        
        // Move right pointer left while current element is negative
        while (right > left && nums[right] < 0) {
            right--;
        }
        
        // Swap negative on left with positive on right
        if (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    
    return nums;
}

// Alternative: Brute force with extra space (for comparison)
function moveNegativesBrute(nums) {
    const negatives = [];
    const positives = [];
    
    // Separate into two arrays
    for (const num of nums) {
        if (num < 0) {
            negatives.push(num);
        } else {
            positives.push(num);
        }
    }
    
    // Merge back into original array
    let index = 0;
    
    // Add negatives first
    for (const neg of negatives) {
        nums[index++] = neg;
    }
    
    // Add positives after
    for (const pos of positives) {
        nums[index++] = pos;
    }
    
    return nums;
}

// Alternative: Preserve relative order (insertion sort style)
function moveNegativesPreserveOrder(nums) {
    for (let i = 1; i < nums.length; i++) {
        // If current element is positive, continue
        if (nums[i] >= 0) {
            continue;
        }
        
        // Current element is negative, shift positive elements right
        const temp = nums[i];
        let j = i - 1;
        
        // Shift all positive numbers to the right
        while (j >= 0 && nums[j] >= 0) {
            nums[j + 1] = nums[j];
            j--;
        }
        
        // Place negative number at correct position
        nums[j + 1] = temp;
    }
    
    return nums;
}

/*
Pattern Recognition:
- Segregate elements by condition → two pointers or partition approach
- In-place rearrangement → Dutch National Flag or quicksort partition style
- Order preservation matters → use insertion sort style or stable partition
- Similar to sorting/partitioning algorithms

Method Comparison:
1. Two Pointers (Dutch Flag): O(n) time, O(1) space, doesn't preserve order
2. Partition Style: O(n) time, O(1) space, preserves negative order
3. Preserve Order: O(n²) time, O(1) space, maintains all relative orders  
4. Brute Force: O(n) time, O(n) space, violates space constraint

Test Cases:
moveNegativesToLeft([-12, 11, -13, -5, 6, -7, 5, -3, -6]) // [-12, -6, -13, -5, -3, -7, 5, 6, 11]
moveNegativesToLeft([1, 2, 3, 4]) // [1, 2, 3, 4] (all positive)
moveNegativesToLeft([-1, -2, -3, -4]) // [-1, -2, -3, -4] (all negative)
moveNegativesToLeft([0, -1, 2, -3]) // [-1, -3, 2, 0] (zero treated as positive)
moveNegativesToLeft([5]) // [5] (single element)

Pitfalls:
- Not handling zero correctly (decide if it's positive or negative)
- Infinite loops when pointer movement conditions are wrong
- Not checking bounds in while loops (left < right conditions)
- Swapping unnecessarily when elements are already in correct positions
- Order preservation requirements not clearly understood

Key Insights:
- Two pointers approach is most efficient for basic segregation
- Dutch National Flag pattern applies perfectly here
- Zero handling needs to be clearly defined (usually treated as positive)
- Order preservation significantly increases complexity

Real-world Applications:
- Data preprocessing and cleaning
- Financial data analysis (profits vs losses)
- Quality control (defective vs good items)
- Database query optimization
- Image processing (positive vs negative values)

Algorithm Variants:
1. Move negatives to right instead of left
2. Preserve relative order within each group
3. Count negatives and positives during rearrangement
4. Handle three categories (negative, zero, positive) - Dutch flag problem

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
