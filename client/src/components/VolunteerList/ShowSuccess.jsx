import "../../styles/ShowSuccess.css";
import { useEffect, useState } from "react";

const ShowSuccess = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);
    {console.log(message)}

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className="success-overlay">
            <div className="success-modal">
                <div className="success-icon">
                    ✓
                </div>

                <h2>Information Updated</h2>

                <p>
                    {message} succeeded!
                </p>
            </div>
        </div>
    );
};

export default ShowSuccess;