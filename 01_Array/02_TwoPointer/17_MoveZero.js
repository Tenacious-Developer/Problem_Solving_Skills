/*
============================================
MOVE ZEROS TO END OF ARRAY
============================================


Problem Statement:
Given an array of integers, move all zeros to the end of the array while maintaining the relative order of non-zero elements. Perform this operation in-place without creating a copy of the array.


Example:
Input: nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
Explanation: All zeros moved to end, non-zero order preserved

Input: nums = [0, 0, 1]
Output: [1, 0, 0]
Explanation: Single non-zero element moved to front


Constraints:
- 1 ≤ nums.length ≤ 10^4
- -2^31 ≤ nums[i] ≤ 2^31 - 1
- Modify array in-place with O(1) extra space
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
- Create temporary array to store non-zero elements
- Iterate through original array and copy non-zero elements to temp
- Fill remaining positions in temp array with zeros
- Copy all elements from temp back to original array


Brute Force Code:
function moveZeroesBrute(nums) {
    const temp = [];
    
    for (const num of nums) {
        if (num !== 0) {
            temp.push(num);
        }
    }
    
    while (temp.length < nums.length) {
        temp.push(0);
    }
    
    for (let i = 0; i < nums.length; i++) {
        nums[i] = temp[i];
    }
}


Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array plus copying
- Space: O(n) - temporary array storage


Bottlenecks:
- Uses extra space when in-place modification required
- Multiple array operations (create, populate, copy back)
- Violates O(1) space constraint of the problem


Optimized Logic Hints:
- Use two pointers for in-place modification
- One pointer tracks position where next non-zero should go
- Another pointer scans through array to find non-zero elements
- Fill remaining positions with zeros after processing


Optimized Logic (Two Pointers - Two Pass):
- Use write pointer to track position where next non-zero element should be placed
- First pass: move all non-zero elements to front using write pointer
- Keep track of count of non-zero elements processed
- Second pass: fill remaining positions from write pointer to end with zeros
- Maintains relative order of non-zero elements


Pseudo Code:
function moveZeroes(nums):
    writeIndex = 0
    
    // First pass: move non-zero elements to front
    for i from 0 to nums.length - 1:
        if nums[i] != 0:
            nums[writeIndex] = nums[i]
            writeIndex++
    
    // Second pass: fill remaining with zeros
    for i from writeIndex to nums.length - 1:
        nums[i] = 0


*/


//Optimized Code:
function moveZeroes(nums) {
    let writeIndex = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    for (let i = writeIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
}


// Test Cases:
moveZeroes([0, 1, 0, 3, 12]) // [1, 3, 12, 0, 0]
moveZeroes([0]) // [0]
moveZeroes([0, 0, 1]) // [1, 0, 0]
moveZeroes([1, 2, 3]) // [1, 2, 3]
moveZeroes([1, 0, 2, 0, 3, 0]) // [1, 2, 3, 0, 0, 0]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - two passes through array
- Space: O(1) - only using pointer variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Single Pass with Swapping:
Logic:
- Use two pointers: left (for non-zero position) and right (current element)
- When right finds non-zero, swap with left and increment left
- More operations but single pass through array
- Maintains relative order through swapping

Code:
function moveZeroesSwap(nums) {
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
    }
}
Time: O(n), Space: O(1)


2. Splice and Push Approach:
Logic:
- Iterate through array and find zeros
- Remove zero using splice and add to end using push
- Continue until all zeros processed
- Inefficient due to array shifting in splice

Code:
function moveZeroesSplice(nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            nums.splice(i, 1);
            nums.push(0);
            i--; // Adjust index after splice
        }
    }
}
Time: O(n²), Space: O(1)


3. Filter and Concat Approach:
Logic:
- Use filter to separate non-zero and zero elements
- Count zeros and create array of zeros
- Concatenate non-zeros with zeros
- Replace original array elements

Code:
function moveZeroesFilter(nums) {
    const nonZeros = nums.filter(num => num !== 0);
    const zeroCount = nums.length - nonZeros.length;
    const zeros = new Array(zeroCount).fill(0);
    const result = nonZeros.concat(zeros);
    
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
}
Time: O(n), Space: O(n)


4. Bubble Sort Style:
Logic:
- Repeatedly bubble zeros towards the end
- Compare adjacent elements and swap if left is zero and right is non-zero
- Continue until no more swaps needed
- Maintains order but inefficient

Code:
function moveZeroesBubble(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - 1; j++) {
            if (nums[j] === 0 && nums[j + 1] !== 0) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
}
Time: O(n²), Space: O(1)


Pattern Recognition:
- Moving elements by condition → two pointers technique
- In-place array modification → write pointer pattern
- Stable partitioning → maintain relative order while grouping
- Similar to quicksort partition but with specific condition (zero vs non-zero)


Method Comparison:
1. Two Pass: O(n) time, O(1) space, clean and readable, optimal
2. Single Pass Swap: O(n) time, O(1) space, more swaps but single traversal
3. Splice/Push: O(n²) time, O(1) space, simple but inefficient
4. Filter/Concat: O(n) time, O(n) space, functional approach but uses extra space
5. Bubble Style: O(n²) time, O(1) space, intuitive but very inefficient
6. Brute Force: O(n) time, O(n) space, violates space constraint


Pitfalls:
- Not maintaining relative order of non-zero elements
- Using splice in loops leading to O(n²) time complexity
- Unnecessary swaps when elements are already in correct positions
- Off-by-one errors in pointer movements
- Overwriting elements before copying them to correct positions


Key Insights:
- Two pointers technique is optimal for in-place array modifications
- Write pointer tracks where next valid element should go
- Separation of concerns: first handle non-zeros, then fill zeros
- Single pass with swapping trades fewer traversals for more operations


Real-world Applications:
- Data cleaning and preprocessing
- Memory compaction in garbage collection
- Task scheduling (move completed tasks to end)
- Log file processing (move error entries to end)
- Database record reorganization


Algorithm Variants:
1. Move specific value to end instead of zeros
2. Move multiple types of elements to different ends
3. Count number of moves performed during operation
4. Preserve original array and return new rearranged array
5. Move zeros to beginning instead of end


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
