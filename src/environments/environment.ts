// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://localhost:44307/api/v1/',
  maxCharacters: 20,
  SASKey: '?sv=2019-12-12&ss=bqtf&srt=sco&sp=rwdlacuptfx&se=2020-08-27T14:29:53Z&sig=QXZjfd7nYceHYomx8B8xVmsoIHQEvLF8ChCOac6Awk8%3D&_=1598509801131'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
