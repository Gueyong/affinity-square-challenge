Installation Guide
Prerequisites

    Node.js: Make sure you have Node.js installed. You can download it from here.
    npm: Node Package Manager (npm) comes with Node.js. If you have Node.js installed, you should already have npm.

Setup

    Clone the Repository

    bash

git clone <repository-url>
cd <repository-directory>

Install Dependencies

Navigate to the project directory and run:

bash

npm install

This will install all the necessary packages and dependencies required to run the application.

Run the Application

To start the application locally, use the following command:

bash

npm run dev

The application should now be running on http://localhost:3000. You can open this URL in your web browser to view the app.

Run Tests

To run the test suite, use the following command:

bash

    npm run test

    This will execute all test cases to ensure that the application is functioning correctly.

Project Structure

    components/: Contains reusable React components such as ResultItem.
    pages/: Contains the Next.js pages, including the main entry point index.js.
    tests/: Contains test cases for components, ensuring the application works as expected.
    styles/: Contains global and component-specific styles, primarily leveraging Tailwind CSS.

Libraries Used

    Next.js: A React framework for building server-side rendered applications with ease.
    React: The core library for building the user interface.
    Tailwind CSS: A utility-first CSS framework used for styling the application.
    React Icons: A collection of popular icons as React components, used for displaying icons in the UI.
    Jest: A testing framework used for writing and running unit tests.
    React Testing Library: A testing library used alongside Jest for testing React components.

Design Decisions

    Next.js for SSR: We chose Next.js to leverage its server-side rendering (SSR) capabilities, ensuring fast load times and SEO benefits.
    Tailwind CSS for Styling: Tailwind CSS was used to quickly build a responsive and modern user interface without writing custom CSS.
    Component-Based Architecture: The application is structured using reusable React components, making it easier to maintain and extend in the future.

Assumptions

    HTML Parsing: We assume that the HTML input provided to the application is well-formed and valid. The application does not handle malformed HTML.
    Responsive Design: The design assumes that the application will be primarily viewed on modern browsers with CSS Grid and Flexbox support.

Known Constraints or Limitations

    Basic HTML Parsing: The application uses a basic HTML parsing approach with libraries like html-react-parser. For more complex or invalid HTML, a more robust parsing library or approach might be required.
    Limited Error Handling: Error handling is minimal. For production use, more comprehensive error handling and validation would be necessary.
    Performance: The application is optimized for small to medium-sized HTML documents. Very large HTML inputs may impact performance.

Conclusion

This project serves as a robust foundation for HTML analysis and display in a modern web application. While there are some constraints, the design and structure allow for easy extension and improvement in the future.