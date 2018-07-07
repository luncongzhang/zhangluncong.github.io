---
layout: post
title:  "120. 三角形最小路径和"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

例如，给定三角形：

```
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```

说明：

如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题，那么你的算法会很加分。

解1：动态规划，三部曲。

定义状态：dp[i][j]

初始化：...

状态转移，递推公式：dp[i][j]=dp[i-1][j-1]+dp[i-1][j]+triangle.get(i).get(j)


```

    /**
     *
     * @param triangle
     * @return
     */
    public int minimumTotal(List<List<Integer>> triangle) {
        //定义状态dp[i][j]为三角形第i行j列的最短路径
        int hight = triangle.size();
        int[][] dp = new int[hight][hight];

        //初始化
        for (int i = 0; i < hight; i++) {
            if (i == 0) {
                dp[0][0] = triangle.get(0).get(0);
            } else {
                dp[i][0] = dp[i - 1][0] + triangle.get(i).get(0);
                dp[i][i] = dp[i - 1][i - 1] + triangle.get(i).get(i);
            }
        }
        //状态转移，递推公式dp[i][j]=dp[i-1][j-1]+dp[i-1][j]+triangle.get(i).get(j)
        for (int row = 0; row < hight; row++) {
            for (int i = 1; i < triangle.get(row).size() - 1; i++) {
                dp[row][i] = Math.min(dp[row - 1][i - 1], dp[row - 1][i]) + triangle.get(row).get(i);
            }
        }
        //最后一行求最小
        int rtn = dp[hight - 1][0];
        for (int i = 0; i < hight; i++) {
            rtn = Math.min(dp[hight - 1][i], rtn);
        }
        return rtn;
    }
```

解2:大神写的

```
public int minimumTotal(List<List<Integer>> triangle) {
    int[] A = new int[triangle.size()+1];
    for(int i=triangle.size()-1;i>=0;i--){
        for(int j=0;j<triangle.get(i).size();j++){
            A[j] = Math.min(A[j],A[j+1])+triangle.get(i).get(j);
        }
    }
    return A[0];
}

```

