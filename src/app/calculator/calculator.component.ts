import { Component, OnInit } from '@angular/core';
import { Operand } from '../enums/input.enum';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  result: string = '0';
  operand = Operand;
  firstNumber = '';
  secondNumber = '';
  currentOperand = '';
  equalPressed = false;
  percentActive = false;

  constructor() {}

  ngOnInit(): void {}

  input(input: any) {
    // If percent was pressed, wait for user to either press Equal or AC.
    if (this.percentActive) {
      return;
    }

    // Remove trailing zero.
    this.result = this.result === '0' ? '' : this.result;

    // If equal was pressed from a previous calculation and user has not applied
    // further actions, then start fresh.
    if (this.equalPressed && !this.currentOperand) {
      this.firstNumber = '';
      this.result = '';
      this.equalPressed = false;
    }

    if (!this.result) {
      this.firstNumber += input.toString();
    } else if (!this.currentOperand) {
      this.firstNumber += input.toString();
    } else {
      this.secondNumber += input.toString();
    }

    this.result += input.toString();
    console.log('Pressed ' + input);
    console.log('First Number: ' + this.firstNumber);
    console.log('Second Number: ' + this.secondNumber);
  }

  action(action: Operand) {
    // If percent was pressed, wait for user to either press Equal or AC.
    if (this.percentActive) {
      return;
    }

    if (this.firstNumber) {
      if (!this.secondNumber && !this.currentOperand) {
        this.result += action;
        this.currentOperand = action;
        console.log('Pressed ' + action);
      } else if (this.secondNumber) {
        this.calculateResult(action);
      }
    }
  }

  calculateResult(nextOperand?: Operand) {
    switch (this.currentOperand) {
      case Operand.Add:
        this.result = (+this.firstNumber + +this.secondNumber).toString();
        break;
      case Operand.Subtract:
        this.result += '-';
        this.result = (+this.firstNumber - +this.secondNumber).toString();
        break;
      case Operand.Multiply:
        this.result += '*';
        this.result = (+this.firstNumber * +this.secondNumber).toString();
        break;
      case Operand.Divide:
        this.result += '/';
        this.result = (+this.firstNumber / +this.secondNumber).toString();
        break;
      default:
    }

    if (nextOperand) {
      this.firstNumber = this.result;
      this.currentOperand = nextOperand;
      this.result = this.firstNumber + nextOperand;
    } else {
      this.firstNumber = this.result;
      this.currentOperand = '';
      this.equalPressed = true;
    }

    this.secondNumber = '';
  }

  allClear() {
    this.result = '0';
    this.firstNumber = '';
    this.secondNumber = '';
    this.currentOperand = '';
    this.percentActive = false;
  }

  comingSoon() {
    alert('This feature is coming soon... Thank you for your patience.');
  }

  percent() {
    if (!this.percentActive) {
      if (this.firstNumber && this.secondNumber && this.currentOperand) {
        this.result += '%';
        this.percentActive = true;
      }
    }
  }

  equal() {
    if (this.percentActive) {
      this.secondNumber = (
        (+this.firstNumber * +this.secondNumber) /
        100
      ).toString();

      this.percentActive = false;
    }

    this.calculateResult();
  }
}
