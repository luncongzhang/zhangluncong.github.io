---
layout: post
title:  "166. 分数到小数"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以字符串形式返回小数。

如果小数部分为循环小数，则将循环的部分括在括号内。

示例 1:

```
输入: numerator = 1, denominator = 2
输出: "0.5"
```

示例 2:

```
输入: numerator = 2, denominator = 1
输出: "2"
```

示例 3:

```
输入: numerator = 2, denominator = 3
输出: "0.(6)"
```

解：全在注释里。/求商，%求余数。除不尽的情况一定是最后一位小数不断循环比如0.125555...这种5一直循环的小数，不可能存在比如0.125125125125...这种125循环的小数。

```
class Solution {
     public String fractionToDecimal(int numerator, int denominator) {
        if (denominator == 0) {
            return "NaN";
        }//特殊情况1
        if (numerator == 0) {
            return "0";
        }  //特殊情况2

        // 如果两个数符号不同，结果为负数  >>>为无符号右移动，int类型为32位，在计算机中以
        //补码进行计算，无符号右移31位剩下补码的符号位，正数会是0，负数会是1，再进行异或^操作，
        //都为正数会得到(0 ^ 0) == 0,都为负数会得到(1 ^ 1 == 0),一正一负会得到(0 ^ 1 == 1)
        String sign = (denominator >>> 31 ^ numerator >>> 31) == 1 ? "-" : "";

        // 先把除数和被除数转为long，以免除法和绝对值运算的时候溢出
        // 比如 -2147483648/-1 = -2147483648, abs(-2147483648) = -2147483648
        long num = numerator;
        long den = denominator;
        num = Math.abs(num);
        den = Math.abs(den);
        //商
        long major = num / den;
        //余数
        long rem = num % den;
        //能被除尽，直接返回
        if (rem == 0) {
            return sign + major;
        }

        StringBuilder ans = new StringBuilder(sign + major + '.');
        Map<Long, Integer> map = new HashMap<>();
        while (rem != 0) {
            // 如果余数已经出现过一次，那么循环要开始了
            if (map.containsKey(rem)) {
                int index = map.get(rem);
                ans.insert(index, '(').append(')');
                break;
            } else {
                //小学数学，不够借一位，*10，把商放入sb
                ans.append(rem * 10 / den);
                map.put(rem, ans.length() - 1);
            }
            //余数
            rem = rem * 10 % den;
        }

        return ans.toString();
    }
}
```
