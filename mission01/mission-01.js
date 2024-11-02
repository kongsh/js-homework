function getValueAtObject(obj, key) {
  // key가 object에 있으면, key에 해당하는 value값 return
  if (key in obj) return obj[key];

  // key가 object에 없으면 Error
  console.error("Error!");
  return;
}

// const person = {
//   name: "Alice",
//   age: 25,
//   city: "Wonderland",
// };

// console.log(getValueAtObject(person, "name")); // 'Alice'
// console.log(getValueAtObject(person, "age")); // 25
// console.log(getValueAtObject(person, "city")); // 'Wonderland'
// console.log(getValueAtObject(person, "country")); // Error !

function getNumberAtArray(arr, index) {
  // 배열이 아닐 경우 (Array.isArray() 활용)
  if (!Array.isArray(arr)) {
    console.error("Error!");
    return;
  }

  // 배열 길이값보다 index가 작고 음수가 아닐때 올바른 index
  if (arr.length > index && index >= 0) return arr[index];

  // 올바른 index가 아닐 때 Error
  console.error("Error!");
  return;
}

// const numbers = [10, 20, 30, 40, 50];

// console.log(getNumberAtArray(numbers, 2)); // 30
// console.log(getNumberAtArray("Strong String", 0)); // 30
// console.log(getNumberAtArray(numbers, 4)); // 50
// console.log(getNumberAtArray(numbers, 5)); // Error!
// console.log(getNumberAtArray(numbers, -1)); // Error!
