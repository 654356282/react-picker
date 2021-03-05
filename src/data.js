const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']
const defaultData = []
words.forEach((item, idx) => {
    defaultData.push({key: idx, data: item + '1', children: []})
})


export default defaultData
