import { useActionState } from "react"; 
import "../styles/ImageUploader.css";

function ImageUploader() {
      function handleFileChange(prevoiousState, formData) {
        const image = formData.get("image");

        if (!image || image.size === 0) {
            return {
                ...prevoiousState,
                error: "Please select an image to upload.",
            };
        }
        return {error: null};
    }

    const [currentState, formAction, isPending] = useActionState(handleFileChange,  { error: null });

  
  return (
        <form className="upload-form" action={formAction}>

            <label htmlFor="image-upload" className="upload-card">

                <input
                    id="image-upload"
                    name="image"
                    type="file"
                    accept="image/*"
                />

                <div className="upload-icon">
                    ☁️
                </div>

                <h2>Upload Volunteer Image</h2>

                <p>
                    Drag & drop your image here or click to browse
                </p>

                <span className="upload-button">
                    Choose File
                </span>

            </label>

            <button
                className="submit-btn"
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Uploading..." : "Upload"}
            </button>

            {currentState.error && (
                <p className="error">
                    {currentState.error}
                </p>
            )}

        </form>
    );
}

export default ImageUploader;
 