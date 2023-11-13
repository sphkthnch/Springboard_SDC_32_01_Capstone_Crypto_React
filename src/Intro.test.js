import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Intro from "./Intro";
import '@testing-library/jest-dom'

it("smoke test, should render Intro without crashing", function(){
    render(<Intro />);
});

it("snapshot test for Intro", function(){
  const {asFragment} = render(<Intro />);
  expect(asFragment()).toMatchSnapshot();
});

test('test button presence', () => {
  const {getByText} = render(<Intro />)
  expect(getByText('Click to Show Sample Crypto-Currency Information')).toBeInTheDocument();
  expect(getByText(/Click/)).toBeInTheDocument();
})

it("Specialized Testing, Intro, debug", function(){
  const {getByText, debug} = render(<Intro />);
  debug();

  fireEvent.click(getByText("Click to Show Sample Crypto-Currency Information"));
  
  debug();
});
