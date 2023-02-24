import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// add methods from react-testing-library to vitest
expect.extend(matchers);

// clear jsdom after each test
afterEach(() => {
  cleanup();
});
