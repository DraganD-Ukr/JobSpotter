# **JobSpotter**

<div style="text-align: center;">
  <img src="https://img.shields.io/github/license/DraganD-Ukr/JobSpotter?style=flat" alt="License" height="25">
  <img src="https://img.shields.io/github/issues/DraganD-Ukr/JobSpotter" alt="Issues" height="25">
  <img src="https://img.shields.io/github/last-commit/DraganD-Ukr/JobSpotter" alt="Last Commit" height="25">
  <img src="https://img.shields.io/github/commit-activity/t/DraganD-Ukr/JobSpotter/main" alt="Total Commits" height="25">
  <img src="https://img.shields.io/github/issues-pr-closed/DraganD-Ukr/JobSpotter" alt="Total PRs Closed" height="25">
  <img src="https://img.shields.io/github/contributors/DraganD-Ukr/JobSpotter" alt="Contributors" height="25">
  <a href="https://github.com/DraganD-Ukr/JobSpotter/actions/workflows/backend-services-ci.yml">
    <img src="https://github.com/DraganD-Ukr/JobSpotter/actions/workflows/backend-services-ci.yml/badge.svg?branch=main" alt="Service CI Pipeline" height="25">
  </a>
</div>




</br>
</br>

A web platform that connects users with local, simple side jobs, such as babysitting, pet care, or lawn mowing. Built with scalability and high performance in mind, the application leverages a **microservices architecture** to ensure maintainability, fast user interactions, and seamless job discovery.

## **Features**

- :round_pushpin: **Location-Based Filtering**: Find nearby jobs based on user location and job requirements.
- :mag_right: **Fuzzy Search**: Supports full-text search with synonyms to enhance job discovery.
- :bell: **Real-Time Notifications**: Users receive instant updates on job applications and status changes via Kafka and Server-Sent Events (SSE).
- :lock: **Secure Authentication**: Authentication and authorization are managed using Keycloak, with automatic token rotation and HTTP-only cookies for enhanced security.
- :bar_chart: **Admin Dashboard**: Admins can manage reports with advanced search, filtering, and sorting features via MongoDB.
- :cloud: **Scalable Architecture**: Microservices architecture using Spring Boot for each service, ensuring efficient and maintainable development.
- :gear: **Config Server & Discovery Service**: The application uses a Config Server to centralize configuration management across all services, ensuring consistency. The Discovery Service enables service discovery and load balancing for seamless interaction between services.

## **Tech Stack**

![Java](https://img.shields.io/badge/Java-007396?style=flat&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=spring&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=flat&logo=apache-kafka&logoColor=white)
![Keycloak](https://img.shields.io/badge/Keycloak-000000?style=flat&logo=keycloak&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

- :coffee: **Backend**: Java, Spring Boot
- :satellite: **Real-Time Messaging**: Kafka, Server-Sent Events (SSE)
- :lock: **Authentication**: Keycloak
- :floppy_disk: **Caching**: Redis 
- :card_file_box: **Database**: MongoDB, PostgreSQL
- :mag_right: **Search Engine**: Full-Text Search with synonyms (Lucene + Hibernate Search)
- :cloud: **Cloud Storage**: AWS S3 (for file storage)
- :test_tube: **Testing**: JUnit, Mockito, Spring Boot Test, Testcontainers
- :whale: **Containerization**: Docker 
- :arrow_up: **CI/CD**: GitHub Actions 
- :wrench: **Config Server**: Centralized configuration management for all services.
- :electric_plug: **Discovery Service**: Enables service discovery for microservices communication.

## **How It Works**

1. **Microservices Architecture**: The platform uses microservices, where each service is responsible for a specific feature, such as managing users, job posts, notifications, and reports.
2. **Config Server**: Centralizes configuration management, ensuring consistency across all microservices and reducing potential configuration mismatches.
3. **Discovery Service**: Enables seamless communication between microservices by automatically discovering and registering available services, providing efficient load balancing.
4. **Location-Based Search**: Users can filter jobs by radius (providing current location), tags, and the system also provides the distance between the user and the job location.
5. **Advanced Search**: The application supports fuzzy search with synonyms, ensuring users can find jobs even if they misspell keywords or use different terms.
6. **Authentication**: Authentication is managed via Keycloak, which issues access and refresh tokens upon login. These tokens are stored in HTTP-only cookies for security, preventing XSS and CSRF attacks.

   - Upon successful login, the backend returns HTTP-only cookies containing the **access** and **refresh tokens**.
   - Every request to the backend passes through the **API Gateway**, where it checks for the presence of the cookies.
   - If the access token is found and is still valid, it is extracted from the cookie and included in the **Authorization** header for subsequent requests to other services, allowing for Role-Based Access Control (RBAC) enforcement.
   - If the access token has expired, the **API Gateway** uses the refresh token to obtain a new access token from Keycloak.
   - The new access and refresh tokens are then set in the HTTP-only cookies, replacing the old ones, and the request proceeds with the updated tokens, ensuring continuous authentication without requiring the user to log in again.
   - This process serves as the **first filter**, ensuring that the tokens are correctly handled. On subsequent filters and requests, the **access token** is **verified** against Keycloak to confirm its validity and enforce any required permissions.
     
7. **MongoDB for Reports**: Admins can manage reports using MongoDB's powerful Query API, which supports advanced search, filtering, and sorting capabilities.

   - The report structure does not define a fixed **report type**. This decision was made to take advantage of MongoDB’s flexible schema, allowing easy adaptation to future changes and new types of reports without requiring backend and frontend teams to frequently modify the system.
   - Instead of predefined report types, the type of report is determined by the fields present in each report. This approach enables efficient management of various report types while keeping the structure simple and scalable.

8. **Kafka & SSE**: Real-time notifications are delivered using Kafka, ensuring at-least-once delivery guarantees. Server-Sent Events (SSE) are used to push updates to the front-end.     
9. **Performance**: Redis caching improves application performance by reducing response times and preventing redundant database queries.
10. **Testing**: Unit and integration tests are written using JUnit, Mockito, and Testcontainers, achieving over 80% test coverage to ensure application stability and quality (in progress).

## **License**

JobSpotter is open-sourced under the MIT license. See the [LICENSE](LICENSE) file for more details.

## **Acknowledgements**

- [Spring Boot](https://spring.io/projects/spring-boot) - For making microservice architecture easy to implement.
- [Keycloak](https://www.keycloak.org/) - For providing authentication and authorization management.
- [Kafka](https://kafka.apache.org/) - For real-time messaging.
- [MongoDB](https://www.mongodb.com/) - For providing flexible NoSQL database support.
