import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { beforeAll, afterEach, afterAll } from "vitest";

export const server = setupServer(
  http.post("/api/new", () => {
    return HttpResponse.json({ id: "test-game-id" });
  })
);

// Start the server before all tests
beforeAll(() => {
  server.listen();
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Close the server after all tests
afterAll(() => {
  server.close();
}); 