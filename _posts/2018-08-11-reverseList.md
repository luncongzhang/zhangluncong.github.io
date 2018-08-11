---
layout: post
title:  "206. 反转链表"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

反转一个单链表。

示例:

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

解：迭代

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fu5szy4rz0j314h0h2wf2.jpg)

```
    public ListNode reverseList(ListNode head) {
        ListNode newListNode = null;
        while (head != null) {
            //保存下一个要遍历的节点
            ListNode nextListNode = head.next;
            //当前节点的next设为newListNode
            head.next = newListNode;
            //设置新节点
            newListNode = head;
            //设置下一个要遍历的节点
            head = nextListNode;
        }
        return newListNode;
    }
```


