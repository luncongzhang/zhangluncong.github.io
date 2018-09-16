---
layout: post
title:  "124. 二叉树中的最大路径和"
categories: 算法
tags: leetcode 树 深度优先搜索
---

* content
{:toc}

<!--more-->

给定一个非空二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

示例 1:

```
输入: [1,2,3]

       1
      / \
     2   3

输出: 6
```

示例 2:

```
输入: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

输出: 42
```

解:

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    private int sum = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        if (root == null) {
            return 0;
        }
        path(root);
        return sum;
    }

    private int path(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = Math.max(path(root.left), 0);
        int right = Math.max(path(root.right), 0);
        sum = Math.max(sum, left+right+root.val);
        return Math.max(left + root.val, right + root.val);
    }
}
```