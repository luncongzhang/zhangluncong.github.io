---
layout: post
title:  "105. 从前序与中序遍历序列构造二叉树"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

```
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
   
```

解：看这张图进行递归

![](https://ws4.sinaimg.cn/large/006tKfTcgy1ft1fblk5ebj30jv0jaaa2.jpg)

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
public TreeNode buildTree(int[] preorder, int[] inorder) {
        return build(preorder, inorder, 0, 0, inorder.length - 1);
    }

    /**
     * @param preorder 完整的先序遍历
     * @param inorder  完整的中序遍历
     * @param preSt    子树先序遍历起始点
     * @param inSt     子树中序遍历起始点
     * @param inEnd    子树中序遍历结束点
     * @return
     */
    private TreeNode build(int[] preorder, int[] inorder, int preSt, int inSt, int inEnd) {
        //递归临界点
        if (preSt > preorder.length - 1 || inSt > inEnd) {
            return null;
        }
        //先序遍历首节点为根节点
        TreeNode rootNode = new TreeNode(preorder[preSt]);
        //根节点在中序遍历的索引
        int rootIndex = 0;
        for (int i = inSt; i <= inEnd; i++) {
            if (inorder[i] == rootNode.val) {
                rootIndex = i;
                break;
            }
        }
        //左子树长度
        int leftLength = rootIndex - inSt;
        //右子树在完整先序遍历起始点
        int preStRight = preSt + leftLength + 1;
        int preStLeft = preSt + 1;

        rootNode.left = build(preorder, inorder, preStLeft, inSt, rootIndex - 1);
        rootNode.right = build(preorder, inorder, preStRight, rootIndex + 1, inEnd);
        return rootNode;
    }
```