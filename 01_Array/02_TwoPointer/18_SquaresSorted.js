/*
============================================
SQUARES OF SORTED ARRAY
============================================

Problem Statement:
Given an integer array sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

Example:
Input: nums = [-4, -1, 0, 3, 10]
Output: [0, 1, 9, 16, 100]
Explanation: After squaring: [16, 1, 0, 9, 100], after sorting: [0, 1, 9, 16, 100]

Constraints:
- Array is sorted in non-decreasing order
- Array length: 1 to 10^4
- Elements range: -10^4 to 10^4
- Return new sorted array of squares

Edge Cases:
- All positive [1, 2, 3, 4] → [1, 4, 9, 16] (already sorted after squaring)
- All negative [-4, -3, -2, -1] → [1, 4, 9, 16] (reverse order after squaring)
- Contains zero [-2, 0, 3] → [0, 4, 9]
- Single element [5] → [25]
- Mix of negative and positive [-3, -1, 2, 4] → [1, 4, 9, 16]

Brute Force Logic:
- Square each element in the array
- Sort the resulting squared array
- Return the sorted result

Time and Space Complexity (Brute Force):
- Time: O(n log n) - squaring O(n) + sorting O(n log n)
- Space: O(n) - new array for squares

Bottlenecks:
- Doesn't leverage the sorted property of input
- Sorting squared array is unnecessary work
- Can achieve better than O(n log n) time complexity

Optimized Logic (Two Pointers):
- Key insight: largest squares come from the extremes (most negative or most positive)
- Use two pointers at start and end of array
- Compare absolute values and place larger square at end of result
- Work backwards filling result array from right to left
- Pattern: Two pointers with comparison of absolute values

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

Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(n) - result array (required for output)

Alternate Approach (Find Split Point):
- Find split point where negatives end and positives begin
- Merge squared negatives (reversed) with squared positives
- Similar to merging two sorted arrays
- Time: O(n), Space: O(n)
*/

function sortedSquares(nums) {
    const result = new Array(nums.length);
    let left = 0;
    let right = nums.length - 1;
    let position = nums.length - 1; // Fill result from right to left
    
    // Compare absolute values from both ends
    while (left <= right) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];
        
        // Place the larger square at current position
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

// Alternative: Brute force approach (for comparison)
function sortedSquaresBrute(nums) {
    // Square all elements then sort
    const squared = nums.map(num => num * num);
    return squared.sort((a, b) => a - b);
}

// Alternative: Using absolute values for cleaner comparison
function sortedSquaresAbsolute(nums) {
    const result = new Array(nums.length);
    let left = 0;
    let right = nums.length - 1;
    
    // Fill from right to left (largest to smallest)
    for (let i = nums.length - 1; i >= 0; i--) {
        const leftAbs = Math.abs(nums[left]);
        const rightAbs = Math.abs(nums[right]);
        
        if (leftAbs > rightAbs) {
            result[i] = leftAbs * leftAbs;
            left++;
        } else {
            result[i] = rightAbs * rightAbs;
            right--;
        }
    }
    
    return result;
}

// Alternative: Split and merge approach
function sortedSquaresSplitMerge(nums) {
    // Find the split point between negative and non-negative
    let splitIndex = 0;
    while (splitIndex < nums.length && nums[splitIndex] < 0) {
        splitIndex++;
    }
    
    // Create arrays for negative squares (reversed) and positive squares
    const negativeSquares = [];
    const positiveSquares = [];
    
    // Square negatives (they'll be in descending order, so reverse)
    for (let i = splitIndex - 1; i >= 0; i--) {
        negativeSquares.push(nums[i] * nums[i]);
    }
    
    // Square positives (they'll be in ascending order)
    for (let i = splitIndex; i < nums.length; i++) {
        positiveSquares.push(nums[i] * nums[i]);
    }
    
    // Merge two sorted arrays
    const result = [];
    let negIdx = 0, posIdx = 0;
    
    while (negIdx < negativeSquares.length && posIdx < positiveSquares.length) {
        if (negativeSquares[negIdx] <= positiveSquares[posIdx]) {
            result.push(negativeSquares[negIdx++]);
        } else {
            result.push(positiveSquares[posIdx++]);
        }
    }
    
    // Add remaining elements
    while (negIdx < negativeSquares.length) {
        result.push(negativeSquares[negIdx++]);
    }
    while (posIdx < positiveSquares.length) {
        result.push(positiveSquares[posIdx++]);
    }
    
    return result;
}

// Alternative: In-place modification (if allowed to modify input)
function sortedSquaresInPlace(nums) {
    // Square all elements first
    for (let i = 0; i < nums.length; i++) {
        nums[i] = nums[i] * nums[i];
    }
    
    // Sort the squared array
    nums.sort((a, b) => a - b);
    
    return nums;
}

/*
Pattern Recognition:
- Sorted array + transformation → leverage sorted property
- Largest values at extremes after squaring → two pointers from ends
- Need sorted output → fill result from largest to smallest or merge approach
- Similar to merge two sorted arrays pattern

Why Two Pointers Works:
1. In sorted array, largest absolute values are at the extremes
2. After squaring, largest squares come from largest absolute values
3. Compare squares at both ends, take larger one
4. Fill result backwards (right to left) with largest squares first
5. This naturally produces sorted result when filled backwards

Method Comparison:
1. Two Pointers: O(n) time, O(n) space, optimal
2. Brute Force: O(n log n) time, O(n) space, doesn't use sorted property
3. Split & Merge: O(n) time, O(n) space, more complex logic
4. In-place: O(n log n) time, O(1) space, modifies input

Test Cases:
sortedSquares([-4, -1, 0, 3, 10]) // [0, 1, 9, 16, 100]
sortedSquares([-7, -3, 2, 3, 11]) // [4, 9, 9, 49, 121]
sortedSquares([1, 2, 3, 4]) // [1, 4, 9, 16]
sortedSquares([-5, -3, -2, -1]) // [1, 4, 9, 25]
sortedSquares([0]) // [0]

Pitfalls:
- Not utilizing the sorted property of input array
- Forgetting to fill result array from right to left
- Comparing values instead of their squares or absolute values
- Off-by-one errors in pointer movements
- Not handling edge cases (all positive, all negative, single element)

Key Insights:
- Two pointers technique is optimal for this sorted array problem
- Largest squares always come from the extremes of a sorted array
- Working backwards (right to left) naturally produces sorted result
- Absolute value comparison is equivalent to comparing squares for ordering

Real-world Applications:
- Data transformation with ordering preservation
- Statistical analysis (variance calculations)
- Image processing (brightness/contrast adjustments)
- Financial analysis (risk calculations with signed returns)
- Physics simulations (energy calculations)

Algorithm Variants:
1. Return indices of original elements instead of squares
2. Find kth largest square without sorting entire array
3. Handle duplicate values with specific requirements
4. Extend to higher powers (cubes, fourth powers)

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
