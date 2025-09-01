/*
============================================
CONTAINER WITH MOST WATER
============================================

Problem Statement:
Given an array of non-negative integers representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the maximum amount of water.

Example:
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
Explanation: Lines at index 1 (height=8) and index 8 (height=7) form container with area = min(8,7) * (8-1) = 7 * 7 = 49

Constraints:
- Array length: 2 to 3 * 10^4
- Heights are non-negative integers 0 to 3 * 10^4
- Need to maximize the area of water container
- Cannot tilt the container (water level is horizontal)

Edge Cases:
- Two equal heights [3, 3] → area = 3 * 1 = 3
- Increasing heights [1, 2, 3, 4] → max area likely from first and last
- Decreasing heights [4, 3, 2, 1] → max area likely from first and last  
- One very tall line [1, 100, 1] → area limited by shorter lines
- All same height [5, 5, 5, 5] → max width gives max area

Brute Force Logic:
- Check all possible pairs of lines using nested loops
- For each pair, calculate area = min(height[i], height[j]) * (j - i)
- Track maximum area found
- Return the maximum area

Time and Space Complexity (Brute Force):
- Time: O(n²) - check all n*(n-1)/2 pairs
- Space: O(1) - only tracking variables

Bottlenecks:
- Checking all pairs even when some clearly won't be optimal
- No early termination when better solutions impossible
- Not leveraging geometric properties of the problem

Optimized Logic (Two Pointers):
- Start with widest possible container (leftmost and rightmost lines)
- Calculate current area and track maximum
- Move the pointer with shorter height inward
- Why? Moving shorter line might find taller line (increase area)
- Moving taller line decreases width without height guarantee
- Pattern: Greedy two pointers with geometric reasoning

Pseudo Code:
function maxArea(height):
    left = 0, right = height.length - 1
    maxArea = 0
    
    while left < right:
        // Calculate current container area
        currentArea = min(height[left], height[right]) * (right - left)
        maxArea = max(maxArea, currentArea)
        
        // Move pointer with shorter height
        if height[left] < height[right]:
            left++
        else:
            right--
    
    return maxArea

Time and Space Complexity (Optimized):
- Time: O(n) - each element visited at most once
- Space: O(1) - only pointer variables

Alternate Approach (Divide and Conquer):
- Recursively find max in left half, right half, and cross-boundary
- More complex with no practical advantage over two pointers
- Time: O(n log n), Space: O(log n)
*/

function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        // Calculate area between current left and right lines
        // Area = min(height) * width
        const currentHeight = Math.min(height[left], height[right]);
        const currentWidth = right - left;
        const currentArea = currentHeight * currentWidth;
        
        // Update maximum area
        maxWater = Math.max(maxWater, currentArea);
        
        // Move pointer with shorter height inward
        // This is the key insight: moving the shorter line gives us
        // the best chance of finding a larger area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// Alternative: Brute force approach (for educational comparison)
function maxAreaBrute(height) {
    let maxWater = 0;
    
    for (let i = 0; i < height.length - 1; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const currentArea = Math.min(height[i], height[j]) * (j - i);
            maxWater = Math.max(maxWater, currentArea);
        }
    }
    
    return maxWater;
}

// Alternative: With detailed tracking (returns indices and area)
function maxAreaWithDetails(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    let bestLeft = 0;
    let bestRight = height.length - 1;
    
    while (left < right) {
        const currentArea = Math.min(height[left], height[right]) * (right - left);
        
        if (currentArea > maxWater) {
            maxWater = currentArea;
            bestLeft = left;
            bestRight = right;
        }
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return {
        maxArea: maxWater,
        leftIndex: bestLeft,
        rightIndex: bestRight,
        leftHeight: height[bestLeft],
        rightHeight: height[bestRight]
    };
}

/*
Pattern Recognition:
- Two boundaries optimization → two pointers technique
- Geometric area maximization → greedy movement of limiting factor
- Width vs height trade-off → move shorter height for potential gain
- Similar to trapping rain water but different constraints

Why Two Pointers Works:
1. Start with maximum possible width
2. Area is limited by shorter of two heights
3. Moving taller line inward: reduces width, no height guarantee → bad
4. Moving shorter line inward: reduces width, but might find taller line → potentially good
5. This greedy choice explores all potentially optimal solutions

Method Comparison:
1. Two Pointers: O(n) time, O(1) space, optimal
2. Brute Force: O(n²) time, O(1) space, simple but inefficient  
3. Divide & Conquer: O(n log n) time, O(log n) space, unnecessary complexity

Test Cases:
maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) // 49
maxArea([1, 1]) // 1
maxArea([4, 3, 2, 1, 4]) // 16 (from first and last elements)
maxArea([1, 2, 1]) // 2 (from indices 0 and 2)
maxArea([2, 1, 8, 6, 4, 6, 5, 5]) // 25

Pitfalls:
- Moving wrong pointer (should move shorter one)
- Forgetting that area = min(heights) * width
- Not understanding why greedy approach works
- Off-by-one errors in width calculation (right - left, not right - left + 1)
- Comparing areas incorrectly or not tracking maximum properly

Key Insights:
- Two pointers technique provides optimal O(n) solution
- Greedy strategy: always move the pointer limiting current area
- Width decreases monotonically, so we must find increasing height to improve
- This problem demonstrates perfect application of two pointers pattern

Real-world Applications:
- Water storage and reservoir design
- Profit maximization with limited resources
- Load balancing between servers of different capacities
- Financial portfolio optimization with constraints
- Manufacturing capacity planning

Geometric Intuition:
- Container area limited by shorter of two walls
- Wider containers have potential for more water
- But height limitation creates trade-offs
- Two pointers systematically explores this trade-off space

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
