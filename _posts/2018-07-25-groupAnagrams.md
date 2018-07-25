---
layout: post
title:  "49. 字母异位词分组"
categories: java
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

示例:

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

说明：

* 所有输入均为小写字母。
* 不考虑答案输出的顺序。

解：

```
public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> res = new ArrayList<>();
        Map<String, List<String>> hm = new HashMap<>();
        for (int i = 0; i < strs.length; i++) {
            char[] tem = strs[i].toCharArray();
            Arrays.sort(tem);
            String s = new String(tem);
            if (!hm.containsKey(s)) {
                hm.put(s, new ArrayList<String>());
            }
            hm.get(s).add(strs[i]);
        }
        for (String str : hm.keySet()) {
            res.add(hm.get(str));
        }
        return res;
    }
```