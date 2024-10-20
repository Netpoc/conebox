## Corporate Financial Reporting Application

### Overview
This application is designed for corporates to manage and work on their financial reports directly through a spreadsheet interface. Users can upload, edit, save, and track their financial data seamlessly within the app.

### Features
- Spreadsheet Integration: Work directly on spreadsheets (such as Trial Balance, Journals).
- File Management: Save progress, and export data in multiple formats (e.g., .xlsx).
- Version Control: Track changes and view previous versions of the spreadsheet.
- User Roles: Different user roles for accessing and managing data (e.g., Admin, User, Auditor).
- Error Validation: Automatic checks to ensure data integrity (e.g., zero-sum validation of Trial Balances).
- API Integration: Integrates with third-party services for data retrieval and reporting.

### Technologies
- Frontend Framework: Vue.js
- State Management: Vuex (if applicable)
- Spreadsheet Library: Syncfusion Spreadsheet
- API: RESTful API (if applicable)
- Storage: LocalStorage for temporary data storage

## Key Functional Areas Implemented
### User Registration and Onboarding

- Tenant Registration: Tenants can register their companies, input essential details, and choose "group-class-account" if applicable.
- App-User Registration: App-Users receive registration links to join the system and complete profile setup.
- Tenant Activation and Deactivation: Tenants can be activated or deactivated by the SaaS Admin as needed.
- Activation Process: Following registration, both Tenants and App-Users receive confirmation emails to activate their profiles.
Profile Setup

- Guided Onboarding: New users are guided through platform features on their first login.
- Profile Configuration: Users can set up profile details like pictures and preferences.
- Trial Balance Management (App-User)

- Trial Balance Upload: Users can upload trial balances (TB) with zero-sum validation.
- Edit Capabilities: Each TB entry is editable without leaving the interface.

## Admin Section


## Tenant Section
### Adding App_Users
In the Tenant section of the app, you can add new App_Users easily by following these steps:

+ Navigate to the App User route by clicking on "App User" from the side menu.
+ In the App User route, click the + button to add a new user.
+ A dialog will pop up asking for the email address of the potential App_User.
+ Enter the email address in the provided textbox.
+ Click the Send Invite button. This will send a registration link to the email address provided.
The registration link will include the tenant's RC_Number to ensure that the user is correctly associated with the tenant during the registration process. The link opens the registration page with the App_User's email and RC_Number prefilled, ensuring a seamless experience.

# coneBox

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
