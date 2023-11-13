import React from "react";
import {render} from "@testing-library/react";
import Currency from "./Currency";
import '@testing-library/jest-dom'

it("smoke test, should render Currency without crashing", function(){
    render(<Currency/>);
});

it("snapshot test for Currency", function(){
  const {asFragment} = render(<Currency />);
  expect(asFragment()).toMatchSnapshot();
});

test('test button presence', () => {
  const {getByText} = render(<Currency />)
  expect(getByText("Plot")).toBeInTheDocument();
});
