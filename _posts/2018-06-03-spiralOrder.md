---
layout: post
title:  "54. 螺旋矩阵"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}



给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
<!--more-->

示例 1:

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

示例 2:

```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

解：

```
   public List<Integer> spiralOrder(int[][] matrix) {

        List<Integer> linkedList = new LinkedList<>();

        if (matrix == null || matrix.length == 0) {
            return linkedList;
        }

        //左右上下四个边界
        int left = 0;
        int right = matrix[0].length - 1;
        int top = 0;
        int bottom = matrix.length - 1;

        int i;
        while (true) {

            //上边，自左至右
            for (i = left; i <= right; i++) {
                linkedList.add(matrix[top][i]);
            }
            if (++top > bottom) {
                break;
            }

            //右边，自上至下
            for (i = top; i <= bottom; i++) {
                linkedList.add(matrix[i][right]);
            }
            if (left > --right) {
                break;
            }

            //下边，自右至左
            for (i = right; i >= left; i--) {
                linkedList.add(matrix[bottom][i]);
            }
            if (top > --bottom) {
                break;
            }

            //左边，自下至上
            for (i = bottom; i >= top; i--) {
                linkedList.add(matrix[i][left]);
            }
            if (++left > right) {
                break;
            }

        }

        return linkedList;
    }
```







