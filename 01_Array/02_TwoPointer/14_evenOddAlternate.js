/*
============================================
ARRANGE EVEN ODD ALTERNATE
============================================


Problem Statement:
Given an array of integers, arrange the elements so that even and odd numbers appear alternately. The pattern can start with either even or odd numbers depending on the problem variant.


Example:
Input: nums = [2, 1, 4, 5, 6, 7]
Output: [2, 1, 4, 5, 6, 7] (even first pattern)
Or: [1, 2, 5, 4, 7, 6] (odd first pattern)

Input: nums = [3, 2, 7, 8, 4, 1]
Output: [2, 3, 8, 7, 4, 1] (even first)


Constraints:
- Array may have unequal count of even and odd numbers
- Extra elements of dominant parity go at the end
- Preserve relative order within even and odd groups
- Choose starting pattern based on problem requirement


Edge Cases:
- All even numbers [2, 4, 6, 8] → [2, 4, 6, 8] (no change possible)
- All odd numbers [1, 3, 5, 7] → [1, 3, 5, 7] (no change possible)
- Equal count [2, 4, 1, 3] → [2, 1, 4, 3] or [1, 2, 3, 4]
- More evens [2, 4, 6, 1, 3] → [2, 1, 4, 3, 6]
- More odds [1, 3, 5, 7, 2] → [2, 1, 3, 5, 7] (if starting with even)


Brute Force Logic:
- Separate even and odd numbers into two arrays while preserving order
- Merge arrays alternately starting with chosen pattern
- Append remaining elements from longer array at the end


Brute Force Code:
function arrangeEvenOddBrute(nums, startWithEven = true) {
    const evens = [];
    const odds = [];
    
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    const result = [];
    const minLength = Math.min(evens.length, odds.length);
    
    for (let i = 0; i < minLength; i++) {
        if (startWithEven) {
            result.push(evens[i]);
            result.push(odds[i]);
        } else {
            result.push(odds[i]);
            result.push(evens[i]);
        }
    }
    
    // Append remaining elements
    for (let i = minLength; i < evens.length; i++) {
        result.push(evens[i]);
    }
    for (let i = minLength; i < odds.length; i++) {
        result.push(odds[i]);
    }
    
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - single pass for separation + merging
- Space: O(n) - temporary arrays for even and odd numbers


Bottlenecks:
- Uses extra space for temporary arrays
- Multiple array operations and copying
- Creates intermediate result array


Optimized Logic Hints:
- Use direct placement in result array to avoid intermediate arrays
- Calculate positions directly based on alternating pattern
- Handle unequal counts by placing extra elements at end


Optimized Logic (Direct Placement):
- Separate elements into even and odd arrays (unavoidable for order preservation)
- Instead of creating result array, place elements directly at calculated positions
- Even elements go to positions 0, 2, 4... or 1, 3, 5... based on starting pattern
- Odd elements go to remaining alternating positions
- Place extra elements at the end after alternating section


Pseudo Code:
function arrangeEvenOdd(nums, startWithEven):
    evens = [], odds = []
    
    // Separate while preserving order
    for each num in nums:
        if num % 2 == 0: evens.push(num)
        else: odds.push(num)
    
    // Calculate alternating positions
    evenPos = startWithEven ? 0 : 1
    oddPos = startWithEven ? 1 : 0
    minLen = min(evens.length, odds.length)
    
    // Place alternately
    for i from 0 to minLen - 1:
        nums[evenPos] = evens[i]
        nums[oddPos] = odds[i]
        evenPos += 2
        oddPos += 2
    
    // Place remaining elements
    pos = 2 * minLen
    for i from minLen to evens.length - 1:
        nums[pos++] = evens[i]
    for i from minLen to odds.length - 1:
        nums[pos++] = odds[i]


*/


//Optimized Code:
function arrangeEvenOddAlternate(nums, startWithEven = true) {
    const evens = [];
    const odds = [];
    
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    let evenPos = startWithEven ? 0 : 1;
    let oddPos = startWithEven ? 1 : 0;
    const minLength = Math.min(evens.length, odds.length);
    
    // Place elements alternately
    for (let i = 0; i < minLength; i++) {
        nums[evenPos] = evens[i];
        nums[oddPos] = odds[i];
        evenPos += 2;
        oddPos += 2;
    }
    
    // Place remaining elements
    let pos = 2 * minLength;
    for (let i = minLength; i < evens.length; i++) {
        nums[pos++] = evens[i];
    }
    for (let i = minLength; i < odds.length; i++) {
        nums[pos++] = odds[i];
    }
    
    return nums;
}


// Test Cases:
arrangeEvenOddAlternate([2, 1, 4, 5, 6, 7], true) // [2, 1, 4, 5, 6, 7] (even first)
arrangeEvenOddAlternate([3, 2, 7, 8, 4, 1], true) // [2, 3, 8, 7, 4, 1] (even first)
arrangeEvenOddAlternate([1, 2, 3, 4, 5], false) // [1, 2, 3, 4, 5] (odd first)
arrangeEvenOddAlternate([2, 4, 6, 1], true) // [2, 1, 4, 6] (extra even at end)
arrangeEvenOddAlternate([1, 3, 5, 2], false) // [1, 2, 3, 5] (extra odds at end)


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass for separation + direct placement
- Space: O(n) - temporary arrays (unavoidable for order preservation)


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Queue-based Approach:
Logic:
- Use two queues to store even and odd numbers
- Dequeue alternately based on starting pattern
- Handle remaining elements after one queue is empty
- Good for streaming data scenarios

Code:
function arrangeEvenOddQueues(nums, startWithEven = true) {
    const evenQueue = [];
    const oddQueue = [];
    
    for (const num of nums) {
        if (num % 2 === 0) {
            evenQueue.push(num);
        } else {
            oddQueue.push(num);
        }
    }
    
    let index = 0;
    let useEven = startWithEven;
    
    while (evenQueue.length > 0 && oddQueue.length > 0) {
        if (useEven) {
            nums[index] = evenQueue.shift();
        } else {
            nums[index] = oddQueue.shift();
        }
        index++;
        useEven = !useEven;
    }
    
    // Add remaining elements
    while (evenQueue.length > 0) {
        nums[index++] = evenQueue.shift();
    }
    while (oddQueue.length > 0) {
        nums[index++] = oddQueue.shift();
    }
    
    return nums;
}
Time: O(n), Space: O(n)


2. In-place Rotation Approach:
Logic:
- Check each position for correct parity
- If wrong parity, find next correct element and rotate segment
- More complex but uses less additional space operations
- Time complexity becomes O(n²) due to rotations

Code:
function arrangeEvenOddInPlace(nums, startWithEven = true) {
    for (let i = 0; i < nums.length; i++) {
        const shouldBeEven = startWithEven ? (i % 2 === 0) : (i % 2 === 1);
        const isCurrentEven = (nums[i] % 2 === 0);
        
        if (shouldBeEven !== isCurrentEven) {
            let j = i + 1;
            while (j < nums.length && (nums[j] % 2 === 0) !== shouldBeEven) {
                j++;
            }
            
            if (j < nums.length) {
                // Rotate elements to maintain order
                const temp = nums[j];
                for (let k = j; k > i; k--) {
                    nums[k] = nums[k - 1];
                }
                nums[i] = temp;
            } else {
                break; // No more elements of required parity
            }
        }
    }
    
    return nums;
}
Time: O(n²), Space: O(1)


3. Counting and Reconstruction:
Logic:
- Count even and odd numbers
- Determine alternating pattern and length
- Reconstruct array based on counts
- Uses counting sort principle

Code:
function arrangeEvenOddCounting(nums, startWithEven = true) {
    const evens = nums.filter(n => n % 2 === 0).sort((a, b) => a - b);
    const odds = nums.filter(n => n % 2 === 1).sort((a, b) => a - b);
    
    let evenIdx = 0, oddIdx = 0, index = 0;
    let useEven = startWithEven;
    
    while (evenIdx < evens.length && oddIdx < odds.length) {
        if (useEven) {
            nums[index] = evens[evenIdx++];
        } else {
            nums[index] = odds[oddIdx++];
        }
        index++;
        useEven = !useEven;
    }
    
    while (evenIdx < evens.length) {
        nums[index++] = evens[evenIdx++];
    }
    while (oddIdx < odds.length) {
        nums[index++] = odds[oddIdx++];
    }
    
    return nums;
}
Time: O(n log n), Space: O(n)


Pattern Recognition:
- Alternating arrangement by parity → separation and merge pattern
- Two types classification → even/odd using modulo operation
- Order preservation → stable partitioning required
- Unequal counts handling → append remaining elements


Method Comparison:
1. Direct Placement: O(n) time, O(n) space, optimal and clean
2. Queue-based: O(n) time, O(n) space, good for streaming data
3. In-place Rotation: O(n²) time, O(1) space, preserves order but slow
4. Counting/Sorting: O(n log n) time, O(n) space, also sorts within groups
5. Brute Force: O(n) time, O(n) space, creates unnecessary intermediate array


Pitfalls:
- Not handling unequal counts of even and odd numbers
- Incorrect position calculation for alternating placement
- Not preserving relative order within even and odd groups
- Forgetting to handle remaining elements after alternating section
- Off-by-one errors in alternating position calculations


Key Insights:
- Separation phase is necessary to maintain relative order within groups
- Direct position calculation avoids intermediate result arrays
- Pattern can start with either even or odd based on requirements
- Extra elements naturally go at the end after alternating section


Real-world Applications:
- Task scheduling with alternating priorities
- Data visualization with alternating categories
- Load balancing between different types of resources
- Signal processing with alternating patterns
- Queue management systems


Algorithm Variants:
1. Start with even vs start with odd numbers
2. Preserve relative order vs allow reordering within groups
3. Handle three categories (even, odd, zero) - extend to multi-way
4. Minimize number of swaps during rearrangement
5. Stable vs unstable alternating arrangement


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
