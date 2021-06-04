function maxPossible(num1, num2, max = null) {
  arr1 = num1.toString().split("");
  arr2 = num2.toString().split("");

  const newArr = arr1.map((elem) => {
    max = null;

    for (let i = 0; i < arr2.length; i++) {
      elem < arr2[i] ? (max = arr2[i]) : null;
    }

    max !== null ? arr2.splice(arr2.lastIndexOf(max), 1) : null;
    return max !== null ? max : elem;
  });
  return newArr.join("");
}

console.log(maxPossible(8732, 12559));
