/*
============================================
DUTCH NATIONAL FLAG PROBLEM
============================================


Problem Statement:
Given an array containing only three types of elements (typically 0, 1, 2 representing red, white, blue), sort the array in-place so that all elements of the same type are grouped together. Named after the Dutch flag which has three horizontal bands of red, white, and blue.


Example:
Input: nums = [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
Explanation: All 0s first, then 1s, then 2s

Input: nums = [2, 0, 1]
Output: [0, 1, 2]
Explanation: One element of each type sorted


Constraints:
- Array length: 1 to 300
- nums[i] is either 0, 1, or 2
- Sort the array in-place using O(1) extra space
- Solve in one pass through the array (O(n) time)


Edge Cases:
- All same elements [0, 0, 0] → [0, 0, 0] (no change)
- Already sorted [0, 1, 2] → [0, 1, 2] (no change)
- Reverse sorted [2, 1, 0] → [0, 1, 2]
- Two types only [0, 1, 0, 1] → [0, 0, 1, 1]
- Single element [1] → [1] (no change)


Brute Force Logic:
- Count occurrences of each element (0, 1, 2)
- Fill array with counted 0s, then 1s, then 2s
- Requires two passes: one for counting, one for filling


Brute Force Code:
function sortColorsBrute(nums) {
    let count0 = 0, count1 = 0, count2 = 0;
    
    for (const num of nums) {
        if (num === 0) count0++;
        else if (num === 1) count1++;
        else count2++;
    }
    
    let index = 0;
    for (let i = 0; i < count0; i++) nums[index++] = 0;
    for (let i = 0; i < count1; i++) nums[index++] = 1;
    for (let i = 0; i < count2; i++) nums[index++] = 2;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - two passes through array
- Space: O(1) - only counter variables


Bottlenecks:
- Requires two passes through the array
- Doesn't leverage the three-way partitioning opportunity
- Less elegant solution compared to single-pass approach


Optimized Logic Hints:
- Use three pointers to maintain four regions in array
- Maintain invariants for each region throughout the algorithm
- Process unknown elements and place them in correct regions
- Single pass with constant space complexity


Optimized Logic (Dutch National Flag Algorithm):
- Use three pointers: low, mid, high
- Maintain four regions: [0...low-1] contains 0s, [low...mid-1] contains 1s, [mid...high] unknown, [high+1...n-1] contains 2s
- Process element at mid index:
  - If nums[mid] == 0: swap with low, increment both low and mid
  - If nums[mid] == 1: increment mid only (already in correct position)
  - If nums[mid] == 2: swap with high, decrement high only (don't increment mid, need to process swapped element)


Pseudo Code:
function sortColors(nums):
    low = 0, mid = 0, high = nums.length - 1
    
    while mid <= high:
        if nums[mid] == 0:
            swap(nums[low], nums[mid])
            low++
            mid++
        elif nums[mid] == 1:
            mid++
        else: // nums[mid] == 2
            swap(nums[mid], nums[high])
            high--
            // Don't increment mid, process swapped element


*/


//Optimized Code:
function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;
    
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}


// Test Cases:
sortColors([2, 0, 2, 1, 1, 0]) // [0, 0, 1, 1, 2, 2]
sortColors([2, 0, 1]) // [0, 1, 2]
sortColors([0]) // [0]
sortColors([1, 1, 1]) // [1, 1, 1]
sortColors([2, 1, 0, 1, 2]) // [0, 1, 1, 2, 2]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only pointer variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Built-in Sort:
Logic:
- Use language's built-in sorting function
- Simple but doesn't leverage the constraint of only three values
- Generally uses comparison-based sorting algorithms

Code:
function sortColorsBuiltIn(nums) {
    nums.sort((a, b) => a - b);
}
Time: O(n log n), Space: O(1) or O(log n) depending on sort algorithm


2. Counting Sort:
Logic:
- Count frequency of each color (0, 1, 2)
- Reconstruct array based on counts
- Two-pass algorithm but optimal for small range of values

Code:
function sortColorsCountingSort(nums) {
    const counts = [0, 0, 0];
    
    for (const num of nums) {
        counts[num]++;
    }
    
    let index = 0;
    for (let color = 0; color < 3; color++) {
        for (let i = 0; i < counts[color]; i++) {
            nums[index++] = color;
        }
    }
}
Time: O(n), Space: O(1)


3. Bucket Sort Approach:
Logic:
- Create buckets for each color
- Distribute elements into buckets
- Concatenate buckets back to array
- Uses extra space for buckets

Code:
function sortColorsBucket(nums) {
    const buckets = [[], [], []];
    
    for (const num of nums) {
        buckets[num].push(num);
    }
    
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (const color of buckets[i]) {
            nums[index++] = color;
        }
    }
}
Time: O(n), Space: O(n)


4. Quick Sort Partitioning:
Logic:
- Use quicksort's 3-way partitioning approach
- Partition around value 1 as pivot
- Elements < 1 go left, = 1 stay middle, > 1 go right
- More general approach for any three values

Code:
function sortColorsQuickSort(nums) {
    function partition(arr, low, high, pivot) {
        let i = low;
        let j = low;
        let k = high;
        
        while (j <= k) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
                j++;
            } else if (arr[j] === pivot) {
                j++;
            } else {
                [arr[j], arr[k]] = [arr[k], arr[j]];
                k--;
            }
        }
    }
    
    partition(nums, 0, nums.length - 1, 1);
}
Time: O(n), Space: O(1)


Pattern Recognition:
- Three-way partitioning → Dutch National Flag algorithm
- Limited range of values → counting sort opportunity
- In-place sorting with three categories → three pointers technique
- Invariant maintenance → four distinct regions in array


Method Comparison:
1. Dutch National Flag: O(n) time, O(1) space, single pass, optimal
2. Counting Sort: O(n) time, O(1) space, two passes, simple logic
3. Built-in Sort: O(n log n) time, various space, doesn't use constraints
4. Bucket Sort: O(n) time, O(n) space, violates space constraint
5. Quick Sort Partition: O(n) time, O(1) space, more general approach
6. Brute Force Count: O(n) time, O(1) space, two passes


Pitfalls:
- Incrementing mid pointer when swapping with high (should not increment)
- Not maintaining proper invariants for each region
- Confusion about when to increment/decrement which pointers
- Off-by-one errors in loop conditions (mid <= high, not mid < high)
- Not handling edge cases like single element or all same elements


Key Insights:
- Dutch National Flag algorithm is optimal for three-way partitioning
- Invariant maintenance is crucial for correctness
- Single pass through array with constant space is achievable
- Three pointers create four distinct regions with clear boundaries
- Algorithm generalizes to any three-way partitioning problem


Real-world Applications:
- Color-based image processing and filtering
- Priority-based task scheduling (high, medium, low priority)
- Quality control sorting (pass, conditional, fail)
- Network packet classification
- Database record categorization
- Memory management (free, allocated, reserved blocks)


Algorithm Variants:
1. Sort colors with different representation (RGB values)
2. Three-way partitioning with custom pivot values
3. Stable version that preserves relative order within groups
4. Extension to k-way partitioning for more than three categories
5. Handle additional constraints like minimize number of swaps


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
