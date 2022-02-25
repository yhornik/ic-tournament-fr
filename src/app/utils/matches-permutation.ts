const isInArray = (arr: Array<string>, comparedArr: string): boolean => {
  const intersection = arr?.filter(x => {
    const tempArr = [...x];
    const compArr = [...comparedArr];
    return tempArr?.some(it => compArr?.includes(it))
  })
  return !!intersection && intersection.length > 0;
}

const firstNotInArray = (arr: Array<string>, comparedArr: string): string | undefined => {
  return arr?.find((x: string | undefined) => {
    const tempArr = x ? [...x]  : [];
    const compArr = [...comparedArr];
    return (tempArr?.some(it => compArr?.includes(it))) ? null : x;
  });
}

const permutations = (arr: Array<string>): Array<Array<string>> => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : [arr];
  return arr.reduce(
    (acc: Array<Array<string>>, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val,
        ])
      ),
    []
  );
};

const loopOneRow = (arrOfPermutationMatches: Array<Array<string>>, twoFirst: string, groupsIndex: number, groups: Array<Array<string>>, row: number, colInp: number) => {
  arrOfPermutationMatches[row][0] = twoFirst;
  let grIndex = 0;
  let col = colInp;
  while (grIndex < 8 && col < 4) {
    if (grIndex !== groupsIndex) {
      const firstNotArr = firstNotInArray(groups[grIndex], twoFirst);
      if (!!firstNotArr && !(isInArray(arrOfPermutationMatches[row], firstNotArr))) {
        arrOfPermutationMatches[row][col] = firstNotArr;
        col++;
      }
    }
    grIndex++;
  }

  return [...permutations(arrOfPermutationMatches[row])];
}

export const matchesPermutation = (matchesInp: Array<string>) => {
  console.log('======== RESULT')
  const matches = [...matchesInp];
  let row = 0;
  const finaleArr: Array<Array<string>> = [];

  const groups = [...matches.map((item, index) => {
    const arr = matches.slice(0, index + 1);
    const rest = matches.slice(index + 1, matches.length);
    return rest.map(item => `${arr[index]}${item}`);
  })];

  const r = 28;
  const c = 4;
  const arrOfPermutationMatches = Array.from(Array(r), () => Array(c).fill('xx'));

  groups.forEach((gr, groupId) => {
    gr.forEach((el, id) => {
      const ref = gr[id];
      const res = [...loopOneRow(arrOfPermutationMatches, ref, groupId, groups, row, 1)];
      if (!!res) {
        finaleArr.push(...res);
      }
      row++;
    })
  } );
  console.log('**** row', row);
  console.log('***** length', finaleArr.length);
  return [...new Set(finaleArr)];
}

// console.log(matchesPermutation(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']));













