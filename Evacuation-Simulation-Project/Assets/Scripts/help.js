
// The variable to control where the position of the scrollview
var scrollPosition : Vector2 = Vector2.zero;

// The message describing the program
var message = "This is a computer program that conducts airplane evacuation simulations cheaply and safely while still providing the ability to gather data for a particular airplane model. In addition, it allows the user to vary different conditions and passenger behaviours  in order to examine their effects on the evacuation.";

//defines the look of the message
var guiSkin : GUISkin;


//showing the message in a scroll view
function OnGUI () {
	
	GUI.skin = guiSkin;
	GUI.skin.box.fontSize = 22;
	GUILayout.BeginArea (Rect(150, 130, Screen.width-300, Screen.height-220));
 	scrollPosition = GUILayout.BeginScrollView (scrollPosition);
	GUI.skin.box.wordWrap = true; 
	GUILayout.Box(message);        
	GUILayout.EndScrollView ();
	GUILayout.EndArea();
	
}	