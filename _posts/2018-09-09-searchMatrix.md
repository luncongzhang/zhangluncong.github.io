---
layout: post
title:  "240. 搜索二维矩阵 II"
categories: 算法
tags: leetcode 二分查找
---

* content
{:toc}

<!--more-->

编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
示例:

```
现有矩阵 matrix 如下：

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。

给定 target = 20，返回 false。
```
解：思路：我们仔细的观察矩阵，可以发现，从右上角的数字开始，前面的数字比其小，下面的数字比其大，复合使用二分的思路，只是需要做出一些变形；我们从右上角开始搜索，如果当前值和目标值匹配，那就算是找到了，如果大于目标值，自然要去找更小的，即左移，如果小于目标值，那就去找更大的，即下移。

```
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rowLen = matrix.length;
        if (rowLen == 0) {
            return false;
        }
        int colLen = matrix[0].length;
        if (colLen == 0) {
            return false;
        }
        int i = 0;
        int j = matrix[0].length - 1;
        while (i < rowLen && j >= 0) {
            if (matrix[i][j] == target) {
                return true;
            } else if (matrix[i][j] > target) {
                j--;
            } else {
                i++;
            }
        }
        return false;
    }
}
```

