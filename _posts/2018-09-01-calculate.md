---
layout: post
title:  "227. 基本计算器 II"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

实现一个基本的计算器来计算一个简单的字符串表达式的值。

字符串表达式仅包含非负整数，+， - ，*，/ 四种运算符和空格  。 整数除法仅保留整数部分。

示例 1:

```
输入: "3+2*2"
输出: 7
```

示例 2:

```
输入: " 3/2 "
输出: 1
```

示例 3:

```
输入: " 3+5 / 2 "
输出: 5
```

说明：

* 你可以假设所给定的表达式都是有效的。
* 请不要使用内置的库函数 eval。

解：很经典，带括弧的整数加减乘除计算器实现，纯手打。计算器算法分两步：

* 前缀表达式转后缀表达式

  1.设立一个只保存运算符和```(```的符号栈signStack，与优先级map,如下代码
  
  2.遍历前缀表达式，遇到数字直接输出；遇到```(```直接入栈；遇到```+-*/```先判断栈顶是否有优先级大于等于它的元素，有就把这些栈顶元素出栈输出后它入栈，没有就直接入栈；遇到```)```把栈顶元素出栈输出，直到碰见```(```，```(```出栈不输出；注意：输出的意思指的是保存到后缀表达式列表hzList中。

* 后缀表达式计算

  1.设立一个只保存数字的数字栈digitStack，如下代码
  2.遍历后缀表达式，遇到数字直接入栈；遇到```+-*/```出栈两个元素进行对应符号计算；




```
class Solution {
    public int calculate(String s) {
        //整数计算器
        //去掉所有空格
        s = s.replaceAll(" ", "");
        //中缀转后缀表达式，假定s只有数字()+-*/不含其它字符===========start
        List<String> hzList = new ArrayList<>();
        //运算符优先级，值大的优先计算
        Map<Character, Integer> map = new HashMap<>();
        map.put('+', 1);
        map.put('-', 1);
        map.put('*', 2);
        map.put('/', 2);
        //保存运算符栈
        Stack<Character> signStack = new Stack<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            //是否为数字
            boolean isDigit = Character.isDigit(c);
            if (isDigit) {//如果为数字直接输出
                int tmp = i;
                while ((i + 1) < s.length() && Character.isDigit(s.charAt(i + 1))) {
                    i++;
                }
                hzList.add(s.substring(tmp, i + 1));
            } else if (c == '(') {//如果是左括弧直接入栈
                signStack.push(c);
            } else if (c == ')') {//如果是右括弧直接出栈输出，直到出现左括弧，(不输出
                while (signStack.peek() != '(') {
                    hzList.add(String.valueOf(signStack.pop()));
                }
                //去掉栈顶的(
                signStack.pop();
            } else {//均为+-*/运算符
                while (!signStack.isEmpty() && signStack.peek() != '(' && map.get(signStack.peek()) >= map.get(c)) {//如果栈中运算符优先级大于大于它，那么出栈输出
                    hzList.add(String.valueOf(signStack.pop()));
                }
                //最后自己入栈
                signStack.push(c);
            }
        }
        //栈中还存留符号出栈输出
        while (!signStack.isEmpty()) {
            hzList.add(String.valueOf(signStack.pop()));
        }
        //中缀转后缀表达式，假定s只有数字()+-*/不含其它字符===========end

        //计算后缀表达式成最终结果
        Stack<String> digitStack = new Stack<>();
        for (String str : hzList) {
            if (isNumeric(str)) {
                digitStack.push(str);
            } else if ("+".equals(str)) {
                int a = Integer.valueOf(digitStack.pop());
                int b = Integer.valueOf(digitStack.pop());
                digitStack.push(String.valueOf(b + a));
            } else if ("-".equals(str)) {
                int a = Integer.valueOf(digitStack.pop());
                int b = Integer.valueOf(digitStack.pop());
                digitStack.push(String.valueOf(b - a));
            } else if ("*".equals(str)) {
                int a = Integer.valueOf(digitStack.pop());
                int b = Integer.valueOf(digitStack.pop());
                digitStack.push(String.valueOf(b * a));
            } else if ("/".equals(str)) {
                int a = Integer.valueOf(digitStack.pop());
                int b = Integer.valueOf(digitStack.pop());
                digitStack.push(String.valueOf(b / a));
            }
        }
        return Integer.valueOf(digitStack.pop());
    }

    private boolean isNumeric(String str) {
        for (int i = str.length(); --i >= 0; ) {
            if (!Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
```
