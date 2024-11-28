import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { parseISO } from 'date-fns';


export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const convertToTimestamp = (date_ms) => {
    // Parse the ISO string to a Date object
    const date = parseISO(date_ms);

    // Get the timestamp in milliseconds
    return date.getTime();
}

export function formatDate(date_ms) {

    let formatDatedDate = convertToTimestamp(date_ms)

    // Convert milliseconds to seconds
    let date_seconds = formatDatedDate / 1000;

    // Convert to Date object
    let date_obj = new Date(date_seconds * 1000);

    // Get current date and time
    let current_date = new Date();
    current_date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    let current_time = current_date.getTime();

    // Get the date part of the provided date
    let provided_date = new Date(date_obj);
    provided_date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    // Check if it's today
    if (provided_date.getTime() === current_time) {
        return date_obj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    }

    // Check if it's yesterday
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    if (provided_date.getTime() === yesterday.getTime()) {
        return "Yesterday";
    }

    // Check if it's a different day of the week
    if (provided_date.getDay() < current_date.getDay()) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[provided_date.getDay()];
    }

    // If none of the above conditions match, return in a different format
    return provided_date.getMonth() + 1 + "/" + provided_date.getDate() + "/" + provided_date.getFullYear();
}

export const isSameDay = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

// Define getRelativeDateTime function
export const getRelativeDateTime = (message, previousMessage) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const messageDate = new Date(message.createdAt);

    if (!previousMessage || !isSameDay(previousMessage.createdAt, messageDate.getTime())) {
        if (isSameDay(messageDate.getTime(), today.getTime())) {
            return "Today";
        } else if (isSameDay(messageDate.getTime(), yesterday.getTime())) {
            return "Yesterday";
        } else if (messageDate.getTime() > lastWeek.getTime()) {
            const options = {
                weekday: "long",
            };
            return messageDate.toLocaleDateString(undefined, options);
        } else {
            const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            };
            return messageDate.toLocaleDateString(undefined, options);
        }
    }
};

export function randomID(len) {
    let result = "";
    if (result) return result;
    var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}