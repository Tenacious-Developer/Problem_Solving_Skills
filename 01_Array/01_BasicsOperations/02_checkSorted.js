/*
============================================
CHECK IF ARRAY IS SORTED
============================================


Problem Statement:
Given an array of integers nums,
check if the array is sorted in non-decreasing order.

Return true if the array is sorted in ascending order (allowing equal consecutive elements),
false otherwise.

Note: Two consecutive equal values are considered to be sorted.


Example:
Input: nums = [1, 2, 3, 4, 5]
Output: true
Explanation: Array is sorted in ascending order

Input: nums = [1, 2, 2, 3, 4]
Output: true
Explanation: Array is sorted (equal consecutive elements are allowed)

Input: nums = [1, 3, 2, 4, 5]
Output: false
Explanation: 3 > 2 violates sorted order


Constraints:
- 1 ≤ nums.length ≤ 10^5
- -10^9 ≤ nums[i] ≤ 10^9
- Array can contain duplicate elements
- Check for non-decreasing order (ascending, allowing equals)


Edge Cases:
- Empty array [] → true (vacuously true)
- Single element [5] → true (trivially sorted)
- Two elements sorted [1, 2] → true
- Two elements unsorted [2, 1] → false
- All equal elements [3, 3, 3] → true
- Descending order [5, 4, 3] → false


Brute Force Logic:
- Compare each element with its next element
- If any element is greater than the next element, return false
- If all comparisons pass (arr[i] <= arr[i+1]), return true
- Iterate through array once


Brute Force Code:
function isSortedBrute(nums) {
    // Handle edge cases
    if (nums.length <= 1) return true;
    
    // Compare each adjacent pair
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            return false;
        }
    }
    
    return true;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(1) - only using loop variable


Bottlenecks:
- This is already optimal for the problem
- Cannot do better than O(n) as we must check all elements
- No significant bottlenecks in this approach


Optimized Logic Hints:
- The brute force approach is already optimal
- Can use built-in array methods for cleaner code
- Can add early return optimization
- Can check for strictly increasing vs non-decreasing


Optimized Logic (Same as Brute Force):
- Single pass through array comparing adjacent elements
- Early return on first violation found
- Time complexity is already optimal at O(n)
- Focus on clean, readable implementation


Pseudo Code:
function isSorted(nums):
    if nums.length <= 1:
        return true
    
    for i from 0 to nums.length - 2:
        if nums[i] > nums[i + 1]:
            return false  // Found violation
    
    return true  // All checks passed


*/


//Optimized Code:
function isSorted(nums) {
    // Handle edge cases
    if (nums.length <= 1) return true;
    
    // Check if each element is less than or equal to next
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            return false;
        }
    }
    
    return true;
}


// Alternative: Using every() method
function isSortedEvery(nums) {
    return nums.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
}


// Alternative: Check for both ascending and descending
function checkSortedDirection(nums) {
    if (nums.length <= 1) return 'sorted';
    
    let isAscending = true;
    let isDescending = true;
    
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            isAscending = false;
        }
        if (nums[i] < nums[i + 1]) {
            isDescending = false;
        }
    }
    
    if (isAscending) return 'ascending';
    if (isDescending) return 'descending';
    return 'not sorted';
}


// Test Cases:
isSorted([1, 2, 3, 4, 5]) // true
isSorted([1, 2, 2, 3, 4]) // true (equal consecutive allowed)
isSorted([1, 3, 2, 4, 5]) // false
isSorted([5, 4, 3, 2, 1]) // false (descending)
isSorted([3, 3, 3]) // true
isSorted([1]) // true
isSorted([]) // true


/*
Time and Space Complexity (Optimized):
- Time: O(n) - must check all elements in worst case
- Space: O(1) - constant extra space


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Using Array.every() Method:
Logic:
- Use built-in every() method to test condition on all elements
- More functional programming style
- Concise and readable code
- Same time complexity as loop-based approach

Code:
function isSortedEvery(nums) {
    return nums.every((val, i, arr) => {
        return i === 0 || arr[i - 1] <= val;
    });
}
Time: O(n), Space: O(1)


2. Recursive Approach:
Logic:
- Base case: if array has 0 or 1 elements, it's sorted
- Recursive case: check first two elements, then recurse on rest
- If first > second, return false
- Otherwise, recursively check remaining array
- Uses call stack space

Code:
function isSortedRecursive(nums, index = 0) {
    // Base case: reached end of array
    if (index >= nums.length - 1) {
        return true;
    }
    
    // Check current pair
    if (nums[index] > nums[index + 1]) {
        return false;
    }
    
    // Recursive case: check rest of array
    return isSortedRecursive(nums, index + 1);
}
Time: O(n), Space: O(n) due to recursion stack


3. Using Array.reduce():
Logic:
- Use reduce to accumulate sorted status
- Start with true, update based on comparisons
- Functional programming approach
- More complex for this simple problem

Code:
function isSortedReduce(nums) {
    return nums.reduce((isSorted, val, i, arr) => {
        return isSorted && (i === 0 || arr[i - 1] <= val);
    }, true);
}
Time: O(n), Space: O(1)


4. Using Two Pointers:
Logic:
- Use two pointers (current and next)
- Move both pointers forward together
- Compare values at both pointers
- More verbose than needed for this problem

Code:
function isSortedTwoPointers(nums) {
    if (nums.length <= 1) return true;
    
    let current = 0;
    let next = 1;
    
    while (next < nums.length) {
        if (nums[current] > nums[next]) {
            return false;
        }
        current++;
        next++;
    }
    
    return true;
}
Time: O(n), Space: O(1)


Pattern Recognition:
- Adjacent element comparison → simple iteration
- Boolean result → early return on violation
- Linear scan suffices → no need for complex data structures
- Sorted array checking → fundamental validation operation


Method Comparison:
1. Simple Loop: O(n) time, O(1) space, clear and efficient
2. Array.every(): O(n) time, O(1) space, functional style, concise
3. Recursive: O(n) time, O(n) space, educational but uses stack
4. Array.reduce(): O(n) time, O(1) space, functional but less clear
5. Two Pointers: O(n) time, O(1) space, same as simple loop but verbose


Pitfalls:
- Forgetting to handle empty array or single element
- Using arr[i] >= arr[i+1] instead of arr[i] > arr[i+1] (allows equal elements)
- Off-by-one errors in loop bounds (should be length - 1)
- Not considering that equal consecutive elements should be allowed
- Confusing strictly increasing vs non-decreasing order


Key Insights:
- Problem is already optimal at O(n) - must check all elements
- Simple iteration is clearest and most efficient approach
- Early return on first violation improves average case
- Equal consecutive elements are allowed (non-decreasing order)
- Cannot do better than O(n) time complexity


Real-world Applications:
- Input validation for algorithms requiring sorted data
- Binary search prerequisite check
- Data quality validation
- Sorting algorithm verification
- Database query optimization
- Caching strategies (sorted data enables optimizations)


Algorithm Variants:
1. Check if array is sorted in descending order
2. Check if array is strictly increasing (no equal consecutive elements)
3. Check if array is rotated sorted array
4. Find the number of inversions (pairs out of order)
5. Check if array can be made sorted with at most K swaps


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
