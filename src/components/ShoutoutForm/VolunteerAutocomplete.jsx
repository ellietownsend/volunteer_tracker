import { useMemo, useState } from "react";

function VolunteerAutocomplete({ volunteers }) {
    const [search, setSearch] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const nameCounts = useMemo(() => {
        const counts = {};

        volunteers.forEach((volunteer) => {
            const name = `${volunteer.firstname} ${volunteer.lastname}`;
            counts[name] = (counts[name] || 0) + 1;
        });

        return counts;
    }, [volunteers]);

    const filtered = useMemo(() => {
        const query = search.toLowerCase();

        return volunteers.filter((volunteer) => {
            const name = `${volunteer.firstname} ${volunteer.lastname}`.toLowerCase();
            return name.includes(query);
        });
    }, [search, volunteers]);

    function selectVolunteer(volunteer) {
        setSearch(`${volunteer.firstname} ${volunteer.lastname}`);
        setSelectedEmail(volunteer.email);
        setShowDropdown(false);
    }

    return (
        <div className="autocomplete">
            <input
                type="text"
                placeholder="Type or select volunteer"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedEmail("");
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => {
                    setTimeout(() => setShowDropdown(false), 100);
                }}
                autoComplete="off"
            />

            <input
                type="hidden"
                name="email"
                value={selectedEmail}
            />

            {showDropdown && filtered.length > 0 && (
                <div className="autocomplete-dropdown">
                    {filtered.map((volunteer) => {
                        const name = `${volunteer.firstname} ${volunteer.lastname}`;
                        const duplicate = nameCounts[name] > 1;

                        return (
                            <div
                                key={volunteer.email}
                                className="autocomplete-item"
                                onMouseDown={() => selectVolunteer(volunteer)}
                            >
                                {name}
                                {duplicate && ` (${volunteer.email})`}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default VolunteerAutocomplete;