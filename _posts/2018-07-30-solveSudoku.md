---
layout: post
title:  "37. 解数独"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

编写一个程序，通过已填充的空格来解决数独问题。

一个数独的解法需遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fts4ug1c4rj306y06ydfp.jpg)

一个数独。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fts4uhuu9cj306y06y74a.jpg)

答案被标成红色。

Note:

* 给定的数独序列只包含数字 1-9 和字符 '.' 。
* 你可以假设给定的数独只有唯一解。
* 给定数独永远是 9x9 形式的。

解：
这步有点难懂，可以用其他方法替代
```
if(board[3*(row/3) + i/3][3 * (col / 3) + i % 3] == c) 
{
  return false;
}
```

```
class Solution {
     public void solveSudoku(char[][] board) {
        if (board == null || board.length == 0) {
            return;
        }
        dfsSK(board);
    }

    /**
     * 回溯法
     *
     * @param board
     * @return
     */
    private boolean dfsSK(char[][] board) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                //如果为.，需要填充数字
                if (board[i][j] == '.') {
                    //从1-9填充数字
                    for (char c = '1'; c <= '9'; c++) {
                        //如果行列小九宫格不存在c
                        if (isVaild(board, i, j, c)) {
                            //可以赋值
                            board[i][j] = c;
                            if (dfsSK(board)) {//继续遍历
                                return true;
                            } else {//回溯
                                board[i][j] = '.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 判断c在行，列，小九宫格存不存在
     *
     * @param board
     * @param row
     * @param col
     * @param c
     * @return
     */
    private boolean isVaild(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            //判断row,col所在列存不存在c
            if (board[i][col] == c) {
                return false;
            }
            //判断row,col所在行存不存在c
            if (board[row][i] == c) {
                return false;
            }
            //看不懂，太难了，可以用以下的笨方法
            /*if(board[3*(row/3) + i/3][3 * (col / 3) + i % 3] == c) {
                return false;
            }*/
        }
        //存放所在小九宫格起点
        int flag1 = 0;
        int flag2 = 0;
        //查找c在哪个小九宫格，使用了lableB作为循环标签
        lableB:
        for (int i = 0; i < board.length - 2; i = i + 3) {
            for (int j = 0; j < board[0].length - 2; j = j + 3) {
                //外面两个循环确定了小格子左上角第一个元素
                for (int a = i; a < i + 3; a++) {
                    for (int b = j; b < j + 3; b++) {
                        if ((a == row) && (b == col)) {
                            flag1 = i;
                            flag2 = j;
                            break lableB;
                        }
                    }
                }
            }
        }
        //判断row,col所在小九宫格存不存在c
        for (int a = flag1; a < flag1 + 3; a++) {
            for (int b = flag2; b < flag2 + 3; b++) {
                if (board[a][b] == c) {
                    return false;
                }
            }
        }
        return true;
    }
}
```
