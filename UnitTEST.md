# Unit Test Cases
 
### Login Page

Componet name: ```MaskTextInput``` | ```SubmitButton``` | ```SocialLoginButton``` 
Componet use: Phone Number Login & Social "Google Firebase auth" Login.

Test case :
- User login with their phone number to get SMS (6 Digit OTP).
- IF OTP not arrived 'RESEND' button click by users.
- *OTP Based login user cant use system wide past feature required to write otp manually (intended feature)*
- Google Authentication login use popup google play services to get google accounts list and selects google account, SMS Service Provider : Firebase authentiction. 

Expected Result: User can login with 10 digit mobile number (By Defualt country code +91 IND)

### Navigation
Componet name: ```StackNavigator``` 
Componet use: Navigate entire app.

Test case: 
- After user login user can switch using tab navigation.
- User can navigate entire app using navigation.

### TODO List Page
Backed FETCH TODO LIST API: ```[GET] https://jsonplaceholder.typicode.com/todos```
Backed UPDATE TODO TITILE API: ```[POST] https://jsonplaceholder.typicode.com/todos/id```

Componet name: ```TodoMessagePopup``` 
Componet use: Server side TODO list fechted by API ID wise.

Test case : 
- TODO list UI Popup to view entire details of TODO TITLE.
- User can click to view specific TODO list and Update it.

Expected Result : User only update TODO Title & View TODO list.
- *API for UDPATE todo list not working right now.*

### Profile view Page

Componet name: ```CustomText``` 
Componet use: After login user details store based on provided by user or google firebase authentications | also user edit manually.

Test case:
- User can review there login details. 
- User can edit there login details. 
- (Validations) 10 digit phone number validate & Emails ```@``` ````.com```` other emails validation added to check emails address is correctly added.


Expected Result : User can check login details as well as edit login details (Name (First Name & Last Name), Email. Phone Number)
Condition : IF user login with Phone number only phone number it's shows | required to add Name & Emails.
Condition (Google Firebase auth) : IF user login with google firebase auth only emails, name shows | required to add Phone number.

### Logout

Componet name: ```MessagePopup``` 
Componet use: Popup open for logout app & delete userdata from app storage.

Test Case :
- User can logout click 'YES' button.
- User deny logout click 'NO' button.
- IF user logout previouse logined detials removed permantly.

Expected Result : User logout and their data permanatly wiped out form device.
