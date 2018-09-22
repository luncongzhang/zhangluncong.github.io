---
layout: post
title:  "127. 单词接龙"
categories: 算法
tags: leetcode 广度优先搜索
---

* content
{:toc}

<!--more-->

给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

每次转换只能改变一个字母。
转换过程中的中间单词必须是字典中的单词。
说明:

如果不存在这样的转换序列，返回 0。
所有单词具有相同的长度。
所有单词只由小写字母组成。
字典中不存在重复的单词。
你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
示例 1:

```
输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出: 5

解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
     返回它的长度 5。
```

示例 2:

```
输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

输出: 0

解释: endWord "cog" 不在字典中，所以无法进行转换。
```

解：

```
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Queue<String> queue = new LinkedList<String>();
        Set<String> set = new HashSet<String>();
        queue.offer(beginWord);
        set.add(beginWord);
        int res = 1;
        while (!queue.isEmpty()) {
            ++res;
            int size = queue.size();
            while (size > 0) {
                String cur = queue.poll();
                --size;
                for (String wd : wordList) {
                    if (check(wd, cur) && !set.contains(wd)) {
                        if (wd.equals(endWord)) {
                            return res;
                        }
                        queue.add(wd);
                        set.add(wd);
                    }
                }
            }
        }
        return 0;
    }

    private boolean check(String s1, String s2) {
        int diff = 0;
        for (int i = 0; i < s1.length(); ++i) {
            if (s1.charAt(i) != s2.charAt(i)) {
                ++diff;
                if (diff > 1) {
                    break;
                }
            }
        }
        return diff == 1;
    }
}
```