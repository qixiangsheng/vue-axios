const o1 = {
  name: 'zs',
  age: 18
}

const o2 = {
  ...o1,
  address: '上海'
}

console.log(o2)
console.log(o1)

const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

const newArr = [...arr1, ...arr2]
console.log(newArr)
