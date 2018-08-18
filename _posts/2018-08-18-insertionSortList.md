---
layout: post
title:  "147. 对链表进行插入排序"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

对链表进行插入排序。

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fudsxrychtg308c050768.gif)

插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。

 

插入排序算法：

插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
重复直到所有输入数据插入完为止。
 

示例 1：

```
输入: 4->2->1->3
输出: 1->2->3->4
```

示例 2：

```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
```

解：未ac做了一下午，仅供参考，后续修正。

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
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.val <= cur.next.val) {
                cur = cur.next;
            } else {
                ListNode pre = head;
                ListNode bak = dummy;

                while (pre.val < cur.next.val) {
                    bak = pre;
                    pre = pre.next;
                }
                ListNode tmp = cur.next;
                cur.next = cur.next.next;
                tmp.next = pre;
                bak.next = tmp;
            }
        }
        return dummy.next;
    }
}
```