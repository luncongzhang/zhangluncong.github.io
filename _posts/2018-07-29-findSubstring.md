---
layout: post
title:  "30. 与所有单词相关联的字串"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一个字符串 s 和一些长度相同的单词 words。在 s 中找出可以恰好串联 words 中所有单词的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

示例 1:

```
输入:
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出: [0,9]
解释: 从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
```

示例 2:

```
输入:
  s = "wordgoodstudentgoodword",
  words = ["word","student"]
输出: []
```

解：hashmap存储单词及其个数，再利用递归实现检查字符串，每检查一次如果截取的字符串在hashmap中说明，匹配上了，hashmap对应值-1，为0时直接移除，继续递归检查直到map为0说明全部匹配上，追加至结果list中，递归减少了代码量，可读性变差，其实也可以不使用递归，直接用for循环实现，更好理解。

```
class Solution {
 public List<Integer> findSubstring(String s, String[] words) {
        if (s.length() == 0 || words == null || words.length == 0) {
            return new ArrayList<>();
        }
        List<Integer> res = new ArrayList<>();
        int size = words[0].length();
        int len = words.length;
        for (int i = 0; i <= s.length() - len; i++) {
            HashMap<String, Integer> m = new HashMap<>();
            for (int j = 0; j < words.length; j++) {
                m.put(words[j], m.getOrDefault(words[j], 0) + 1);
            }
            if (check(s, i, m, size)) {
                res.add(i);
            }
        }
        return res;
    }

    private boolean check(String s, int i, HashMap<String, Integer> m, int size) {
        if (m.size() == 0) {
            return true;
        }
        if (i > s.length() || i + size > s.length()) {
            return false;
        }
        String prefix = s.substring(i, i + size);
        if (m.containsKey(prefix) && m.get(prefix) > 0) {
            m.put(prefix, m.get(prefix) - 1);
            if (m.get(prefix) == 0) {
                m.remove(prefix);
            }
            return check(s, i + size, m, size);
        } else {
            return false;
        }
    }
}
```
