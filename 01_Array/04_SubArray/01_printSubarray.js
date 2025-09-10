// Print all SubArray

function printAllSubarrays(arr) {
  let n = arr.length;
  
  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      let subarray = [];
      for (let k = start; k <= end; k++) {
        subarray.push(arr[k]);
      }
      console.log(subarray);
    }
  }
}

// Example
printAllSubarrays([1, 2, 3]);


// Maximum Sum Of all SubArray

function maxSubarraySumBrute(arr) {
  let n = arr.length;
  let maxSum = -Infinity; // in case all numbers are negative

  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      let sum = 0;
      for (let k = start; k <= end; k++) {
        sum += arr[k];
      }
      maxSum = Math.max(maxSum, sum);
    }
  }

  return maxSum;
}

// Example
console.log(maxSubarraySumBrute([1, -2, 3, 4, -1, 2])); // Output: 8



// Sum of All SubArray

function sumOfAllSubarraysBrute(arr) {
  let n = arr.length;
  let total = 0;

  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      let sum = 0;
      for (let k = start; k <= end; k++) {
        sum += arr[k];
      }
      total += sum;
    }
  }

  return total;
}

// Example
console.log(sumOfAllSubarraysBrute([1, 2, 3])); // Output: 20



// Print all subarrays of size k

function printSubarraysOfSizeK(arr, k) {
  let n = arr.length;

  for (let start = 0; start <= n - k; start++) {
    let subarray = [];
    for (let j = start; j < start + k; j++) {
      subarray.push(arr[j]);
    }
    console.log(subarray);
  }
}

// Example
printSubarraysOfSizeK([1, 2, 3, 4, 5], 3);
