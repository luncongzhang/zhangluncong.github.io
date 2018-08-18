---
layout: post
title:  "143. 重排链表"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1:

```
给定链表 1->2->3->4, 重新排列为 1->4->2->3.
```

示例 2:

```
给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
```
解：纯手打，竟然一次ac,讶于自己编码能力提升！先将链表切分两半，后半反转，然后合并。

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
    public void reorderList(ListNode head) {
        if (head == null) {
            return;
        }
        ListNode realRtn=head;
        ListNode fast = head;
        ListNode slow = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }
        ListNode halfTail = null;
        if (fast != null) {//链表长度为奇数
            halfTail = slow.next;
        } else {//链表长度为偶数
            halfTail = slow;
        }
        ListNode revList = rev(halfTail);
        while (revList != null) {
            ListNode tmp1 = revList.next;
            ListNode tmp2 = realRtn.next;

            revList.next = realRtn.next;
            realRtn.next = revList;

            revList = tmp1;
            realRtn = tmp2;
        }
        realRtn.next=null;
    }

    private ListNode rev(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newList = null;
        while (head != null) {
            ListNode tmp = head.next;
            head.next = newList;
            newList = head;
            head = tmp;
        }
        return newList;
    }
}
```