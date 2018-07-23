---
layout: post
title:  "205. 同构字符串"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定两个字符串 s 和 t，判断它们是否是同构的。

如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。

所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。

示例 1:

```
输入: s = "egg", t = "add"
输出: true
```

示例 2:

```
输入: s = "foo", t = "bar"
输出: false
```

示例 3:

```
输入: s = "paper", t = "title"
输出: true
```

说明:
你可以假设 s 和 t 具有相同的长度。

解：比较简单。

```
public boolean isIsomorphic(String s, String t) {
         Map<Character, Integer> map1 = new HashMap<>();
        Map<Character, Integer> map2 = new HashMap<>();
        int count1 = 0;
        int count2 = 0;
        StringBuilder sb1 = new StringBuilder();
        StringBuilder sb2 = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char tmp = s.charAt(i);
            if (!map1.containsKey(tmp)) {
                map1.put(tmp, count1++);
            }
            sb1.append(map1.get(tmp));
        }
        for (int i = 0; i < t.length(); i++) {
            char tmp = t.charAt(i);
            if (!map2.containsKey(tmp)) {
                map2.put(tmp, count2++);
            }
            sb2.append(map2.get(tmp));
        }

        if (sb1.toString().equals(sb2.toString())) {
            return true;
        } else {
            return false;
        }
    }
```