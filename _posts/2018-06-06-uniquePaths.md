---
layout: post
title:  "62. 不同路径"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


<!--more-->

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

![](https://leetcode-cn.com/static/images/problemset/robot_maze.png)


例如，上图是一个7 x 3 的网格。有多少可能的路径？

说明：m 和 n 的值均不超过 100。

示例 1:

```
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
```

示例 2:

```
输入: m = 7, n = 3
输出: 28
```

解：采用动态规划。动态规划要求利用到上一次的结果，是一种特殊的迭代思想，动态规划的关键是要得到递推关系式。对于本题，到达某一点的路径数等于到达它上一点的路径数与它左边的路径数之和。也即，起点到点(i, j)的路径总数：ways[i][j] = 起点到点(i, j-1)的总数：ways[i][j-1] + 起点到点(i-1, j)总数：ways[i-1][j]。于是我们就得到递推关系式：ways[i][j] = ways[i][j-1] + ways[i-1][j]

```
 public int uniquePaths(int m, int n) {
        int[][] ways = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == 0) {
                    ways[i][j] = 1;
                } else {
                    ways[i][j] = ways[i - 1][j] + ways[i][j - 1];
                }
            }
        }
        return ways[m - 1][n - 1];
    }
```






