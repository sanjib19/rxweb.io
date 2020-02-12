import { oneOf, prop } from "@rxweb/reactive-form-validators"

export class EmployeeInfo {

  @prop()
  department: string;

  @oneOf({ matchValues: ["ECommerce", "Banking", "Educational", "Gaming"] })
  projectDomains: string;

  @oneOf({ matchValues: ["Secondary", "Senior Secondary", "B.Tech", "M.Tech", "B.C.A.", "M.C.A."], conditionalExpression: (x, y) => x.department == 'DotNet' })
  qualifications: string[];

  @oneOf({ matchValues: ["MVC", "AngularJS", "Angular 5", "C#", "Web Api", "SQL Server"], conditionalExpression: "x => x.department =='DotNet'" })
  skills: string;

  @oneOf({ matchValues: ["Drawing", "Singing", "Dancing", "Travelling", "Sports"], message: "Please select no hobbies" })
  hobbies: string;

  @oneOf({ matchValues: ["English", "Spanish", "French", "German", "Chinese"], messageKey: "oneOfMessageKey" })
  languages: string;
}