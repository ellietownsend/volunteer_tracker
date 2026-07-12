
import { useActionState, useState, useEffect, useMemo } from "react"; 
import "../../styles/ShoutoutForm.css";
import VolunteerAutocomplete from "./VolunteerAutocomplete";
import {fetchVolunteers, createShoutout} from "../../services/shoutoutService";

function ShoutoutForm(){
    const [currentState, formAction, isPending] = useActionState(handleFormSubmit, { error: null });
    const [volunteers, setVolunteers] = useState([]);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);


    useEffect(() => {
        loadVolunteers();
    }, []);


    async function loadVolunteers() {
        try{
            const data = await fetchVolunteers();
            setVolunteers(data);
        } catch (error) {
            console.error("Error loading volunteers: ", error.message);
        }
    }


    async function handleFormSubmit(prevState, formData){
        const email = formData.get("email");
        const message = formData.get("message");
        if(message) {
              try{
            await createShoutout(email, message);
            setSubmissionSuccess(true);
            return { ...prevState, error: null };
        } catch (error) {
            console.error("Error creating shoutout: ", error.message);
            return { ...prevState, error: error.message };
        }
        } else {
            return { ...prevState, error: "Message cannot be empty" };
        }
    }

  return (
    <>
    <form className="shoutout-form" action={formAction}>

        <div className="shoutout-card">

            <div className="form-icon">
                💬
            </div>

            <h2>Write a Shoutout</h2>

            <p>
                Recognize a volunteer for their hard work and contribution. These will be inlcuded in the generated message.
            </p>

           <div className="form-group">
    <label htmlFor="volunteer-search">
        Choose Volunteer
    </label>

    <VolunteerAutocomplete volunteers={volunteers} />
</div>

            <div className="form-group">
                <label htmlFor="message">
                    Shoutout Message
                </label>

                <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder='Alice did a wonderful job helping at the "Food for Thought" event...'
                />
            </div>

        </div>

        <button
            className="submit-btn"
            type="submit"
            disabled={isPending}
        >
            {isPending ? "Submitting..." : "Submit"}
        </button>

        {currentState?.error ? 
            <p className="error">
                {currentState.error}
            </p>
            : submissionSuccess ? <p>Thank you for submitting a shoutout!</p> : null
        }

    </form>
    </>
);
}

export default ShoutoutForm;