---
layout: post
title:  "76. 最小覆盖子串"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一个字符串 S 和一个字符串 T，请在 S 中找出包含 T 所有字母的最小子串。

示例：

```
输入: S = "ADOBECODEBANC", T = "ABC"
输出: "BANC"
```

说明：

* 如果 S 中不存这样的子串，则返回空字符串 ""。
* 如果 S 中存在这样的子串，我们保证它是唯一的答案。

解：首先start，end两个左右指针，先右指针一直移动直到包含子串t；此时尝试移动左指针缩小范围，两种情况可以移动左指针，1这个字母不存在t中，2这个字母的已经存在的个数大于t中这个字母的个数；这两种情况分别处理，直到左指针不能再移动，计算一下长度，保存两个指针，继续移动右指针。

```
class Solution {
   public String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty()) {
            return "";
        }
        Map<Character, Integer> itemsFound = new HashMap<>();
        Map<Character, Integer> toBeFound = new HashMap<>();
        int count = 0;
        int minLen = Integer.MAX_VALUE;
        int l = -1;
        int r = -1;
        //记录字符串t中各字母出现次数
        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            if (toBeFound.containsKey(c)) {
                toBeFound.put(c, toBeFound.get(c) + 1);
            } else {
                toBeFound.put(c, 1);
            }
        }
        for (int start = 0, end = 0; end < s.length(); end++) {
            char e = s.charAt(end);
            //非目标串中字母，右指针继续右移
            if (!toBeFound.containsKey(e)) {
                continue;
            }
            if (itemsFound.containsKey(e)) {
                itemsFound.put(e, itemsFound.get(e) + 1);
            } else {
                itemsFound.put(e, 1);
            }
            if (itemsFound.get(e) <= toBeFound.get(e)) {
                count++;
            }
            if (count == t.length()) {//相等说明已经包含了t
                char ch = s.charAt(start);
                //两种情况可以移动start指针
                while (!toBeFound.containsKey(ch) || itemsFound.get(ch) > toBeFound.get(ch)) {
                    //第一种情况
                    if (!toBeFound.containsKey(ch)) {
                        start++;
                        ch = s.charAt(start);
                        continue;
                    }
                    //第二种情况
                    if (itemsFound.get(ch) > toBeFound.get(ch)) {
                        itemsFound.put(ch, itemsFound.get(ch) - 1);
                        start++;
                        ch = s.charAt(start);
                        continue;
                    }
                }
                if (end - start < minLen) {
                    minLen = end - start;
                    l = start;
                    r = end;
                }
            }
        }
        return l == -1 ? "" : s.substring(l, r + 1);
    }
}
```
