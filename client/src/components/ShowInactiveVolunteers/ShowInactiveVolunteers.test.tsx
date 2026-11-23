import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { test, expect, vi, afterEach } from "vitest";
import ShowInactiveVolunteers from "./ShowInactiveVolunteers";
import {
  getInactiveVolunteers,
  googleTokenExist,
  generateEmailToInactiveVolunteers,
  draftUsingEmailAPI,
  redirectToGoogleAuth,
} from "../../services/showInactiveVolunteers";

import { useAuth } from "../../context/AuthContext";

afterEach(() => {
  cleanup();
});

vi.mock("../../../supabase-client", () => ({
  default: {},
}));

vi.mock("../../services/showInactiveVolunteers");

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("./DisplayInActiveVolunteers", () => ({
  default: ({ volunteers }) => (
    <div data-testid="generated-emails">
      {volunteers.map((volunteer, index) => (
        <p key={index}>{volunteer.email}</p>
      ))}
    </div>
  ),
}));

const mockVolunteers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@test.com",
  },
];

const mockGeneratedEmail = {
  subject: "We miss you!",
  body: "Please come back.",
};

const mockDrafts = [
  {
    id: 1,
    email: "john@test.com",
  },
];

// Set up default mocks for each test
function setupMocks() {
  useAuth.mockReturnValue({
    session: {
      user: {
        id: "user-123",
      },
    },
  });

  getInactiveVolunteers.mockResolvedValue(mockVolunteers);
  googleTokenExist.mockResolvedValue(true);
  generateEmailToInactiveVolunteers.mockResolvedValue(
    mockGeneratedEmail
  );
  draftUsingEmailAPI.mockResolvedValue(mockDrafts);
}

/* Test inactive volunteers are fetched */
test("loads and displays inactive volunteers", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  expect(await screen.findByText("1")).toBeInTheDocument();

  expect(getInactiveVolunteers).toHaveBeenCalled();
});

```
/* Test empty state when there are no inactive volunteers */
test("displays empty state when all volunteers are active", async () => {
  setupMocks();

  getInactiveVolunteers.mockResolvedValue([]);

  render(<ShowInactiveVolunteers />);

  expect(
    await screen.findByText("All volunteers are currently active.")
  ).toBeInTheDocument();
});

/* Test error when fetching inactive volunteers fails */
test("displays an error when fetching inactive volunteers fails", async () => {
  setupMocks();

  getInactiveVolunteers.mockRejectedValue(
    new Error("Server error")
  );

  render(<ShowInactiveVolunteers />);

  expect(
    await screen.findByText(
      "Error loading inactive volunteers: Server error"
    )
  ).toBeInTheDocument();
});

/* Test Google token is checked */
test("checks whether the user has a Google token", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  await waitFor(() => {
    expect(googleTokenExist).toHaveBeenCalledWith("user-123");
  });
});

/* Test signed-in user can reach out */
test("displays Reach Out button when user is signed in", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  expect(
    await screen.findByRole("button", { name: /reach out/i })
  ).toBeInTheDocument();
});

/* Test sign-in button when user does not have a Google token */
test("displays Sign in to Gmail when user is not signed in", async () => {
  setupMocks();

  googleTokenExist.mockResolvedValue(false);

  render(<ShowInactiveVolunteers />);

  expect(
    await screen.findByRole("button", {
      name: /sign in to gmail/i,
    })
  ).toBeInTheDocument();
});

/* Test error when checking Google token fails */
test("handles an error when checking Google token fails", async () => {
  setupMocks();

  googleTokenExist.mockRejectedValue(
    new Error("Token lookup failed")
  );

  render(<ShowInactiveVolunteers />);

  expect(
    await screen.findByRole("button", {
      name: /sign in to gmail/i,
    })
  ).toBeInTheDocument();
});

/* Test redirect to Google authentication */
test("redirects user to Google authentication when sign in is clicked", async () => {
  setupMocks();

  googleTokenExist.mockResolvedValue(false);

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /sign in to gmail/i,
  });

  await user.click(button);

  expect(redirectToGoogleAuth).toHaveBeenCalledWith("user-123");
});

/* Test email generation */
test("generates an email for the first inactive volunteer", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  await waitFor(() => {
    expect(generateEmailToInactiveVolunteers).toHaveBeenCalledWith(
      mockVolunteers[0]
    );
  });
});

/* Test error when email generation fails */
test("displays an error when email generation fails", async () => {
  setupMocks();

  generateEmailToInactiveVolunteers.mockRejectedValue(
    new Error("Email generation failed")
  );

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  expect(
    await screen.findByText(
      "Failed to make emails: Email generation failed"
    )
  ).toBeInTheDocument();

  expect(draftUsingEmailAPI).not.toHaveBeenCalled();
});

/* Test Gmail drafts are created after emails are generated */
test("creates Gmail drafts after successfully generating emails", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  await waitFor(() => {
    expect(draftUsingEmailAPI).toHaveBeenCalledWith(
      "user-123",
      mockGeneratedEmail
    );
  });
});

/* Test generated drafts are displayed */
test("displays generated drafts after successful completion", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  expect(
    await screen.findByText("Emails in draft!")
  ).toBeInTheDocument();

  expect(screen.getByTestId("generated-emails")).toBeInTheDocument();

  expect(screen.getByText("john@test.com")).toBeInTheDocument();
});

/* Test error when Gmail drafts cannot be created */
test("displays an error when creating Gmail drafts fails", async () => {
  setupMocks();

  draftUsingEmailAPI.mockRejectedValue(
    new Error("Draft creation failed")
  );

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  expect(
    await screen.findByText(
      "Failed to make drafts: Draft creation failed"
    )
  ).toBeInTheDocument();
});

/* Test button is disabled while emails are being generated */
test("disables Reach Out button while generating emails", async () => {
  setupMocks();

  let resolvePromise;

  generateEmailToInactiveVolunteers.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
  );

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  const loadingButton = await screen.findByRole("button", {
    name: /making emails/i,
  });

  expect(loadingButton).toBeDisabled();

  resolvePromise(mockGeneratedEmail);
});

/* Test button is disabled after successful draft creation */
test("disables Reach Out button after emails are drafted", async () => {
  setupMocks();

  render(<ShowInactiveVolunteers />);

  const user = userEvent.setup();

  const button = await screen.findByRole("button", {
    name: /reach out/i,
  });

  await user.click(button);

  const completedButton = await screen.findByRole("button", {
    name: /emails in draft/i,
  });

  expect(completedButton).toBeDisabled();
});
```