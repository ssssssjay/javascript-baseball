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
      if (!this.validateThreeFigures(prediction)) {
        throw '잘못된 값을 입력했습니다!';
      }
      const convertedNumber = prediction.split('').map(Number);
      console.log(convertedNumber);
      if (this.isRightAnswer(randomNumber, convertedNumber)) {
        Console.print('3스트라이크');
        Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
        this.getUsersNextAction();
      } else if (this.isNothing(randomNumber, convertedNumber)) {
        Console.print('낫싱');
        this.getUsersPrediction(randomNumber);
      } else {
        const [ballCount, strikeCount] = this.calculateCount(randomNumber, convertedNumber);
        this.showCountMessage(ballCount, strikeCount);
        this.getUsersPrediction(randomNumber);
      }
    })
  }

  isRightAnswer(randomNumber, userInput) {
    return randomNumber.join('') === userInput.join('');
  }

  isNothing(randomNumber, userInput) {
    const union = new Set([...randomNumber, ...userInput]);
    return union.size === 6;
  }

  calculateCount(randomNumber, userInput) {
    let ballCount = 0;
    let strikeCount = 0;
    randomNumber.forEach((number, index) => {
      if (userInput.includes(number) && index !== userInput.indexOf(number)) {
        ballCount++;
      } else if(userInput[index] === number) {
        strikeCount++;
      }
    });
    return [ballCount, strikeCount];
  }

  showCountMessage(ballCount, strikeCount) {
    if (ballCount === 0) {
      Console.print(`${strikeCount}스트라이크`);
    } else if (strikeCount === 0) {
      Console.print(`${ballCount}볼`);
    } else {
      Console.print(`${ballCount}볼 ${strikeCount}스트라이크`);
    }
  }

  getUsersNextAction() {
    Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (userInput) => {
      if (!this.validateNextAction(userInput)) {
        throw '잘못된 값을 입력했습니다!'
      } else if (userInput === '1') {
        const randomNumber = this.makeRandomNumber();
        console.log(randomNumber)
        this.getUsersPrediction(randomNumber);
      } else if (userInput === '2') {
        Console.close();
      }
    })
  }

  validateThreeFigures(userInput) {
    // 'asd' '1234' '122'
    const regex = /[^1-9]/g;
    if (userInput.length !== 3) {
      // 3자리가 아닌경우 asdf 1234
      return false;
    } else if (new Set(userInput).size !== 3) {
      // 중복숫자가있는경우 113
      return false;
    } else if (regex.test(userInput)) {
      // 숫자가아닌 문자열이 있는 경우
      return false;
    } else {
      return true;
    }
    
  }

  validateNextAction(userInput) {
    if (!userInput === '1' || !userInput === '2') {
      return false;
    } else {
      return true;
    }
  }
}

const app = new App();
app.play();

module.exports = App;
