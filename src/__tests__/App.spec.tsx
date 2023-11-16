import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";

it("Should display the correct title ", () => {
  const queryClient = new QueryClient();
  const route  = '/signup'
  render(
    <MemoryRouter initialEntries={[route]}>
      
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  );
  const title = screen.getByText(/Create a new account/i);

  expect(title).toBeVisible();
});
