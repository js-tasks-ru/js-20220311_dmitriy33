export default class SortableTable {
  subElements = {};


  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.render();
  }

  getRowsHeader() {
    return this.headerConfig.map(item => {
      return `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
        <span>${item.title}</span>
      </div>`;
    }).join('');
  }

  getHeaderTemplate () {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
              ${this.getRowsHeader()}
            </div>`;
  }

  getRowsBody(data = this.data) {
    return data.map(item => {
      return `<a href="/products/${item.id}" class="sortable-table__row">
                <div class="sortable-table__cell">
                  <img class="sortable-table-image" alt="${item.title}" src="${item.images[0].url}">
                </div>
                <div class="sortable-table__cell">${item.title}</div>
                <div class="sortable-table__cell">${item.quantity}</div>
                <div class="sortable-table__cell">${item.price}</div>
                <div class="sortable-table__cell">${item.sales}</div>
              </a>`;
    }).join('');
  }

  getBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">
              ${this.getRowsBody()}
            </div>`;
  }

  render () {
    const element = document.createElement('div');
    element.classList.add('sortable-table');
    element.innerHTML = this.getHeaderTemplate() + this.getBodyTemplate();
    this.subElements = this.getSubElements(element);
    return element;
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getRowsBody(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove () {
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

