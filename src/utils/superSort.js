export const superSort = (options) => {
    return function sorter(a, b) {
        if (options.length < 1) {
            return 0
        }
        if (!options[0]) {
            return superSort(options.slice(1, options.length))(a, b)
        }

        if (!options[0].by) {
            throw new Error('Parameter "by" of the method object is required')
        }
        let by = options[0].by;
        if (!a[by] || !b[by]) {
            return 0
        }
        let dir = options[0].direction && typeof options[0].direction === 'number' ? options[0].direction / Math.abs(options[0].direction) : 1
        let comparedValA = options[0].mod ? options[0].mod(a[by]) : a[by];
        let comparedValB = options[0].mod ? options[0].mod(b[by]) : b[by];

        if (comparedValA > comparedValB) {
            return dir * 1
        }
        if (comparedValA < comparedValB) {
            return dir * -1
        }
        if (comparedValA === comparedValB) {
            return superSort(options.slice(1, options.length))(a, b)
        }
        return 0
    }
}