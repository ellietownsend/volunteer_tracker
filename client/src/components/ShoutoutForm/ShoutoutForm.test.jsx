import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { test, expect, vi, afterEach } from "vitest";
import ShoutoutForm from "./ShoutoutForm";
import {
  fetchVolunteers,
  createShoutout,
} from "../../services/shoutoutService";

afterEach(() => {
  cleanup();
});

/*Mock supabase responses for fetchVolunteers and createShoutout functions */
vi.mock("../../services/shoutoutService");

async function selectVolunteer(user, name = "John Doe") {
  const input = screen.getByPlaceholderText(/type or select volunteer/i);

  await user.click(input);
  await user.type(input, "John");

  await user.click(await screen.findByText(name));
}

/* Test error when submission fails */
test("displays an error message when shoutout submission fails", async () => {
  fetchVolunteers.mockResolvedValue([
    {
      email: "john@test.com",
      firstname: "John",
      lastname: "Doe",
    },
  ]);

  createShoutout.mockRejectedValue(
    new Error("Failed to create shoutout")
  );

  render(<ShoutoutForm />);

  const user = userEvent.setup();

  await selectVolunteer(user);

  const message = screen.getByRole("textbox", {
    name: /shoutout message/i,
  });

  await user.type(message, "Great volunteer!");

  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(
    await screen.findByText("Failed to create shoutout")
  ).toBeInTheDocument();
});

test("submits shoutout successfully", async () => {
  fetchVolunteers.mockResolvedValue([
    {
      email: "john@test.com",
      firstname: "John",
      lastname: "Doe",
    },
  ]);

  createShoutout.mockResolvedValue({});

  render(<ShoutoutForm />);

  const user = userEvent.setup();

  await selectVolunteer(user);

  const message = screen.getByRole("textbox", {
    name: /shoutout message/i,
  });

  await user.type(message, "Great volunteer!");

  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(
    await screen.findByText(/thank you for submitting a shoutout!/i)
  ).toBeInTheDocument();
  expect(createShoutout).toHaveBeenCalledWith(
    "john@test.com",
    "Great volunteer!"
  );
});

/* Test volunteers are fetched on mount */
test("loads and displays volunteers in autocomplete", async () => {
  fetchVolunteers.mockResolvedValue([
    {
      email: "john@test.com",
      firstname: "John",
      lastname: "Doe",
    },
    {
      email: "jane@test.com",
      firstname: "Jane",
      lastname: "Smith",
    },
  ]);

  render(<ShoutoutForm />);

  const user = userEvent.setup();

  const input = screen.getByPlaceholderText(/type or select volunteer/i);

  await user.click(input);

  expect(await screen.findByText("John Doe")).toBeInTheDocument();
  expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
});


test("does not submit with empty message", async () => {
  fetchVolunteers.mockResolvedValue([
    {
      email: "john@test.com",
      firstname: "John",
      lastname: "Doe",
    },
  ]);

  createShoutout.mockResolvedValue({});

  render(<ShoutoutForm />);

  const user = userEvent.setup();

  await selectVolunteer(user);

  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(
    await screen.findByText("Message cannot be empty")
  ).toBeInTheDocument();
});


/* Test form cannot be submitted while pending */
test("disables submit button while submitting", async () => {
  fetchVolunteers.mockResolvedValue([
    {
      email: "john@test.com",
      firstname: "John",
      lastname: "Doe",
    },
  ]);

  let resolvePromise;

  createShoutout.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
  );

  render(<ShoutoutForm />);

  const user = userEvent.setup();

  await selectVolunteer(user);

  const message = screen.getByRole("textbox", {
    name: /shoutout message/i,
  });

    await user.type(message, "Great volunteer!");

  const button = screen.getByRole("button", { name: /submit/i });

  await user.click(button);

  expect(button).toBeDisabled();

  resolvePromise();
});


