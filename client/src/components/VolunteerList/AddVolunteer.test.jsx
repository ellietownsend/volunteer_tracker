import {
    render,
    screen,
    cleanup,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { test, expect, vi, afterEach } from "vitest";

import { AddVolunteer } from "./AddVolunteer";
import { addVolunteer } from "../../services/volunteerList";

vi.mock("../../services/volunteerList", () => ({
    addVolunteer: vi.fn(),
}));

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

const onClose = vi.fn();

test("renders add volunteer form", () => {
    render(<AddVolunteer onClose={onClose} />);

    expect(
        screen.getByText("Sign up a new volunteer")
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", {
            name: /add volunteer/i,
        })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthdate/i)).toBeInTheDocument();
});

test("submit button is enabled initially", () => {
    render(<AddVolunteer onClose={onClose} />);

    expect(
        screen.getByRole("button", {
            name: /add volunteer/i,
        })
    ).toBeEnabled();
});

test("submits volunteer with entered values", async () => {
    addVolunteer.mockResolvedValue({
        success: true,
        error: null,
    });

    const user = userEvent.setup();

    render(<AddVolunteer onClose={onClose} />);

    await user.type(
        screen.getByLabelText(/email/i),
        "john@test.com"
    );

    await user.type(
        screen.getByLabelText(/First Name/i),
        "John"
    );

    await user.type(
        screen.getByLabelText(/Last Name/i),
        "Smith"
    );

    await user.type(
        screen.getByLabelText(/birthdate/i),
        "2000-01-01"
    );

    await user.click(screen.getByLabelText(/math/i));
    await user.click(screen.getByLabelText(/tutor/i));

    await user.click(
        screen.getByRole("button", {
            name: /add volunteer/i,
        })
    );

    await waitFor(() => {
        expect(addVolunteer).toHaveBeenCalledWith({
            email: "john@test.com",
            first_name: "John",
            last_name: "Smith",
            birthdate: "2000-01-01",
            subject: ["Math"],
            role: ["Tutor"],
        });
    });
});

test("shows service error when submission fails", async () => {
    addVolunteer.mockResolvedValue({
        success: false,
        error: "Volunteer already exists",
    });

    const user = userEvent.setup();

    render(<AddVolunteer onClose={onClose} />);

    await user.type(
        screen.getByLabelText(/Email/i),
        "john@test.com"
    );

    await user.type(
        screen.getByLabelText(/First name/i),
        "John"
    );

    await user.type(
        screen.getByLabelText(/Last name/i),
        "Smith"
    );

    await user.type(
        screen.getByLabelText(/Birthdate/i),
        "2000-01-01"
    );

    await user.click(
        screen.getByRole("button", {
            name: /add volunteer/i,
        })
    );

    expect(
        await screen.findByText("Volunteer already exists")
    ).toBeInTheDocument();
});

test("clicking X calls onClose", async () => {
    const user = userEvent.setup();

    render(<AddVolunteer onClose={onClose} />);

    await user.click(
        screen.getByRole("button", {
            name: "X",
        })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
});