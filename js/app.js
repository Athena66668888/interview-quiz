// 题库数据（内嵌避免CORS问题）
const QUESTIONS = [
  { id: 1, category: "Java基础", question: "Java中以下哪个不是基本数据类型？", options: ["int", "String", "boolean", "double"], answer: "B", explanation: "Java的基本数据类型有8种：byte、short、int、long、float、double、char、boolean。String是引用类型，不是基本数据类型。" },
  { id: 2, category: "Java基础", question: "Java中String类能被继承吗？", options: ["能", "不能", "只能被final类继承", "看情况"], answer: "B", explanation: "String类被final修饰，因此不能被继承。final修饰的类不能有子类。" },
  { id: 3, category: "Java基础", question: "以下哪个不是Java的访问修饰符？", options: ["public", "private", "protected", "friend"], answer: "D", explanation: "Java有四种访问修饰符：public、protected、默认（包级别）、private。friend是C++中的概念，Java中没有。" },
  { id: 4, category: "Java基础", question: "Java中==和equals()的区别是什么？", options: ["没有区别", "==比较引用，equals()比较内容", "==比较内容，equals()比较引用", "都比较引用"], answer: "B", explanation: "==比较的是对象的引用地址（是否指向同一对象），equals()方法默认也比较引用，但通常被重写为比较对象的内容（如String类）。" },
  { id: 5, category: "Java基础", question: "Java中的自动装箱是将什么转换为什么？", options: ["对象转为基本类型", "基本类型转为对象", "字符串转为数字", "数字转为字符串"], answer: "B", explanation: "自动装箱是将基本数据类型自动转换为对应的包装类对象（如int转为Integer），拆箱则是反过来。" },
  { id: 6, category: "Java基础", question: "HashMap的默认初始容量是多少？", options: ["8", "16", "32", "64"], answer: "B", explanation: "HashMap的默认初始容量是16，负载因子是0.75。当元素数量超过容量×负载因子时会扩容。" },
  { id: 7, category: "Java基础", question: "以下哪个是线程安全的集合？", options: ["ArrayList", "HashMap", "ConcurrentHashMap", "LinkedList"], answer: "C", explanation: "ConcurrentHashMap是线程安全的。ArrayList、HashMap和LinkedList都不是线程安全的，多线程环境下应使用ConcurrentHashMap或Collections.synchronizedMap()。" },
  { id: 8, category: "Java基础", question: "Java中接口可以包含哪些方法？", options: ["只有抽象方法", "抽象方法和默认方法", "抽象方法、默认方法和静态方法", "任何方法"], answer: "C", explanation: "Java 8之后，接口可以包含抽象方法、默认方法（default）和静态方法（static）。Java 9后又增加了私有方法。" },
  { id: 9, category: "Java基础", question: "Java中final关键字可以修饰什么？", options: ["只有变量", "只有方法", "只有类", "类、方法和变量"], answer: "D", explanation: "final可以修饰类（不能被继承）、方法（不能被重写）和变量（值不能被修改，即常量）。" },
  { id: 10, category: "Java基础", question: "Java中异常的基类是什么？", options: ["Exception", "Error", "Throwable", "RuntimeException"], answer: "C", explanation: "Throwable是所有异常和错误的基类。它有两个子类：Error和Exception。Error表示严重问题，Exception表示异常情况。" },
  { id: 11, category: "Java基础", question: "以下哪个不是Java的集合框架接口？", options: ["List", "Set", "Map", "Array"], answer: "D", explanation: "Java集合框架主要包括List、Set、Map三大接口。Array是数组，不是集合框架的接口。" },
  { id: 12, category: "Java基础", question: "Java中创建线程的方式有几种？", options: ["1种", "2种", "3种", "4种及以上"], answer: "D", explanation: "创建线程的方式有：继承Thread类、实现Runnable接口、实现Callable接口、使用线程池。本质上前两种是最基础的。" },
  { id: 13, category: "Java基础", question: "synchronized关键字可以修饰什么？", options: ["只有方法", "只有代码块", "方法和代码块", "类、方法和代码块"], answer: "C", explanation: "synchronized可以修饰方法（同步方法）和代码块（同步代码块），但不能直接修饰类。修饰静态方法时相当于锁定Class对象。" },
  { id: 14, category: "Java基础", question: "Java中volatile关键字的作用是什么？", options: ["保证原子性", "保证可见性和有序性", "保证线程安全", "防止死锁"], answer: "B", explanation: "volatile保证变量的可见性（修改后对其他线程立即可见）和有序性（禁止指令重排序），但不保证原子性。" },
  { id: 15, category: "Java基础", question: "Java中JVM的垃圾回收机制主要回收什么？", options: ["栈内存", "堆内存", "方法区", "程序计数器"], answer: "B", explanation: "GC主要回收堆内存中的对象。栈内存随方法调用结束自动释放，方法区和程序计数器不常被GC管理。" },
  { id: 16, category: "Java基础", question: "Java中以下哪个类不能被实例化？", options: ["abstract class Animal", "class Dog", "final class Cat", "class Bird"], answer: "A", explanation: "abstract修饰的抽象类不能直接实例化，必须通过子类来实例化。普通类和final类都可以被实例化。" },
  { id: 17, category: "Java基础", question: "Java中泛型的主要作用是什么？", options: ["提高运行效率", "类型安全，消除强制类型转换", "减少内存占用", "简化代码逻辑"], answer: "B", explanation: "泛型的主要作用是提供编译时类型检查，确保类型安全，同时消除大部分强制类型转换的代码。" },
  { id: 18, category: "Java基础", question: "Java中try-catch-finally中finally块什么时候不会执行？", options: ["正常情况下都会执行", "在try中return时", "在catch中return时", "在try中调用System.exit()"], answer: "D", explanation: "finally块在正常情况下总会执行。但如果在try或catch中调用了System.exit()导致JVM退出，finally块不会执行。" },
  { id: 19, category: "Java基础", question: "Java中InputStream的作用是什么？", options: ["字节输出流", "字节输入流", "字符输出流", "字符输入流"], answer: "B", explanation: "InputStream是字节输入流的基类，用于读取字节数据。Reader是字符输入流的基类。" },
  { id: 20, category: "Java基础", question: "Spring中Bean的默认作用域是什么？", options: ["prototype", "singleton", "request", "session"], answer: "B", explanation: "Spring中Bean的默认作用域是singleton（单例），即每个Spring容器中只有一个实例。prototype是每次获取都创建新实例。" },
  { id: 21, category: "Java基础", question: "Spring中@Autowired的作用是什么？", options: ["创建Bean", "自动注入依赖", "配置事务", "映射URL"], answer: "B", explanation: "@Autowired用于自动注入依赖对象，Spring会根据类型自动匹配并注入对应的Bean。" },
  { id: 22, category: "Java基础", question: "MyBatis中#{}和${}的区别是什么？", options: ["没有区别", "#{}防止SQL注入，${}不防止", "#{}不防止，${}防止", "都防止SQL注入"], answer: "B", explanation: "#{}使用预编译，可以防止SQL注入。${}是字符串拼接，不安全，容易导致SQL注入，通常用于动态表名或列名。" },
  { id: 23, category: "Java基础", question: "Java中static关键字可以修饰什么？", options: ["只有变量", "只有方法", "变量和方法", "变量、方法、代码块和内部类"], answer: "D", explanation: "static可以修饰变量（类变量）、方法（类方法）、代码块（静态代码块）和内部类（静态内部类）。" },
  { id: 24, category: "Java基础", question: "Java中方法重写和方法重载的区别是什么？", options: ["都是同一个概念", "重写是子类改写父类方法，重载是同类中同名不同参", "重载是子类改写父类方法，重写是同类中同名不同参", "没有区别"], answer: "B", explanation: "方法重写（Override）发生在父子类之间，方法签名必须相同。方法重载（Overload）发生在同一个类中，方法名相同但参数列表不同。" },
  { id: 25, category: "Java基础", question: "Java中ArrayList和LinkedList的区别是什么？", options: ["ArrayList基于数组，LinkedList基于链表", "ArrayList基于链表，LinkedList基于数组", "都是数组实现", "都是链表实现"], answer: "A", explanation: "ArrayList基于动态数组实现，随机访问快O(1)。LinkedList基于双向链表实现，插入删除快O(1)，但随机访问慢O(n)。" },
  { id: 26, category: "Java基础", question: "Java中HashMap和HashTable的主要区别是什么？", options: ["没有区别", "HashMap线程安全，HashTable不是", "HashTable线程安全，HashMap不是", "都线程安全"], answer: "C", explanation: "HashTable是线程安全的（方法被synchronized修饰），HashMap不是。HashMap允许null键和null值，HashTable不允许。HashMap性能更好。" },
  { id: 27, category: "Java基础", question: "Java中JVM内存模型中哪个区域是线程共享的？", options: ["虚拟机栈", "本地方法栈", "程序计数器", "堆"], answer: "D", explanation: "堆和方法区是线程共享的。虚拟机栈、本地方法栈、程序计数器是线程私有的。" },
  { id: 28, category: "Java基础", question: "Spring Boot自动装配的原理是什么？", options: ["通过XML配置", "通过注解和条件装配", "通过手动编码", "通过数据库配置"], answer: "B", explanation: "Spring Boot通过@SpringBootApplication注解和spring.factories文件，结合@Conditional条件注解实现自动装配，根据依赖自动配置Bean。" },
  { id: 29, category: "Java基础", question: "Java中什么是双亲委派模型？", options: ["子加载器先加载类", "父加载器先加载类，加载不了再给子加载器", "都不加载", "随机加载"], answer: "B", explanation: "双亲委派模型：类加载器收到加载请求时，先委托给父加载器加载，父加载器加载不了才自己加载。保证核心类不被篡改。" },
  { id: 30, category: "Java基础", question: "Redis中String类型的最大容量是多少？", options: ["512MB", "1GB", "256MB", "无限制"], answer: "A", explanation: "Redis中String类型单个值最大容量是512MB。虽然通常不会存这么大的数据，但这是Redis的硬性限制。" },
  { id: 31, category: "并发编程", question: "线程池的核心线程在没有设置allowCoreThreadTimeOut时会发生什么？", options: ["会立刻被回收", "会保持空闲状态，等待任务到来", "会自动转为普通工作线程", "会抛出异常并结束线程"], answer: "B", explanation: "核心线程在没有设置allowCoreThreadTimeOut时会一直存活，不会立即回收。只有超出核心线程数的线程才会根据空闲时间被回收。" },
  { id: 32, category: "并发编程", question: "关于volatile关键字，以下说法错误的是？", options: ["volatile保证可见性", "volatile保证原子性", "volatile禁止指令重排序", "volatile不能替代锁"], answer: "B", explanation: "volatile只能保证变量的可见性和禁止指令重排序，不能保证复合操作的原子性。例如i++不是原子操作，volatile无法保证i++的线程安全。" },
  { id: 33, category: "并发编程", question: "在Java中，ThreadLocal的key为什么设计为弱引用？", options: ["为了提高内存利用率", "为了防止内存泄漏", "为了加快访问速度", "为了支持并发访问"], answer: "B", explanation: "ThreadLocalMap的Entry中key是弱引用。当ThreadLocal对象不再被外部强引用时，弱引用的key可以被GC回收，避免ThreadLocalMap中残留大量无用Entry导致内存泄漏。" },
  { id: 34, category: "并发编程", question: "ConcurrentHashMap在JDK1.7和JDK1.8中的实现差异，下列说法正确的是？", options: ["1.7使用Segment，1.8使用CAS+synchronized", "1.7使用锁分离，1.8使用全局锁", "1.7基于数组，1.8基于链表", "1.7支持并发读取，1.8不支持"], answer: "A", explanation: "JDK1.7中ConcurrentHashMap使用Segment分段锁，1.8改为数组+链表/红黑树，并用CAS+synchronized保证并发安全。" },
  { id: 35, category: "并发编程", question: "关于CAS（Compare And Swap）操作，以下描述正确的是？", options: ["CAS是原子性操作", "CAS可以完全替代synchronized", "CAS不区分悲观锁和乐观锁", "CAS一定能避免ABA问题"], answer: "A", explanation: "CAS是一种无锁原子操作，属于乐观锁思想。但它不能直接替代synchronized，并且默认无法解决ABA问题，需要配合版本号等机制。" },
  { id: 36, category: "JVM", question: "JVM内存模型中，属于线程共享的内存区域有？", options: ["虚拟机栈、程序计数器", "堆、方法区", "虚拟机栈、本地方法栈", "程序计数器、本地方法栈"], answer: "B", explanation: "堆和方法区是JVM中线程共享的内存区域。堆存放对象实例和数组，方法区存放类信息、常量、静态变量等。虚拟机栈、本地方法栈和程序计数器是线程私有的。" },
  { id: 37, category: "JVM", question: "关于双亲委派模型，以下说法错误的是？", options: ["类加载器先委托父加载器加载", "可以避免重复加载类", "自定义类加载器可以完全打破双亲委派", "String类由Bootstrap类加载器加载"], answer: "C", explanation: "双亲委派模型可以被子类加载器破坏，例如重写loadClass()方法，但自定义类加载器仍应优先委托父加载器加载系统类。String类由Bootstrap类加载器加载。" },
  { id: 38, category: "JVM", question: "JDK8默认使用的垃圾回收器是？", options: ["G1", "CMS", "Parallel GC", "Serial GC"], answer: "C", explanation: "JDK8默认使用Parallel GC。G1在JDK9后逐渐成为主流，CMS在JDK9中被标记为废弃，JDK14中正式移除。" },
  { id: 39, category: "JVM", question: "关于JVM类加载过程，以下说法正确的是？", options: ["链接阶段只做验证", "准备阶段会为所有变量分配内存", "初始化阶段执行静态代码块", "类加载不需要验证阶段"], answer: "C", explanation: "类加载分为加载、验证、准备、解析、初始化。验证确保class文件符合JVM规范；准备为类变量分配内存并赋默认值；初始化阶段执行类构造器，包括静态变量赋值和静态代码块。" },
  { id: 40, category: "JVM", question: "Full GC通常发生在以下哪种场景？", options: ["Eden区空间不足", "Minor GC后老年代空间不足", "方法区空间不足", "元空间空间不足"], answer: "D", explanation: "Full GC是全局回收，会回收老年代和新生代，还可能回收方法区或元空间。元空间空间不足时可能触发Full GC。" },
  { id: 41, category: "Spring", question: "关于Spring IoC容器，以下说法正确的是？", options: ["Bean的默认作用域是prototype", "@Bean注解必须加在接口上", "@Configuration类中的@Bean方法会被代理", "@Component只能放在类上"], answer: "C", explanation: "@Configuration类中的@Bean方法会被CGLIB代理，确保容器内多次调用同一个@Bean方法时返回同一个单例Bean。" },
  { id: 42, category: "Spring", question: "Spring AOP中，默认使用的代理方式是什么？", options: ["CGLIB代理", "JDK动态代理", "字节码增强", "静态织入"], answer: "B", explanation: "Spring AOP默认使用JDK动态代理。只有当目标对象没有实现接口时，Spring才会使用CGLIB代理。JDK动态代理基于接口，CGLIB基于继承。" },
  { id: 43, category: "Spring", question: "Spring Bean的生命周期中，@PostConstruct注解的方法在哪个阶段执行？", options: ["实例化之前", "实例化之后，属性赋值之前", "属性赋值之后，初始化之前", "初始化回调之后"], answer: "C", explanation: "@PostConstruct标注的方法在属性赋值完成之后执行，早于InitializingBean的afterPropertiesSet()、自定义init-method以及BeanPostProcessor的后置初始化处理。" },
  { id: 44, category: "Spring", question: "Spring事务的默认传播行为是什么？", options: ["REQUIRES_NEW", "REQUIRED", "SUPPORTS", "NOT_SUPPORTED"], answer: "B", explanation: "Spring事务默认传播行为是REQUIRED，即如果当前存在事务则加入，否则新建事务。这是Spring事务管理的默认规则。" },
  { id: 45, category: "Spring", question: "关于Spring自动装配（@Autowired），以下说法正确的是？", options: ["@Autowired只能注入单个Bean", "@Autowired找不到Bean时不会报错", "@Autowired默认按名称注入", "@Autowired默认按类型注入"], answer: "D", explanation: "@Autowired默认按类型注入。如果容器中只有一个匹配的Bean，可以直接注入；如果有多个，则结合@Qualifier指定名称。找不到Bean且required为true时会报错。" },
  { id: 46, category: "数据库", question: "MySQL索引中，最常用的是哪种索引结构？", options: ["哈希索引", "二叉树索引", "B+树索引", "跳表索引"], answer: "C", explanation: "MySQL InnoDB默认使用B+树作为索引结构。B+树叶子节点存储数据或主键，非叶子节点存储索引，适合范围查询和排序查询。" },
  { id: 47, category: "数据库", question: "MySQL事务的ACID特性中，A代表什么？", options: ["原子性", "一致性", "隔离性", "持久性"], answer: "A", explanation: "ACID分别代表原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）。原子性保证事务中的操作要么全部成功，要么全部回滚。" },
  { id: 48, category: "数据库", question: "MySQL事务隔离级别中，可以完全解决幻读的是？", options: ["读未提交", "读已提交", "可重复读", "序列化"], answer: "D", explanation: "序列化（SERIALIZABLE）事务隔离级别可以完全解决幻读问题，但它执行效率较低。MySQL的InnoDB在可重复读级别通过MVCC+间隙锁也能解决大部分幻读问题。" },
  { id: 49, category: "数据库", question: "关于SQL优化，以下做法错误的是？", options: ["避免使用SELECT *", "给WHERE条件中的字段建立索引", "频繁修改索引字段", "使用EXPLAIN分析执行计划"], answer: "C", explanation: "频繁修改索引字段会导致索引失效或维护成本增加。SELECT *应避免使用，WHERE条件字段应建立索引，EXPLAIN可以帮助分析执行计划。" },
  { id: 50, category: "数据库", question: "Redis中，Bitmap适合用于什么场景？", options: ["存储用户在线状态", "存储用户评论", "存储用户密码", "存储用户头像"], answer: "A", explanation: "Bitmap以位为单位存储数据，适合记录状态类信息，如用户是否在线、是否签到、是否订阅等。它不是普通String，不能用于存储评论、密码或头像等数据。" }
];

// 错题本（从localStorage读取）
let wrongQuestions = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
// 已答对题目
let correctQuestions = JSON.parse(localStorage.getItem('correctQuestions') || '[]');
// 收藏题目
let favoriteQuestions = JSON.parse(localStorage.getItem('favoriteQuestions') || '[]');
// 连击计数器
let currentStreak = parseInt(localStorage.getItem('currentStreak') || '0');
// 连错计数器
let wrongStreak = parseInt(localStorage.getItem('wrongStreak') || '0');
// 积分系统
let totalPoints = parseInt(localStorage.getItem('totalPoints') || '0');
// 答题计时
let quizStartTime = null;
let quizTimerInterval = null;
let quizTimes = JSON.parse(localStorage.getItem('quizTimes') || '{}');
// 当前选中的分类（null 表示全部分类）
let currentCategory = null;

// 等级定义
const LEVELS = [
  { min: 0, name: 'Java小白', icon: '🌱' },
  { min: 50, name: '代码新手', icon: '🍃' },
  { min: 150, name: '初级开发', icon: '⚡' },
  { min: 300, name: '中级开发', icon: '🔧' },
  { min: 500, name: '高级开发', icon: '🚀' },
  { min: 800, name: '架构师', icon: '👑' },
  { min: 1200, name: '技术专家', icon: '🏆' },
];

function getLevel(points) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (points >= l.min) level = l;
  }
  return level;
}

function getNextLevel(points) {
  for (const l of LEVELS) {
    if (points < l.min) return l;
  }
  return null;
}

function updatePointsDisplay() {
  const el = document.getElementById('points-display');
  if (!el) return;
  const level = getLevel(totalPoints);
  const next = getNextLevel(totalPoints);
  const progress = next ? Math.round((totalPoints - level.min) / (next.min - level.min) * 100) : 100;
  el.innerHTML = `
    <span class="level-icon">${level.icon}</span>
    <div class="points-info">
      <span class="points-value">${totalPoints}</span>
      <span class="points-label">积分 · ${level.name}</span>
    </div>
    ${next ? `<div class="level-progress"><div class="level-fill" style="width:${progress}%"></div></div>` : '<div class="level-progress"><div class="level-fill" style="width:100%;background:linear-gradient(90deg,#ff9500,#ffd700);"></div></div>'}
  `;
}

// 渲染分类
function renderCategories() {
  const categoryList = document.getElementById('category-list');
  const categories = {};
  QUESTIONS.forEach(q => {
    if (!categories[q.category]) categories[q.category] = 0;
    categories[q.category]++;
  });

  categoryList.innerHTML = '';

  // 添加"全部分类"选项
  const allLi = document.createElement('li');
  allLi.className = 'category-card' + (currentCategory === null ? ' active' : '');
  allLi.innerHTML = `
    <div class="category-name">全部分类</div>
    <div class="category-count">${QUESTIONS.length} 题</div>
  `;
  allLi.onclick = () => {
    // 清空搜索框并显示全部题目
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    currentCategory = null;
    renderCategories();
    renderQuestions();
  };
  categoryList.appendChild(allLi);

  Object.keys(categories).forEach(cat => {
    const li = document.createElement('li');
    li.className = 'category-card' + (currentCategory === cat ? ' active' : '');
    li.innerHTML = `
      <div class="category-name">${cat}</div>
      <div class="category-count">${categories[cat]} 题</div>
    `;
    li.onclick = () => {
      // 清空搜索框并按分类筛选
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.value = '';
      currentCategory = cat;
      renderCategories();
      renderQuestions(cat);
    };
    categoryList.appendChild(li);
  });
}

// 渲染题目列表
function renderQuestions(filterCategory, searchResults = null) {
  const questionList = document.getElementById('question-list');
  questionList.innerHTML = '';

  // 如果有搜索结果，优先显示搜索结果
  const questionsToRender = searchResults !== null
    ? searchResults
    : filterCategory
      ? QUESTIONS.filter(q => q.category === filterCategory)
      : QUESTIONS;

  if (questionsToRender.length === 0) {
    const emptyMessage = searchResults !== null ? '未找到相关题目' : '暂无题目';
    questionList.innerHTML = `<li class="empty">${emptyMessage}</li>`;
    return;
  }

  // 移除了首页题目列表中的随机出题按钮，现在只显示在欢迎栏

  questionsToRender.forEach((q, index) => {
    const li = document.createElement('li');
    li.className = 'question-item';
    const isCorrect = correctQuestions.includes(q.id);
    const isWrong = wrongQuestions.includes(q.id);
    const statusIcon = isCorrect ? '<span class="status correct">✓</span>' : (isWrong ? '<span class="status wrong">✗</span>' : '');
    li.innerHTML = `
      <div class="question-info">
        <span class="question-num">第${index + 1}题</span>
        <span class="question-tag">${q.category}</span>
        ${statusIcon}
      </div>
      <div class="question-text">${q.question}</div>
    `;
    li.onclick = () => showQuiz(q, index, questionsToRender);
    questionList.appendChild(li);
  });
}

// 显示答题界面
function showQuiz(question, index, list) {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <button class="btn-back" onclick="backToList()">← 返回列表</button>
        <span class="quiz-progress">第 ${index + 1} / ${list.length} 题</span>
        <span class="quiz-timer" id="quiz-timer"><span class="quiz-timer-emoji">⏰</span> 0s</span>
        <button class="btn-favorite" id="favorite-btn" onclick="toggleFavorite(${question.id})">
          <span class="favorite-icon ${favoriteQuestions.includes(question.id) ? 'favorited' : ''}">★</span>
          <span class="favorite-text">${favoriteQuestions.includes(question.id) ? '已收藏' : '收藏'}</span>
        </button>
      </div>

      <!-- 进度条 -->
      <div class="quiz-progress-bar">
        <div class="progress-track"></div>
        <div class="progress-fill" style="width: ${((index + 1) / list.length) * 100}%"></div>
        <div class="progress-text">${index + 1} / ${list.length}</div>
      </div>

      <div class="quiz-question">
        <span class="quiz-tag">${question.category}</span>
        <h2>${question.question}</h2>
      </div>
      <div class="quiz-options" id="quiz-options"></div>
      <div class="quiz-explanation" id="quiz-explanation" style="display:none;">
        <div class="sticker-wrapper" id="sticker-container"></div>
        <h3>答案解析</h3>
        <p>${question.explanation}</p>
      </div>
      <div class="quiz-nav">
        ${index > 0 ? `<button class="btn-nav" onclick="showQuiz(list[${index - 1}], ${index - 1}, list)">上一题</button>` : '<span></span>'}
        ${index < list.length - 1 ? `<button class="btn-nav" onclick="showQuiz(list[${index + 1}], ${index + 1}, list)">下一题</button>` : '<span></span>'}
        ${index === list.length - 1 ? `<button class="btn-review" onclick="reviewWrongQuestions()">错题重练</button>` : ''}
      </div>
    </div>
  `;
  window.list = list;

  // 渲染选项
  const optionsContainer = document.getElementById('quiz-options');
  const letters = ['A', 'B', 'C', 'D'];
  question.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span> ${opt}`;
    btn.onclick = () => selectOption(question, letters[i], btn, optionsContainer);
    optionsContainer.appendChild(btn);
  });

  startQuizTimer();
}

// 启动答题计时
function startQuizTimer() {
  if (quizTimerInterval) clearInterval(quizTimerInterval);
  quizStartTime = Date.now();
  const timerEl = document.getElementById('quiz-timer');
  if (!timerEl) return;
  quizTimerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
    timerEl.innerHTML = `<span class="quiz-timer-emoji">⏰</span> ${elapsed}s`;
  }, 1000);
}

// 停止答题计时并记录
function stopQuizTimer(questionId) {
  if (!quizStartTime) return 0;
  if (quizTimerInterval) {
    clearInterval(quizTimerInterval);
    quizTimerInterval = null;
  }
  const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
  quizStartTime = null;
  if (questionId) {
    quizTimes[questionId] = elapsed;
    localStorage.setItem('quizTimes', JSON.stringify(quizTimes));
  }
  return elapsed;
}

// 选择选项
function selectOption(question, letter, clickedBtn, container) {
  // 停止计时
  const elapsed = stopQuizTimer(question.id);

  // 禁用所有选项
  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.disabled = true;
  });

  const isCorrect = letter === question.answer;

  const stickerContainer = document.getElementById('sticker-container');

  // 积分变动提示
  let pointsChange = 0;

  if (isCorrect) {
    clickedBtn.classList.add('correct');
    // 连击+1，连错清零
    currentStreak++;
    wrongStreak = 0;
    localStorage.setItem('currentStreak', JSON.stringify(currentStreak));
    localStorage.setItem('wrongStreak', JSON.stringify(wrongStreak));

    // 积分计算：基础+10，连击翻倍
    const wasCorrectBefore = correctQuestions.includes(question.id);
    let basePoints = wasCorrectBefore ? 5 : 10;
    let multiplier = 1;
    if (currentStreak >= 3) multiplier = 2;
    else if (currentStreak === 2) multiplier = 1.5;
    pointsChange = Math.round(basePoints * multiplier);
    totalPoints += pointsChange;
    localStorage.setItem('totalPoints', JSON.stringify(totalPoints));

    // 连对3题触发特殊庆祝
    if (currentStreak >= 3 && currentStreak % 3 === 0) {
      const streakPraise = ['🔥 三连击！太强了！', '🔥 连对3题！你是大神！', '🔥 三连发！势不可挡！', '🔥 连击大师！继续！'];
      const streakText = streakPraise[Math.floor(Math.random() * streakPraise.length)];
      stickerContainer.innerHTML = `
        <img src="images/streak-sticker.jpg" class="sticker sticker-celebrate" alt="连对庆祝">
        <p class="sticker-text sticker-text-streak">${streakText}</p>
        <div class="confetti-burst" id="confetti-burst"></div>
        <p class="points-gain points-gain-bonus">+${pointsChange} 积分（${multiplier}x 连击加成）</p>
        <p class="time-record">⏱ 用时 ${elapsed} 秒</p>
      `;
      spawnConfetti();
    } else {
      const praiseWords = currentStreak === 2 ? ['再来一题就三连击了！', '差一题！继续！'] : ['太棒了！', '答对啦！', '厉害！', '完美！', '你真牛！'];
      const praise = praiseWords[Math.floor(Math.random() * praiseWords.length)];
      const streakBadge = currentStreak >= 2 ? `<span class="streak-badge">连对 ${currentStreak} 题</span>` : '';
      const bonusText = multiplier > 1 ? `（${multiplier}x 连击）` : '';
      stickerContainer.innerHTML = `
        <img src="images/correct-sticker.jpg" class="sticker sticker-pop" alt="答对了">
        <p class="sticker-text sticker-text-correct">${praise} ${streakBadge}</p>
        <p class="points-gain">+${pointsChange} 积分${bonusText}</p>
        <p class="time-record">⏱ 用时 ${elapsed} 秒</p>
      `;
    }
    // 记录答对
    if (!correctQuestions.includes(question.id)) {
      correctQuestions.push(question.id);
      localStorage.setItem('correctQuestions', JSON.stringify(correctQuestions));
    }
    // 从错题本移除
    const idx = wrongQuestions.indexOf(question.id);
    if (idx > -1) {
      wrongQuestions.splice(idx, 1);
      localStorage.setItem('wrongQuestions', JSON.stringify(wrongQuestions));
    }
  } else {
    clickedBtn.classList.add('wrong');
    // 连对清零，连错+1
    currentStreak = 0;
    wrongStreak++;
    localStorage.setItem('currentStreak', JSON.stringify(currentStreak));
    localStorage.setItem('wrongStreak', JSON.stringify(wrongStreak));
    // 标记正确答案
    container.querySelectorAll('.quiz-option')[question.answer.charCodeAt(0) - 65].classList.add('correct');

    // 积分扣减：-3，但不低于0
    pointsChange = -3;
    totalPoints = Math.max(0, totalPoints + pointsChange);
    localStorage.setItem('totalPoints', JSON.stringify(totalPoints));

    // 连错3题触发全屏变灰抖动特效
    if (wrongStreak >= 3) {
      const warnWords = ['💀 连错3题！需要冷静一下了！', '💀 三连错！深呼吸重来！', '💀 连续失误！调整心态！', '💀 别慌！看看解析！'];
      const warn = warnWords[Math.floor(Math.random() * warnWords.length)];
      stickerContainer.innerHTML = `
        <img src="images/wrong-sticker.jpg" class="sticker sticker-shake" alt="答错了">
        <p class="sticker-text sticker-text-wrong-streak">${warn}</p>
        <p class="sticker-subtext">连错 ${wrongStreak} 题，连击已清零</p>
        <p class="points-loss">-3 积分</p>
        <p class="time-record">⏱ 用时 ${elapsed} 秒</p>
      `;
      triggerScreenEffect();
      // 连错特效触发后重置计数，给用户重新开始的机会
      wrongStreak = 0;
      localStorage.setItem('wrongStreak', JSON.stringify(wrongStreak));
    } else {
      const encourageWords = wrongStreak === 2 ? ['又错了！再来一题就要触发惩罚了！', '小心！连错两题了！'] : ['别灰心！', '再试试！', '加油呀！', '差一点点！', '记下来！'];
      const encourage = encourageWords[Math.floor(Math.random() * encourageWords.length)];
      const warnBadge = wrongStreak >= 2 ? `<span class="streak-badge streak-badge-wrong">连错 ${wrongStreak} 题</span>` : '';
      stickerContainer.innerHTML = `
        <img src="images/wrong-sticker.jpg" class="sticker sticker-shake" alt="答错了">
        <p class="sticker-text sticker-text-wrong">${encourage} ${warnBadge}</p>
        <p class="points-loss">-3 积分</p>
        <p class="time-record">⏱ 用时 ${elapsed} 秒</p>
      `;
    }

    // 记录错题
    if (!wrongQuestions.includes(question.id)) {
      wrongQuestions.push(question.id);
      localStorage.setItem('wrongQuestions', JSON.stringify(wrongQuestions));
    }
  }

  // 更新导航栏积分显示
  updatePointsDisplay();

  // 显示解析
  document.getElementById('quiz-explanation').style.display = 'block';
}

// 返回列表
function backToList() {
  navigateTo('home');
}

// 切换收藏状态
function toggleFavorite(questionId) {
  const index = favoriteQuestions.indexOf(questionId);
  if (index > -1) {
    // 取消收藏
    favoriteQuestions.splice(index, 1);
    showToast('已取消收藏');
  } else {
    // 添加收藏
    favoriteQuestions.push(questionId);
    showToast('已添加到收藏');
  }
  localStorage.setItem('favoriteQuestions', JSON.stringify(favoriteQuestions));

  // 更新收藏按钮状态
  const favoriteBtn = document.getElementById('favorite-btn');
  if (favoriteBtn) {
    const icon = favoriteBtn.querySelector('.favorite-icon');
    const text = favoriteBtn.querySelector('.favorite-text');
    icon.classList.toggle('favorited', favoriteQuestions.includes(questionId));
    text.textContent = favoriteQuestions.includes(questionId) ? '已收藏' : '收藏';
  }
}

// 显示提示信息
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// 错题重练
function reviewWrongQuestions() {
  if (wrongQuestions.length === 0) {
    showToast('暂无错题，请先答题');
    return;
  }

  const wrongList = QUESTIONS.filter(q => wrongQuestions.includes(q.id));
  showToast(`开始错题重练，共 ${wrongList.length} 题`);

  // 导航到错题重练页面
  navigateTo('wrong-review');

  // 渲染错题重练列表
  setTimeout(() => {
    renderWrongReviewList(wrongList);
  }, 100);
}

// 撒花动画
function spawnConfetti() {
  setTimeout(() => {
    const colors = ['#ff9500', '#34c759', '#ff3b30', '#007aff', '#af52de', '#ffcc00'];
    const container = document.getElementById('confetti-burst');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.3 + 's';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
    }
  }, 50);
}

// 连错3题全屏变灰抖动特效
function triggerScreenEffect() {
  const overlay = document.getElementById('screen-effect');
  if (!overlay) return;
  overlay.classList.add('screen-effect-active');
  document.body.classList.add('body-shake');
  setTimeout(() => {
    overlay.classList.remove('screen-effect-active');
    document.body.classList.remove('body-shake');
  }, 2000);
}

// 页面导航
function navigateTo(page) {
  // 更新导航栏高亮
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  const main = document.querySelector('main');
  const wrongCount = wrongQuestions.length;
  const answeredCount = correctQuestions.length + wrongQuestions.length;

  if (page === 'home' || page === 'quiz') {
    main.innerHTML = `
      <div class="welcome-banner">
        <img src="images/mascot.jpg" class="welcome-mascot" alt="吉祥物">
        <div class="welcome-text">
          <h2>欢迎来到 AI 面试题练习器！</h2>
          <p>共计 ${QUESTIONS.length} 道题，已答 ${answeredCount} 道，加油冲刺！</p>
          <div class="welcome-buttons">
            <button class="btn-start-quiz" onclick="startQuiz()">开始答题</button>
            <button class="btn-random-quiz" onclick="startRandomQuiz()">🔀 随机出题</button>
          </div>
        </div>
      </div>
      <section>
        <h1>题库分类浏览区</h1>
        <ul id="category-list"></ul>
      </section>
      <section>
        <div class="search-bar">
          <input type="text" id="search-input" class="search-input" placeholder="搜索题目关键词...">
          <span class="search-icon">🔍</span>
        </div>
        <h1>题目列表展示</h1>
        <ul id="question-list"></ul>
      </section>
    `;
    renderCategories();
    renderQuestions();

    // 绑定搜索框事件
    setupSearchListener();
  } else if (page === 'wrong') {
    main.innerHTML = `
      <section>
        <h1>错题本 <span style="font-size:14px;color:#8e8e93;font-weight:normal;">（共 ${wrongCount} 题）</span></h1>
        <ul id="question-list"></ul>
      </section>
    `;
    renderWrongQuestions();
  } else if (page === 'wrong-review') {
    main.innerHTML = `
      <section>
        <h1>错题重练 <span style="font-size:14px;color:#8e8e93;font-weight:normal;">（共 ${wrongCount} 题）</span></h1>
        <p style="color:#8e8e93;font-size:14px;margin-bottom:20px;">专注练习答错的题目，巩固薄弱环节</p>
        <ul id="question-list"></ul>
      </section>
    `;
    renderWrongQuestions(); // 复用错题渲染函数
  } else if (page === 'favorites') {
    main.innerHTML = `
      <section>
        <h1>收藏夹 <span style="font-size:14px;color:#8e8e93;font-weight:normal;">（共 ${favoriteQuestions.length} 题）</span></h1>
        <ul id="question-list"></ul>
      </section>
    `;
    renderFavoriteQuestions();
  } else if (page === 'stats') {
    main.innerHTML = `
      <section>
        <h1>答题统计</h1>
        <div id="stats-container"></div>
      </section>
    `;
    renderStats();
  }
}

// 渲染错题本
function renderWrongQuestions() {
  const questionList = document.getElementById('question-list');
  questionList.innerHTML = '';

  if (wrongQuestions.length === 0) {
    questionList.innerHTML = '<li class="empty"><div class="empty-emoji">🎉</div>暂无错题，你太厉害了！</li>';
    return;
  }

  // 从全局题库中找出错题
  const wrongList = QUESTIONS.filter(q => wrongQuestions.includes(q.id));

  wrongList.forEach((q, index) => {
    const li = document.createElement('li');
    li.className = 'question-item';
    li.innerHTML = `
      <div class="question-info">
        <span class="question-num">第${index + 1}题</span>
        <span class="question-tag">${q.category}</span>
        <span class="status wrong">✗</span>
        <span class="status favorite ${favoriteQuestions.includes(q.id) ? 'favorited' : ''}">★</span>
      </div>
      <div class="question-text">${q.question}</div>
    `;
    li.onclick = () => showQuiz(q, index, wrongList);
    questionList.appendChild(li);
  });
}

// 渲染收藏题目
function renderFavoriteQuestions() {
  const questionList = document.getElementById('question-list');
  questionList.innerHTML = '';

  if (favoriteQuestions.length === 0) {
    questionList.innerHTML = '<li class="empty"><div class="empty-emoji">⭐</div>暂无收藏题目</li>';
    return;
  }

  // 从全局题库中找出收藏的题目
  const favoriteList = QUESTIONS.filter(q => favoriteQuestions.includes(q.id));

  favoriteList.forEach((q, index) => {
    const li = document.createElement('li');
    li.className = 'question-item';
    const isCorrect = correctQuestions.includes(q.id);
    const isWrong = wrongQuestions.includes(q.id);
    const statusIcon = isCorrect ? '<span class="status correct">✓</span>' : (isWrong ? '<span class="status wrong">✗</span>' : '');
    li.innerHTML = `
      <div class="question-info">
        <span class="question-num">第${index + 1}题</span>
        <span class="question-tag">${q.category}</span>
        ${statusIcon}
        <span class="status favorited">★</span>
      </div>
      <div class="question-text">${q.question}</div>
    `;
    li.onclick = () => showQuiz(q, index, favoriteList);
    questionList.appendChild(li);
  });
}

// 渲染用时统计
function renderTimeStats() {
  const times = Object.values(quizTimes);
  if (times.length === 0) {
    return '<p style="color:var(--muted);font-size:14px;">暂无答题用时记录</p>';
  }

  const avgTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  const fastestTime = Math.min(...times);
  const slowestTime = Math.max(...times);

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;margin-top:12px;">
      <div class="time-stat-card">
        <div class="time-stat-value" style="color:#007aff;">${avgTime}s</div>
        <div class="time-stat-label">平均用时</div>
      </div>
      <div class="time-stat-card">
        <div class="time-stat-value" style="color:#34c759;">${fastestTime}s</div>
        <div class="time-stat-label">最快用时</div>
      </div>
      <div class="time-stat-card">
        <div class="time-stat-value" style="color:#ff9500;">${slowestTime}s</div>
        <div class="time-stat-label">最慢用时</div>
      </div>
      <div class="time-stat-card">
        <div class="time-stat-value" style="color:var(--accent);">${times.length}</div>
        <div class="time-stat-label">已记录次数</div>
      </div>
    </div>
    <div style="margin-top:16px;">
      <p style="font-size:13px;color:var(--muted);margin-bottom:8px;">各题用时分布</p>
      <div class="time-bar-chart">
        ${times.map((t, i) => {
          const qId = Object.keys(quizTimes)[i];
          const q = QUESTIONS.find(x => x.id == qId);
          const qText = q ? q.question.substring(0, 20) + '...' : '题目' + qId;
          const maxVal = slowestTime || 1;
          const widthPercent = Math.max(5, (t / maxVal * 100));
          const isSlow = t > avgTime * 1.5;
          return `
            <div class="time-bar-item">
              <span class="time-bar-label" title="${q ? q.question : ''}">${qText}</span>
              <div class="time-bar-track">
                <div class="time-bar-fill ${isSlow ? 'time-bar-slow' : ''}" style="width:${widthPercent}%;"></div>
              </div>
              <span class="time-bar-value">${t}s</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// 渲染统计
function renderStats() {
  const container = document.getElementById('stats-container');
  const total = QUESTIONS.length;
  const answered = correctQuestions.length + wrongQuestions.length;
  const correct = correctQuestions.length;
  const wrong = wrongQuestions.length;
  const accuracy = answered > 0 ? Math.round(correct / answered * 100) : 0;

  const level = getLevel(totalPoints);
  const next = getNextLevel(totalPoints);
  const levelProgress = next ? Math.round((totalPoints - level.min) / (next.min - level.min) * 100) : 100;

  container.innerHTML = `
    <div class="welcome-banner" style="margin-bottom:24px;">
      <img src="images/${accuracy >= 80 ? 'correct-sticker' : 'mascot'}.jpg" class="welcome-mascot" alt="统计">
      <div class="welcome-text">
        <h2>${accuracy >= 80 ? '大神级别！' : accuracy >= 60 ? '还不错，继续努力！' : '加油，你可以的！'}</h2>
        <p>已答题 ${answered} / ${total} 道，正确率 ${accuracy}%</p>
      </div>
    </div>
    <div class="level-card">
      <div class="level-card-header">
        <span class="level-icon-big">${level.icon}</span>
        <div class="level-card-info">
          <h2>${level.name}</h2>
          <p>${totalPoints} 积分${next ? ` · 距离 ${next.name} 还差 ${next.min - totalPoints} 分` : ' · 最高等级已达成！'}</p>
        </div>
      </div>
      <div class="level-progress-bar">
        <div class="level-progress-fill" style="width:${levelProgress}%"></div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin:16px 0 24px;">
      <div class="category-card">
        <div class="category-name">${total}</div>
        <div class="category-count">总题数</div>
      </div>
      <div class="category-card">
        <div class="category-name">${answered}</div>
        <div class="category-count">已答题数</div>
      </div>
      <div class="category-card">
        <div class="category-name" style="color:#34c759">${correct}</div>
        <div class="category-count">答对</div>
      </div>
      <div class="category-card">
        <div class="category-name" style="color:#ff3b30">${wrong}</div>
        <div class="category-count">答错</div>
      </div>
    </div>
    <div class="quiz-explanation" style="display:block;">
      <h3>正确率</h3>
      <div class="accuracy-bar">
        <div class="accuracy-fill" style="width:${accuracy}%;background:${accuracy >= 60 ? '#34c759' : '#ff3b30'};"></div>
      </div>
      <p style="font-size:28px;font-weight:bold;color:${accuracy >= 60 ? '#34c759' : '#ff3b30'};margin-top:8px;">${accuracy}%</p>
    </div>
    <div class="quiz-explanation" style="display:block;">
      <h3>答题用时统计</h3>
      ${renderTimeStats()}
    </div>
  `;

  // 渲染饼图
  setTimeout(() => {
    renderCategoryPieChart();
  }, 100);
}

// 切换主题
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // 更新图标显示
  updateThemeIcon(newTheme);

  // 显示切换提示
  showToast(newTheme === 'dark' ? '已切换到暗夜模式 🌙' : '已切换到默认模式 ☀️');
}

// 更新主题图标
function updateThemeIcon(theme) {
  const sunIcon = document.querySelector('.theme-icon.sun');
  const moonIcon = document.querySelector('.theme-icon.moon');

  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// 随机出题功能
function startRandomQuiz() {
  // 从全部题库中随机抽取10道题
  const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
  const randomQuestions = shuffled.slice(0, 10);

  // 打乱每道题的选项顺序
  const randomizedQuestions = randomQuestions.map(q => {
    const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
    return {
      ...q,
      options: shuffledOptions
    };
  });

  showToast(`开始随机答题，共 ${randomizedQuestions.length} 题`);

  // 直接进入答题模式，显示第一题
  showQuiz(randomizedQuestions[0], 0, randomizedQuestions);
}

// 开始答题按钮功能 - 按顺序从第一题开始
function startQuiz() {
  showToast(`开始答题，共 ${QUESTIONS.length} 题`);
  showQuiz(QUESTIONS[0], 0, QUESTIONS);
}

// 设置搜索框事件监听
function setupSearchListener() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();

    // 清除之前的定时器
    clearTimeout(searchTimeout);

    // 设置新的定时器，避免频繁触发
    searchTimeout = setTimeout(() => {
      if (keyword) {
        // 执行搜索
        performSearch(keyword);
      } else {
        // 搜索框为空，恢复显示全部题目
        renderQuestions();
      }
    }, 300);
  });
}

// 执行搜索
function performSearch(keyword) {
  // 搜索：在题目中查找关键词（不区分大小写）
  const searchResults = QUESTIONS.filter(q => {
    const matchText = q.question.toLowerCase();
    const matchKeyword = keyword.toLowerCase();
    return matchText.includes(matchKeyword);
  });

  // 如果有分类筛选，在搜索结果中再筛选分类
  let filteredResults = searchResults;
  if (currentCategory) {
    filteredResults = searchResults.filter(q => q.category === currentCategory);
  }

  // 渲染搜索结果
  renderQuestions(currentCategory, filteredResults);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  // 初始化主题
  initTheme();

  // 导航栏点击事件
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  renderCategories();
  renderQuestions();
  updatePointsDisplay();
});
