import { fireEvent, render, screen } from '@testing-library/react';
import { Calculator, number, operations, equalSign, reset } from './App';

describe('Calculator', () => {
 
  it('should render title correctly', () => {
      render(<Calculator />)
      screen.getByText('Calculadora')
  })
  it('should render numbers', () => {
    render(<Calculator/>)
    
    number.forEach(number => {
      screen.getByText(number)
    })
  })
  it('should render 4 rows', () =>{
    render(<Calculator/>)
    expect(screen.getAllByRole('row').length).toBe(4)
  })
  it('should render operations', () =>{
    render(<Calculator/>)
    operations.forEach(operation => {
      screen.getByText(operation)
    })
  })
  it('should render equal sign', () =>{
    render(<Calculator/>)
    screen.getByText('=')
    })
  it('should render an input', () =>{
    render(<Calculator/>)
    screen.getByRole('textbox')
  })
  it('should user input after click a number', () =>{
    render(<Calculator/>)
    const one = screen.getByText('1')
    fireEvent.click(one)
    const input = screen.getByRole('textbox')
    expect(input.value).toBe('1')
  })
  it('should user input after clicking several numbers', () =>{
    render(<Calculator/>)
    const one = screen.getByText('1')
    fireEvent.click(one)

    const two = screen.getByText('2')
    fireEvent.click(two)
    
    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('123')
  })
  it('should show user input after clicking numbers and operators', () =>{
    render(<Calculator/>)
    const one = screen.getByText('1')
    fireEvent.click(one)
    
    const plus = screen.getByText('+')
    fireEvent.click(plus)
    fireEvent.click(one)
    // fireEvent.click(equalSign)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('1+1')
  })
  it('should calculate based on user input and show calculation', () =>{
    render(<Calculator/>)
    const one = screen.getByText('1')
    fireEvent.click(one)
    
    const plus = screen.getByText('+')
    fireEvent.click(plus)

    fireEvent.click(one)

    const equal = screen.getByText(equalSign)
    fireEvent.click(equal)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('2')
  })
  it('should show an empty user input', () =>{
    render(<Calculator/>)
    const one = screen.getByText('1')
    fireEvent.click(one)
    
    const plus = screen.getByText('+')
    fireEvent.click(plus)

    fireEvent.click(one)

    const equal = screen.getByText(equalSign)
    fireEvent.click(equal)

    const clean = screen.getByText(reset)
    fireEvent.click(clean)


    const input = screen.getByRole('textbox')
    expect(input.value).toBe('')
  })
  it('should calculate based previous calculation', () =>{
    render(<Calculator/>)
    const one = screen.getByText('1')
    fireEvent.click(one)
    
    const plus = screen.getByText('+')
    fireEvent.click(plus)

    fireEvent.click(one)

    const equal = screen.getByText(equalSign)
    fireEvent.click(equal)

    const minusButton = screen.getByText('-')
    fireEvent.click(minusButton)

    const two = screen.getByText('2')
    fireEvent.click(two)
    

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('0')
  })
})