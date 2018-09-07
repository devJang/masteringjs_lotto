const { LOTTO, PRIZE } = require('./constant.js');

const gen = function*(max, fn, ...args) {
  let cursor = 0;

  while (cursor < max) {
    yield fn(...args);
    cursor++;
  }
};

const generatorLuckyNumber = (max) => gen(max, getRandomIntInclusive, LOTTO.MIN, LOTTO.MAX);
const getLuckyNumber = (num) => [...generatorLuckyNumber(num)];
const printLotto = (max) => gen(max, getLuckyNumber, LOTTO.EA);
const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const matchNumber = (arr1, arr2) => arr1.filter((item) => arr2.includes(item));

const printLottoMessge = function(count) {
  return [...printLotto(count)].reduce((prev, curr, index) => {
    return (
      `${prev}` +
      `
    [${curr}]`
    );
  }, `로또 ${count}개를 발행했습니다.`);
};

const luckyMessage = (count) => {
  const prizeKeys = Object.keys(PRIZE);

  // TODO: 수익률 계산
  return (
    prizeKeys.reduce(
      (prev, curr, index) => {
        const price = Object.values(PRIZE)[index];

        return (
          prev +
          `
        ${curr}개 일치 (${price}원)- ${curr === count ? count : '0'}개`
        );
      },
      `당첨 통계
      ---------`,
    ) +
    `
      나의 수익률은 OO%입니다`
  );
};

const buyLottos = function(money) {
  const LOTTO_COUNT = money / LOTTO.PRICE;

  return printLottoMessge(LOTTO_COUNT);
};

const setLuckyNumber = function(luckyArr) {
  const genLuckyArr = getLuckyNumber(LOTTO.MAX);
  const matchCount = matchNumber(luckyArr, genLuckyArr).length;

  return luckyMessage(matchCount);
};

console.log(buyLottos(3000));
console.log(setLuckyNumber([1, 2, 3, 4, 5, 6]));
