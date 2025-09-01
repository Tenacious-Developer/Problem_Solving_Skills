/*
============================================
REMOVE DUPLICATES FROM SORTED ARRAY
============================================

Problem Statement:
Given a sorted array, remove duplicates in-place such that each unique element appears only once. Return the new length of the array after removing duplicates.

Example:
Input: nums = [1, 1, 2, 2, 2, 3, 3]
Output: 3 (array becomes [1, 2, 3, _, _, _, _])
Explanation: First 3 elements are unique, rest can be ignored

Constraints:
- Array is sorted in non-decreasing order
- Modify array in-place with O(1) extra space
- Return new length of deduplicated array
- Don't need to care about elements beyond new length

Edge Cases:
- Empty array [] → return 0
- Single element [5] → return 1
- No duplicates [1, 2, 3, 4] → return 4 (no change)
- All duplicates [2, 2, 2, 2] → return 1 (array becomes [2, _, _, _])

Brute Force Logic:
- Use additional data structure (Set/Map) to track unique elements
- Copy unique elements back to original array
- Return count of unique elements

Time and Space Complexity (Brute Force):
- Time: O(n) - single pass through array
- Space: O(n) - additional Set/Map storage

Bottlenecks:
- Uses extra space when in-place modification required
- Doesn't leverage sorted array property efficiently
- Creates unnecessary data structures

Optimized Logic (Two Pointers - CORRECTED):
- Use write pointer (i) starting from first element (0)
- Use read pointer (j) starting from second element (1)
- When nums[j] != nums[i], move i forward and copy nums[j] to nums[i]
- When nums[j] == nums[i], just move j forward (skip duplicate)
- Pattern: Two pointers with in-place modification

Pseudo Code:
function removeDuplicates(nums):
    if nums.length == 0: return 0
    
    i = 0  // Write pointer - where to place next unique element
    
    for j from 1 to nums.length - 1:
        if nums[j] != nums[i]:  // Found different element
            i++                 // Move write pointer
            nums[i] = nums[j]   // Copy unique element
        // If nums[j] == nums[i], just continue (skip duplicate)
    
    return i + 1  // Length of deduplicated array

Time and Space Complexity (Optimized):
- Time: O(n) - single pass through array
- Space: O(1) - only pointer variables

Alternate Approach (Adjacent Comparison):
- Compare each element with next element
- If different, add current element to result
- Add last element separately
- Time: O(n), Space: O(n) for new array
*/

function removeDuplicates(nums) {
    if (nums.length === 0) {
        return 0;
    }
    
    let i = 0; // Write pointer - position for unique elements
    
    // Start reading from second element
    for (let j = 1; j < nums.length; j++) {
        // If current element is different from previous unique element
        if (nums[j] !== nums[i]) {
            i++; // Move write pointer to next position
            nums[i] = nums[j]; // Copy the unique element
        }
        // If nums[j] === nums[i], it's a duplicate, so skip it
    }
    
    // Return count of unique elements
    return i + 1;
}

// Alternative: Adjacent element comparison (creates new array)
function removeDuplicatesNewArray(nums) {
    if (nums.length === 0) {
        return [];
    }
    
    const result = [nums[0]]; // First element is always unique
    
    for (let i = 1; i < nums.length; i++) {
        // Add element only if it's different from previous
        if (nums[i] !== nums[i - 1]) {
            result.push(nums[i]);
        }
    }
    
    return result;
}

// Alternative: Using Set (violates space constraint but simple)
function removeDuplicatesSet(nums) {
    const uniqueArray = [...new Set(nums)];
    
    // Copy back to original array
    for (let i = 0; i < uniqueArray.length; i++) {
        nums[i] = uniqueArray[i];
    }
    
    return uniqueArray.length;
}

// Alternative: Step-by-step explanation version
function removeDuplicatesExplained(nums) {
    console.log('Original array:', nums);
    
    if (nums.length <= 1) {
        return nums.length;
    }
    
    let writeIndex = 0; // Where to write next unique element
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        console.log(`Comparing nums[${readIndex}]=${nums[readIndex]} with nums[${writeIndex}]=${nums[writeIndex]}`);
        
        if (nums[readIndex] !== nums[writeIndex]) {
            // Found a new unique element
            writeIndex++;
            nums[writeIndex] = nums[readIndex];
            console.log(`  Different! Moved to position ${writeIndex}: [${nums.slice(0, writeIndex + 1).join(', ')}]`);
        } else {
            console.log(`  Same! Skipping duplicate`);
        }
    }
    
    console.log('Final array (first', writeIndex + 1, 'elements):', nums.slice(0, writeIndex + 1));
    return writeIndex + 1;
}

/*
Pattern Recognition:
- Sorted array + in-place modification → two pointers technique
- Adjacent duplicates in sorted array → compare with previous unique element
- Space constraint O(1) → avoid additional data structures
- Similar to partition/stable sort in-place operations

Why Two Pointers Works (CORRECTED EXPLANATION):
1. Pointer i tracks position where next unique element should be placed
2. Pointer j scans through array looking for elements different from nums[i]
3. When nums[j] ≠ nums[i], we found a new unique element
4. Move i forward and copy nums[j] to nums[i]
5. When nums[j] = nums[i], it's a duplicate, so just continue scanning

Method Comparison:
1. Two Pointers: O(n) time, O(1) space, optimal for constraints
2. Set-based: O(n) time, O(n) space, violates space constraint
3. New array: O(n) time, O(n) space, easier to understand
4. Adjacent comparison: O(n) time, O(n) space, natural for sorted arrays

Test Cases:
removeDuplicates([1, 1, 2]) // 2, array becomes [1, 2, _]
removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]) // 5, array becomes [0, 1, 2, 3, 4, _, _, _, _, _]
removeDuplicates([]) // 0
removeDuplicates([1]) // 1
removeDuplicates([1, 2, 3]) // 3, no change needed

Pitfalls (CORRECTED):
- Starting both pointers at same position (should start j at 1)
- Not understanding that i points to last unique element position
- Comparing nums[j] with nums[j-1] instead of nums[i]
- Incrementing i before copying (should increment then copy)
- Not handling empty/single element edge cases

Key Insights:
- i always points to the last unique element we've placed
- j scans ahead looking for next unique element
- Only move i when we find something different from nums[i]
- The beauty is that we compare with the last unique element, not adjacent elements

Real-world Applications:
- Database index maintenance and optimization
- Removing duplicate records from sorted datasets
- Memory compaction in sorted data structures
- Preprocessing for binary search or other algorithms requiring unique elements

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
