// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrlforGet: 'https://localhost:44344/api/Vendor/Details',
  // apiUrlLogin:'https://localhost:44344/api/User/Login'
    apiUrlforGet: 'https://localhost:44318/api/Applicant/vendor',
  apiUrlLogin:'https://localhost:44318/api/User/Login',
  apiUrlforGetAll:'https://localhost:44318/api/Applicant/GetAll',
  apiUrlforGetApplicationsByNameId:'https://localhost:44318/api/Applicant/search',
  apiUrlforGetApplicationsByDate:'https://localhost:44318/api/Applicant/date',
  apiUrlforAddUser:'https://localhost:44318/api/ProfileSetting',
  apiUrlforDeleteUser :'https://localhost:44318/api/ProfileSetting',
  apiUrlforGetAllProfile:'https://localhost:44318/api/ProfileSetting/GetAllUserProfiles',
  apiUrlUpdateProfile:'https://localhost:44318/api/ProfileSetting',
  apiUrlAddApplicant:'https://localhost:44318/api/Applicant',
  apiUrlGetAllVendor:'https://localhost:44318/api/Vendor/GetAll'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
