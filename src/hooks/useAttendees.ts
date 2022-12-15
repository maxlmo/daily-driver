import {useEffect, useState} from 'react';
import {isChromeExtension} from '../infrastructure/isChromeExtension';
import {Person} from '../model/person';

const defaultAttendees: Person[] = [
    {name: "Max", role: "dev"},
    {name: "Alice", role: "dev"},
    {name: "Peter", role: "dev"},
    {name: "Mary", role: "ux"},
    {name: "John", role: "po"},
    {name: "David", role: "ac"},
];

export function useAttendees() {
    const [attendees, setAttendees] = useState(defaultAttendees);
    useEffect(() => {
        if (!isChromeExtension) {
            return;
        }
        chrome.runtime.onMessage.addListener(
            function (message, sender, sendResponse) {
                if (message.type !== "attendees") {
                    return;
                }
                setAttendees(message.data);
            }
        );
    }, [])
    return [attendees, setAttendees] as const;
}
