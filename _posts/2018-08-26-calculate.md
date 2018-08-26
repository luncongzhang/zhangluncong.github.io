---
layout: post
title:  "224. 基本计算器"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

实现一个基本的计算器来计算一个简单的字符串表达式的值。

字符串表达式可以包含左括号 ( ，右括号 )，加号 + ，减号 -，非负整数和空格  。

示例 1:

```
输入: "1 + 1"
输出: 2
```

示例 2:

```
输入: " 2-1 + 2 "
输出: 3
```

示例 3:

```
输入: "(1+(4+5+2)-3)+(6+8)"
输出: 23
```

说明：

* 你可以假设所给定的表达式都是有效的。
* 请不要使用内置的库函数 eval。

解：大学数据结构中的题，数据结构中还有乘除，主要就是使用栈来处理。

```
class Solution {
    public static int calculate(String s) {
        int len = s.length();
        int sign = 1;
        int result = 0;
        Stack<Integer> stack = new Stack<Integer>();
        for (int i = 0; i < len; i++) {
            if (Character.isDigit(s.charAt(i))) {
                int sum = s.charAt(i) - '0';
                while (i < (len - 1) && Character.isDigit(s.charAt(i + 1))) {
                    sum = sum * 10 + s.charAt(i + 1) - '0';
                    i++;
                }
                result += sum * sign;
            } else if (s.charAt(i) == '+')
                sign = 1;
            else if (s.charAt(i) == '-')
                sign = -1;
            else if (s.charAt(i) == '(') {
                stack.push(result);
                stack.push(sign);
                result = 0;
                sign = 1;
            } else if (s.charAt(i) == ')') {
                result = result * stack.pop() + stack.pop();
            }

        }
        return result;
    }
}
```

