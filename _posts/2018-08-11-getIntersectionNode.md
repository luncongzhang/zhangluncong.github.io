---
layout: post
title:  "160. 相交链表"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

编写一个程序，找到两个单链表相交的起始节点。

 
```
例如，下面的两个链表：

A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗            
B:     b1 → b2 → b3
在节点 c1 开始相交。
```
 

注意：

* 如果两个链表没有交点，返回 null.
* 在返回结果后，两个链表仍须保持原有的结构。
* 可假定整个链表结构中没有循环。
* 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 

致谢:
特别感谢 @stellari 添加此问题并创建所有测试用例。

解：while遍历，当其中一个链表遍历结束的时候，另一个未遍历完的就是链表长度差，这时交换a,b链表就能从长度一样开始遍历。

```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
 public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }

        ListNode a = headA;
        ListNode b = headB;

        while (a != b) {
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }

        return a;
    }
}
```
