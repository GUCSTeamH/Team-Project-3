    var veryLongString = "insert very long text here";
    var scrollPosition : Vector2 = Vector2.zero;
     
     
   function Start(){  
    scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.MaxHeight(300), GUILayout.ExpandHeight (false));
    GUILayout.Label (veryLongString, GUILayout.ExpandHeight (true));
    GUILayout.EndScrollView();
   }