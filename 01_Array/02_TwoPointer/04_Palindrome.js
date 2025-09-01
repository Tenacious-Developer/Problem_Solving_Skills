/*
============================================
CHECK IF ARRAY IS PALINDROME
============================================

Problem Statement:
Given an array of elements, determine if it reads the same forwards and backwards (palindrome property).

Example:
Input: [1, 2, 3, 2, 1]
Output: true
Input: [1, 2, 3, 4, 5]
Output: false

Constraints:
- Array length: 0 to 10^6
- Elements can be numbers, strings, or any comparable type
- Handle empty array and single element cases
- Case-sensitive comparison for strings

Edge Cases:
- Empty array [] → true (by convention)
- Single element [5] → true (trivially palindrome)
- Two elements [1,1] → true, [1,2] → false
- Even length [1,2,2,1] → true
- Odd length [1,2,3,2,1] → true
- Mixed types - handle consistently

Brute Force Logic:
- Create a reversed copy of the array
- Compare original array with reversed array element by element
- Return true if all elements match

Time and Space Complexity (Brute Force):
- Time: O(n) - create reverse + compare
- Space: O(n) - reversed array storage

Bottlenecks:
- Creating full reversed copy uses extra space
- Two full passes (reverse creation + comparison)
- Can determine non-palindrome without full reversal

Optimized Logic (Two Pointers):
- Use two pointers: left (start) and right (end)
- Compare elements at left and right positions
- Move pointers toward center
- Return false immediately if mismatch found
- Pattern: Two pointers convergence with early termination

Pseudo Code:
function isPalindrome(arr):
    if arr.length <= 1: return true
    
    left = 0
    right = arr.length - 1
    
    while left < right:
        if arr[left] !== arr[right]:
            return false
        left++
        right--
    
    return true

Time and Space Complexity (Optimized):
- Time: O(n/2) = O(n) - compare up to n/2 elements
- Space: O(1) - only pointer variables

Alternate Approach (Array Methods):
- Use arr.every() with index comparison
- Compare each element with its mirror position
- Functional programming style
- Time: O(n), Space: O(1)
*/

function isPalindrome(arr) {
    // Handle edge cases
    if (arr.length <= 1) {
        return true;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    // Compare elements from both ends moving toward center
    while (left < right) {
        if (arr[left] !== arr[right]) {
            return false; // Early termination
        }
        left++;
        right--;
    }
    
    return true;
}

// Alternative: Using array reversal (brute force)
function isPalindromeBrute(arr) {
    if (arr.length <= 1) {
        return true;
    }
    
    // Create reversed copy and compare
    const reversed = [...arr].reverse();
    
    // Compare arrays element by element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== reversed[i]) {
            return false;
        }
    }
    
    return true;
}

// Alternative: Using Array.every() method
function isPalindromeEvery(arr) {
    return arr.every((element, index) => 
        element === arr[arr.length - 1 - index]
    );
}

// Alternative: Using JSON stringify comparison
function isPalindromeJSON(arr) {
    const reversed = [...arr].reverse();
    return JSON.stringify(arr) === JSON.stringify(reversed);
}

// Alternative: Recursive approach
function isPalindromeRecursive(arr, start = 0, end = arr.length - 1) {
    // Base case: single element or empty range
    if (start >= end) {
        return true;
    }
    
    // Check current pair and recurse
    if (arr[start] === arr[end]) {
        return isPalindromeRecursive(arr, start + 1, end - 1);
    } else {
        return false;
    }
}

/*
Pattern Recognition:
- Symmetric property checking → two pointers technique
- Early termination possible → avoid full comparison when false
- Array mirroring → compare element with its mirror position
- Similar to string palindrome checking

Method Comparison:
1. Two Pointers: O(n) time, O(1) space, early termination
2. Array Reversal: O(n) time, O(n) space, full comparison
3. Array.every(): O(n) time, O(1) space, functional style
4. Recursive: O(n) time, O(n) space (call stack), educational
5. JSON stringify: O(n) time, O(n) space, compact but inefficient

Test Cases:
isPalindrome([1, 2, 3, 2, 1]) // true
isPalindrome([1, 2, 3, 4, 5]) // false
isPalindrome([]) // true
isPalindrome([5]) // true
isPalindrome([1, 1]) // true
isPalindrome([1, 2]) // false
isPalindrome(['a', 'b', 'a']) // true
isPalindrome([1, 2, 2, 1]) // true

Pitfalls:
- Not handling empty array or single element cases
- Using wrong comparison operator (!== vs !=)
- Off-by-one errors in pointer movement
- Not stopping when pointers meet or cross
- Forgetting early termination optimization
- Case sensitivity issues with string elements

Key Insights:
- Two pointers is optimal for palindrome checking
- Early termination saves time on non-palindromes
- Works for any comparable data types
- Mirror position formula: arr[i] vs arr[length-1-i]

Real-world Applications:
- Data validation and verification
- Sequence pattern analysis
- Bioinformatics (DNA sequence analysis)
- Quality assurance for symmetric data structures

Performance Notes:
- Two pointers approach is most efficient
- Best case: O(1) if first and last elements differ
- Worst case: O(n) for actual palindromes
- Space complexity is always O(1) with two pointers

Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
