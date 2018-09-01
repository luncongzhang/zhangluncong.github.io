---
layout: post
title:  "17. 电话号码的字母组合"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![](https://ws4.sinaimg.cn/large/0069RVTdgy1futymi2tbhj305k04imx5.jpg)

示例:

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

说明:

* 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

解:非常典型的dfs,以23为例，树的第一层有a,b,c三个节点，第二层有d,e,f三个节点，开始深度遍历。

```
class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits == null || digits.length() == 0) {
            return res;
        }
        Map<Character, String[]> map = new HashMap<>();
        map.put('2', new String[]{"a", "b", "c"});
        map.put('3', new String[]{"d", "e", "f"});
        map.put('4', new String[]{"g", "h", "i"});
        map.put('5', new String[]{"j", "k", "l"});
        map.put('6', new String[]{"m", "n", "o"});
        map.put('7', new String[]{"p", "q", "r", "s"});
        map.put('8', new String[]{"t", "u", "v"});
        map.put('9', new String[]{"w", "x", "y", "z"});
        StringBuilder sb = new StringBuilder();
        dfs(digits, 0, map, res, sb);
        return res;
    }

    private void dfs(String digits, int step, Map<Character, String[]> map, List<String> res, StringBuilder sb) {
        if (step == digits.length()) {
            res.add(sb.toString());
            return;
        }
        char c = digits.charAt(step);
        String[] tmp = map.get(c);
        for (int i = 0; i < tmp.length; i++) {
            sb.append(tmp[i]);
            dfs(digits, step + 1, map, res, sb);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```
