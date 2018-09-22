---
layout: post
title:  "51. N皇后"
categories: 算法
tags: leetcode 回溯算法
---

* content
{:toc}

<!--more-->

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fvi75onof1j307607o748.jpg)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例:

```
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

解：任意两个皇后都不在同一条横线、竖线、斜线方向上,有难度，主要是理解以下三个数组表示的是什么意思，其实组成的n*n的n皇后矩阵可以看成一个数学坐标系，我们知道```y=k*x+b```表示的是一条直线，k为斜率，b为y轴上的高度，当k=0;b=0;的时候y=x为一条穿过坐标系原点并且与x轴成45度的直线。

```
column[j] 表示一条垂j轴的垂直线
cross1[j + i] 表示左低右高斜率45度的直线
cross2[-j + i + n - 1] 表示左高右低斜率45度的直线，为什么后面还要加上n-1呢，其实是为什么-j+i有可能会变成负数，我们数组没有负数的下标，因此我们加上n-1来保证下标不为负数，其实加多少都无所谓，只要我们有一个足够大的数组来保存这条直线上的点。
```

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fvibfwsdfmj30u0140gpm.jpg)

[参考1](https://blog.csdn.net/qq_17550379/article/details/82770400)

[参考2](https://www.tianmaying.com/tutorial/LC51)

```
class Solution {
    public List<List<String>> solveNQueens(int n) {
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
        return res;
    }

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
}
```