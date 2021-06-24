## Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。

```
function Container() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    console.log(45545)
    document.title = `You clicked ${count} times`;
    return function name() {
      // componentWillUnmount
      console.log('componentWillUnmount')
      document.title = `You clicked ${count} times`;
    }
  },[count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```