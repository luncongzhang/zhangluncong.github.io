---
layout: post
title:  "203. 删除链表中的节点"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

删除链表中等于给定值 val 的所有节点。

示例:

```
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

解：很简单

```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
     public ListNode removeElements(ListNode head, int val) {
        if (head == null) {
            return null;
        }
        while (head != null && head.val == val) {
            head = head.next;
        }
        if (head == null) {
            return null;
        }
        ListNode listNode = head;
        while (listNode.next != null) {
            if (listNode.next.val == val) {
                listNode.next = listNode.next.next;
            } else {
                listNode = listNode.next;
            }
        }
        return head;
    }
}
```
