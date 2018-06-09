---
layout: post
title:  "74. 搜索二维矩阵"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。
示例 1:

```
输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
输出: true
```

示例 2:

```
输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
输出: false
```

解：第一次二分法判断在哪一行，第二次二分法判断在哪一列。注意二分法，不进行mid加减1，while不加=，容易在特殊情况出现死循环。

```
public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0)
            return false;
        if (target < matrix[0][0] || target > matrix[matrix.length - 1][matrix[0].length - 1])
            return false;
        int rowNum = 0;
        //二分法搜索第一列，判断target在哪一行
        int top = 0;
        int bottom = matrix.length - 1;
        while (top <= bottom) {
            int mid = (top + bottom) / 2;
            if (matrix[mid][0] > target) {
                bottom = mid - 1;
            } else if (matrix[mid][0] < target) {
                top = mid + 1;
            } else {
                return true;
            }
        }
        rowNum = top - 1;

        //二分法搜索行，判断在哪一列
        int left = 0;
        int right = matrix[0].length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (matrix[rowNum][mid] > target) {
                right = mid - 1;
            } else if (matrix[rowNum][mid] < target) {
                left = mid + 1;
            } else {
                return true;
            }
        }
        return false;
    }
```
