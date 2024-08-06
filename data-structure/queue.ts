class Queue<T> {
    items: T[] = [];

    constructor(initialState: T[]) {
        this.items = initialState ?? [];
    }

    enqueue(item: T) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    peek() {
        if (this.isEmpty()) {
            return "Fila Vazia";
        }
        return `${this.items[0]}`;
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
export default Queue;