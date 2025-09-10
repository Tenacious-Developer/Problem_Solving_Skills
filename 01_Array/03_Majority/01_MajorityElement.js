/*
============================================
MAJORITY ELEMENT (GREATER THAN N/2 TIMES)
============================================


Problem Statement:
Given an array nums of size n, return the majority element. 
The majority element is the element that appears more than ⌊n/2⌋ times.

You may assume that the majority element always exists in the array.
This is a key constraint that allows for optimal solutions.


Example:
Input: nums = [3, 2, 3]
Output: 3
Explanation: 3 appears 2 times out of 3, which is > 3/2 = 1.5

Input: nums = [2, 2, 1, 1, 1, 2, 2]
Output: 2
Explanation: 2 appears 4 times out of 7, which is > 7/2 = 3.5


Constraints:
- n == nums.length
- 1 ≤ n ≤ 5 × 10^4
- -10^9 ≤ nums[i] ≤ 10^9
- The majority element always exists (appears more than n/2 times)


Edge Cases:
- Single element [5] → 5 (appears 1 time, which is > 1/2)
- Two elements same [1, 1] → 1 (appears 2 times, which is > 2/2 = 1)
- Two elements different - not valid per constraint (majority must exist)
- All elements same [3, 3, 3, 3] → 3
- Majority at beginning [1, 1, 1, 2, 3] → 1
- Majority at end [2, 3, 1, 1, 1] → 1


Brute Force Logic:
- For each unique element in the array, count its occurrences
- Use nested loops: outer loop selects candidate, inner loop counts frequency
- Return the first element whose count exceeds n/2
- Since majority is guaranteed to exist, we will find it


Brute Force Code:
function majorityElementBrute(nums) {
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        let count = 0;
        
        for (let j = 0; j < n; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }
        
        if (count > Math.floor(n / 2)) {
            return nums[i];
        }
    }
    
    return -1; // Should never reach here if majority exists
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops for counting each element
- Space: O(1) - only using counter variables


Bottlenecks:
- Redundant counting of same elements multiple times
- No efficient mechanism to track already counted elements
- Quadratic time complexity doesn't leverage the majority constraint


Optimized Logic Hints:
- Use Boyer-Moore Majority Vote Algorithm
- Key insight: if element appears more than n/2 times, it will "survive" pairwise cancellation
- Use voting mechanism where each element votes for itself
- Majority element will have net positive votes after all cancellations


Optimized Logic (Boyer-Moore Voting Algorithm):
- Maintain a candidate and count variable
- When count is 0, set current element as new candidate
- If current element matches candidate, increment count (vote for)
- If current element differs from candidate, decrement count (vote against)
- After single pass, candidate will be the majority element
- Since majority is guaranteed, no verification pass needed


Pseudo Code:
function majorityElement(nums):
    candidate = null
    count = 0
    
    for each num in nums:
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count++
        else:
            count--
    
    return candidate  // Guaranteed to be majority


*/


//Optimized Code:
function majorityElement(nums) {
    let candidate = null;
    let count = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    return candidate;
}


// Test Cases:
majorityElement([3, 2, 3]) // 3
majorityElement([2, 2, 1, 1, 1, 2, 2]) // 2
majorityElement([1]) // 1
majorityElement([1, 1, 2, 2, 2]) // 2
majorityElement([6, 5, 5]) // 5


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only using two variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Hash Map Frequency Counting:
Logic:
- Use hash map to count frequency of each element
- Return first element whose count exceeds n/2
- Early termination when majority found
- More intuitive but uses extra space

Code:
function majorityElementHashMap(nums) {
    const n = nums.length;
    const countMap = new Map();
    
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
        
        if (countMap.get(num) > Math.floor(n / 2)) {
            return num;
        }
    }
    
    return -1; // Should never reach here
}
Time: O(n), Space: O(n)


2. Sorting Approach:
Logic:
- Sort the array first
- The majority element must be at index n/2 in sorted array
- This works because majority appears more than n/2 times
- Simple but modifies array and has higher time complexity

Code:
function majorityElementSort(nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}
Time: O(n log n), Space: O(1) or O(log n) for sorting


3. Randomized Algorithm:
Logic:
- Randomly pick elements and check if they are majority
- Expected time is O(n) since majority has high probability
- Keep trying until majority found
- Not deterministic but interesting approach

Code:
function majorityElementRandom(nums) {
    const n = nums.length;
    const majority = Math.floor(n / 2) + 1;
    
    while (true) {
        const candidate = nums[Math.floor(Math.random() * n)];
        let count = 0;
        
        for (const num of nums) {
            if (num === candidate) count++;
        }
        
        if (count >= majority) {
            return candidate;
        }
    }
}
Time: O(n) expected, Space: O(1)


4. Divide and Conquer:
Logic:
- Split array into halves recursively
- Find majority in each half
- Combine results by checking which candidate appears more
- Similar to merge sort structure

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
        if (left === right) return nums[left];
        
        const mid = Math.floor((left + right) / 2);
        const leftMajority = majorityRec(left, mid);
        const rightMajority = majorityRec(mid + 1, right);
        
        if (leftMajority === rightMajority) return leftMajority;
        
        const leftCount = countInRange(leftMajority, left, right);
        const rightCount = countInRange(rightMajority, left, right);
        
        return leftCount > rightCount ? leftMajority : rightMajority;
    }
    
    return majorityRec(0, nums.length - 1);
}
Time: O(n log n), Space: O(log n)


Pattern Recognition:
- Majority element (> n/2) → Boyer-Moore voting algorithm
- Frequency counting → hash map or sorting approaches
- Guaranteed majority exists → enables optimal single-pass solutions
- Voting/cancellation mechanism → mathematical property of majority


Method Comparison:
1. Boyer-Moore: O(n) time, O(1) space, optimal and elegant
2. Hash Map: O(n) time, O(n) space, intuitive but uses extra space
3. Sorting: O(n log n) time, O(1) space, simple property-based approach
4. Randomized: O(n) expected time, O(1) space, probabilistic approach
5. Divide & Conquer: O(n log n) time, O(log n) space, demonstrates recursion
6. Brute Force: O(n²) time, O(1) space, inefficient nested loops


Pitfalls:
- Not understanding that majority is guaranteed to exist in this problem
- Implementing verification pass when it's not needed due to guarantee
- Using inefficient approaches when Boyer-Moore exists
- Forgetting to handle edge cases like single element arrays
- Modifying input array in sorting approach when not allowed


Key Insights:
- Boyer-Moore algorithm leverages mathematical property of majority elements
- Voting mechanism naturally eliminates minority elements through cancellation
- Single pass suffices when majority existence is guaranteed
- The algorithm works because majority survives all pairwise cancellations


Real-world Applications:
- Finding most frequent category in large datasets
- Consensus algorithms in distributed systems
- Data stream analysis for dominant patterns
- Quality control (finding most common defect type)
- Network traffic analysis (identifying dominant traffic type)
- Election systems (finding winning candidate)


Algorithm Variants:
1. Find majority element vs verify if majority exists
2. Return element vs return its count/frequency
3. Handle case where no majority exists (requires verification pass)
4. Find all elements appearing more than n/3 times (different algorithm needed)
5. Find majority in stream of data (online algorithm)


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
