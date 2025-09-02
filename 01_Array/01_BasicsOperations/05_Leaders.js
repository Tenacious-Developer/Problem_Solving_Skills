/*
============================================
FIND LEADERS IN AN ARRAY
============================================

Problem Statement:
Find all leaders in the array. An element is a leader if it is greater than or equal to all the elements to its right side. The rightmost element is always a leader.

Example:
Input: [16, 17, 4, 3, 5, 2]
Output: [17, 5, 2]
Explanation: 
- 17 is greater than all elements to its right [4, 3, 5, 2]
- 5 is greater than all elements to its right [2]  
- 2 is the rightmost element (always a leader)

Constraints:
- Array length: 1 to 10^4
- Elements can be positive/negative integers
- Return leaders in the order they appear in original array
- Handle single element array

Edge Cases:
- Single element [5] → [5] (rightmost is always leader)
- All elements increasing [1, 2, 3, 4] → [4] (only last element)
- All elements decreasing [4, 3, 2, 1] → [4, 3, 2, 1] (all are leaders)
- All elements equal [3, 3, 3, 3] → [3, 3, 3, 3] (all are leaders with >=)
- Negative numbers [-1, -5, -2] → [-1, -2] (check relative comparisons)

Brute Force Logic:
- For each element, check all elements to its right
- If current element is greater than or equal to all right elements, it's a leader
- Use nested loops for comparison

Time and Space Complexity (Brute Force):
- Time: O(n²) - for each element, check all elements to right
- Space: O(1) - only result array space (not counting output)

Bottlenecks:
- Redundant comparisons for elements that can't be leaders
- Multiple passes through right side elements
- Not utilizing the fact that we can determine "max so far" from right

Optimized Logic (Right to Left Traversal):
- Traverse array from right to left
- Keep track of maximum element seen so far from right
- Current element is leader if it's >= max from right
- Update max and add to result
- Pattern: Single pass with running maximum

Pseudo Code:
function findLeaders(arr):
    result = []
    n = arr.length
    maxFromRight = arr[n-1]
    
    result.push(arr[n-1])  // Rightmost is always leader
    
    for i from n-2 down to 0:
        if arr[i] >= maxFromRight:
            maxFromRight = arr[i]
            result.push(arr[i])
    
    result.reverse()  // To maintain original order
    return result

Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only result array (not counting output space)

Alternate Approach (Left to Right with Suffix Maximum):
- Precompute suffix maximum array
- Compare each element with its suffix maximum
- Time: O(n), Space: O(n) for suffix array
*/

function findLeaders(arr) {
    if (arr.length === 0) return [];
    
    const result = [];
    const n = arr.length;
    
    // Start from rightmost element (always a leader)
    let maxFromRight = arr[n - 1];
    result.push(maxFromRight);
    
    // Traverse from right to left
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            result.push(arr[i]);
        }
    }
    
    // Reverse to maintain original order
    result.reverse();
    return result;
}

// Alternative: Brute force approach (for comparison)
function findLeadersBrute(arr) {
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {
        let isLeader = true;
        
        // Check all elements to the right
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                isLeader = false;
                break; // Early termination
            }
        }
        
        if (isLeader) {
            result.push(arr[i]);
        }
    }
    
    return result;
}

// Alternative: Using suffix maximum array
function findLeadersSuffix(arr) {
    if (arr.length === 0) return [];
    
    const n = arr.length;
    const result = [];
    
    // Create suffix maximum array
    const suffixMax = new Array(n);
    suffixMax[n - 1] = arr[n - 1];
    
    for (let i = n - 2; i >= 0; i--) {
        suffixMax[i] = Math.max(arr[i], suffixMax[i + 1]);
    }
    
    // Find leaders by comparing with suffix maximum
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] >= suffixMax[i + 1]) {
            result.push(arr[i]);
        }
    }
    
    // Last element is always a leader
    result.push(arr[n - 1]);
    
    return result;
}

// Alternative: Without reversing (add at beginning)
function findLeadersNoReverse(arr) {
    if (arr.length === 0) return [];
    
    const result = [];
    const n = arr.length;
    let maxFromRight = arr[n - 1];
    
    // Add rightmost element first
    result.unshift(maxFromRight);
    
    // Traverse from right to left
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            result.unshift(arr[i]); // Add at beginning
        }
    }
    
    return result;
}

/*
Pattern Recognition:
- Elements greater than all to the right → scan from right with running maximum
- Rightmost element always qualifies → start from there
- Need original order in result → reverse at end or add at beginning
- Similar to "next greater element" family of problems

Method Comparison:
1. Right to Left Optimal: O(n) time, O(1) space, single pass
2. Brute Force: O(n²) time, O(1) space, nested loops
3. Suffix Maximum: O(n) time, O(n) space, two passes
4. No Reverse: O(n²) time worst case due to unshift, avoid

Test Cases:
findLeaders([16, 17, 4, 3, 5, 2]) // [17, 5, 2]
findLeaders([1, 2, 3, 4, 5]) // [5]
findLeaders([5, 4, 3, 2, 1]) // [5, 4, 3, 2, 1]
findLeaders([1]) // [1]
findLeaders([7, 4, 5, 7, 3]) // [7, 7, 3]
findLeaders([3, 3, 3, 3]) // [3, 3, 3, 3]

Pitfalls:
- Not including rightmost element (always a leader)
- Using strict > instead of >= (depends on problem variant)
- Forgetting to reverse result when scanning right to left
- Off-by-one errors in loop bounds
- Using unshift for maintaining order (O(n²) complexity)
- Not handling empty array edge case

Key Insights:
- Right-to-left traversal with running maximum is optimal
- Rightmost element is always a leader by definition
- Problem is about finding local maximum when looking rightward
- Reverse operation is cheaper than repeated unshift operations

Problem Variants:
1. Leaders with strict > (change >= to >)
2. Leaders from left (greater than all to left)
3. Count of leaders instead of actual leaders
4. Leaders with their positions/indices

Real-world Applications:
- Finding peak performance periods in time series data
- Identifying dominant elements in sequences
- Stock market analysis (prices higher than all future prices)
- Competition rankings and leaderboards

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
