// a simple priority queue
export class PriorityQueue {
  constructor() {
    this.data = [];
  }

  includes(val) {
    const dataValues = this.data.map(v => v.value);
    return dataValues.includes(val);
  }

  push(value, priority = 0) {
    return this.data.push({
      value: value,
      priority: priority
    });
  }

  pop() {
    let index = 0;
    let min = Infinity;
    for (let i = 0; i < this.data.length; i++) {
      let priority = this.data[i].priority;
      if (Math.min(min, priority) === priority) {
        min = priority;
        index = i;
      }
    }
    return this.data.splice(index, 1)[0].value;
  }

  size() {
    return this.data.length;
  }

  print() {
    console.log(this.data);
  }
}
