### English introduction
Please view [README.md](https://github.com/Binaryify/vue-tetris/blob/master/README-EN.md)

## 用Vue、Vuex 做俄罗斯方块

----
本项目灵感来源于 React 版的[俄罗斯方块](https://github.com/chvin/react-tetris),由于对其实现原理较感兴趣,而且相比于 React 更喜欢 Vue, 于是把 React 版的重构为了 Vue 版的,大致思路是把组件当成一个个函数,保证一个输入(props)能得到一个确定的输出(view),然后对不同方法也是做同样处理,对于 Redux 使用 Vuex 精简化

戳：[https://binaryify.github.io/vue-tetris/?lan=zh](https://binaryify.github.io/vue-tetris/?lan=zh) 玩一玩！

----
### 效果预览
![效果预览](https://img.alicdn.com/tps/TB1Ag7CNXXXXXaoXXXXXXXXXXXX-320-483.gif)

正常速度的录制，体验流畅。

### 响应式
![响应式](https://img.alicdn.com/tps/TB1AdjZNXXXXXcCapXXXXXXXXXX-480-343.gif)

不仅指屏幕的自适应，而是`在PC使用键盘、在手机使用手指的响应式操作`：

![手机](https://img.alicdn.com/tps/TB1kvJyOVXXXXbhaFXXXXXXXXXX-320-555.gif)

### 数据持久化

[视频](https://static.binaryify.com/persistence.mp4)

玩单机游戏最怕什么？断电。通过订阅 `store.subscribe`，将state储存在localStorage，精确记录所有状态。网页关了刷新了、程序崩溃了、手机没电了，重新打开连接，都可以继续。

### Vuex 状态预览（[Vue DevTools extension](https://github.com/vuejs/vue-devtools)）
![preview](https://static.binaryify.com/vuex.gif)

[视频](https://static.binaryify.com/vuex.mp4)

Vuex 设计管理了所有应存的状态，这是上面持久化的保证。

----
游戏框架使用的是 [Vue](https://github.com/vuejs/vue) + [Vuex](https://github.com/vuejs/vuex)


## 1、Web Audio Api
游戏里有很多不同的音效，而实际上只引用了一个音效文件：[/build/music.mp3](https://github.com/Binaryify/vue-tetris/blob/master/build/music.mp3)。借助`Web Audio Api`能够以毫秒级精确、高频率的播放音效，这是`<audio>`标签所做不到的。在游戏进行中按住方向键移动方块，便可以听到高频率的音效。

![网页音效进阶](https://img.alicdn.com/tps/TB1fYgzNXXXXXXnXpXXXXXXXXXX-633-358.png)

`WAA` 是一套全新的相对独立的接口系统，对音频文件拥有更高的处理权限以及更专业的内置音频效果，是W3C的推荐接口，能专业处理“音速、音量、环境、音色可视化、高频、音向”等需求，下图介绍了WAA的使用流程。

![流程](https://img.alicdn.com/tps/TB1nBf1NXXXXXagapXXXXXXXXXX-520-371.png)

其中Source代表一个音频源，Destination代表最终的输出，多个Source合成出了Destination。
源代码：[/src/unit/music.js](https://github.com/Binaryify/vue-tetris/blob/master/src/unit/music.js) 实现了ajax加载mp3，并转为WAA，控制播放的过程。

`WAA` 在各个浏览器的最新2个版本下的支持情况（[CanIUse](http://caniuse.com/#search=webaudio)）

![浏览器兼容](https://img.alicdn.com/tps/TB15z4VOVXXXXahaXXXXXXXXXXX-679-133.png)

可以看到IE阵营与大部分安卓机不能使用，其他ok。


Web Audio Api 学习资料：
* [Web API 接口| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
* [Getting Started with Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/intro/)

----
## 3、游戏在体验上的优化
* 技术：
	* 按下方向键水平移动和竖直移动的触发频率是不同的，游戏可以定义触发频率，代替原生的事件频率，源代码：[/src/unit/event.js](https://github.com/Binaryify/vue-tetris/blob/master/src/unit/event.js) ；
	* 左右移动可以 delay 掉落的速度，但在撞墙移动的时候 delay 的稍小；在速度为6级时 通过delay 会保证在一行内水平完整移动一次；
	* 对按钮同时注册`touchstart`和`mousedown`事件，以供响应式游戏。当`touchstart`发生时，不会触发`mousedown`，而当`mousedown`发生时，由于鼠标移开事件元素可以不触发`mouseup`，将同时监听`mouseout` 模拟 `mouseup`。源代码：[/src/components/keyboard/index.js](https://github.com/Binaryify/vue-tetris/blob/master/src/components/keyboard/index.js)；
	* 监听了 `visibilitychange` 事件，当页面被隐藏\切换的时候，游戏将不会进行，切换回来将继续，这个`focus`状态也被写进了 Vuex 中。所以当用手机玩来`电话`时，游戏进度将保存；PC开着游戏干别的也不会听到gameover，这有点像 `ios` 应用的切换。
	* 在`任意`时刻刷新网页，（比如消除方块时、游戏结束时）也能还原当前状态；
	* 游戏中唯一用到的图片是![image](https://img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png)，其他都是CSS；
	* 游戏兼容 Chrome、Firefox、IE9+、Edge等；
* 玩法：
	* 可以在游戏未开始时制定初始的棋盘（十个级别）和速度（六个级别）；
	* 一次消除1行得100分、2行得300分、3行得700分、4行得1500分；
	* 方块掉落速度会随着消除的行数增加（每20行增加一个级别）；

----

## 4、开发中的经验梳理,以及如何把 React 项目重构为 Vue 版本
Vue 版本和 React 版本核心代码基本相同,但在编写组件的时候遇到了几个问题,比如:

1. 如何把 React 组件改写成 Vue 的,我的思路是把组件当成函数,保证一个输入(props)能得到一个确定的输出(view),然后对不同方法也是做同样处理, React 的 setState 会触发 render 方法,所以可以在 methods 自定义 render 方法再在 state 变化后手动触发 render 方法

2. 生命周期,简单来说, React 的 `componentWillMount` 对应 Vue 的 `beforeMount`, React 的 `componentDidMount` 对应 Vue 的 `mounted`,React 的用来优化性能的 `shouldComponentUpdate` 在 Vue 里并不需要,不需要手动优化这也是我喜欢 Vue 的一点

3. Vue 没有 React 的`componentWillReceiveProps` 的生命周期,我的解决方法是使用 watch 配合 `deep:true` 来监听 props 的变化,如:
```js
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        //xxx
      }
    }
  }
```

4. 在必要时候使用 jsx 和 'render' 函数,是的, vue 支持 jsx,在这个项目中`matrix 组件` 的功能逻辑较复杂,使用 `template` 模版来渲染组件已经不合适了, React 每次 setState 会触发 'render' 方法,所以我们可以在 methods自定义 'render' 方法再在 state 变化后手动触发 'render' 方法,但是这个方法对有复杂逻辑的组件来说会变得很繁琐,我的解决方法是通过 Vue 的 jsx 转换插件[babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)来使用 jsx 语法对页面进行渲染,当 props 或 state 变化了自动触发 'render' 方法,另外要注意的是 vue 的 jsx 和 React 的 jsx 书写上有一点的差异, 当 'render' 方法存在时,template 语法会失效. 'render' 函数一个比较实用的用处是在开发类似 React-log 之类的不需要渲染 html 只需要执行一些方法的组件时 template 会显得很多余,因为这时候并不需要渲染 dom 了,如果用了 'render' 函数,简单的在 'render' 函数里 return false 就行,如: [react-log](https://github.com/diegomura/react-log/blob/b1bb695a6997cd1be399170186cf6ff1e27393d7/src/Log.js#L33)

## 5、架构差异
Redux 的数据流向是通过 `mapStateToProps` 把 store 的状态转化为 props 然后通过`connect` 函数注入到 根组件,根组件再把这些 props 传入不同组件,当 store 的状态变化,根组件会重新 render, 更新子组件上的 props,子组件再 根据新 props重新 render
引用知乎一个答友的回答[https://www.zhihu.com/question/47686258](https://www.zhihu.com/question/47686258)来说就是:
>单例store的数据在react中可以通过view组件的属性（props）不断由父模块**“单向”**传递给子模块，形成一个树状分流结构。如果我们把redux比作整个应用的“心肺” （redux的flux功能像心脏，reducer功能像肺部毛细血管），那么这个过程可以比作心脏（store）将氧分子（数据）通过动脉毛细血管（props）送到各个器官组织（view组件）末端的view组件，又可以通过flux机制，将携带交互意图信息的action反馈给store。这个过程有点像将携带代谢产物的“红细胞”（action）通过静脉毛细血管又泵回心脏（store）action流回到store以后，action以参数的形式又被分流到各个具体的reducer组件中，这些reducer同样构成一个树状的hierarchy。这个过程像静脉血中的红细胞（action）被运输到肺部毛细血管（reducer组件）接收到action后，各个child reducer以返回值的形式，将最新的state返回给parent reducer，最终确保整个单例store的所有数据是最新的。这个过程可以比作肺部毛细血管的血液充氧后，又被重新泵回了心脏

而 vuex 的思路则不同,任何组件都随时可以通过 this.$store.state.xxx 获取 store 上的数据,更自由,从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
```js
computed: {
    keyboard () {
      return this.store.state.keyboard
    }
  }
```
调用 store.commit 提交 payload修改数据 或者 store.dispatch 提交 mutation 间接修改 store 上的数据, commit 和 dispatch 的区别在于 commit 用于同步修改状态, dispatch 用于异步修改状态,异步完成需要再调用 commit,一般简单的需求只需要 commit 一个 payload 就行,只要 store 上的数据变了,组件都会自动重新渲染

## 6、开发
### 安装
```
npm install
```
### 运行
```
npm run dev
```
浏览自动打开 [http://localhost:8080](http://localhost:8080)

### 多语言
在 [i18n.json](https://github.com/Binaryify/vue-tetris/blob/master/src/i18n.json) 配置多语言环境，使用"lan"参数匹配语言如：`https://Binaryify.github.io/vue-tetris/?lan=en`

`http://binaryify.github.io/vue-tetris/?lan=zh`
### 打包编译
```
npm run build
```

在 `dist` 文件夹下生成结果。
