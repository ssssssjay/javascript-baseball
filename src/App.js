const { Console, Random } = require("@woowacourse/mission-utils");

class App {
  play() {
    this.showStartMessage();
    const randomNumber = this.makeRandomNumber();
    console.log(randomNumber);
    this.getUsersPrediction(randomNumber);
  }

  showStartMessage() {
    Console.print("숫자 야구 게임을 시작합니다.");
  }

  makeRandomNumber() {
    const randomNumber = [];
    while (randomNumber.length < 3) {
      const number = Random.pickNumberInRange(1,9);
      if (!randomNumber.includes(number)) {
        randomNumber.push(number);
      }
    }
    return randomNumber;
  }

  getUsersPrediction(randomNumber) {
    Console.readLine('숫자를 입력해주세요 : ', (prediction) => {
      console.log(prediction);
      const convertedNumber = prediction.split('').map(Number);
      console.log(convertedNumber);
      if (this.isRightAnswer(randomNumber, convertedNumber)) {
        Console.close();
      }
    })
  }

  isRightAnswer(randomNumber, userInput) {
    return randomNumber.join('') === userInput.join('');
  }
}

const app = new App();
app.play();

module.exports = App;
