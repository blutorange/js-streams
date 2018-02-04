"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comparators_1 = require("comparators");
const Methods_1 = require("./Methods");
const Try_1 = require("./Try");
class AbstractStream {
    constructor(iterable) {
        this.done = false;
        this.iterable = iterable;
    }
    check() {
        if (this.done) {
            throw new Error("Stream was already consumed.");
        }
        this.done = true;
    }
    [Symbol.iterator]() {
        this.check();
        return this.iterable[Symbol.iterator]();
    }
    collect(collector) {
        this.check();
        return Methods_1.collect(this.iterable, collector);
    }
    collectWith(supplier, accumulator, finisher) {
        this.check();
        return Methods_1.collectWith(this.iterable, supplier, accumulator, finisher);
    }
    end() {
        this.check();
        Methods_1.end(this.iterable);
    }
    every(predicate) {
        this.check();
        return Methods_1.every(this.iterable, predicate);
    }
    find(predicate) {
        this.check();
        return Methods_1.find(this.iterable, predicate);
    }
    forEach(consumer) {
        this.check();
        for (let item of this.iterable) {
            consumer(item);
        }
    }
    group(classifier) {
        this.check();
        return Methods_1.group(this.iterable, classifier);
    }
    has(object) {
        this.check();
        return Methods_1.has(this.iterable, object);
    }
    join(delimiter = "", prefix, suffix) {
        this.check();
        return Methods_1.join(this.iterable, delimiter, prefix, suffix);
    }
    max(comparator = comparators_1.natural) {
        this.check();
        return Methods_1.max(this.iterable, comparator);
    }
    min(comparator = comparators_1.natural) {
        this.check();
        return Methods_1.min(this.iterable, comparator);
    }
    partition(predicate) {
        this.check();
        return Methods_1.partition(this.iterable, predicate);
    }
    reduce(reducer, initialValue) {
        this.check();
        return Methods_1.reduce(this.iterable, reducer, initialValue);
    }
    reduceSame(reducer) {
        this.check();
        return Methods_1.reduceSame(this.iterable, reducer);
    }
    size() {
        this.check();
        return Methods_1.size(this.iterable);
    }
    some(predicate) {
        this.check();
        return Methods_1.some(this.iterable, predicate);
    }
    sum(converter) {
        this.check();
        return Methods_1.sum(this.iterable, converter);
    }
    toArray() {
        this.check();
        return Methods_1.toArray(this.iterable);
    }
    toSet() {
        this.check();
        return Methods_1.toSet(this.iterable);
    }
    toJSON() {
        return this.toArray();
    }
    toString() {
        return `Stream[done=${this.done}]`;
    }
    toMap(keyMapper, valueMapper) {
        this.check();
        return Methods_1.toMap(this.iterable, keyMapper, valueMapper);
    }
    tryCompute(operation) {
        this.check();
        return Methods_1.tryCompute(this.iterable, operation);
    }
    tryEnd() {
        return Try_1.TryFactory.of(() => this.end());
    }
}
exports.AbstractStream = AbstractStream;