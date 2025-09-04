/*
============================================
MOVE EVEN NUMBERS TO ONE SIDE (SORT BY PARITY)
============================================


Problem Statement:
Given an array of integers, move all even numbers to one side and all odd numbers to the other side. The relative order within each group may or may not be preserved depending on the approach chosen.


Example:
Input: nums = [3, 1, 2, 4]
Output: [2, 4, 3, 1] (evens first)

Input: nums = [4, 2, 5, 1, 6, 3]
Output: [4, 2, 6, 5, 1, 3] (evens first)


Constraints:
- Array length: 1 to 10^4
- Modify array in-place with O(1) extra space
- Any valid arrangement is acceptable (evens first or odds first)
- Zero is considered even (0 % 2 === 0)


Edge Cases:
- All even numbers [2, 4, 6, 8] → [2, 4, 6, 8] (no change)
- All odd numbers [1, 3, 5, 7] → [1, 3, 5, 7] (no change)
- Single element [5] → [5] (no change)
- Mixed with zero [0, 1, 2, 3] → [0, 2, 1, 3] (zero is even)
- Empty array [] → [] (no change)


Brute Force Logic:
- Create two separate arrays for even and odd numbers
- Traverse original array and populate both arrays based on parity
- Concatenate even array with odd array
- Copy result back to original array


Brute Force Code:
function sortArrayByParityBrute(nums) {
    const evens = [];
    const odds = [];
    
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    const result = evens.concat(odds);
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - single pass for separation + concatenation
- Space: O(n) - two temporary arrays


Bottlenecks:
- Uses extra space when in-place modification required
- Multiple array operations (create, populate, concatenate, copy)
- Violates O(1) space constraint


Optimized Logic Hints:
- Use two pointers approaching from opposite ends
- Move left pointer right while element is already even
- Move right pointer left while element is already odd
- When both pointers stop, swap elements and continue


Optimized Logic (Two Pointers):
- Use left pointer starting from beginning
- Use right pointer starting from end
- Move left right while element is even (already in correct position)
- Move right left while element is odd (already in correct position)
- When both stop, we have odd on left and even on right, so swap them
- Continue until pointers meet or cross


Pseudo Code:
function sortArrayByParity(nums):
    left = 0, right = nums.length - 1
    
    while left < right:
        // Move left pointer to first odd number
        while left < right AND nums[left] % 2 == 0:
            left++
        
        // Move right pointer to first even number
        while right > left AND nums[right] % 2 == 1:
            right--
        
        // If both pointers stopped, swap elements
        if left < right:
            swap(nums[left], nums[right])
            left++
            right--


*/


//Optimized Code:
function sortArrayByParity(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        while (left < right && nums[left] % 2 === 0) {
            left++;
        }
        
        while (right > left && nums[right] % 2 === 1) {
            right--;
        }
        
        if (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    
    return nums;
}


// Test Cases:
sortArrayByParity([3, 1, 2, 4]) // [2, 4, 3, 1] or similar valid arrangement
sortArrayByParity([0]) // [0]
sortArrayByParity([1, 2, 3, 4, 5, 6]) // [2, 4, 6, 1, 3, 5] or similar
sortArrayByParity([2, 4, 6, 8]) // [2, 4, 6, 8] (all even)
sortArrayByParity([1, 3, 5, 7]) // [1, 3, 5, 7] (all odd)


/*
Time and Space Complexity (Optimized):
- Time: O(n) - each element visited at most once
- Space: O(1) - only pointer variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Partition-style Approach:
Logic:
- Use single write pointer for even numbers
- Scan array, when even found, swap with write position
- Similar to quicksort partition logic
- Preserves relative order of even numbers

Code:
function sortArrayByParityPartition(nums) {
    let writeIndex = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            [nums[writeIndex], nums[i]] = [nums[i], nums[writeIndex]];
            writeIndex++;
        }
    }
    
    return nums;
}
Time: O(n), Space: O(1)


2. Stable Rearrangement (Insertion Sort Style):
Logic:
- For each odd element in even section, shift it to odd section
- Maintains relative order of both groups but expensive
- Uses insertion sort technique for maintaining order

Code:
function sortArrayByParityStable(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            continue;
        }
        
        const temp = nums[i];
        let j = i - 1;
        
        while (j >= 0 && nums[j] % 2 === 0) {
            nums[j + 1] = nums[j];
            j--;
        }
        
        nums[j + 1] = temp;
    }
    
    return nums;
}
Time: O(n²), Space: O(1)


3. Filter and Concatenate:
Logic:
- Use filter to separate even and odd elements
- Concatenate filtered arrays
- Replace original array elements
- Uses functional programming approach

Code:
function sortArrayByParityFilter(nums) {
    const evens = nums.filter(num => num % 2 === 0);
    const odds = nums.filter(num => num % 2 === 1);
    const result = evens.concat(odds);
    
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}
Time: O(n), Space: O(n)


4. Built-in Sort with Custom Comparator:
Logic:
- Use sort function with custom comparator based on parity
- Comparator returns difference of parity values
- Less efficient but demonstrates sorting approach

Code:
function sortArrayByParitySort(nums) {
    return nums.sort((a, b) => (a % 2) - (b % 2));
}
Time: O(n log n), Space: O(log n)


Pattern Recognition:
- Segregate by binary condition → two pointers or partition approach
- Even/odd classification → modulo operation (n % 2)
- In-place rearrangement → Dutch National Flag pattern
- Similar to move negatives, quicksort partition problems


Method Comparison:
1. Two Pointers: O(n) time, O(1) space, unstable but optimal
2. Partition Style: O(n) time, O(1) space, semi-stable (preserves even order)
3. Stable Insertion: O(n²) time, O(1) space, stable but slower
4. Filter/Concat: O(n) time, O(n) space, stable but uses extra space
5. Built-in Sort: O(n log n) time, O(log n) space, stable but inefficient
6. Brute Force: O(n) time, O(n) space, violates space constraint


Pitfalls:
- Not handling all even or all odd arrays correctly
- Infinite loops when pointer conditions are wrong
- Not checking bounds properly (left < right conditions)
- Forgetting that 0 is even (0 % 2 === 0)
- Assuming relative order must be preserved when not required
- Swapping unnecessarily when elements are already correctly positioned


Key Insights:
- Two pointers approach is most efficient for basic parity segregation
- Zero is classified as even (0 % 2 === 0)
- Problem allows any valid arrangement, not specific order
- Different stability requirements affect algorithm choice
- Similar pattern to Dutch National Flag algorithm


Real-world Applications:
- Data preprocessing (separate valid/invalid records)
- Task scheduling (high/low priority separation)
- Memory management (active/inactive objects)
- Quality control (pass/fail items)
- Database indexing (indexed/non-indexed fields)
- Image processing (foreground/background pixels)


Algorithm Variants:
1. Start with odd numbers first instead of even
2. Preserve relative order within parity groups (stable version)
3. Three-way partitioning (negative, zero, positive)
4. Custom parity conditions (divisible by k)
5. Count number of swaps performed during rearrangement


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
