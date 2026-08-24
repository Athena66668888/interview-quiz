// 饼图渲染逻辑
// 统计各分类的答题情况
function renderCategoryPieChart() {
  const categories = {};
  QUESTIONS.forEach(q => {
    if (!categories[q.category]) {
      categories[q.category] = { total: 0, correct: 0 };
    }
    categories[q.category].total++;
    if (correctQuestions.includes(q.id)) {
      categories[q.category].correct++;
    }
  });

  // 准备饼图数据
  const chartData = [];
  const chartColors = {
    'Java基础': '#007aff',
    '并发编程': '#34c759',
    'JVM': '#ff3b30',
    'Spring': '#ff9500',
    '数据库': '#af52de'
  };

  Object.entries(categories).forEach(([category, data]) => {
    const percentage = Math.round(data.correct / data.total * 100);
    chartData.push({
      name: category,
      value: data.correct,
      total: data.total,
      percentage: percentage,
      color: chartColors[category] || '#8e8e93'
    });
  });

  // 创建饼图容器
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  chartContainer.innerHTML = `
    <div class="chart-title">各分类正确率分布</div>
    <div id="category-pie-chart" class="pie-chart"></div>
    <div id="chart-legend" class="chart-legend"></div>
  `;

  // 插入到统计页面中
  const existingChart = document.querySelector('.chart-container');
  if (existingChart) {
    existingChart.remove();
  }

  const statsContainer = document.getElementById('stats-container');
  statsContainer.insertBefore(chartContainer, statsContainer.lastElementChild);

  // 暗夜模式文字颜色
  const textColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#f5f5f7' : '#1c1c1e';

  // 渲染饼图
  renderPieChart('category-pie-chart', chartData, textColor);

  // 渲染图例
  renderChartLegend('chart-legend', chartData, textColor);
}

// 渲染饼图
function renderPieChart(containerId, data, textColor = '#fff') {
  const container = document.getElementById(containerId);
  const size = 300;
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;

  // 创建SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.style.background = 'transparent';

  let currentAngle = -90; // 从顶部开始

  data.forEach(item => {
    const percentage = item.percentage;
    const angle = (percentage / 100) * 360;

    // 创建扇形路径
    const startAngle = currentAngle * Math.PI / 180;
    const endAngle = (currentAngle + angle) * Math.PI / 180;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    // 创建扇形
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', item.color);
    // 暗夜模式下使用更深的边框
    path.setAttribute('stroke', document.documentElement.getAttribute('data-theme') === 'dark' ? '#2c2c2e' : '#fff');
    path.setAttribute('stroke-width', '2');
    path.style.transition = 'transform 0.3s ease';
    path.style.cursor = 'pointer';

    // 添加悬停效果
    path.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transformOrigin = `${centerX}px ${centerY}px`;
    });

    path.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    svg.appendChild(path);

    // 添加百分比文字
    if (percentage > 5) { // 只在扇形足够大时显示文字
      const textAngle = currentAngle + angle / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + textRadius * Math.cos(textAngle * Math.PI / 180);
      const textY = centerY + textRadius * Math.sin(textAngle * Math.PI / 180);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', textX);
      text.setAttribute('y', textY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', textColor);
      text.setAttribute('font-size', '14');
      text.setAttribute('font-weight', 'bold');
      text.textContent = `${percentage}%`;
      text.style.pointerEvents = 'none';

      svg.appendChild(text);
    }

    currentAngle += angle;
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

// 渲染图例
function renderChartLegend(containerId, data, textColor = '#1c1c1e') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  data.forEach(item => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <div class="legend-text">
        <span class="legend-category" style="color: ${textColor}">${item.name}</span>
        <span class="legend-stats">${item.correct}/${item.total} (${item.percentage}%)</span>
      </div>
    `;
    container.appendChild(legendItem);
  });
}