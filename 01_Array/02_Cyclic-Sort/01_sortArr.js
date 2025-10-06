/*
============================================
SORT AN ARRAY USING CYCLIC SORT
============================================


Problem Statement:
You are given an array containing n numbers taken from the range 1 to n.
The numbers are randomly placed in the array.
Sort the array in-place (without using extra space) using O(n) time complexity.

Key Constraint: Numbers are in range [1, n] where n is array length.
This property allows us to use index mapping for efficient sorting.


Example:
Input: nums = [3, 1, 5, 4, 2]
Output: [1, 2, 3, 4, 5]
Explanation: Place each number at its correct index (number i goes to index i-1)

Input: nums = [2, 6, 4, 3, 1, 5]
Output: [1, 2, 3, 4, 5, 6]
Explanation: Sort by placing elements at their natural positions


Constraints:
- nums.length = n
- 1 ≤ nums[i] ≤ n
- All integers from 1 to n are present
- Must sort in-place with O(1) extra space
- Must achieve O(n) time complexity


Edge Cases:
- Already sorted [1, 2, 3, 4] → no swaps needed
- Reverse sorted [4, 3, 2, 1] → multiple swaps
- Single element [1] → already sorted
- Two elements [2, 1] → single swap


Brute Force Logic:
- Use comparison-based sorting (QuickSort, MergeSort, etc.)
- Standard sorting algorithms don't leverage the 1 to n property
- Time complexity would be O(n log n) which is worse than required


Brute Force Code:
function sortArrayBrute(nums) {
    return nums.sort((a, b) => a - b);
}


Time and Space Complexity (Brute Force):
- Time: O(n log n) - standard comparison-based sorting
- Space: O(log n) or O(n) depending on sort implementation


Bottlenecks:
- Doesn't utilize the constraint that numbers are from 1 to n
- Comparison-based sorting has lower bound of O(n log n)
- Can't achieve O(n) time without leveraging index mapping


Optimized Logic Hints:
- Key insight: Since numbers are from 1 to n, we can use index as position
- Number i should be placed at index i-1 (0-based indexing)
- Use index mapping: nums[i] = i + 1 for sorted array
- Repeatedly swap elements until each is at correct position


Optimized Logic (Cyclic Sort):
- Iterate through array using index i
- For current element nums[i], calculate its correct position: correctIndex = nums[i] - 1
- If element is not at correct position (nums[i] != nums[correctIndex]):
  - Swap nums[i] with element at correctIndex
  - Don't increment i (check swapped element next)
- If element is at correct position:
  - Increment i to check next position
- Continue until all elements are correctly placed


Pseudo Code:
function cyclicSort(nums):
    i = 0
    
    while i < nums.length:
        correctIndex = nums[i] - 1
        
        // If element not at correct position, swap
        if nums[i] != nums[correctIndex]:
            swap(nums[i], nums[correctIndex])
        else:
            i++  // Move to next position
    
    return nums


*/


//Optimized Code:
function cyclicSort(nums) {
    let i = 0;
    
    while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        
        // If current element is not at its correct position
        if (nums[i] !== nums[correctIndex]) {
            // Swap with element at correct position
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            // Element is at correct position, move to next
            i++;
        }
    }
    
    return nums;
}


// Alternative with explicit swap function:
function cyclicSortExplicit(nums) {
    function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    let i = 0;
    while (i < nums.length) {
        const correctIndex = nums[i] - 1;
        
        if (nums[i] !== nums[correctIndex]) {
            swap(nums, i, correctIndex);
        } else {
            i++;
        }
    }
    
    return nums;
}


// Test Cases:
cyclicSort([3, 1, 5, 4, 2]) // [1, 2, 3, 4, 5]
cyclicSort([2, 6, 4, 3, 1, 5]) // [1, 2, 3, 4, 5, 6]
cyclicSort([1, 2, 3, 4]) // [1, 2, 3, 4] (already sorted)
cyclicSort([4, 3, 2, 1]) // [1, 2, 3, 4]
cyclicSort([1]) // [1]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - each element is moved to correct position at most once
- Space: O(1) - sorting done in-place with constant extra variables


Why O(n) Time Complexity?
- Each element can be swapped at most once to reach its correct position
- Total swaps ≤ n (because each swap places at least one element correctly)
- The while loop runs at most 2n times:
  - n iterations where element is already correct (i++)
  - n swaps maximum (placing elements in correct positions)
- Therefore: O(n + n) = O(n)


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Counting Sort Approach:
Logic:
- Use counting array to count occurrences of each number
- Reconstruct sorted array from counts
- Works but requires extra O(n) space

Code:
function sortUsingCountingSort(nums) {
    const n = nums.length;
    const count = new Array(n + 1).fill(0);
    
    for (const num of nums) {
        count[num]++;
    }
    
    let index = 0;
    for (let i = 1; i <= n; i++) {
        while (count[i] > 0) {
            nums[index++] = i;
            count[i]--;
        }
    }
    
    return nums;
}
Time: O(n), Space: O(n)


2. Selection Sort Style:
Logic:
- Find minimum element and place at correct position
- Continue for each position
- In-place but O(n²) time complexity

Code:
function sortUsingSelection(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
        }
    }
    return nums;
}
Time: O(n²), Space: O(1)


Pattern Recognition:
- Numbers in range [1, n] → index mapping is possible
- In-place sorting → cyclic sort leverages position-value relationship
- O(n) time requirement → must avoid nested loops or comparisons
- Similar to problems: Find Missing Number, Find Duplicate Number


Method Comparison:
1. Cyclic Sort: O(n) time, O(1) space, optimal for [1,n] range
2. Counting Sort: O(n) time, O(n) space, uses extra array
3. Standard Sort: O(n log n) time, varies space, doesn't use constraint
4. Selection Sort: O(n²) time, O(1) space, too slow


Pitfalls:
- Forgetting that correctIndex = nums[i] - 1 (converting 1-based to 0-based)
- Incrementing i even when swap is performed (should only increment when element is correct)
- Infinite loop if swap condition is wrong
- Not handling the case where element is already at correct position


Key Insights:
- Cyclic sort exploits the constraint that numbers are from 1 to n
- Each element knows exactly where it should go: position = value - 1
- Maximum n swaps needed because each swap places at least one element correctly
- Algorithm is deterministic and always terminates in O(n) time
- Perfect example of using problem constraints for optimization


Real-world Applications:
- Database record sorting when IDs are sequential
- Memory address sorting in operating systems
- Sorting task IDs in job scheduling systems
- Organizing sequential file numbers
- Sorting tickets/tokens with sequential numbers
- Index-based data structure reorganization


Algorithm Variants and Related Problems:
1. Find Missing Number (element from 1 to n+1 is missing)
2. Find Duplicate Number (one element appears twice)
3. Find All Duplicates (multiple duplicates allowed)
4. Find First Missing Positive (unsorted with any range)
5. Set Mismatch (one number duplicated, one missing)
6. Cyclic sort with 0 to n-1 range (adjust correctIndex formula)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
