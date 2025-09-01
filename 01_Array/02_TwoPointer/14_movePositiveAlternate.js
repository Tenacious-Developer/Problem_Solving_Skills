/*
============================================
REARRANGE POSITIVE AND NEGATIVE ALTERNATELY
============================================

Problem Statement:
Given an array of positive and negative integers, rearrange the array so that positive and negative numbers appear alternately. If one type has more elements, they appear at the end.

Example:
Input: [-1, 2, -3, 4, 5, 6, -7, 8, 9]
Output: [2, -1, 4, -3, 5, -7, 6, 8, 9] (positive first)
Or: [-1, 2, -3, 4, -7, 5, 6, 8, 9] (negative first)

Constraints:
- Array length: 1 to 10^4
- Contains both positive and negative integers
- Zero can be treated as positive or clarified by problem
- Choose starting with positive or negative based on problem requirement

Edge Cases:
- All positive [1, 2, 3, 4] → [1, 2, 3, 4] (no change)
- All negative [-1, -2, -3, -4] → [-1, -2, -3, -4] (no change)
- Single element [5] or [-5] → no change needed
- Equal count [1, 2, -3, -4] → [1, -3, 2, -4] or [-3, 1, -4, 2]
- Unequal count [1, 2, 3, -4, -5] → [1, -4, 2, -5, 3]

Brute Force Logic:
- Separate positive and negative numbers into two arrays
- Merge them alternately back into original array
- Append remaining elements at the end

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass for separation + merge
- Space: O(n) - two separate arrays

Bottlenecks:
- Uses extra space for temporary arrays
- Multiple passes through data
- Not in-place modification

Optimized Logic (In-place with Order Preservation):
- For each position that should have specific sign, find correct element
- Use rotation to bring it to correct position while preserving order
- More complex but maintains relative order
- Pattern: Position-based correction with rotation

Pseudo Code (Two Array Approach):
function rearrangeAlternate(nums):
    positives = []
    negatives = []
    
    // Separate elements by sign
    for each num in nums:
        if num >= 0: positives.push(num)
        else: negatives.push(num)
    
    // Merge alternately (starting with positive)
    posIdx = 0, negIdx = 0, arrIdx = 0
    while posIdx < positives.length AND negIdx < negatives.length:
        nums[arrIdx++] = positives[posIdx++]  // positive first
        nums[arrIdx++] = negatives[negIdx++]  // then negative
    
    // Add remaining elements
    while posIdx < positives.length:
        nums[arrIdx++] = positives[posIdx++]
    while negIdx < negatives.length:
        nums[arrIdx++] = negatives[negIdx++]

Time and Space Complexity (Optimized):
- Time: O(n) - linear separation and merge
- Space: O(n) - temporary arrays needed

Alternate Approach (In-place Rotation):
- Check each position for correct sign
- If wrong sign, find next correct element and rotate segment
- Preserves relative order within each group
- Time: O(n²), Space: O(1)
*/

// Approach 1: Two Arrays (Most Common and Clean)
function rearrangeAlternatePositiveFirst(nums) {
    const positives = [];
    const negatives = [];
    
    // Separate positive and negative numbers
    for (const num of nums) {
        if (num >= 0) {
            positives.push(num);
        } else {
            negatives.push(num);
        }
    }
    
    let posIdx = 0, negIdx = 0, arrIdx = 0;
    
    // Place positive and negative alternately (positive first)
    while (posIdx < positives.length && negIdx < negatives.length) {
        nums[arrIdx++] = positives[posIdx++]; // Positive at even index
        nums[arrIdx++] = negatives[negIdx++]; // Negative at odd index
    }
    
    // Add remaining positives
    while (posIdx < positives.length) {
        nums[arrIdx++] = positives[posIdx++];
    }
    
    // Add remaining negatives
    while (negIdx < negatives.length) {
        nums[arrIdx++] = negatives[negIdx++];
    }
    
    return nums;
}

// Approach 2: Starting with Negative First
function rearrangeAlternateNegativeFirst(nums) {
    const positives = [];
    const negatives = [];
    
    for (const num of nums) {
        if (num >= 0) {
            positives.push(num);
        } else {
            negatives.push(num);
        }
    }
    
    let posIdx = 0, negIdx = 0, arrIdx = 0;
    
    // Place negative and positive alternately (negative first)
    while (posIdx < positives.length && negIdx < negatives.length) {
        nums[arrIdx++] = negatives[negIdx++]; // Negative at even index
        nums[arrIdx++] = positives[posIdx++]; // Positive at odd index
    }
    
    // Add remaining elements
    while (posIdx < positives.length) {
        nums[arrIdx++] = positives[posIdx++];
    }
    
    while (negIdx < negatives.length) {
        nums[arrIdx++] = negatives[negIdx++];
    }
    
    return nums;
}

// Approach 3: In-place with Order Preservation (Rotation-based)
function rearrangeAlternateInPlace(nums) {
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        // Even indices should have positive, odd indices should have negative
        const shouldBePositive = (i % 2 === 0);
        const isCurrentPositive = (nums[i] >= 0);
        
        if (shouldBePositive !== isCurrentPositive) {
            // Find next element with correct sign
            let j = i + 1;
            while (j < n && (nums[j] >= 0) !== shouldBePositive) {
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

// Approach 4: LeetCode Style (Equal Positive and Negative Count)
function rearrangeAlternateEqual(nums) {
    // Assumes equal number of positive and negative elements
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
        result.push(positives[i]); // Positive first
        result.push(negatives[i]); // Then negative
    }
    
    // Copy back to original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}

// Approach 5: Flexible Starting Choice
function rearrangeAlternateFlexible(nums, startWithPositive = true) {
    const positives = [];
    const negatives = [];
    
    for (const num of nums) {
        if (num >= 0) {
            positives.push(num);
        } else {
            negatives.push(num);
        }
    }
    
    let posIdx = 0, negIdx = 0, arrIdx = 0;
    let nextShouldBePositive = startWithPositive;
    
    while (posIdx < positives.length && negIdx < negatives.length) {
        if (nextShouldBePositive) {
            nums[arrIdx++] = positives[posIdx++];
        } else {
            nums[arrIdx++] = negatives[negIdx++];
        }
        nextShouldBePositive = !nextShouldBePositive;
    }
    
    // Add remaining elements
    while (posIdx < positives.length) {
        nums[arrIdx++] = positives[posIdx++];
    }
    while (negIdx < negatives.length) {
        nums[arrIdx++] = negatives[negIdx++];
    }
    
    return nums;
}

/*
Pattern Recognition:
- Alternate arrangement by condition → separation then merge
- Two types of elements → use two arrays or two pointers
- Order preservation required → rotation-based approach
- Equal counts assumed → direct alternating placement

Method Comparison:
1. Two Arrays: O(n) time, O(n) space, clean and intuitive
2. In-place Rotation: O(n²) time, O(1) space, preserves order
3. LeetCode Equal: O(n) time, O(n) space, assumes equal counts
4. Partition then Swap: O(n) time, O(1) space, doesn't preserve order

Test Cases:
rearrangeAlternatePositiveFirst([-1, 2, -3, 4, 5, 6, -7, 8, 9]) 
// [2, -1, 4, -3, 5, -7, 6, 8, 9]

rearrangeAlternateNegativeFirst([1, 2, -3, -4, 5]) 
// [-3, 1, -4, 2, 5]

rearrangeAlternateEqual([3, 1, -2, -5, 2, -4]) 
// [3, -2, 1, -5, 2, -4]

Pitfalls:
- Not handling unequal counts of positive and negative numbers
- Confusion about starting with positive or negative
- Zero handling (usually treated as positive)
- Not preserving relative order when required
- Assuming equal counts when not guaranteed

Key Insights:
- Two arrays approach is most straightforward and commonly used
- In-place solutions require rotation for order preservation
- Problem variants may require different starting patterns
- Zero handling should be clarified (typically treated as positive)

Real-world Applications:
- Task scheduling (urgent vs normal priority alternating)
- Display arrangements (different categories)
- Load balancing (different types of requests)
- Data visualization (contrasting data points)
- Quality control (good vs defective items)

Algorithm Variants:
1. Start with positive vs negative
2. Preserve vs don't preserve relative order
3. Equal counts vs unequal counts handling
4. Include zero handling specifications

Stability Analysis:
- Two Arrays: **Stable** ✅ - preserves relative order within each group
- In-place Rotation: **Stable** ✅ - maintains all relative orders
- Partition + Swap: **Unstable** ❌ - changes relative order

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
