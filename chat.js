// Your web app's Firebase configuration
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
    apiKey: "AIzaSyCoLpTfNokpeMI_oc1BafZmY62gE-03K3w",
    authDomain: "project-101-5e7d1.firebaseapp.com",
    databaseURL: "https://project-101-5e7d1-default-rtdb.firebaseio.com",
    projectId: "project-101-5e7d1",
    storageBucket: "project-101-5e7d1.appspot.com",
    messagingSenderId: "417912322344",
    appId: "1:417912322344:web:75734212990e0728f7b81d"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function addUser()
{

  user_name = document.getElementById("user_name").value;

  localStorage.setItem("user_name", user_name);

    firebase.database().ref("/").child(user_name).update({
     purpose : "adding user"
        })
    //.then(function() {
    //window.location = "chat_room.html";
    //});
}


function addRoom()
{

  room_name = document.getElementById("room_name").value;

  localStorage.setItem("room_name", room_name);

  if(room_name != "") 
  {
    firebase.database().ref("/").child(room_name).update({
      purpose : "adding room name"
    });
  }
  else {
    alert("Enter a Room Name");
  }
}




function getData() 
{
  firebase.database().ref("/").on('value', function(snapshot) 
    {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) 
        {
            childKey  = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room name -" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}

getData();


function redirectToRoomName(name)
{
 console.log(name);
 localStorage.setItem("room_name", name);
 window.location = "chat_room.html";
}