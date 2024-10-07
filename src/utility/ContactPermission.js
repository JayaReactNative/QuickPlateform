import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: "Contacts",
    message: "This app would like to view your contacts.",
    buttonPositive: "Please accept bare mortal", 
  })
    .then((res) => {
      console.log("Permission response: ", res); 
      if (res === PermissionsAndroid.RESULTS.GRANTED) {
        // Now fetch the contacts
        Contacts.getAll()
          .then((contacts) => {
            console.log("Contacts fetched: ", contacts); 
          })
          .catch((e) => {
            console.log("Error fetching contacts: ", e); 
          });
      } else if (res === PermissionsAndroid.RESULTS.DENIED) {
        // Permission was denied
        console.log("Contacts permission denied");
      } else if (res === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        // User selected "Don't ask again"
        console.log("Contacts permission set to never ask again");
      }
    })
    .catch((error) => {
      console.error("Permission error: ", error); 
    });
  




