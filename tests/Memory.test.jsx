import Memory from "../src/memory/Memory";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";

describe("Memory", () => {
  vi.useFakeTimers();

  it("renders memory game start", () => {
    render(<Memory />);

    expect(screen.getByRole("heading")).toHaveTextContent("Memory Game");
    expect(screen.getByRole("button")).toHaveTextContent("Start");
  });

  it("Start memory game", () => {
    render(<Memory />);

    fireEvent.click(screen.getByRole("button"));
    const board = screen.getByTestId("m-board");
    const tile = board.firstChild.firstChild;

    expect(tile).toHaveClass("m-cell");
    expect(screen.queryByText("Check"));
    expect(screen.queryByText("Restart"));

    fireEvent.click(tile);
  });

  it("Start memory game", () => {
    render(<Memory />);

    fireEvent.click(screen.getByRole("button"));
    const board = screen.getByTestId("m-board");
    const tile = board.firstChild.firstChild;

    expect(tile).toHaveClass("m-cell");
    expect(screen.queryByText("Check"));
    expect(screen.queryByText("Restart"));

    fireEvent.click(screen.queryByText("Restart"));
    expect(screen.getByRole("button")).toHaveTextContent("Start");
  });

  it("Check memory game", () => {
    render(<Memory />);

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.queryByText("Check"));
    expect(screen.queryByText("Check")).toBeFalsy();
  });
});
