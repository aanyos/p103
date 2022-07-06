//YOUR FIREBASE LINKS
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

this.database = firebase.database();



user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

var Likes = 0;

function getData() 
  { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) 
          { 
              document.getElementById("output").innerHTML = ""; 
              snapshot.forEach(function(childSnapshot)
                { 
                  childKey  = childSnapshot.key; 
                  childData = childSnapshot.val();
                  if(childKey != "purpose") 
                      {
                          firebase_message_id = childKey;
                          message_data = childData;
                          //Start code 
                          row = "<b>Name: </b>" +  message_data.name +  "<br>" + "<b>Message: </b>" + message_data.message + "<br>" + "<button id='" + firebase_message_id + "' onclick='addLike(this.id)' class='btn btn-primary'>Like: " + message_data.like + "</button> <br><br>";
                          document.getElementById("output").innerHTML += row;                   
                          //End code
                      } 
                });  
          }); 
  }
getData();


function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push(
        {
            name:user_name,
            message:msg,
            like:0
        }
    );

    document.getElementById("msg").value = "";
}

function addLike(clicked_id)
{
  let userRef = this.database.ref("/"+room_name);
  userRef.child(clicked_id).on('value', (snap) => {
          Likes = snap.val().like;
          Likes = Likes + 1; 
      });
      userRef.child(clicked_id).child('like').set(Likes);
}

