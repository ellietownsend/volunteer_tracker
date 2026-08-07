import {
    render,
    screen,
    cleanup,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { test, expect, vi, afterEach } from "vitest";

import EditVolunteerInfo from "./EditVolunteerInfo";
import {
    updateVolunteer,
    removeVolunteer,
} from "../../services/volunteerList";

vi.mock("../../services/volunteerList", () => ({
    updateVolunteer: vi.fn(),
    removeVolunteer: vi.fn(),
}));

vi.mock("./ShowSuccess", () => ({
    default: ({ message }) => <div>{message}</div>,
}));

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

const closeModal = vi.fn();

const volunteer = {
    email: "john@test.com",
    first_name: "John",
    last_name: "Smith",
    birthdate: "2000-01-01",
    subject: ["Math"],
    role: ["Tutor"],
};

test("renders edit volunteer form", () => {
    render(
        <EditVolunteerInfo
            currVolunteerInfo={volunteer}
            closeModal={closeModal}
        />
    );

    expect(
        screen.getByText(
            /Change any box's information/i
        )
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", {
            name: /update/i,
        })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthdate/i)).toBeInTheDocument();
});

test("update button is enabled", () => {
    render(
        <EditVolunteerInfo
            currVolunteerInfo={volunteer}
            closeModal={closeModal}
        />
    );

    expect(
        screen.getByRole("button", {
            name: /update/i,
        })
    ).toBeEnabled();
});

test("updates changed field", async () => {
    updateVolunteer.mockResolvedValue({
        success: true,
        error: null,
    });

    const user = userEvent.setup();

    render(
        <EditVolunteerInfo
            currVolunteerInfo={volunteer}
            closeModal={closeModal}
        />
    );

    const firstName = screen.getByLabelText(/First name/i);

    await user.clear(firstName);
    await user.type(firstName, "Jane");

    await user.click(
        screen.getByRole("button", {
            name: /update/i,
        })
    );

    await waitFor(() => {
        expect(updateVolunteer).toHaveBeenCalledWith(
            "john@test.com",
            "first_name",
            "Jane"
        );
    });
});

test("shows service error when update fails", async () => {
    updateVolunteer.mockResolvedValue({
        success: false,
        error: "Database error",
    });

    const user = userEvent.setup();

    render(
        <EditVolunteerInfo
            currVolunteerInfo={volunteer}
            closeModal={closeModal}
        />
    );

    const firstName = screen.getByLabelText(/First name/i);

    await user.clear(firstName);
    await user.type(firstName, "Jane");

    await user.click(
        screen.getByRole("button", {
            name: /update/i,
        })
    );

    expect(
        await screen.findByText("Database error")
    ).toBeInTheDocument();
});

test("clicking X closes modal", async () => {
    const user = userEvent.setup();

    render(
        <EditVolunteerInfo
            currVolunteerInfo={volunteer}
            closeModal={closeModal}
        />
    );

    await user.click(
        screen.getByRole("button", {
            name: "X",
        })
    );

    expect(closeModal).toHaveBeenCalledTimes(1);
});

test("removes a volunteer", async () => {
    removeVolunteer.mockResolvedValue({
        success: true,
        error: null,
    });

    const user = userEvent.setup();

    render(
        <EditVolunteerInfo
            currVolunteerInfo={volunteer}
            closeModal={closeModal}
        />
    );

    await user.click(
        screen.getByRole("checkbox", {
            name: /remove volunteer/i,
        })
    );

    await user.click(
        screen.getByRole("button", {
            name: /update/i,
        })
    );

    await waitFor(() => {
        expect(removeVolunteer).toHaveBeenCalledWith(
            "john@test.com"
        );
    });
});