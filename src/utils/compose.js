const compose = (...functions) => (comp) => {
    return functions.reduceRight(
        (prev, fn) => fn(prev), comp);
}

export default compose;