import { natural, Comparator } from "comparators";

import { Stream, Collector, Supplier, BiConsumer, Function, Predicate, Consumer, BiFunction, Try } from "./Interfaces";
import { collect, collectWith, every, find, group, has, join, max, min, partition, reduce, reduceSame, size, some, toArray, toSet, toMap } from "./Methods";
import { Collectors } from "./Collectors";

const IDENTITY = x => x;

export abstract class AbstractStream<T> {

    protected iterable : Iterable<T>;
    private done = false;

    protected constructor(iterable : Iterable<T>) {
        this.iterable = iterable;
    }

    protected check() {
        if (this.done) {
            throw new Error("Stream was already consumed.");
        }
        this.done = true;
    }

    [Symbol.iterator]() {
        this.check();
        return this.iterable[Symbol.iterator]();
    }

    collect<S,R=S>(collector: Collector<T, S, R>): R {
        this.check();
        return collect(this.iterable, collector);
    }

    collectWith<S,R=S>(supplier: Supplier<S>, accumulator: BiConsumer<S, T>, finisher: Function<S,R> = IDENTITY): R {
        this.check();
        return collectWith(this.iterable, supplier, accumulator, finisher);
    }

    every(predicate: Predicate<T>) : boolean {
        this.check();
        return every(this.iterable, predicate);
    }

    find(predicate: Predicate<T>) : T {
        this.check();
        return find(this.iterable, predicate);
    }

    forEach(consumer: Consumer<T>) : void {
        this.check();
        for (let item of this.iterable) {
            consumer(item);
        }
    }

    group<K>(classifier: Function<T,K>) : Map<K, T[]> {
        this.check();
        return group(this.iterable, classifier);
    }

    has(object: T) : boolean {
        this.check();
        return has(this.iterable, object);
    }

    join(delimiter: string = "", prefix? : string, suffix? : string) : string {
        this.check();
        return join(this.iterable, delimiter, prefix, suffix);
    }

    max(comparator : Comparator<T> = natural) : T {
        this.check();
        return max(this.iterable, comparator);
    }

    min(comparator : Comparator<T> = natural) : T {
        this.check();
        return min(this.iterable, comparator);
    }

    partition(predicate: Predicate<T>) : {false:T[],true:T[]} {
        this.check();
        return partition(this.iterable, predicate);
    }

    reduce<S>(reducer: BiFunction<S,T,S>, initialValue: S) : S {
        this.check();
        return reduce(this.iterable, reducer, initialValue);
    }

    reduceSame(reducer: BiFunction<T,T,T>) : T {
        this.check();
        return reduceSame(this.iterable, reducer);
    }

    reduceWith<S>(reducer: BiFunction<S,T,S>, initialValue: S) : S {
        this.check();
        return reduce(this.iterable, reducer, initialValue);
    }

    size() : number {
        this.check();
        return size(this.iterable);
    }

    some(predicate: Predicate<T>) : boolean {
        this.check();
        return some(this.iterable, predicate);
    }
        
    toArray() : T[] {
        this.check();
        return toArray(this.iterable);
    }

    toSet() : Set<T> {
        this.check();
        return toSet(this.iterable);
    }

    toJSON() {
        this.check();
        return this.toArray();
    }

    toString() {
        return `Stream[done=${this.done}]`;
    }

    toMap<K,V>(keyMapper: Function<T,K>, valueMapper: Function<T,V>) : Map<K,V> {
        this.check();
        return toMap(this.iterable, keyMapper, valueMapper);
    }
}