---
layout: post
title:  "204. 计数质数"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

统计所有小于非负整数 n 的质数的数量。

示例:

```
输入: 10
输出: 4
解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
```

解1：小学数学没有学好，先来一下质数定义。质数又称素数。一个大于1的自然数，除了1和它自身外，不能被其他自然数整除的数叫做质数；否则称为合数。暴力拆解，时间复杂度达不到，数很大时，耗时长。看解2。

```
这道题的关键点就在于如何更有效的判断一个数为质数
那么这里举几个例子
比如16，那么有1*16，2*8，4*4，8*2，16*1这几个整数相乘的结果等于16。
再来看一个，
25，1*25，5*5，25*1
20，1*20，2*10，4*5，5*4，10*2，20*1
那么这里可以发现有如下规律：
众多 i*j=n 中，总有一个小于并最接近sqrt(n)开根号的整数k，
使得以后的所有i*j开始变成j*i，也就是说，从k以后，
下一个i*j就会开始和前面的相同，所以这里可以将原本需要
从1开始循环判断到n的量缩减到
小于等于sqrt(n)
```


```
public int countPrimes(int n) {
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime(i)) {
                count++;
            }
        }
        return count;
    }

    private boolean isPrime(int num) {
        if (num <= 1) {
            return false;
        }
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
```

解2：埃拉托色尼筛选法(the Sieve of Eratosthenes)简称埃氏筛法，是古希腊数学家埃拉托色尼(Eratosthenes 274B.C.～194B.C.)提出的一种筛选法。 是针对自然数列中的自然数而实施的，用于求一定范围内的质数，它的容斥原理之完备性条件是p=H~。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1ftishf3o2cj30n20emgr8.jpg)

```
埃氏筛法步骤
（1）先把1删除（现今数学界1既不是质数也不是合数）
（2）读取队列中当前最小的数2，然后把2的倍数删去
（3）读取队列中当前最小的数3，然后把3的倍数删去
（4）读取队列中当前最小的数5，然后把5的倍数删去
（5）读取队列中当前最小的数7，然后把7的倍数删去
（6）继续下一个质数，同上
（7）如上所述直到需求的范围内所有的数均删除或读取
注：此处的队列并非数据结构队列，如需保留运算结果，处于
存储空间的充分利用以及大量删除操作的实施，建议采用链表的数据结构。
```

```
public int countPrimes(int n) {
        if ((n ^ 0) == 0 || (n ^ 1) == 0) {
            return 0;
        }
        //对应的数0,1,2,..,(n-1)
        boolean[] prime = new boolean[n];
        Arrays.fill(prime, true);
        //0和1肯定不是质数
        prime[0] = false;
        prime[1] = false;
        //从2开始
        for (int i = 2; i < n; i++) {
            if (prime[i]) {
                // 将i的2倍、3倍、4倍...都标记为非素数
                for (int j = i * 2; j < n; j = j + i) {
                    prime[j] = false;
                }
            }
        }
        //统计
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (prime[i]) {
                count++;
            }
        }
        return count;
    }
```