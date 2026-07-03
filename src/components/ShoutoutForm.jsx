import supabase from "../../supabase-client";
import { useActionState, useState,useEffect } from "react"; 
import "../styles/ShoutoutForm.css";

function ShoutoutForm(){
    const [currentState, formAction, isPending] = useActionState(handleFormSubmit, { error: null });
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        fetchVolunteers();
    }, []);


    async function fetchVolunteers() {
        try{
            const {data, error} = await supabase.from("volunteer").select("*");
            if(error){
                consoler.error("Supabase Error: ", error.message);
                return;
            }
            setVolunteers(data);
        }catch(error){
            console.error(error.message);
        }
    }

    async function handleFormSubmit(prevState, formData){
        const email = formData.get("email");
        const message = formData.get("message");
        try{
            const { error } = await supabase
                .from("shoutouts")
                .insert({ email: email, message: message })
                .select();
            if(error){
                console.error("Supabase Error: ", error.message);
                return { ...prevState, error: error.message };
            }
        }catch(error){
            console.error("Unexpected Error: ", error.message);
            return { ...prevState, error: "An unexpected error occurred." };
        }
        
    }

  return (
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
                <label htmlFor="volunteer-select">
                    Choose Volunteer
                </label>

                <select
                    id="volunteer-select"
                    name="email"
                >
                    {volunteers.length ? (
                        volunteers.map((volunteer) => (
                            <option
                                key={volunteer.email}
                                value={volunteer.email}
                            >
                                {volunteer.firstname} {volunteer.lastname}
                            </option>
                        ))
                    ) : (
                        <option>Loading...</option>
                    )}
                </select>
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
            : null
        }

    </form>
);
}

export default ShoutoutForm;