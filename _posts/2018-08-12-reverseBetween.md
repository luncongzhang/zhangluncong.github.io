---
layout: post
title:  "92. 反转链表 II"
categories: 算法
tags: leetcode 链表
---

* content
{:toc}

<!--more-->

反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:

```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

解：注意对象间的引用，改一个链表中节点的next有可能影响其他也引用了这个对象的链表，具体看代码里面注释

反转部分可参考
[206. 反转链表](https://zhangluncong.com/2018/08/11/reverseList/)

```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;reverseBetween
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        if (head == null) {
            return head;
        }
        ListNode fakeHead = new ListNode(0);
        fakeHead.next = head;

        //移动到要开始反转的地方
        ListNode pre = fakeHead;
        for (int i = 0; i < m - 1; i++) {
            pre = pre.next;
        }

        //反转
        ListNode cur = pre.next;
        ListNode newHead = null;
        for (int i = 0; i <= n - m; i++) {
            //保存下一个要反转的节点
            ListNode tmp = cur.next;
            //链接
            cur.next = newHead;
            //新节点
            newHead = cur;
            //下一个节点
            cur = tmp;
        }

        //粘起来除反转部分的后半部分，
        // 此时pre.next.next节点和此时newHead最后一个节点为同一个对象hashcode相等，
        // 所以将cur赋值过去相当于newHead也同时得到了，
        //例如输入: 1->2->3->4->5->NULL, m = 2, n = 4
        //输出: 1->4->3->2->5->NULL
        //此时pre为1->2,cur为5，newHead为4->3->2
        //pre.next.next = cur;执行完后：pre为1->2->5,newHead为4->3->2->5
        pre.next.next = cur;
        //粘起新反转部分
        pre.next = newHead;

        return fakeHead.next;
    }
}
```