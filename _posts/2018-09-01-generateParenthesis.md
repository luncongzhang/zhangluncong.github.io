---
layout: post
title:  "22. 括号生成"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

例如，给出 n = 3，生成结果为：

```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

解：

```
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<>();
        dfs(ans, "", n, n);
        return ans;
    }

    public void dfs(List<String> list, String st, int left, int right) {
        //left>right表示组合字符串中已存在(数量要小于）数量，肯定不可能组合成功
        if (left > right) {
            return;
        }
        if (left == 0 && right == 0) {
            list.add(st);
        }
        if (left > 0) {
            dfs(list, st + "(", left - 1, right);
        }
        if (right > 0) {
            dfs(list, st + ")", left, right - 1);
        }
    }
}
```
