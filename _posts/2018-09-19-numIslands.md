---
layout: post
title:  "200. 岛屿的个数"
categories: 算法
tags: leetcode 深度优先搜索 广度优先搜索 并查集
---

* content
{:toc}

<!--more-->

给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

示例 1:

```
输入:
11110
11010
11000
00000

输出: 1
```

示例 2:

```
输入:
11000
11000
00100
00011

输出: 3
```

解：这题直接用并查集也比较简单。

```
class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }
        int row = grid.length;
        int col = grid[0].length;
        UnionFind uf = new UnionFind();
        uf.init(row * col);
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (grid[i][j] == '1') {
                    //上
                    if ((i - 1) >= 0 && grid[i - 1][j] == '1') {
                        uf.union(node(col, i, j), node(col, i - 1, j));
                    }
                    //下
                    if ((i + 1) < row && grid[i + 1][j] == '1') {
                        uf.union(node(col, i, j), node(col, i + 1, j));
                    }
                    //左
                    if ((j - 1) >= 0 && grid[i][j - 1] == '1') {
                        uf.union(node(col, i, j), node(col, i, j - 1));
                    }
                    //右
                    if ((j + 1) < col && grid[i][j + 1] == '1') {
                        uf.union(node(col, i, j), node(col, i, j + 1));
                    }
                }
            }
        }

        Set<Integer> set = new HashSet<>();
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (grid[i][j] == '1') {
                    set.add(uf.getRoot(node(col, i, j)));
                }
            }
        }
        return set.size();
    }

    private int node(int col, int i, int j) {
        return i * col + j;
    }
}

public class UnionFind {
    //pre[i]保存的是i的上级
    private int[] pre;

    //初始化，每个人的上级就是他自己，自成一派,形成了n个独立的集合
    public void init(int n) {
        this.pre = new int[n];
        for (int i = 0; i < n; i++) {
            pre[i] = i;
        }
    }

    //合并p,q两个对象所在集合
    public void union(int p, int q) {
        int rootP = getRoot(p);
        int rootQ = getRoot(q);
        //任意赋值，也可以pre[rootP] = rootQ;
        //只要能并起来就行
        pre[rootQ] = rootP;
    }

    //在p所在集合中查找q是否归属于这个集合
    public boolean find(int p, int q) {
        int rootP = getRoot(p);
        int rootQ = getRoot(q);
        return rootP == rootQ;
    }

    //查找i的最顶级上级
    //随着集合构造的树高度越高，时间复杂度会变得越高
    //所以我们可以进行优化，每次进行查找根的时候，
    //直接上级直接改成根节点，这样树就变得更加扁平
    //提升查找速度
    public int getRoot(int i) {
        int tmp = i;
        while (tmp != pre[tmp]) {
            tmp = pre[tmp];
        }
        pre[i] = tmp;
        return tmp;
    }

    public static void main(String[] args) {
        UnionFind unionFind = new UnionFind();
        //初始化10个独立集合
        unionFind.init(10);
        //将1所在集合，2所在集合组成一个集合，结果1，2
        unionFind.union(1, 2);
        //将3所在集合，4所在集合组成一个集合，结果3，4
        unionFind.union(3, 4);
        //将1所在集合，3所在集合组成一个集合，结果1，2，3，4
        unionFind.union(1, 3);
        //将5所在集合，6所在集合组成一个集合，结果5，6
        unionFind.union(5, 6);
        unionFind.find(4, 6);
        unionFind.find(2, 4);
    }
}
```
