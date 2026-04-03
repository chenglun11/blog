---
title: 'React 性能优化：实战指南'
description: '从实际项目出发，分享 React 应用性能优化的方法和技巧，包括渲染优化、代码分割和状态管理最佳实践。'
pubDate: '2026-03-12'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['React', '性能', '前端']
---

## 性能问题的表现

你的 React 应用是否有这些症状：

- 列表滚动时卡顿
- 输入框输入有延迟
- 页面切换不流畅
- 首屏加载时间过长

这些问题往往不是 React 本身的问题，而是我们的使用方式不当。

## 诊断工具

在优化之前，先要找到性能瓶颈。

### React DevTools Profiler

```jsx
// 在开发环境中使用
<Profiler id="UserList" onRender={onRenderCallback}>
  <UserList />
</Profiler>
```

Profiler 会告诉你：
- 哪些组件渲染了
- 渲染花费了多少时间
- 为什么会重新渲染

### Chrome Performance 面板

记录用户交互过程，查看：
- JavaScript 执行时间
- 布局和绘制耗时
- 长任务（超过 50ms）

## 渲染优化

### 1. 避免不必要的重渲染

**问题代码**：

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveChild />  {/* 每次都会重渲染 */}
    </div>
  );
}
```

**优化方案**：

```jsx
// 方案 1: React.memo
const ExpensiveChild = React.memo(function ExpensiveChild() {
  // 只有 props 变化时才重渲染
  return <div>...</div>;
});

// 方案 2: 组件拆分
function Parent() {
  return (
    <div>
      <Counter />
      <ExpensiveChild />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### 2. 优化列表渲染

**使用虚拟滚动**：

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

只渲染可见区域的元素，大幅提升长列表性能。

### 3. 合理使用 useMemo 和 useCallback

**何时使用**：
- 计算开销大的值
- 作为 props 传递给子组件的函数或对象

```jsx
function SearchResults({ query }) {
  // 避免每次渲染都重新计算
  const filteredResults = useMemo(() => {
    return expensiveFilter(data, query);
  }, [data, query]);

  // 避免子组件不必要的重渲染
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <ResultList
      items={filteredResults}
      onClick={handleClick}
    />
  );
}
```

**注意**：不要过度使用，简单的计算不需要 memoization。

## 代码分割

### 路由级别的懒加载

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### 组件级别的懒加载

```jsx
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        显示图表
      </button>
      {showChart && (
        <Suspense fallback={<Spinner />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

## 状态管理优化

### 1. 状态下沉

不要把所有状态都放在顶层：

```jsx
// ❌ 不好：状态在顶层，影响整个树
function App() {
  const [formData, setFormData] = useState({});
  return (
    <div>
      <Header />
      <Form data={formData} onChange={setFormData} />
      <Footer />
    </div>
  );
}

// ✅ 好：状态只在需要的地方
function App() {
  return (
    <div>
      <Header />
      <Form />  {/* 状态在内部管理 */}
      <Footer />
    </div>
  );
}
```

### 2. 使用 Context 要谨慎

Context 的任何变化都会导致所有消费者重渲染：

```jsx
// ❌ 不好：频繁变化的值和稳定的值混在一起
const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      <Content />
    </AppContext.Provider>
  );
}

// ✅ 好：拆分 Context
const UserContext = createContext();
const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Content />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

## 网络请求优化

### 1. 数据预取

```jsx
function ProductList() {
  const { data } = useQuery('products', fetchProducts);

  const prefetchProduct = (id) => {
    queryClient.prefetchQuery(['product', id], () => fetchProduct(id));
  };

  return (
    <div>
      {data.map(product => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          onMouseEnter={() => prefetchProduct(product.id)}
        >
          {product.name}
        </Link>
      ))}
    </div>
  );
}
```

### 2. 请求去重和缓存

使用 React Query 或 SWR：

```jsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,  // 2秒内的重复请求会被去重
  });

  if (error) return <div>加载失败</div>;
  if (!data) return <div>加载中...</div>;

  return <div>{data.name}</div>;
}
```

## 图片优化

```jsx
// 使用现代图片格式
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="描述" loading="lazy" />
</picture>

// 或使用 Next.js Image 组件
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  placeholder="blur"
  alt="描述"
/>
```

## 性能监控

在生产环境中持续监控：

```jsx
// 使用 Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // 发送到你的分析服务
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 总结

React 性能优化的核心原则：

1. **测量优先**：先找到瓶颈，不要盲目优化
2. **避免过早优化**：先让代码工作，再让它快
3. **关注用户体验**：优化用户能感知到的部分
4. **持续监控**：性能是一个持续的过程

记住，最好的优化往往是架构层面的，而不是微观的代码调整。
