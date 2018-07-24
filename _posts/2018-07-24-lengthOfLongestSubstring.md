---
layout: post
title:  "3. 无重复字符的最长子串"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一个字符串，找出不含有重复字符的最长子串的长度。

示例：

给定 "abcabcbb" ，没有重复字符的最长子串是 "abc" ，那么长度就是3。

给定 "bbbbb" ，最长的子串就是 "b" ，长度是1。

给定 "pwwkew" ，最长子串是 "wke" ，长度是3。请注意答案必须是一个子串，"pwke" 是 子序列  而不是子串。

解：

```
public int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        int max = 0;
        int length = 0;
        HashMap<Character, Integer> h = new HashMap();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (h.containsKey(c)) {
                i = h.get(c);
                h.clear();
                length = 0;
                continue;
            } else {
                length++;
            }
            h.put(c, i);
            max = Math.max(max, length);
        }
        return max;
    }
```