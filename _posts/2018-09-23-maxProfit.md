---
layout: post
title:  "188. 买卖股票的最佳时机 IV"
categories: 算法
tags: leetcode 动态规划
---

* content
{:toc}

<!--more-->

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

```
输入: [2,4,1], k = 2
输出: 2
解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```

示例 2:

```
输入: [3,2,6,5,0,3], k = 2
输出: 7
解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
```

解：很难，没看懂，能做出来的都是天选之子。

[参考](https://segmentfault.com/a/1190000003483697)

```
public class Solution {
    public int maxProfit(int k, int[] prices) {
        if(prices.length == 0) return 0;
        //用II的解法优化k > prices.length / 2的情况
        if(k > prices.length / 2){
            int sum = 0;
            for(int i = 1; i < prices.length; i++){
                if(prices[i]>prices[i-1]) sum += prices[i] - prices[i-1];
            }
            return sum;
        }
        //初始化全局变量和局部变量
        int[][] global = new int[prices.length][k+1];
        int[][] local = new int[prices.length][k+1];
        for(int i = 1; i < prices.length; i++){
            int diff = prices[i] - prices[i-1];
            for(int j = 1; j < k + 1; j++){
                //更新局部变量
                local[i][j] = Math.max(global[i-1][j-1]+Math.max(0, diff), local[i-1][j]+diff);
                //更新全局变量
                global[i][j] = Math.max(global[i-1][j], local[i][j]);
            }
        }
        return global[prices.length - 1][k];
    }
}

```
