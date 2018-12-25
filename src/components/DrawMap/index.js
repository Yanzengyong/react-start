import * as d3 from 'd3'
import './style.scss'

class DrawMap {
  constructor(options = {}) {
    this.loadOption(options);
    this.isClickNode = false;
    this.position = {};

    document.addEventListener('click', () => {
      if (!this.isClickNode) {
        d3.select('.options').attr('style', 'transform: scale(0, 0);');
      }
      this.isClickNode = false;
    });
  }

  loadOption(options) {
    this.svg = options.container || d3.select('svg');
    this.width = options.width || document.documentElement.clientWidth;
    this.height = options.height || document.documentElement.clientHeight;
    this.radiu = options.radiu || 10;
    this.labelSize = options.labelSize || 14;
    this.colors = options.colors || [
      '#2ec7c9',
      '#b6a2de',
      '#5ab1ef',
      '#5fb878'
    ];

    // 第一圈离圆心距离
    this.firstDistance = options.firstDistance || 100;

    // 圈与圈之间距离
    this.distance = options.distance || 50;

    // 点与点之间最小距离
    this.nodeDistance = options.nodeDistance || 50;

    this.center = {
      top: this.height / 2 - this.radiu,
      left: this.width / 2 - this.radiu
    };

    this.nodes = options.nodes || [];
    this.links = options.links || [];
    this.centerNode = options.centerNode || this.nodes[0] || {};
  }

  draw() {
    this.svg.html('');
    this.getPosition();
    this.initArrow();
    this.drawLines();
    this.drawText();
    this.drawNodes();
    this.drawLabel();
  }

  drawNodes() {
    this.dNodes = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('r', this.radiu)
      .attr('id', d => d.id)
      .attr('fill', (d, i) => {
        if (i === 0) {
          return this.colors[0];
        }
        const index = this.getLevel(this.firstDistance, i - 1);
        return this.colors[index];
      })
      .attr('cx', this.center.left)
      .attr('cy', this.center.top)
      .transition('linear')
      .duration(1000)
      .attr('cx', d => this.position[d.id].x)
      .attr('cy', d => this.position[d.id].y);

    d3.selectAll('circle').on('click', () => {
      const {
        target
      } = event;
      const x = target.getAttribute('cx');
      const y = target.getAttribute('cy');
      const info = {
        nodeName: target.getAttribute('id'),
        left: x - 60,
        top: y - 60
      };
      d3.select('.options').attr('style', `transform: scale(1, 1);left: ${info.left}px; top: ${info.top}px`);
      this.isClickNode = true;
    })
      .on('mouseover', (evt) => {
        const {
          id
        } = evt;
        this.highlight(id);
      })
      .on('mouseout', () => {
        this.cancelHighlight();
      });
  }

  drawLines() {
    this.svg.append('g')
      .attr('class', 'lines')
      .selectAll('path')
      .data(this.links)
      .enter()
      .append('path')
      .attr('id', d => `${d.source}${d.target}`)
      .attr('d', () => `M${this.center.left} ${this.center.top} L${this.center.left} ${this.center.top}`)
      .attr('stroke', 'red')
      .attr('stroke-width', '1')
      .attr('opacity', '0.5')
      .attr('stroke-dasharray', '5')
      .attr('stroke-dashoffset', '2')
      .attr('marker-end', 'url(#arrow)')
      .attr('data-start', d => d.source)
      .attr('data-end', d => d.target)
      .transition('linear')
      .duration(1000)
      .attr('d', d => `M${this.position[d.source].x} ${this.position[d.source].y} L${this.position[d.target].x} ${this.position[d.target].y}`);
  }

  drawLabel() {
    this.svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('data-text', d => d.name)
      .attr('data-id', d => d.id)
      .attr('fill', '#ff5809')
      .attr('text-anchor', 'middle')
      .attr('x', this.center.left)
      .attr('y', this.center.top)
      .transition('linear')
      .duration(1000)
      .attr('x', d => this.position[d.id].x)
      .attr('y', d => this.position[d.id].y + this.labelSize / 4)
      .attr('font-size', this.labelSize)
      .text(d => d.name);
  }

  drawText() {
    this.svg.append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(this.links)
      .enter()
      .append('text')
      .attr('class', 'text')
      .attr('data-start', d => d.source)
      .attr('data-end', d => d.target)
      .attr('style', 'stroke: #fff')
      .attr('text-anchor', 'middle')
      .attr('font-size', this.labelSize)
      .append('textPath')
      .attr('xlink:href', d => `#${d.source}${d.target}`)
      .attr('startOffset', '50%')
      .text(d => d.value);
  }

  getX(radiu, queue) {
    const number = this.getNumbers(radiu);
    const a = 360 / number;
    if (queue < number) {
      let A = a * queue;
      let pre = 1;
      if (A > 270) {
        A = 360 - A;
        pre = 1;
      }

      if (A > 180) {
        A -= 180;
        pre = -1;
      }

      if (A > 90) {
        A = 180 - A;
        pre = -1;
      }
      return Math.cos(Math.PI / 180 * A) * pre * radiu + this.center.left;
    }

    return this.getX(radiu + this.distance, queue - number);
  }

  getY(radiu, queue) {
    const number = this.getNumbers(radiu);
    const a = 360 / number;
    if (queue <= number) {
      let A = a * queue;
      let pre = 1;
      if (A > 270) {
        A = 360 - A;
        pre = -1;
      }

      if (A > 180) {
        A -= 180;
        pre = -1;
      }

      if (A > 90) {
        A = 180 - A;
        pre = 1;
      }
      return Math.sin(Math.PI / 180 * A) * pre * radiu + this.center.top;
    }

    return this.getY(radiu + this.distance, queue - number);
  }

  getPosition() {
    this.position = {};
    for (let i = 0; i < this.nodes.length; i += 1) {
      const d = this.nodes[i];
      if (i === 0) {
        this.position[d.id] = {
          x: this.center.left,
          y: this.center.top
        };
      } else {
        this.position[d.id] = {
          x: this.getX(this.firstDistance, i - 1),
          y: this.getY(this.firstDistance, i - 1)
        };
      }
    }
  }

  initArrow() {
    this.svg.append('marker')
      .attr('id', 'arrow')
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', '10')
      .attr('markerHeight', '10')
      .attr('refX', '8')
      .attr('refY', '3')
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L0,6 L9,3 z')
      .attr('style', 'fill: red');
  }

  highlight(node) {
    const nodes = this.getMatchNode(node);
    nodes.push(node);
    const links = this.getMatchLink(nodes);
    d3.selectAll('circle').each(function (d) {
      if (nodes.includes(d.id)) {
        return;
      }

      d3.select(this).attr('opacity', '0.1');
    });
    d3.selectAll('path').each(function () {
      const current = d3.select(this);
      const obj = {
        start: parseInt(current.attr('data-start'), 0),
        end: parseInt(current.attr('data-end'), 0)
      };
      if (links.find(item => JSON.stringify(obj) === JSON.stringify(item))) {
        return;
      }
      current.attr('opacity', '0.1');
    });
    d3.selectAll('.label').each(function (d) {
      if (nodes.includes(d.id)) {
        return;
      }

      d3.select(this).attr('opacity', '0.1');
    });
    d3.selectAll('.text').each(function () {
      const current = d3.select(this);
      const obj = {
        start: parseInt(current.attr('data-start'), 0),
        end: parseInt(current.attr('data-end'), 0)
      };
      if (links.find(item => JSON.stringify(obj) === JSON.stringify(item))) {
        return;
      }
      current.attr('opacity', '0.1');
    });
  }

  cancelHighlight() {
    d3.selectAll('circle').each(function () {
      d3.select(this).attr('opacity', '1');
    });
    d3.selectAll('path').each(function () {
      d3.select(this).attr('opacity', '0.5');
    });
    d3.selectAll('text').each(function () {
      d3.select(this).attr('opacity', '1');
    });
  }

  // 获取该圈可画节点数
  getNumbers(radiu) {
    return parseInt(360 / (Math.asin(this.nodeDistance / 2 / radiu) * (180 / Math.PI) * 2), 0);
  }

  // 获取该节点所在圈层
  getLevel(radiu, queue, level = 1) {
    const number = this.getNumbers(radiu);
    if (queue < number) {
      return level;
    }

    return this.getLevel(radiu + this.distance, queue - number, level + 1);
  }

  getMatchNode(node, type) {
    let source = [];
    let target = [];
    for (let i = 0; i < this.links.length; i += 1) {
      const item = this.links[i];
      if ((type === 'source' || !type) && item.target === node) {
        source.push(item.source);
        source = source.concat(this.getMatchNode(item.source, 'source'));
      }

      if ((type === 'target' || !type) && item.source === node) {
        target.push(item.target);
        target = target.concat(this.getMatchNode(item.target, 'target'));
      }
    }
    return source.concat(target);
  }

  getDarwContainer() {
    this.constructor = option => () => {
      console.log(option);
    };
  }

  getMatchLink(nodes) {
    const result = [];
    for (let i = 0; i < this.links.length; i += 1) {
      const item = this.links[i];
      if (nodes.includes(item.source) && nodes.includes(item.target)) {
        result.push({
          start: item.source,
          end: item.target
        });
      }
    }
    return result;
  }

  setOptions(options) {
    this.loadOption(options);
  }
}

export default DrawMap;
