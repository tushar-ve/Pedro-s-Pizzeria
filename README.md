Description

This Django and React application combines various features to create a seamless experience for users in accessing and ordering from nearby restaurants. The project includes authentication, user profiles, Google Maps integration, receipt handling, delivery tracking, cart functionalities, and more.
Functionalities
1. Authentication

    Login, Signup, and Forgot Password: Implemented authentication features using Knox or JWT for secure user login, signup, and password recovery.

    URL Authentication: Set up URL authentication to ensure secure access to specific pages or functionalities.

2. User Profile

    User Profile Page: Users can view and update their profile information through a dedicated page accessible from the navigation bar.

3. Google Maps API Integration

    Nearby Restaurants: Utilized the Google Maps API to display information about nearby restaurants, including names, addresses, ratings, and menus.

4. Food Receipt Handling

    Download Receipts: Users can download their food receipts. Receipt data is sent to the admin via email using email.js.

5. Delivery Section

    Order Tracking: Implemented a delivery section where users can track the status of their orders and view estimated delivery times.

6. Cart Functionalities

    Cart Operations: Users can add items, adjust quantities, remove items, and calculate the total amount.

7. Registration Confirmation

    Confirmation Email: Sends a confirmation email to the user's provided email address upon successful registration.

8. Mandatory Login

    Secure Ordering: Users are required to log in before accessing the menu page or placing an order.

9. Coupon Application

    Apply Coupons: Implemented a feature allowing users to apply coupons to their total order amount.

10. User Address on Registration

    Address Capture: Added a field during user registration to capture the user's address information for efficient delivery.

11. Feedback System

    User Feedback: Enabled users to provide feedback on the food they have ordered, including ratings, reviews, and comments.

Future Scope

    Delivery Boy Assignment: Consider incorporating functionality to assign delivery boys based on their availability and order number.

    Homepage Bot: In the future, integration of a bot on the homepage to provide additional assistance and support to users.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
