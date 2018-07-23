---
layout: post
title:  "242. 有效的字母异位词"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的一个字母异位词。

示例 1:

```
输入: s = "anagram", t = "nagaram"
输出: true
```

示例 2:

```
输入: s = "rat", t = "car"
输出: false
```

说明:
你可以假设字符串只包含小写字母。

进阶:
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

解：也很简单

```
public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        HashMap<Character, Integer> ht1 = new HashMap<>();
        HashMap<Character, Integer> ht2 = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char tmp = s.charAt(i);
            if (ht1.containsKey(tmp)) {
                ht1.put(tmp, ht1.get(tmp) + 1);
            } else {
                ht1.put(tmp, 1);
            }
        }
        for (int i = 0; i < t.length(); i++) {
            char tmp = t.charAt(i);
            if (ht2.containsKey(tmp)) {
                ht2.put(tmp, ht2.get(tmp) + 1);
            } else {
                ht2.put(tmp, 1);
            }
        }

        for (char key : ht1.keySet()) {
            if (!ht1.get(key).equals(ht2.get(key))) {
                return false;
            }
        }
        return true;
    }
```