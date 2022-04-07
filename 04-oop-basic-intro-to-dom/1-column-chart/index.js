export default class ColumnChart {
    subElements = {};
    chartHeight = 50;

    constructor({
      data = [],
      label = "",
      link = "",
      value = 0,
      formatHeading = data => data,
    } = {}) {
      this.data = data;
      this.label = label;
      this.link = link;
      this.value = formatHeading(value);
      this.element = this.render();
    }

    getTemplate() {
      return `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
              ${this.getColumns()}
            </div>
          </div>
        </div>
        `;
    }

    getLink() {
      if (this.link.length) {
        return `<a href="${this.link}" class="column-chart__link">View all</a>`;
      } else {
        return ``;
      }
    }

    getColumns() {
      const maxValue = Math.max(...this.data);
      const scale = 50 / maxValue;
    
      return this.data.map(item => {
        return `<div style="--value: ${String(Math.floor(item * scale))}" data-tooltip="${(item / maxValue * 100).toFixed(0) + '%'}"></div>`;
      }).join('');
    }

    render() {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = this.getTemplate();
      const element = wrapper.firstElementChild;

      if (this.data.length) {
        element.classList.remove('column-chart_loading');
      }

      this.subElements = this.getSubElements();

      return element;
    }

    getSubElements() {
      const result = {};
      const elements = document.querySelectorAll('[data-element]');

      for (const subElement of elements) {
        const name = subElement.dataset.element;

        result[name] = subElement;
      }

      return result;
    }

    update(data) {
      this.data = data;
      this.subElements.body.innerHTML = this.getColumns(data);
    }

    remove() {
      if (this.element) {
        this.element.remove();
      }
    }

    destroy() {
      this.remove();
      this.element = null;
      this.subElements = {};
    }

}