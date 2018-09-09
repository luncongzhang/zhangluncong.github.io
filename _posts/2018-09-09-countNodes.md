---
layout: post
title:  "222. 完全二叉树的节点个数"
categories: 算法
tags: leetcode 二分查找
---

* content
{:toc}

<!--more-->

给出一个完全二叉树，求出该树的节点个数。

说明：

完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

示例:

```
输入: 
    1
   / \
  2   3
 / \  /
4  5 6

输出: 6
```

解：先明确一下节点的高度和深度，对应树的高度和深度就是所有节点的最大高度和深度，看图就懂了，示例按我们的定义高度为2，有的地方高度的定义和这里定义稍微有的差别，高度计算从1开始，定义为3。以下我们都以我们的定义为准。完美二叉树节点数公式：2^(k+1)-1，k为树的高度。还有一种解题方法用二分查找找到第一个叶子节点，刚好第一个叶子节点刚好在该完全二叉树先根遍历的中心。

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fv3a8pl9woj30ah0bimxb.jpg)

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
public int countNodes(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int leftHeight = completeTreeHeight(root.left);
        int rightHeight = completeTreeHeight(root.right);
        if (leftHeight == rightHeight) {//左子树一定是完全二叉树
            //左子树节点数，加上右子树节点数，加上根节点数1
            return (int) (Math.pow((double) 2, (double) (leftHeight + 1)) - 1) + countNodes(root.right) + 1;
        } else {//因为是完全二叉树，所以只有leftHeight>rightHeight这种情况，右子树一定是完全二叉树
            //左子树节点数，加上右子树节点数，加上根节点数1
            return countNodes(root.left) + (int) (Math.pow((double) 2, (double) (rightHeight + 1)) - 1) + 1;
        }
    }

    /**
     * 完全二叉树的高度
     *
     * @param root
     * @return
     */
    private int completeTreeHeight(TreeNode root) {
        if (root == null) {
            return -1;
        } else {
            return completeTreeHeight(root.left) + 1;
        }
    }
}
```

