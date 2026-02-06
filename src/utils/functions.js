// Slices the array only if large enough. This is to prevent the case that they are less characters than CHARACTERS_SHOW
export function sliceIfLargeEnough(array, slicingLength) {
  if (array.length > slicingLength) {
    return array.slice(0, slicingLength);
  } else {
    return array;
  }
}

export const getShuffledArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

  // Slices the array from the star to a franction of the array length 
  // If fraction is 1/3, we get in return (aprox) 1/3 of the array
  export function sliceAFractionOfArrLength(arr, fraction) {
    let arrLength = arr.length; 
    return arr.slice(0, Math.floor(arrLength * fraction));
  }