/*
============================================
REARRANGE EVEN AND ODD ALTERNATELY
============================================

Problem Statement:
Given an array of integers, rearrange the array so that even and odd numbers appear alternately. If one type has more elements, they appear at the end.

Example:
Input: [2, 1, 4, 9, 6, 3, 8, 5]
Output: [2, 1, 4, 9, 6, 3, 8, 5] (even first)
Or: [1, 2, 9, 4, 3, 6, 5, 8] (odd first)

Constraints:
- Array length: 1 to 10^4
- Contains positive integers
- Zero is treated as even (0 % 2 === 0)
- Choose starting with even or odd based on problem requirement

Edge Cases:
- All even [2, 4, 6, 8] → [2, 4, 6, 8] (no change)
- All odd [1, 3, 5, 7] → [1, 3, 5, 7] (no change)
- Single element [5] → [5] (no change)
- Equal count [2, 4, 1, 3] → [2, 1, 4, 3] or [1, 2, 3, 4]
- Unequal count [2, 4, 6, 1, 3] → [2, 1, 4, 3, 6]

Brute Force Logic:
- Separate even and odd numbers into two arrays
- Merge them alternately back into original array
- Append remaining elements at the end

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass for separation + merge
- Space: O(n) - two separate arrays

Bottlenecks:
- Uses extra space for temporary arrays
- Multiple passes through data
- Not in-place modification

Optimized Logic (Two Arrays Approach):
- Separate elements by parity into two arrays
- Merge alternately starting with preferred parity
- Handle remaining elements from longer array
- Pattern: Separation then alternating merge

Pseudo Code:
function rearrangeEvenOddAlternate(nums):
    evens = []
    odds = []
    
    // Separate by parity
    for each num in nums:
        if num % 2 == 0: evens.push(num)
        else: odds.push(num)
    
    // Merge alternately (even first)
    evenIdx = 0, oddIdx = 0, arrIdx = 0
    while evenIdx < evens.length AND oddIdx < odds.length:
        nums[arrIdx++] = evens[evenIdx++]  // even first
        nums[arrIdx++] = odds[oddIdx++]    // then odd
    
    // Add remaining elements
    while evenIdx < evens.length:
        nums[arrIdx++] = evens[evenIdx++]
    while oddIdx < odds.length:
        nums[arrIdx++] = odds[oddIdx++]

Time and Space Complexity (Optimized):
- Time: O(n) - linear separation and merge
- Space: O(n) - temporary arrays needed

Alternate Approach (In-place Rotation):
- Check each position for correct parity
- If wrong parity, find next correct element and rotate
- Preserves relative order within each group
- Time: O(n²), Space: O(1)
*/

// Approach 1: Even First Alternating
function rearrangeEvenOddEvenFirst(nums) {
    const evens = [];
    const odds = [];
    
    // Separate even and odd numbers
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    let evenIdx = 0, oddIdx = 0, arrIdx = 0;
    
    // Place even and odd alternately (even first)
    while (evenIdx < evens.length && oddIdx < odds.length) {
        nums[arrIdx++] = evens[evenIdx++]; // Even at even index (0, 2, 4...)
        nums[arrIdx++] = odds[oddIdx++];   // Odd at odd index (1, 3, 5...)
    }
    
    // Add remaining evens
    while (evenIdx < evens.length) {
        nums[arrIdx++] = evens[evenIdx++];
    }
    
    // Add remaining odds
    while (oddIdx < odds.length) {
        nums[arrIdx++] = odds[oddIdx++];
    }
    
    return nums;
}

// Approach 2: Odd First Alternating
function rearrangeEvenOddOddFirst(nums) {
    const evens = [];
    const odds = [];
    
    // Separate by parity
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    let evenIdx = 0, oddIdx = 0, arrIdx = 0;
    
    // Place odd and even alternately (odd first)
    while (evenIdx < evens.length && oddIdx < odds.length) {
        nums[arrIdx++] = odds[oddIdx++];   // Odd at even index (0, 2, 4...)
        nums[arrIdx++] = evens[evenIdx++]; // Even at odd index (1, 3, 5...)
    }
    
    // Add remaining elements
    while (evenIdx < evens.length) {
        nums[arrIdx++] = evens[evenIdx++];
    }
    
    while (oddIdx < odds.length) {
        nums[arrIdx++] = odds[oddIdx++];
    }
    
    return nums;
}

// Approach 3: Start with Smallest Element's Parity
function rearrangeEvenOddSmallestFirst(nums) {
    // First sort to find the smallest element
    const sorted = [...nums].sort((a, b) => a - b);
    const smallestIsEven = (sorted[0] % 2 === 0);
    
    const evens = [];
    const odds = [];
    
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    // Sort both arrays to maintain ascending order
    evens.sort((a, b) => a - b);
    odds.sort((a, b) => a - b);
    
    let evenIdx = 0, oddIdx = 0, arrIdx = 0;
    let useEven = smallestIsEven;
    
    while (evenIdx < evens.length && oddIdx < odds.length) {
        if (useEven) {
            nums[arrIdx++] = evens[evenIdx++];
        } else {
            nums[arrIdx++] = odds[oddIdx++];
        }
        useEven = !useEven;
    }
    
    // Add remaining elements
    while (evenIdx < evens.length) {
        nums[arrIdx++] = evens[evenIdx++];
    }
    while (oddIdx < odds.length) {
        nums[arrIdx++] = odds[oddIdx++];
    }
    
    return nums;
}

// Approach 4: In-place with Order Preservation
function rearrangeEvenOddInPlace(nums) {
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        // Even indices should have even numbers, odd indices should have odd numbers
        const shouldBeEven = (i % 2 === 0);
        const isCurrentEven = (nums[i] % 2 === 0);
        
        if (shouldBeEven !== isCurrentEven) {
            // Find next element with correct parity
            let j = i + 1;
            while (j < n && (nums[j] % 2 === 0) !== shouldBeEven) {
                j++;
            }
            
            if (j < n) {
                // Rotate elements from i to j to bring correct element to position i
                rightRotate(nums, i, j);
            }
        }
    }
    
    return nums;
}

// Helper function for right rotation
function rightRotate(arr, start, end) {
    const temp = arr[end];
    for (let i = end; i > start; i--) {
        arr[i] = arr[i - 1];
    }
    arr[start] = temp;
}

// Approach 5: Flexible Starting Choice with Sorted Order
function rearrangeEvenOddSorted(nums, startWithEven = true) {
    const evens = [];
    const odds = [];
    
    // Separate and sort each group
    for (const num of nums) {
        if (num % 2 === 0) {
            evens.push(num);
        } else {
            odds.push(num);
        }
    }
    
    evens.sort((a, b) => a - b);
    odds.sort((a, b) => a - b);
    
    let evenIdx = 0, oddIdx = 0, arrIdx = 0;
    let nextShouldBeEven = startWithEven;
    
    while (evenIdx < evens.length && oddIdx < odds.length) {
        if (nextShouldBeEven) {
            nums[arrIdx++] = evens[evenIdx++];
        } else {
            nums[arrIdx++] = odds[oddIdx++];
        }
        nextShouldBeEven = !nextShouldBeEven;
    }
    
    // Add remaining elements
    while (evenIdx < evens.length) {
        nums[arrIdx++] = evens[evenIdx++];
    }
    while (oddIdx < odds.length) {
        nums[arrIdx++] = odds[oddIdx++];
    }
    
    return nums;
}

// Approach 6: Equal Count Assumption (LeetCode Style)
function rearrangeEvenOddEqual(nums) {
    // Assumes equal number of even and odd elements
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
    for (let i = 0; i < evens.length; i++) {
        result.push(evens[i]); // Even first
        result.push(odds[i]);  // Then odd
    }
    
    // Copy back to original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}

/*
Pattern Recognition:
- Alternate arrangement by parity → separation then merge
- Even/odd classification → modulo operation (n % 2)
- Two types of elements → use two arrays or positions
- Order preservation required → rotation-based approach

Method Comparison:
1. Two Arrays: O(n) time, O(n) space, clean and intuitive
2. In-place Rotation: O(n²) time, O(1) space, preserves order
3. Sorted Approach: O(n log n) time, O(n) space, maintains sorted order
4. Equal Count: O(n) time, O(n) space, assumes equal counts

Test Cases:
rearrangeEvenOddEvenFirst([2, 1, 4, 9, 6, 3, 8, 5]) 
// [2, 1, 4, 9, 6, 3, 8, 5]

rearrangeEvenOddOddFirst([1, 2, 3, 4, 5, 6]) 
// [1, 2, 3, 4, 5, 6]

rearrangeEvenOddSorted([9, 8, 13, 2, 19, 14], true) 
// [2, 9, 8, 13, 14, 19] (sorted within groups)

Pitfalls:
- Not handling unequal counts of even and odd numbers
- Confusion about starting with even or odd
- Zero handling (0 is even: 0 % 2 === 0)
- Not preserving order when required
- Assuming equal counts when not guaranteed

Key Insights:
- Two arrays approach is most straightforward
- Zero is classified as even (0 % 2 === 0)
- Problem variants may require sorted order within groups
- In-place solutions require rotation for order preservation

Real-world Applications:
- Task scheduling (different priority types)
- Display arrangements (different categories)
- Load balancing (different request types)
- Data visualization (contrasting data points)
- Quality control (different test results)

Algorithm Variants:
1. Start with even vs odd
2. Preserve vs don't preserve relative order  
3. Sort within groups vs maintain original order
4. Equal counts vs unequal counts handling

Stability Analysis:
- Two Arrays: **Stable** ✅ - preserves relative order within each parity group
- In-place Rotation: **Stable** ✅ - maintains all relative orders
- Sorted Approach: **Modified Stable** ⚠️ - sorts within groups but preserves group separation

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
