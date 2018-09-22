---
layout: post
title:  "52. N皇后 II"
categories: 算法
tags: leetcode 回溯算法
---

* content
{:toc}

<!--more-->

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fvi75onof1j307607o748.jpg)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回 n 皇后不同的解决方案的数量。

示例:

输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]

解：上题的n皇后都解出来了，这题就是送分题,偷下懒直接返回size了。

```
class Solution {
    private void dfs(char[][] board, List<List<String>> res, int i, int n, boolean[] column, boolean[] cross1, boolean[] cross2) {
        if (i == n) {
            res.add(construct(board));
        } else {
            for (int j = 0; j < n; j++) {
                // 判断是否会和之前放置的皇后产生列上的冲突y=x
                if (column[j]) {
                    continue;
                }
                // 判断是否会和之前放置的皇后产生第一种对角线上的冲突y=x+b
                if (cross1[j + i]) {
                    continue;
                }
                // 判断是否会和之前放置的皇后产生第二种对角线上的冲突y=-x+b,忘了避免出现负数我们再加上n-1，得y=-x+b+n-1
                if (cross2[-j + i + n - 1]) {
                    continue;
                }
                board[i][j] = 'Q';
                column[j] = true;
                cross1[j + i] = true;
                cross2[-j + i + n - 1] = true;
                dfs(board, res, i + 1, n, column, cross1, cross2);
                board[i][j] = '.';
                column[j] = false;
                cross1[j + i] = false;
                cross2[-j + i + n - 1] = false;
            }
        }
    }

    private List<String> construct(char[][] board) {
        List<String> res = new LinkedList<String>();
        for (int i = 0; i < board.length; i++) {
            String s = new String(board[i]);
            res.add(s);
        }
        return res;
    }

    public int totalNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        //n皇后矩阵
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        //column[i]表示第i列是否已经存在皇后
        //cross1[i]表示第i条左下-右上方向的斜线是否已经存在皇后
        //cross2[i]表示第i条左上-右下方向的斜线是否已经存在皇后
        boolean[] column = new boolean[n];
        boolean[] cross1 = new boolean[2 * n - 1];
        boolean[] cross2 = new boolean[2 * n - 1];
        //从第0行开始
        dfs(board, res, 0, n, column, cross1, cross2);
        return res.size();
    }
}
```
