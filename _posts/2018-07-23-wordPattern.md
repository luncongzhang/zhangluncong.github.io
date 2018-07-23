---
layout: post
title:  "290. 单词模式"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一种 pattern(模式) 和一个字符串 str ，判断 str 是否遵循相同的模式。

这里的遵循指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应模式。

示例1:

```
输入: pattern = "abba", str = "dog cat cat dog"
输出: true
```

示例 2:

```
输入:pattern = "abba", str = "dog cat cat fish"
输出: false
```

示例 3:

```
输入: pattern = "aaaa", str = "dog cat cat dog"
输出: false
```

示例 4:

```
输入: pattern = "abba", str = "dog dog dog dog"
输出: false
```

说明:
你可以假设 pattern 只包含小写字母， str 包含了由单个空格分隔的小写字母。   

解：和205题基本一样。

```
public boolean wordPattern(String pattern, String str) {
        Map<Character, Integer> map1 = new HashMap<>();
        Map<String, Integer> map2 = new HashMap<>();
        int count1 = 0;
        int count2 = 0;
        StringBuilder sb1 = new StringBuilder();
        StringBuilder sb2 = new StringBuilder();
        for (int i = 0; i < pattern.length(); i++) {
            char tmp = pattern.charAt(i);
            if (!map1.containsKey(tmp)) {
                map1.put(tmp, count1++);
            }
            sb1.append(map1.get(tmp));
        }
        String[] strArr = str.split(" ");
        for (int i = 0; i < strArr.length; i++) {
            String tmp = strArr[i];
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