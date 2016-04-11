const isClose = (a, b, threshold) => {
  const maxDiff = 10 - threshold;
  var diff = Math.abs(a - b);
  diff = (maxDiff <= diff && diff < 10) ? (10 - diff) : diff;
  return diff <= threshold;
}

const getDerivates = (threshold, pick, sign) => {
  const range = Array.apply(0, Array(threshold));

  return range.map((item, i) => {
    const next = pick + ((threshold - i) * sign);

    if (next < 0 || next > 9) {
      return 10 - Math.abs(next);
    }
    return next;
  });
}


module.exports = {
  generateCombinations(set, offsetThreshold) {
    const range = Array.apply(0, Array(set.length * offsetThreshold));

    // console.log('set', set);
    return range.reduce((prev, item, index) => {
      // console.log('item', set[index]);
      // console.log('+', offsetThreshold, getDerivates(offsetThreshold, set[index], 1));
      // console.log('-', offsetThreshold, getDerivates(offsetThreshold, set[index], -1));

      const derivates = getDerivates(offsetThreshold, set[index], 1)
          .concat(getDerivates(offsetThreshold, set[index], -1));

      // console.log('derivates', derivates);

      const next = derivates.map((d) => {
        // console.log('d', d);
        const next = set.slice(0, index).concat([d]).concat(set.slice(index + 1));

        // console.log("next of next", next);
        return next;
      });

      // console.log('next', next);

      return prev.concat(next)

      // const withUnder =
      // const withAbove = set.slice(0, index).concat([above]).concat(index + 1)
      return prev;
      //return prev.concat([withUnder, withAbove]);
    }, []);
  },

  isWinner(a, b, positionThreshold, differenceThreshold) {
    var unEqualPositions = 0;

    return a.reduce((prev, pick, index) => {
      if (a[index] === b[index]) {
          return prev && true;
      }

      else if (!isClose(a[index], b[index], differenceThreshold)) {
        return prev && false;
      }

      return prev && (++unEqualPositions <= positionThreshold);
    }, true);
  }
}
