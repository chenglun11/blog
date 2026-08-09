---
title: "软件工程-扇入（Fan-in）和扇出（Fan-out）"
description: "说明（Explanation）： 扇出是指一个函数直接调用（控制）其它函数的数目， 在面向对象编程中，扇出应用于继承。 扇入是指有多少上级函数调用它。 有关（About）： 扇入越大，表示该模块被更多的上级模块共享。这当然是我们所希望的。但是不能为了获得高扇入而不惜代价，例如把彼此无关的功能凑在一起构成一个模块，虽然扇入数高了，但这样的模块内聚程度必然低。这"
pubDate: "2022-01-30T15:44:57.000Z"
updatedDate: "2024-01-04T06:36:41.000Z"
tags: []
categories: ["学习笔记"]
wordpressId: 144
oldUrl: "https://blog.lchnan.cn/archives/144"
---
**_说明（Explanation）：_**

**[扇](https://baike.baidu.com/item/%E6%89%87%E5%87%BA)**[出](https://baike.baidu.com/item/%E6%89%87%E5%87%BA)是指一个函数直接调用（控制）其它函数的数目， 在面向对象编程中，扇出应用于继承。

[扇入](https://baike.baidu.com/item/%E6%89%87%E5%85%A5)是指有多少上级[函数调用](https://baike.baidu.com/item/%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)它。

**_有关（About）：_**

**扇入越大**，表示该模块被更多的上级模块共享。这当然是我们所希望的。但是不能为了获得高扇入而不惜代价，例如把_彼此无关的功能凑在一起构成一个模块_，虽然扇入数高了，但这样的模块内聚程度必然低。这是我们应避免的。

**[扇出](https://baike.baidu.com/item/%E6%89%87%E5%87%BA)过大**，表明函数过分_复杂_，需要控制和协调过多的下级函数；

**扇出过小**，如总是1，表明函数的调用层次可能过多，这样不利程序阅读和函数结构的分析，并且程序运行时会对[系统资源](https://baike.baidu.com/item/%E7%B3%BB%E7%BB%9F%E8%B5%84%E6%BA%90)如[堆栈](https://baike.baidu.com/item/%E5%A0%86%E6%A0%88)空间等造成压力。函数较合理的[扇出](https://baike.baidu.com/item/%E6%89%87%E5%87%BA)（调度函数除外）通常是3-5。

**[扇出](https://baike.baidu.com/item/%E6%89%87%E5%87%BA)太大**，一般是由于缺乏中间层次，可适当增加中间层次的函数。

**[扇出](https://baike.baidu.com/item/%E6%89%87%E5%87%BA)太小**，可把下级函数进一步分解多个函数，或合并到上级函数中。当然分解或合并函数时，不能改变要实现的功能，也不能违背函数间的独立性。

_**关键（Key）：**_

设计良好的[软件结构](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E7%BB%93%E6%9E%84)，通常_**顶层扇出比较大，中间扇出小，底层模块则有大[扇入](https://baike.baidu.com/item/%E6%89%87%E5%85%A5)。**_
