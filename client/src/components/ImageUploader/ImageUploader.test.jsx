import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { test, expect, vi, afterEach } from "vitest";

import ImageUploader from "./ImageUploader.jsx";
import { uploadImage } from "../../services/imageUploaderService";

vi.mock("../../services/imageUploaderService", () => ({
    uploadImage: vi.fn(),
}));

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});


test("renders image uploader", () => {
    render(<ImageUploader />);

    expect(
        screen.getByText("Upload Volunteer Image")
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", { name: "Upload" })
    ).toBeInTheDocument();

    expect(
        screen.getByLabelText(/upload volunteer image/i)
    ).toBeInTheDocument();
});

test("upload button is enabled initially", () => {
    render(<ImageUploader />);

    expect(
        screen.getByRole("button", { name: "Upload" })
    ).toBeEnabled();
});

test("shows error when no image is selected", async () => {
    const user = userEvent.setup();

    render(<ImageUploader />);

    await user.click(
        screen.getByRole("button", { name: "Upload" })
    );

    expect(
        await screen.findByText(
            "Please select an image to upload."
        )
    ).toBeInTheDocument();
});
test("creates correct upload path", async () => {
    vi.spyOn(Date, "now").mockReturnValue(12345);

    uploadImage.mockResolvedValue(undefined);

    const user = userEvent.setup();

    render(<ImageUploader />);

    const file = new File(["image"], "photo.jpg", {
        type: "image/jpeg",
    });

    const input = screen.getByLabelText(/upload volunteer image/i);

    await user.upload(input, file);

    expect(input.files[0]).toBe(file);

    await user.click(
        screen.getByRole("button", { name: "Upload" })
    );

    await waitFor(() => {
        expect(uploadImage).toHaveBeenCalledWith(
            file,
            "user-photos/12345.jpg"
        );
    });
});