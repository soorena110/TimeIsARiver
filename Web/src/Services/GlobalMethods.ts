const colorList = ['#99b433', '#00a300', '#1e7145', '#ff0097', '#9f00a7', '#7e3878', '#603cba', '#00aba9', '#2d89ef',
    '#2b5797', '#ffc40d', '#e3a21a', '#da532c', '#ee1111', '#b91d47', '#DEB175', '#C4745C'];

const GlobalMethods = {
    groupBy<T>(list: T[], keyGetter: (d: T) => any) {
        const map = new Map();
        list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });

        const ret = {} as any;

        const keys = map.keys();
        let k = keys.next();
        while (!k.done) {
            ret[k.value] = map.get(k.value);
            k = keys.next();
        }
        return ret;
    },

    wordSudoColor(str: string) {
        if (str === undefined) {
            return '#000'
        }
        let sum = 0;
        for (let i = 0; i < str.length; i++)
            sum += str.charCodeAt(i);
        return colorList[sum % colorList.length];
    }
};

export default GlobalMethods