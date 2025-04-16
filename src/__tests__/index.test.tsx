import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import { server } from "./setupMSW";
import { http, HttpResponse } from "msw";
import { useRouter } from "next/router";

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

describe("Tic Tac Toe", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should show form inputs and start button", async () => {
    render(<Home />);

    const player1Input = screen.getByPlaceholderText("❌ Your Name");
    const player2Input = screen.getByPlaceholderText("⭕ Opponent Name");
    const startButton = screen.getByText("Start Game");

    expect(player1Input).toBeDefined();
    expect(player2Input).toBeDefined();
    expect(startButton).toBeDefined();
  });

  it("should display loading when creating game", async () => {
    // Override the handler to delay the response
    server.use(
      http.post("/api/new", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return HttpResponse.json({ id: "test-game-id" });
      })
    );

    const user = userEvent.setup();
    render(<Home />);

    // Fill in player names
    await user.type(screen.getByPlaceholderText("❌ Your Name"), "Player1");
    await user.type(screen.getByPlaceholderText("⭕ Opponent Name"), "Player2");

    // Click start button
    const startButton = screen.getByText("Start Game");
    await user.click(startButton);

    // Check if button is disabled while loading
    expect(startButton).toBeDisabled();

    // Wait for loading to complete
    await waitFor(() => {
      expect(startButton).not.toBeDisabled();
    }, { timeout: 1500 });
  });

  it("should create a new game when form is submitted", async () => {
    const mockRouter = {
      push: vi.fn()
    };
    (useRouter as any).mockReturnValue(mockRouter);

    // Set up successful response
    server.use(
      http.post("/api/new", () => {
        return HttpResponse.json({ id: "test-game-id" });
      })
    );

    const user = userEvent.setup();
    render(<Home />);

    // Fill in player names
    await user.type(screen.getByPlaceholderText("❌ Your Name"), "Player1");
    await user.type(screen.getByPlaceholderText("⭕ Opponent Name"), "Player2");

    // Click start button
    await user.click(screen.getByText("Start Game"));

    // Wait for navigation
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/game/test-game-id");
    });
  });

  it("should not allow starting game without player names", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const startButton = screen.getByText("Start Game");
    expect(startButton).toBeDisabled();

    // Fill in only one name
    await user.type(screen.getByPlaceholderText("❌ Your Name"), "Player1");
    expect(startButton).toBeDisabled();

    // Fill in both names
    await user.type(screen.getByPlaceholderText("⭕ Opponent Name"), "Player2");
    expect(startButton).not.toBeDisabled();
  });
});