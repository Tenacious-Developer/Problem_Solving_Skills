/*
============================================
FIND PAIR WITH SUM CLOSEST TO ZERO
============================================

Problem Statement:
Given an array of integers, find two elements whose sum is closest to zero. Return the sum value or the pair of elements.

Example:
Input: [1, 60, -10, 70, -80, 85]
Output: 5 (from -80 + 85 = 5)
Or return the pair: [-80, 85]

Constraints:
- Array length: at least 2 elements
- Elements can be positive, negative, or zero
- If multiple pairs have same absolute difference, return the one with larger sum
- Cannot use the same element twice

Edge Cases:
- Exact zero sum: [1, -1, 2] → 0 (from 1 + (-1) = 0)
- All positive: [1, 2, 3, 4] → 3 (from 1 + 2 = 3)
- All negative: [-4, -3, -2, -1] → -3 (from -1 + (-2) = -3)
- Two elements: [5, -7] → -2 (only one pair possible)
- Multiple solutions with same distance: [-2, -1, 1, 2] → could be 0 from (-1,1) or (-2,2)

Brute Force Logic:
- Check all possible pairs using nested loops
- Calculate sum for each pair
- Track the pair with minimum absolute sum
- Return the closest sum or pair

Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops check all pairs
- Space: O(1) - only tracking variables

Bottlenecks:
- Checking all n*(n-1)/2 pairs even when better solution exists
- No early termination when exact zero found
- Not utilizing any ordering properties

Optimized Logic (Two Pointers - Sorted Array):
- Sort the array first
- Use two pointers: left at start, right at end
- Calculate sum = arr[left] + arr[right]
- If sum == 0, return immediately (perfect match)
- If sum > 0, move right pointer left (reduce sum)
- If sum < 0, move left pointer right (increase sum)
- Track minimum absolute sum throughout
- Pattern: Two pointers with optimal movement based on sum

Pseudo Code:
function closestToZeroSum(arr):
    sort(arr)
    left = 0, right = arr.length - 1
    minSum = arr[left] + arr[right]
    
    while left < right:
        sum = arr[left] + arr[right]
        
        if sum == 0:
            return 0  // Perfect match
        
        if abs(sum) < abs(minSum):
            minSum = sum
        else if abs(sum) == abs(minSum):
            minSum = max(minSum, sum)  // Prefer larger sum for ties
        
        if sum > 0:
            right--  // Reduce sum
        else:
            left++   // Increase sum
    
    return minSum

Time and Space Complexity (Optimized):
- Time: O(n log n) - sorting dominates, then O(n) for two pointers
- Space: O(1) - only pointer variables (excluding sort space)

Alternate Approach (Binary Search):
- For each element, use binary search to find closest complement
- More complex but useful when array is already sorted
- Time: O(n log n), Space: O(1)
*/

function closestToZeroSum(arr) {
    if (arr.length < 2) {
        throw new Error('Array must have at least 2 elements');
    }
    
    // Sort array to enable two pointers approach
    arr.sort((a, b) => a - b);
    
    let left = 0;
    let right = arr.length - 1;
    let minSum = arr[left] + arr[right];
    
    while (left < right) {
        const currentSum = arr[left] + arr[right];
        
        // Perfect match - can't get closer to zero
        if (currentSum === 0) {
            return 0;
        }
        
        // Update minimum if current sum is closer to zero
        if (Math.abs(currentSum) < Math.abs(minSum)) {
            minSum = currentSum;
        } 
        // If same distance from zero, prefer the larger sum
        else if (Math.abs(currentSum) === Math.abs(minSum)) {
            minSum = Math.max(minSum, currentSum);
        }
        
        // Move pointers based on sum
        if (currentSum > 0) {
            // Sum is positive, need smaller sum
            right--;
        } else {
            // Sum is negative, need larger sum
            left++;
        }
    }
    
    return minSum;
}

// Alternative: Return the actual pair instead of just sum
function closestToZeroPair(arr) {
    if (arr.length < 2) {
        throw new Error('Array must have at least 2 elements');
    }
    
    arr.sort((a, b) => a - b);
    
    let left = 0;
    let right = arr.length - 1;
    let minSum = arr[left] + arr[right];
    let bestPair = [arr[left], arr[right]];
    
    while (left < right) {
        const currentSum = arr[left] + arr[right];
        
        if (currentSum === 0) {
            return [arr[left], arr[right]];
        }
        
        if (Math.abs(currentSum) < Math.abs(minSum) || 
           (Math.abs(currentSum) === Math.abs(minSum) && currentSum > minSum)) {
            minSum = currentSum;
            bestPair = [arr[left], arr[right]];
        }
        
        if (currentSum > 0) {
            right--;
        } else {
            left++;
        }
    }
    
    return bestPair;
}

// Alternative: Brute force approach (for comparison)
function closestToZeroSumBrute(arr) {
    if (arr.length < 2) {
        throw new Error('Array must have at least 2 elements');
    }
    
    let minSum = arr[0] + arr[1];
    
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const currentSum = arr[i] + arr[j];
            
            if (currentSum === 0) {
                return 0; // Perfect match
            }
            
            if (Math.abs(currentSum) < Math.abs(minSum) || 
               (Math.abs(currentSum) === Math.abs(minSum) && currentSum > minSum)) {
                minSum = currentSum;
            }
        }
    }
    
    return minSum;
}

// Alternative: Using binary search (when array is already sorted)
function closestToZeroSumBinarySearch(arr) {
    arr.sort((a, b) => a - b);
    let minSum = Number.MAX_SAFE_INTEGER;
    
    for (let i = 0; i < arr.length - 1; i++) {
        const target = -arr[i]; // Looking for complement
        let left = i + 1;
        let right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const currentSum = arr[i] + arr[mid];
            
            if (currentSum === 0) {
                return 0;
            }
            
            if (Math.abs(currentSum) < Math.abs(minSum) || 
               (Math.abs(currentSum) === Math.abs(minSum) && currentSum > minSum)) {
                minSum = currentSum;
            }
            
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return minSum;
}

/*
Pattern Recognition:
- Find optimal pair with specific criteria → two pointers on sorted array
- Minimize absolute value → track running minimum with comparison
- Early termination possible → return immediately when exact match found
- Similar to two sum but optimizing for closest to target (zero)

Method Comparison:
1. Two Pointers: O(n log n) time, O(1) space, optimal for general case
2. Brute Force: O(n²) time, O(1) space, simple but inefficient
3. Binary Search: O(n log n) time, O(1) space, good when already sorted

Test Cases:
closestToZeroSum([1, 60, -10, 70, -80, 85]) // 5 (from -80 + 85)
closestToZeroSum([1, -1, 0, 2]) // 0 (from 1 + (-1) or 0 + 0 if allowed)
closestToZeroSum([2, 3, 4]) // 5 (from 2 + 3)
closestToZeroSum([-2, -1, 1, 2]) // 0 (from -1 + 1 or -2 + 2)
closestToZeroSum([5, -7]) // -2 (only one pair)

Pitfalls:
- Not handling exact zero sum case (early return optimization)
- Forgetting tie-breaking rule (prefer larger sum when absolute values equal)
- Not sorting array before using two pointers approach
- Using same element twice (ensure i ≠ j in loops)
- Index out of bounds in pointer movements

Key Insights:
- Sorting enables efficient two pointers technique
- Two pointers approach systematically explores solution space
- Early termination when exact zero found saves computation
- Tie-breaking rule important for consistent results across implementations

Real-world Applications:
- Portfolio optimization (balancing positive/negative returns)
- Chemical equations balancing
- Financial transactions netting
- Error correction in measurements
- Game theory equilibrium finding

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
