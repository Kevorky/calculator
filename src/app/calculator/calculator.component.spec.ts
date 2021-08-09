import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Operand } from '../enums/input.enum';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let el: DebugElement;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CalculatorComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should display number user clicks',
    waitForAsync(() => {
      let buttonElement = fixture.debugElement.query(By.css('.btn-6'));
      let result = fixture.debugElement.nativeElement.querySelector('.result');

      buttonElement.triggerEventHandler('click', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.result).toBe('6');
      });
    })
  );

  it(
    'should add 2 numbers',
    waitForAsync(() => {
      component.firstNumber = '100';
      component.secondNumber = '234';
      component.currentOperand = Operand.Add;
      component.calculateResult();

      expect(component.result).toBe('334');
    })
  );

  it(
    'should subtract 2 numbers',
    waitForAsync(() => {
      component.firstNumber = '350';
      component.secondNumber = '34';
      component.currentOperand = Operand.Subtract;
      component.calculateResult();

      expect(component.result).toBe('316');
    })
  );

  it(
    'should multiple 2 numbers',
    waitForAsync(() => {
      component.firstNumber = '9';
      component.secondNumber = '8';
      component.currentOperand = Operand.Multiply;
      component.calculateResult();

      expect(component.result).toBe('72');
    })
  );

  it(
    'should divide 2 numbers',
    waitForAsync(() => {
      component.firstNumber = '700';
      component.secondNumber = '3';
      component.currentOperand = Operand.Divide;
      component.calculateResult();

      expect(Number(component.result).toFixed(2)).toEqual('233.33');
    })
  );

  it(
    'should multiple decimal numbers',
    waitForAsync(() => {
      component.firstNumber = '34.53';
      component.secondNumber = '78.25';
      component.currentOperand = Operand.Multiply;
      component.calculateResult();

      expect(Number(component.result).toFixed(2)).toEqual('2701.97');
    })
  );

  it(
    'should calculate result when use presses equal',
    waitForAsync(() => {
      let button6El = fixture.debugElement.query(By.css('.btn-6'));
      let button7El = fixture.debugElement.query(By.css('.btn-7'));
      let button5El = fixture.debugElement.query(By.css('.btn-5'));
      let button9El = fixture.debugElement.query(By.css('.btn-9'));
      let buttonPlusEl = fixture.debugElement.query(By.css('.btn-plus'));
      let buttonEqualEl = fixture.debugElement.query(By.css('.btn-equal'));

      button6El.triggerEventHandler('click', null);
      button6El.triggerEventHandler('click', null);
      button7El.triggerEventHandler('click', null);
      button7El.triggerEventHandler('click', null);
      button9El.triggerEventHandler('click', null);
      buttonPlusEl.triggerEventHandler('click', null);
      button5El.triggerEventHandler('click', null);
      button9El.triggerEventHandler('click', null);
      buttonEqualEl.triggerEventHandler('click', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.result).toBe('66838');
      });
    })
  );

  it(
    'should clear results when AC is pressed',
    waitForAsync(() => {
      let button6El = fixture.debugElement.query(By.css('.btn-6'));
      let button7El = fixture.debugElement.query(By.css('.btn-7'));
      let buttonPlusEl = fixture.debugElement.query(By.css('.btn-plus'));
      let buttonEqualAC = fixture.debugElement.query(By.css('.btn-ac'));
      let result = fixture.debugElement.nativeElement.querySelector('.result');

      button6El.triggerEventHandler('click', null);
      buttonPlusEl.triggerEventHandler('click', null);
      button7El.triggerEventHandler('click', null);
      buttonEqualAC.triggerEventHandler('click', null);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(result.textContent).toBe('0');
      });
    })
  );
});
