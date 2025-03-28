// module.exports = {
//     success: (res, data, message = "success", statusCode = 200) =>{
//         return res.status(statusCode).json({
//             success: true,
//             message,
//             data
//         });
//     },

//     error: (res, error) => {
//         let statusCode = 500;
//         let message = "Something went wrong";
//         let errors = null;
    
//         // Handling Different Error Types
//         if (typeof error === "string") {
//             // If a string is passed, use it as the message
//             message = error;
//             statusCode = 400;
//         } else if (error instanceof Error) {
//             // If it's an error object, use its message
//             message = error.message || "Internal Server Error";
//             statusCode = error.statusCode || 500;
//         } else if (typeof error === "object" && error !== null) {
//             // If an object is passed, extract details
//             message = error.message || message;
//             statusCode = error.statusCode || statusCode;
//             errors = error.errors || null;
//         }
    
//         // Response JSON
//         const response = {
//             success: false,
//             message,
//             statusCode,
//             ...(errors && { errors }) // Include errors if they exist
//         };
    
//         return res.status(statusCode).json(response);
//     }
// };

const errorHandler = (res, options = {}) => {
    const {
        message = "Something went wrong",
        statusCode = 500,
        errors = null,
        stack = null
    } = options;

    const response = {
        success: false,
        message,
        statusCode,
        ...(errors && { errors }) // Include errors only if provided
    };

    // Show stack trace in development mode (optional)
    if (process.env.NODE_ENV === "development" && stack) {
        response.stack = stack;
    }

    return res.status(statusCode).json(response);
};

module.exports = errorHandler;


