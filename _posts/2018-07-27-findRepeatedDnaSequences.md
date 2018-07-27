---
layout: post
title:  "187. 重复的DNA序列"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

所有 DNA 由一系列缩写为 A，C，G 和 T 的核苷酸组成，例如：“ACGAATTCCG”。在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。

编写一个函数来查找 DNA 分子中所有出现超多一次的10个字母长的序列（子串）。

示例:

```
输入: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"

输出: ["AAAAACCCCC", "CCCCCAAAAA"]
```

解1：ac解，利用hashset的add方法返回true和false来判断子串是否出现超多一次，但是字符串保存的空间消耗大。

```
class Solution {
   public List<String> findRepeatedDnaSequences(String s) {
        //记录不是第一次遍历到的结果
        Set<String> result = new HashSet<String>();
        //记录第一次遍历到的结果
        Set<String> visited = new HashSet<String>();
        for (int i = 0; i < s.length() - 9; i++) {
            //获得以i作为起点的长度为10的字符串
            String cur = s.substring(i, i + 10);
            if (!visited.add(cur)) {
                result.add(cur);
            }
        }
        return new ArrayList<String>(result);
    }
}
```

解2：解1简单但是空间消耗大,代码不够优雅。

复习一下位运算中的按位与或非

* 按位或规则：

```
1｜1=1
1｜0=1
0｜1=1
0｜0=0
```

* 按位与规则：

```
1&1=1
1&0=0
0&1=0
0&0=0
```

* 非运算规则：

```
~1=0
~0=1
```

再复习一下十六进制，表达方式0x

```
1111 = F
1110 = E
1101 = D
1100 = C
1011 = B
1010 = A
1001 = 9
1000 = 8
0111 = 7
0110 = 6
0101 = 5
0100 = 4
0011 = 3
0010 = 2
0001 = 1
0000 = 0
```
这里我们用一个整形int共32位就能保存10个由ACGT组成的字符串，大大节省了空间，代码优雅得一匹。

```
class Solution {
   public List<String> findRepeatedDnaSequences(String s) {
        //ACGT的SCII码的二进制表示，由此可知取后2位或者3位我们可以区分这4个字母
        //这里我们以取后3位来区分
        //     A: 1000001
        //     C: 1000011
        //     G: 1000111
        //     T: 1010100
        //记录不是第一次遍历到的结果
        Set<String> result = new HashSet();
        //记录第一次遍历到的结果
        Set<Integer> visited = new HashSet();
        for (int i = 0; i < s.length() - 9; i++) {
            int sum = 0;
            for (int j = i; j < i + 10; j++) {
                //int占4个字节，每个字节8位，共32位，左移3位，低位空出3位补0用来保存字符
                sum = sum << 3;
                //0x7为十六进制的7，是0111，刚好3位1，我们可以与字符做按位与操作以使用字符的高位都变成0
                //将字符转成低3位就能识别的数
                //例如A:1000001 & 0111 变成0000001
                int tmp = s.charAt(j) & 0x7;
                //按位或操作放入sum
                sum = sum | tmp;
                //0x3FFFFFFF为0011 1111 1111 1111 1111 1111 1111 1111刚好30位1，做按位与操作,此步做不做都一样
                //sum = sum & 0x3FFFFFFF;
            }
            if (!visited.add(sum)) {
                result.add(s.substring(i, i + 10));
            }

        }
        return new ArrayList<>(result);
    }
}
```

其实还可以用这种来做，也是一样的。

```
 char[] map = new char[26];
        map['A'-'A'] = 0;//00
        map['C'-'A'] = 1;//01
        map['G'-'A'] = 2;//10
        map['T'-'A'] = 3;//11
```
