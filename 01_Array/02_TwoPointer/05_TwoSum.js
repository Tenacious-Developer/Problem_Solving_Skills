/*
============================================
TWO SUM IN SORTED ARRAY
============================================

Problem Statement:
Given a sorted array of integers and a target sum, find two numbers in the array that add up to the target. Return their indices (1-indexed or 0-indexed based on problem variant).

Example:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1] (0-indexed) or [1, 2] (1-indexed)
Explanation: nums[0] + nums[1] = 2 + 7 = 9

Constraints:
- Array is sorted in non-decreasing order
- Array length: 2 to 10^4
- Each input has exactly one solution
- Cannot use the same element twice
- Return indices, not the actual values

Edge Cases:
- Two elements [1, 2], target = 3 → [0, 1]
- Negative numbers [-1, 0, 1, 2], target = 1 → [0, 3] (-1 + 2 = 1)
- Large array but solution at ends [1, 2, 3, ..., 99, 100], target = 101 → [0, 99]
- Solution in middle of array

Brute Force Logic:
- Use nested loops to check all pairs
- For each element, check if any element after it sums to target
- Return indices when found

Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops check all pairs
- Space: O(1) - only index variables

Bottlenecks:
- Not utilizing the sorted property of array
- Checking unnecessary pairs
- No early termination based on sorted order

Optimized Logic (Two Pointers):
- Use two pointers: left at start, right at end
- Calculate sum = arr[left] + arr[right]
- If sum == target → found the pair
- If sum < target → need larger sum, move left pointer right
- If sum > target → need smaller sum, move right pointer left
- Pattern: Two pointers with comparison-based movement

Pseudo Code:
function twoSumSorted(nums, target):
    left = 0
    right = nums.length - 1
    
    while left < right:
        sum = nums[left] + nums[right]
        
        if sum == target:
            return [left, right]  // or [left+1, right+1] for 1-indexed
        else if sum < target:
            left++  // Need larger sum
        else:
            right-- // Need smaller sum
    
    return [-1, -1]  // No solution found

Time and Space Complexity (Optimized):
- Time: O(n) - single pass with two pointers
- Space: O(1) - only pointer variables

Alternate Approach (Binary Search):
- For each element, use binary search to find complement
- Less efficient than two pointers for this specific problem
- Time: O(n log n), Space: O(1)
*/

function twoSumSorted(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right]; // 0-indexed
            // return [left + 1, right + 1]; // for 1-indexed
        } else if (sum < target) {
            // Current sum is too small, need larger numbers
            left++;
        } else {
            // Current sum is too large, need smaller numbers
            right--;
        }
    }
    
    // No solution found (shouldn't happen if solution guaranteed)
    return [-1, -1];
}

// Alternative: Brute force approach (for comparison)
function twoSumSortedBrute(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
            // Early termination: if current sum > target, 
            // all further elements will also exceed target
            if (nums[i] + nums[j] > target) {
                break;
            }
        }
    }
    return [-1, -1];
}

// Alternative: Binary search approach
function twoSumSortedBinarySearch(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        const complement = target - nums[i];
        
        // Binary search for complement in remaining array
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === complement) {
                return [i, mid];
            } else if (nums[mid] < complement) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return [-1, -1];
}

// Version that returns 1-indexed results (common in some problems)
function twoSumSortedOneIndexed(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // Convert to 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];
}

/*
Pattern Recognition:
- Sorted array + pair sum → two pointers technique
- Need to find complement → binary search or hash map
- Single solution guaranteed → can return immediately when found
- Cannot reuse elements → different indices required

Algorithm Comparison:
1. Two Pointers: O(n) time, O(1) space - OPTIMAL for sorted arrays
2. Binary Search: O(n log n) time, O(1) space - overkill for this problem
3. Brute Force: O(n²) time, O(1) space - doesn't use sorted property
4. Hash Map: O(n) time, O(n) space - good for unsorted arrays

Test Cases:
twoSumSorted([2, 7, 11, 15], 9) // [0, 1]
twoSumSorted([2, 3, 4], 6) // [0, 2]
twoSumSorted([-1, 0], -1) // [0, 1]
twoSumSorted([1, 2, 3, 4, 4, 9, 56, 90], 8) // [2, 4] (3 + 4 = 8)

Pitfalls:
- Not utilizing the sorted array property (using brute force)
- Confusing 0-indexed vs 1-indexed return format
- Not handling the case where left >= right (no solution)
- Moving pointers in wrong direction based on sum comparison
- Forgetting that we cannot use same element twice

Key Insights:
- Two pointers technique is perfect for sorted array problems
- Sorted property allows us to make smart decisions about pointer movement
- Much more efficient than hash map approach for sorted arrays
- The constraint "exactly one solution exists" simplifies the problem

Why Two Pointers Works:
- If sum < target: left element is too small, so we need to try larger left elements
- If sum > target: right element is too large, so we need to try smaller right elements
- This systematically eliminates impossible combinations

Real-world Applications:
- Database query optimization with sorted indices
- Financial applications (finding pairs of transactions)
- Resource allocation problems
- Matching algorithms in sorted datasets

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
