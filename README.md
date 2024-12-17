Moduele 8 Journal

Architecture

  In my full stack project, I utilized a variety of frontend development approaches, 
including Express HTML, JavaScript, and a single-page application (SPA) framework. E
xpress HTML and JavaScript were instrumental in building the initial structure and dynamic 
behavior of the application. They offered flexibility in creating server-rendered views with 
templating engines like EJS, allowing for quick prototyping. In contrast, the SPA approach provided 
a more dynamic and seamless user experience by loading content asynchronously and minimizing page 
reloads. The SPA's ability to fetch data via APIs enhanced performance and interactivity, 
offering a modern and scalable solution compared to traditional server-side rendering.
On the backend, a NoSQL MongoDB database was used due to its schema-less nature, which is ideal 
for applications requiring flexibility in data structure. This was especially beneficial in 
handling diverse data formats and scaling horizontally to accommodate growing datasets. MongoDB's 
document-oriented model simplified the storage and retrieval of JSON-like data, ensuring smoother 
integration with the backend logic.

Functionality

JSON (JavaScript Object Notation) differs from JavaScript in that it is a lightweight 
data-interchange format, primarily used for transmitting data between a server and a client. 
While JavaScript is a programming language that enables interactivity on the web, JSON is a 
structured format that is easy to read and write. JSON acts as the bridge between the frontend 
and backend by enabling the seamless exchange of data. For example, data fetched from MongoDB in 
the backend is formatted as JSON and sent via APIs to the frontend, where it can be dynamically 
displayed.

During the development process, I refactored code to enhance functionality and efficiency. 
One instance was modularizing components into reusable UI elements such as buttons and form inputs. 
This reduced redundancy and improved maintainability by allowing changes to propagate across the 
application. Additionally, creating modular backend functions for database queries minimized code 
repetition and improved debugging efficiency. Reusable components not only save time but also ensure 
consistency across the application, enhancing the overall user experience.

Testing

In a full stack application, API testing is crucial for validating the request and retrieval 
methods of endpoints. These tests ensure that the API responds correctly to various requests 
(GET, POST, PUT, DELETE) and handles edge cases effectively. Testing becomes more complex when 
security layers such as authentication and authorization are added. For instance, endpoints 
protected by JSON Web Tokens (JWT) require tests to verify token generation, expiration, and 
validation. Understanding endpoint structures and secure data transmission protocols such as 
HTTPS helps mitigate vulnerabilities. Tools like Postman or automated testing frameworks like 
Jest or Mocha simplify endpoint testing by providing environments to validate responses, headers, 
and payloads.

Reflection

This course has significantly contributed to my professional development by equipping me 
with practical skills in full stack development. I have gained a deeper understanding of how 
to integrate frontend and backend components, leverage NoSQL databases, and implement secure, 
scalable applications. By mastering concepts like API development, endpoint testing, and reusable 
UI components, I am now more confident in building robust web applications. These skills have 
improved my marketability as a candidate, as full stack development experience is highly sought 
after in the software engineering field. Additionally, working on real-world projects has honed 
my problem-solving and debugging abilities, preparing me for challenges in professional environments.
