---
layout: post
title:  "83. 删除排序链表中的重复元素"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:

```
输入: 1->1->2
输出: 1->2
```

示例 2:

```
输入: 1->1->2->3->3
输出: 1->2->3
```

解：比较简单

```
 public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode now = head;
        while (now.next != null) {
            if (now.val == now.next.val) {
                now.next = now.next.next;
            } else {
                now = now.next;
            }
        }
        return head;
    }
```
