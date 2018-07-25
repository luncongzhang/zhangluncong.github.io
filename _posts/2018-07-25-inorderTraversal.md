---
layout: post
title:  "94. 二叉树的中序遍历"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一个二叉树，返回它的中序 遍历。

示例:

```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

解1：递归

```
public List < Integer > inorderTraversal(TreeNode root) {
        List < Integer > res = new ArrayList < > ();
        helper(root, res);
        return res;
    }

    public void helper(TreeNode root, List < Integer > res) {
        if (root != null) {
            if (root.left != null) {
                helper(root.left, res);
            }
            res.add(root.val);
            if (root.right != null) {
                helper(root.right, res);
            }
        }
    }
```

解2：迭代，有点抽象

![](https://ws2.sinaimg.cn/large/006tKfTcgy1ftmirqxxmzj317c0n0dgk.jpg)

```
使用一个栈来存储二叉树节点，根据中序遍历的规则，我们可以推算出这样的规律： 
1. 将当前非空节点入栈 
2. 如果左子节点不为空，则继续将左子节点入栈 
3. 如果左子节点为空，则抛出栈顶节点并记录 val 值，然后将其右子节点入栈 
4. 重复 1、2、3 步骤直至栈空
```

```
 public List<Integer> inorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        List<Integer> list = new ArrayList<>();
        while(true){
            if (root != null){
                stack.push(root);
                root = root.left;
            } else {
                if (stack.empty()) {
                    return list;
                }
                root = stack.pop();
                list.add(root.val);
                root = root.right;
            }
        }
    }
```