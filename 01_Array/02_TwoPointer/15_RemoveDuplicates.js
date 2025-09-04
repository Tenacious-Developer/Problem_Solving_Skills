/*
============================================
REMOVE DUPLICATES FROM SORTED ARRAY
============================================


Problem Statement:
Given a sorted array, remove duplicates in-place such that each unique element appears only once. Return the new length of the array after removing duplicates. Don't allocate extra space for another array.


Example:
Input: nums = [1, 1, 2, 2, 2, 3, 3]
Output: 3 (array becomes [1, 2, 3, _, _, _, _])
Explanation: First 3 elements are unique, rest can be ignored


Constraints:
- Array is sorted in non-decreasing order
- Array length: 1 to 3 × 10^4
- Modify array in-place with O(1) extra space
- Return new length of deduplicated array
- Don't need to care about elements beyond new length


Edge Cases:
- Empty array [] → return 0
- Single element [5] → return 1
- No duplicates [1, 2, 3, 4] → return 4 (no change)
- All duplicates [2, 2, 2, 2] → return 1 (array becomes [2, _, _, _])
- Two elements [1, 1] → return 1


Brute Force Logic:
- Create temporary array to store unique elements
- Iterate through original array and add non-duplicate elements
- Copy unique elements back to original array
- Return count of unique elements


Brute Force Code:
function removeDuplicatesBrute(nums) {
    if (nums.length === 0) return 0;
    
    const unique = [nums[0]];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            unique.push(nums[i]);
        }
    }
    
    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }
    
    return unique.length;
}


Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(n) - temporary array storage


Bottlenecks:
- Uses extra space when in-place modification required
- Doesn't leverage sorted array property efficiently
- Violates O(1) space constraint of the problem


Optimized Logic Hints:
- Use two pointers for in-place modification
- One pointer tracks position for unique elements
- Another pointer scans through array
- Leverage sorted property - duplicates are adjacent


Optimized Logic (Two Pointers):
- Use write pointer (i) to track position where next unique element should go
- Use read pointer (j) to scan through array starting from second element
- When nums[j] != nums[i], increment i and copy nums[j] to nums[i]
- When nums[j] == nums[i], just continue scanning (skip duplicate)
- Return i + 1 as the new length


Pseudo Code:
function removeDuplicates(nums):
    if nums.length == 0: return 0
    
    i = 0  // Write pointer for unique elements
    
    for j from 1 to nums.length - 1:
        if nums[j] != nums[i]:  // Found new unique element
            i++
            nums[i] = nums[j]   // Place at next unique position
    
    return i + 1  // Length of deduplicated array


*/


//Optimized Code:
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let i = 0;
    
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    
    return i + 1;
}


// Test Cases:
removeDuplicates([1, 1, 2]) // 2, array becomes [1, 2, _]
removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]) // 5, array becomes [0, 1, 2, 3, 4, _, _, _, _, _]
removeDuplicates([]) // 0
removeDuplicates([1]) // 1
removeDuplicates([1, 2, 3]) // 3, no change needed


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only pointer variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Set-based Approach:
Logic:
- Use Set to automatically handle uniqueness
- Convert back to array and copy to original
- Return length of unique elements

Code:
function removeDuplicatesSet(nums) {
    const uniqueSet = new Set(nums);
    const uniqueArray = Array.from(uniqueSet);
    
    for (let i = 0; i < uniqueArray.length; i++) {
        nums[i] = uniqueArray[i];
    }
    
    return uniqueArray.length;
}
Time: O(n), Space: O(n)


2. Filter with indexOf:
Logic:
- Use filter to keep only first occurrence of each element
- Copy filtered result back to original array
- Return length of filtered array

Code:
function removeDuplicatesFilter(nums) {
    const unique = nums.filter((item, index) => nums.indexOf(item) === index);
    
    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }
    
    return unique.length;
}
Time: O(n²), Space: O(n)


3. Splice-based Approach:
Logic:
- Compare adjacent elements and remove duplicates using splice
- Continue until no more duplicates found
- Return final array length

Code:
function removeDuplicatesSplice(nums) {
    let i = 0;
    while (i < nums.length - 1) {
        if (nums[i] === nums[i + 1]) {
            nums.splice(i, 1);
        } else {
            i++;
        }
    }
    return nums.length;
}
Time: O(n²), Space: O(1)


Pattern Recognition:
- Sorted array + in-place modification → two pointers technique
- Adjacent duplicates in sorted array → compare consecutive elements
- Space constraint O(1) → avoid additional data structures
- Write pointer pattern for in-place array modification


Method Comparison:
1. Two Pointers: O(n) time, O(1) space, optimal for constraints
2. Set-based: O(n) time, O(n) space, violates space constraint
3. Filter: O(n²) time, O(n) space, inefficient and violates constraint
4. Splice: O(n²) time, O(1) space, inefficient due to splice cost
5. Brute Force: O(n) time, O(n) space, violates space constraint


Pitfalls:
- Not handling empty array or single element cases
- Forgetting to increment write pointer when unique element found
- Using splice() which shifts all remaining elements (expensive)
- Caring about elements beyond returned length (problem doesn't require this)
- Not leveraging sorted property (comparing with all previous elements instead of adjacent)


Key Insights:
- Two pointers technique provides optimal O(n) time, O(1) space solution
- Sorted array property makes duplicate removal much simpler
- Only need to compare adjacent elements due to sorting
- Write pointer tracks position for next unique element placement


Real-world Applications:
- Database index maintenance and optimization
- Removing duplicate records from sorted datasets
- Memory compaction in sorted data structures
- Preprocessing for binary search algorithms requiring unique elements
- Data deduplication in ETL processes


Algorithm Variants:
1. Allow up to k duplicates instead of removing all
2. Return actual deduplicated array instead of length
3. Remove duplicates while maintaining original relative order
4. Count removed duplicates along with deduplication


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
