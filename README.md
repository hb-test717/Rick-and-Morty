# Rick and Morty
This is a [Next.js](https://nextjs.org) project listing all characters from the Rick and Morty universe.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/docs) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: CSS and [Chakra UI](https://chakra-ui.com)
- **GraphQL**: [Apollo Client](https://www.apollographql.com/docs/react)

## Prerequisites
To avoid compatibility issues, please check that your dev environment meets the following requirements:

- **Node.js**: Version 22.x
- **Package Manager**: Yarn 1.22.19

You can verify your installed versions by running:
```bash
node --version
yarn --version
```

> **Note**: While other versions may work, the application has been thoroughly tested with the versions listed above.

## Getting Started
1. Clone the repository
```bash
git clone https://github.com/hb-test717/Rick-and-Morty.git
cd Rick-and-Morty
```

2. Install dependencies
```bash
yarn install
```

3. Copy the `.env.example` file to `.env`
```bash
cp .env.sample .env
```

4. Start the development server
```bash
yarn dev
```
5. The dev server will be running at [http://localhost:3000](http://localhost:3000).

### Linting
Run linting using
```bash
yarn lint
```

### Testing
Jest is used as the testing framework. The tests are located in the `__tests__` directory.

Run tests using
```bash
yarn test
```

### Deployment
This application is currently deployed on [Vercel](https://vercel.com)

## Project Notes
The project uses the Rick and Morty API to fetch data about characters, locations, and episodes. It also utilizes Chakra UI for styling and Apollo Client for GraphQL queries.

### Task requirements
All requirements listed on the documents have been carefully worked through and have been met. Ideally, these would be tested but I have skipped it to focus on other parts of the project. This would be the next step in the development process.

### Assumptions and comments
- I used a blocking modal overlay to ensure that the user isn't redirected to a separate page and reuse the modal.
- I've added testing libraries such as Jest and React Testing Library as this was a required for developing multiple shared component while ensuring no regression over the course of the development
- I wasn't sure whether the version number was 3.5 listed on the file or something else. I've added version number via environment variables so it's easier to update - and could potentially come from external source in production.
- The "Information page" listed on the requirement docs is slightly unclear to me on whether it meant a separate page. I've added a new page `/information` to list characters. This would need to be clarified had it been a production application.


### Project Structure
The project is built using Next.js with App Router and Typescript. The project is organized as follows:

- `apps`: Contains components for routes, such as `/information`
  - `components`: Components specific to individual routes.
- `components`: Contains reusable and shared components used throughout the application.
- `hooks`: Contains reusable hooks files used throughout the application.
- `api`: Reuseable functions to fetch requests via GraphQL API and Apollo Client
- `public`: Public assets such as images
- `__tests__`: Contains test files for application


### Storing users data
The project stores user's information on LocalStorage. LocalStorage was chosen as it provides a simple way to store data locally while keeping the implementation simple for demo purposes.

### Environment variables
The project uses environment variables to store informations such as the API endpoint as well as version information that may be different based on runtime environment.

### Testing
Jest and React testing library packages were added to ensure the quality of the codebase. The code coverage is quite low due to time constraints. Ideally, most of the logic would be tested before deploying it to production.

Given more time, all of the requirements listed in the docs would be converted to tests as part of the testing process.

### Error Handling
There are few error handling that I've added as part of this demo. Redirecting to 404 page on invalid params, handling apollo errors and JSON parsing are some of the handling that I've done.

Additionally, I've mentioned few places where *Error monitoring* would be useful, but did not add one for demo project.

### Performance
Few areas that I worked on performance:
- Avoiding unnecessary re-renders by using useEffect in useUserDetails hook
- Using Skeleton components and load parts of the page as the API can be quite slow at times.
- Using Next components like Link and Image that do the heavy lifting of loading images and prefetching wherever applicable

### Deployment
The application is directly deployed with Vercel.

A better CI/CD pipeline needs to be implemented with other steps such as accessibility testing, bundle analysis, security tests etc.

### Accessibility
The application is also built with accessibility in mind.
- The app keyboard accessible - interactive elements are tabbable
- HTML form with input validation and error banners are used for better accessibility.
- The colour scheme are accessible and meet WCAG 2.1 AA standards.
- Proper roles are provided to components such as Modal components where ChakraUI doesn't use accurate HTML5 elements.
- Images are provided alt text

### Responsiveness
The website is responsive.
