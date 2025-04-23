export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatTextDate = (dateString) => {
    if (!dateString) return 'N/A'; // Handle null or undefined date strings
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { // Or your preferred locale
        year: 'numeric',
        month: 'long', // "January", "February", etc.
        day: 'numeric'
    });
};