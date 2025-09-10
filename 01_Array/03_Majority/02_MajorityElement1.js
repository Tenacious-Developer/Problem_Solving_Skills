/*
============================================
MAJORITY ELEMENT (GREATER THAN N/3 TIMES)
============================================


Problem Statement:
Given an integer array of size n, find all elements that appear more than ⌊n/3⌋ times.

The key insight is that there can be at most 2 elements that can appear more than n/3 times.
This is because if 3 elements each appeared more than n/3 times, their combined count 
would exceed n, which is impossible.

Mathematical proof: If 3 elements each appear > n/3 times, 
total count > 3 × (n/3) = n, which violates array size constraint.


Example:
Input: nums = [3, 2, 3]
Output: [3]
Explanation: 3 appears 2 times out of 3, which is > 3/3 = 1

Input: nums = [1, 1, 1, 3, 3, 2, 2, 2]  
Output: [1, 2]
Explanation: Both 1 and 2 appear 3 times out of 8, which is > 8/3 = 2.67


Constraints:
- 1 ≤ nums.length ≤ 5 × 10^4
- -10^9 ≤ nums[i] ≤ 10^9
- Return elements in any order
- At most 2 elements can satisfy the condition


Edge Cases:
- Single element [5] → [5] (appears 1 time, which is > 1/3)
- Two elements same [1, 1] → [1] (appears 2 times, which is > 2/3)
- Two elements different [1, 2] → [] (each appears 1 time, which is not > 2/3)
- All elements same [3, 3, 3, 3] → [3]
- No majority elements [1, 2, 3, 4, 5, 6] → []
- Two majority elements [1, 1, 1, 2, 2, 2, 3] → [1, 2]


Brute Force Logic:
- For each unique element in the array, count its occurrences
- Use nested loops: outer loop selects candidate, inner loop counts frequency
- Collect all elements whose count exceeds n/3
- Since at most 2 elements can qualify, stop early when found 2


Brute Force Code:
function majorityElementBrute(nums) {
    const n = nums.length;
    const result = [];
    const processed = new Set();
    
    for (let i = 0; i < n; i++) {
        if (processed.has(nums[i])) continue;
        
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }
        
        if (count > Math.floor(n / 3)) {
            result.push(nums[i]);
        }
        
        processed.add(nums[i]);
        
        if (result.length === 2) break; // At most 2 elements possible
    }
    
    return result;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops for counting each unique element
- Space: O(n) - processed set to avoid duplicate counting


Bottlenecks:
- Redundant counting of same elements multiple times
- No efficient mechanism to track potential candidates
- Quadratic time complexity doesn't leverage the n/3 constraint
- Need to track processed elements to avoid duplicates


Optimized Logic Hints:
- Extend Boyer-Moore Majority Vote Algorithm for two candidates
- Since at most 2 elements can appear > n/3 times, maintain 2 candidates
- Use voting mechanism where candidates compete for votes
- Verify candidates in second pass to confirm they actually exceed n/3


Optimized Logic (Extended Boyer-Moore Voting):
- Maintain two candidates (candidate1, candidate2) and their counts (count1, count2)
- Phase 1 - Find potential candidates:
  - If current element matches candidate1, increment count1
  - Else if current element matches candidate2, increment count2  
  - Else if count1 is 0, set current element as candidate1
  - Else if count2 is 0, set current element as candidate2
  - Else decrement both counts (voting against both candidates)
- Phase 2 - Verify candidates actually appear > n/3 times


Pseudo Code:
function majorityElement(nums):
    // Phase 1: Find potential candidates
    candidate1 = null, candidate2 = null
    count1 = 0, count2 = 0
    
    for each num in nums:
        if candidate1 == num:
            count1++
        elif candidate2 == num:
            count2++
        elif count1 == 0:
            candidate1 = num
            count1 = 1
        elif count2 == 0:
            candidate2 = num
            count2 = 1
        else:
            count1--
            count2--
    
    // Phase 2: Verify candidates
    result = []
    threshold = floor(n / 3)
    
    if candidate1 != null and countOccurrences(candidate1) > threshold:
        result.push(candidate1)
    if candidate2 != null and candidate2 != candidate1 and countOccurrences(candidate2) > threshold:
        result.push(candidate2)
    
    return result


*/


//Optimized Code:
function majorityElement(nums) {
    const n = nums.length;
    
    // Phase 1: Find potential candidates using voting
    let candidate1 = null, candidate2 = null;
    let count1 = 0, count2 = 0;
    
    for (const num of nums) {
        if (candidate1 === num) {
            count1++;
        } else if (candidate2 === num) {
            count2++;
        } else if (count1 === 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }
    
    // Phase 2: Verify candidates actually appear > n/3 times
    const result = [];
    const threshold = Math.floor(n / 3);
    
    // Count occurrences of candidate1
    let actualCount1 = 0;
    if (candidate1 !== null) {
        for (const num of nums) {
            if (num === candidate1) actualCount1++;
        }
        if (actualCount1 > threshold) {
            result.push(candidate1);
        }
    }
    
    // Count occurrences of candidate2
    let actualCount2 = 0;
    if (candidate2 !== null && candidate2 !== candidate1) {
        for (const num of nums) {
            if (num === candidate2) actualCount2++;
        }
        if (actualCount2 > threshold) {
            result.push(candidate2);
        }
    }
    
    return result;
}


// Test Cases:
majorityElement([3, 2, 3]) // [3]
majorityElement([1, 1, 1, 3, 3, 2, 2, 2]) // [1, 2]
majorityElement([1]) // [1]
majorityElement([1, 2]) // []
majorityElement([2, 2, 1, 3]) // []
majorityElement([0, 0, 0]) // [0]


/*
Time and Space Complexity (Optimized):
- Time: O(n) - two passes through array (one for voting, one for verification)
- Space: O(1) - only using constant variables for candidates and counts


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Hash Map Frequency Counting:
Logic:
- Use hash map to count frequency of each element
- Return all elements whose count exceeds n/3
- Straightforward but uses extra space
- Can optimize with early termination when 2 elements found

Code:
function majorityElementHashMap(nums) {
    const n = nums.length;
    const threshold = Math.floor(n / 3);
    const countMap = new Map();
    const result = [];
    
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    for (const [num, count] of countMap) {
        if (count > threshold) {
            result.push(num);
            if (result.length === 2) break; // At most 2 possible
        }
    }
    
    return result;
}
Time: O(n), Space: O(n)


2. Sorting and Counting:
Logic:
- Sort the array first to group identical elements
- Count consecutive identical elements
- Check if any group size exceeds n/3
- Modifies input array unless copy is made

Code:
function majorityElementSort(nums) {
    const n = nums.length;
    const threshold = Math.floor(n / 3);
    const result = [];
    
    nums.sort((a, b) => a - b);
    
    let i = 0;
    while (i < n) {
        const current = nums[i];
        let count = 1;
        
        while (i + count < n && nums[i + count] === current) {
            count++;
        }
        
        if (count > threshold) {
            result.push(current);
            if (result.length === 2) break;
        }
        
        i += count;
    }
    
    return result;
}
Time: O(n log n), Space: O(1)


3. Divide and Conquer:
Logic:
- Recursively split array into halves
- Find majority elements in each half
- Merge results and verify candidates across full array
- Overkill for this problem but demonstrates technique

Code:
function majorityElementDivideConquer(nums) {
    function countInRange(num, left, right) {
        let count = 0;
        for (let i = left; i <= right; i++) {
            if (nums[i] === num) count++;
        }
        return count;
    }
    
    function majorityRec(left, right) {
        if (left === right) return [nums[left]];
        
        const mid = Math.floor((left + right) / 2);
        const leftCandidates = majorityRec(left, mid);
        const rightCandidates = majorityRec(mid + 1, right);
        
        const candidates = new Set([...leftCandidates, ...rightCandidates]);
        const result = [];
        const threshold = Math.floor((right - left + 1) / 3);
        
        for (const candidate of candidates) {
            if (countInRange(candidate, left, right) > threshold) {
                result.push(candidate);
                if (result.length === 2) break;
            }
        }
        
        return result;
    }
    
    return majorityRec(0, nums.length - 1);
}
Time: O(n log n), Space: O(log n)


Pattern Recognition:
- At most k elements appearing > n/(k+1) times → Extended Boyer-Moore for k candidates
- Voting mechanism with multiple candidates → generalized majority voting
- Verification phase required → candidates from voting need confirmation
- Mathematical constraint limits possibilities → at most 2 elements for n/3


Method Comparison:
1. Extended Boyer-Moore: O(n) time, O(1) space, optimal and elegant
2. Hash Map: O(n) time, O(n) space, intuitive but uses extra space  
3. Sorting: O(n log n) time, O(1) space, simple but slower
4. Divide & Conquer: O(n log n) time, O(log n) space, demonstrates recursion
5. Brute Force: O(n²) time, O(n) space, inefficient nested loops


Pitfalls:
- Forgetting verification phase after candidate selection
- Not handling case where candidates are identical
- Assuming exactly 2 elements will be found (could be 0, 1, or 2)
- Not leveraging the mathematical constraint that at most 2 elements possible
- Infinite loop if not properly handling candidate updates


Key Insights:
- Extended Boyer-Moore naturally handles multiple candidates through voting
- Mathematical proof limits search space to at most 2 elements
- Verification phase is essential as voting only finds potential candidates
- Algorithm elegantly extends single majority element solution


Real-world Applications:
- Finding dominant categories in multi-class datasets
- Consensus algorithms in distributed systems with multiple leaders
- Market analysis (products with significant market share)
- Social media analysis (influential users or trending topics)
- Quality control (identifying major defect types)
- Network analysis (identifying major traffic patterns)


Algorithm Variants:
1. Find elements appearing > n/k times (generalize to k candidates)
2. Return frequencies along with elements
3. Handle streaming data version
4. Find majority elements in 2D arrays
5. Weighted majority elements (elements have different weights)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
