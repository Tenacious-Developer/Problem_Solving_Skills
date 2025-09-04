/*
============================================
REARRANGE ARRAY ELEMENTS BY SIGN
============================================


Problem Statement:
Given an integer array nums of even length containing equal numbers of positive and negative integers, rearrange the elements such that every consecutive pair has opposite signs. The array should start with a positive number and maintain the relative order of positive and negative elements.


Example:
Input: nums = [3, 1, -2, -5, 2, -4]
Output: [3, -2, 1, -5, 2, -4]
Explanation: Positives [3, 1, 2] and negatives [-2, -5, -4] are placed alternately

Input: nums = [-1, 1]
Output: [1, -1]
Explanation: Start with positive number first


Constraints:
- nums.length is even and 2 ≤ nums.length ≤ 2 × 10^5
- nums contains equal number of positive and negative integers
- No zeros in the array
- Maintain relative order of positive and negative numbers separately
- Result must start with a positive number


Edge Cases:
- Minimum case [1, -1] → [1, -1]
- Equal alternating already [1, -2, 3, -4] → [1, -2, 3, -4]
- All positives first [1, 2, 3, -1, -2, -3] → [1, -1, 2, -2, 3, -3]
- Random order [3, 1, -2, -5, 2, -4] → [3, -2, 1, -5, 2, -4]


Brute Force Logic:
- Separate positive and negative numbers into two arrays
- Maintain their relative order during separation
- Merge them alternately back into original array starting with positive
- Place positive at even indices (0, 2, 4...) and negative at odd indices (1, 3, 5...)


Brute Force Code:
function rearrangeArrayBrute(nums) {
    const positives = [];
    const negatives = [];
    
    for (const num of nums) {
        if (num > 0) {
            positives.push(num);
        } else {
            negatives.push(num);
        }
    }
    
    const result = [];
    for (let i = 0; i < positives.length; i++) {
        result.push(positives[i]);
        result.push(negatives[i]);
    }
    
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - single pass for separation + merging
- Space: O(n) - temporary arrays for positives and negatives


Bottlenecks:
- Uses extra space for temporary arrays
- Multiple array operations (create, populate, merge)
- Can be optimized to avoid creating result array


Optimized Logic Hints:
- Use direct indexing instead of creating intermediate result array
- Place positives at even indices and negatives at odd indices directly
- Leverage the constraint of equal positive and negative counts


Optimized Logic (Direct Placement):
- Separate positive and negative numbers into two arrays (same as brute force)
- Instead of creating intermediate result, directly place elements at correct positions
- Positive numbers go to indices 0, 2, 4, 6... (i.e., 2*i)
- Negative numbers go to indices 1, 3, 5, 7... (i.e., 2*i+1)
- This maintains alternating pattern while preserving relative order


Pseudo Code:
function rearrangeArray(nums):
    positives = []
    negatives = []
    
    // Separate by sign while maintaining order
    for each num in nums:
        if num > 0:
            positives.push(num)
        else:
            negatives.push(num)
    
    // Place directly at correct indices
    for i from 0 to positives.length - 1:
        nums[2 * i] = positives[i]      // Even indices for positives
        nums[2 * i + 1] = negatives[i]  // Odd indices for negatives


*/


//Optimized Code:
function rearrangeArray(nums) {
    const positives = [];
    const negatives = [];
    
    for (const num of nums) {
        if (num > 0) {
            positives.push(num);
        } else {
            negatives.push(num);
        }
    }
    
    for (let i = 0; i < positives.length; i++) {
        nums[2 * i] = positives[i];
        nums[2 * i + 1] = negatives[i];
    }
    
    return nums;
}


// Test Cases:
rearrangeArray([3, 1, -2, -5, 2, -4]) // [3, -2, 1, -5, 2, -4]
rearrangeArray([-1, 1]) // [1, -1]
rearrangeArray([1, 2, -1, -2]) // [1, -1, 2, -2]
rearrangeArray([1, -3, 2, -4, 3, -1]) // [1, -3, 2, -4, 3, -1]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass for separation + direct placement
- Space: O(n) - temporary arrays for positives and negatives (unavoidable for order preservation)


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Two Pointers with Single Pass:
Logic:
- Use result array with two pointers for even and odd positions
- Single pass through input array
- Place positives at pos pointer (starts at 0, increments by 2)
- Place negatives at neg pointer (starts at 1, increments by 2)
- More efficient as it avoids separation step

Code:
function rearrangeArrayTwoPointers(nums) {
    const result = new Array(nums.length);
    let posIndex = 0;
    let negIndex = 1;
    
    for (const num of nums) {
        if (num > 0) {
            result[posIndex] = num;
            posIndex += 2;
        } else {
            result[negIndex] = num;
            negIndex += 2;
        }
    }
    
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}
Time: O(n), Space: O(n)


2. Queue-based Approach:
Logic:
- Use two queues to store positive and negative numbers
- Dequeue alternately to build result
- Maintains FIFO order naturally
- Good for streaming data scenarios

Code:
function rearrangeArrayQueue(nums) {
    const posQueue = [];
    const negQueue = [];
    
    for (const num of nums) {
        if (num > 0) {
            posQueue.push(num);
        } else {
            negQueue.push(num);
        }
    }
    
    for (let i = 0; i < nums.length; i++) {
        if (i % 2 === 0) {
            nums[i] = posQueue.shift();
        } else {
            nums[i] = negQueue.shift();
        }
    }
    
    return nums;
}
Time: O(n), Space: O(n)


3. In-place Rotation (Complex):
Logic:
- Identify segments that need rearrangement
- Use block rotation to move elements to correct positions
- Much more complex but achieves O(1) space
- Not practical for this problem due to complexity

Code:
function rearrangeArrayInPlace(nums) {
    // Complex implementation involving multiple rotations
    // and segment identification - not recommended for this problem
    // as it significantly increases code complexity for marginal benefit
}
Time: O(n²) worst case, Space: O(1)


Pattern Recognition:
- Alternating arrangement → separation and merge pattern
- Maintain relative order → stable partitioning approach
- Equal counts guaranteed → direct index mapping possible
- Start with specific type → indexing pattern (even/odd)


Method Comparison:
1. Direct Placement: O(n) time, O(n) space, clean and optimal
2. Two Pointers Single Pass: O(n) time, O(n) space, slightly more efficient
3. Queue-based: O(n) time, O(n) space, good for streaming scenarios
4. In-place Rotation: O(n²) time, O(1) space, overly complex
5. Brute Force: O(n) time, O(n) space, uses extra result array


Pitfalls:
- Not maintaining relative order within each sign group
- Incorrect index calculation for alternating placement
- Starting with wrong sign (should start with positive)
- Assuming unequal counts when problem guarantees equal counts
- Overcomplicating with in-place solutions when extra space is acceptable


Key Insights:
- Problem guarantees equal positive and negative counts, simplifying solution
- Direct index mapping (2*i for positive, 2*i+1 for negative) creates perfect alternation
- Separation phase is necessary to maintain relative order
- Two-pass approach (separate then place) is clean and efficient


Real-world Applications:
- Signal processing (alternating positive and negative waveforms)
- Data visualization (alternating different data categories)
- Network packet scheduling (alternating high and low priority)
- Audio processing (balancing left and right channels)
- Task scheduling (alternating different types of tasks)


Algorithm Variants:
1. Start with negative number instead of positive
2. Handle unequal counts with extra elements at end
3. Preserve global order vs just relative order within groups
4. Three or more alternating categories
5. Custom alternating patterns beyond simple positive-negative


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
