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

### Assumptions and comments
- I used a blocking modal overlay to ensure that the user isn't redirected to a separate page and reuse the modal.
- I've added testing libraries such as Jest and React Testing Library as this was a required for developing multiple shared component while ensuring no regression over the course of the development
- I wasn't sure whether the version number was 3.5 listed on the file or something else. I've added version number via environment variables so it's easier to update - and could potentially come from external source in production.
- The "Information page" listed on the requirement docs is slightly unclear to me on whether it meant a separate page. I've added a new page `/information` to list characters. This would need to be clarified had it been a production application.


### Project Structure
The project is built using Next.js with App Router and Typescript. The project is organized as follows:

- `apps`: Contains the main pages of the application.
  - `components`: Any components for pages are created under `/components` directory alongside the `page.tsx` file.
- `components`: Contains reusable and shared components used throughout the application.
- `hooks`: Contains reusable hooks files used throughout the application.
- `api`: Reuseable functions to fetch requests via GraphQL API and Apollo Client
- `public`: Public assets such as images
- `__tests__`: Contains test files for application


### Storing users data
The project stores user's information on LocalStorage. This ensures that the user data is persisted across page reloads while using a simple option to store data.

### Environment variables
The project uses environment variables to store informations such as the API endpoint as well as version information that may be different based on runtime environment.

### Testing
The projects adds jest and supporting libraries to ensure the quality of the codebase. The codebase hasn't been tested fully yet due to time constraints. For production application, I'd test more thoroughly and ensure that main flows are
tested e2e with something like Playwright or Cypress.

### Error Handling
I've used error handling in few places to ensure that the application doesn't crash when something unexpected happens. For example, Corrupt JSON from Localstorage are handled gracefully. Similarly, input validation errors such as invalid query params are also handled gracefully.

Additionally, I've mentioned few places where *Error monitoring* would be useful, but did not add one for demo purposes.

### Deployment
For the purposes of the demo and simplicity, the application is deployed directly to Vercel.
In productionized application, there would be more build steps such as utilizing better caching, more component testing, accessibility testing and regression testing as well as static and bundle analysis of the codebase to ensure the application is optimized for production.

### Reuseability / Modularity of components and codebase
I've extracted components and hooks into reusable and modular pieces as I progressed through the application. For example, the modal, pagination controls etc can be reused in multiple places. These components may not look very generic and fit for purposes for general usecases. As the use-case evolves and when component needs to be extracted, these components will be further be extracted into a generic / 'dumb' components.

### Accessibility
The application is also built with accessibility in mind.
- The application is keyboard accessible - interactive elements are tabbable
- HTML form with native input validation are used for better accessibility.
- The pages are URL accessible (except for modals which don't have distinct URL due to time limits). The colour scheme are accessible and meet WCAG 2.1 AA standards.
- Proper roles are provided to components such as Modal components where ChakraUI doesn't use accurate HTML5 elements.
- Images are provided alt text

### Responsiveness
The application is also built with responsiveness in mind. Most components have been updated lightly to be responsive instead of making the application completely responsive due to time constraints.
