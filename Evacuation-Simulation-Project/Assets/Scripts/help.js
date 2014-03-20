	var font : Font;

	
	function Start(){
	//guiText.font = font;
	}
	// The variable to control where the scrollview 'looks' into its child elements.
	var scrollPosition : Vector2 = Vector2.zero;

	// The string to display inside the scrollview. 2 buttons below add & clear this string.
	var longString = "This is a computer program that conducts airplane evacuation simulations cheaply and safely while still providing the ability to gather data for a particular airplane model. In addition, it allows the user to vary different conditions and passenger behaviours  in order to examine their effects on the evacuation.What needs to be kept in mind is that for the time being computer modelling is not an allowable method for testing the evacuation capability of airplanes recognised by the Federal Aviation Administration (FAA) and traditional methods will still be used to determine it.";

	function OnGUI () {	
	
		GUI.skin.label.font = font;
		GUI.skin.label.fontSize=25;
 	var textArea = new Rect (50, 150, Screen.width-100 , Screen.height-100);
	GUI.Label(textArea,longString);
			GUI.skin.label.font = null;
		GUI.skin.label.fontSize = 15;
	/*	//GUI.Box (Rect (50, 50, Screen.width - 100, Screen.height-100),"Warning!");	    	// Make a group on the center of the screen
	GUILayout.BeginArea (Rect (150, 150, Screen.width-300 , Screen.height-300));
		scrollPosition = GUILayout.BeginScrollView (
			scrollPosition, GUILayout.Width (Screen.width -300), GUILayout.Height (Screen.height-300));
		GUILayout.BeginVertical();
		// We just add a single label to go inside the scroll view. Note how the
		// scrollbars will work correctly with wordwrap.
		//var keyStyle= new GUIStyle();
		//keyStyle.fontSize = 25;
		
		//var titleStyle= new GUIStyle();
		//titleStyle.fontSize = 40;

	
		
		//GUILayout.Label ("Camera Switch Controls",titleStyle);
		GUI.skin.label.font = font;
		GUI.skin.label.fontSize=25;
		GUILayout.Label (longString);		

		GUI.skin.label.font = null;
		GUI.skin.label.fontSize = 15;

		// End the scrollview we began above.
	GUILayout.EndScrollView ();
 

	GUILayout.EndVertical();
	GUILayout.EndArea();
	*/
	}	