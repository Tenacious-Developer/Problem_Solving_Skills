/*
============================================
BEST TIME TO BUY AND SELL STOCK
============================================


Problem Statement:
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock 
and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. 
If you cannot achieve any profit, return 0.

Key constraints:
- You can only buy and sell once (single transaction)
- You must buy before you sell (buy day < sell day)
- Cannot buy and sell on the same day


Example:
Input: prices = [7, 1, 5, 3, 6, 4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6)
Profit = 6 - 1 = 5

Input: prices = [7, 6, 4, 3, 1]
Output: 0
Explanation: Prices keep decreasing, so no profit possible


Constraints:
- 1 ≤ prices.length ≤ 10^5
- 0 ≤ prices[i] ≤ 10^4
- Must buy before selling (temporal constraint)
- Only one transaction allowed


Edge Cases:
- Single day [5] → 0 (cannot buy and sell on same day)
- Decreasing prices [7, 6, 5, 4] → 0 (no profit possible)
- Increasing prices [1, 2, 3, 4] → 3 (buy first, sell last)
- All same prices [3, 3, 3, 3] → 0 (no profit)
- Minimum then maximum [5, 1, 3, 6, 4] → 5 (buy at 1, sell at 6)


Brute Force Logic:
- Check every possible buy-sell pair where buy day < sell day
- For each buy day i, check all sell days j where j > i
- Track maximum profit across all valid pairs
- Return the maximum profit found


Brute Force Code:
function maxProfitBrute(prices) {
    let maxProfit = 0;
    
    for (let buyDay = 0; buyDay < prices.length - 1; buyDay++) {
        for (let sellDay = buyDay + 1; sellDay < prices.length; sellDay++) {
            const profit = prices[sellDay] - prices[buyDay];
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    
    return maxProfit;
}


Time and Space Complexity (Brute Force):
- Time: O(n²) - nested loops checking all buy-sell pairs
- Space: O(1) - only using variables for tracking profit


Bottlenecks:
- Redundant calculations checking all pairs when optimal buy day is the minimum seen so far
- No efficient way to track the minimum buying price while iterating
- Quadratic time complexity doesn't leverage the sequential nature of stock prices


Optimized Logic Hints:
- For any selling day, the best buying day is the one with minimum price before it
- Track minimum price seen so far while iterating through prices
- Calculate profit at each position assuming we sell on that day
- Keep updating maximum profit found


Optimized Logic (Single Pass with Running Minimum):
- Key insight: To maximize profit when selling on day i, buy on the day with minimum price from day 0 to i-1
- Maintain running minimum of prices seen so far (potential buy price)
- For each day, calculate profit if we sell on that day using current minimum as buy price
- Update maximum profit if current profit is better
- Update minimum price if current price is lower (for future sell days)


Pseudo Code:
function maxProfit(prices):
    maxProfit = 0
    minPrice = infinity  // Track minimum price seen so far
    
    for each price in prices:
        // Calculate profit if we sell at current price
        currentProfit = price - minPrice
        maxProfit = max(maxProfit, currentProfit)
        
        // Update minimum price for future selling opportunities
        minPrice = min(minPrice, price)
    
    return maxProfit


*/


//Optimized Code:
function maxProfit(prices) {
    let maxProfit = 0;
    let minPrice = Infinity;
    
    for (const price of prices) {
        // Calculate profit if we sell at current price
        const currentProfit = price - minPrice;
        maxProfit = Math.max(maxProfit, currentProfit);
        
        // Update minimum price for future sell opportunities
        minPrice = Math.min(minPrice, price);
    }
    
    return maxProfit;
}


// Test Cases:
maxProfit([7, 1, 5, 3, 6, 4]) // 5 (buy at 1, sell at 6)
maxProfit([7, 6, 4, 3, 1]) // 0 (no profit possible)
maxProfit([1, 2, 3, 4, 5]) // 4 (buy at 1, sell at 5)
maxProfit([5]) // 0 (single day)
maxProfit([3, 3, 3, 3]) // 0 (no price change)


/*
Time and Space Complexity (Optimized):
- Time: O(n) - single pass through prices array
- Space: O(1) - only using two variables


All Other Approaches (that uses other data structures or algorithms other than this array topic):


1. Dynamic Programming Approach:
Logic:
- Use DP states: dp[i][0] = max profit on day i without holding stock
- dp[i][1] = max profit on day i while holding stock
- Transitions: buy stock or sell stock at each day
- More general approach that extends to multiple transactions

Code:
function maxProfitDP(prices) {
    const n = prices.length;
    if (n <= 1) return 0;
    
    // dp[i][0] = max profit on day i without stock
    // dp[i][1] = max profit on day i with stock
    const dp = Array(n).fill().map(() => [0, 0]);
    
    dp[0][0] = 0;           // No stock on day 0
    dp[0][1] = -prices[0];  // Bought stock on day 0
    
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]); // Sell or hold
        dp[i][1] = Math.max(dp[i-1][1], -prices[i]);             // Hold or buy (only one transaction)
    }
    
    return dp[n-1][0]; // End without holding stock
}
Time: O(n), Space: O(n)


2. Divide and Conquer:
Logic:
- Split array into halves recursively
- Maximum profit is either in left half, right half, or crossing the middle
- For crossing case, find min in left and max in right
- More complex but demonstrates divide and conquer pattern

Code:
function maxProfitDivideConquer(prices) {
    function helper(left, right) {
        if (left >= right) return 0;
        
        const mid = Math.floor((left + right) / 2);
        
        // Max profit in left half
        const leftProfit = helper(left, mid);
        
        // Max profit in right half
        const rightProfit = helper(mid + 1, right);
        
        // Max profit crossing middle (buy in left, sell in right)
        let minLeft = Infinity;
        for (let i = left; i <= mid; i++) {
            minLeft = Math.min(minLeft, prices[i]);
        }
        
        let maxRight = -Infinity;
        for (let i = mid + 1; i <= right; i++) {
            maxRight = Math.max(maxRight, prices[i]);
        }
        
        const crossProfit = maxRight - minLeft;
        
        return Math.max(leftProfit, rightProfit, crossProfit);
    }
    
    return Math.max(0, helper(0, prices.length - 1));
}
Time: O(n log n), Space: O(log n)


3. Stack-based Approach:
Logic:
- Use stack to keep track of potential buying opportunities
- When price increases, calculate profit with previous lower prices
- More complex than needed for this problem but shows stack usage
- Better suited for problems with multiple transactions

Code:
function maxProfitStack(prices) {
    const stack = [];
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        // Remove higher prices from stack (they won't be optimal buy prices)
        while (stack.length && prices[stack[stack.length - 1]] >= prices[i]) {
            stack.pop();
        }
        
        // If stack not empty, calculate profit with lowest price in stack
        if (stack.length) {
            maxProfit = Math.max(maxProfit, prices[i] - prices[stack[0]]);
        }
        
        stack.push(i);
    }
    
    return maxProfit;
}
Time: O(n), Space: O(n)


Pattern Recognition:
- Single transaction optimization → track minimum so far and calculate running maximum profit
- Buy low, sell high with temporal constraint → greedy approach with running minimum
- Maximum subarray-like problem → can be solved in single pass
- Optimal substructure → best selling day uses globally minimum buying price before it


Method Comparison:
1. Running Minimum: O(n) time, O(1) space, optimal and intuitive
2. Dynamic Programming: O(n) time, O(n) space, generalizes to multiple transactions
3. Divide & Conquer: O(n log n) time, O(log n) space, demonstrates recursion
4. Stack-based: O(n) time, O(n) space, overkill for single transaction
5. Brute Force: O(n²) time, O(1) space, checks all pairs inefficiently


Pitfalls:
- Forgetting that you must buy before selling (temporal constraint)
- Not handling edge case of single day or no profit scenarios
- Using complex approaches when simple greedy solution suffices
- Not understanding that minimum price seen so far is always optimal buy price
- Confusing this with multiple transaction variants of the problem


Key Insights:
- Greedy approach works because optimal buy day is always the minimum price seen so far
- Single pass solution possible due to the temporal constraint (buy before sell)
- Problem reduces to finding maximum difference where second element comes after first
- Similar to maximum subarray but with non-negative profit constraint


Real-world Applications:
- Stock trading strategy optimization
- Commodity trading (buy low, sell high)
- Currency exchange optimization
- Resource allocation over time
- Investment timing decisions
- Supply chain cost optimization


Algorithm Variants:
1. Multiple transactions allowed (Buy Sell Stock II)
2. At most k transactions (Buy Sell Stock IV)  
3. With transaction fee (Buy Sell Stock with Fee)
4. With cooldown period (Buy Sell Stock with Cooldown)
5. Multiple stocks simultaneously


Review Schedule:
[ ] 1 day later
[ ] 1 week later  
[ ] 1 month later
*/
