---
layout: post
title:  "85. 最大矩形"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

示例:

```
输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6
```

解：和84题，同样使用单调栈，但是比上题难理解很多。

```
 public int maximalRectangle(char[][] matrix) {
        int rLen = matrix.length;
        int cLen = rLen == 0 ? 0 : matrix[0].length;
        int max = 0;
        int[] h = new int[cLen + 1];
        for (int row = 0; row < rLen; row++) {
            //每行维护一个单调栈
            Stack<Integer> s = new Stack<Integer>();
            s.push(-1);
            for (int i = 0; i <= cLen; i++) {
                //遍历每一行的累计高度
                if (i < cLen && matrix[row][i] == '1') {
                    h[i] += 1;
                } else {
                    h[i] = 0;
                }
                //破坏单调栈
                while (s.peek() != -1 && h[i] < h[s.peek()]) {
                    int yIdx = s.pop();
                    int y = h[yIdx];//矩形宽
                    int xIdx = s.peek();
                    int x = i - xIdx - 1;//矩形长
                    max = Math.max(max, x * y);
                }
                s.push(i);
            }
        }
        return max;
    }
```