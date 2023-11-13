import React from "react";
import {render} from "@testing-library/react";
import Analysis from "./Analysis";

// smoke test
it("should render Analysis without crashing", function(){
    render(<Analysis/>);
});

// snapshot test
it("snapshot test for Analysis", function(){
    const {asFragment} = render(<Analysis />);
    expect(asFragment()).toMatchSnapshot();
  });
