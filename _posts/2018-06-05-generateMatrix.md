---
layout: post
title:  "59. 螺旋矩阵 II"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}



给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。


<!--more-->

示例:

```
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

解：

```
public int[][] generateMatrix(int n) {
        PriorityQueue<Integer> minQueue = new PriorityQueue<>();
        for (int i = 1; i <= n * n; i++) {
            minQueue.add(i);
        }
        int[][] matrix = new int[n][n];

        //左右上下四个边界
        int left = 0;
        int right = matrix[0].length - 1;
        int top = 0;
        int bottom = matrix.length - 1;

        while (true) {

            //上面，自左到右
            for (int i = left; i <= right; i++) {
                matrix[top][i] = minQueue.poll();
            }
            if (++top > bottom) {
                break;
            }

            //右边，自上到下
            for (int i = top; i <= bottom; i++) {
                matrix[i][right] = minQueue.poll();
            }
            if (--right < left) {
                break;
            }

            //下面，自右到左
            for (int i = right; i >= left; i--) {
                matrix[bottom][i] = minQueue.poll();
            }
            if (--bottom < top) {
                break;
            }

            //左边，自下到上
            for (int i = bottom; i >= top; i--) {
                matrix[i][left] = minQueue.poll();
            }
            if (++left > right) {
                break;
            }

        }
        return matrix;
    }
```






