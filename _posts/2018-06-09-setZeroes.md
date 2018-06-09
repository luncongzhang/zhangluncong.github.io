---
layout: post
title:  "73. 矩阵置零"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。

示例 1:

```
输入: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

示例 2:

```
输入: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

进阶:

* 一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
* 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
* 你能想出一个常数空间的解决方案吗？

解：需要常数空间，那就需要将利用首行和首列作为标记，将非首行首列中的0平移到首行和首列，然后对非首行首列设置为0，最后根据前面判断标志，再根据情况是否将首行和首列设置为0.

```
 public void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        boolean frow = false;
        boolean fcol = false;
        //检查首列是否存在0
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) {
                fcol = true;
                break;
            }
        }
        //检查首行是否存在0
        for (int i = 0; i < n; i++) {
            if (matrix[0][i] == 0) {
                frow = true;
                break;
            }
        }
        //检查非首行首列是否有0
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        //填充非首行首列
        for (int i = 1; i < m; i++) {
            if (matrix[i][0] == 0) {
                for (int j = 1; j < n; j++) {
                    matrix[i][j] = 0;
                }
            }
        }
        for (int j = 1; j < n; j++) {
            if (matrix[0][j] == 0) {
                for (int i = 1; i < m; i++) {
                    matrix[i][j] = 0;
                }
            }
        }
        //填充首行首列
        if (frow == true) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
        if (fcol == true) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
```

