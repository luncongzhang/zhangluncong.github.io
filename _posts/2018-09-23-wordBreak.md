---
layout: post
title:  "140. 单词拆分 II"
categories: 算法
tags: leetcode 动态规划 回溯算法
---

* content
{:toc}

<!--more-->

给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

说明：

分隔时可以重复使用字典中的单词。
你可以假设字典中没有重复的单词。
示例 1：

```
输入:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
输出:
[
  "cats and dog",
  "cat sand dog"
]
```

示例 2：

```
输入:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
输出:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
解释: 注意你可以重复使用字典中的单词。
```

示例 3：

```
输入:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
输出:
[]
```

解：未ac,代码正确，只不过有一些用例耗时通不过,通过dp优化一下应该可以通过所有用例。

```
class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        List<String> res = new ArrayList<>();
        List<String> list = new ArrayList<>();
        dfs(res, list, s, wordDict, 0);
        return res;
    }

    private void dfs(List<String> res, List<String> list, String s, List<String> wordDict, int start) {
        if (start == s.length()) {
            StringBuilder sb = new StringBuilder();
            for (String ss : list) {
                sb.append(ss);
                sb.append(" ");
            }
            res.add(sb.toString().substring(0, sb.length() - 1));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            String sub = s.substring(start, i + 1);
            if (wordDict.contains(sub)) {
                list.add(sub);
                dfs(res, list, s, wordDict, i + 1);
                list.remove(list.size() - 1);
            }
        }
    }
}
```