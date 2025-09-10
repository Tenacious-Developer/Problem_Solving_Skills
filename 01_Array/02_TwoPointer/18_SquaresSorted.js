/*
============================================
SQUARES OF A SORTED ARRAY
============================================


Problem Statement:
Given an integer array nums sorted in non-decreasing order, 
return an array of the squares of each number sorted in non-decreasing order.

The challenge is that negative numbers, when squared, can become larger 
than positive numbers. Since the array is sorted but contains both negative 
and positive numbers, simply squaring each element in place won't maintain 
the sorted order.


Example:
Input: nums = [-4, -1, 0, 3, 10]
Output: [0, 1, 9, 16, 100]
Explanation: After squaring we get [16, 1, 0, 9, 100]
After sorting: [0, 1, 9, 16, 100]

Input: nums = [-7, -3, 2, 3, 11]
Output: [4, 9, 9, 49, 121]
Explanation: After squaring we get [49, 9, 4, 9, 121]
After sorting: [4, 9, 9, 49, 121]


Constraints:
- 1 ≤ nums.length ≤ 10^4
- -10^4 ≤ nums[i] ≤ 10^4
- nums is sorted in non-decreasing order
- Return a new array (don't modify the input)


Edge Cases:
- All positive numbers [1, 2, 3, 4] → [1, 4, 9, 16] (already sorted after squaring)
- All negative numbers [-4, -3, -2, -1] → [1, 4, 9, 16] (reverse order after squaring)
- Contains zero [-2, 0, 3] → [0, 4, 9]
- Single element [5] → [25]
- Mix of negative and positive [-3, -1, 2, 4] → [1, 4, 9, 16]


Brute Force Logic:
- Square each element in the array
- Sort the resulting squared array using built-in sort
- Return the sorted result


Brute Force Code:
function sortedSquaresBrute(nums) {
    const squared = [];
    
    for (let i = 0; i < nums.length; i++) {
        squared[i] = nums[i] * nums[i];
    }
    
    return squared.sort((a, b) => a - b);
}


Time and Space Complexity (Brute Force):
- Time: O(n log n) - squaring O(n) + sorting O(n log n)
- Space: O(n) - new array for squares


Bottlenecks:
- Doesn't leverage the sorted property of input array
- Sorting squared array is unnecessary work when we can do better
- Can achieve better than O(n log n) time complexity


Optimized Logic Hints:
- Use two pointers at the extremes of the array
- The largest squares come from the elements with largest absolute values
- These largest absolute values are at the beginning (negative) or end (positive)
- Fill result array from right to left with largest squares first


Optimized Logic (Two Pointers):
- Key insight: largest squares come from the extremes (most negative or most positive)
- Use left pointer at start (index 0) and right pointer at end (index n-1)
- Compare absolute values (or directly compare squares) at both pointers
- Place larger square at the end of result array and move corresponding pointer
- Fill result array from right to left (largest to smallest squares)
- Continue until all elements are processed


Pseudo Code:
function sortedSquares(nums):
    result = new Array(nums.length)
    left = 0, right = nums.length - 1
    pos = nums.length - 1  // Fill from right to left
    
    while left <= right:
        leftSquare = nums[left] * nums[left]
        rightSquare = nums[right] * nums[right]
        
        if leftSquare > rightSquare:
            result[pos] = leftSquare
            left++
        else:
            result[pos] = rightSquare
            right--
        pos--
    
    return result


*/


//Optimized Code:
function sortedSquares(nums) {
    const result = new Array(nums.length);
    let left = 0;
    let right = nums.length - 1;
    let position = nums.length - 1;
    
    while (left <= right) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];
        
        if (leftSquare > rightSquare) {
            result[position] = leftSquare;
            left++;
        } else {
            result[position] = rightSquare;
            right--;
        }
        position--;
    }
    
    return result;
}


// Test Cases:
sortedSquares([-4, -1, 0, 3, 10]) // [0, 1, 9, 16, 100]
sortedSquares([-7, -3, 2, 3, 11]) // [4, 9, 9, 49, 121]
sortedSquares([1, 2, 3, 4]) // [1, 4, 9, 16]
sortedSquares([-5, -3, -2, -1]) // [1, 4, 9, 25]
sortedSquares([0]) // [0]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(n) - result array (required for output)


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Split Point and Merge:
Logic:
- Find the point where array transitions from negative to positive
- Square the negative part (which will be in descending order when squared)
- Square the positive part (which will be in ascending order when squared)
- Merge the two sorted squared arrays like merge sort
- More complex logic but demonstrates merge technique

Code:
function sortedSquaresSplitMerge(nums) {
    let splitIndex = 0;
    while (splitIndex < nums.length && nums[splitIndex] < 0) {
        splitIndex++;
    }
    
    const negSquares = [];
    const posSquares = [];
    
    for (let i = splitIndex - 1; i >= 0; i--) {
        negSquares.push(nums[i] * nums[i]);
    }
    
    for (let i = splitIndex; i < nums.length; i++) {
        posSquares.push(nums[i] * nums[i]);
    }
    
    const result = [];
    let negIdx = 0, posIdx = 0;
    
    while (negIdx < negSquares.length && posIdx < posSquares.length) {
        if (negSquares[negIdx] <= posSquares[posIdx]) {
            result.push(negSquares[negIdx++]);
        } else {
            result.push(posSquares[posIdx++]);
        }
    }
    
    while (negIdx < negSquares.length) {
        result.push(negSquares[negIdx++]);
    }
    while (posIdx < posSquares.length) {
        result.push(posSquares[posIdx++]);
    }
    
    return result;
}
Time: O(n), Space: O(n)


2. Priority Queue/Heap Approach:
Logic:
- Use min-heap to always extract the smallest square
- Add all squared values to heap
- Extract elements in sorted order
- Overkill for this problem but demonstrates heap usage

Code:
function sortedSquaresHeap(nums) {
    const minHeap = [];
    
    for (const num of nums) {
        minHeap.push(num * num);
    }
    
    minHeap.sort((a, b) => a - b);
    return minHeap;
}
Time: O(n log n), Space: O(n)


3. Map with Counting:
Logic:
- Count frequency of each squared value
- Iterate through possible squared values in order
- Add each squared value to result based on its count
- Useful when there are many duplicates

Code:
function sortedSquaresCount(nums) {
    const squareCount = new Map();
    
    for (const num of nums) {
        const square = num * num;
        squareCount.set(square, (squareCount.get(square) || 0) + 1);
    }
    
    const result = [];
    const sortedSquares = Array.from(squareCount.keys()).sort((a, b) => a - b);
    
    for (const square of sortedSquares) {
        const count = squareCount.get(square);
        for (let i = 0; i < count; i++) {
            result.push(square);
        }
    }
    
    return result;
}
Time: O(n log k), Space: O(n), where k is unique squares


Pattern Recognition:
- Sorted array + transformation → leverage sorted property
- Largest values at extremes after transformation → two pointers from ends
- Need sorted output → fill result from largest to smallest or merge approach
- Similar to merge two sorted arrays pattern


Method Comparison:
1. Two Pointers: O(n) time, O(n) space, optimal solution
2. Split & Merge: O(n) time, O(n) space, demonstrates merge technique
3. Priority Queue: O(n log n) time, O(n) space, overkill but works
4. Counting Map: O(n log k) time, O(n) space, good for many duplicates
5. Brute Force: O(n log n) time, O(n) space, doesn't use sorted property


Pitfalls:
- Not leveraging the sorted property of input array
- Forgetting to fill result array from right to left in two pointers approach
- Comparing values instead of their squares when using absolute values
- Off-by-one errors in pointer movements
- Not handling edge cases (all positive, all negative, single element)


Key Insights:
- Two pointers technique is optimal for this sorted array problem
- Largest squares always come from the extremes of a sorted array
- Working backwards (right to left) naturally produces sorted result
- Absolute value comparison is equivalent to comparing squares for ordering


Real-world Applications:
- Data transformation with ordering preservation
- Statistical analysis (variance calculations with signed data)
- Image processing (brightness calculations with signed pixel values)
- Financial analysis (risk calculations with signed returns)
- Physics simulations (energy calculations from signed velocities)


Algorithm Variants:
1. Return indices of original elements instead of squares
2. Find kth largest square without sorting entire array
3. Handle duplicate values with specific requirements
4. Extend to higher powers (cubes, fourth powers)
5. In-place modification of input array (if allowed)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
